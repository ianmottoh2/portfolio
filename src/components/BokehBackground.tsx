'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import BokehDesktop from '../assets/images/bokeh-orbs.avif';
import BokehMobile from '../assets/images/bokeh-orbs-mobile.avif';

interface OrbConfig {
  id: string;
  size: number;
  left: string;
  top: string;
  type: 'soft' | 'sharp';
  dx: number;
  dy: number;
  duration: number;
  delay: number;
  opacity?: number;
}

// GPU-friendly: static blur() filter (never animated), animates transform/opacity only.
// Desktop only — capped at 3 live orbs; mobile renders the simplified static image with 0 live orbs.
const LIVE_ORBS: OrbConfig[] = [
  {
    id: 'foreground-soft',
    size: 430,
    left: '6%',
    top: '52%',
    type: 'soft',
    dx: 26,
    dy: -20,
    duration: 26,
    delay: 0,
    opacity: 0.85,
  },
  {
    id: 'sharp-1',
    size: 112,
    left: '16%',
    top: '16%',
    type: 'sharp',
    dx: 14,
    dy: 10,
    duration: 18,
    delay: 1,
  },
  {
    id: 'sharp-2',
    size: 158,
    left: '70%',
    top: '40%',
    type: 'sharp',
    dx: -12,
    dy: 16,
    duration: 22,
    delay: 2,
  },
];

const softGradient =
  'radial-gradient(circle, rgba(214,224,238,0.14) 0%, rgba(214,224,238,0.05) 45%, rgba(214,224,238,0) 70%)';

const sharpGradient = [
  'radial-gradient(circle at 30% 26%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 13%)',
  'radial-gradient(circle at 72% 76%, rgba(214,225,238,0.5) 0%, rgba(214,225,238,0) 26%)',
  'radial-gradient(circle at 38% 34%, rgba(122,142,164,0.5) 0%, rgba(32,40,50,0.85) 52%, rgba(7,9,12,1) 100%)',
].join(', ');

const GlassOrb: React.FC<{ config: OrbConfig; shouldAnimate: boolean }> = ({ config, shouldAnimate }) => {
  const isSoft = config.type === 'soft';
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none will-change-transform"
      style={{
        width: config.size,
        height: config.size,
        left: config.left,
        top: config.top,
        opacity: config.opacity ?? 1,
        filter: isSoft ? 'blur(26px)' : 'blur(1px)',
        background: isSoft ? softGradient : sharpGradient,
        boxShadow: isSoft ? 'none' : 'inset 0 -12px 24px rgba(0,0,0,0.6), 0 0 60px rgba(140,160,190,0.08)',
      }}
      animate={
        shouldAnimate
          ? { x: [0, config.dx, -config.dx, 0], y: [0, config.dy, -config.dy, 0] }
          : undefined
      }
      transition={{ duration: config.duration, repeat: Infinity, ease: 'easeInOut', delay: config.delay }}
    />
  );
};

export const BokehBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const shouldAnimate = !prefersReducedMotion && isTabVisible;
  const activeOrbs = isMobile ? [] : LIVE_ORBS;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Pre-rendered bokeh scene — one static image request, blur baked into the asset */}
      <Image
        src={isMobile ? BokehMobile : BokehDesktop}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Cinematic grain */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Subtle depth falloff to pure black at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_58%,rgba(0,0,0,0.42)_100%)]" />

      {/* Limited live orbs — transform/opacity only */}
      {activeOrbs.map((orb) => (
        <GlassOrb key={orb.id} config={orb} shouldAnimate={shouldAnimate} />
      ))}
    </div>
  );
};

export default BokehBackground;
