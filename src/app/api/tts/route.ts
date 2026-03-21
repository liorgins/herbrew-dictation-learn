import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "TTS API key not configured" },
      { status: 500 }
    );
  }

  const body = {
    input: { text },
    voice: {
      languageCode: "he-IL",
      name: "he-IL-Standard-D",
      ssmlGender: "MALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: 0.85,
      pitch: 0,
    },
  };

  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Google TTS error:", err);
    return NextResponse.json(
      { error: "TTS request failed" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json({ audioContent: data.audioContent });
}
