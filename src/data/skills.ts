export interface SkillCategory {
  id: string;
  name: string;
  tagline: string;
  skills: string[];
}

export interface ExpertiseContent {
  sectionNumber: string;
  sectionTitle: string;
  headline: string;
  subheadline: string;
  categories: SkillCategory[];
}

export const expertiseContent: ExpertiseContent = {
  sectionNumber: '02',
  sectionTitle: 'EXPERTISE',
  headline: 'Technical domains and toolchain.',
  subheadline: 'Core competencies across backend services, reactive web interfaces, native mobile runtimes, and Linux infrastructure.',
  categories: [
    {
      id: 'languages-core',
      name: 'Languages & Core Systems',
      tagline: 'Object-oriented programming, data structures, relational modeling, and algorithmic logic.',
      skills: ['Kotlin', 'Python', 'PHP', 'TypeScript', 'JavaScript', 'SQL']
    },
    {
      id: 'web-mobile',
      name: 'Web & Mobile Frameworks',
      tagline: 'Reactive component lifecycles, service workers, offline state caching, and native Android runtimes.',
      skills: ['React.js', 'Next.js', 'Laravel', 'Flutter', 'Android SDK', 'Tailwind CSS']
    },
    {
      id: 'assistive-ai',
      name: 'Assistive Tech & Applied AI',
      tagline: 'Audio-first interfaces, speech synthesis, 3D WebGL rendering, and structured LLM API integration.',
      skills: ['Web Audio API', 'Web Speech API', 'Three.js / WebGL', 'WCAG 2.2 AAA', 'OpenAI API', 'Hugging Face']
    },
    {
      id: 'infrastructure-devops',
      name: 'Infrastructure & Operations',
      tagline: 'Containerized deployments, Linux VPS administration, reverse proxies, and continuous delivery pipelines.',
      skills: ['Docker', 'Linux (Ubuntu/Debian)', 'Nginx', 'GitHub Actions', 'RESTful APIs', 'Google Play Console']
    }
  ]
};
