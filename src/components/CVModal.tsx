'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, Copy, Check, Mail, Phone, MapPin, Linkedin, ExternalLink, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, SKILL_CATEGORIES, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`
      Septian Feldy Leonard Mottoh
      Full-Stack Web Developer | momotor.id & momobil.id
      Email: ${PERSONAL_INFO.email}
      LinkedIn: ${PERSONAL_INFO.linkedin}
      Location: ${PERSONAL_INFO.location}
    `);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-lg"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl glass-panel p-6 sm:p-10 rounded-3xl border border-white/20 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/80 font-semibold uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-white/60" />
              <span>Curriculum Vitae</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="glass-button p-2.5 rounded-xl text-xs font-medium text-white/80 hover:text-white flex items-center gap-1.5"
                title="Copy Contact Info"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Info'}</span>
              </button>
              {/* <button
                onClick={handlePrint}
                className="glass-button p-2.5 rounded-xl text-xs font-medium text-white/80 hover:text-white flex items-center gap-1.5"
                title="Print CV"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button> */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl glass-panel text-white/70 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Close CV Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Container */}
          <div className="space-y-8 text-white/90 font-sans print:text-black">
            {/* Candidate Header */}
            <div className="text-center space-y-3 pb-6 border-b border-white/10">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-white/80">
                {PERSONAL_INFO.title}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-white/60" />
                  <span>LinkedIn Profile</span>
                </a>
                <span>•</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-white/60" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <span>•</span>
                {/* <a href={PERSONAL_INFO.waLink} target='_blank' className="hover:text-white flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-white/60" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
                <span>•</span> */}
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-white/60" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-white/60" />
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed pl-6 border-l-2 border-white/20">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-white/60" />
                Work Experience
              </h2>
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-white">{exp.company}</h3>
                    <span className="text-xs text-white/80 font-medium">{exp.period}</span>
                  </div>
                  <div className="text-xs font-medium text-white/80 flex items-center justify-between">
                    <span>{exp.role}</span>
                    <span className="text-white/50">{exp.location}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-white/80 list-disc list-inside leading-relaxed">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="pl-1">{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-white/60" />
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-xl border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-white/90">{cat.title}</h4>
                    <p className="text-xs text-white/70 leading-normal">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Education */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-white/60" />
                  Education
                </h2>
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-xl border border-white/10 space-y-1">
                    <h4 className="text-xs font-bold text-white">{edu.degree}</h4>
                    <p className="text-xs text-white/80">{edu.institution} - {edu.location}</p>
                    <p className="text-[11px] text-white/50">{edu.period}</p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-white/60" />
                  Certifications
                </h2>
                <div className="space-y-2">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="glass-panel p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-white block">{cert.title}</span>
                        <span className="text-[11px] text-white/60">{cert.provider}</span>
                      </div>
                      <span className="text-xs text-white/90 font-medium ml-2 shrink-0">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="glass-button px-5 py-2.5 rounded-2xl text-xs font-semibold text-white/70 hover:text-white"
            >
              Close Resume
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CVModal;
