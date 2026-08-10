'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Database, Smartphone, Wrench, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { GlassCard } from './GlassCard';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Core Programming & Web': <Code2 className="w-5 h-5 text-white/80" />,
    'Backend & Database Architecture': <Database className="w-5 h-5 text-white/80" />,
    'Mobile & Testing': <Smartphone className="w-5 h-5 text-white/80" />,
    'Tools, DevOps & Agile Workflows': <Wrench className="w-5 h-5 text-white/80" />,
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchingSkills,
    };
  }).filter((cat) => {
    if (selectedCategory !== 'All' && cat.title !== selectedCategory) return false;
    return cat.skills.length > 0;
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-white/80 border border-white/15 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-white/60" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Skills & Technical Stack
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Proficiency across full-stack web, mobile native, database, and testing tools.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64 glass-panel rounded-full overflow-hidden border border-white/12 flex items-center">
            <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search skill (e.g., Next.js, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-10 pr-8 py-2 text-xs text-white placeholder-white/50 focus:outline-none"
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
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('All');
            setSearchQuery('');
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
            selectedCategory === 'All' && !searchQuery
              ? 'bg-[#5B8DEF] text-white shadow-sm'
              : 'glass-pill text-white/60 hover:text-white border border-white/10'
          }`}
        >
          All Categories
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.title}
            type="button"
            onClick={() => setSelectedCategory(cat.title)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat.title
                ? 'bg-[#5B8DEF] text-white shadow-sm'
                  : 'glass-pill text-white/70 hover:text-white border border-white/10'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <GlassCard key={category.title} padding="medium" className="space-y-4 rounded-3xl border border-white/12">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="p-2 rounded-xl bg-white/10 border border-white/12">
                  {categoryIcons[category.title] || <Code2 className="w-5 h-5 text-white/80" />}
                </div>
                <h3 className="text-base font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => setSearchQuery(skill.name)}
                    title={`Filter by ${skill.name}`}
                    className={`
                      px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer text-left
                      ${
                        searchQuery.toLowerCase() === skill.name.toLowerCase()
                          ? 'bg-[#5B8DEF] text-white font-bold shadow-md'
                          : skill.highlight
                          ? 'glass-panel border-white/20 text-white bg-white/10 font-semibold hover:bg-white/20'
                          : 'glass-panel border-white/10 text-white/70 hover:text-white hover:bg-white/15'
                      }
                    `}
                  >
                    {skill.highlight && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] text-white/60 font-normal">({skill.level})</span>
                    )}
                  </button>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard className="text-center py-10 space-y-3 rounded-3xl border border-white/12">
          <p className="text-sm text-white/60">No skills found matching "{searchQuery}".</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="glass-button px-4 py-2 rounded-full text-xs text-white font-medium cursor-pointer"
          >
            Clear Filters
          </button>
        </GlassCard>
      )}
    </section>
  );
};
