import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { experienceContent } from '../data/experience';
import { leadershipContent } from '../data/leadership';
import { Badge } from '../components/ui/Badge';
import { ExperienceTimeline } from '../components/ExperienceTimeline';

export function ExperiencePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Professional Experience & Leadership | LM. Irsal Shydiq';
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
          <span>03</span>
          <span>&bull;</span>
          <span>WORK HISTORY &amp; LEADERSHIP</span>
        </div>

        <h1 className="display-mega text-[#0b0b0b]">
          {experienceContent.headline}
        </h1>

        <p className="body-md text-[17px] text-[#6b6b66] leading-relaxed">
          {experienceContent.subheadline}
        </p>
      </header>

      {/* Interactive Scroll-Driven Experience Chronological Ledger */}
      <div className="mb-16">
        <ExperienceTimeline items={experienceContent.items} />
      </div>

      {/* Leadership Section (Open, unboxed) */}
      <section className="pt-10 border-t border-[#e2e2de] space-y-8">
        <div>
          <span className="caption-uppercase text-[#6b6b66] block mb-2">
            07 &bull; INSTITUTIONAL LEADERSHIP &amp; COMMUNITY
          </span>
          <h2 className="display-lg text-[#0b0b0b]">
            {leadershipContent.headline}
          </h2>
          <p className="body-md text-[#6b6b66] mt-1 max-w-2xl">
            {leadershipContent.subheadline}
          </p>
        </div>

        <div className="border-t border-[#e2e2de] divide-y divide-[#ecece8]">
          {leadershipContent.roles.map((role) => (
            <div
              key={role.organization}
              className="py-8 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="display-sm text-[#0b0b0b]">
                    {role.organization}
                  </h3>
                  <p className="body-strong text-[#0b0b0b] mt-0.5">
                    {role.role}
                  </p>
                  <p className="caption text-[#6b6b66] text-[12px] mt-0.5">
                    {role.scope}
                  </p>
                </div>
                <span className="font-mono text-[12px] text-[#6b6b66]">
                  {role.period}
                </span>
              </div>

              <ul className="space-y-1.5 max-w-3xl pt-1">
                {role.contributions.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#1a1a18]"
                  >
                    <span className="text-[#9a9a94] font-mono text-[11px] select-none mt-0.5">
                      &bull;
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {role.tags.map((tag) => (
                  <Badge key={tag} variant="mono" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
