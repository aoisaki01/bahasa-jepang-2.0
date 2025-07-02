'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
// import type { JishoWord } from '@/types/jisho';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { JishoWord } from '../types/jisho';

export default function MarkedWordsPage() {
  const [markedWords, setMarkedWords] = useLocalStorage<JishoWord[]>('markedWords', []);

  const removeWord = (slug: string) => {
    setMarkedWords(prev => prev.filter(word => word.slug !== slug));
  };
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold mb-6">Kata yang Ditandai</h1>
      {markedWords.length === 0 ? (
        <p className="text-gray-500">
          Anda belum menandai kata apapun. Tandai kata di halaman{' '}
          <Link href="/flashcards" className="text-sky-500 hover:underline">Flashcard</Link>.
        </p>
      ) : (
        <div className="space-y-4">
          {markedWords.map((word, index) => (
            <motion.div
              key={word.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center p-4 border rounded-lg bg-white"
            >
              <div>
                <p className="text-2xl font-bold">{word.japanese[0].word || word.japanese[0].reading}</p>
                <p className="text-gray-600">{word.japanese[0].reading}</p>
              </div>
              <button onClick={() => removeWord(word.slug)} className="text-gray-400 hover:text-red-500">
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}