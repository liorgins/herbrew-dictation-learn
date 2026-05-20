"use client";

/**
 * Synthesized sound effects via the Web Audio API — no asset files.
 * Feedback sound is ON by default; the preference persists in localStorage.
 *
 * Note: this only controls game feedback sounds (chimes/fanfare). The
 * dictation TTS audio always plays — it is the question the player must hear.
 */

const STORAGE_KEY = "dictation:sound";

export type SoundName = "correct" | "wrong" | "win" | "tap";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx || ctx.state === "closed") {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = Ctx ? new Ctx() : null;
    } catch {
      ctx = null;
    }
  }
  if (ctx?.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEY) !== "off";
}

export function setSoundEnabled(on: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
}

/** Resumes/creates the audio context — call from a user gesture. */
export function unlockAudio(): void {
  getCtx();
}

/** Schedules one tone. `start` is an offset in seconds from "now". */
function tone(
  c: AudioContext,
  freq: number,
  start: number,
  duration: number,
  opts: { type?: OscillatorType; gain?: number } = {}
): void {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = opts.type ?? "sine";
  osc.frequency.value = freq;
  const peak = opts.gain ?? 0.18;
  const t0 = c.currentTime + start;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(peak, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.03);
}

const NOTE = { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, C6: 1046.5 };

export function playSound(name: SoundName): void {
  if (!isSoundEnabled()) return;
  const c = getCtx();
  if (!c) return;

  switch (name) {
    case "correct":
      // gentle two-note rise
      tone(c, NOTE.E5, 0, 0.18, { type: "sine", gain: 0.16 });
      tone(c, NOTE.G5, 0.1, 0.24, { type: "sine", gain: 0.16 });
      break;
    case "wrong":
      // soft low blip — encouraging, not harsh
      tone(c, 311.13, 0, 0.2, { type: "triangle", gain: 0.11 });
      tone(c, 246.94, 0.12, 0.26, { type: "triangle", gain: 0.11 });
      break;
    case "win":
      // ascending arpeggio fanfare for the finale
      tone(c, NOTE.C5, 0, 0.2, { type: "triangle", gain: 0.17 });
      tone(c, NOTE.E5, 0.13, 0.2, { type: "triangle", gain: 0.17 });
      tone(c, NOTE.G5, 0.26, 0.2, { type: "triangle", gain: 0.17 });
      tone(c, NOTE.C6, 0.39, 0.55, { type: "triangle", gain: 0.2 });
      break;
    case "tap":
      tone(c, NOTE.D5, 0, 0.07, { type: "sine", gain: 0.1 });
      break;
  }
}
