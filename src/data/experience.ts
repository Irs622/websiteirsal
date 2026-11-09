export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  responsibilities: string[];
  techStack?: string[];
}

export interface ExperienceContent {
  sectionNumber: string;
  sectionTitle: string;
  headline: string;
  subheadline: string;
  items: ExperienceItem[];
}

export const experienceContent: ExperienceContent = {
  sectionNumber: '03',
  sectionTitle: 'EXPERIENCE',
  headline: 'Work history and engineering roles.',
  subheadline: 'A chronological record of software engineering internships, system leadership, and production client deliveries.',
  items: [
    {
      id: 'inpartner-optima-integra',
      role: 'Software Engineer Intern',
      company: 'PT Inpartner Optima Integra',
      period: 'September 2026 — Present',
      location: 'Jakarta, Indonesia (Hybrid)',
      type: 'Internship',
      responsibilities: [
        'Develop and maintain high-performance web applications handling production client workloads.',
        'Optimize Core Web Vitals, page rendering performance, and technical search engine indexing (SEO).',
        'Contribute to Generative Engine Optimization (GEO) strategies to improve brand citation in AI search engines.',
        'Integrate AI-driven conversational interfaces with contextual fallback and prompt guardrails.',
        'Participate in team code reviews, CI/CD pipeline automation, and production staging deployments.'
      ],
      techStack: ['React', 'Next.js', 'TypeScript', 'AI APIs', 'Performance Tuning', 'SEO / GEO']
    },
    {
      id: 'walhi-jawa-barat',
      role: 'Full Stack Web Developer Intern',
      company: 'WALHI Jawa Barat',
      period: '2026',
      location: 'Bandung, Indonesia',
      type: 'Internship',
      responsibilities: [
        'Architected sustainable Laravel and MySQL web infrastructure for environmental advocacy reports and publications.',
        'Implemented a responsive, accessible interface with improved typographic hierarchy and document reading layout.',
        'Diagnosed and resolved critical web server deployment issues on production Linux VPS environments.',
        'Implemented Docker containerization for local development parity and reliable zero-downtime server deployments.'
      ],
      techStack: ['Laravel', 'PHP', 'MySQL', 'Docker', 'Linux VPS', 'Nginx']
    },
    {
      id: 'pc-fatayat-nu-sukabumi',
      role: 'Technical Lead & System Architect',
      company: 'PC Fatayat NU Kabupaten Sukabumi',
      period: '2026',
      location: 'Sukabumi, Indonesia',
      type: 'Technical Leadership',
      responsibilities: [
        'Led end-to-end technical development and architecture planning for a centralized organizational membership platform.',
        'Designed modular full-stack architecture coupling a React administrative dashboard with Laravel REST services.',
        'Engineered secure RESTful APIs with token authentication and normalized SQL schemas for 47 district branches.',
        'Facilitated stakeholder requirements gathering and user testing sessions with regional administrative coordinators.'
      ],
      techStack: ['React.js', 'Laravel', 'RESTful API', 'MySQL', 'Figma', 'System Architecture']
    },
    {
      id: 'freelance-software-engineer',
      role: 'Independent Web & Mobile Developer',
      company: 'Freelance Practice',
      period: '2024 — Present',
      location: 'Remote',
      type: 'Independent Practice',
      responsibilities: [
        'Developed and deployed bespoke web and mobile applications tailored to client specifications and usability goals.',
        'Managed the complete software development lifecycle from architecture and schema design to production launch.',
        'Configured cloud infrastructure, Linux servers, DNS routing, and automated database backup routines.',
        'Provided technical guidance on web performance, accessibility compliance, and progressive enhancement.'
      ],
      techStack: ['TypeScript', 'React', 'Flutter', 'Python', 'Tailwind CSS', 'Cloud Infrastructure']
    }
  ]
};
