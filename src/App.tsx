'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import { GlowBackground } from './components/GlowBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ProjectCard } from './components/ProjectCard';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { PerformanceImpactDemo } from './components/PerformanceImpactDemo';
import { ContactSection } from './components/ContactSection';
import { PROJECTS, PERSONAL_INFO } from './data/portfolioData';
import { ActiveTab, Project } from './types';
import { GlassCard } from './components/GlassCard';
import { Search, Sparkles, ArrowRight, Filter, Briefcase, User, Zap, Send } from 'lucide-react';

const ProjectModal = dynamic(() => import('./components/ProjectModal'), { ssr: false });
const CVModal = dynamic(() => import('./components/CVModal'), { ssr: false });

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);

  // Portfolio page filter & search state
  const [portfolioCategory, setPortfolioCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => ['All', 'Full-Stack', 'Tools & Systems'], []);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleOpenCVModal = useCallback(() => {
    setIsCVModalOpen(true);
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleCloseCVModal = useCallback(() => {
    setIsCVModalOpen(false);
  }, []);

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
    <div className="min-h-screen text-white relative font-sans selection:bg-white/20 selection:text-white">
      {/* Persistent Glass & Glow Background Mesh */}
      <GlowBackground />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCVModal={handleOpenCVModal}
      />

      {/* Main View Area */}
      <main className="relative z-10">
        {/* <AnimatePresence mode="wait"> */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-16"
            >
              <HeroSection
                setActiveTab={setActiveTab}
                onOpenCVModal={handleOpenCVModal}
              />

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

                  <button
                    type="button"
                    onClick={() => setActiveTab('portfolio')}
                    className="bg-[#151515] hover:bg-[#222222] border border-white/15 px-4 py-2 rounded-full text-xs font-medium text-white flex items-center gap-2 self-start sm:self-auto transition-all cursor-pointer"
                  >
                    <span>View All Portfolio ({PROJECTS.length})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROJECTS.filter((p) => p.featured).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={handleSelectProject}
                    />
                  ))}
                </div>
              </section>

              {/* Performance Impact Benchmark Preview */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <PerformanceImpactDemo />
              </section>

              {/* Technical Skills Preview */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <SkillsSection />
              </section>
            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-36 pb-12 space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-white/80 border border-white/15 mb-2">
                  <Briefcase className="w-3 h-3 text-white/60" />
                  <span>Full Portfolio</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  A collection of projects I've built and shipped.
                </h1>
                {/* <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl">
                  Deep-dive architectures, migration strategies, inspection tools, mobile apps, and test suites i've engineered.
                </p> */}
              </div>

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={handleSelectProject}
                    />
                  ))}
                </div>
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
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-36 pb-12 space-y-12"
            >
              {/* About Header Card */}
              <GlassCard padding="large" className="border border-white/15 rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                      <Image
                        src={PERSONAL_INFO.avatar}
                        alt={PERSONAL_INFO.name}
                        fill
                        sizes="(max-width: 640px) 192px, 224px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-white/80 border border-white/15">
                      <User className="w-3.5 h-3.5 text-white/60" />
                      <span>About Septian Mottoh</span>
                    </div>

                    <h1 className="text-3xl font-bold text-white tracking-tight">
                      Full-Stack Developer
                    </h1>

                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      {PERSONAL_INFO.bio}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setIsCVModalOpen(true)}
                        className="bg-[#151515] hover:bg-[#222222] border border-white/15 px-5 py-2.5 rounded-full text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
                      >
                        Open Full Resume
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('contact')}
                        className="glass-button px-5 py-2.5 rounded-full text-xs font-medium text-white/80 hover:text-white cursor-pointer"
                      >
                        Get In Touch
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Career Experience Timeline */}
              <ExperienceTimeline />

              {/* Full Skills Categorization */}
              <SkillsSection />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-36 pb-12"
            >
              <ContactSection />
            </motion.div>
          )}
        {/* </AnimatePresence> */}
      </main>

      {/* Persistent Glass Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Detailed Project Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseProjectModal}
        />
      )}

      {/* Interactive Resume CV Modal */}
      {isCVModalOpen && (
        <CVModal
          isOpen={isCVModalOpen}
          onClose={handleCloseCVModal}
        />
      )}
    </div>
  );
}

