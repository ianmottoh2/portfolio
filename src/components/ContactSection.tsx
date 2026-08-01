'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Send, Check, Copy, MessageSquare, Sparkles, User, FileText, MessageCircleMore } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GlassCard } from './GlassCard';
import Link from 'next/link';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-white/80 border border-white/15 mb-2">
          <Send className="w-3.5 h-3.5 text-white/60" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Let's Build Something Exceptional
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-1">
          I'm open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-12 space-y-4">
          <GlassCard padding="medium" className="space-y-6 rounded-3xl border border-white/12">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-white/10 flex items-center gap-2">
              <User className="w-5 h-5 text-white/80" />
              Contact Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-white/80 border border-white/12 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-white/50 text-xs font-medium block">Email Address</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{PERSONAL_INFO.email}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                      title="Copy Email"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-white/80 border border-white/12 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-white/50 text-xs font-medium block">Phone / WhatsApp</span>
                  <Link
                      target="_blank"
                      href={PERSONAL_INFO.waLink}
                      rel="noopener noreferrer nofollow"
                      className="font-semibold text-white hover:text-white/80 transition-colors"
                    >
                      {PERSONAL_INFO.formattedPhone}
                    </Link>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-white/80 border border-white/12 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-white/50 text-xs font-medium block">Location</span>
                  <span className="font-semibold text-white">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-white/80 border border-white/12 shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-white/50 text-xs font-medium block">LinkedIn</span>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white hover:underline"
                  >
                    linkedin.com/in/septian-mottoh
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2">
              <Link
                href={PERSONAL_INFO.waLink}
                target='_blank'
                rel="noopener noreferrer nofollow"
                className="w-full bg-[#151515] hover:bg-[#222222] border border-white/15 text-white font-semibold py-3 rounded-full text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircleMore className="w-4 h-4 text-white/70" />
                <span>WhatsApp Me</span>
              </Link>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-full bg-[#151515] hover:bg-[#222222] border border-white/15 text-white font-semibold py-3 rounded-full text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Mail className="w-4 h-4 text-white/70" />
                <span>Send Email</span>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Interactive Message Form */}
        {/* <div className="lg:col-span-7">
          <GlassCard padding="medium" className="space-y-6 rounded-3xl border border-white/12">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-white/10 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-white/80" />
              Send a Message
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl glass-panel border border-white/20 bg-white/10 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-white/70 max-w-sm mx-auto">
                  Thank you for reaching out, {formData.name || 'friend'}. Septian will review your message and reply promptly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white/70">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white/70">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70">Subject / Inquiry Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full-Stack Senior Developer Role Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project, team, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#151515] hover:bg-[#222222] border border-white/15 text-white font-semibold py-3 rounded-full text-xs flex items-center justify-center gap-2 shadow-lg transition-all group"
                >
                  <span>Submit Message</span>
                  <Send className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </GlassCard>
        </div> */}
      </div>
    </section>
  );
};
