import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Award, FileText, Download } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { aboutContent } from '../data/about';
import { Button } from '../components/ui/Button';
import portraitImg from '../assets/irsal-portrait.webp';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About & Academic Base | LM. Irsal Shydiq';
  }, []);

  return (
    <div className="py-12 sm:py-20 px-6 sm:px-8 max-w-[1200px] mx-auto min-h-screen">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[13px] text-[#6b6b66] hover:text-[#0b0b0b] transition-colors py-1 px-2 -ml-2 rounded-sm hover:bg-[#ecece8]"
        >
          <ArrowLeft size={14} />
          <span>Return to Overview</span>
        </Link>
      </div>

      <header className="mb-12 space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-[12px] text-[#6b6b66]">
          <span>01</span>
          <span>&bull;</span>
          <span>ACADEMIC BASE &amp; TRAJECTORY</span>
        </div>

        <h1 className="display-mega text-[#0b0b0b]">
          {aboutContent.headline}
        </h1>

        <p className="body-md text-[17px] text-[#6b6b66] leading-relaxed">
          The engineering background, academic focus, and values behind my work.
        </p>
      </header>

      {/* Main Grid: Narrative & Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
        <div className="lg:col-span-7 space-y-5">
          {aboutContent.narrative.map((p, idx) => (
            <p key={idx} className="body-md text-[16px] leading-relaxed text-[#1a1a18]">
              {p}
            </p>
          ))}

          <div className="pt-4 border-t border-[#e2e2de] space-y-2">
            <span className="caption-uppercase text-[#6b6b66] block">
              Guiding Engineering Ethos
            </span>
            <blockquote className="display-sm italic text-[#0b0b0b] border-l border-[#0b0b0b] pl-4 py-1">
              "{personalInfo.brandStatement}"
            </blockquote>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#e2e2de] bg-[#ffffff] p-2.5 rounded-sm max-w-sm">
            <div className="aspect-[3/4] overflow-hidden bg-[#ecece8] rounded-xs">
              <img
                src={portraitImg}
                alt="LM. Irsal Shydiq"
                className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98]"
              />
            </div>
            <div className="pt-2.5 px-1 flex items-center justify-between font-mono text-[11px] text-[#6b6b66] border-t border-[#ecece8] mt-2">
              <span className="text-[#0b0b0b] font-medium">LM. Irsal Shydiq</span>
              <span>Bandung, Indonesia &bull; '27</span>
            </div>
          </div>

          {/* Consolidated Academic Dossier Ledger (Open, unboxed) */}
          <div className="border-t border-[#e2e2de] divide-y divide-[#ecece8]">
            <div className="py-4 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6b6b66]">
                <span className="text-[#0b0b0b] font-medium flex items-center gap-1.5">
                  <GraduationCap size={14} />
                  Academic Base
                </span>
                <span>Class of 2027</span>
              </div>
              <h4 className="title-sm text-[#0b0b0b]">Informatics Engineering</h4>
              <p className="caption text-[#6b6b66]">
                UIN Sunan Gunung Djati Bandung &bull; Cumulative GPA: 3.30 / 4.00
              </p>
            </div>

            <div className="py-4 space-y-1">
              <span className="caption-uppercase text-[10px] text-[#6b6b66] block">Fellowship</span>
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#0b0b0b]">
                <Award size={15} />
                <span>LPDP Scholarship Awardee</span>
              </div>
              <p className="caption text-[#6b6b66] text-[12px]">Ministry of Religious Affairs (Kemenag RI)</p>
            </div>

            <div className="py-4 space-y-1">
              <span className="caption-uppercase text-[10px] text-[#6b6b66] block">Current Production Role</span>
              <span className="font-medium text-[#0b0b0b] text-[14px] block">Software Engineer Intern</span>
              <span className="caption text-[#6b6b66] text-[12px] block">PT Inpartner Optima Integra &bull; Jakarta / Hybrid</span>
            </div>

            <div className="py-4 space-y-1">
              <span className="caption-uppercase text-[10px] text-[#6b6b66] block">Engineering Practice</span>
              <span className="text-[13px] text-[#1a1a18] block">Full-Stack Web, Native Android, Accessible Systems (WCAG 2.2 AAA)</span>
              <span className="caption text-[#6b6b66] text-[11px] font-mono block">Bandung, West Java, Indonesia &bull; UTC+7</span>
            </div>

            <div className="pt-5 flex items-center gap-2.5">
              <Link to="/cv" className="inline-block">
                <Button variant="outline" size="sm" icon={<FileText size={13} />}>
                  Curriculum Vitae
                </Button>
              </Link>
              <a
                href="/cv-irsal-shydiq.pdf"
                download="LM_Irsal_Shydiq_CV.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-[#6b6b66] hover:text-[#0b0b0b] border border-[#e2e2de] rounded-sm bg-white hover:bg-[#ecece8] transition-colors"
                title="Download Official CV (PDF)"
              >
                <Download size={12} />
                <span>PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
