'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const LiquidBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Detect viewport size for mobile performance optimization (2 blobs on mobile, 4 on desktop)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const shouldAnimate = !prefersReducedMotion && isTabVisible;

  // Keyframes for organic liquid blob morphing (border-radius percentages)
  const blob1Shapes = [
    '60% 40% 30% 70% / 60% 30% 70% 40%',
    '40% 60% 70% 30% / 50% 60% 40% 50%',
    '70% 30% 50% 50% / 30% 50% 60% 70%',
    '60% 40% 30% 70% / 60% 30% 70% 40%',
  ];

  const blob2Shapes = [
    '30% 70% 70% 30% / 30% 30% 70% 70%',
    '50% 50% 30% 70% / 60% 40% 60% 40%',
    '60% 40% 60% 40% / 40% 70% 30% 60%',
    '30% 70% 70% 30% / 30% 30% 70% 70%',
  ];

  const blob3Shapes = [
    '70% 30% 50% 50% / 40% 60% 40% 60%',
    '40% 60% 30% 70% / 70% 30% 70% 30%',
    '50% 50% 60% 40% / 30% 60% 40% 70%',
    '70% 30% 50% 50% / 40% 60% 40% 60%',
  ];

  const blob4Shapes = [
    '40% 60% 60% 40% / 60% 30% 70% 40%',
    '60% 40% 40% 60% / 40% 60% 40% 60%',
    '30% 70% 50% 50% / 50% 40% 60% 50%',
    '40% 60% 60% 40% / 60% 30% 70% 40%',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1: Top-Left White/Silver Ambient Soft Glow */}
      <motion.div
        className="absolute -top-20 -left-20 w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] rounded-full blur-3xl opacity-60 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.11) 0%, rgba(220,225,240,0.03) 65%, transparent 100%)',
        }}
        animate={
          shouldAnimate
            ? {
                borderRadius: blob1Shapes,
                x: [0, 45, -25, 0],
                y: [0, -35, 30, 0],
                scale: [1, 1.12, 0.94, 1],
                rotate: [0, 25, -15, 0],
              }
            : { borderRadius: blob1Shapes[0] }
        }
        transition={{
          duration: 22,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Blob 2: Center-Right Accent Blue (Low opacity #5B8DEF to preserve monochrome balance) */}
      <motion.div
        className="absolute top-1/4 -right-24 w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] rounded-full blur-3xl opacity-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(91,141,239,0.08) 0%, rgba(108,155,245,0.02) 65%, transparent 100%)',
        }}
        animate={
          shouldAnimate
            ? {
                borderRadius: blob2Shapes,
                x: [0, -55, 25, 0],
                y: [0, 45, -45, 0],
                scale: [1, 0.9, 1.1, 1],
                rotate: [0, -30, 20, 0],
              }
            : { borderRadius: blob2Shapes[0] }
        }
        transition={{
          duration: 26,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 2,
        }}
      />

      {/* Blob 3: Bottom-Left Soft Neutral Gray */}
      <motion.div
        className="absolute -bottom-24 left-1/4 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full blur-3xl opacity-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(240,240,245,0.07) 0%, rgba(180,185,200,0.02) 70%, transparent 100%)',
        }}
        animate={
          shouldAnimate
            ? {
                borderRadius: blob3Shapes,
                x: [0, 35, -40, 0],
                y: [0, -30, 25, 0],
                scale: [1, 1.14, 0.92, 1],
                rotate: [0, 20, -20, 0],
              }
            : { borderRadius: blob3Shapes[0] }
        }
        transition={{
          duration: 28,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 4,
        }}
      />

      {/* Blob 4: Desktop-only Top-Right Soft Ambient Layer */}
      {!isMobile && (
        <motion.div
          className="absolute -top-12 right-1/3 w-[380px] h-[380px] rounded-full blur-3xl opacity-40 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(200,205,220,0.02) 75%, transparent 100%)',
          }}
          animate={
            shouldAnimate
              ? {
                  borderRadius: blob4Shapes,
                  x: [0, -35, 35, 0],
                  y: [0, 40, -25, 0],
                  scale: [1, 0.92, 1.08, 1],
                  rotate: [0, -15, 15, 0],
                }
              : { borderRadius: blob4Shapes[0] }
          }
          transition={{
            duration: 24,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 1,
          }}
        />
      )}
    </div>
  );
};
