import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MapPin, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { Button } from '../components/ui/Button';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Get in Touch | LM. Irsal Shydiq';
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard permissions are restricted
      setCopied(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 px-6 sm:px-8 max-w-[1000px] mx-auto min-h-screen">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[14px] text-[#777169] hover:text-[#0C0A09] transition-colors py-1.5 px-3 -ml-3 rounded-full hover:bg-black/[0.03]"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <header className="mb-14 space-y-4 max-w-2xl">
        <span className="label-editorial text-[#777169] block">
          07 / CONTACT &amp; COLLABORATION
        </span>

        <h1 className="display-hero text-[#0C0A09]">
          Have something meaningful to build?
        </h1>

        <p className="body-editorial text-[18px] text-[#777169] leading-relaxed">
          I am currently open to engineering roles, technical advisory, research collaborations, and purpose-driven software projects.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
        {/* Left: Email dispatch card (7 cols) */}
        <div className="md:col-span-7 bg-[#FFFFFF] border border-[#E7E5E4] rounded-[24px] p-8 sm:p-10 space-y-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
          <div>
            <span className="label-editorial text-[#777169] block mb-2">
              Primary Channel
            </span>
            <h3 className="font-display text-[26px] font-light text-[#0C0A09]">
              Direct Email
            </h3>
            <p className="text-[14px] text-[#777169] mt-1">
              For project inquiries, technical roles, or academic dialogue.
            </p>
          </div>

          <div className="p-4 bg-[#FAFAFA] border border-[#E7E5E4] rounded-[16px] flex items-center justify-between gap-4">
            <span className="font-mono text-[15px] text-[#0C0A09] break-all">
              {personalInfo.email}
            </span>
            <button
              onClick={handleCopyEmail}
              className="shrink-0 p-2 rounded-full border border-[#E7E5E4] bg-[#FFFFFF] text-[#4E4E4E] hover:text-[#0C0A09] hover:border-[#D6D3D1] transition-colors cursor-pointer"
              aria-label="Copy email address"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            </button>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`mailto:${personalInfo.email}?subject=Project%20Collaboration%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
              className="inline-block"
            >
              <Button variant="primary" size="md" icon={<ArrowUpRight size={14} />}>
                Launch Mail Client
              </Button>
            </a>
          </div>
        </div>

        {/* Right: Channels & Base (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[20px] p-6 space-y-3">
            <span className="label-editorial text-[#777169] block">
              Profiles &amp; Repositories
            </span>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-[12px] hover:bg-[#FAFAFA] transition-colors border border-transparent hover:border-[#E7E5E4]"
            >
              <div className="flex items-center gap-3">
                <GithubIcon size={18} className="text-[#0C0A09]" />
                <span className="text-[14px] font-medium text-[#0C0A09]">GitHub</span>
              </div>
              <ArrowUpRight size={14} className="text-[#777169]" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-[12px] hover:bg-[#FAFAFA] transition-colors border border-transparent hover:border-[#E7E5E4]"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon size={18} className="text-[#0C0A09]" />
                <span className="text-[14px] font-medium text-[#0C0A09]">LinkedIn</span>
              </div>
              <ArrowUpRight size={14} className="text-[#777169]" />
            </a>
          </div>

          <div className="bg-[#FAFAFA] border border-[#E7E5E4] rounded-[20px] p-6">
            <span className="label-editorial text-[#777169] block mb-2">Location &amp; Time</span>
            <div className="flex items-center gap-2 text-[14px] text-[#0C0A09] font-medium mb-1">
              <MapPin size={15} />
              <span>Bandung, West Java, Indonesia</span>
            </div>
            <p className="text-[13px] text-[#777169]">
              UTC+7 (Western Indonesia Time) • Remote worldwide collaboration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
