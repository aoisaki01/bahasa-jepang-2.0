'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ... (Interface Word, shuffleArray, dan import lainnya tetap sama) ...
interface Word {
  word: string;
  reading: string;
  meaning: string; // Ini adalah arti dalam Bahasa Inggris dari Jisho
}

// ...

// -- Perbarui Komponen Flashcard di sini --
function Flashcard({ word, language }: { word: Word; language: 'id' | 'en' }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayMeaning, setDisplayMeaning] = useState('Memuat...');

  useEffect(() => {
    setIsFlipped(false); // Reset flip saat kata berganti

    const getMeaning = async () => {
      if (language === 'en') {
        setDisplayMeaning(word.meaning); // Langsung gunakan arti Bahasa Inggris
      } else {
        // Jika bahasa 'id', panggil API translate
        setDisplayMeaning('Menerjemahkan...');
        try {
          const response = await fetch(`/api/translate?text=${encodeURIComponent(word.meaning)}`);
          const data = await response.json();
          if (data.translation) {
            setDisplayMeaning(data.translation);
          } else {
            throw new Error('Gagal mendapatkan terjemahan.');
          }
        } catch (error) {
          console.error(error);
          setDisplayMeaning('Gagal menerjemahkan.');
        }
      }
    };

    getMeaning();
  }, [word, language]); // Jalankan efek ini jika kata atau bahasa berubah

  return (
    <div className="w-full h-64 [perspective:1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="absolute w-full h-full border rounded-xl flex items-center justify-center p-4 [backface-visibility:hidden]">
          <h2 className="text-5xl font-bold text-center">{word.word}</h2>
        </div>
        <div className="absolute w-full h-full border bg-gray-50 rounded-xl flex flex-col items-center justify-center p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-3xl font-semibold mb-3">{word.reading}</p>
          <p className="text-lg text-center text-gray-600 px-4">{displayMeaning}</p>
        </div>
      </div>
    </div>
  );
}


// -- Perbarui Halaman Utama Flashcard --
export default function FlashcardsPage() {
  const [level, setLevel] = useState('n5');
  const [language, setLanguage] = useState<'id' | 'en'>('id'); // State baru untuk bahasa
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // ... (fungsi fetchWords dan useEffect tetap sama) ...
  const fetchWords = useCallback(async (targetLevel: string, targetPage: number) => {
    if (targetPage === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await fetch(`/api/words/${targetLevel}?page=${targetPage}`);
      const data: Word[] = await response.json();
      
      if (data && data.length > 0) {
        const newWords = shuffleArray(data);
        if (targetPage === 1) {
          setWords(newWords);
        } else {
          setWords(prevWords => [...prevWords, ...newWords]);
        }
      } else {
        if (targetPage > 1) alert("Sudah mencapai akhir kata untuk halaman ini.");
      }
    } catch (error) {
      console.error("Gagal mengambil kosakata:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setCurrentIndex(0);
    fetchWords(level, 1);
  }, [level, fetchWords]);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleLoadMore();
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchWords(level, nextPage);
  };
  
  const currentWord = words[currentIndex];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Flashcard Kosakata Acak</h1>
        <div className='mt-4 flex justify-center items-center gap-4'>
            {/* Opsi Level */}
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="p-2 rounded-md border bg-white">
              <option value="n5">N5</option>
              <option value="n4">N4</option>
              <option value="n3">N3</option>
              <option value="n2">N2</option>
              <option value="n1">N1</option>
            </select>
            
            {/* Tombol Switch Bahasa */}
            <div className="flex rounded-md border p-1 bg-gray-100">
              <button
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 text-sm rounded ${language === 'id' ? 'bg-white shadow' : 'text-gray-500'}`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm rounded ${language === 'en' ? 'bg-white shadow' : 'text-gray-500'}`}
              >
                EN
              </button>
            </div>
        </div>
      </div>

      <div className="relative h-72 flex items-center justify-center">
        {loading && <p>Memuat...</p>}
        {!loading && currentWord && (
          <AnimatePresence>
            <motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute w-full max-w-xl">
              {/* Kirim prop 'language' ke komponen Flashcard */}
              <Flashcard word={currentWord} language={language} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ... (Tombol navigasi Prev/Next tetap sama) ... */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button onClick={() => setCurrentIndex(p => p - 1)} disabled={currentIndex === 0} className="bg-gray-200 px-6 py-2 rounded-lg disabled:opacity-50">Prev</button>
        <p className="text-gray-500 w-24 text-center">{words.length > 0 ? `${currentIndex + 1} / ?` : '0 / 0'}</p>
        <button onClick={handleNext} className="bg-sky-500 text-white px-6 py-2 rounded-lg" disabled={loadingMore}>
          {loadingMore ? 'Memuat...' : 'Next / Muat Lagi'}
        </button>
      </div>
    </motion.div>
  );
}
// Fungsi shuffleArray diletakkan di sini jika belum ada
const shuffleArray = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    const newArray = [...array];
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
  };