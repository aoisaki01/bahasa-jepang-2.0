'use client';

import { useState } from 'react';
import { JishoWord } from '../types/jisho';
// import type { JishoWord } from '../../types/jisho';

interface FlashcardProps {
  word: JishoWord;
}

export default function Flashcard({ word }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Fungsi untuk mereset kartu ke sisi depan setiap kali kata berubah
  useState(() => {
    setIsFlipped(false);
  });

  const japaneseWord = word.japanese[0];
  const englishDefinitions = word.senses[0].english_definitions;

  return (
    <div
      className="w-full max-w-md h-64 mx-auto cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        <div className="absolute w-full h-full bg-white border-2 border-blue-400 rounded-lg flex items-center justify-center p-4 [backface-visibility:hidden]">
          <h2 className="text-5xl md:text-6xl font-bold text-center">{japaneseWord.word || japaneseWord.reading}</h2>
        </div>
        <div className="absolute w-full h-full bg-blue-100 border-2 border-blue-400 rounded-lg flex flex-col items-center justify-center p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-3xl font-semibold mb-3">{japaneseWord.reading}</p>
          <p className="text-lg text-center text-gray-800">{englishDefinitions.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}