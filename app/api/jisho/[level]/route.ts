import { NextResponse } from 'next/server';

const JishoAPI = "https://jisho.org/api/v1/search/words?keyword=";

// Terapkan pola baru pada parameter 'params'
export async function GET(
  request: Request,
  { params }: { params: Promise<{ level: string }> }
) {
  try {
    // Gunakan 'await' untuk mendapatkan nilai dari params
    const { level } = await params;

    // Validasi sederhana
    if (!level || !['1', '2', '3', '4', '5'].includes(level)) {
      return NextResponse.json({ error: "Level tidak valid. Gunakan 1-5." }, { status: 400 });
    }
    
    const keyword = encodeURIComponent(`#jlpt-n${level}`);
    const response = await fetch(`${JishoAPI}${keyword}`);

    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari Jisho API. Status: ${response.status}`);
    }

    const { data } = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}