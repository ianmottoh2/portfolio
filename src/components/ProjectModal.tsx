'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Layers, BarChart3, Building2, UserCheck } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-2xl glass-panel text-white/70 hover:text-white hover:border-white/30 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Image Header */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 group border border-white/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/50 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
              <span className="glass-pill px-3 py-1 rounded-full text-xs font-medium text-white/80 border border-white/15">
                {project.category}
              </span>
              {project.company && (
                <span className="glass-pill px-3 py-1 rounded-full text-xs font-medium text-white/90 flex items-center gap-1.5 border border-white/15">
                  <Building2 className="w-3.5 h-3.5 text-white/60" />
                  {project.company}
                </span>
              )}
            </div>
          </div>

          {/* Header Titles */}
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-medium">
              {project.subtitle}
            </p>
            {project.role && (
              <div className="flex items-center gap-2 text-xs text-white/60 pt-1">
                <UserCheck className="w-4 h-4 text-white/60" />
                <span>Role: <strong className="text-white/80">{project.role}</strong></span>
              </div>
            )}
          </div>

          {/* Key Impact Metrics Grid */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-white/60" />
              Key Business & Technical Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.impactMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-3.5 rounded-2xl border border-white/15 bg-white/[0.06] flex items-center gap-3 text-xs font-medium text-white/90"
                >
                  <div className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Narrative Description */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Project Overview & Challenge
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6 space-y-3">
              <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-white/60" />
                Core Features & Implementation
              </h3>
              <div className="space-y-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architectural Notes */}
          {project.architectureNotes && (
            <div className="mb-6 glass-panel p-4 rounded-2xl border border-white/15 bg-white/[0.06]">
              <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-white/60" />
                Architecture & Engineering Notes
              </h4>
              <p className="text-xs text-white/80 leading-relaxed font-mono">
                {project.architectureNotes}
              </p>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="glass-pill px-3 py-1.5 rounded-xl text-xs font-medium text-white/80 border border-white/10 bg-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-button px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 text-white/80 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#151515] hover:bg-[#222222] border border-white/15 text-white font-semibold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-4 h-4 text-white/70" />
              </a>
            )}
            <button
              onClick={onClose}
              className="glass-button px-4 py-2.5 rounded-full text-xs font-semibold text-white/70 hover:text-white"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
