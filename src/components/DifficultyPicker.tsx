"use client";

interface DifficultyPickerProps {
  selected: 1 | 2 | 3;
  onChange: (d: 1 | 2 | 3) => void;
  disabled?: boolean;
}

const levels = [
  { value: 1 as const, label: "קל", emoji: "⭐" },
  { value: 2 as const, label: "בינוני", emoji: "⭐⭐" },
  { value: 3 as const, label: "מאתגר", emoji: "⭐⭐⭐" },
];

export default function DifficultyPicker({ selected, onChange, disabled }: DifficultyPickerProps) {
  return (
    <div className={`flex gap-2 justify-center ${disabled ? "opacity-50" : ""}`} dir="rtl">
      {levels.map((level) => (
        <button
          key={level.value}
          onClick={() => onChange(level.value)}
          disabled={disabled}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            selected === level.value
              ? "bg-[#00a884] text-white shadow-md scale-105"
              : "bg-white text-gray-600 hover:bg-gray-100"
          } disabled:cursor-not-allowed`}
        >
          {level.emoji} {level.label}
        </button>
      ))}
    </div>
  );
}
