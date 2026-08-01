import { Project, WorkExperience, SkillCategory, Education, Certification, StatItem } from '../types';

import septianAvatarImport from '../assets/images/profilePhoto.png';
import momotorImageImport from '../assets/images/momotor.png';
import momobilImageImport from '../assets/images/momobil.png';
import taksasiImageImport from '../assets/images/digital-taksasi.png';
import financingImageImport from '../assets/images/financing_simulator_1785298777154.jpg';

const getImgSrc = (img: any): string => (typeof img === 'string' ? img : img?.src || String(img));

const septianAvatar = getImgSrc(septianAvatarImport);
const momotorImage = getImgSrc(momotorImageImport);
const momobilImage = getImgSrc(momobilImageImport);
const taksasiImage = getImgSrc(taksasiImageImport);
// const financingImage = getImgSrc(financingImageImport);

export const PERSONAL_INFO = {
  name: 'Septian Feldy Leonard Mottoh',
  preferredName: 'Septian Mottoh',
  title: 'Full-Stack Developer',
  tagline: 'Building and scaling consumer-facing vehicle marketplace platforms in Indonesia. Passionate about performant, mobile-optimized code that works for every user — including those on low-end devices in emerging markets.',
  location: 'South Jakarta, Indonesia',
  email: 'septian.mottoh.dev@gmail.com',
  phone: '082215380367',
  formattedPhone: '+62 822-1538-0367',
  waLink: 'https://wa.link/6xvaw3',
  linkedin: 'https://www.linkedin.com/in/septian-mottoh',
  github: 'https://github.com/septianmottoh',
  avatar: septianAvatar,
  bio: `Full-stack developer with hands-on experience building and scaling consumer-facing vehicle marketplace platforms in Indonesia. Contributed in a cross-functional migration from Ember.js to Next.js that cut load times by 70% and reduced bounce rate by 80%, and engineered listing and appraisal tools now collectively responsible for 103,000+ vehicle listings and 12,000+ appraisals. Passionate about writing performant, mobile-optimized code that works for every user — including those on low-end devices in emerging markets. Comfortable owning products end-to-end, from database and API design with Node.js, Express, and Sequelize to pixel-perfect, responsive interfaces with Next.js and React.`,
};

export const STATS: StatItem[] = [
  {
    value: '3+',
    label: 'Years of experience',
    description: 'Achieved by migrating momotor.id & momobil.id from Ember.js to Next.js',
    icon: 'Zap',
  },
  {
    value: '5+',
    label: 'Projects Shipped',
    description: 'Drastic user retention improvement following performance overhaul',
    icon: 'TrendingUp',
  },
  {
    value: '103K+',
    label: 'Listings Generated',
    description: 'Cars and motorcycles generated via optimized seller listing forms',
    icon: 'Car',
  },
  {
    value: '12K+',
    label: 'Appraisals Digitized',
    description: 'Vehicle inspections digitalized through the Digital Taksasi platform',
    icon: 'ClipboardCheck',
  },
  // {
  //   value: '40+',
  //   label: 'Users / Month',
  //   description: 'Real-time vehicle financing plan calculations via interactive simulator',
  //   icon: 'Calculator',
  // },
];

export const PROJECTS: Project[] = [
  {
    id: 'momotor-migration',
    title: 'momotor.id Migration & Revamp',
    subtitle: 'Full-Stack Migration And Revamp from Ember.js to Next.js Architecture',
    category: 'Full-Stack',
    featured: true,
    company: 'Adira Finance',
    role: 'Full Stack Web Developer',
    image: momotorImage,
    shortDescription: 'Contribute in a cross-functional architecture migration of Adira Finance’s flagship automotive marketplaces, boosting performance by 70% and slashing bounce rates by 80%.',
    fullDescription: 'Collaborated within an 8-member agile team (tech lead, developers, QA, product owner, scrum master) to execute a comprehensive migration of momotor.id and momobil.id from legacy Ember.js to modern Next.js. Engineered responsive component systems, optimized SSR rendering, and built a low-bandwidth compatible vehicle listing form serving 1,400+ users.',
    impactMetrics: [
      '70% Reduction in Page Load Times',
      '80% Reduction in Bounce Rate',
      '103,000+ Car & Motorcycle Listings Generated',
      '1,400+ Active Sellers Served',
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'Express', 'Sequelize', 'SQL', 'Sass', 'MUI'],
    features: [
      'Server-Side Rendering (SSR) & Static Generation for optimal SEO & cold-start performance',
      'Low-end and older device compatibility optimization for Indonesian mobile network speeds',
      'High-throughput vehicle listing submission form with multi-image compression & validation',
      'Seamless search filtering across 103,000+ vehicle inventories with debounced queries',
      'Integrated API middleware layer with Express and Sequelize SQL ORM',
    ],
    architectureNotes: 'Migrated from client-heavy single-page Ember architecture to Next.js App Directory pattern with Express API backend gateway, enabling edge-ready HTML streaming and fine-grained data caching.',
    liveUrl: 'https://momotor.id',
  },
  {
    id: 'momobil-migration',
    title: 'momobil.id Revamp',
    subtitle: 'Full-Stack Revamp And Enhanced Web Performance',
    category: 'Full-Stack',
    featured: true,
    company: 'Adira Finance',
    role: 'Full Stack Web Developer',
    image: momobilImage,
    shortDescription: "Premium car marketplace platform built with Next.js and Node.js. Full-stack development including responsive vehicle listing forms optimized for low-end devices across Indonesia's mobile-first market.",
    fullDescription: 'Collaborated within an 8-member agile team (tech lead, developers, QA, product owner, scrum master) to execute a comprehensive migration of momotor.id and momobil.id from legacy Ember.js to modern Next.js. Engineered responsive component systems, optimized SSR rendering, and built a low-bandwidth compatible vehicle listing form serving 1,400+ users.',
    impactMetrics: [
      '80% Reduction in Bounce Rate',
      '70% Reduction in Page Load Times',
      '103,000+ Car & Motorcycle Listings Generated',
      '1,400+ Active Sellers Served',
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'Express', 'Sequelize', 'SQL', 'Sass', 'MUI'],
    features: [
      'Server-Side Rendering (SSR) & Static Generation for optimal SEO & cold-start performance',
      'Low-end and older device compatibility optimization for Indonesian mobile network speeds',
      'High-throughput vehicle listing submission form with multi-image compression & validation',
      'Seamless search filtering across 103,000+ vehicle inventories with debounced queries',
      'Integrated API middleware layer with Express and Sequelize SQL ORM',
    ],
    architectureNotes: 'Migrated from client-heavy single-page Ember architecture to Next.js App Directory pattern with Express API backend gateway, enabling edge-ready HTML streaming and fine-grained data caching.',
    liveUrl: 'https://momobil.id',
  },
  {
    id: 'digital-taksasi',
    title: 'Digital Taksasi',
    subtitle: 'End-to-End Vehicle Inspection & Pricing Appraisal Platform',
    category: 'Tools & Systems',
    featured: true,
    company: 'Adira Finance',
    role: 'Full Stack Web Developer',
    image: taksasiImage,
    shortDescription: 'Internal digital appraisal platform that eliminated paper workflows and digitalized inspection pricing for 12,000+ vehicles across Adira Finance operations.',
    fullDescription: 'Digital Taksasi is an internal enterprise tool designed for field inspectors and operations teams. It provides a standardized digital checklist for vehicle condition assessment, engine diagnostics, body damage evaluation, and real-time algorithmic market price estimation.',
    impactMetrics: [
      '12,000+ Vehicle Appraisals Processed',
      '100% Elimination of Manual Paper Inspection Workflows',
      'Instant Real-Time Market Valuation Generation',
    ],
    techStack: ['Next.js', 'Node.js', 'Express', 'SQL', 'MUI'],
    features: [
      'Step-by-step multi-point inspection workflow for field inspectors',
      'Algorithmic valuation engine factoring in mileage, year, grade, and market trends',
      'Photo attachment upload with automatic watermarking and cloud storage integration',
      'Role-based access control (RBAC) for field inspectors, regional supervisors, and auditors',
      'PDF inspection report generation and automated sync to central database',
    ],
    architectureNotes: 'Built with Node.js and Express REST endpoints, leveraging transactional SQL queries via Sequelize to guarantee appraisal audit logs and strict data consistency.',
  },
  // {
  //   id: 'vehicle-financing-simulator',
  //   title: 'Interactive Vehicle Financing Simulator',
  //   subtitle: 'Real-Time Installment Plan & Credit Calculator Engine',
  //   category: 'Next.js & Frontend',
  //   featured: false,
  //   company: 'Adira Finance',
  //   role: 'Full Stack Web Developer',
  //   image: financingImage,
  //   shortDescription: 'Calculates real-time monthly vehicle installment estimations, reducing purchase decision friction for over 40+ users monthly.',
  //   fullDescription: 'Engineered an interactive credit financing simulator embedded directly inside vehicle detail pages on momotor.id and momobil.id. Users can adjust down payment percentages, tenure options (12-60 months), insurance add-ons, and interest rates to get accurate monthly installment projections instantaneously.',
  //   impactMetrics: [
  //     '40+ Active Users Calculated Monthly',
  //     'Reduced Purchase Decision Friction',
  //     'Instant Calculation Response Time (< 50ms)',
  //   ],
  //   techStack: ['React', 'Next.js', 'JavaScript', 'Sass', 'Express', 'Node.js'],
  //   features: [
  //     'Interactive sliders for vehicle price, down payment (DP), and tenor duration',
  //     'Dynamic interest rate calculations based on user location and vehicle category',
  //     'Detailed financial breakdown including principal, interest, admin fees, and insurance',
  //     'One-click "Apply for Financing" integration pre-populating user choices into credit forms',
  //   ],
  //   architectureNotes: 'Client-side mathematical formula engine with server-side validation API for active loan interest rate tables.',
  // },
  // {
  //   id: 'adiraku-mobile-campaigns',
  //   title: 'Trade-in & Jual Cepat Campaigns',
  //   subtitle: 'React Native Mobile Landing Pages on Adiraku Super-App',
  //   category: 'Mobile',
  //   featured: false,
  //   company: 'Adira Finance',
  //   role: 'Mobile Developer (React Native)',
  //   image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  //   shortDescription: 'Developed native mobile campaign landing pages for Trade-in and Fast Selling ("Jual Cepat") inside the Adiraku mobile ecosystem.',
  //   fullDescription: 'Extended the vehicle marketplace experience onto mobile platforms by developing React Native campaign flows embedded in Adira Finance’s primary consumer mobile app, Adiraku. Enabled users to quickly list their current vehicle for trade-in or instant sale directly from their mobile devices.',
  //   impactMetrics: [
  //     'Cross-Platform Reach Expansion to Mobile Native Users',
  //     'Seamless Deep-Linking with Adiraku Ecosystem',
  //   ],
  //   techStack: ['React Native', 'JavaScript', 'Android Studio', 'Redux', 'REST API'],
  //   features: [
  //     'Native mobile UI with smooth gesture-driven image pickers and vehicle selector modals',
  //     'Deep linking support for targeted marketing push notifications',
  //     'Offline draft support for incomplete trade-in requests',
  //   ],
  // },
  // {
  //   id: 'mern-ecommerce-mobile',
  //   title: 'MERN Stack E-Commerce Mobile App',
  //   subtitle: 'Full-Featured Mobile E-Commerce Ecosystem',
  //   category: 'Mobile',
  //   featured: false,
  //   company: 'Certification Project',
  //   role: 'Full Stack Mobile Developer',
  //   image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80',
  //   shortDescription: 'Comprehensive mobile e-commerce platform built with React Native, Node.js, Express, MongoDB, and Redux state management.',
  //   fullDescription: 'Engineered a mobile shopping app featuring authentication, product catalog browsing, cart management, checkout processing, order tracking, and admin management dashboard.',
  //   impactMetrics: ['Udemy Certified Specialist Project - 2023'],
  //   techStack: ['React Native', 'Node.js', 'Express', 'MongoDB', 'Redux'],
  //   features: [
  //     'User authentication with JWT token persistence',
  //     'Product categorization, filter, and instant search',
  //     'Cart management with real-time price calculation',
  //     'Order history and push status updates',
  //   ],
  // },
  // {
  //   id: 'nextjs-testing-suite',
  //   title: 'Next.js Automated Testing Suite',
  //   subtitle: 'Unit, Integration & E2E Test Suite with Jest & Cypress',
  //   category: 'Tools & Systems',
  //   featured: false,
  //   company: 'Certification Project',
  //   role: 'Test Automation Engineer',
  //   image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  //   shortDescription: 'Automated test suite covering Next.js applications using Jest, React Testing Library, and Cypress for robust web software quality assurance.',
  //   fullDescription: 'Implemented unit testing for complex React hooks, component integration testing with React Testing Library, and end-to-end user flow testing with Cypress to prevent regression bugs.',
  //   impactMetrics: ['Udemy Certified Specialist Project - 2024'],
  //   techStack: ['Next.js', 'Jest', 'React Testing Library', 'Cypress', 'TypeScript'],
  //   features: [
  //     'Mocking API requests with MSW (Mock Service Worker)',
  //     'Snapshot and component accessibility (axe) testing',
  //     'E2E user journey automation across mobile and desktop viewports',
  //   ],
  // },
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'adira-finance',
    company: 'Adira Finance',
    role: 'Full Stack Web Developer | momotor.id & momobil.id',
    period: 'Sept 2022 - Present',
    location: 'South Jakarta, Indonesia',
    platforms: ['momotor.id', 'momobil.id', 'Adiraku Mobile App'],
    summary: 'Full-stack developer responsible for Adira Finance’s consumer vehicle marketplaces, leading core architecture migrations, performance optimization, appraisal systems, and cross-platform mobile initiatives.',
    achievements: [
      'Collaborated on migration and revamps of both platforms from Ember.js to Next.js within an 8-member agile team (tech lead, developers, QA, product owner, scrum master), delivering 70% faster load times and an 80% reduction in bounce rate.',
      'Built and performance-optimized a vehicle listing form serving 1,400+ Indonesian users, generating 103,000+ car and motorcycle listings; engineered low-end and older device compatibility to maximize reach across Indonesia’s mobile-first market.',
      'Built Digital Taksasi, an internal end-to-end vehicle inspection and market pricing platform that digitalized appraisals for 12,000+ vehicles, eliminating manual workflows for the operations team.',
      'Owned full-stack development and maintenance of two responsive vehicle marketplace platforms (momotor.id & momobil.id) using Next.js, Node.js, Express, and Sequelize.',
      'Built an interactive vehicle financing simulator used by 40+ users/month, enabling real-time installment plan estimation and reducing decision friction in the vehicle purchase journey.',
      'Developed Trade-in and Jual Cepat campaign landing pages in React Native on the Adiraku mobile app, extending the vehicle selling experience to mobile and expanding cross-platform reach.',
    ],
    techStack: ['Next.js', 'React', 'React Native', 'Node.js', 'Express', 'Sequelize', 'SQL', 'Sass', 'MUI', 'Jest', 'EmberJs'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core Programming & Web',
    iconName: 'Code2',
    skills: [
      { name: 'JavaScript (ES6+)', level: 'Expert', highlight: true },
      { name: 'TypeScript', level: 'Beginner'},
      { name: 'Next.js', level: 'Advanced', highlight: true },
      { name: 'React.js', level: 'Advanced', highlight: true },
      { name: 'HTML5 / CSS3', level: 'Expert' },
      { name: 'Sass / SCSS', level: 'Advanced' },
      { name: 'Material UI (MUI)', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Beginner' },
      { name: 'Ember.js', level: 'Intermediate' },
    ],
  },
  {
    title: 'Backend & Database Architecture',
    iconName: 'Database',
    skills: [
      { name: 'Node.js', level: 'Advanced', highlight: true },
      { name: 'Express.js', level: 'Advanced', highlight: true },
      { name: 'Sequelize ORM', level: 'Intermediate', highlight: true },
      { name: 'SQL', level: 'Advanced', highlight: true },
      { name: 'RESTful API', level: 'Advanced' },
      { name: 'Database Optimization', level: 'Intermediate' },
      { name: 'Sequel Pro', level: 'Advanced' },
    ],
  },
  {
    title: 'Mobile & Testing',
    iconName: 'Smartphone',
    skills: [
      { name: 'React Native', level: 'Intermediate', highlight: true },
      { name: 'Android Studio', level: 'Intermediate' },
      { name: 'Jest', level: 'Intermediate', highlight: true },
    ],
  },
  {
    title: 'Tools, DevOps & Agile Workflows',
    iconName: 'Wrench',
    skills: [
      { name: 'Git / GitHub / Bitbucket', level: 'Advanced', highlight: true },
      { name: 'VS Code', level: 'Advanced' },
      { name: 'Postman', level: 'Advanced' },
      { name: 'Jira / Confluence', level: 'Advanced' },
      { name: 'Agile / Scrum Methodology', level: 'Advanced', highlight: true },
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor of Information Technology (Computer Science)',
    institution: 'Klabat University',
    location: 'Airmadidi, Indonesia',
    period: '2016 - 2020',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Testing Next.js Apps with Jest, Testing Library and Cypress',
    provider: 'Udemy',
    year: '2024',
    badge: 'Next.js Testing',
  },
  {
    title: 'React Native Made Easy',
    provider: 'Udemy',
    year: '2024',
    badge: 'Mobile Native',
  },
  {
    title: 'MERN Stack E-Commerce Mobile App with React Native',
    provider: 'Udemy',
    year: '2023',
    badge: 'Full-Stack Mobile',
  },
];
