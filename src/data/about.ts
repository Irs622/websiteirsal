export interface ProfessionalSnapshot {
  label: string;
  value: string;
  detail?: string;
}

export interface AboutContent {
  sectionNumber: string;
  sectionTitle: string;
  headline: string;
  narrative: string[];
  snapshot: ProfessionalSnapshot[];
  coreInterests: string[];
}

export const aboutContent: AboutContent = {
  sectionNumber: '01',
  sectionTitle: 'ABOUT',
  headline: 'Curiosity drives the things I build.',
  narrative: [
    "I am an Informatics Engineering student at UIN Sunan Gunung Djati Bandung and an awardee of the LPDP Scholarship from the Ministry of Religious Affairs Indonesia. My work centers on the intersection of solid software architecture, emerging artificial intelligence, and human-centered design.",
    "Over the past several years, I have engineered full-stack web platforms, native mobile applications, and interactive learning tools. Whether developing accessible educational software for individuals with visual impairments or deploying microservice architectures with Docker and modern CI/CD pipelines, I prioritize reliability, maintainability, and user clarity.",
    "Beyond writing code, I have coordinated multidisciplinary technical initiatives, managed cross-functional product deliveries, and advocated for student digital infrastructure. I believe engineering is at its best when it solves tangible human problems with quiet elegance, solid systems thinking, and intentional craft."
  ],
  snapshot: [
    {
      label: 'Academic Foundation',
      value: 'Informatics Engineering',
      detail: 'UIN Sunan Gunung Djati Bandung (Class of 2027)'
    },
    {
      label: 'Honors & Support',
      value: 'LPDP Scholar',
      detail: 'Ministry of Religious Affairs Indonesia'
    },
    {
      label: 'Core Focus Areas',
      value: 'Full-Stack & Mobile AI',
      detail: 'Accessible Systems & Cloud Architecture'
    },
    {
      label: 'Engineering Base',
      value: 'Bandung, Indonesia',
      detail: 'Available for remote & hybrid technical collaboration'
    }
  ],
  coreInterests: [
    'Accessibility Engineering',
    'Applied Artificial Intelligence',
    'Distributed Systems',
    'Cloud-Native Architecture',
    'Human-Computer Interaction'
  ]
};
