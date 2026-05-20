"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
  /** Increment this value to trigger a fresh burst. */
  fireKey: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rot: number;
  vrot: number;
  shape: "rect" | "circle";
}

const COLORS = ["#00a884", "#f4c430", "#ff8c42", "#53bdeb", "#ff5d8f", "#7ed957"];

/**
 * Lightweight canvas confetti burst — no dependencies.
 * Covers its (positioned) parent; fires once each time `fireKey` changes.
 */
export default function Confetti({ fireKey }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (fireKey <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    const W = rect?.width ?? canvas.clientWidth;
    const H = rect?.height ?? canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = Array.from({ length: 110 }, () => {
      const speed = 4 + Math.random() * 7;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
      return {
        x: W / 2 + (Math.random() - 0.5) * W * 0.5,
        y: H * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 5 + Math.random() * 7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        shape: Math.random() < 0.5 ? "rect" : "circle",
      };
    });

    const gravity = 0.16;
    const maxFrames = 220;
    let frame = 0;

    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      const fade = Math.max(0, 1 - frame / maxFrames);
      for (const p of particles) {
        p.vy += gravity;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        if (p.y < H + 24) alive = true;
        ctx.globalAlpha = fade;
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (alive && frame < maxFrames) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [fireKey]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-50 h-full w-full"
    />
  );
}
