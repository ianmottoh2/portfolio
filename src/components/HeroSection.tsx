'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';
import { GlassCard } from './GlassCard';
import { TabButton } from './TabButton';
import { useNavigation } from './NavigationContext';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useNavigation();

  const handleClickPills = (data: { value: string } | undefined) => {
    if (data?.value === '3+') setActiveTab('about');
    else setActiveTab('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 sm:pt-32 sm:pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Top Hero Glass Card Grid */}
        <GlassCard className="p-8 sm:p-12 relative overflow-hidden border border-white/15 bg-white/[0.08] shadow-2xl rounded-3xl">
          <div className="space-y-6 max-w-4xl">
            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Hi, I'm {PERSONAL_INFO.preferredName}
              </h1>
            </div>

            <p className="text-lg sm:text-2xl text-white/60 leading-relaxed font-medium max-w-4xl">
              Full Stack Developer building scalable, high-performance, mobile-optimized web
              applications. Currently delivering digital products at
              {" "}
              <strong className="text-white font-semibold">Adira Finance</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <TabButton
                tab="contact"
                className="bg-[#151515] hover:bg-[#222222] border border-white/15 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white flex items-center gap-2 shadow-xl transition-all group cursor-pointer"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
              </TabButton>

              <TabButton
                tab="portfolio"
                className="glass-button px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <span>View Portfolio</span>
              </TabButton>

              <TabButton
                tab="about"
                className="glass-button px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <span>About & Experience</span>
              </TabButton>
            </div>
          </div>
        </GlassCard>

        {/* Stat Pills Grid Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATS.map((stat, idx) => (
            <GlassCard
              key={idx}
              padding="medium"
              onClick={() => handleClickPills(stat)}
              className="text-center hover:border-white/25 transition-all group border-white/10 rounded-2xl cursor-pointer"
            >
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-mono group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-white/90 mt-1">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
