import { NextResponse } from 'next/server';

const JishoAPI = "https://jisho.org/api/v1/search/words";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: "Keyword diperlukan." }, { status: 400 });
  }

  try {
    const response = await fetch(`${JishoAPI}?keyword=${encodeURIComponent(keyword)}`);

    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari Jisho. Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}