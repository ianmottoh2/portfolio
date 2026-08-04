import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Award } from 'lucide-react';
import { WORK_EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import { GlassCard } from './GlassCard';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-white/80 border border-white/15 mb-2">
          <Briefcase className="w-3.5 h-3.5 text-white/60" />
          <span>Career Journey</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Work Experience & Education
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-1">
          Full-stack engineering across high-scale automotive marketplaces and mobile ecosystems.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-white/20">
        {WORK_EXPERIENCE.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Node Point */}
            <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#2a2a2d] border-2 border-white/80 group-hover:scale-125 transition-transform shadow-md" />

            <GlassCard padding="large" className="space-y-4 border border-white/12 hover:border-white/25 rounded-3xl">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/90 border border-white/20">
                      Primary Role
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white/80 mt-0.5">{exp.role}</p>
                </div>

                <div className="flex flex-col sm:items-end text-xs text-white/60 font-medium">
                  <div className="flex items-center gap-1.5 text-white/90 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-white/60" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-white/60">
                    <MapPin className="w-3.5 h-3.5 text-white/50" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Supported Platforms Tag Row */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/80">
                <span className="text-white/50 font-medium">Platforms Owned:</span>
                {exp.platforms.map((plat) => (
                  <span
                    key={plat}
                    className="glass-pill px-2.5 py-0.5 rounded-lg text-xs font-mono text-white/80 border border-white/15"
                  >
                    {plat}
                  </span>
                ))}
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {exp.summary}
              </p>

              {/* Bullet Achievements */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">
                  Key Accomplishments & Impact:
                </h4>
                {exp.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/[0.06] text-white/70 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>

      {/* Education & Certifications Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Education Glass Box */}
        <GlassCard padding="medium" className="space-y-4 rounded-3xl border border-white/12">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <GraduationCap className="w-5 h-5 text-white/80" />
            <h3 className="text-lg font-bold text-white">Education</h3>
          </div>

          {EDUCATION.map((edu, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
              <p className="text-xs font-medium text-white/80">{edu.institution} — {edu.location}</p>
              <p className="text-xs text-white/50">{edu.period}</p>
            </div>
          ))}
        </GlassCard>

        {/* Certifications Glass Box */}
        <GlassCard padding="medium" className="space-y-4 rounded-3xl border border-white/12">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Award className="w-5 h-5 text-white/80" />
            <h3 className="text-lg font-bold text-white">Certifications & Training</h3>
          </div>

          <div className="space-y-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-white/5 last:border-none">
                <div>
                  <h4 className="font-bold text-white">{cert.title}</h4>
                  <p className="text-[11px] text-white/60">{cert.provider}</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-medium text-white/80 border border-white/15">
                    {cert.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
