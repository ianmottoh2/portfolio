'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Send, User, Briefcase, House } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCVModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCVModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <House className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Send className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pointer-events-auto">
      <div
        className={`
          max-w-6xl mx-auto glass-panel rounded-2xl flex items-center justify-between gap-4
          px-4 sm:px-6 py-3 transition-all duration-300
          ${scrolled ? 'border-white/25 shadow-[0_24px_70px_rgba(0,0,0,0.65)]' : ''}
        `}
      >
        {/* Logo / Wordmark — Left Aligned */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5B8DEF] to-[#3a66c8] flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-[#5B8DEF]/25">
            SM
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-bold text-white tracking-tight leading-none">Septian Mottoh</div>
            <div className="text-[10px] text-white/60 tracking-wide mt-1">Full-Stack Developer</div>
          </div>
        </button>

        {/* Desktop Nav Links — Right Aligned */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`
                  relative px-3.5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer select-none
                  ${isActive ? 'text-white' : 'text-white/65 hover:text-white'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#5B8DEF] rounded-full shadow-lg shadow-[#5B8DEF]/30 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 pointer-events-none">{item.label}</span>
              </button>
            );
          })}

          <motion.button
            type="button"
            onClick={onOpenCVModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="ml-2 glass-button px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] text-white flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-white/70" />
            <span>View CV</span>
          </motion.button>
        </nav>

        {/* Mobile Actions — Right Aligned */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onOpenCVModal}
            whileTap={{ scale: 0.97 }}
            className="glass-button px-3.5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] text-white flex items-center gap-2 cursor-pointer"
            aria-label="View CV"
          >
            <FileText className="w-3.5 h-3.5 text-white/70" />
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="glass-panel p-2.5 rounded-full text-white/75 hover:text-white border border-white/10 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 max-w-6xl mx-auto saturated-glass p-4 rounded-3xl border border-white/15 shadow-2xl pointer-events-auto"
          >
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-3 transition-all text-left cursor-pointer
                      ${
                        isActive
                          ? 'bg-[#5B8DEF] text-white shadow-md shadow-[#5B8DEF]/25'
                          : 'text-white/75 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60'}`}>
                      {item.icon}
                    </div>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
