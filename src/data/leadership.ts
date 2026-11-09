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
  sectionNumber: '07',
  sectionTitle: 'LEADERSHIP',
  headline: 'Institutional leadership and student advocacy.',
  subheadline: 'Directing digital communications, public engagement, and student technical governance across regional and national student bodies.',
  roles: [
    {
      organization: 'CSSMoRA Nasional & UIN Sunan Gunung Djati',
      role: 'Head of Strategy, Branding & Communication',
      period: '2025 — Present',
      scope: 'National & Regional LPDP Scholarship Community',
      contributions: [
        'Formulate and execute comprehensive institutional communication strategies across national scholarship community tiers.',
        'Direct digital publishing standards, public relations announcements, and official informational releases.',
        'Oversee community digital infrastructure to ensure reliable dissemination of academic and career opportunities.',
        'Coordinate multidisciplinary media teams across editorial writing, graphics, and community outreach.'
      ],
      tags: ['Strategic Communication', 'Digital Infrastructure', 'Institutional Governance']
    },
    {
      organization: 'Informatics Engineering Student Association',
      role: 'Head of Strategic Studies & Advocacy Division',
      period: '2025 — 2026',
      scope: 'Department of Informatics Engineering, UIN SGD Bandung',
      contributions: [
        'Served as institutional liaison between department faculty leadership and undergraduate engineering cohorts.',
        'Facilitated student curriculum feedback collection, academic forums, and departmental policy reviews.',
        'Organized technical peer study groups and workshop sessions covering modern software development practices.',
        'Advocated for computing laboratory equipment accessibility and transparent academic evaluation standards.'
      ],
      tags: ['Student Advocacy', 'Academic Liaison', 'Technical Workshops']
    }
  ]
};
