"use client";

interface IntroScreenProps {
  totalRounds: number;
}

const steps = [
  { n: "1", emoji: "🎧", text: "הקשיבו למשפט" },
  { n: "2", emoji: "⌨️", text: "הקלידו מה ששמעתם" },
  { n: "3", emoji: "⭐", text: "אספו כוכבים וציון" },
];

/** Welcome / how-to-play screen shown before a game starts. */
export default function IntroScreen({ totalRounds }: IntroScreenProps) {
  return (
    <div className="flex h-full items-center justify-center px-1 py-6">
      <div
        dir="rtl"
        className="w-full max-w-[330px] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl"
      >
        {/* hero band */}
        <div className="bg-gradient-to-b from-[#00a884] to-[#017d62] px-5 py-7 text-center">
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg animate-[bounce-slow_2s_ease-in-out_infinite]">
            <span className="text-4xl">🎧</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white drop-shadow">
            משחק ההכתבה
          </h2>
          <p className="mt-1 text-[13px] font-medium text-white/90">
            {totalRounds} סיבובים · הקשיבו, הקלידו, נצחו!
          </p>
        </div>

        {/* how to play */}
        <div className="px-4 py-5">
          <h3 className="mb-3 text-center text-[13px] font-bold text-gray-400">
            איך משחקים?
          </h3>
          <div className="space-y-2">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex items-center gap-3 rounded-2xl bg-gray-50 px-3 py-2.5"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#00a884] text-base font-bold text-white shadow-sm">
                  {s.n}
                </span>
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-[15px] font-semibold text-gray-700">
                  {s.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-[#00a884]/10 px-3 py-2 text-[12px] font-bold text-[#017d62]">
            <span className="text-sm">⬆</span>
            <span>בחרו רמה למעלה ולחצו ▶ להתחיל</span>
          </div>
        </div>
      </div>
    </div>
  );
}
