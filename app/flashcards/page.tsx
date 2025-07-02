'use client';

import { useState, useEffect, useCallback } from 'react';
// import type { JishoWord } from '@/types/jisho';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { motion, AnimatePresence } from 'framer-motion';
import { JishoWord } from '../types/jisho';
import { Star } from 'lucide-react'; // Gunakan ikon untuk UI yang lebih baik

// Install lucide-react: npm install lucide-react

// Komponen Flashcard yang sudah diupdate
function Flashcard({ word, onMark, isMarked }: { word: JishoWord; onMark: () => void; isMarked: boolean; }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [indonesianMeaning, setIndonesianMeaning] = useState('Menerjemahkan...');
  const japaneseWord = word.japanese[0];
  const englishDefinitions = word.senses[0].english_definitions.join(', ');

  useEffect(() => {
    // Reset flip saat kata berganti
    setIsFlipped(false);
    setIndonesianMeaning('Menerjemahkan...'); // Tampilkan status loading

    // Ambil terjemahan Indonesia
    const getTranslation = async () => {
      try {
        const response = await fetch(`/api/translate?text=${encodeURIComponent(englishDefinitions)}`);
        const { translation } = await response.json();
        setIndonesianMeaning(translation || 'Gagal menerjemahkan');
      } catch (error) {
        setIndonesianMeaning('Gagal menerjemahkan');
      }
    };
    getTranslation();
  }, [word, englishDefinitions]);

  return (
    <div className="w-full h-64 [perspective:1000px] group">
      <div
        className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Depan */}
        <div className="absolute w-full h-full border border-gray-200 rounded-xl flex items-center justify-center p-4 [backface-visibility:hidden]">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900">
            {japaneseWord.word || japaneseWord.reading}
          </h2>
        </div>
        {/* Belakang */}
        <div className="absolute w-full h-full border border-gray-200 bg-gray-50 rounded-xl flex flex-col items-center justify-center p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-3xl font-semibold mb-3 text-gray-800">{japaneseWord.reading}</p>
          <p className="text-lg text-center text-gray-600 px-4">{indonesianMeaning}</p>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onMark(); }} className="absolute top-4 right-4 text-gray-300 hover:text-yellow-400 z-10">
        <Star size={28} fill={isMarked ? '#facc15' : 'none'} strokeWidth={1.5} />
      </button>
    </div>
  );
}

// Halaman Flashcard Utama
export default function FlashcardsPage() {
  const [level, setLevel] = useState<number>(5);
  const [words, setWords] = useState<JishoWord[]>([]);
  const [page, setPage] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [markedWords, setMarkedWords] = useLocalStorage<JishoWord[]>('markedWords', []);

  const fetchWords = useCallback(async (pageNum: number) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);
    
    try {
      const response = await fetch(`/api/jisho/${level}?page=${pageNum}`);
      const data: JishoWord[] = await response.json();
      if (data.length > 0) {
        setWords(prev => pageNum === 1 ? data : [...prev, ...data]);
      } else {
        if (pageNum > 1) alert("Sudah mencapai akhir kata.");
      }
    } catch (err) { console.error(err); } 
    finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [level]);

  useEffect(() => {
    setWords([]); // Reset kata saat level berubah
    setPage(1);
    setCurrentIndex(0);
    fetchWords(1);
  }, [level, fetchWords]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => prev + 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchWords(nextPage);
  };

  const handleMarkWord = (word: JishoWord) => {
    setMarkedWords(prev => {
      const isAlreadyMarked = prev.some(w => w.slug === word.slug);
      if (isAlreadyMarked) {
        return prev.filter(w => w.slug !== word.slug);
      } else {
        return [...prev, word];
      }
    });
  };

  const currentWord = words[currentIndex];
  const isCurrentWordMarked = currentWord ? markedWords.some(w => w.slug === currentWord.slug) : false;

  // Animasi slide
  const slideVariants = { /* ... sama seperti sebelumnya ... */ };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Flashcard</h1>
        <select value={level} onChange={(e) => setLevel(Number(e.target.value))} className="mt-4 p-2 rounded-md border bg-white">
          <option value={5}>N5</option><option value={4}>N4</option><option value={3}>N3</option><option value={2}>N2</option><option value={1}>N1</option>
        </select>
      </div>

      <div className="relative h-72 flex items-center justify-center">
        {loading && <p>Memuat...</p>}
        {!loading && currentWord && (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div key={currentIndex} variants={slideVariants} /* ... sama ... */ className="absolute w-full max-w-xl">
              <Flashcard word={currentWord} onMark={() => handleMarkWord(currentWord)} isMarked={isCurrentWordMarked} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button onClick={() => { setDirection(-1); setCurrentIndex(p => p - 1); }} disabled={currentIndex <= 0} className="bg-gray-200 px-6 py-2 rounded-lg disabled:opacity-50">Prev</button>
        <p className="text-gray-500 w-24 text-center">{currentIndex + 1} / {words.length}</p>
        {currentIndex === words.length - 1 ? (
          <button onClick={handleLoadMore} className="bg-sky-500 text-white px-6 py-2 rounded-lg" disabled={loadingMore}>
            {loadingMore ? 'Memuat...' : 'Muat Lagi'}
          </button>
        ) : (
          <button onClick={handleNext} className="bg-gray-200 px-6 py-2 rounded-lg">Next</button>
        )}
      </div>
    </motion.div>
  );
}