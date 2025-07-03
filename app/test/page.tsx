'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

// Pindahkan tipe data ke sini agar bisa di-share dengan API route
export interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

type TestStatus = 'setup' | 'active' | 'finished';
type TestMode = 'bunpo' | 'particle' | 'jp-id' | 'id-ja' | 'kanji-reading' | 'kanji-meaning';

export default function TestPage() {
  const [status, setStatus] = useState<TestStatus>('setup');
  const [level, setLevel] = useState('N5');
  const [testMode, setTestMode] = useState<TestMode>('bunpo'); // State baru untuk mode tes
  const [numQuestions, setNumQuestions] = useState(10);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const startTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Kirim mode tes yang dipilih ke API
        body: JSON.stringify({ level, numQuestions, testMode }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Gagal membuat soal.');
      }
      const data: TestQuestion[] = await response.json();
      setQuestions(data);
      setUserAnswers(new Array(data.length).fill(null));
      setStatus('active');
      setCurrentIndex(0);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const submitTest = () => {
    setStatus('finished');
  };

  const restartTest = () => {
    setStatus('setup');
    setQuestions([]);
    setUserAnswers([]);
  }

  const score = questions.reduce((acc, question, index) => {
    return userAnswers[index] === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  // Tampilan Pengaturan Tes dengan Opsi Mode
  if (status === 'setup') {
    return (
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-4xl font-bold mb-4">Mulai Tes JLPT</h1>
        <p className="text-gray-500 mb-8">Uji pengetahuan Anda. Pilih tipe soal, level, dan jumlah soal untuk memulai.</p>
        <div className="space-y-6 bg-white p-8 rounded-lg border">
          {/* Opsi Tipe Soal BARU */}
          <div>
            <label htmlFor="testMode" className="block text-left font-medium mb-1">Tipe Soal</label>
            <select id="testMode" value={testMode} onChange={e => setTestMode(e.target.value as TestMode)} className="w-full p-2 border rounded-md">
              <option value="bunpo">Tata Bahasa (Bunpo)</option>
              <option value="particle">Isi Partikel</option>
              <option value="jp-id">Terjemahan (Jepang - ID)</option>
              <option value="id-ja">Terjemahan (ID - Jepang)</option>
              <option value="kanji-reading">Tes Kanji (Cara Baca)</option>
              <option value="kanji-meaning">Tes Kanji (Arti)</option>
            </select>
          </div>
          {/* Opsi Level */}
          <div>
            <label htmlFor="level" className="block text-left font-medium mb-1">Level</label>
            <select id="level" value={level} onChange={e => setLevel(e.target.value)} className="w-full p-2 border rounded-md">
              <option>N5</option><option>N4</option><option>N3</option><option>N2</option><option>N1</option>
            </select>
          </div>
          {/* Opsi Jumlah Soal */}
          <div>
            <label htmlFor="numQuestions" className="block text-left font-medium mb-1">Jumlah Soal ({numQuestions})</label>
            <input type="range" id="numQuestions" min="1" max="20" value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))} className="w-full" />
          </div>
          <button onClick={startTest} disabled={loading} className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-600 disabled:bg-gray-400">
            {loading ? 'Membuat Soal...' : 'Mulai Tes'}
          </button>
        </div>
      </div>
    );
  }

  // Tampilan Mengerjakan Soal dan Hasil (TIDAK ADA PERUBAHAN DI SINI)
  // ... (salin sisa kode dari jawaban sebelumnya untuk 'active' dan 'finished' status) ...
  // -- Tampilan Hasil Tes --
  if (status === 'finished') {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center bg-white p-6 rounded-lg border mb-8">
                <h1 className="text-3xl font-bold">Hasil Tes</h1>
                <p className="text-5xl font-bold my-4">{Math.round((score / questions.length) * 100)}%</p>
                <p className="text-gray-600">Anda menjawab benar {score} dari {questions.length} soal.</p>
                <button onClick={restartTest} className="mt-6 bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600">Ulangi Tes</button>
            </div>
            {questions.map((q, index) => (
                <div key={index} className={`p-4 border rounded-lg mb-4 ${userAnswers[index] === q.correctAnswer ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                    <p className="font-semibold">{index + 1}. {q.question}</p>
                    <p className={`mt-2 ${userAnswers[index] === q.correctAnswer ? 'text-green-800' : 'text-red-800'}`}>
                        Jawaban Anda: {userAnswers[index] || '(Tidak dijawab)'} {userAnswers[index] === q.correctAnswer ? <Check className="inline-block" size={16}/> : <X className="inline-block" size={16}/>}
                    </p>
                    {userAnswers[index] !== q.correctAnswer && <p className="text-green-800">Jawaban Benar: {q.correctAnswer}</p>}
                    <div className="mt-3 pt-3 border-t border-dashed">
                        <p className="text-sm text-gray-700">{q.explanation}</p>
                    </div>
                </div>
            ))}
        </div>
    );
  }

  // -- Tampilan Mengerjakan Soal --
  const currentQuestion = questions[currentIndex];
  return (
    <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4">
            <p className="text-gray-500">Soal {currentIndex + 1} dari {questions.length}</p>
        </div>
        <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} transition={{duration: 0.2}}>
                <div className="bg-white p-8 rounded-lg border">
                    <h2 className="text-2xl font-semibold mb-6">{currentQuestion.question}</h2>
                    <div className="space-y-3">
                        {currentQuestion.options.map(option => (
                            <button
                                key={option}
                                onClick={() => handleAnswerSelect(option)}
                                className={`w-full text-left p-4 border rounded-lg transition-colors ${userAnswers[currentIndex] === option ? 'bg-sky-500 border-sky-500 text-white' : 'hover:bg-gray-100'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-6">
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1} className="bg-gray-200 px-6 py-2 rounded-lg disabled:opacity-50">Berikutnya</button>
            {currentIndex === questions.length - 1 && 
                <button onClick={submitTest} className="bg-green-500 text-white font-bold px-8 py-2 rounded-lg hover:bg-green-600">Selesai & Lihat Hasil</button>}
        </div>
    </div>
  );
}