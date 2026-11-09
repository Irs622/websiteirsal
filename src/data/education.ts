export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
  status: string;
  gpa: string;
  scholarship: string;
  notes?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  credentialFocus: string;
}

export interface EducationContent {
  sectionNumber: string;
  sectionTitle: string;
  headline: string;
  subheadline: string;
  education: EducationItem;
  certifications: CertificationItem[];
}

export const educationContent: EducationContent = {
  sectionNumber: '06',
  sectionTitle: 'EDUCATION & CREDENTIALS',
  headline: 'Academic foundations and verified credentials.',
  subheadline: 'Formal degree program in Informatics Engineering and industry certifications spanning AI development, networking, databases, and infrastructure.',
  education: {
    institution: 'UIN Sunan Gunung Djati Bandung',
    degree: 'Bachelor of Informatics Engineering',
    field: 'Computer Science & Software Engineering',
    period: '2023 — Present',
    status: 'Expected Graduation: 2027',
    gpa: '3.30 / 4.00',
    scholarship: 'LPDP Scholarship — Ministry of Religious Affairs Indonesia',
    notes: 'Coursework and research focused on distributed systems, applied artificial intelligence, human-computer interaction, and software reliability.'
  },
  certifications: [
    {
      name: 'Claude Code in Action',
      issuer: 'Anthropic',
      year: '2026',
      credentialFocus: 'Agentic AI Workflows & Tool-Calling Integration'
    },
    {
      name: 'IBM SkillsBuild AI Foundation',
      issuer: 'IBM SkillsBuild',
      year: '2026',
      credentialFocus: 'Machine Learning Pipelines & Responsible AI'
    },
    {
      name: 'Dasar Keamanan AI',
      issuer: 'Kementerian Komunikasi dan Digital (Komdigi RI)',
      year: '2026',
      credentialFocus: 'AI Model Safety, Threat Vectors & Governance'
    },
    {
      name: 'Google Analytics (GA4) Certification',
      issuer: 'Google',
      year: '2026',
      credentialFocus: 'Digital Telemetry & User Behavioral Analytics'
    },
    {
      name: 'Cisco Certified Network Associate (CCNA)',
      issuer: 'Cisco Systems',
      year: '2025',
      credentialFocus: 'IP Routing, Switching & Network Security'
    },
    {
      name: 'Linux Essentials',
      issuer: 'Linux Professional Institute',
      year: '2025',
      credentialFocus: 'System Administration & Shell Scripting'
    },
    {
      name: 'Database SQL Certified Specialist',
      issuer: 'Oracle',
      year: '2025',
      credentialFocus: 'Relational Database Queries & Schema Optimization'
    }
  ]
};
