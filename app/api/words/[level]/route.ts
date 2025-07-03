import { NextResponse } from 'next/server';

// Tipe data untuk output yang kita inginkan
interface Word {
  word: string;
  reading: string;
  meaning: string;
}

const JishoAPI = "https://jisho.org/api/v1/search/words";

export async function GET(
  request: Request,
  { params }: { params: { level: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1'; // Ambil nomor halaman
  const level = params.level.toLowerCase(); // n5, n4, dst.

  if (!['n5', 'n4', 'n3', 'n2', 'n1'].includes(level)) {
    return NextResponse.json({ error: 'Level tidak valid.' }, { status: 400 });
  }

  try {
    const keyword = encodeURIComponent(`#jlpt-${level}`);
    const apiUrl = `${JishoAPI}?keyword=${keyword}&page=${page}`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Jisho API returned status: ${response.status}`);
    }

    const { data } = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Format data dari Jisho API tidak terduga.");
    }

    // Ubah format data dari Jisho ke format sederhana yang kita inginkan
    const formattedData: Word[] = data.map((item: any) => ({
      word: item.japanese[0]?.word || item.japanese[0]?.reading,
      reading: item.japanese[0]?.reading,
      // Ambil definisi bahasa Inggris pertama sebagai arti
      meaning: item.senses[0]?.english_definitions[0] || 'Tidak ada arti'
    }));
    
    return NextResponse.json(formattedData);

  } catch (error) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}