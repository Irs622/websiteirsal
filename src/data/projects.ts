export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  category: 'Accessible Tech' | 'AI & Web' | 'Full-Stack Systems' | 'Mobile & Native' | 'Applied Research';
  summary: string;
  problem: string;
  solution: string;
  technicalContribution: string[];
  techStack: string[];
  achievement?: string;
  githubUrl?: string;
  liveUrl?: string;
  accentOrb: 'mint' | 'peach' | 'lavender' | 'sky' | 'rose';
}

export interface ProjectsContent {
  sectionNumber: string;
  sectionTitle: string;
  headline: string;
  subheadline: string;
  projects: ProjectItem[];
}

export const projectsContent: ProjectsContent = {
  sectionNumber: '04',
  sectionTitle: 'SELECTED WORK',
  headline: "Some things I've built.",
  subheadline: 'Selected engineering projects spanning accessible technology, intelligent interfaces, distributed web architecture, and native systems.',
  projects: [
    {
      id: 'dengarbain',
      slug: 'dengarbain',
      title: 'DengarBain',
      subtitle: 'Accessible Hadith Learning Progressive Web App',
      year: '2026',
      role: 'Web Developer & UI/UX Designer',
      category: 'Accessible Tech',
      summary: "An accessible Progressive Web App engineered for Hadith Arba'in study, featuring audio-first navigation, high-contrast typography, and full screen-reader compatibility.",
      problem: 'Classical religious learning materials are predominantly formatted in visual print or dense digital PDFs that present significant usability barriers to visually impaired users and elderly readers.',
      solution: 'Architected an audio-first Progressive Web App with tactile keyboard navigability, clear ARIA labeling, synchronized narration playback, and offline caching via Service Workers.',
      technicalContribution: [
        'Engineered responsive audio playback state synchronization using the HTML5 Audio & Web Audio API.',
        'Designed high-contrast, WCAG 2.2 AAA compliant typography hierarchy with fluid font scaling.',
        'Configured Service Worker cache strategies for offline audio playback on low-bandwidth networks.',
        'Conducted user accessibility testing with screen-reader emulators (NVDA and TalkBack).'
      ],
      techStack: ['React.js', 'TypeScript', 'Web Audio API', 'Tailwind CSS', 'PWA / Service Workers'],
      githubUrl: 'https://github.com/irs622',
      accentOrb: 'mint'
    },
    {
      id: 'ar-hijaiyah',
      slug: 'ar-hijaiyah',
      title: 'AR Hijaiyah',
      subtitle: 'Voice-Guided Augmented Reality Literacy App',
      year: '2026',
      role: 'Full Stack Developer & UI/UX Designer',
      category: 'AI & Web',
      summary: 'An interactive web application combining augmented reality 3D geometry with real-time voice guidance for intuitive early-stage Hijaiyah letter recognition.',
      achievement: 'Related research accepted for publication in Artificial: Jurnal Informatika dan Sistem Informasi (2026).',
      problem: 'Conventional alphabet flashcards lack tactile spatial feedback and cannot validate speech pronunciation during independent study.',
      solution: 'Constructed a WebGL and Three.js 3D character pipeline coupled with browser-based speech recognition to provide immediate multi-sensory pronunciation feedback.',
      technicalContribution: [
        'Rendered low-poly 3D Arabic typographic models optimized for smooth 60 FPS mobile WebGL rendering.',
        'Implemented Web Speech API speech-to-intent analysis for automated pronunciation validation.',
        'Designed spatial interaction patterns and intuitive touch gesture controls for young learners.',
        'Co-authored research paper detailing latency and engagement metrics, accepted in Artificial: JISI.'
      ],
      techStack: ['Three.js', 'WebGL', 'Web Speech API', 'React.js', 'Node.js'],
      githubUrl: 'https://github.com/irs622',
      accentOrb: 'lavender'
    },
    {
      id: 'fatayat-nu-management',
      slug: 'fatayat-nu-management',
      title: 'Fatayat NU Management System',
      subtitle: 'Centralized Multi-Tier Organizational Platform',
      year: '2026',
      role: 'Project Manager & System Designer',
      category: 'Full-Stack Systems',
      summary: 'A centralized organizational membership and administrative management platform designed to unify records and reporting across 47 district branches.',
      problem: 'Administrative personnel struggled with fragmented offline spreadsheets, uncoordinated membership verification, and slow reporting cycles across regional branches.',
      solution: 'Engineered a scalable full-stack web portal featuring role-based access control, normalized relational database schemas, batch CSV member imports, and automated verification workflows.',
      technicalContribution: [
        'Architected relational database schema in MySQL supporting hierarchical regional organizational tiers.',
        'Designed RESTful API endpoints in Laravel with token authentication and rigorous validation layers.',
        'Built modern React.js administrative dashboard with responsive tables, query filters, and data export.',
        'Spearheaded user research and managed the technical implementation sprints with developer peers.'
      ],
      techStack: ['React.js', 'Laravel', 'RESTful API', 'MySQL', 'Tailwind CSS', 'Figma'],
      accentOrb: 'peach'
    },
    {
      id: 'hadith-arbain-mobile',
      slug: 'hadith-arbain-mobile',
      title: "Hadith Arba'in Mobile App",
      subtitle: 'Native Android Audio-First Educational Application',
      year: '2025',
      role: 'Product Lead & Developer',
      category: 'Mobile & Native',
      summary: 'A native Android application utilizing Text-to-Speech synthesis and tactile audio navigation for seamless, hands-free study.',
      problem: 'Mobile users in transit or with partial vision impairments need reliable audio reading without relying on high-bandwidth video streams.',
      solution: 'Developed a lightweight native Kotlin Android application with integrated Android Text-to-Speech (TTS) engine, granular rate controls, and local SQLite caching.',
      technicalContribution: [
        'Integrated Android TTS engine with multi-lingual voice package switching (Arabic and Indonesian).',
        'Implemented SQLite database schema via Room ORM for instant offline queries and bookmark persistence.',
        'Applied Android Material 3 design guidelines with accessible touch targets and dark/light adaptive theme.',
        'Optimized background audio playback service to maintain playback across Android app lifecycle changes.'
      ],
      techStack: ['Kotlin', 'Android SDK', 'Text-to-Speech (TTS)', 'Room SQLite', 'Material 3'],
      githubUrl: 'https://github.com/irs622',
      accentOrb: 'sky'
    },
    {
      id: 'bahara',
      slug: 'bahara',
      title: 'BAHARA',
      subtitle: 'Voice-Guided Arabic Learning Mobile Platform',
      year: '2025',
      role: 'Product Lead & Developer',
      category: 'Mobile & Native',
      summary: 'A cross-platform mobile application providing step-by-step Arabic vocal training with intelligent voice input evaluation.',
      problem: 'Acquiring Arabic phonetics requires iterative vocal repetition and immediate feedback, which traditional self-study books cannot deliver.',
      solution: 'Designed an interactive mobile curriculum in Flutter incorporating voice recognition modules that match learner spoken input against phonetic benchmarks.',
      technicalContribution: [
        'Built interactive Flutter mobile screens with fluid state management and minimal render overhead.',
        'Connected audio recording streams with speech recognition APIs for vocal pattern verification.',
        'Structured modular lesson milestones with progress tracking and gamified retention mechanics.',
        'Conducted user testing with novice learners to refine acoustic sensitivity thresholds.'
      ],
      techStack: ['Flutter', 'Dart', 'Speech Recognition', 'RESTful APIs', 'Figma'],
      githubUrl: 'https://github.com/irs622',
      accentOrb: 'rose'
    },
    {
      id: 'kamus-cerdas-indo-sunda',
      slug: 'kamus-cerdas-indo-sunda',
      title: 'Kamus Cerdas Indo-Sunda',
      subtitle: 'Regional Lexicon API & Mobile Distribution',
      year: '2025',
      role: 'Backend Developer & DevOps Engineer',
      category: 'Full-Stack Systems',
      summary: 'High-performance bilingual dictionary backend and automated CI/CD distribution pipeline published to the Google Play Store.',
      problem: 'Regional language preservation tools frequently suffer from unmaintained APIs, slow lookup latency, and cumbersome manual deployment procedures.',
      solution: 'Architected a low-latency REST API using FastAPI and Docker, backed by automated GitHub Actions workflows for continuous testing and automated Play Store deployment.',
      technicalContribution: [
        'Designed indexing algorithm for fuzzy morphological search across Indonesian and Sundanese vocabularies.',
        'Containerized the application with Docker and configured automated Nginx reverse proxy deployment on Linux VPS.',
        'Constructed automated CI/CD pipeline using GitHub Actions for automated unit testing and artifact release.',
        'Managed Google Play Console compliance, app signing, and production release distribution.'
      ],
      techStack: ['Python', 'FastAPI', 'Docker', 'GitHub Actions', 'Linux VPS', 'Google Play Console'],
      githubUrl: 'https://github.com/irs622',
      accentOrb: 'mint'
    },
    {
      id: 'library-of-focus',
      slug: 'library-of-focus',
      title: 'Library of Focus',
      subtitle: 'Cognitive Science Interactive Training Tool',
      year: '2024',
      role: 'Independent Game Developer',
      category: 'Applied Research',
      summary: 'A maze-based cognitive experiment application presented at the Cognitive Exhibition by the Faculty of Psychology, UIN Sunan Gunung Djati Bandung.',
      problem: 'Psychology researchers required calibrated digital testing environments to measure spatial orientation, decision latencies, and focus retention under distractions.',
      solution: 'Engineered an interactive maze environment tracking user movement paths, decision timeframes, and error frequencies with real-time metric capture.',
      technicalContribution: [
        'Implemented custom canvas-based maze rendering and collision detection algorithms.',
        'Programmed deterministic timing logic to capture micro-second interaction latencies accurately.',
        'Constructed telemetry export modules allowing researchers to download structured session logs.',
        'Exhibited and demonstrated the software live to students and faculty researchers at the academic exhibition.'
      ],
      techStack: ['React Native', 'TypeScript', 'Canvas API', 'State Machine', 'Analytical Telemetry'],
      githubUrl: 'https://github.com/irs622',
      accentOrb: 'lavender'
    }
  ]
};
