export interface LeadershipRole {
  organization: string;
  role: string;
  period: string;
  scope: string;
  contributions: string[];
  tags: string[];
}

export interface LeadershipContent {
  sectionNumber: string;
  sectionTitle: string;
  headline: string;
  subheadline: string;
  roles: LeadershipRole[];
}

export const leadershipContent: LeadershipContent = {
  sectionNumber: '06',
  sectionTitle: 'LEADERSHIP',
  headline: 'Service, community, and strategy.',
  subheadline: 'Fostering collaborative growth, institutional communication, and student technical advocacy.',
  roles: [
    {
      organization: 'CSSMoRA Nasional & UIN Sunan Gunung Djati',
      role: 'Head of Strategy, Branding & Communication',
      period: '2025 — Present',
      scope: 'National & Regional Student Community',
      contributions: [
        'Formulate and execute comprehensive institutional communication strategies across national scholarship community tiers.',
        'Direct digital branding initiatives, editorial publishing standards, and public relations campaigns.',
        'Oversee community digital infrastructure to ensure seamless dissemination of academic and career opportunities.',
        'Mentor cross-functional media and content teams in modern collaborative workflows and digital storytelling.'
      ],
      tags: ['Strategic Communication', 'Brand Strategy', 'Digital Infrastructure', 'Community Leadership']
    },
    {
      organization: 'Informatics Engineering Student Association',
      role: 'Head of Strategic Studies & Advocacy Division',
      period: '2025 — 2026',
      scope: 'Department of Informatics Engineering, UIN SGD Bandung',
      contributions: [
        'Led student academic advocacy and institutional liaison between faculty leadership and engineering student cohorts.',
        'Facilitated academic discussion forums, curriculum feedback collection, and departmental policy reviews.',
        'Organized technical peer study groups and knowledge-sharing workshops on modern software development practices.',
        'Advocated for equitable laboratory access, computing facilities, and transparent academic grading guidelines.'
      ],
      tags: ['Student Advocacy', 'Academic Governance', 'Technical Workshops', 'Cross-Team Collaboration']
    }
  ]
};
