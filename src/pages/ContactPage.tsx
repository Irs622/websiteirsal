import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MapPin, Copy, Check, Phone, FileText } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { Button } from '../components/ui/Button';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Inquiries & Contact | LM. Irsal Shydiq';
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

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

      <header className="mb-12 space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 font-mono text-[12px] text-[#6e6b65]">
          <span>08</span>
          <span>&bull;</span>
          <span>INQUIRIES &amp; DISPATCH</span>
        </div>

        <h1 className="display-mega text-[#141413]">
          Initiate dialogue or engineering inquiry.
        </h1>

        <p className="body-md text-[17px] text-[#6e6b65] leading-relaxed">
          I am currently open to software engineering internships, technical collaborations, and research inquiries across full-stack systems and accessible technology.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left: Email dispatch ledger (7 cols) */}
        <div className="lg:col-span-7 bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6 sm:p-8 space-y-5">
          <div>
            <span className="caption-uppercase text-[#6e6b65] block mb-1">
              Primary Channel
            </span>
            <h3 className="title-md text-[#141413]">
              Direct Email Dispatch
            </h3>
            <p className="caption text-[#6e6b65] mt-0.5">
              For engineering roles, project inquiries, or academic research collaboration.
            </p>
          </div>

          <div className="p-3.5 bg-[#f5f4f0] border border-[#e5e2dc] rounded-sm flex items-center justify-between gap-4 font-mono text-[13px]">
            <span className="text-[#141413] break-all">
              {personalInfo.email}
            </span>
            <button
              onClick={handleCopyEmail}
              className="shrink-0 p-1.5 rounded-sm border border-[#e5e2dc] bg-[#ffffff] text-[#44423e] hover:text-[#141413] hover:border-[#d0ccc3] transition-colors cursor-pointer"
              aria-label="Copy email address"
            >
              {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
              className="inline-block"
            >
              <Button variant="primary" size="md" icon={<ArrowUpRight size={14} />}>
                Launch Mail Client
              </Button>
            </a>
            <Link to="/cv" className="inline-block">
              <Button variant="outline" size="md" icon={<FileText size={14} />}>
                Curriculum Vitae
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: Profiles & Base (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-5 space-y-3">
            <span className="caption-uppercase text-[#6e6b65] block">
              Direct Contact &amp; Networks
            </span>

            <a
              href={`tel:${personalInfo.phone.replace(/[\s-]/g, '')}`}
              className="flex items-center justify-between p-2.5 rounded-sm hover:bg-[#f5f4f0] transition-colors border border-transparent hover:border-[#e5e2dc]"
            >
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#141413]" />
                <span className="font-mono text-[13px] text-[#141413]">{personalInfo.phone}</span>
              </div>
              <ArrowUpRight size={13} className="text-[#6e6b65]" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-sm hover:bg-[#f5f4f0] transition-colors border border-transparent hover:border-[#e5e2dc]"
            >
              <div className="flex items-center gap-2.5">
                <GithubIcon size={16} className="text-[#141413]" />
                <span className="font-mono text-[13px] text-[#141413]">github.com/irs622</span>
              </div>
              <ArrowUpRight size={13} className="text-[#6e6b65]" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-sm hover:bg-[#f5f4f0] transition-colors border border-transparent hover:border-[#e5e2dc]"
            >
              <div className="flex items-center gap-2.5">
                <LinkedinIcon size={16} className="text-[#141413]" />
                <span className="font-mono text-[13px] text-[#141413]">linkedin.com/in/irsalshydiq</span>
              </div>
              <ArrowUpRight size={13} className="text-[#6e6b65]" />
            </a>
          </div>

          <div className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-5 space-y-1 font-mono text-[12px]">
            <span className="caption-uppercase text-[#9c9890] block text-[10px]">Location &amp; Coordinates</span>
            <div className="flex items-center gap-2 font-medium text-[#141413] text-[13px] pt-1">
              <MapPin size={13} />
              <span>Bandung, West Java, Indonesia</span>
            </div>
            <p className="caption text-[#6e6b65] text-[11px] pt-1">
              UTC+7 (WIB) &bull; Open to remote and hybrid arrangements worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
