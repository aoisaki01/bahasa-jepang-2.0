'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrammarPoint } from '@/lib/grammar';
// import { GrammarPoint } from '@/lib/grammar';

const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

export default function GrammarPage() {
  const [activeTab, setActiveTab] = useState('N5');
  const [grammarPoints, setGrammarPoints] = useState<GrammarPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrammar = async () => {
      setLoading(true);
      setError(null);
      setGrammarPoints([]);

      try {
        // Panggil API route generate dengan metode POST
        const response = await fetch(`/api/generate/grammar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ level: activeTab }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Gagal memuat materi ${activeTab}.`);
        }

        const data: GrammarPoint[] = await response.json();
        setGrammarPoints(data);
      } catch (err) {
        console.error("Gagal mengambil data grammar:", err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
      } finally {
        setLoading(false);
      }
    };

    fetchGrammar();
  }, [activeTab]);

  return (
    // ... Seluruh kode JSX untuk render halaman tetap sama persis ...
    // Anda tidak perlu mengubah bagian return sama sekali.
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Pola Kalimat (文法)</h1>
        <p className="text-gray-500">Pilih level JLPT untuk melihat materi tata bahasa.</p>
      </div>
      <div className="flex border-b border-gray-200 mb-8 justify-center">
        {levels.map(level => (
          <button
            key={level}
            onClick={() => setActiveTab(level)}
            className={`px-4 py-2 text-lg font-medium transition-colors relative
              ${activeTab === level ? 'text-sky-600' : 'text-gray-500 hover:text-sky-600'}`}
          >
            {level}
            {activeTab === level && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600" />}
          </button>
        ))}
      </div>
      <div className="space-y-6 min-h-[300px]">
        {loading && <div className="text-center text-gray-500">Wait Tunggu Sebentar</div>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && grammarPoints.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
              {grammarPoints.map((point: GrammarPoint, index: number) => (
                <div key={index} className="p-6 border rounded-lg bg-white mb-4 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{point.title}</h2>
                  <p className="text-sky-700 font-semibold mb-4">{point.meaning}</p>
                  <div className="space-y-3 text-gray-700">
                    <p><strong className="font-medium text-gray-900">Bentuk:</strong> {point.formation}</p>
                    <p className="whitespace-pre-wrap"><strong className="font-medium text-gray-900">Contoh:</strong>{`\n${point.example}`}</p>
                    <p><strong className="font-medium text-gray-900">Penjelasan:</strong> {point.explanation}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}