'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { ArrowRight, FileText, Sparkles, Code2, Zap } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';
import { GlassCard } from './GlassCard';
import { LiquidBackground } from './LiquidBackground';
import { ActiveTab } from '../types';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
});

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCVModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onOpenCVModal }) => {
  return (
    <section className="relative pt-24 sm:pt-32 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Top Hero Glass Card Grid */}
        <GlassCard className="p-8 sm:p-12 relative overflow-hidden border border-white/15 bg-white/[0.08] shadow-2xl rounded-3xl">
          <div className="space-y-6 max-w-4xl">
            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Hi, I'm {PERSONAL_INFO.preferredName}
              </h1>
              <p className="text-lg sm:text-2xl font-medium text-white/90 leading-snug">
                Building & scaling high-performance vehicle marketplace platforms, Next.js migrations, and real-time appraisal systems.
              </p>
            </div>

            {/* Narrative Intro */}
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-3xl">
              Led a cross-functional migration from Ember.js to Next.js for <strong className="text-white font-semibold">momotor.id</strong> & <strong className="text-white font-semibold">momobil.id</strong> that cut load times by <strong className="text-white font-bold">70%</strong> and reduced bounce rates by <strong className="text-white font-bold">80%</strong>. Engineered tools serving <strong className="text-white font-semibold">103,000+</strong> vehicle listings and <strong className="text-white font-semibold">11,400+</strong> digital appraisals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('portfolio')}
                className="bg-[#151515] hover:bg-[#222222] border border-white/15 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white flex items-center gap-2 shadow-xl transition-all group cursor-pointer"
              >
                <span>Explore Portfolio Case Studies</span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('about')}
                className="glass-button px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <span>About & Experience</span>
              </button>

              <button
                type="button"
                onClick={onOpenCVModal}
                className="glass-button px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-white/70" />
                <span>View Resume</span>
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Stat Pills Grid Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATS.map((stat, idx) => (
            <GlassCard
              key={idx}
              padding="small"
              onClick={() => setActiveTab('portfolio')}
              className="text-center hover:border-white/25 transition-all group border-white/10 rounded-2xl cursor-pointer"
            >
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-mono group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-white/90 mt-1">{stat.label}</div>
              <div className="text-[10px] text-white/50 mt-1 line-clamp-2">{stat.description}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};