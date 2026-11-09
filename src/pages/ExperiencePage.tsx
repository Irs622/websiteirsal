import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { experienceContent } from '../data/experience';
import { leadershipContent } from '../data/leadership';
import { Badge } from '../components/ui/Badge';
import { Surface } from '../components/ui/Surface';

export function ExperiencePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Professional Experience | LM. Irsal Shydiq';
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
            {experienceContent.sectionNumber} / {experienceContent.sectionTitle}
          </span>
          <div className="h-[1px] w-12 bg-[#E7E5E4]" />
        </div>

        <h1 className="display-hero text-[#0C0A09]">
          {experienceContent.headline}
        </h1>

        <p className="body-editorial text-[18px] text-[#777169] leading-relaxed">
          {experienceContent.subheadline}
        </p>
      </header>

      {/* Experience Chronological List */}
      <div className="space-y-6 mb-20">
        {experienceContent.items.map((item, index) => (
          <div
            key={item.id}
            className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[20px] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              <div className="lg:col-span-4 space-y-1">
                <span className="label-editorial text-[#777169] block mb-1">
                  0{index + 1} • {item.type}
                </span>
                <h3 className="font-display text-[24px] font-light text-[#0C0A09]">
                  {item.company}
                </h3>
                <p className="text-[15px] font-medium text-[#292524]">
                  {item.role}
                </p>
                <div className="pt-2 text-[13px] text-[#777169] flex flex-col gap-0.5">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <span className="label-editorial text-[#777169] block">
                  Core Responsibilities &amp; Impact
                </span>
                <ul className="space-y-2.5">
                  {item.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-[#4E4E4E]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0C0A09] mt-2 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {item.techStack && (
                  <div className="pt-3 flex flex-wrap gap-1.5">
                    {item.techStack.map((tech) => (
                      <Badge key={tech} variant="neutral" size="sm">
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
      <section className="pt-12 border-t border-[#E7E5E4] space-y-8">
        <div>
          <span className="label-editorial text-[#777169] block mb-2">
            06 / LEADERSHIP &amp; COMMUNITY
          </span>
          <h2 className="display-section text-[#0C0A09]">
            {leadershipContent.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipContent.roles.map((role, idx) => (
            <Surface key={role.organization} variant="card" padding="md" className="space-y-6">
              <div>
                <span className="label-editorial text-[#777169] block mb-1">
                  0{idx + 1} • {role.period}
                </span>
                <h3 className="font-display text-[24px] font-light text-[#0C0A09]">
                  {role.organization}
                </h3>
                <p className="text-[15px] font-medium text-[#292524] mt-1">
                  {role.role}
                </p>
                <p className="text-[13px] text-[#777169] mt-0.5">
                  {role.scope}
                </p>
              </div>

              <ul className="space-y-2 pt-2 border-t border-[#E7E5E4]">
                {role.contributions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#4E4E4E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C0A09] mt-2 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Surface>
          ))}
        </div>
      </section>
    </div>
  );
}
