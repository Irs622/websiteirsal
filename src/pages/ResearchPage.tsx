import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { researchContent } from '../data/research';
import { Badge } from '../components/ui/Badge';

export function ResearchPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Research & Technical Inquiries | LM. Irsal Shydiq';
  }, []);

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 max-w-[1200px] mx-auto min-h-screen">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 body-sm text-[#777169] hover:text-[#0c0a09] transition-colors py-1.5 px-3 -ml-3 rounded-full hover:bg-black/[0.03]"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <header className="mb-14 space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="caption-uppercase text-[#777169]">
            {researchContent.sectionNumber} / {researchContent.sectionTitle}
          </span>
          <div className="h-[1px] w-12 bg-[#e7e5e4]" />
        </div>

        <h1 className="display-mega text-[#0c0a09]">
          {researchContent.headline}
        </h1>

        <p className="body-md text-[18px] text-[#777169] leading-relaxed">
          {researchContent.subheadline}
        </p>
      </header>

      {/* Featured Research Direction (rounded.xxl = 24px) */}
      <div className="mb-14 bg-[#ffffff] border border-[#e7e5e4] rounded-[24px] p-8 sm:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="caption-uppercase text-[#777169]">
            Featured Research Direction
          </span>
          <span className="inline-flex items-center text-[12px] text-amber-900 bg-amber-50 border border-amber-200 rounded-full px-3 py-0.5 font-medium">
            {researchContent.featuredDirection.status}
          </span>
        </div>

        <h2 className="display-md text-[#0c0a09] leading-tight mb-4">
          "{researchContent.featuredDirection.title}"
        </h2>

        <p className="body-md text-[#4e4e4e] leading-relaxed mb-6 max-w-4xl">
          {researchContent.featuredDirection.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#e7e5e4]">
          <div>
            <span className="caption-uppercase text-[#0c0a09] block mb-1">
              Methodology
            </span>
            <p className="body-sm text-[#4e4e4e] leading-relaxed">
              {researchContent.featuredDirection.methodology}
            </p>
          </div>
          <div>
            <span className="caption-uppercase text-[#0c0a09] block mb-1">
              Anticipated Outcomes
            </span>
            <p className="body-sm text-[#4e4e4e] leading-relaxed">
              {researchContent.featuredDirection.anticipatedOutcomes}
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap gap-2">
          {researchContent.featuredDirection.keywords.map((kw) => (
            <Badge key={kw} variant="default" size="sm">
              {kw}
            </Badge>
          ))}
        </div>
      </div>

      {/* Research Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {researchContent.interests.map((item, idx) => (
          <div
            key={item.topic}
            className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-6 hover:border-[#d6d3d1] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="caption-uppercase text-[#777169]">
                0{idx + 1} • {item.category}
              </span>
            </div>
            <h3 className="display-sm text-[#0c0a09] mb-2">
              {item.topic}
            </h3>
            <p className="body-sm text-[#4e4e4e] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
