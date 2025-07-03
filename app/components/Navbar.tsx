'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Tambahkan "Grammar" ke dalam array
const navLinks = [
  { href: '/flashcards', label: 'Flashcard' },
  { href: '/guess', label: 'Guess' },
  { href: '/grammar', label: 'Grammar' },
  { href: '/test', label: 'Test' }, // <-- Link Baru
  { href: '/reading', label: 'Membaca' },
  { href: '/dictionary', label: 'Kamus' },
  { href: '/marked', label: 'Ditandai' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  }

  // ... (sisa kode komponen Navbar tetap sama persis)
  return (
    <header className="w-full border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <nav className="container mx-auto max-w-4xl flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold text-gray-900" onClick={closeMenu}>
          JBenkyou
        </Link>

        {/* --- Menu untuk Desktop --- */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-600 hover:text-gray-900 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* --- Tombol Hamburger untuk Mobile --- */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Buka menu">
            <Menu size={24} className="text-gray-800" />
          </button>
        </div>
      </nav>

      {/* --- Panel Menu Mobile (Slide-in) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            
            {/* Panel Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full max-w-sm h-screen bg-white z-50 p-6"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={closeMenu} aria-label="Tutup menu">
                  <X size={24} className="text-gray-800" />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu} // Tutup menu saat link diklik
                    className="text-2xl font-medium text-gray-700 hover:text-sky-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}