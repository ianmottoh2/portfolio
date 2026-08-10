import React from 'react';
import { User } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GlassCard } from './GlassCard';
import { AvatarImage } from './AvatarImage';
import { ExperienceTimeline } from './ExperienceTimeline';
import { SkillsSection } from './SkillsSection';
import { TabButton } from './TabButton';
import { OpenCVButton } from './OpenCVButton';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 pb-12 space-y-12">
      {/* About Header Card */}
      <GlassCard padding="large" className="border border-white/15 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <AvatarImage
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                sizes="(max-width: 640px) 192px, 224px"
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
              <OpenCVButton className="bg-[#0c0d10] hover:bg-[#171a1f] border border-white/15 px-5 py-2.5 rounded-full text-xs font-semibold text-white shadow-lg transition-all cursor-pointer">
                Open Full Resume
              </OpenCVButton>
              <TabButton
                tab="contact"
                className="glass-button px-5 py-2.5 rounded-full text-xs font-medium text-white/80 hover:text-white cursor-pointer"
              >
                Get In Touch
              </TabButton>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Career Experience Timeline */}
      <ExperienceTimeline />

      {/* Full Skills Categorization */}
      <SkillsSection />
    </div>
  );
};
