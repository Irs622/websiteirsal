import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { experienceContent } from '../data/experience';
import { leadershipContent } from '../data/leadership';
import { Badge } from '../components/ui/Badge';

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
          className="inline-flex items-center gap-2 font-mono text-[13px] text-[#6e6b65] hover:text-[#141413] transition-colors py-1 px-2 -ml-2 rounded-sm hover:bg-[#f5f4f0]"
        >
          <ArrowLeft size={14} />
          <span>Return to Overview</span>
        </Link>
      </div>

      <header className="mb-12 space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-[12px] text-[#6e6b65]">
          <span>03</span>
          <span>&bull;</span>
          <span>WORK HISTORY &amp; LEADERSHIP</span>
        </div>

        <h1 className="display-mega text-[#141413]">
          {experienceContent.headline}
        </h1>

        <p className="body-md text-[17px] text-[#6e6b65] leading-relaxed">
          {experienceContent.subheadline}
        </p>
      </header>

      {/* Experience Chronological Ledger (Open, unboxed) */}
      <div className="border-t border-[#e5e2dc] divide-y divide-[#e5e2dc] mb-16">
        {experienceContent.items.map((item) => (
          <div
            key={item.id}
            className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10"
          >
            <div className="md:col-span-3 space-y-1">
              <div className="font-mono text-[12px] text-[#141413] font-medium">
                {item.period}
              </div>
              <div className="font-mono text-[11px] text-[#6e6b65]">
                {item.location}
              </div>
              <div className="pt-2 text-[11px] font-mono uppercase tracking-wider text-[#1e3a2b]">
                {item.type}
              </div>
            </div>

            <div className="md:col-span-9 space-y-4">
              <div>
                <h3 className="font-display text-[24px] sm:text-[28px] text-[#141413] leading-snug">
                  {item.company}
                </h3>
                <div className="text-[15px] font-medium text-[#44423e] mt-0.5">
                  {item.role}
                </div>
              </div>

              <ul className="space-y-2 max-w-3xl">
                {item.responsibilities.map((resp, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-[#44423e]"
                  >
                    <span className="font-mono text-[11px] text-[#9c9890] select-none mt-1">
                      —
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {item.techStack && (
                <div className="pt-3 flex flex-wrap gap-1.5 border-t border-[#eeebe6]">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2 py-0.5 bg-[#f5f4f0] text-[#6e6b65] border border-[#e5e2dc] rounded-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Leadership Section (Open, unboxed) */}
      <section className="pt-10 border-t border-[#e5e2dc] space-y-8">
        <div>
          <span className="caption-uppercase text-[#6e6b65] block mb-2">
            07 &bull; INSTITUTIONAL LEADERSHIP &amp; COMMUNITY
          </span>
          <h2 className="display-lg text-[#141413]">
            {leadershipContent.headline}
          </h2>
          <p className="body-md text-[#6e6b65] mt-1 max-w-2xl">
            {leadershipContent.subheadline}
          </p>
        </div>

        <div className="border-t border-[#e5e2dc] divide-y divide-[#eeebe6]">
          {leadershipContent.roles.map((role) => (
            <div
              key={role.organization}
              className="py-8 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="display-sm text-[#141413]">
                    {role.organization}
                  </h3>
                  <p className="body-strong text-[#242321] mt-0.5">
                    {role.role}
                  </p>
                  <p className="caption text-[#6e6b65] text-[12px] mt-0.5">
                    {role.scope}
                  </p>
                </div>
                <span className="font-mono text-[12px] text-[#6e6b65]">
                  {role.period}
                </span>
              </div>

              <ul className="space-y-1.5 max-w-3xl pt-1">
                {role.contributions.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#44423e]"
                  >
                    <span className="text-[#9c9890] font-mono text-[11px] select-none mt-0.5">
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
