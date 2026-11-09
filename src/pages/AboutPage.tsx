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
          <span>№ 01</span>
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

          <div className="pt-4">
            <span className="caption-uppercase text-[#6e6b65] block mb-2.5">
              Research &amp; Technical Focus
            </span>
            <div className="flex flex-wrap gap-1.5">
              {aboutContent.coreInterests.map((interest) => (
                <Badge key={interest} variant="mono" size="md">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#e5e2dc] bg-[#ffffff] p-2.5 rounded-sm">
            <div className="aspect-[3/4] overflow-hidden bg-[#f5f4f0] rounded-xs">
              <img
                src={portraitImg}
                alt="LM. Irsal Shydiq"
                className="w-full h-full object-cover filter grayscale-[10%]"
              />
            </div>
            <div className="pt-3 px-1 flex items-center justify-between font-mono text-[11px] text-[#6e6b65] border-t border-[#eeebe6] mt-2.5">
              <span className="text-[#141413]">LM. Irsal Shydiq</span>
              <span>Bandung, Indonesia</span>
            </div>
          </div>

          {/* Academic & Scholarship Card */}
          <div className="border border-[#e5e2dc] bg-[#ffffff] p-5 rounded-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-[#eeebe6] pb-2 text-[12px] font-mono text-[#141413]">
              <GraduationCap size={15} />
              <span className="font-medium">Informatics Engineering &bull; Class of 2027</span>
            </div>
            <p className="caption text-[#6e6b65]">
              UIN Sunan Gunung Djati Bandung &bull; Current Cumulative GPA: 3.30 / 4.00
            </p>
            <div className="p-2.5 bg-[#f5f4f0] rounded-sm border border-[#e5e2dc] flex items-center gap-2 text-[12px] text-[#1e3a2b] font-mono">
              <Award size={15} />
              <span>LPDP Scholarship Awardee (MORA RI)</span>
            </div>
          </div>

          {/* Snapshot Ledger */}
          <div className="border border-[#e5e2dc] bg-[#ffffff] rounded-sm divide-y divide-[#eeebe6] text-[13px]">
            {aboutContent.snapshot.map((item) => (
              <div key={item.label} className="p-3.5 space-y-0.5">
                <span className="caption-uppercase text-[10px] text-[#6e6b65] block">
                  {item.label}
                </span>
                <span className="font-medium text-[#141413] block">
                  {item.value}
                </span>
                {item.detail && (
                  <span className="caption text-[12px] text-[#6e6b65] block">{item.detail}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
