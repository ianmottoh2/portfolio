'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Gauge, TrendingUp, Sparkles, CheckCircle2, ArrowUpRight, Cpu, Server, Smartphone } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const PerformanceImpactDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nextjs' | 'ember'>('nextjs');

  const metrics = [
    {
      label: 'Page Load Time (LCP)',
      ember: '3.2 sec',
      nextjs: '0.9 sec',
      improvement: '-70% Speedup',
      percentage: 70,
    },
    {
      label: 'User Bounce Rate',
      ember: '68%',
      nextjs: '13.6%',
      improvement: '-80% Drop',
      percentage: 80,
    },
    // {
    //   label: 'Google Lighthouse Score',
    //   ember: '52 / 100',
    //   nextjs: '98 / 100',
    //   improvement: '+46 Points',
    //   percentage: 98,
    // },
    // {
    //   label: 'Initial JS Bundle Size',
    //   ember: '2.8 MB',
    //   nextjs: '620 KB',
    //   improvement: '-78% Smaller',
    //   percentage: 78,
    // },
    {
      label: 'Active Vehicle Listings',
      ember: '32,000',
      nextjs: '103,000+',
      improvement: '+320% Scale',
      percentage: 100,
    },
  ];

  return (
    <GlassCard className="border border-white/12 bg-white/[0.08] rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-white/80 border border-white/15 mb-2">
            <Zap className="w-3.5 h-3.5 text-white/60" />
            <span>Migration Benchmark</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Gauge className="w-6 h-6 text-white/80" />
            Ember.js → Next.js Migration Impact
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
            Real performance telemetry achieved when I contributed the platform migration for momotor.id Adira Finance.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center p-1 rounded-full glass-panel border border-white/15 shrink-0 bg-white/5">
          <button
            onClick={() => setActiveTab('nextjs')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'nextjs'
                ? 'bg-white text-zinc-950 font-bold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Next.js (Current)
          </button>
          <button
            onClick={() => setActiveTab('ember')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'ember'
                ? 'bg-white/20 text-white font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Ember.js (Legacy)
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="glass-panel p-4 rounded-2xl border border-white/12 bg-white/[0.06] hover:border-white/25 transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70 font-medium">{m.label}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                {m.improvement}
              </span>
            </div>

            <div className="text-2xl font-extrabold text-white font-mono tracking-tight mb-2">
              {activeTab === 'nextjs' ? (
                <span className="text-white">{m.nextjs}</span>
              ) : (
                <span className="text-white/60">{m.ember}</span>
              )}
              <span className="text-xs text-white/60 font-normal ml-2">
                (was {m.ember})
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${activeTab === 'nextjs' ? m.percentage : 35}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  activeTab === 'nextjs'
                    ? 'bg-[#5B8DEF]'
                    : 'bg-white/40'
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Highlights */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
        <div className="glass-panel p-4 rounded-2xl border border-white/12 bg-white/[0.04] space-y-1">
          <div className="flex items-center gap-2 text-white/90 font-bold">
            <Server className="w-4 h-4 text-white/70" />
            <span>Server-Side Rendering (SSR)</span>
          </div>
          <p className="text-white/60 leading-relaxed">
            Replaced client-side hydration bottlenecks with streaming SSR, delivering instant HTML directly to low-spec Android devices.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/12 bg-white/[0.04] space-y-1">
          <div className="flex items-center gap-2 text-white/90 font-bold">
            <Smartphone className="w-4 h-4 text-white/70" />
            <span>Low-Bandwidth Optimization</span>
          </div>
          <p className="text-white/60 leading-relaxed">
            Compressed listing form submission payloads and dynamic image streaming for 3G/4G Indonesian mobile network speeds.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/12 bg-white/[0.04] space-y-1">
          <div className="flex items-center gap-2 text-white/90 font-bold">
            <Cpu className="w-4 h-4 text-white/70" />
            <span>Sequelize ORM Caching</span>
          </div>
          <p className="text-white/60 leading-relaxed">
            Optimized vehicle search queries with Express middleware & SQL indexing, supporting 103,000+ active vehicle listings effortlessly.
          </p>
        </div>
      </div> */}
    </GlassCard>
  );
};
