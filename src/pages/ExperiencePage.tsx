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
          <span>№ 03</span>
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

      {/* Experience Chronological Ledger */}
      <div className="border border-[#e5e2dc] bg-[#ffffff] rounded-sm divide-y divide-[#e5e2dc] mb-16">
        {experienceContent.items.map((item, index) => (
          <div
            key={item.id}
            className="p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              <div className="lg:col-span-4 space-y-1">
                <span className="caption-uppercase text-[#6e6b65] block mb-1">
                  LOG-0{index + 1} &bull; {item.type}
                </span>
                <h3 className="display-sm text-[#141413]">
                  {item.company}
                </h3>
                <p className="body-strong text-[#242321] mt-1 text-[15px]">
                  {item.role}
                </p>
                <div className="pt-2 font-mono text-[12px] text-[#6e6b65] space-y-0.5">
                  <div>{item.period}</div>
                  <div>{item.location}</div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <span className="caption-uppercase text-[#6e6b65] block">
                  Core Responsibilities &amp; Impact
                </span>
                <ul className="space-y-2">
                  {item.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 body-sm leading-relaxed text-[#44423e]"
                    >
                      <span className="text-[#9c9890] font-mono text-[11px] select-none mt-0.5">
                        &bull;
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {item.techStack && (
                  <div className="pt-3 border-t border-[#eeebe6] flex flex-wrap gap-1.5">
                    {item.techStack.map((tech) => (
                      <Badge key={tech} variant="mono" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leadership Section */}
      <section className="pt-10 border-t border-[#e5e2dc] space-y-8">
        <div>
          <span className="caption-uppercase text-[#6e6b65] block mb-2">
            № 07 &bull; INSTITUTIONAL LEADERSHIP &amp; COMMUNITY
          </span>
          <h2 className="display-lg text-[#141413]">
            {leadershipContent.headline}
          </h2>
          <p className="body-md text-[#6e6b65] mt-1 max-w-2xl">
            {leadershipContent.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipContent.roles.map((role, idx) => (
            <div
              key={role.organization}
              className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6 space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6e6b65] mb-2">
                  <span>LEAD-0{idx + 1}</span>
                  <span>{role.period}</span>
                </div>
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

              <div className="pt-2 border-t border-[#eeebe6] space-y-1.5">
                <span className="caption-uppercase block text-[#9c9890] text-[10px]">
                  Key Initiatives &amp; Responsibilities
                </span>
                <ul className="space-y-1.5">
                  {role.contributions.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 body-sm leading-relaxed text-[#44423e]"
                    >
                      <span className="text-[#9c9890] font-mono text-[11px] select-none mt-0.5">
                        &bull;
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
