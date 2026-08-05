'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Phone, MapPin, Check, Copy, Heart, ArrowUp, MessageCircleMore } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="sm:mt-20 border-t border-white/10 relative z-10 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-gradient-cyan">{PERSONAL_INFO.preferredName}</span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-md">
              Full-stack developer with hands-on experience building and scaling consumer-facing vehicle marketplace platforms in Indonesia.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">Quick Nav</h4>
            <ul className="space-y-2 text-xs font-medium text-white/70">
              <li>
                <button onClick={() => { setActiveTab('home'); scrollToTop(); }} className="hover:text-cyan-300 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('portfolio'); scrollToTop(); }} className="hover:text-cyan-300 transition-colors">
                  Portfolio & Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); scrollToTop(); }} className="hover:text-cyan-300 transition-colors">
                  About Me & Work History
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); scrollToTop(); }} className="hover:text-cyan-300 transition-colors">
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Email Copy & Socials */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">Get In Touch</h4>
            <p className="text-xs text-white/60">Open for full-stack engineering roles, and high-impact web/mobile projects.</p>
            
            <div className="glass-pill px-3.5 py-2 rounded-xl flex items-center justify-between border border-white/10 group">
              <span className="text-xs text-white/80 font-mono truncate mr-2">{PERSONAL_INFO.email}</span>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-cyan-500/20 text-white/80 hover:text-cyan-300 transition-colors"
                title="Copy Email Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-2.5 rounded-xl text-white/80 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="glass-panel p-2.5 rounded-xl text-white/80 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              {/* <a
                href={PERSONAL_INFO.waLink}
                target='_blank'
                className="glass-panel p-2.5 rounded-xl text-white/80 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="Call Phone Number"
              >
                <MessageCircleMore className="w-4 h-4" />
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
