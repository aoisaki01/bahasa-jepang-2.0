import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ level: string }> }
) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const { level } = await params;
  const normalizedLevel = level.toLowerCase();

  if (!['n5', 'n4', 'n3', 'n2', 'n1'].includes(normalizedLevel)) {
    return NextResponse.json({ error: 'Level tidak valid.' }, { status: 400 });
  }

  try {
    const keyword = encodeURIComponent(`#jlpt-${normalizedLevel}`);
    const apiUrl = `https://jisho.org/api/v1/search/words?keyword=${keyword}&page=${page}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Jisho API returned status: ${response.status}`);
    }

    const { data } = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Format data dari Jisho API tidak terduga.");
    }

    const formattedData = data.map((item: any) => ({
      slug: item.slug,
      word: item.japanese[0]?.word || item.japanese[0]?.reading,
      reading: item.japanese[0]?.reading,
      meaning: item.senses[0]?.english_definitions[0] || 'Tidak ada arti'
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}