import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { aboutContent } from '../data/about';
import { Badge } from '../components/ui/Badge';
import portraitImg from '../assets/irsal-portrait.png';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About & Trajectory | LM. Irsal Shydiq';
  }, []);

  return (
    <div className="py-12 sm:py-20 px-6 sm:px-8 max-w-[1200px] mx-auto min-h-screen">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[14px] text-[#777169] hover:text-[#0C0A09] transition-colors py-1.5 px-3 -ml-3 rounded-full hover:bg-black/[0.03]"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <header className="mb-14 space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="label-editorial text-[#777169]">
            {aboutContent.sectionNumber} / {aboutContent.sectionTitle}
          </span>
          <div className="h-[1px] w-12 bg-[#E7E5E4]" />
        </div>

        <h1 className="display-hero text-[#0C0A09]">
          {aboutContent.headline}
        </h1>

        <p className="body-editorial text-[18px] text-[#777169] leading-relaxed">
          The engineering background, academic focus, and values behind my work.
        </p>
      </header>

      {/* Main Grid: Story & Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        <div className="lg:col-span-7 space-y-6">
          {aboutContent.narrative.map((p, idx) => (
            <p key={idx} className="body-editorial text-[17px] leading-relaxed text-[#292524]">
              {p}
            </p>
          ))}

          <div className="pt-6 border-t border-[#E7E5E4] space-y-3">
            <span className="label-editorial text-[#777169] block">
              Guiding Engineering Statement
            </span>
            <blockquote className="font-display text-[22px] font-light italic text-[#0C0A09] border-l-2 border-[#0C0A09] pl-4 py-1">
              "{personalInfo.brandStatement}"
            </blockquote>
          </div>

          <div className="pt-6">
            <span className="label-editorial text-[#777169] block mb-3">
              Research &amp; Technical Focus
            </span>
            <div className="flex flex-wrap gap-2">
              {aboutContent.coreInterests.map((interest) => (
                <Badge key={interest} variant="default" size="md">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-[24px] border border-[#E7E5E4] bg-[#FFFFFF] p-3 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
            <div className="aspect-[3/4] overflow-hidden rounded-[18px] bg-[#F5F5F5]">
              <img
                src={portraitImg}
                alt="LM. Irsal Shydiq"
                className="w-full h-full object-cover grayscale-[15%]"
              />
            </div>
            <div className="p-3 pt-4 flex items-center justify-between text-[12px] text-[#777169]">
              <span className="font-mono">LM. Irsal Shydiq</span>
              <span>Bandung, Indonesia</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aboutContent.snapshot.map((item) => (
              <div
                key={item.label}
                className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[16px] p-4 space-y-1"
              >
                <span className="label-editorial text-[#777169] text-[10px] block">
                  {item.label}
                </span>
                <h4 className="text-[14px] font-medium text-[#0C0A09]">
                  {item.value}
                </h4>
                {item.detail && (
                  <p className="text-[12px] text-[#777169]">{item.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
