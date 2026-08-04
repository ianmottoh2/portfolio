'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { GlowBackground } from './components/GlowBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NavigationProvider } from './components/NavigationContext';
import { ActiveTab } from './types';

const CVModal = dynamic(() => import('./components/CVModal'), { ssr: false });

interface AppProps {
  home: React.ReactNode;
  portfolio: React.ReactNode;
  about: React.ReactNode;
  contact: React.ReactNode;
}

export default function App({ home, portfolio, about, contact }: AppProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);

  const handleOpenCVModal = useCallback(() => {
    setIsCVModalOpen(true);
  }, []);

  const handleCloseCVModal = useCallback(() => {
    setIsCVModalOpen(false);
  }, []);

  const tabContent: Record<ActiveTab, React.ReactNode> = {
    home,
    portfolio,
    about,
    impact: home,
    contact,
  };

  return (
    <NavigationProvider value={{ setActiveTab, openCVModal: handleOpenCVModal }}>
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
          <motion.div
            key={activeTab}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </main>

        {/* Persistent Glass Footer */}
        <Footer setActiveTab={setActiveTab} />

        {/* Interactive Resume CV Modal */}
        {isCVModalOpen && (
          <CVModal
            isOpen={isCVModalOpen}
            onClose={handleCloseCVModal}
          />
        )}
      </div>
    </NavigationProvider>
  );
}
