import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { HeroSection } from './HeroSection';
import { PerformanceImpactDemo } from './PerformanceImpactDemo';
import { SkillsSection } from './SkillsSection';
import { ProjectGallery } from './ProjectGallery';
import { TabButton } from './TabButton';

export const HomeSection: React.FC = () => {
  return (
    <div className="space-y-16">
      <HeroSection />

      {/* Featured Projects Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-white/80 border border-white/15 mb-2">
              <Briefcase className="w-3 h-3 text-white/60" />
              <span>Featured Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Work Showcase
            </h2>
          </div>

          <TabButton
            tab="portfolio"
            className="bg-[#151515] hover:bg-[#222222] border border-white/15 px-4 py-2 rounded-full text-xs font-medium text-white flex items-center gap-2 self-start sm:self-auto transition-all cursor-pointer"
          >
            <span>View All Portfolio ({PROJECTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/70" />
          </TabButton>
        </div>

        <ProjectGallery projects={PROJECTS.filter((p) => p.featured)} />
      </section>

      {/* Performance Impact Benchmark Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PerformanceImpactDemo />
      </section>

      {/* Technical Skills Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <SkillsSection />
      </section>
    </div>
  );
};
