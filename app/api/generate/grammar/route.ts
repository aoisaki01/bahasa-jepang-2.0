import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GrammarPoint } from '@/lib/grammar';
// import type { GrammarPoint } from '@/lib/grammar';

// Inisialisasi Gemini dengan API Key dari environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { level } = await request.json(); // Menerima level dari body request

    if (!level || !['N5', 'N4', 'N3', 'N2', 'N1'].includes(level)) {
      return NextResponse.json({ error: 'Level tidak valid.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      // Menggunakan JSON mode untuk output yang lebih konsisten
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Buat daftar 10 pola kalimat (grammar points) untuk level JLPT ${level} dalam bahasa Jepang.
      Untuk setiap pola kalimat, berikan informasi berikut dalam format JSON yang valid: title, meaning (dalam Bahasa Indonesia), formation, example (kalimat contoh dalam bahasa Jepang beserta terjemahannya dalam Bahasa Indonesia), dan explanation (penjelasan detail dalam Bahasa Indonesia).
      
      Struktur JSON harus berupa array dari objek, seperti ini:
      [
        {
          "title": "〜は〜です (wa... desu)",
          "meaning": "Adalah (Topik)",
          "formation": "Kata Benda は Kata Benda です",
          "example": "わたしはがくせいです。(Watashi wa gakusei desu.) - Saya adalah seorang siswa.",
          "explanation": "Pola kalimat paling dasar dalam bahasa Jepang untuk menyatakan identitas atau topik."
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parsing JSON yang digenerate oleh AI
    const grammarPoints: GrammarPoint[] = JSON.parse(text);

    return NextResponse.json(grammarPoints);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: 'Gagal men-generate data dari AI.' }, { status: 500 });
  }
}