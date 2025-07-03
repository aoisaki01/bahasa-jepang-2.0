'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FallingPetals from './components/FallingPetals';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center flex flex-col items-center justify-center min-h-[70vh]"
    >
      <FallingPetals />
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
        Mulai Belajar Jepang.
      </h1>
      <p className="text-lg text-gray-500 mb-8 max-w-xl">
        Pilih salah satu mode di bawah ini untuk mengasah kemampuan bahasa Jepang Anda dengan cara yang simpel dan efektif.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/flashcards"
          className="bg-sky-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-sky-600 transition-colors"
        >
          Mulai Flashcard
        </Link>
        <Link
          href="/reading"
          className="bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Latihan Membaca
        </Link>
      </div>
    </motion.div>
  );
}