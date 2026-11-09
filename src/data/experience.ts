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
  headline: 'Building, collaborating, and delivering.',
  subheadline: 'A chronological overview of production engineering roles, software internships, and technical initiatives.',
  items: [
    {
      id: 'inpartner-optima-integra',
      role: 'Software Engineer / Web Developer Intern',
      company: 'PT Inpartner Optima Integra',
      period: 'September 2026 — Present',
      location: 'Jakarta, Indonesia',
      type: 'Internship',
      responsibilities: [
        'Develop and maintain high-performance web applications serving production client workloads.',
        'Improve technical website performance, Core Web Vitals, and organic search indexing (SEO).',
        'Contribute to Generative Engine Optimization (GEO) strategies to improve brand authority in AI-driven answer engines.',
        'Integrate and fine-tune AI-powered chatbot conversational interfaces with contextual fallback mechanisms.',
        'Collaborate closely with senior software engineers on code reviews, continuous integration, and production systems.'
      ],
      techStack: ['React', 'Next.js', 'TypeScript', 'AI APIs', 'Performance Tuning', 'SEO/GEO']
    },
    {
      id: 'walhi-jawa-barat',
      role: 'Full Stack Web Developer Intern',
      company: 'WALHI Jawa Barat',
      period: '2026',
      location: 'Bandung, Indonesia',
      type: 'Internship',
      responsibilities: [
        'Architected sustainable Laravel and MySQL web infrastructure for advocacy reports and publications.',
        'Led comprehensive UI/UX redesign implementation with responsive design and improved editorial hierarchy.',
        'Diagnosed and resolved critical web server deployment issues on production Linux VPS environments.',
        'Implemented Docker containerization for uniform local staging and reliable zero-downtime server deployments.'
      ],
      techStack: ['Laravel', 'PHP', 'MySQL', 'Docker', 'Linux VPS', 'Nginx', 'UI/UX']
    },
    {
      id: 'pc-fatayat-nu-sukabumi',
      role: 'Project Manager & UI/UX Designer',
      company: 'PC Fatayat NU Kabupaten Sukabumi',
      period: '2026',
      location: 'Sukabumi, Indonesia',
      type: 'Leadership & Engineering',
      responsibilities: [
        'Led end-to-end technical development and sprint planning of a centralized organizational management platform.',
        'Designed modular full-stack system architecture integrating React.js frontend with robust Laravel backend services.',
        'Engineered secure RESTful APIs and optimized normalized SQL database schemas for multi-tiered regional members.',
        'Facilitated stakeholder feedback sessions across 47 district branches to validate operational workflows.'
      ],
      techStack: ['React.js', 'Laravel', 'RESTful API', 'MySQL', 'Figma', 'System Architecture']
    },
    {
      id: 'freelance-software-engineer',
      role: 'Web & Mobile Developer',
      company: 'Freelance Practice',
      period: '2024 — Present',
      location: 'Remote',
      type: 'Independent Practice',
      responsibilities: [
        'Developed and deployed bespoke web and mobile applications tailored to client specifications and usability goals.',
        'Managed the full software development lifecycle from initial discovery and wireframing through to staging and production.',
        'Configured and maintained production cloud infrastructure, Linux servers, domain routing, and automated backups.',
        'Provided technical advisory on web performance, accessibility compliance, and progressive enhancement.'
      ],
      techStack: ['TypeScript', 'React', 'Flutter', 'Python', 'Tailwind CSS', 'Cloud Hosting']
    }
  ]
};
