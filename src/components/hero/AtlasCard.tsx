import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { AtlasItem } from './atlasData';

interface AtlasCardProps {
  item: AtlasItem;
  width: number;
  /** Guard: if the atlas was dragged, suppress navigation on click. */
  onNavigate?: (e: React.MouseEvent) => void;
  tabable?: boolean;
}

/* A single atlas card. Project cards with an image show a thumbnail; otherwise
   a typographic "spec card" (title, subtitle, tech in mono). Every card wears a
   blue annotation tag + 1px blue frame. */
export function AtlasCard({ item, width, onNavigate, tabable = true }: AtlasCardProps) {
  const compact = width < 220;

  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      draggable={false}
      tabIndex={tabable ? 0 : -1}
      aria-label={`${item.kind === 'project' ? 'Project' : 'Research'}: ${item.title}`}
      className="annotation-frame group relative block bg-white text-[#0b0b0b] no-underline transition-[outline-color,box-shadow] hover:shadow-[0_8px_30px_rgba(11,11,11,0.10)] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#3d4bff] focus-visible:outline-offset-2"
      style={{ width }}
    >
      <span className="annotation-tag annotation-tag--tl">{item.tag}</span>

      {item.kind === 'project' && item.image ? (
        <div className="overflow-hidden bg-[#ecece8]" style={{ aspectRatio: '4 / 3' }}>
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            draggable={false}
          />
        </div>
      ) : (
        <div className={`${compact ? 'p-3' : 'p-4'} flex flex-col gap-2`}>
          <h3
            className={`font-sans font-medium tracking-[-0.01em] leading-tight ${
              compact ? 'text-[14px]' : 'text-[17px]'
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`text-[#6b6b66] leading-snug ${
              compact ? 'text-[11px] line-clamp-2' : 'text-[12.5px] line-clamp-3'
            }`}
          >
            {item.kind === 'project' ? item.subtitle : item.description}
          </p>
          {(item.kind === 'project' ? item.techStack : [item.category]).length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {(item.kind === 'project'
                ? item.techStack.slice(0, compact ? 2 : 4)
                : [item.category]
              ).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[9px] uppercase tracking-[0.06em] text-[#6b6b66] border border-[#e2e2de] px-1.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Caption row */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-[#e2e2de]">
        <span className={`truncate font-medium ${compact ? 'text-[11px]' : 'text-[12.5px]'}`}>
          {item.title}
        </span>
        <ArrowUpRight
          size={compact ? 12 : 14}
          className="shrink-0 text-[#6b6b66] group-hover:text-[#3d4bff] transition-colors"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
