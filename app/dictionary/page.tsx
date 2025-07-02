'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JishoWord } from '../types/jisho';
// import type { JishoWord } from '@/types/jisho';

interface Result {
  wordData: JishoWord;
  indonesian: string;
}

export default function DictionaryPage() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1. Cari kata di Jisho
      const jishoRes = await fetch(`/api/jisho/search?keyword=${encodeURIComponent(keyword)}`);
      const { data } = await jishoRes.json();
      if (!data || data.length === 0) throw new Error("Kata tidak ditemukan.");
      const wordData: JishoWord = data[0];

      // 2. Terjemahkan artinya ke Indonesia
      const englishMeaning = wordData.senses[0].english_definitions.join(', ');
      const translateRes = await fetch(`/api/translate?text=${encodeURIComponent(englishMeaning)}`);
      const { translation } = await translateRes.json();
      
      setResult({ wordData, indonesian: translation });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Kamus Jepang - Indonesia</h1>
        <p className="text-gray-500">Cari kosakata bahasa Jepang.</p>
      </div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full sm:w-80 p-3 border rounded-lg" placeholder="Ketik hiragana, katakana, atau kanji"/>
        <button type="submit" className="bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg" disabled={loading}>{loading ? '...' : 'Cari'}</button>
      </form>
      
      <div className="w-full max-w-2xl min-h-[200px]">
        <AnimatePresence>
          {loading && <p className="text-center">Mencari...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 border rounded-lg bg-white space-y-4">
              <div>
                <p className="text-sm text-gray-500">Kata</p>
                <p className="text-4xl font-bold">{result.wordData.japanese[0].word}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cara Baca</p>
                <p className="text-2xl">{result.wordData.japanese[0].reading}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Arti</p>
                <p className="text-xl font-semibold text-sky-700">{result.indonesian}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}