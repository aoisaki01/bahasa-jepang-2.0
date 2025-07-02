'use client';
import { useState, FormEvent } from 'react';
// import type { SentenceData } from '@/types/jisho';
import { motion } from 'framer-motion';
import { SentenceData } from '../types/jisho';

// Komponen untuk menampilkan kalimat
function ReadingDisplay({ sentence }: { sentence: SentenceData }) {
  const [showFurigana, setShowFurigana] = useState(true);
  const mainForm = sentence.japanese[0];
  const word = mainForm.word || '';
  const reading = mainForm.reading || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={word} // Gunakan 'word' sebagai key agar animasi berjalan setiap ada kata baru
      className="w-full max-w-3xl text-center p-8 border border-gray-200 rounded-xl"
    >
      <div className="text-4xl md:text-5xl leading-relaxed mb-6 font-serif">
        {showFurigana && word ? (
          <ruby>
            {word}
            <rt className="text-lg text-gray-500">{reading}</rt>
          </ruby>
        ) : (
          word || reading
        )}
      </div>
      <button
        onClick={() => setShowFurigana(!showFurigana)}
        className="bg-sky-500 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-sky-600 transition-colors"
      >
        {showFurigana ? 'Sembunyikan Furigana' : 'Tampilkan Furigana'}
      </button>
    </motion.div>
  );
}

// Halaman Latihan Membaca utama
export default function ReadingPage() {
  const [sentence, setSentence] = useState<SentenceData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>('');

  const fetchSentence = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;
    // ... (logika fetch tetap sama seperti sebelumnya) ...
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/jisho/search?keyword=${encodeURIComponent(keyword)}`);
      if (!response.ok) throw new Error("Gagal mengambil data.");
      const { data } = await response.json();
      if (data && data.length > 0) {
        setSentence(data[0]);
      } else {
        throw new Error("Kata tidak ditemukan.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setSentence(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Latihan Membaca</h1>
        <p className="text-gray-500">Masukkan kata dalam bahasa Jepang untuk melihat contoh.</p>
      </div>

      <form onSubmit={fetchSentence} className="flex gap-2 mb-8">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full sm:w-80 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          placeholder="Contoh: こんにちは"
        />
        <button type="submit" className="bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-600" disabled={loading}>
          {loading ? '...' : 'Cari'}
        </button>
      </form>

      <div className="w-full flex justify-center items-center min-h-[250px]">
        {loading && <p>Mencari...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {sentence && <ReadingDisplay sentence={sentence} />}
        {!loading && !sentence && !error && <p className="text-gray-400">Hasil akan muncul di sini.</p>}
      </div>
    </motion.div>
  );
}