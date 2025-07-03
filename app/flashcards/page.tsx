'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Star } from 'lucide-react';

// Tipe data untuk kata, pastikan ada 'slug'
interface Word {
  slug: string;
  word: string;
  reading: string;
  meaning: string;
}

// Komponen Flashcard yang menerima props untuk fitur 'mark'
function Flashcard({ word, language, isMarked, onMark }: { word: Word; language: 'id' | 'en'; isMarked: boolean; onMark: () => void; }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayMeaning, setDisplayMeaning] = useState('Memuat...');

  useEffect(() => {
    setIsFlipped(false);
    const getMeaning = async () => {
      if (language === 'en') {
        setDisplayMeaning(word.meaning);
      } else {
        setDisplayMeaning('Menerjemahkan...');
        try {
          const response = await fetch(`/api/translate?text=${encodeURIComponent(word.meaning)}`);
          const data = await response.json();
          setDisplayMeaning(data.translation || 'Gagal menerjemahkan.');
        } catch (error) {
          setDisplayMeaning('Gagal menerjemahkan.');
        }
      }
    };
    getMeaning();
  }, [word, language]);

  return (
    <div className="w-full h-64 [perspective:1000px] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onMark();
          }}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-yellow-400 z-20"
          aria-label="Tandai kata"
        >
          <Star size={28} className="transition-all" fill={isMarked ? 'rgb(250 204 21)' : 'none'} stroke={isMarked ? 'rgb(250 204 21)' : 'currentColor'} />
        </button>
      
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

// Fungsi untuk mengacak array
const shuffleArray = (array: Word[]) => {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array];
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
};

// Halaman utama Flashcard
export default function FlashcardsPage() {
  const [level, setLevel] = useState('n5');
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [markedWords, setMarkedWords] = useLocalStorage<Word[]>('markedWords', []);

  const fetchWords = useCallback(async (targetLevel: string, targetPage: number) => {
    if (targetPage === 1) setLoading(true); else setLoadingMore(true);
    try {
      const response = await fetch(`/api/words/${targetLevel}?page=${targetPage}`);
      const data: Word[] = await response.json();
      if (data && data.length > 0) {
        const newWords = shuffleArray(data);
        if (targetPage === 1) { setWords(newWords); } 
        else { setWords(prevWords => [...prevWords, ...newWords]); }
      } else {
        if (targetPage > 1) alert("Sudah mencapai akhir kata.");
      }
    } catch (error) { console.error("Gagal mengambil kosakata:", error); } 
    finally { setLoading(false); setLoadingMore(false); }
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
  
  const handleMarkWord = (wordToMark: Word) => {
    if (!wordToMark?.slug) return;
    setMarkedWords(prevMarked => {
      const isAlreadyMarked = prevMarked.some(w => w.slug === wordToMark.slug);
      if (isAlreadyMarked) {
        return prevMarked.filter(w => w.slug !== wordToMark.slug);
      } else {
        return [...prevMarked, wordToMark];
      }
    });
  };

  const currentWord = words[currentIndex];
  const isCurrentWordMarked = currentWord ? markedWords.some(w => w.slug === currentWord.slug) : false;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Flashcard Kosakata Acak</h1>
        <div className='mt-4 flex justify-center items-center gap-4'>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="p-2 rounded-md border bg-white">
              <option value="n5">N5</option><option value="n4">N4</option><option value="n3">N3</option><option value="n2">N2</option><option value="n1">N1</option>
            </select>
            <div className="flex rounded-md border p-1 bg-gray-100">
              <button onClick={() => setLanguage('id')} className={`px-3 py-1 text-sm rounded ${language === 'id' ? 'bg-white shadow' : 'text-gray-500'}`}>ID</button>
              <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded ${language === 'en' ? 'bg-white shadow' : 'text-gray-500'}`}>EN</button>
            </div>
        </div>
      </div>

      <div className="relative h-72 flex items-center justify-center">
        {loading && <p>Memuat...</p>}
        {!loading && currentWord && (
          <AnimatePresence>
            <motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute w-full max-w-xl">
              <Flashcard 
                word={currentWord} 
                language={language} 
                isMarked={isCurrentWordMarked}
                onMark={() => handleMarkWord(currentWord)}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      
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