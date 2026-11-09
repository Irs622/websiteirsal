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
  headline: 'Engineering grounded in systems architecture, accessibility, and empirical research.',
  narrative: [
    "I am an Informatics Engineering student at UIN Sunan Gunung Djati Bandung and an LPDP Scholarship Awardee from the Ministry of Religious Affairs Indonesia. My engineering work focuses on full-stack web architectures, native mobile platforms, and assistive technologies that remove usability barriers for individuals with visual impairments.",
    "At PT Inpartner Optima Integra, I develop and maintain production web applications, addressing Core Web Vitals, organic search indexing, and AI conversational interfaces. Previously at WALHI Jawa Barat, I engineered Laravel web infrastructure and containerized staging environments for regional environmental advocacy publications.",
    "My engineering philosophy favors deterministic systems, clean data models, and strict accessibility standards over superficial visual ornament. I pair hands-on software development with academic inquiry—currently investigating Web Application Firewall detection efficacy and authoring peer-reviewed research on browser-based educational interfaces."
  ],
  snapshot: [
    {
      label: 'Academic Base',
      value: 'Informatics Engineering',
      detail: 'UIN Sunan Gunung Djati Bandung (Class of 2027 • GPA 3.30)'
    },
    {
      label: 'Fellowship',
      value: 'LPDP Scholar',
      detail: 'Ministry of Religious Affairs Indonesia'
    },
    {
      label: 'Current Engagement',
      value: 'Software Engineer Intern',
      detail: 'PT Inpartner Optima Integra (Jakarta / Hybrid)'
    },
    {
      label: 'Engineering Practice',
      value: 'Full-Stack, Mobile & a11y',
      detail: 'Bandung, Indonesia (UTC+7)'
    }
  ],
  coreInterests: [
    'Accessible Computing (WCAG 2.2 AAA)',
    'Full-Stack Web Architecture',
    'Native Android & Kotlin',
    'Web Application Security & Firewalls',
    'Applied Artificial Intelligence',
    'Containerization & Linux Systems'
  ]
};
