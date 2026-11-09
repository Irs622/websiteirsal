import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Award } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { aboutContent } from '../data/about';
import { Badge } from '../components/ui/Badge';
import portraitImg from '../assets/irsal-portrait.png';

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
          className="inline-flex items-center gap-2 font-mono text-[13px] text-[#6e6b65] hover:text-[#141413] transition-colors py-1 px-2 -ml-2 rounded-sm hover:bg-[#f5f4f0]"
        >
          <ArrowLeft size={14} />
          <span>Return to Overview</span>
        </Link>
      </div>

      <header className="mb-12 space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-[12px] text-[#6e6b65]">
          <span>01</span>
          <span>&bull;</span>
          <span>ACADEMIC BASE &amp; TRAJECTORY</span>
        </div>

        <h1 className="display-mega text-[#141413]">
          {aboutContent.headline}
        </h1>

        <p className="body-md text-[17px] text-[#6e6b65] leading-relaxed">
          The engineering background, academic focus, and values behind my work.
        </p>
      </header>

      {/* Main Grid: Narrative & Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
        <div className="lg:col-span-7 space-y-5">
          {aboutContent.narrative.map((p, idx) => (
            <p key={idx} className="body-md text-[16px] leading-relaxed text-[#44423e]">
              {p}
            </p>
          ))}

          <div className="pt-4 border-t border-[#e5e2dc] space-y-2">
            <span className="caption-uppercase text-[#6e6b65] block">
              Guiding Engineering Ethos
            </span>
            <blockquote className="display-sm italic text-[#141413] border-l border-[#141413] pl-4 py-1">
              "{personalInfo.brandStatement}"
            </blockquote>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#e5e2dc] bg-[#ffffff] p-2.5 rounded-sm max-w-sm">
            <div className="aspect-[3/4] overflow-hidden bg-[#eeebe6] rounded-xs">
              <img
                src={portraitImg}
                alt="LM. Irsal Shydiq"
                className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98]"
              />
            </div>
            <div className="pt-2.5 px-1 flex items-center justify-between font-mono text-[11px] text-[#6e6b65] border-t border-[#eeebe6] mt-2">
              <span className="text-[#141413] font-medium">LM. Irsal Shydiq</span>
              <span>Bandung, Indonesia &bull; '27</span>
            </div>
          </div>

          {/* Consolidated Academic Dossier Ledger (Open, unboxed) */}
          <div className="border-t border-[#e5e2dc] divide-y divide-[#eeebe6]">
            <div className="py-4 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6e6b65]">
                <span className="text-[#141413] font-medium flex items-center gap-1.5">
                  <GraduationCap size={14} />
                  Academic Base
                </span>
                <span>Class of 2027</span>
              </div>
              <h4 className="title-sm text-[#141413]">Informatics Engineering</h4>
              <p className="caption text-[#6e6b65]">
                UIN Sunan Gunung Djati Bandung &bull; Cumulative GPA: 3.30 / 4.00
              </p>
            </div>

            <div className="py-4 space-y-1">
              <span className="caption-uppercase text-[10px] text-[#9c9890] block">Fellowship</span>
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#1e3a2b]">
                <Award size={15} />
                <span>LPDP Scholarship Awardee</span>
              </div>
              <p className="caption text-[#6e6b65] text-[12px]">Ministry of Religious Affairs (Kemenag RI)</p>
            </div>

            <div className="py-4 space-y-1">
              <span className="caption-uppercase text-[10px] text-[#9c9890] block">Current Production Role</span>
              <span className="font-medium text-[#141413] text-[14px] block">Software Engineer Intern</span>
              <span className="caption text-[#6e6b65] text-[12px] block">PT Inpartner Optima Integra &bull; Jakarta / Hybrid</span>
            </div>

            <div className="py-4 space-y-1">
              <span className="caption-uppercase text-[10px] text-[#9c9890] block">Engineering Practice</span>
              <span className="text-[13px] text-[#44423e] block">Full-Stack Web, Native Android, Accessible Systems (WCAG 2.2 AAA)</span>
              <span className="caption text-[#6e6b65] text-[11px] font-mono block">Bandung, West Java, Indonesia &bull; UTC+7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
