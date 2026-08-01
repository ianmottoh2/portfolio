'use client';

import React from 'react';
import { motion } from 'motion/react';

export const GlowBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#3a3a3d] via-[#242427] to-[#1a1a1c]">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-25 z-10" />

      {/* Subtle Studio Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,#000_70%,transparent_100%)] opacity-30" />

      {/* Animated Gradient Mesh Blobs */}
      {/* Blob 1: Soft Studio Accent Blue Glow (Top Right) */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-20 right-1/4 w-[36rem] h-[36rem] rounded-full bg-[#5B8DEF]/20 blur-[130px] pointer-events-none transform-gpu will-change-transform"
      />

      {/* Blob 2: Deep Indigo Slate Ambient (Middle Left) */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -left-20 w-[40rem] h-[40rem] rounded-full bg-[#4338CA]/15 blur-[150px] pointer-events-none transform-gpu will-change-transform"
      />
      
      {/* Bottom Ambient Dark Falloff */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
};


