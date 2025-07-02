'use client';

import { useState } from 'react';
import { SentenceData } from '../types/jisho';
// import type { SentenceData } from '@/types/jisho';

interface ReadingPracticeProps {
  sentence: SentenceData;
}

// Komponen kecil untuk merender elemen <ruby>
const Furigana = ({ text, reading }: { text: string; reading: string }) => (
  <ruby className="text-gray-800">
    {text}
    <rt className="text-sm text-gray-500" style={{ userSelect: 'none' }}>{reading}</rt>
  </ruby>
);

export default function ReadingPractice({ sentence }: ReadingPracticeProps) {
  const [showFurigana, setShowFurigana] = useState<boolean>(true);

  if (!sentence?.japanese?.[0]) {
    return <p className="text-center text-red-500">Data kalimat tidak valid.</p>;
  }

  const mainForm = sentence.japanese[0];
  const word = mainForm.word || '';
  const reading = mainForm.reading || '';

  return (
    <div className="p-6 bg-gray-50 rounded-lg border w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <button
          onClick={() => setShowFurigana(!showFurigana)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {showFurigana ? 'Sembunyikan' : 'Tampilkan'} Furigana
        </button>
      </div>
      <div className="text-3xl md:text-4xl leading-relaxed tracking-wide font-serif">
        {showFurigana && word ? (
          <Furigana text={word} reading={reading} />
        ) : (
          word || reading
        )}
      </div>
    </div>
  );
}