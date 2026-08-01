'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Send, Sparkles, User, Briefcase, Zap, House } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCVModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCVModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  console.log("scrolled", scrolled)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <House className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'about', label: 'About Me', icon: <User className="w-4 h-4" /> },
    // { id: 'impact', label: 'Performance Impact', icon: <Zap className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Send className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 pointer-events-auto">
      <div className="max-w-6xl mx-auto flex items-center justify-center relative pointer-events-auto min-h-[44px]">
        {/* Desktop Navigation Links - Centered */}
        <nav className="hidden md:flex items-center gap-1 glass-panel p-1.5 rounded-full border border-white/12 shadow-xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`
                  relative px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer select-none
                  ${isActive ? 'text-zinc-950 font-semibold' : 'text-white/60 hover:text-white'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 pointer-events-none">
                  <span className={isActive ? 'text-zinc-950' : 'text-white/60'}>
                    {item.icon}
                  </span>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Actions (CV Modal + Mobile Menu Toggle) - Right Aligned */}
        <div className="absolute right-0 flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onOpenCVModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#151515] hover:bg-[#222222] border border-white/15 px-4 py-2.5 rounded-full text-xs font-medium text-white flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-white/70" />
            <span className="hidden sm:inline">View Resume</span>
            <span className="sm:hidden">CV</span>
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden glass-panel p-2.5 rounded-full text-white/70 hover:text-white border border-white/10 cursor-pointer"
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
            className="md:hidden mt-3 max-w-6xl mx-auto glass-panel p-4 rounded-3xl border border-white/15 shadow-2xl pointer-events-auto"
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
                          ? 'bg-white text-zinc-950 font-semibold shadow-md'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-zinc-100 text-zinc-950' : 'bg-white/5 text-white/60'}`}>
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
