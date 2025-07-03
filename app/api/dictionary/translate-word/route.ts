import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inisialisasi Gemini dengan API Key dari environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Teks diperlukan.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt yang sangat spesifik untuk tugas kamus
    const prompt = `Translate the following single Indonesian word into its most common, single-word English equivalent for a dictionary lookup. Provide only the single English word as the output, nothing else. For example, if the input is "mobil", the output should be "car". If the input is "aku", the output should be "I".

Indonesian Word: "${text}"
English Translation:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    // Ambil teks dan bersihkan dari spasi atau baris baru yang tidak perlu
    const translatedWord = response.text().trim();

    if (!translatedWord) {
      throw new Error("Gemini tidak dapat menerjemahkan kata tersebut.");
    }

    return NextResponse.json({ translation: translatedWord });

  } catch (error) {
    console.error("Gemini Translation Error:", error);
    return NextResponse.json({ error: 'Gagal menerjemahkan kata menggunakan AI.' }, { status: 500 });
  }
}