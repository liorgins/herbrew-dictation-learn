"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <div className="bg-[#f0f2f5] px-3 py-2 flex items-center gap-2">
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-[#008f6f] transition-colors"
        aria-label="שלח"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.239 1.816-13.239 1.817-.011 7.912z" />
        </svg>
      </button>
      <input
        ref={inputRef}
        dir="rtl"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
        placeholder={placeholder || "הקלד את מה ששמעת..."}
        className="flex-1 bg-white rounded-full px-4 py-2 text-[15px] text-gray-800 outline-none placeholder-gray-400 disabled:opacity-50"
      />
    </div>
  );
}
