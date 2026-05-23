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

  // difficulty 1 — short sentences, each contains א, ה, כ, ח, ע
  { id: 37, text: "החתול עלה על הכיסא", difficulty: 1 },
  { id: 38, text: "העכבר אכל את הלחם", difficulty: 1 },
  { id: 39, text: "הילד שכח את המעיל", difficulty: 1 },
  { id: 40, text: "עכשיו אכלתי את הלחם", difficulty: 1 },
  { id: 41, text: "אמא שכחה את העוגה", difficulty: 1 },
  { id: 42, text: "העכבר ברח אל החדר", difficulty: 1 },
  { id: 43, text: "עכשיו אבא פתח את החלון", difficulty: 1 },
  { id: 44, text: "אכלתי עוגה חמה בערב", difficulty: 1 },
  { id: 45, text: "עכבר אחד ברח מהחתול", difficulty: 1 },
  { id: 46, text: "הילד שכח את הכובע", difficulty: 1 },
  { id: 47, text: "החברה כעסה על אמא", difficulty: 1 },
  { id: 48, text: "עכשיו החתול אוכל", difficulty: 1 },
  { id: 49, text: "אבא והכלב חיכו ליד העץ", difficulty: 1 },
  { id: 50, text: "עכבר אחד אכל גבינה", difficulty: 1 },
  { id: 51, text: "הכלב חפר עמוק באדמה", difficulty: 1 },
  { id: 52, text: "החתול עלה אל הכביש", difficulty: 1 },
  { id: 53, text: "אמא עזרה לי לחכות", difficulty: 1 },
  { id: 54, text: "עכשיו אני עומד ליד החלון", difficulty: 1 },
  { id: 55, text: "החבר שלי אכל את העוגה", difficulty: 1 },
  { id: 56, text: "אכלנו עוגה ליד החבר", difficulty: 1 },
  { id: 57, text: "החמור אכל על הכביש", difficulty: 1 },
  { id: 58, text: "עכשיו אבא שותה חלב", difficulty: 1 },
  { id: 59, text: "הילדה אכלה עוגה חמה", difficulty: 1 },
  { id: 60, text: "אבא חיכה לי על הכביש", difficulty: 1 },
  { id: 61, text: "עכבר אחד חיכה ליד הכלוב", difficulty: 1 },
  { id: 62, text: "הכלב החום עלה אל העץ", difficulty: 1 },
  { id: 63, text: "אמא אכלה עוגה עם החבר", difficulty: 1 },
  { id: 64, text: "החבר עזר לי לאכול", difficulty: 1 },
  { id: 65, text: "עכשיו החתול רעב מאוד", difficulty: 1 },
  { id: 66, text: "עכשיו הילד אוכל בחצר", difficulty: 1 },
  { id: 67, text: "החמור עבר את הכביש", difficulty: 1 },
  { id: 68, text: "אכלתי תפוח עם החבר", difficulty: 1 },
  { id: 69, text: "הכלב חיכה לאמא בערב", difficulty: 1 },
  { id: 70, text: "עכשיו אבא חזר הביתה", difficulty: 1 },

  // difficulty 2 — medium sentences, each contains א, ה, כ, ח, ע
  { id: 71, text: "אחרי הצהריים החבר שלי עזר לי לשחק בכדור", difficulty: 2 },
  { id: 72, text: "בחנות הגדולה אמא קנתה לי כובע וחולצה", difficulty: 2 },
  { id: 73, text: "עכשיו אנחנו הולכים לטייל בחוף הים", difficulty: 2 },
  { id: 74, text: "הילד החדש בכיתה אהב לעזור לחברים", difficulty: 2 },
  { id: 75, text: "בערב כל המשפחה אכלה ארוחה חמה ביחד", difficulty: 2 },
  { id: 76, text: "אחותי הקטנה אוהבת לאכול עוגה בשוקולד", difficulty: 2 },
  { id: 77, text: "המורה הסבירה לכיתה איך לכתוב חיבור על החופש", difficulty: 2 },
  { id: 78, text: "אתמול הכיתה שלנו ביקרה בחוות העזים", difficulty: 2 },
  { id: 79, text: "החבר הכי טוב שלי עבר לגור בעיר אחרת", difficulty: 2 },
  { id: 80, text: "בכל בוקר אני אוכל פרוסת לחם עם גבינה", difficulty: 2 },
  { id: 81, text: "הכלב שלנו אוהב לשחק עם החתול בחצר", difficulty: 2 },
  { id: 82, text: "אחרי שהשמש שקעה הלכנו הביתה ברגל", difficulty: 2 },
  { id: 83, text: "עכשיו הילדים משחקים במחבואים אחרי הצהריים", difficulty: 2 },
  { id: 84, text: "אמא הכינה עוגת תפוחים טעימה ליום ההולדת", difficulty: 2 },
  { id: 85, text: "החורף הקר הגיע וכולנו הוצאנו מעילים חמים", difficulty: 2 },
  { id: 86, text: "בשיעור המדע למדנו איך כל הצמחים גדלים", difficulty: 2 },
  { id: 87, text: "הקוסם הוציא ארנב לבן מהכובע והקהל מחא כפיים", difficulty: 2 },
  { id: 88, text: "אחרי הגשם הכבד יצאה קשת בעננים", difficulty: 2 },
  { id: 89, text: "הכיתה שלנו עלתה לאוטובוס ונסעה לחוף הים", difficulty: 2 },
  { id: 90, text: "בכל ערב שישי סבתא מכינה לנו ארוחה חגיגית", difficulty: 2 },
  { id: 91, text: "בערב הילד פחד מהחושך וכיבה את האור", difficulty: 2 },
  { id: 92, text: "אחותי הגדולה כותבת סיפורים על חיות הבר", difficulty: 2 },
  { id: 93, text: "עכשיו אנחנו לומדים את לוח הכפל בעל פה", difficulty: 2 },
  { id: 94, text: "החנות הקטנה אצלנו מוכרת עוגות וממתקים", difficulty: 2 },
  { id: 95, text: "אבא לימד אותי איך לרכוב על האופניים בחצר", difficulty: 2 },
  { id: 96, text: "כל הכיתה התרגשה אל המסיבה החגיגית בעיר", difficulty: 2 },
  { id: 97, text: "כל הילדים אספו עלים יבשים בגינה אחרי השיעור", difficulty: 2 },
  { id: 98, text: "בערב חנוכה הדלקנו נרות ואכלנו סופגניות חמות", difficulty: 2 },
  { id: 99, text: "המורה ביקשה מאיתנו לכתוב חיבור על החופש הגדול", difficulty: 2 },
  { id: 100, text: "אחרי האימון הארוך כולנו היינו עייפים ורעבים", difficulty: 2 },
  { id: 101, text: "הכלב הנאמן חיכה לבעליו ליד שער הבית", difficulty: 2 },
  { id: 102, text: "עכשיו הגיע הזמן ללכת לישון אחרי יום ארוך", difficulty: 2 },
  { id: 103, text: "אמא אספה את הכביסה היבשה מעל החבל", difficulty: 2 },

  // difficulty 3 — long sentences, each contains א, ה, כ, ח, ע
  { id: 104, text: "אחרי הטיול הארוך בהרים חזרנו הביתה והכנו ארוחת ערב חמה", difficulty: 3 },
  { id: 105, text: "הקוסם הזמין ילד מהקהל אל הבמה והוציא ארנב לבן מתוך כובעו החדש", difficulty: 3 },
  { id: 106, text: "בשיעור הטבע כל הילדים יצאו אל החצר ולמדו על הצמחים", difficulty: 3 },
  { id: 107, text: "אתמול אחרי הצהריים הלכנו עם החברים לשחק כדורגל במגרש הגדול", difficulty: 3 },
  { id: 108, text: "סבתא סיפרה לנו סיפור ארוך על הכפר שבו היא חיה כשהיתה ילדה", difficulty: 3 },
  { id: 109, text: "המורה חילקה לכל התלמידים צבעים וביקשה לצייר את החופש", difficulty: 3 },
  { id: 110, text: "בכל שנה אנחנו נוסעים לחופשה משפחתית ארוכה אל הים בעיר אילת", difficulty: 3 },
  { id: 111, text: "הילד הקטן למד לרכוב על האופניים אחרי שאבא עזר לו והחזיק את הכיסא", difficulty: 3 },
  { id: 112, text: "כשהגיע החורף הקר לבשנו מעילים חמים ואז ירדנו לשחק בשלג", difficulty: 3 },
  { id: 113, text: "אחרי שסיימנו את כל שיעורי הבית הלכנו לשחק בפארק עם כל החברים", difficulty: 3 },
  { id: 114, text: "כל המשפחה שלנו אוהבת לטייל בטבע ולחפש פרחים יפים בהר", difficulty: 3 },
  { id: 115, text: "ביום ההולדת שלי הזמנתי את כל החברים מהכיתה ואכלנו עוגה גדולה ביחד", difficulty: 3 },
  { id: 116, text: "הרופאה בדקה את הילד החולה והסבירה לכולם איך לעזור לו", difficulty: 3 },
  { id: 117, text: "בחג הפסח כל המשפחה התאספה יחד וערכנו שולחן חגיגי", difficulty: 3 },
  { id: 118, text: "אתמול בערב צפינו במשחק כדורגל מרתק והקבוצה האהובה עלינו ניצחה", difficulty: 3 },
  { id: 119, text: "הילדה הקטנה אספה צדפים יפים על חוף הים ושמה אותם בכיס", difficulty: 3 },
  { id: 120, text: "כשהמורה נכנסה לכיתה כל התלמידים החדשים קמו ובירכו אותה בקול נעים", difficulty: 3 },
  { id: 121, text: "אחרי הארוחה עזרתי לאמא לשטוף את הכלים ולסדר את המטבח הגדול", difficulty: 3 },
  { id: 122, text: "בלילה החשוך שמענו את רוח הסערה מנשבת בכל העצים שליד הבית", difficulty: 3 },
  { id: 123, text: "המורה לימדה אותנו שיר עברי חדש וכולנו שרנו אותו בשמחה", difficulty: 3 },
  { id: 124, text: "בכל ערב לפני השינה אני מצחצח שיניים ואוכל ארוחה קלה", difficulty: 3 },
  { id: 125, text: "הסבא שלי אוהב לספר על החיים בכפר שבו גדל כשהיה ילד צעיר", difficulty: 3 },
  { id: 126, text: "כשהשמש שקעה מאחורי ההרים הילדים אספו את הצעצועים וחזרו הביתה", difficulty: 3 },
  { id: 127, text: "אתמול בטיול השנתי הכיתה שלנו עצרה לנוח ליד מעיין קר", difficulty: 3 },
  { id: 128, text: "אמא הסבירה לי שחשוב לאכול הרבה ירקות כדי לגדול חזק ובריא בעתיד", difficulty: 3 },
  { id: 129, text: "כל החברים שלי הזמינו אותי לחגוג איתם את הערב המיוחד", difficulty: 3 },
  { id: 130, text: "בשיעור ההיסטוריה כל הכיתה למדה על אנשים חשובים שחיו לפנינו", difficulty: 3 },
  { id: 131, text: "אחרי שהגשם החזק פסק כל הילדים יצאו החוצה וראו קשת צבעונית", difficulty: 3 },
  { id: 132, text: "הילד החדש בכיתה היה ביישן אבל מהר מצא חברים טובים בשיעור", difficulty: 3 },
  { id: 133, text: "במשך כל הקיץ הארוך עזרתי לסבא לטפל בגינה ולהשקות את העצים והפרחים", difficulty: 3 },
  { id: 134, text: "כשהגענו אל פסגת ההר הגבוה עצרנו לנוח והתבוננו בנוף היפה שמסביב", difficulty: 3 },
  { id: 135, text: "המוכר בחנות הצעצועים הראה לנו משחקים חדשים ואנחנו בחרנו כמה מהם", difficulty: 3 },
  { id: 136, text: "לאחר ארוחת הערב הגדולה כל בני המשפחה התיישבו יחד וצפו בסרט מצחיק", difficulty: 3 },

  // difficulty 1 — ב/ו confusion (rafe ב and consonantal ו both sound /v/)
  { id: 137, text: "סבא אהב לקרוא בערב", difficulty: 1 },
  { id: 138, text: "בערב סבתא הכינה עוגה", difficulty: 1 },
  { id: 139, text: "אבי אהב לכתוב סיפורים", difficulty: 1 },
  { id: 140, text: "הצבע הכחול שלי נגמר", difficulty: 1 },
  { id: 141, text: "החווה היפה של סבא ליד הכפר", difficulty: 1 },
  { id: 142, text: "הכובע נפל מהמדף בחדר", difficulty: 1 },
  { id: 143, text: "סבא הוריד עוגה מהמדף", difficulty: 1 },
  { id: 144, text: "הזבוב עף מעל הילדה", difficulty: 1 },
  { id: 145, text: "אבי כתב מכתב ארוך לחבר", difficulty: 1 },
  { id: 146, text: "בערב הזמנתי את החברים והחברות", difficulty: 1 },
  { id: 147, text: "סבתא אופה עוגה ביום שישי", difficulty: 1 },
  { id: 148, text: "הצבי הלבן והגדול רץ מהר", difficulty: 1 },
  { id: 149, text: "בערב אבא יבוא הביתה", difficulty: 1 },
  { id: 150, text: "סבא נסע לים והילדים שיחקו", difficulty: 1 },
  { id: 151, text: "ארנבת קטנה התחבאה וברחה בחצר", difficulty: 1 },
  { id: 152, text: "שובב אחד שיחק עם הכלב", difficulty: 1 },
  { id: 153, text: "בערב כל המשפחה התאספה ואכלה", difficulty: 1 },

  // difficulty 2 — ב/ו confusion
  { id: 154, text: "בערב אבא חזר מהעבודה מאוחר מאוד", difficulty: 2 },
  { id: 155, text: "סבא וסבתא הזמינו אותנו לארוחה גדולה", difficulty: 2 },
  { id: 156, text: "הילד התחבא מאחורי האבן הגדולה בגינה", difficulty: 2 },
  { id: 157, text: "הזבוב הקטן עף סביב הביצה הצהובה", difficulty: 2 },
  { id: 158, text: "אבי המורה לימד אותנו על הסבא הישן", difficulty: 2 },
  { id: 159, text: "החווה הקטנה של אביב הייתה שווה לראייה", difficulty: 2 },
  { id: 160, text: "הצבע הירוק של העלים בעצים יפה מאוד", difficulty: 2 },
  { id: 161, text: "הכותב הצעיר זכה בפרס גדול על ספרו", difficulty: 2 },
  { id: 162, text: "סבתא אהבה לכתוב מכתבים לחברים שלה", difficulty: 2 },
  { id: 163, text: "בחורף הילדים יושבים בחדר עם החתול", difficulty: 2 },
  { id: 164, text: "הצבא יצא לאימון רחב בשטח הפתוח", difficulty: 2 },
  { id: 165, text: "אבי בנה לי סוכה יפה לכבוד החג", difficulty: 2 },
  { id: 166, text: "סבא סיפר לנו על העבר הרחוק שלו", difficulty: 2 },
  { id: 167, text: "הילדים חבטו בכדור על הקרקע הקשה", difficulty: 2 },
  { id: 168, text: "הכובע הצהוב נסחף ברוח החזקה הקרה", difficulty: 2 },
  { id: 169, text: "בקיץ נסענו לטייל בהרי הגליל הירוקים", difficulty: 2 },
  { id: 170, text: "סבא הסביר לנו על העבר של המשפחה", difficulty: 2 },

  // difficulty 3 — ב/ו confusion
  { id: 171, text: "בערב יום שישי כל המשפחה התאספה סביב השולחן לארוחה חגיגית", difficulty: 3 },
  { id: 172, text: "הזבוב הקטן עף מעל הביצה הצהובה ונחת על האף של הילד", difficulty: 3 },
  { id: 173, text: "סבא וסבתא שלי גרים בכפר קטן בצפון הארץ ליד נהר גדול", difficulty: 3 },
  { id: 174, text: "אבי הזקן סיפר לנו על העבר הרחוק כשהיה ילד צעיר", difficulty: 3 },
  { id: 175, text: "החווה הגדולה שליד הכפר מלאה בעצים ירוקים ובחיות שונות", difficulty: 3 },
  { id: 176, text: "הצבע הכחול של הים בקיץ שווה למה שראיתי בחלום", difficulty: 3 },
  { id: 177, text: "בערב חזרנו מהעבודה הביתה עם המתנות שקנינו ליום ההולדת", difficulty: 3 },
  { id: 178, text: "הכותב הצעיר זכה בפרס הגדול על ספרו על אהבה", difficulty: 3 },
  { id: 179, text: "סבא וסבתא הכינו לנו ארוחת ערב טעימה לכבוד שבת", difficulty: 3 },
  { id: 180, text: "הילד התחבא מאחורי האבן הגדולה בגינה כדי שלא יראו אותו", difficulty: 3 },
  { id: 181, text: "הצבא יצא לאימון ארוך בשטח הרחב של הנגב הדרומי", difficulty: 3 },
  { id: 182, text: "בחורף הקר כל המשפחה התאספה סביב האח החם בחדר", difficulty: 3 },
  { id: 183, text: "הכובע הצהוב של סבא נסחף ברוח ונפל בתוך הביצה", difficulty: 3 },
  { id: 184, text: "אבי קנה לי בובה חדשה ליום ההולדת והייתי שמח מאוד", difficulty: 3 },
  { id: 185, text: "בקיץ נסענו לים הצפוני ושיחקנו בחול עד שעות הערב", difficulty: 3 },
  { id: 186, text: "סבא וסבתא שלי שמחו לראות את כל הנכדים ביום ההולדת", difficulty: 3 },

  // difficulty 1 — words ending in ו pronounced /v/ (sounds like ב)
  { id: 187, text: "עכשיו הילד יוצא לחצר", difficulty: 1 },
  { id: 188, text: "אביו של דני קנה אופניים", difficulty: 1 },
  { id: 189, text: "אחיו הקטן צוחק חזק", difficulty: 1 },
  { id: 190, text: "עכשיו אני אוכל פיצה", difficulty: 1 },
  { id: 191, text: "ילדיו של דוד שיחקו בגינה", difficulty: 1 },
  { id: 192, text: "ידיו של אבא חזקות מאוד", difficulty: 1 },
  { id: 193, text: "עכשיו הסבתא בבית הקטן", difficulty: 1 },
  { id: 194, text: "חבריו של רן יבואו מחר", difficulty: 1 },
  { id: 195, text: "אביו הזמין אותו לים", difficulty: 1 },
  { id: 196, text: "עכשיו הכלב נובח חזק", difficulty: 1 },
  { id: 197, text: "אחיו הגדול עזר לי", difficulty: 1 },
  { id: 198, text: "עיניו של הילד עצובות", difficulty: 1 },
  { id: 199, text: "עכשיו אמא מבשלת ארוחה", difficulty: 1 },
  { id: 200, text: "רגליו של הסוס ארוכות", difficulty: 1 },
  { id: 201, text: "עכשיו השמש שוקעת לאט", difficulty: 1 },
  { id: 202, text: "ילדיו של המורה יפים", difficulty: 1 },
  { id: 203, text: "עכשיו הילדה שרה שיר", difficulty: 1 },

  // difficulty 2 — words ending in ו pronounced /v/
  { id: 204, text: "עכשיו דני וחבריו רצים במגרש הגדול", difficulty: 2 },
  { id: 205, text: "אביו של אריאל הוא רופא מומחה בעיר", difficulty: 2 },
  { id: 206, text: "אחיו של אבי הזמין אותנו לארוחה משפחתית", difficulty: 2 },
  { id: 207, text: "עכשיו הילדים יוצאים להפסקה הארוכה בחצר", difficulty: 2 },
  { id: 208, text: "ידיו של הצייר היו צבועות בכל הצבעים", difficulty: 2 },
  { id: 209, text: "עכשיו הגן פרח בכל הצבעים השונים", difficulty: 2 },
  { id: 210, text: "אביו של נמרוד עובד במשרד גדול בעיר", difficulty: 2 },
  { id: 211, text: "חבריו של יואב הגיעו לכל החגיגה הגדולה", difficulty: 2 },
  { id: 212, text: "עכשיו אנחנו לומדים את לוח הכפל החדש", difficulty: 2 },
  { id: 213, text: "אביו הביא לו מתנה גדולה מהעבודה", difficulty: 2 },
  { id: 214, text: "עיניו של התינוק היו עצומות מרוב עייפות", difficulty: 2 },
  { id: 215, text: "אחיו הקטן בכה כשנפל מהאופניים החדשים", difficulty: 2 },
  { id: 216, text: "עכשיו אנחנו צריכים לחזור הביתה לאמא", difficulty: 2 },
  { id: 217, text: "ילדיו של המלך גרו בארמון יפה מאוד", difficulty: 2 },
  { id: 218, text: "עכשיו הסבתא מקריאה לנו סיפור מצחיק", difficulty: 2 },
  { id: 219, text: "חבריו של דורון באו אליו לבית ההורים", difficulty: 2 },
  { id: 220, text: "עכשיו רץ הילד מהר ככל שיכל אל אמו", difficulty: 2 },

  // difficulty 3 — words ending in ו pronounced /v/
  { id: 221, text: "עכשיו אנחנו מתכוננים למסיבת יום ההולדת הגדולה של אחי", difficulty: 3 },
  { id: 222, text: "אביו של יוסי לימד אותו לרכוב על אופניים בגיל צעיר", difficulty: 3 },
  { id: 223, text: "אחיו הגדול של דני עזר לו עם שיעורי הבית הקשים", difficulty: 3 },
  { id: 224, text: "עכשיו כל הילדים בכיתה מתרגשים לקראת הטיול השנתי הארוך", difficulty: 3 },
  { id: 225, text: "ילדיו של המורה הזמינו את כל הכיתה לחגוג איתם את החנוכה", difficulty: 3 },
  { id: 226, text: "חבריו הטובים של אריאל הכינו לו הפתעה גדולה ליום ההולדת", difficulty: 3 },
  { id: 227, text: "עכשיו הסבתא מספרת לנו על הימים שבהם הייתה ילדה קטנה", difficulty: 3 },
  { id: 228, text: "אביו של אבישי קנה לו ספר חדש על חיות הבר ביער", difficulty: 3 },
  { id: 229, text: "עכשיו אנחנו רוצים לראות איך מכינים עוגת שוקולד בבית", difficulty: 3 },
  { id: 230, text: "ידיו של הילד היו מלוכלכות מאוד אחרי המשחק בחול", difficulty: 3 },
  { id: 231, text: "עכשיו אביו של איתי לוקח אותו לפארק הגדול בעיר", difficulty: 3 },
  { id: 232, text: "אחיו של הילד הקטן עזר לו לחצות את הכביש בבטחה", difficulty: 3 },
  { id: 233, text: "עכשיו הגיע הזמן שכולנו נצא לחופשה הגדולה של הקיץ", difficulty: 3 },
  { id: 234, text: "חבריו של דודי באו לבקר אותו אחרי שחזר מבית החולים", difficulty: 3 },
  { id: 235, text: "עכשיו אסביר לכם איך מכינים את העוגה הטעימה הזאת", difficulty: 3 },
  { id: 236, text: "עיניו של התינוק התרחבו כשראה את כל המתנות הצבעוניות", difficulty: 3 },
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

/**
 * Pick `count` sentences for a game, preferring ones the player hasn't seen
 * yet (their ids are not in `seenIds`). When fewer fresh sentences remain than
 * a full game needs, every remaining fresh sentence is served and the rest is
 * topped up with random already-seen sentences. Once the player has seen every
 * sentence at this difficulty, the game simply randomizes from the whole pool.
 */
export function getFreshSentences(
  count: number,
  difficulty: 1 | 2 | 3,
  seenIds: number[]
): Sentence[] {
  const pool = getSentencesByDifficulty(difficulty);
  const seen = new Set(seenIds);
  const shuffle = (arr: Sentence[]): Sentence[] =>
    [...arr].sort(() => Math.random() - 0.5);

  const unseen = pool.filter((s) => !seen.has(s.id));

  // Enough fresh sentences for a full game — serve only those.
  if (unseen.length >= count) {
    return shuffle(unseen).slice(0, count);
  }

  // Not enough fresh ones left: serve every remaining fresh sentence, then
  // top up with random already-seen sentences so the game is still full.
  const filler = shuffle(pool.filter((s) => seen.has(s.id))).slice(
    0,
    count - unseen.length
  );
  return shuffle([...unseen, ...filler]);
}
