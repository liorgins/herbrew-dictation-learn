"use client";

import { useEffect, useState } from "react";
import { CharDiff, getStars } from "@/lib/scoring";

/**
 * Deterministic decorative waveform — 28 bar heights derived from a seed
 * string. Pure (no Math.random), so it is stable across re-renders.
 */
function waveform(seed: string): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  return Array.from({ length: 28 }, (_, i) => {
    h = Math.imul(h ^ (h >>> 15), 1 | (i + 1));
    h ^= h >>> 13;
    return ((h >>> 0) % 1000) / 1000 * 60 + 20;
  });
}

interface VoiceMessageProps {
  type: "voice";
  isPlaying: boolean;
  onPlay: () => void;
  timestamp: string;
}

interface TextMessageProps {
  type: "sent";
  text: string;
  timestamp: string;
}

interface CorrectionMessageProps {
  type: "correction";
  diffs: CharDiff[];
  score: number;
  emoji: string;
  message: string;
  expectedText: string;
  timestamp: string;
}

interface GameOverMessageProps {
  type: "gameOver";
  correctRounds: number;
  totalRounds: number;
  roundScores: number[];
  averageScore: number;
  timestamp: string;
}

export type ChatBubbleProps =
  | VoiceMessageProps
  | TextMessageProps
  | CorrectionMessageProps
  | GameOverMessageProps;

export default function ChatBubble(props: ChatBubbleProps) {
  if (props.type === "voice") {
    return <VoiceBubble {...props} />;
  }
  if (props.type === "sent") {
    return <SentBubble {...props} />;
  }
  if (props.type === "gameOver") {
    return <GameOverBubble {...props} />;
  }
  return <CorrectionBubble {...props} />;
}

function VoiceBubble({
  isPlaying,
  onPlay,
  timestamp,
}: VoiceMessageProps) {
  const barHeights = waveform(timestamp);
  return (
    <div className="flex justify-end mb-3">
      <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm px-3 py-2 max-w-[85%] min-w-[200px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">🎧</span>
          </div>
          <button
            onClick={onPlay}
            className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0 hover:bg-[#008f6f] transition-colors"
            aria-label="השמע הודעה קולית"
          >
            {isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>
          <div className="flex-1 flex items-center gap-[2px] h-6">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className={`w-[3px] rounded-full transition-all duration-150 ${
                  isPlaying ? "bg-[#00a884]" : "bg-gray-300"
                }`}
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="text-[11px] text-gray-400 text-left mt-1">
          {timestamp}
        </div>
      </div>
    </div>
  );
}

function SentBubble({ text, timestamp }: TextMessageProps) {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-[#d9fdd3] rounded-2xl rounded-tr-sm shadow-sm px-3 py-2 max-w-[85%]">
        <p className="text-[15px] text-gray-800 leading-relaxed text-right" dir="rtl">
          {text}
        </p>
        <div className="flex items-center justify-start gap-1 mt-1">
          <span className="text-[11px] text-gray-500">{timestamp}</span>
          <DoubleCheck />
        </div>
      </div>
    </div>
  );
}

function CorrectionBubble({
  diffs,
  score,
  emoji,
  message,
  expectedText,
  timestamp,
}: CorrectionMessageProps) {
  const stars = getStars(score);
  const passed = score >= PASS_THRESHOLD;
  return (
    <div className="flex justify-end mb-3">
      <div
        className={`bg-white rounded-2xl rounded-tl-sm shadow-sm px-3 py-2 max-w-[90%] animate-[pop-in_0.3s_ease-out] ${
          passed ? "ring-2 ring-[#00a884]/25" : ""
        }`}
      >
        <div className="text-center mb-2">
          <div className="flex justify-center gap-1 mb-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < stars
                    ? "animate-[star-pop_0.35s_ease-out_both]"
                    : "star-empty"
                }`}
                style={
                  i < stars ? { animationDelay: `${i * 0.12}s` } : undefined
                }
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="text-3xl">{emoji}</span>
          <div className="text-xl font-bold text-[#00a884] mt-1">
            {score}%
          </div>
          <div className="text-sm text-gray-600" dir="rtl">
            {message}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-2" dir="rtl">
          <div className="text-xs text-gray-400 mb-2">מה שכתבת:</div>
          <div className="text-[15px] leading-relaxed">
            {diffs.map((d, i) =>
              d.type === "space" ? (
                <span key={i}>{d.char}</span>
              ) : (
                <span
                  key={i}
                  className={
                    d.type === "correct"
                      ? "text-gray-800"
                      : d.type === "wrong"
                      ? "bg-red-100 text-red-600 rounded px-[2px]"
                      : d.type === "extra"
                      ? "bg-orange-100 text-orange-600 line-through rounded px-[2px]"
                      : "bg-yellow-100 text-yellow-700 rounded px-[2px] border-b-2 border-dashed border-yellow-400"
                  }
                  title={
                    d.type === "wrong"
                      ? `צריך להיות: ${d.expected}`
                      : d.type === "missing"
                      ? "אות חסרה"
                      : d.type === "extra"
                      ? "אות מיותרת"
                      : ""
                  }
                >
                  {d.char}
                </span>
              )
            )}
          </div>
        </div>

        <div className="bg-[#e8f5e9] rounded-xl p-3" dir="rtl">
          <div className="text-xs text-gray-400 mb-2">המשפט הנכון:</div>
          <div className="text-[15px] text-gray-800 leading-relaxed">
            {expectedText}
          </div>
        </div>

        <div className="mt-2 flex gap-2 text-xs text-gray-400 flex-wrap" dir="rtl">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            שגיאה
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            חסר
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
            מיותר
          </span>
        </div>

        <div className="text-[11px] text-gray-400 text-left mt-2">
          {timestamp}
        </div>
      </div>
    </div>
  );
}

const PASS_THRESHOLD = 80;

const tierConfig = {
  thrilled: {
    emoji: "🤩",
    bg: "from-emerald-50 to-green-100",
    border: "border-green-300",
    title: "מדהים! אלוף ההכתבה!",
    scoreColor: "text-green-600",
    glow: "shadow-green-200/60",
  },
  semiHappy: {
    emoji: "😊",
    bg: "from-amber-50 to-yellow-100",
    border: "border-yellow-300",
    title: "כל הכבוד! ממשיכים להשתפר!",
    scoreColor: "text-amber-600",
    glow: "shadow-amber-200/60",
  },
  sad: {
    emoji: "😢",
    bg: "from-rose-50 to-pink-100",
    border: "border-red-200",
    title: "לא נורא! תרגול עושה מושלם!",
    scoreColor: "text-red-500",
    glow: "shadow-red-200/60",
  },
} as const;

function GameOverBubble({
  correctRounds,
  totalRounds,
  roundScores,
  averageScore,
  timestamp,
}: GameOverMessageProps) {
  const tier =
    correctRounds >= 4 ? "thrilled" : correctRounds >= 2 ? "semiHappy" : "sad";
  const { emoji, bg, border, title, scoreColor, glow } = tierConfig[tier];

  const overallStars = getStars(averageScore);
  const totalStars = roundScores.reduce((sum, s) => sum + getStars(s), 0);
  const maxStars = totalRounds * 3;

  // count up the collected-stars total for a little payoff
  const [shownStars, setShownStars] = useState(0);
  useEffect(() => {
    if (totalStars <= 0) {
      setShownStars(0);
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      n++;
      setShownStars(n);
      if (n >= totalStars) clearInterval(id);
    }, 110);
    return () => clearInterval(id);
  }, [totalStars]);

  return (
    <div className="flex justify-center mb-3 px-2">
      <div
        className={`bg-gradient-to-b ${bg} ${border} border-2 rounded-3xl shadow-xl ${glow} px-5 py-5 max-w-[94%] w-full animate-[pop-in_0.4s_ease-out]`}
      >
        <div className="text-center" dir="rtl">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-[11px] font-extrabold tracking-wide text-gray-500">
            {tier === "sad" ? "סוף המשחק" : "🏁 כל הכבוד!"}
          </span>
        </div>

        <div className="mt-3 flex items-end justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`${i === 1 ? "text-5xl" : "text-4xl"} ${
                i < overallStars
                  ? "animate-[star-pop_0.45s_ease-out_both]"
                  : "star-empty"
              }`}
              style={
                i < overallStars
                  ? { animationDelay: `${i * 0.2}s` }
                  : undefined
              }
            >
              ⭐
            </span>
          ))}
        </div>

        <div className="mt-2 text-center" dir="rtl">
          <div className={`text-3xl font-extrabold ${scoreColor}`}>
            {correctRounds} מתוך {totalRounds}
          </div>
          <div className="mt-0.5 text-sm font-medium text-gray-600">
            {emoji} {title}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-1.5" dir="rtl">
          {roundScores.map((score, i) => {
            const passed = score >= PASS_THRESHOLD;
            return (
              <div
                key={i}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-[11px] font-bold ${
                  passed
                    ? "border-green-400 bg-green-100 text-green-700"
                    : "border-red-300 bg-red-100 text-red-600"
                }`}
              >
                {score}%
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center gap-2" dir="rtl">
          <span className="rounded-full bg-white/80 px-3 py-1.5 text-sm font-bold text-amber-600 shadow-sm">
            ⭐ {shownStars}/{maxStars} כוכבים
          </span>
          <span className="rounded-full bg-white/80 px-3 py-1.5 text-sm font-bold text-gray-700 shadow-sm">
            ממוצע {averageScore}%
          </span>
        </div>

        <div className="mt-3 text-center text-[11px] text-gray-400">
          {timestamp}
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function DoubleCheck() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
      <path
        d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.585a.46.46 0 0 0-.38-.153.52.52 0 0 0-.326.153.477.477 0 0 0-.073.586l2.357 3.06c.1.127.254.2.41.178a.49.49 0 0 0 .393-.178L11.18 1.29a.478.478 0 0 0-.108-.637z"
        fill="#53bdeb"
      />
      <path
        d="M14.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-0.7-.9a.46.46 0 0 0-.38-.152.52.52 0 0 0-.326.152.477.477 0 0 0-.073.587l1.056 1.37c.1.128.254.2.41.179a.49.49 0 0 0 .393-.178L14.18 1.29a.478.478 0 0 0-.108-.637z"
        fill="#53bdeb"
      />
    </svg>
  );
}
