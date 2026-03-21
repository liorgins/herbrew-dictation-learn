export interface CharDiff {
  char: string;
  type: "correct" | "wrong" | "missing" | "extra" | "space";
  expected?: string;
}

export interface ScoringResult {
  score: number;
  diffs: CharDiff[];
  correctChars: number;
  totalChars: number;
  message: string;
  emoji: string;
}

const IGNORE_RE = /[\s,.\-!?;:'"()\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4«»״׳]/;

function stripIgnored(s: string): string {
  return s
    .split("")
    .filter((c) => !IGNORE_RE.test(c))
    .join("");
}

/**
 * Compares expected vs actual Hebrew text, ignoring spaces and punctuation.
 * Produces a character-level diff with spaces re-inserted for display.
 */
export function scoreAnswer(expected: string, actual: string): ScoringResult {
  const exp = expected.trim();
  const act = actual.trim();

  const normExp = stripIgnored(exp);
  const normAct = stripIgnored(act);

  if (normAct === normExp) {
    return {
      score: 100,
      diffs: exp.split("").map((c) =>
        IGNORE_RE.test(c)
          ? { char: c, type: "space" as const }
          : { char: c, type: "correct" as const }
      ),
      correctChars: normExp.length,
      totalChars: normExp.length,
      message: "מושלם! כתבת בדיוק נכון!",
      emoji: "🌟",
    };
  }

  const rawDiffs = computeDiff(normExp, normAct);
  const diffs = insertDisplaySpaces(rawDiffs, exp);

  const correctChars = rawDiffs.filter((d) => d.type === "correct").length;
  const totalChars = Math.max(normExp.length, 1);
  const score = Math.round((correctChars / totalChars) * 100);

  return {
    score,
    diffs,
    correctChars,
    totalChars,
    message: getMessage(score),
    emoji: getEmoji(score),
  };
}

/**
 * Re-inserts spaces/punctuation from the original expected text into the
 * stripped diff so the correction display is readable with word breaks.
 */
function insertDisplaySpaces(rawDiffs: CharDiff[], originalExpected: string): CharDiff[] {
  const spacesBefore = buildSpaceMap(originalExpected);
  const result: CharDiff[] = [];
  let expIdx = 0;

  for (const d of rawDiffs) {
    if (d.type === "extra") {
      result.push(d);
      continue;
    }
    const spaces = spacesBefore.get(expIdx);
    if (spaces) {
      for (const ch of spaces) {
        result.push({ char: ch, type: "space" });
      }
    }
    result.push(d);
    expIdx++;
  }

  const trailing = spacesBefore.get(expIdx);
  if (trailing) {
    for (const ch of trailing) {
      result.push({ char: ch, type: "space" });
    }
  }

  return result;
}

/**
 * Maps each normalized-char index to the punctuation/spaces that
 * appear before it in the original string.
 */
function buildSpaceMap(original: string): Map<number, string> {
  const map = new Map<number, string>();
  let normalIdx = 0;
  let pending = "";

  for (const ch of original) {
    if (IGNORE_RE.test(ch)) {
      pending += ch;
    } else {
      if (pending) {
        map.set(normalIdx, pending);
        pending = "";
      }
      normalIdx++;
    }
  }
  if (pending) {
    map.set(normalIdx, pending);
  }
  return map;
}

function getMessage(score: number): string {
  if (score >= 95) return "כמעט מושלם! עבודה מעולה!";
  if (score >= 80) return "יופי! רוב המילים נכונות!";
  if (score >= 60) return "לא רע! אפשר לשפר";
  if (score >= 40) return "יש מקום לשיפור!";
  return "בוא ננסה שוב, אתה יכול!";
}

function getEmoji(score: number): string {
  if (score >= 95) return "🌟";
  if (score >= 80) return "😊";
  if (score >= 60) return "👍";
  if (score >= 40) return "💪";
  return "🔄";
}

function computeDiff(expected: string, actual: string): CharDiff[] {
  const m = expected.length;
  const n = actual.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (expected[i - 1] === actual[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const diffs: CharDiff[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && expected[i - 1] === actual[j - 1]) {
      diffs.push({ char: expected[i - 1], type: "correct" });
      i--;
      j--;
    } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      diffs.push({
        char: actual[j - 1],
        type: "wrong",
        expected: expected[i - 1],
      });
      i--;
      j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      diffs.push({ char: expected[i - 1], type: "missing" });
      i--;
    } else {
      diffs.push({ char: actual[j - 1], type: "extra" });
      j--;
    }
  }

  diffs.reverse();
  return diffs;
}
