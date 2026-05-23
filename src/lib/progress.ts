/**
 * Tracks which sentences a player has already been served, persisted in the
 * browser's localStorage. This lets the game hand out fresh sentences every
 * round instead of repeating ones the player has already practiced.
 */

const SEEN_IDS_KEY = "hebrew-dictation:seen-sentence-ids";

/** Read the list of sentence ids the player has already seen. */
export function getSeenIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SEEN_IDS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((n): n is number => typeof n === "number");
  } catch {
    return [];
  }
}

/** Add sentence ids to the seen list (duplicates are ignored). */
export function markSeen(ids: number[]): void {
  if (typeof window === "undefined") return;
  try {
    const merged = Array.from(new Set([...getSeenIds(), ...ids]));
    window.localStorage.setItem(SEEN_IDS_KEY, JSON.stringify(merged));
  } catch {
    /* storage unavailable or full — fail silently */
  }
}

/** Clear the seen list, so every sentence counts as fresh again. */
export function resetSeen(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SEEN_IDS_KEY);
  } catch {
    /* storage unavailable — fail silently */
  }
}
