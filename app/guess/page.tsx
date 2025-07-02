'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hiraganaData, katakanaData, kanjiData } from '@/lib/characters';
import { CheckCircle, XCircle } from 'lucide-react';

type GameMode = 'hiragana' | 'katakana' | 'kanji' | null;
type Question = { char: string; reading: string; };

// Helper function untuk mengacak array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function GuessingGamePage() {
  const [mode, setMode] = useState<GameMode>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [answered, setAnswered] = useState(false);

  const generateQuestion = useCallback((gameMode: GameMode) => {
    let dataPool: Question[] = [];
    let isKanjiMode = false;

    if (gameMode === 'hiragana') dataPool = hiraganaData;
    else if (gameMode === 'katakana') dataPool = katakanaData;
    else if (gameMode === 'kanji') {
        dataPool = kanjiData;
        isKanjiMode = true;
    }

    if (dataPool.length === 0) return;

    // Pilih jawaban yang benar
    const correctIndex = Math.floor(Math.random() * dataPool.length);
    const correctAnswer = dataPool[correctIndex];
    setQuestion(correctAnswer);

    // Buat pilihan jawaban
    const choices: string[] = [correctAnswer.reading];
    while (choices.length < 6) {
      const randomIndex = Math.floor(Math.random() * dataPool.length);
      const randomOption = dataPool[randomIndex].reading;
      if (!choices.includes(randomOption)) {
        choices.push(randomOption);
      }
    }
    setOptions(shuffleArray(choices));
    setFeedback(null);
    setAnswered(false);
  }, []);

  useEffect(() => {
    if (mode) {
      generateQuestion(mode);
    }
  }, [mode, generateQuestion]);

  const handleAnswer = (selectedOption: string) => {
    if (answered) return;
    setAnswered(true);

    if (selectedOption === question?.reading) {
      setFeedback('correct');
      setScore(s => s + 10);
    } else {
      setFeedback('incorrect');
    }

    // Lanjut ke pertanyaan berikutnya setelah 1.5 detik
    setTimeout(() => generateQuestion(mode), 1500);
  };
  
  const handleModeSelect = (selectedMode: GameMode) => {
    setMode(selectedMode);
    setScore(0);
  }

  // UI untuk memilih mode game
  const renderModeSelection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <h1 className="text-4xl font-bold mb-2">Tebak Karakter</h1>
      <p className="text-gray-500 mb-8">Pilih mode permainan.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => handleModeSelect('hiragana')} className="p-8 border rounded-lg hover:bg-gray-100">HIRAGANA</button>
        <button onClick={() => handleModeSelect('katakana')} className="p-8 border rounded-lg hover:bg-gray-100">KATAKANA</button>
        <button onClick={() => handleModeSelect('kanji')} className="p-8 border rounded-lg hover:bg-gray-100">KANJI (N5)</button>
      </div>
    </motion.div>
  );

  // UI untuk game
  const renderGame = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
          <button onClick={() => setMode(null)} className="text-sm text-gray-500 hover:text-gray-800">‹ Ganti Mode</button>
          <p className="text-lg font-bold">Skor: {score}</p>
      </div>
      <div className="w-64 h-64 border-2 rounded-xl flex items-center justify-center mb-8 relative">
        <p className="text-8xl font-bold">{question?.char}</p>
        <AnimatePresence>
        {feedback === 'correct' && 
          <motion.div initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0, opacity:0}} className="absolute inset-0 bg-green-500/80 rounded-xl flex items-center justify-center">
            <CheckCircle size={80} className="text-white"/>
          </motion.div>}
        {feedback === 'incorrect' && 
          <motion.div initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0, opacity:0}} className="absolute inset-0 bg-red-500/80 rounded-xl flex items-center justify-center">
            <XCircle size={80} className="text-white"/>
          </motion.div>}
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl">
        {options.map(option => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={answered}
            className={`p-4 border rounded-lg text-xl font-semibold transition-colors disabled:opacity-70 
              ${answered && option === question?.reading ? 'bg-green-500 text-white border-green-500' : ''}
              ${answered && option !== question?.reading ? 'bg-gray-100 text-gray-400' : 'hover:bg-sky-100'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {mode ? (
          <motion.div key="game">{renderGame()}</motion.div>
        ) : (
          <motion.div key="selection">{renderModeSelection()}</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}