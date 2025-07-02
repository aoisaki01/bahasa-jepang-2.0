import { NextResponse } from 'next/server';

const translateAPI = "https://api.mymemory.translated.net/get";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json({ error: "Teks diperlukan" }, { status: 400 });
  }

  try {
    const response = await fetch(`${translateAPI}?q=${encodeURIComponent(text)}&langpair=en|id`);
    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error("Gagal menerjemahkan");
    }

    // Ambil hasil terjemahan yang paling relevan
    const translatedText = data.responseData.translatedText;
    return NextResponse.json({ translation: translatedText });

  } catch (error) {
    return NextResponse.json({ error: "Gagal menghubungi layanan terjemahan" }, { status: 500 });
  }
}