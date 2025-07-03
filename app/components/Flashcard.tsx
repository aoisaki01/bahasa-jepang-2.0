'use client';

import { useState, useEffect } from 'react';
import type { JishoWord } from '../types/jisho'; // Pastikan path import ini benar
import { Star } from 'lucide-react'; // Impor ikon bintang

// Perbarui props untuk menerima status 'marked' dan fungsi 'onMark'
interface FlashcardProps {
  word: JishoWord;
  isMarked: boolean;
  onMark: () => void;
}

export default function Flashcard({ word, isMarked, onMark }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Reset kartu ke sisi depan setiap kali kata berubah
  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  const japaneseWord = word.japanese[0];
  const englishDefinitions = word.senses[0].english_definitions;

  return (
    <div className="w-full max-w-md h-64 mx-auto cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
      {/* Tombol Bintang untuk Menandai */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Mencegah kartu ikut terbalik saat tombol diklik
          onMark();
        }}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-yellow-400 z-20"
        aria-label="Tandai kata"
      >
        <Star size={28} className="transition-all" fill={isMarked ? 'rgb(250 204 21)' : 'none'} stroke={isMarked ? 'rgb(250 204 21)' : 'currentColor'} />
      </button>

      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Sisi Depan */}
        <div className="absolute w-full h-full bg-white border-2 border-blue-400 rounded-lg flex items-center justify-center p-4 [backface-visibility:hidden]">
          <h2 className="text-5xl md:text-6xl font-bold text-center">{japaneseWord.word || japaneseWord.reading}</h2>
        </div>
        {/* Sisi Belakang */}
        <div className="absolute w-full h-full bg-blue-100 border-2 border-blue-400 rounded-lg flex flex-col items-center justify-center p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-3xl font-semibold mb-3">{japaneseWord.reading}</p>
          <p className="text-lg text-center text-gray-800">{englishDefinitions.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}