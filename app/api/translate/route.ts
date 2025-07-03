import { NextResponse } from 'next/server';

const translateAPI = "https://api.mymemory.translated.net/get";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  // Ambil parameter bahasa, default ke en|id jika tidak ada
  const from = searchParams.get('from') || 'en';
  const to = searchParams.get('to') || 'id';

  if (!text) {
    return NextResponse.json({ error: "Teks diperlukan" }, { status: 400 });
  }

  try {
    // Buat pasangan bahasa secara dinamis
    const langpair = `${from}|${to}`;
    const response = await fetch(`${translateAPI}?q=${encodeURIComponent(text)}&langpair=${langpair}`);
    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error("Gagal menerjemahkan");
    }

    const translatedText = data.responseData.translatedText;
    return NextResponse.json({ translation: translatedText });

  } catch (error) {
    return NextResponse.json({ error: "Gagal menghubungi layanan terjemahan" }, { status: 500 });
  }
}