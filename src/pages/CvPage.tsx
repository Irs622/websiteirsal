import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Printer,
  Mail,
  Phone,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';
import { Button } from '../components/ui/Button';

export function CvPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Curriculum Vitae | LM. Irsal Shydiq — Software Engineer';
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f4f4f2] py-8 sm:py-14 px-4 sm:px-6 print:p-0 print:bg-white text-[#0b0b0b]">
      {/* Top Controls Bar — Hidden in Print */}
      <div className="max-w-[860px] mx-auto mb-8 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-[#e2e2de] rounded-sm shadow-xs">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[13px] text-[#6b6b66] hover:text-[#0b0b0b] transition-colors py-1 px-2 -ml-2 rounded-sm hover:bg-[#ecece8]"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/cv-irsal-shydiq.pdf"
              download="LM_Irsal_Shydiq_CV.pdf"
              className="inline-block"
            >
              <Button variant="primary" size="sm" icon={<Download size={13} />}>
                Download PDF
              </Button>
            </a>

            <a
              href="/cv-irsal-shydiq.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" size="sm" icon={<ExternalLink size={13} />}>
                Open Raw PDF
              </Button>
            </a>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              icon={<Printer size={13} />}
            >
              Print / Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main CV Document Container (Formatted to match paper document) */}
      <article className="max-w-[860px] mx-auto bg-white border border-[#e2e2de] rounded-sm p-8 sm:p-14 md:p-16 print:border-none print:p-0 print:max-w-full shadow-sm print:shadow-none">
        {/* CV Header */}
        <header className="border-b border-[#0b0b0b] pb-5 mb-7 text-center">
          <h1 className="font-display text-[32px] sm:text-[38px] font-normal tracking-[0.04em] text-[#0b0b0b] uppercase mb-1">
            LM. IRSAL SHYDIQ
          </h1>
          <p className="font-mono text-[12px] sm:text-[13px] font-medium tracking-[0.12em] text-[#1a1a18] uppercase mb-2.5">
            SOFTWARE ENGINEER &bull; AI &amp; MOBILE DEVELOPMENT &bull; WEB DEVELOPER
          </p>
          <div className="font-mono text-[11px] sm:text-[12px] text-[#6b6b66] flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} className="text-[#6b6b66]" />
              <span>Bandung, Indonesia</span>
            </span>
            <span className="text-[#d4d4cf]">&bull;</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-1 hover:text-[#0b0b0b] transition-colors"
            >
              <Mail size={11} className="text-[#6b6b66]" />
              <span>{personalInfo.email}</span>
            </a>
            <span className="text-[#d4d4cf]">&bull;</span>
            <a
              href={`tel:${personalInfo.phone.replace(/[\s-]/g, '')}`}
              className="inline-flex items-center gap-1 hover:text-[#0b0b0b] transition-colors"
            >
              <Phone size={11} className="text-[#6b6b66]" />
              <span>{personalInfo.phone}</span>
            </a>
            <span className="text-[#d4d4cf]">&bull;</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#0b0b0b] transition-colors"
            >
              <GithubIcon size={11} className="text-[#6b6b66]" />
              <span>github.com/irs622</span>
            </a>
            <span className="text-[#d4d4cf]">&bull;</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#0b0b0b] transition-colors"
            >
              <LinkedinIcon size={11} className="text-[#6b6b66]" />
              <span>linkedin.com/in/irsalshydiq</span>
            </a>
          </div>
        </header>

        {/* Section: Professional Summary */}
        <section className="mb-6">
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b0b0b] pb-1 border-b border-[#1a1a18] mb-2.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-[13.5px] leading-relaxed text-[#1a1a18] text-justify">
            Informatics Engineering student with hands-on experience developing AI-powered, Android, and web applications. Experienced in leading multidisciplinary software projects, building accessibility-focused solutions, and contributing to open-source and organizational systems. Passionate about Software Engineering, Artificial Intelligence, and Human-Centered Technology.
          </p>
        </section>

        {/* Section: Technical Skills */}
        <section className="mb-6">
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b0b0b] pb-1 border-b border-[#1a1a18] mb-2.5">
            TECHNICAL SKILLS
          </h2>
          <ul className="text-[13px] leading-normal space-y-1.5 text-[#1a1a18]">
            <li>
              <strong className="font-semibold text-[#0b0b0b]">&bull; Programming Languages:</strong> Kotlin, Python, PHP, JavaScript, SQL.
            </li>
            <li>
              <strong className="font-semibold text-[#0b0b0b]">&bull; Frameworks &amp; Libraries:</strong> React.js, Next.js, Laravel, Flutter, Android SDK
            </li>
            <li>
              <strong className="font-semibold text-[#0b0b0b]">&bull; AI &amp; Machine Learning:</strong> Machine Learning, AI Integrations, Prompt Engineering, OpenAI API, Hugging Face.
            </li>
            <li>
              <strong className="font-semibold text-[#0b0b0b]">&bull; DevOps, Cloud &amp; Security:</strong> Docker, CI/CD, Automated Testing (Jest, JUnit), Cybersecurity Basics.
            </li>
            <li>
              <strong className="font-semibold text-[#0b0b0b]">&bull; Core Competencies:</strong> Product Development, UI/UX Design, Figma, Project Management, Agile, Accessibility (a11y).
            </li>
          </ul>
        </section>

        {/* Section: Work Experience */}
        <section className="mb-6">
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b0b0b] pb-1 border-b border-[#1a1a18] mb-3">
            WORK EXPERIENCE
          </h2>

          <div className="space-y-4">
            {/* Role 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[14px] text-[#0b0b0b]">
                  PT Inpartner Optima Integra
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  Jakarta, Indonesia
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 italic text-[13px] text-[#1a1a18] mb-1.5">
                <span>Software Engineer / Web Developer Intern</span>
                <span className="font-mono not-italic text-[12px] text-[#6b6b66]">
                  Sep 2026 &ndash; Present
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-1">
                <li>Develop and maintain web applications and contribute to ongoing software engineering tasks within the company&apos;s technology team.</li>
                <li>Contribute to website improvements including SEO, GEO, technical optimization, and AI-powered chatbot integration.</li>
                <li>Collaborate with internal and external developers to analyze existing systems, implement improvements, and maintain production applications.</li>
              </ul>
            </div>

            {/* Role 2 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[14px] text-[#0b0b0b]">
                  Walhi Jawa Barat
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  Bandung, Indonesia
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 italic text-[13px] text-[#1a1a18] mb-1.5">
                <span>Full Stack Web Developer Intern</span>
                <span className="font-mono not-italic text-[12px] text-[#6b6b66]">
                  2026
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-1">
                <li>Architected the organization&apos;s website infrastructure using Laravel and MySQL and resolved deployment issues on Linux VPS.</li>
                <li>Spearheaded a complete UI/UX redesign and implemented system reliability solutions via Docker.</li>
              </ul>
            </div>

            {/* Role 3 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[14px] text-[#0b0b0b]">
                  PC Fatayat NU Kabupaten Sukabumi
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  hybrid, Sukabumi Indonesia
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 italic text-[13px] text-[#1a1a18] mb-1.5">
                <span>Project Manager &amp; UI/UX Designer</span>
                <span className="font-mono not-italic text-[12px] text-[#6b6b66]">
                  2026
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-1">
                <li>Led the technical development of a centralized organizational website utilizing React.js and Laravel, focusing on scalable Full-Stack architecture.</li>
                <li>Engineered secure data pipelines by integrating RESTful APIs and SQL databases to support organizational workflows.</li>
              </ul>
            </div>

            {/* Role 4 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[14px] text-[#0b0b0b]">
                  Freelance Software Engineer
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  Remote
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 italic text-[13px] text-[#1a1a18] mb-1.5">
                <span>Web &amp; Mobile Developer</span>
                <span className="font-mono not-italic text-[12px] text-[#6b6b66]">
                  2024 &ndash; Present
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-1">
                <li>Developed and deployed custom web and mobile applications, managing the full software development lifecycle for various clients.</li>
                <li>Delivered responsive solutions, managed hosting configurations, and performed ongoing system maintenance.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Projects */}
        <section className="mb-6">
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b0b0b] pb-1 border-b border-[#1a1a18] mb-3">
            PROJECTS
          </h2>

          <div className="space-y-3.5">
            {/* Project 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  DengarBain &ndash; Accessible Hadith Learning Web App (PWA)
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  2026
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Web Developer &amp; UI/UX Designer
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-0.5">
                <li>Developed an accessibility-focused Progressive Web App (PWA) for learning Hadith Arba&apos;in, designed primarily for visually impaired users.</li>
                <li>Implemented responsive web interfaces, accessible navigation, audio-based learning interactions, and Progressive Web App capabilities.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  Hadith Arba&apos;in Mobile App
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  2026 &ndash; Present
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Product Lead &amp; Developer
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-0.5">
                <li>Developed an Android application integrating Text-to-Speech and accessible navigation to support independent Hadith learning for visually impaired users.</li>
                <li>Defined product requirements and designed an audio-first user experience with accessibility-centered interaction flows.</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  Fatayat NU Sukabumi Management System
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  2026
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Project Manager &amp; System Designer
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-0.5">
                <li>Led project planning and coordinated stakeholders to develop a centralized membership management system for 47 district branches.</li>
                <li>Designed the system architecture, database schema, and business workflows to improve administrative efficiency and data consistency.</li>
              </ul>
            </div>

            {/* Project 4 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  AR Hijaiyah &ndash; Voice-Based Learning Application
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  May 2026 &ndash; Jun 2026
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Full Stack Developer &amp; UI/UX Designer
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-0.5">
                <li>Built an application combining AR, Three.js, and voice guidance to create an accessible Hijaiyah learning experience.</li>
                <li>Designed responsive UI/UX and implemented interactive 3D learning modules for visually impaired users.</li>
                <li>Produced research from the project that was accepted for publication in <em>Artificial: Jurnal Informatika dan Sistem Informasi</em> (2026).</li>
              </ul>
            </div>

            {/* Project 5 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  BAHARA &ndash; Voice-Guided Arabic Learning App
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  2025
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Product Lead &amp; Developer
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-0.5">
                <li>Defined product requirements and led the development of an accessible Arabic learning application for visually impaired users.</li>
                <li>Built voice-guided interactions with touch-based navigation and audio feedback based on Human&ndash;Computer Interaction (HCI) principles.</li>
              </ul>
            </div>

            {/* Project 6 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  Kamus Cerdas Indo-Sunda Mobile Application
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  2025
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Backend Developer &amp; DevOps Engineer
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-0.5">
                <li>Built backend services, RESTful APIs, and database integration to support core mobile application functionality.</li>
                <li>Designed and maintained CI/CD pipelines, production infrastructure, and automated Google Play Store deployment for stable releases.</li>
              </ul>
            </div>

            {/* Project 7 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  Library of Focus
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  2025
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Game Developer
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-0.5">
                <li>Built an interactive maze-based mobile game in React Native that was showcased at the Cognitive Exhibition, Faculty of Psychology, UIN Sunan Gunung Djati Bandung.</li>
                <li>Designed and implemented multi-level gameplay, collision mechanics, and responsive interfaces to deliver a cognitive training experience.</li>
                <li>Completed the project independently within one month and deployed it for use by exhibition visitors.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Education */}
        <section className="mb-6">
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b0b0b] pb-1 border-b border-[#1a1a18] mb-3">
            EDUCATION
          </h2>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-bold text-[14px] text-[#0b0b0b]">
                UIN Sunan Gunung Djati Bandung
              </span>
              <span className="font-mono text-[12px] text-[#6b6b66]">
                Bandung, Indonesia
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 italic text-[13px] text-[#1a1a18] mb-1.5">
              <span>Bachelor of Informatics Engineering (GPA: 3.30 / 4.00)</span>
              <span className="font-mono not-italic text-[12px] text-[#6b6b66]">
                Expected 2027
              </span>
            </div>
            <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18] space-y-1">
              <li>
                <strong className="font-semibold text-[#0b0b0b]">Awards:</strong> Awarded LPDP Scholarship for academic excellence (Ministry of Religious Affairs Indonesia).
              </li>
              <li>
                <strong className="font-semibold text-[#0b0b0b]">Relevant Coursework:</strong> Software Engineering, Database Systems, Computer Networks, Human-Computer Interaction, Information Security.
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Leadership & Activities */}
        <section className="mb-6">
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b0b0b] pb-1 border-b border-[#1a1a18] mb-3">
            LEADERSHIP &amp; ACTIVITIES
          </h2>

          <div className="space-y-3.5">
            {/* Leadership 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  CSSMoRA Nasional &amp; UIN Sunan Gunung Djati
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  2025 &ndash; Present
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Head of Strategy, Branding, &amp; Communication
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18]">
                <li>Directed digital communication strategies and managed digital infrastructure for a national student scholarship network.</li>
              </ul>
            </div>

            {/* Leadership 2 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[13.5px] text-[#0b0b0b]">
                  Informatics Engineering Student Association
                </span>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  2025 &ndash; 2026
                </span>
              </div>
              <div className="italic text-[12.5px] text-[#6b6b66] mb-1">
                Head of Strategic Studies &amp; Advocacy Division
              </div>
              <ul className="list-disc list-outside pl-4 text-[13px] leading-relaxed text-[#1a1a18]">
                <li>Led data-driven advocacy initiatives and managed technical study groups to strengthen student technical competencies.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Certifications */}
        <section>
          <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b0b0b] pb-1 border-b border-[#1a1a18] mb-2.5">
            CERTIFICATIONS
          </h2>
          <ul className="text-[13px] leading-relaxed space-y-1.5 text-[#1a1a18]">
            <li>
              <strong className="font-semibold text-[#0b0b0b]">&bull; Artificial Intelligence &amp; GenAI:</strong> Anthropic Claude Code in Action (2026), IBM SkillsBuild AI Foundation (2026), Komdigi Dasar Keamanan AI (2026).
            </li>
            <li>
              <strong className="font-semibold text-[#0b0b0b]">&bull; Software &amp; Infrastructure:</strong> Google Analytics GA4 (2026), Cisco CCNA &amp; Linux Essentials (2025), Oracle Database SQL (2025).
            </li>
          </ul>
        </section>

        {/* Document Footer Verification */}
        <div className="mt-10 pt-4 border-t border-[#ecece8] flex items-center justify-between text-[11px] font-mono text-[#9a9a94] print:mt-6">
          <span className="inline-flex items-center gap-1.5 text-[#0b0b0b]">
            <CheckCircle2 size={12} />
            <span>Verified Official Document &bull; LM. Irsal Shydiq</span>
          </span>
          <span>Last Updated &bull; 2026</span>
        </div>
      </article>
    </div>
  );
}