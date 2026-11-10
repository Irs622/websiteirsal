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
    "I am an Informatics Engineering student at UIN Sunan Gunung Djati Bandung and an LPDP Scholarship Awardee. My engineering work focuses on full-stack web architectures, native mobile platforms, and assistive technologies that remove usability barriers.",
    "Currently an intern at PT Inpartner Optima Integra, I develop production web applications, addressing Core Web Vitals and AI interfaces. My philosophy favors deterministic systems, clean data models, and strict accessibility standards over visual ornament, paired with ongoing research into browser-based educational interfaces."
  ],
  snapshot: [
    {
      label: 'Academic Base',
      value: 'Informatics Eng. (UIN 27)',
      detail: 'GPA 3.30 / 4.00'
    },
    {
      label: 'Fellowship',
      value: 'LPDP Scholar',
      detail: 'Ministry of Religious Affairs'
    },
    {
      label: 'Engagement',
      value: 'Software Engineer Intern',
      detail: 'PT Inpartner Optima Integra'
    },
    {
      label: 'Engineering',
      value: 'Full-Stack, Mobile, a11y',
      detail: 'Bandung, Indonesia (UTC+7)'
    }
  ],
  coreInterests: [
    'Accessible Computing (WCAG 2.2 AAA)',
    'Full-Stack Web Architecture',
    'Native Android & Kotlin',
    'Applied Artificial Intelligence',
    'Security & Firewalls'
  ]
};
