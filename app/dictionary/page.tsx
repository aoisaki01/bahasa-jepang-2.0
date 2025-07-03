'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import type { JishoWord } from '@/types/jisho';
import { ArrowRightLeft } from 'lucide-react';
import { JishoWord } from '../types/jisho';

type SearchResult = {
  direction: 'ja-id';
  wordData: JishoWord;
  indonesian: string;
} | {
  direction: 'id-ja';
  original: string;
  jishoResults: JishoWord[];
};

export default function DictionaryPage() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<'ja-id' | 'id-ja'>('ja-id');

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (direction === 'ja-id') {
        // --- LOGIKA JEPANG -> INDONESIA (MENGGUNAKAN API TRANSLATE LAMA, SUDAH CUKUP BAIK UNTUK INI) ---
        const jishoRes = await fetch(`/api/jisho/search?keyword=${encodeURIComponent(keyword)}`);
        const { data } = await jishoRes.json();
        if (!data || data.length === 0) throw new Error("Kata tidak ditemukan di kamus Jisho.");
        const wordData: JishoWord = data[0];

        const englishMeaning = wordData.senses[0].english_definitions.join(', ');
        const translateRes = await fetch(`/api/translate?text=${encodeURIComponent(englishMeaning)}&from=en&to=id`);
        const { translation } = await translateRes.json();
        
        setResult({ direction: 'ja-id', wordData, indonesian: translation });

      } else {
        // --- LOGIKA BARU & AKURAT: INDONESIA -> JEPANG (MENGGUNAKAN GEMINI) ---
        
        // 1. Terjemahkan kata Indonesia ke Inggris menggunakan Gemini API baru kita
        console.log(`Menerjemahkan "${keyword}" ke Inggris via Gemini...`);
        const geminiTranslateRes = await fetch(`/api/dictionary/translate-word`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: keyword })
        });

        if (!geminiTranslateRes.ok) throw new Error("Gagal menghubungi layanan AI.");

        const geminiData = await geminiTranslateRes.json();
        const englishKeyword = geminiData.translation;

        if (!englishKeyword) throw new Error("AI tidak dapat menerjemahkan kata tersebut.");
        
        // 2. Cari kata Inggris tersebut di Jisho
        console.log(`Mencari padanan "${englishKeyword}" di Jisho...`);
        const jishoRes = await fetch(`/api/jisho/search?keyword=${encodeURIComponent(englishKeyword)}`);
        const { data: jishoResults } = await jishoRes.json();
        if (!jishoResults || jishoResults.length === 0) throw new Error(`Tidak ditemukan padanan kata Jepang untuk "${englishKeyword}".`);

        setResult({ direction: 'id-ja', original: keyword, jishoResults });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const swapDirection = () => {
    setDirection(prev => prev === 'ja-id' ? 'id-ja' : 'ja-id');
    setKeyword('');
    setResult(null);
    setError(null);
  }

  // Sisa kode JSX di bawah ini tidak ada perubahan...
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Kamus Jepang - Indonesia</h1>
        <p className="text-gray-500">Cari kosakata dalam dua arah.</p>
      </div>

      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-8">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full sm:w-80 p-3 border rounded-lg"
          placeholder={direction === 'ja-id' ? "Ketik kata Jepang..." : "Ketik kata Indonesia..."}
        />
        <button type="button" onClick={swapDirection} className="p-3 border rounded-lg hover:bg-gray-100" aria-label="Tukar arah terjemahan">
          <ArrowRightLeft size={24} className="text-gray-600"/>
        </button>
        <button type="submit" className="bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg" disabled={loading}>
          {loading ? '...' : 'Cari'}
        </button>
      </form>
      
      <div className="w-full max-w-2xl min-h-[200px]">
        <AnimatePresence>
          {loading && <p className="text-center">Mencari...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 border rounded-lg bg-white space-y-4">
              {result.direction === 'ja-id' ? (
                <>
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
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Kata Indonesia</p>
                    <p className="text-2xl font-bold">{result.original}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hasil Terjemahan Jepang (dari Jisho)</p>
                    <div className="space-y-3 mt-2">
                      {result.jishoResults.slice(0, 5).map((res, index) => (
                        <div key={index} className="border-t pt-2">
                          <p className="text-2xl font-semibold text-sky-700">{res.japanese[0].word} <span className="text-lg text-gray-500">({res.japanese[0].reading})</span></p>
                          <p className="text-gray-600">{res.senses[0].english_definitions.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}