import React from 'react';
import { Briefcase } from 'lucide-react';
import { PortfolioExplorer } from './PortfolioExplorer';

export const PortfolioSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 pb-12 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-white/80 border border-white/15 mb-2">
          <Briefcase className="w-3 h-3 text-white/60" />
          <span>Full Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          A collection of projects I've built and shipped.
        </h1>
      </div>

      <PortfolioExplorer />
    </section>
  );
};
