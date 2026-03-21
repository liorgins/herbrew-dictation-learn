export interface Sentence {
  id: number;
  text: string;
  difficulty: 1 | 2 | 3;
}

export const sentences: Sentence[] = [
  // difficulty 1 — short sentences with confusing letters (ק/כ, ח/ה, א/ע, ב/ו, ט/ת, ך)
  { id: 1, text: "הקוף אכל את הבננה", difficulty: 1 },
  { id: 2, text: "הכלב הקטן טייל בחוץ", difficulty: 1 },
  { id: 3, text: "אבא קנה חולצה כחולה", difficulty: 1 },
  { id: 4, text: "הוא כתב את השיעורים", difficulty: 1 },
  { id: 5, text: "הביאו כוס חלב קר", difficulty: 1 },
  { id: 6, text: "הכובע החום על הכיסא", difficulty: 1 },
  { id: 7, text: "הקוסם הוציא ארנב לבן", difficulty: 1 },
  { id: 8, text: "ברווז קטן שחה בבריכה", difficulty: 1 },
  { id: 9, text: "אכלתי תות עם קצפת", difficulty: 1 },
  { id: 10, text: "אחותי בחרה חולצה כתומה", difficulty: 1 },
  { id: 11, text: "הבית הוקף בחומה גבוהה", difficulty: 1 },
  { id: 12, text: "הכוכב הבהיק בחשכה", difficulty: 1 },

  // difficulty 2 — medium sentences with confusing letters
  { id: 13, text: "אחרי הביקור בחנות קנינו כרטיסים", difficulty: 2 },
  { id: 14, text: "הכיתה הקטנה טיילה בחורשה הקרובה", difficulty: 2 },
  { id: 15, text: "אבא ביקש לכתוב חיבור על הטיול", difficulty: 2 },
  { id: 16, text: "בחורף היה קור כבד והוצאתי מעיל", difficulty: 2 },
  { id: 17, text: "החברה שלי כותבת סיפורים בכישרון", difficulty: 2 },
  { id: 18, text: "ביום חמישי טיילנו ליד הכנרת", difficulty: 2 },
  { id: 19, text: "אחרי הקניות חזרנו הביתה באוטובוס", difficulty: 2 },
  { id: 20, text: "אכלתי חביתה עם ירקות טריים בבוקר", difficulty: 2 },
  { id: 21, text: "הכוכבים בחוץ נראו בוהקים וחמימים", difficulty: 2 },
  { id: 22, text: "כבר בתחילת הבוקר הרגשתי התרגשות", difficulty: 2 },
  { id: 23, text: "בטיול הקצר קטפנו תותים חמוצים", difficulty: 2 },
  { id: 24, text: "קבוצת הכדורגל ביקרה בבית הספר", difficulty: 2 },

  // difficulty 3 — long sentences with confusing letters
  { id: 25, text: "החבר הכי טוב שלי קנה לי ספר מתנה ביום ההולדת", difficulty: 3 },
  { id: 26, text: "בחנות הבגדים קניתי חולצה כתומה ומכנסיים חדשים", difficulty: 3 },
  { id: 27, text: "אחרי הטיול הארוך חזרנו הביתה והתקלחנו במים קרים", difficulty: 3 },
  { id: 28, text: "הקבוצה שלנו ביקרה במוזיאון והתבוננה בתמונות ישנות", difficulty: 3 },
  { id: 29, text: "בביקור אצל סבתא אכלנו עוגת תפוחים טעימה", difficulty: 3 },
  { id: 30, text: "כתבתי מכתב ארוך לחבר הטוב שלי שעבר לעיר אחרת", difficulty: 3 },
  { id: 31, text: "ביום חמישי הכיתה שלנו תבקר בחווה ותאכיל חיות", difficulty: 3 },
  { id: 32, text: "הקוסם הביא ארנבת מתוך הכובע והקהל התפעל", difficulty: 3 },
  { id: 33, text: "בחנות הספרים הקטנה קראתי חוברת ובחרתי ספר טוב", difficulty: 3 },
  { id: 34, text: "בטקס בבית הספר הקריאו את שמות התלמידים המצטיינים", difficulty: 3 },
  { id: 35, text: "התקשרתי לחבר וביקשתי ממנו להביא את הכדור לאימון", difficulty: 3 },
  { id: 36, text: "בחופש הגדול ביקרנו בבאר שבע וטיילנו בנחל הבשור", difficulty: 3 },
];

export function getSentencesByDifficulty(difficulty: 1 | 2 | 3): Sentence[] {
  return sentences.filter((s) => s.difficulty === difficulty);
}

export function getRandomSentence(difficulty?: 1 | 2 | 3): Sentence {
  const pool = difficulty ? getSentencesByDifficulty(difficulty) : sentences;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomSentences(count: number, difficulty: 1 | 2 | 3): Sentence[] {
  const pool = getSentencesByDifficulty(difficulty);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
