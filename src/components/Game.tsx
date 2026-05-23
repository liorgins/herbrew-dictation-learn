"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ChatBubble, { ChatBubbleProps } from "./ChatBubble";
import ChatInput from "./ChatInput";
import DifficultyPicker from "./DifficultyPicker";
import IntroScreen from "./IntroScreen";
import Confetti from "./Confetti";
import { getFreshSentences, Sentence } from "@/lib/sentences";
import { getSeenIds, markSeen } from "@/lib/progress";
import { scoreAnswer, ScoringResult } from "@/lib/scoring";
import {
  playSound,
  isSoundEnabled,
  setSoundEnabled,
  unlockAudio,
} from "@/lib/sounds";

type GamePhase = "idle" | "listening" | "typing" | "scored" | "gameOver";

const TOTAL_ROUNDS = 5;
const PASS_THRESHOLD = 80;
const AUTO_ADVANCE_SECONDS = 3;

function getTimeStr(): string {
  return new Date().toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function createAudioContext(): AudioContext | null {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (Ctx) return new Ctx();
  } catch {
    /* unavailable */
  }
  return null;
}

export default function Game() {
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [audioLoading, setAudioLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [confettiKey, setConfettiKey] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioDataRef = useRef<string | null>(null);
  const sentenceRef = useRef<Sentence | null>(null);
  const sentenceQueueRef = useRef<Sentence[]>([]);
  const roundScoresRef = useRef<number[]>([]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // When the soft keyboard opens or closes the visual viewport changes size.
  // Re-pin to the bottom so the latest message (e.g. the play-voice bubble)
  // stays right above the input instead of drifting off-screen.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => {
      requestAnimationFrame(() => {
        chatEndRef.current?.scrollIntoView({ block: "end" });
      });
    };
    vv.addEventListener("resize", onResize);
    return () => vv.removeEventListener("resize", onResize);
  }, []);

  // Sync the persisted sound preference once on the client (defaults to on).
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      setSoundEnabled(next);
      if (next) {
        unlockAudio();
        playSound("tap");
      }
      return next;
    });
  }, []);

  const stopCurrentAudio = useCallback(() => {
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop(); } catch { /* ok */ }
      sourceNodeRef.current = null;
    }
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
      htmlAudioRef.current = null;
    }
  }, []);

  const playViaAudioContext = useCallback(
    async (audioContent: string, ctx: AudioContext, isReplay: boolean) => {
      if (ctx.state === "suspended") await ctx.resume();
      const buffer = await ctx.decodeAudioData(base64ToArrayBuffer(audioContent));
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      sourceNodeRef.current = source;
      source.onended = () => {
        setIsPlaying(false);
        sourceNodeRef.current = null;
        if (!isReplay) setPhase("typing");
      };
      source.start();
    },
    []
  );

  const playViaHtmlAudio = useCallback(
    (audioContent: string, isReplay: boolean) => {
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      htmlAudioRef.current = audio;
      audio.onended = () => {
        setIsPlaying(false);
        htmlAudioRef.current = null;
        if (!isReplay) setPhase("typing");
      };
      audio.onerror = () => {
        setIsPlaying(false);
        htmlAudioRef.current = null;
        if (!isReplay) setPhase("typing");
      };
      audio.play().catch(() => {
        setIsPlaying(false);
        if (!isReplay) setPhase("typing");
      });
    },
    []
  );

  const playAudio = useCallback(
    async (text: string, isReplay: boolean) => {
      stopCurrentAudio();
      setIsPlaying(true);
      setError(null);

      try {
        let audioContent = audioDataRef.current;

        if (!audioContent) {
          setAudioLoading(true);
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          });

          if (!res.ok) {
            const errBody = await res.text().catch(() => "");
            throw new Error(`TTS ${res.status}: ${errBody}`);
          }

          const data = await res.json();
          audioContent = data.audioContent;
          audioDataRef.current = audioContent;
          setAudioLoading(false);
        }

        const ctx = audioCtxRef.current;
        if (ctx && ctx.state !== "closed") {
          await playViaAudioContext(audioContent!, ctx, isReplay);
        } else {
          playViaHtmlAudio(audioContent!, isReplay);
        }
      } catch (err) {
        console.error("Audio error:", err);
        setError(String(err));
        setIsPlaying(false);
        setAudioLoading(false);
        if (!isReplay) setPhase("typing");
      }
    },
    [stopCurrentAudio, playViaAudioContext, playViaHtmlAudio]
  );

  const startRound = useCallback(
    (roundNum: number) => {
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = createAudioContext();
      }
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }

      const sentence = sentenceQueueRef.current[roundNum - 1];
      if (!sentence) return;

      setRound(roundNum);
      setCurrentSentence(sentence);
      sentenceRef.current = sentence;
      audioDataRef.current = null;
      setPhase("listening");
      setCountdown(0);
      setError(null);

      const voiceMsg: ChatBubbleProps = {
        type: "voice",
        isPlaying: false,
        onPlay: () => {},
        timestamp: getTimeStr(),
      };

      setMessages((prev) => [...prev, voiceMsg]);
      scrollToBottom();

      playAudio(sentence.text, false);
    },
    [playAudio, scrollToBottom]
  );

  const finishGame = useCallback(() => {
    const scores = roundScoresRef.current;
    const correctCount = scores.filter((s) => s >= PASS_THRESHOLD).length;
    const avg =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

    const gameOverMsg: ChatBubbleProps = {
      type: "gameOver",
      correctRounds: correctCount,
      totalRounds: TOTAL_ROUNDS,
      roundScores: [...scores],
      averageScore: avg,
      timestamp: getTimeStr(),
    };

    setMessages((prev) => [...prev, gameOverMsg]);
    setPhase("gameOver");
    scrollToBottom();

    // The big finale — celebrate a good run with a fanfare + confetti.
    if (correctCount >= 2) {
      playSound("win");
      setConfettiKey((k) => k + 1);
    }
  }, [scrollToBottom]);

  const startGame = useCallback(() => {
    unlockAudio();
    // Prefer sentences the player hasn't seen yet; remember the ones served so
    // the next game pulls fresh ones until this difficulty is exhausted.
    const sentences = getFreshSentences(
      TOTAL_ROUNDS,
      difficulty,
      getSeenIds()
    );
    markSeen(sentences.map((s) => s.id));
    sentenceQueueRef.current = sentences;
    roundScoresRef.current = [];
    setRound(0);
    setMessages([]);
    setSubmitted(false);
    startRound(1);
  }, [difficulty, startRound]);

  useEffect(() => {
    if (phase !== "scored") return;

    setCountdown(AUTO_ADVANCE_SECONDS);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const currentRound = round;
    const timeout = setTimeout(() => {
      if (currentRound >= TOTAL_ROUNDS) {
        finishGame();
      } else {
        startRound(currentRound + 1);
      }
    }, AUTO_ADVANCE_SECONDS * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase, round, startRound, finishGame]);

  const handleReplay = useCallback(() => {
    if (sentenceRef.current && !isPlaying) {
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = createAudioContext();
      }
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }
      playAudio(sentenceRef.current.text, true);
    }
  }, [isPlaying, playAudio]);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.type === "voice"
          ? { ...msg, isPlaying, onPlay: handleReplay }
          : msg
      )
    );
  }, [isPlaying, handleReplay]);

  const handleSend = useCallback(
    (text: string) => {
      if (!currentSentence || phase !== "typing") return;

      const sentMsg: ChatBubbleProps = {
        type: "sent",
        text,
        timestamp: getTimeStr(),
      };
      setMessages((prev) => [...prev, sentMsg]);

      const result: ScoringResult = scoreAnswer(currentSentence.text, text);

      setTimeout(() => {
        const correctionMsg: ChatBubbleProps = {
          type: "correction",
          diffs: result.diffs,
          score: result.score,
          emoji: result.emoji,
          message: result.message,
          expectedText: currentSentence.text,
          timestamp: getTimeStr(),
        };
        setMessages((prev) => [...prev, correctionMsg]);
        roundScoresRef.current = [...roundScoresRef.current, result.score];
        setPhase("scored");
        playSound(result.score >= PASS_THRESHOLD ? "correct" : "wrong");
        scrollToBottom();
      }, 600);
    },
    [currentSentence, phase, scrollToBottom]
  );

  const handlePlayAgain = useCallback(() => {
    stopCurrentAudio();
    setPhase("idle");
    setRound(0);
    roundScoresRef.current = [];
    sentenceQueueRef.current = [];
    setMessages([]);
    setCurrentSentence(null);
    setCountdown(0);
    setError(null);
    setSubmitted(false);
  }, [stopCurrentAudio]);

  const handleSubmitResult = useCallback(async () => {
    const scores = roundScoresRef.current;
    const correct = scores.filter((s) => s >= PASS_THRESHOLD).length;
    const avg =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
    const text = `🎯 הכתבה שלי: ${correct} מתוך ${TOTAL_ROUNDS}\n📊 ממוצע: ${avg}%`;

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } catch {
      /* user cancelled share */
    }
  }, []);

  const isGameActive =
    phase !== "idle" && phase !== "gameOver";

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-[#efeae2] shadow-2xl overflow-hidden relative">
      <header className="bg-[#00a884] text-white px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 flex items-center gap-3 flex-shrink-0 shadow-md z-10">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
          📝
        </div>
        <div className="flex-1 min-w-0" dir="rtl">
          <h1 className="font-semibold text-[17px] leading-tight">הכתבה שלי</h1>
          <p className="text-[13px] text-white/80 truncate">
            {phase === "listening"
              ? audioLoading
                ? `סיבוב ${round} מתוך ${TOTAL_ROUNDS} · מכין...`
                : `סיבוב ${round} מתוך ${TOTAL_ROUNDS} · הקשב...`
              : phase === "typing"
              ? `סיבוב ${round} מתוך ${TOTAL_ROUNDS} · הקלד...`
              : phase === "scored"
              ? `סיבוב ${round} מתוך ${TOTAL_ROUNDS}`
              : phase === "gameOver"
              ? "המשחק הסתיים!"
              : "לחץ על ▶ להתחיל"}
          </p>
        </div>
        {isGameActive && (
          <div className="text-center flex-shrink-0">
            <div className="text-lg font-bold leading-none">
              {round}/{TOTAL_ROUNDS}
            </div>
            <div className="text-[10px] text-white/70">סיבוב</div>
          </div>
        )}
        <button
          onClick={toggleSound}
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-lg flex-shrink-0 active:scale-90 transition-transform touch-manipulation"
          aria-label={soundOn ? "כבה צלילי משחק" : "הפעל צלילי משחק"}
          title={soundOn ? "צלילים פעילים" : "צלילים כבויים"}
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
      </header>

      <div className="bg-[#f0f2f5] px-3 py-2 border-b border-gray-200 flex-shrink-0">
        <DifficultyPicker
          selected={difficulty}
          onChange={setDifficulty}
          disabled={isGameActive}
        />
      </div>

      <div
        className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c4bc' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.length === 0 && <IntroScreen totalRounds={TOTAL_ROUNDS} />}

        {messages.map((msg, i) => (
          <ChatBubble key={i} {...msg} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs px-3 py-1.5 text-center" dir="ltr">
          {error}
        </div>
      )}

      {phase === "typing" ? (
        <ChatInput onSend={handleSend} disabled={false} />
      ) : phase === "gameOver" ? (
        <div className="bg-[#f0f2f5] px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-center gap-3" dir="rtl">
          <button
            onClick={handlePlayAgain}
            className="bg-[#00a884] text-white px-6 py-2.5 rounded-full font-medium text-[15px] hover:bg-[#008f6f] transition-all active:scale-95 shadow-md flex items-center gap-2 touch-manipulation"
          >
            🔄 שחק שוב
          </button>
          <button
            onClick={handleSubmitResult}
            className="bg-white text-[#00a884] border-2 border-[#00a884] px-5 py-2.5 rounded-full font-medium text-[15px] hover:bg-green-50 transition-all active:scale-95 shadow-md flex items-center gap-2 touch-manipulation"
          >
            {submitted ? "✓ הועתק!" : "📋 שלח תוצאה"}
          </button>
        </div>
      ) : (
        <div className="bg-[#f0f2f5] px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-center gap-3">
          {phase === "idle" && (
            <button
              onClick={startGame}
              className="bg-[#00a884] text-white px-6 py-2.5 rounded-full font-medium text-[15px] hover:bg-[#008f6f] transition-all active:scale-95 shadow-md flex items-center gap-2 touch-manipulation"
              dir="rtl"
            >
              <span>▶ התחל משחק</span>
            </button>
          )}
          {phase === "scored" && (
            <button
              onClick={() => {
                if (round >= TOTAL_ROUNDS) {
                  finishGame();
                } else {
                  startRound(round + 1);
                }
              }}
              className="bg-[#00a884] text-white px-6 py-2.5 rounded-full font-medium text-[15px] hover:bg-[#008f6f] transition-all active:scale-95 shadow-md flex items-center gap-2 touch-manipulation"
              dir="rtl"
            >
              <span>
                {round >= TOTAL_ROUNDS
                  ? `סיום (${countdown}) 🏁`
                  : `משפט הבא (${countdown}) ▶`}
              </span>
            </button>
          )}
          {phase === "listening" && (
            <div className="text-gray-500 text-sm py-2.5" dir="rtl">
              {audioLoading ? "⏳ טוען..." : "🎧 הקשב למשפט..."}
            </div>
          )}
        </div>
      )}

      <Confetti fireKey={confettiKey} />
    </div>
  );
}
