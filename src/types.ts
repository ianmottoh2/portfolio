export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Next.js & Frontend' | 'Mobile' | 'Tools & Systems';
  featured: boolean;
  image: string;
  shortDescription: string;
  fullDescription: string;
  impactMetrics: string[];
  techStack: string[];
  features: string[];
  architectureNotes?: string;
  liveUrl?: string;
  githubUrl?: string;
  company?: string;
  role?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  platforms: string[];
  summary: string;
  achievements: string[];
  techStack: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level?: string; highlight?: boolean }[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface Certification {
  title: string;
  provider: string;
  year: string;
  badge?: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
  description: string;
  icon: string;
}

export type ActiveTab = 'home' | 'portfolio' | 'about' | 'impact' | 'contact';
