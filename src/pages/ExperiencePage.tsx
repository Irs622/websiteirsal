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
            {experienceContent.sectionNumber} / {experienceContent.sectionTitle}
          </span>
          <div className="h-[1px] w-12 bg-[#e7e5e4]" />
        </div>

        <h1 className="display-mega text-[#0c0a09]">
          {experienceContent.headline}
        </h1>

        <p className="body-md text-[18px] text-[#777169] leading-relaxed">
          {experienceContent.subheadline}
        </p>
      </header>

      {/* Experience Chronological List */}
      <div className="space-y-6 mb-20">
        {experienceContent.items.map((item, index) => (
          <div
            key={item.id}
            className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              <div className="lg:col-span-4 space-y-1">
                <span className="caption-uppercase text-[#777169] block mb-1">
                  0{index + 1} • {item.type}
                </span>
                <h3 className="display-sm text-[#0c0a09]">
                  {item.company}
                </h3>
                <p className="body-strong text-[#292524] mt-1">
                  {item.role}
                </p>
                <div className="pt-2 body-sm text-[#777169] flex flex-col gap-0.5">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <span className="caption-uppercase text-[#777169] block">
                  Core Responsibilities &amp; Impact
                </span>
                <ul className="space-y-2.5">
                  {item.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 body-sm leading-relaxed text-[#4e4e4e]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0c0a09] mt-2 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {item.techStack && (
                  <div className="pt-3 flex flex-wrap gap-1.5">
                    {item.techStack.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
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
      <section className="pt-12 border-t border-[#e7e5e4] space-y-8">
        <div>
          <span className="caption-uppercase text-[#777169] block mb-2">
            06 / LEADERSHIP &amp; COMMUNITY
          </span>
          <h2 className="display-lg text-[#0c0a09]">
            {leadershipContent.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipContent.roles.map((role, idx) => (
            <Surface key={role.organization} variant="card" padding="lg" className="space-y-6">
              <div>
                <span className="caption-uppercase text-[#777169] block mb-1">
                  0{idx + 1} • {role.period}
                </span>
                <h3 className="display-sm text-[#0c0a09]">
                  {role.organization}
                </h3>
                <p className="body-strong text-[#292524] mt-1">
                  {role.role}
                </p>
                <p className="caption text-[#777169] mt-0.5">
                  {role.scope}
                </p>
              </div>

              <ul className="space-y-2 pt-2 border-t border-[#e7e5e4]">
                {role.contributions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 body-sm text-[#4e4e4e]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0c0a09] mt-2 shrink-0" />
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
