"use client";

interface DifficultyPickerProps {
  selected: 1 | 2 | 3;
  onChange: (d: 1 | 2 | 3) => void;
  disabled?: boolean;
}

const levels = [
  { value: 1 as const, label: "קל", stars: 1, hint: "משפטים קצרים" },
  { value: 2 as const, label: "בינוני", stars: 2, hint: "משפטים בינוניים" },
  { value: 3 as const, label: "מאתגר", stars: 3, hint: "משפטים ארוכים" },
];

export default function DifficultyPicker({
  selected,
  onChange,
  disabled,
}: DifficultyPickerProps) {
  return (
    <div
      className={`grid grid-cols-3 gap-2 ${disabled ? "opacity-60" : ""}`}
      dir="rtl"
    >
      {levels.map((level) => {
        const isSelected = selected === level.value;
        return (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={`relative flex flex-col items-center gap-0.5 rounded-2xl border-2 px-2 py-2 transition-all touch-manipulation disabled:cursor-not-allowed ${
              isSelected
                ? "border-[#00a884] bg-[#00a884]/10 shadow-md scale-[1.03]"
                : "border-transparent bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex gap-0.5 text-[13px] leading-none">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={i < level.stars ? "" : "grayscale opacity-25"}
                >
                  ⭐
                </span>
              ))}
            </div>
            <span
              className={`text-[14px] font-bold leading-tight ${
                isSelected ? "text-[#00a884]" : "text-gray-700"
              }`}
            >
              {level.label}
            </span>
            <span className="text-[10px] leading-tight text-gray-400">
              {level.hint}
            </span>
            {isSelected && (
              <span className="absolute -top-1.5 -left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#00a884] text-[9px] text-white shadow">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
