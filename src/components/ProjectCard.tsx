'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { ExternalLink, BarChart3, Building2 } from 'lucide-react';
import { Project } from '../types';
import { GlassCard } from './GlassCard';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, onSelect }) => {
  return (
    <GlassCard
      onClick={() => onSelect(project)}
      padding="medium"
      className="flex flex-col justify-between h-full group cursor-pointer border border-white/12 hover:border-white/25"
    >
      <div className="space-y-4">
        {/* Card Thumbnail Image */}
        <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-fit object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181a] via-transparent to-transparent opacity-85" />

          {/* Top Badges */}
          {/* <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="glass-pill px-2.5 py-1 rounded-full text-[11px] font-medium text-white/80 border border-white/15">
              {project.category}
            </span>
            {project.featured && (
              <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-white/10 border border-white/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-white/80" />
                Featured
              </span>
            )}
          </div> */}

          {/* Company Tag */}
          {project.company && (
            <div className="absolute bottom-3 left-3 text-[11px] font-medium text-white/90 glass-pill bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/15 flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-white/60" />
              <span>{project.company}</span>
            </div>
          )}
        </div>

        {/* Title & Short Description */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-between">
            <span>{project.title}</span>
            {/* <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" /> */}
          </h3>
          <p className="text-xs font-medium text-white/50">{project.subtitle}</p>
          <p className="text-xs text-white/70 line-clamp-2 leading-relaxed pt-1">
            {project.shortDescription}
          </p>
        </div>

        {/* Key Impact Metric Pill */}
        {project.impactMetrics && project.impactMetrics.length > 0 && (
          <div className="glass-panel p-2.5 rounded-xl border border-white/12 bg-white/[0.06] flex items-center gap-2 text-[11px] font-medium text-white/90">
            <BarChart3 className="w-3.5 h-3.5 text-white/60 shrink-0" />
            <span className="truncate">{project.impactMetrics[0]}</span>
          </div>
        )}
      </div>

      {/* Tech Stack Badges & Action Links */}
      <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/[0.06] text-white/70 border border-white/10"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] text-white/40 border border-white/10">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          {/* <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="text-white/90 font-semibold group-hover:text-white flex items-center gap-1 cursor-pointer hover:underline"
          >
            <span>View Case Study & Details</span>
          </button> */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Open Live Website"
              className="flex gap-2 p-1.5 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono font-medium rounded-md text-white/70">
                Live Demo
              </span>
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
});

