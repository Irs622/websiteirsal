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

/**
 * Short engineering-philosophy passages rendered as the hero "ink" layer and
 * the contact text cloud. Reflective voice, grounded in the practice described
 * in `narrative` / `brandStatement`.
 */
export const inkPassages: string[] = [
  'I build for the people a system is most likely to forget. If an interface fails a screen reader, it has failed — the rest is decoration.',
  'Deterministic over clever. A system you can reason about at 3am is worth more than one that is impressive in a demo.',
  'Clean data models first. Most interface pain is really a schema that was never allowed to be honest about the problem.',
  'Accessibility is not a feature flag. WCAG is the floor, not the ceiling, and it belongs in the first commit, not the last sprint.',
  'Measure before you optimise. Core Web Vitals, latency budgets, and real devices tell the truth that intuition will not.',
  'Research and engineering are the same habit: form a hypothesis, instrument it, and let the evidence overrule the ego.',
  'Resilience is a design choice. Offline-first caches, graceful fallbacks, and boring infrastructure are how software keeps its promises.'
];

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
