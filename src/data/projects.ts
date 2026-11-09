export interface ProjectTechnicalSpecs {
  platform: string;
  architecture: string;
  keyMechanism: string;
  verification: string;
}

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
  specs?: ProjectTechnicalSpecs;
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
  headline: 'Selected engineering projects and case studies.',
  subheadline: 'Architectural case studies across accessible computing, applied machine learning, native mobile systems, and full-stack services.',
  projects: [
    {
      id: 'dengarbain',
      slug: 'dengarbain',
      title: 'DengarBain',
      subtitle: 'Accessible Audio-First Hadith Learning Progressive Web App',
      year: '2026',
      role: 'Frontend Engineer & a11y Lead',
      category: 'Accessible Tech',
      summary: "An audio-first Progressive Web App engineered for Hadith Arba'in study, featuring dual-language synchronized audio narration, high-contrast typography, and full screen-reader compliance.",
      problem: 'Religious literature and traditional pedagogical texts are predominantly formatted in intricate typography or static PDFs that present severe usability barriers to visually impaired individuals, screen-reader users, and elderly readers.',
      solution: 'Engineered an audio-first Progressive Web App with tactile keyboard navigation, synchronized dual-language narration, high-contrast typography, and Service Worker offline caching.',
      technicalContribution: [
        'Implemented HTML5 Audio and Web Audio API playback synchronization with deterministic timecode scrubbing.',
        'Engineered WCAG 2.2 AAA compliant high-contrast color scheme, minimum 48px touch targets, and visible focus rings.',
        'Configured Cache-First Service Worker caching strategies to enable instant offline playback on constrained network connections.',
        'Conducted comprehensive accessibility audits using NVDA and TalkBack screen-reader software to ensure semantic DOM landmarks.'
      ],
      techStack: ['React.js', 'TypeScript', 'Web Audio API', 'Tailwind CSS', 'PWA / Service Workers'],
      githubUrl: 'https://github.com/irs622',
      specs: {
        platform: 'Progressive Web App (PWA)',
        architecture: 'Client-Side SPA + Service Worker Cache',
        keyMechanism: 'Web Audio API synchronization & ARIA live regions',
        verification: 'WCAG 2.2 AAA manual & screen-reader audit (NVDA / TalkBack)'
      }
    },
    {
      id: 'ar-hijaiyah',
      slug: 'ar-hijaiyah',
      title: 'AR Hijaiyah',
      subtitle: 'Voice-Guided 3D Augmented Reality Literacy Platform',
      year: '2026',
      role: 'Full-Stack Developer & Lead Researcher',
      category: 'AI & Web',
      summary: 'An interactive web application combining browser-based 3D typography with real-time speech recognition for independent early-stage phonetic literacy.',
      achievement: 'Accepted for publication in Artificial: Jurnal Informatika dan Sistem Informasi (JISI, 2026).',
      problem: 'Conventional alphabet flashcards lack tactile spatial models and cannot validate pronunciation accuracy during independent study.',
      solution: 'Constructed a browser-based WebGL/Three.js 3D character pipeline coupled with real-time Web Speech API analysis to provide immediate multi-sensory pronunciation feedback.',
      technicalContribution: [
        'Optimized low-poly 3D Arabic character meshes to sustain 60 FPS rendering on budget mobile browsers.',
        'Integrated browser Web Speech API for real-time speech-to-intent phonetic evaluation.',
        'Designed responsive touch manipulation controls for 360-degree typographic inspection.',
        'Co-authored academic paper documenting performance metrics, latency benchmarks, and pedagogical outcomes.'
      ],
      techStack: ['Three.js', 'WebGL', 'Web Speech API', 'React.js', 'Node.js'],
      githubUrl: 'https://github.com/irs622',
      specs: {
        platform: 'Mobile & Desktop Web (WebGL)',
        architecture: 'Three.js Canvas + Web Speech API + Node.js Service',
        keyMechanism: 'Phonetic confidence thresholding & low-poly glTF asset pipeline',
        verification: 'Peer-reviewed and accepted in Artificial: JISI (2026)'
      }
    },
    {
      id: 'fatayat-nu-management',
      slug: 'fatayat-nu-management',
      title: 'Fatayat NU Central Registry',
      subtitle: 'Centralized Multi-Tier Organizational Administration System',
      year: '2026',
      role: 'Technical Lead & System Architect',
      category: 'Full-Stack Systems',
      summary: 'A centralized organizational membership and administrative management platform designed to unify records, reporting, and credential issuance across 47 district branches.',
      problem: 'Regional administrative personnel relied on uncoordinated offline spreadsheets, causing data silos, delayed reporting cycles, and duplicated member records across 47 district branches.',
      solution: 'Architected a centralized web platform featuring role-based access control (RBAC), normalized relational schema, batch data processing, and automated verification workflows.',
      technicalContribution: [
        'Designed a 3NF normalized MySQL database schema supporting hierarchical regional organizational tiers.',
        'Engineered RESTful API endpoints in Laravel with Sanctum token authentication and server-side validation.',
        'Built a responsive React administrative dashboard with parameterized query filters and CSV data ingestion.',
        'Organized sprint delivery schedules and coordinated technical reviews with developer peers.'
      ],
      techStack: ['React.js', 'Laravel', 'RESTful API', 'MySQL', 'Tailwind CSS', 'Figma'],
      specs: {
        platform: 'Enterprise Web Application',
        architecture: 'Decoupled React.js SPA + Laravel RESTful API Services',
        keyMechanism: 'Role-Based Access Control (RBAC) & batch database transactions',
        verification: 'Deployed across 47 district administrative branches'
      }
    },
    {
      id: 'hadith-arbain-mobile',
      slug: 'hadith-arbain-mobile',
      title: "Hadith Arba'in Native Android",
      subtitle: 'Audio-First Educational Application with Offline SQLite Persistence',
      year: '2025',
      role: 'Mobile Application Engineer',
      category: 'Mobile & Native',
      summary: 'A native Kotlin Android application utilizing the Android Text-to-Speech synthesis engine and Room SQLite persistence for offline, hands-free study.',
      problem: 'Commuters and users with partial vision impairments need consistent audio playback without continuous cellular data usage or third-party streaming dependencies.',
      solution: 'Developed a native Kotlin Android application with an integrated Android Text-to-Speech (TTS) engine, Room SQLite offline database, and foreground audio service.',
      technicalContribution: [
        'Integrated the Android TTS engine with dynamic bilingual voice switching (Arabic text and Indonesian translation).',
        'Structured local SQLite persistence with Room ORM for zero-latency queries and bookmark state preservation.',
        'Implemented Android Material 3 design system adhering to accessible touch targets and system dark mode.',
        'Managed Android foreground audio service to prevent audio drops across operating system lifecycle transitions.'
      ],
      techStack: ['Kotlin', 'Android SDK', 'Text-to-Speech (TTS)', 'Room SQLite', 'Material 3'],
      githubUrl: 'https://github.com/irs622',
      specs: {
        platform: 'Native Android (Kotlin)',
        architecture: 'MVVM Pattern + Room ORM + Foreground Media Service',
        keyMechanism: 'Android Text-to-Speech (TTS) engine & Room SQLite cache',
        verification: 'Validated across Android API levels 24 through 34'
      }
    },
    {
      id: 'bahara',
      slug: 'bahara',
      title: 'BAHARA',
      subtitle: 'Voice-Guided Arabic Phonetics Mobile Application',
      year: '2025',
      role: 'Mobile Developer & Product Lead',
      category: 'Mobile & Native',
      summary: 'A cross-platform mobile application providing structured Arabic phonetic training with real-time speech evaluation.',
      problem: 'Acquiring Arabic phonetic precision requires iterative vocal repetition and immediate feedback, which static textbooks cannot deliver.',
      solution: 'Engineered an interactive mobile interface in Flutter with integrated speech recognition pipelines that evaluate student pronunciation against phonetic criteria.',
      technicalContribution: [
        'Built interactive Flutter mobile screens with fluid state management and low render latency.',
        'Connected real-time audio streams with speech recognition APIs for vocal pattern verification.',
        'Structured modular lesson milestones with progress tracking and retention mechanics.',
        'Conducted user testing with novice learners to calibrate acoustic sensitivity thresholds.'
      ],
      techStack: ['Flutter', 'Dart', 'Speech Recognition API', 'RESTful API', 'Figma'],
      githubUrl: 'https://github.com/irs622',
      specs: {
        platform: 'Cross-Platform Mobile (Flutter)',
        architecture: 'Flutter Client + Audio Stream Processing + Speech Evaluation Engine',
        keyMechanism: 'Real-time acoustic pattern matching & modular retention milestone tracking',
        verification: 'User evaluation study with 30+ beginner learners in Bandung'
      }
    },
    {
      id: 'kamus-cerdas-indo-sunda',
      slug: 'kamus-cerdas-indo-sunda',
      title: 'Kamus Cerdas Indo-Sunda',
      subtitle: 'Regional Lexicon REST API & Automated CI/CD Pipeline',
      year: '2025',
      role: 'Backend Engineer & DevOps',
      category: 'Full-Stack Systems',
      summary: 'High-performance bilingual regional lexicon backend and automated CI/CD distribution pipeline published to the Google Play Store.',
      problem: 'Regional language preservation tools frequently suffer from unmaintained APIs, slow lookup latency, and fragile manual server update procedures.',
      solution: 'Architected a low-latency REST API with FastAPI and Docker, backed by automated GitHub Actions CI/CD workflows and published distribution via Google Play Console.',
      technicalContribution: [
        'Implemented bi-directional morphological search indexing across Indonesian and Sundanese vocabulary sets.',
        'Containerized backend services with Docker and configured Nginx reverse proxy routing on a Linux VPS.',
        'Constructed continuous integration and automated testing workflows utilizing GitHub Actions.',
        'Administered Google Play Console release management, app signing, and compliance documentation.'
      ],
      techStack: ['Python', 'FastAPI', 'Docker', 'GitHub Actions', 'Linux VPS', 'Google Play Console'],
      githubUrl: 'https://github.com/irs622',
      specs: {
        platform: 'REST API & Mobile Client',
        architecture: 'FastAPI Microservice + Docker Container + Nginx Reverse Proxy',
        keyMechanism: 'Fuzzy morphological search & automated GitHub Actions deployment',
        verification: 'Published on Google Play Console; verified uptime on Linux VPS'
      }
    },
    {
      id: 'library-of-focus',
      slug: 'library-of-focus',
      title: 'Library of Focus',
      subtitle: 'Cognitive Science Experimental Telemetry Environment',
      year: '2024',
      role: 'Independent Game Developer',
      category: 'Applied Research',
      summary: 'A 2D maze-based cognitive experiment application presented at the Cognitive Exhibition by the Faculty of Psychology, UIN Sunan Gunung Djati Bandung.',
      achievement: 'Exhibited at the Cognitive Exhibition, Faculty of Psychology, UIN SGD Bandung.',
      problem: 'Psychology researchers required an instrumented digital testing environment to measure spatial orientation, reaction latencies, and decision consistency under controlled distractions.',
      solution: 'Engineered an interactive 2D canvas maze application logging millisecond-precision movement vectors, error frequencies, and task completion metrics.',
      technicalContribution: [
        'Implemented custom 2D canvas maze rendering and deterministic collision detection algorithms.',
        'Programmed micro-timestamp event logging to capture user decision latencies without garbage collection pauses.',
        'Constructed telemetry export routines allowing researchers to download structured session datasets.',
        'Demonstrated software live to students and psychology researchers at the academic exhibition.'
      ],
      techStack: ['React Native', 'TypeScript', 'Canvas API', 'State Machine', 'Analytical Telemetry'],
      githubUrl: 'https://github.com/irs622',
      specs: {
        platform: 'Interactive Web & Mobile Canvas',
        architecture: 'HTML5 Canvas Engine + Finite State Machine + Telemetry Logger',
        keyMechanism: 'Microsecond-precision event timing & deterministic collision checking',
        verification: 'Live experimental demonstration at the Faculty of Psychology Exhibition'
      }
    }
  ]
};
