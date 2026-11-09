import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { researchContent } from '../data/research';
import { Badge } from '../components/ui/Badge';

export function ResearchPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Applied Research & Inquiries | LM. Irsal Shydiq';
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
          <span>05</span>
          <span>&bull;</span>
          <span>APPLIED RESEARCH &amp; INQUIRIES</span>
        </div>

        <h1 className="display-mega text-[#141413]">
          {researchContent.headline}
        </h1>

        <p className="body-md text-[17px] text-[#6e6b65] leading-relaxed">
          {researchContent.subheadline}
        </p>
      </header>

      {/* Featured Research Direction Plate */}
      <div className="mb-14 bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[#eeebe6] font-mono text-[11px]">
          <span className="caption-uppercase text-[#6e6b65]">
            Active Research Investigation
          </span>
          <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20">
            {researchContent.featuredDirection.status}
          </span>
        </div>

        <h2 className="display-md text-[#141413] leading-snug mb-3">
          "{researchContent.featuredDirection.title}"
        </h2>

        <p className="body-md text-[#44423e] leading-relaxed mb-6 max-w-4xl">
          {researchContent.featuredDirection.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#eeebe6]">
          <div>
            <span className="caption-uppercase block mb-1 text-[#141413]">
              Methodology
            </span>
            <p className="body-sm text-[#44423e] leading-relaxed">
              {researchContent.featuredDirection.methodology}
            </p>
          </div>
          <div>
            <span className="caption-uppercase block mb-1 text-[#141413]">
              Target Empirical Outcomes
            </span>
            <p className="body-sm text-[#44423e] leading-relaxed">
              {researchContent.featuredDirection.anticipatedOutcomes}
            </p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-[#eeebe6] flex flex-wrap gap-1.5">
          {researchContent.featuredDirection.keywords.map((kw) => (
            <Badge key={kw} variant="mono" size="sm">
              {kw}
            </Badge>
          ))}
        </div>
      </div>

      {/* Areas of Intellectual Inquiry (Open ledger) */}
      <div className="border-t border-[#e5e2dc] divide-y divide-[#eeebe6]">
        {researchContent.interests.map((item) => (
          <div
            key={item.topic}
            className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
          >
            <div className="md:col-span-4 space-y-0.5">
              <h3 className="title-sm text-[#141413]">
                {item.topic}
              </h3>
              <span className="caption text-[11px] font-mono text-[#6e6b65] block">
                {item.category}
              </span>
            </div>
            <div className="md:col-span-8">
              <p className="body-sm text-[#44423e] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
