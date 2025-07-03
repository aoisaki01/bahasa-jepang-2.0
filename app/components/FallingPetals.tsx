'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import Image from 'next/image';

// Komponen untuk satu kelopak
const Petal = ({ animationProps }: { animationProps: any }) => (
  <motion.div
    className="absolute"
    style={{ ...animationProps.style }}
    animate={animationProps.animate}
    transition={animationProps.transition}
  >
    <Image src="/sakura.png" alt="Sakura Petal" width={20} height={20} className="opacity-70" />
  </motion.div>
);

// Komponen utama untuk men-generate banyak kelopak
export default function FallingPetals() {
  const petals = useMemo(() => {
    // Buat 20 kelopak dengan properti acak
    return Array.from({ length: 20 }).map((_, i) => {
      const xStart = Math.random() * 100;
      const xEnd = Math.random() * 100;
      const duration = Math.random() * 5 + 5; // Durasi antara 5-10 detik
      const delay = Math.random() * 5;
      const initialRotation = Math.random() * 360;
      const endRotation = initialRotation + (Math.random() > 0.5 ? 180 : -180);

      return {
        id: i,
        animationProps: {
          style: {
            top: '-10%',
            left: `${xStart}vw`,
          },
          animate: {
            y: '110vh',
            x: [`${xStart}vw`, `${xEnd}vw`],
            rotate: [initialRotation, endRotation],
          },
          transition: {
            duration,
            delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          },
        },
      };
    });
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
      {petals.map(petal => <Petal key={petal.id} animationProps={petal.animationProps} />)}
    </div>
  );
}