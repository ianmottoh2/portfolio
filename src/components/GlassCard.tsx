'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowOnHover = true,
  padding = 'medium',
  onClick,
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-2 sm:p-4',
    medium: 'p-6 sm:p-8',
    large: 'p-8 sm:p-10',
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              transition: { duration: 0.25, ease: 'easeOut' },
            }
          : undefined
      }
      className={`
        glass-panel backdrop-blur-3xl
        rounded-2xl
        relative overflow-hidden 
        transition-colors duration-300
        ${paddingClasses[padding]}
        ${hoverEffect ? 'hover:border-white/25 hover:bg-white/[0.12]' : ''}
        ${glowOnHover ? 'hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]' : ''}
        ${onClick ? 'cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-white/30' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Glass sheen & subtle top inner border highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.09] via-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};