'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { GlassCard } from './GlassCard';
import { ProjectGallery } from './ProjectGallery';

export const PortfolioExplorer: React.FC = () => {
  const [portfolioCategory, setPortfolioCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => ['All', 'Full-Stack', 'Tools & Systems'], []);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesCategory = portfolioCategory === 'All' || p.category === portfolioCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.techStack.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [portfolioCategory, searchQuery]);

  return (
    <>
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-3xl border border-white/12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setPortfolioCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                portfolioCategory === cat
                  ? 'bg-[#5B8DEF] text-white shadow-sm'
                  : 'glass-pill text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64 glass-panel rounded-full border border-white/12 flex items-center">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search stack or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent pl-10 pr-8 py-2 text-xs text-white placeholder-white/40 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-1 text-white/50 hover:text-white rounded-full transition-colors cursor-pointer text-xs"
              title="Clear Search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <ProjectGallery projects={filteredProjects} />
      ) : (
        <GlassCard className="text-center py-12 space-y-3">
          <p className="text-sm text-white/60">No projects found matching "{searchQuery}".</p>
          <button
            type="button"
            onClick={() => {
              setPortfolioCategory('All');
              setSearchQuery('');
            }}
            className="glass-button px-4 py-2 rounded-full text-xs text-white font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        </GlassCard>
      )}
    </>
  );
};
