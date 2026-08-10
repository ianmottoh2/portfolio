'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

// --- Tuning knobs (SpectraNoise-inspired internal constants) ---
// Adjust these to retune the effect; there is intentionally no settings UI.
const DRIFT_ENABLED = true; // master switch for the drift animation layers
const GLOW_DRIFT_ENABLED = true; // soft warp/glow drift layers
const SCANLINE_DRIFT_ENABLED = true; // scanline drift
const GRAIN_DRIFT_ENABLED = true; // grain drift
const GRAIN_TILE = 160; // "resolution" — noise tile size in px (also used for the SVG tile)
const GRAIN_OPACITY = 0.05; // "intensity" — 3–6% target, monochrome
const GRAIN_DRIFT = 36; // seconds per grain drift loop
const SCANLINE_ALPHA = 0.06; // alpha of each 1px line
const SCANLINE_PERIOD = 4; // px between scanlines
const SCANLINE_DRIFT = 26; // seconds per downward scanline loop
const GLOW_OPACITY = 0.06; // soft warp/glow drift layer strength
const GLOW_DRIFT_ONE = 30; // seconds per glow-1 loop
const GLOW_DRIFT_TWO = 40; // seconds per glow-2 loop

// Monochrome feTurbulence grain tile (SVG filter, rendered once as a static asset —
// never regenerated per frame). No canvas/WebGL involved.
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='${GRAIN_TILE}' height='${GRAIN_TILE}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='${GRAIN_TILE}' height='${GRAIN_TILE}' filter='url(#n)'/></svg>`;
const NOISE_URI = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

const SCANLINE_GRADIENT = `repeating-linear-gradient(to bottom, rgba(255,255,255,${SCANLINE_ALPHA}) 0px, rgba(255,255,255,${SCANLINE_ALPHA}) 1px, transparent 1px, transparent ${SCANLINE_PERIOD}px)`;

export const NoiseBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  // Freeze drift under prefers-reduced-motion, when the tab is hidden,
  // or when drift is globally disabled (static grain/scanline texture stays visible).
  const frozen = prefersReducedMotion || !isTabVisible || !DRIFT_ENABLED;
  const grainOpacity = isMobile ? GRAIN_OPACITY * 0.7 : GRAIN_OPACITY;
  const noDrift = frozen ? {} : undefined;
  const glowDrift = !GLOW_DRIFT_ENABLED || noDrift ? {} : undefined;
  const scanlineDrift = !SCANLINE_DRIFT_ENABLED || noDrift ? {} : undefined;
  const grainDrift = !GRAIN_DRIFT_ENABLED || noDrift ? {} : undefined;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Layer 3: soft warp/glow drift (back) — two very large, very low-opacity radials */}
      <motion.div
        className="absolute -inset-[15%]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)',
          opacity: GLOW_OPACITY,
          willChange: 'transform',
        }}
        animate={glowDrift ?? { x: [0, 70, -50, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: GLOW_DRIFT_ONE, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -inset-[18%]"
        style={{
          background:
            'radial-gradient(circle at 60% 45%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 45%, transparent 72%)',
          opacity: GLOW_OPACITY,
          willChange: 'transform',
        }}
        animate={glowDrift ?? { x: [0, -60, 45, 0], y: [0, 55, -35, 0] }}
        transition={{ duration: GLOW_DRIFT_TWO, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* Layer 2: scanlines (desktop only — dropped on mobile to cut paint cost) */}
      {!isMobile && (
        <motion.div
          className="absolute inset-x-0 -inset-y-[20%]"
          style={{ backgroundImage: SCANLINE_GRADIENT, willChange: 'transform' }}
          animate={scanlineDrift ?? { y: [0, -SCANLINE_PERIOD] }}
          transition={{ duration: SCANLINE_DRIFT, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Layer 1: fine film-grain static (front) */}
      <motion.div
        className="absolute -inset-[8%]"
        style={{ backgroundImage: NOISE_URI, opacity: grainOpacity, willChange: 'transform' }}
        animate={grainDrift ?? { x: [0, 24, -18, 0], y: [0, -14, 12, 0] }}
        transition={{ duration: GRAIN_DRIFT, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Static vignette falloff — anchors edges back to pure black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_58%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
};

export default NoiseBackground;
