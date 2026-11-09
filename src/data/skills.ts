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
  headline: 'Where engineering meets ideas.',
  subheadline: 'Organized across core software systems, interface craftsmanship, applied intelligence, and reliable infrastructure.',
  categories: [
    {
      id: 'software-engineering',
      name: 'Software Engineering',
      tagline: 'System logic, object-oriented design, algorithms, and relational data modeling.',
      skills: ['Kotlin', 'Python', 'PHP', 'JavaScript', 'SQL']
    },
    {
      id: 'web-mobile',
      name: 'Web & Mobile',
      tagline: 'Modern reactive component architectures, progressive web applications, and native mobile runtimes.',
      skills: ['React.js', 'Next.js', 'Laravel', 'Flutter', 'Android SDK']
    },
    {
      id: 'artificial-intelligence',
      name: 'Artificial Intelligence',
      tagline: 'Applied ML model pipelines, generative LLM integrations, conversational agents, and evaluation workflows.',
      skills: ['Machine Learning', 'AI Integration', 'Prompt Engineering', 'OpenAI API', 'Hugging Face']
    },
    {
      id: 'cloud-infrastructure',
      name: 'Cloud & Infrastructure',
      tagline: 'Containerized deployment pipelines, Linux server administration, automation, and continuous delivery.',
      skills: ['Docker', 'CI/CD', 'Linux', 'Cloud Infrastructure', 'Automated Testing']
    },
    {
      id: 'product-design',
      name: 'Product & Design',
      tagline: 'Design systems, WCAG 2.2 accessibility compliance, iterative prototyping, and cross-functional leadership.',
      skills: ['Figma', 'UI/UX Design', 'Product Development', 'Accessibility', 'Agile', 'Project Management']
    }
  ]
};
