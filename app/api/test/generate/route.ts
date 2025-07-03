import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TestQuestion } from '@/app/test/page';
// import TestQuestion, { TestQuestion } from '@/app/test/page'; // Akan kita pindahkan tipe data ke halaman tes

// Inisialisasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Fungsi untuk membuat prompt berdasarkan mode tes
function createPrompt(level: string, numQuestions: number, mode: string): string {
  let instruction = '';
  switch (mode) {
    case 'particle':
      instruction = `Buat soal tes untuk mengisi partikel yang rumpang, ditandai dengan (___). Pilihan jawaban harus berisi 4 partikel (misal: は, が, を, に, で, と, も), di mana salah satunya adalah jawaban yang benar. Jelaskan fungsi partikel yang benar dalam konteks kalimat tersebut.`;
      break;
    case 'jp-id':
      instruction = `Buat soal tes menerjemahkan kalimat atau frasa dari Bahasa Jepang ke Bahasa Indonesia. Pilihan jawaban harus berisi 4 opsi terjemahan dalam Bahasa Indonesia.`;
      break;
    case 'id-ja':
      instruction = `Buat soal tes menerjemahkan kalimat atau frasa dari Bahasa Indonesia ke Bahasa Jepang. Pilihan jawaban harus berisi 4 opsi terjemahan dalam Bahasa Jepang.`;
      break;
    case 'kanji-reading':
      instruction = `Buat soal tes untuk menebak cara baca sebuah kata Kanji. Berikan kalimat dan tandai satu kata Kanji. Pertanyaannya adalah tentang cara bacanya. Pilihan jawaban harus berisi 4 opsi cara baca dalam Hiragana.`;
      break;
    case 'kanji-meaning':
      instruction = `Buat soal tes untuk menebak arti sebuah kata Kanji. Berikan kalimat dan tandai satu kata Kanji. Pertanyaannya adalah tentang artinya. Pilihan jawaban harus berisi 4 opsi arti dalam Bahasa Indonesia.`;
      break;
    case 'bunpo':
    default:
      instruction = `Buat soal tes tentang pola kalimat (bunpo). Berikan kalimat dengan bagian pola kalimat yang rumpang (___). Pilihan jawaban harus berisi 4 opsi kelanjutan yang melengkapi pola kalimat tersebut secara gramatikal.`;
      break;
  }

  return `
    Buat sebuah tes JLPT level ${level} sebanyak ${numQuestions} soal dengan tipe "${mode}".
    ${instruction}
    
    Untuk setiap soal, berikan dalam format JSON yang valid dengan struktur berikut: "question", "options" (sebuah array dengan 4 string pilihan), "correctAnswer" (string jawaban yang benar persis seperti di dalam options), dan "explanation" (penjelasan detail dalam Bahasa Indonesia mengapa jawaban tersebut benar).
    Pastikan pilihan jawaban yang salah (distractors) masuk akal dan sering menjadi jebakan umum.
    Format output harus sebuah array JSON dari objek-objek soal.
  `;
}

export async function POST(request: Request) {
  try {
    const { level, numQuestions, testMode } = await request.json();

    if (!level || !['N5', 'N4', 'N3', 'N2', 'N1'].includes(level) || !testMode) {
      return NextResponse.json({ error: 'Level atau Mode Tes tidak valid.' }, { status: 400 });
    }
    const count = Math.min(Math.max(Number(numQuestions), 1), 20);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = createPrompt(level, count, testMode);

    console.log(`Generating test with mode: ${testMode}, level: ${level}`);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    const testQuestions: TestQuestion[] = JSON.parse(text);

    return NextResponse.json(testQuestions);

  } catch (error) {
    console.error("Gemini Test Generation Error:", error);
    return NextResponse.json({ error: 'Gagal men-generate soal tes dari AI.' }, { status: 500 });
  }
}