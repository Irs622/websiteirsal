import React from 'react';
import { DetectionBox } from './useDetectionBoxes';

interface DetectionTileProps {
  box: DetectionBox;
  src: string;
  /** width / height of the source painting. */
  ratio: number;
  width: number;
}

/* A "detected object" crop: a zoomed region of a floral painting with a blue
   detection box + label + score. Purely decorative (aria-hidden). */
export function DetectionTile({ box, src, ratio, width }: DetectionTileProps) {
  const tile = width;
  const zoom = 0.62;

  const dispW = (zoom * tile) / Math.max(0.04, box.w);
  const dispH = dispW / ratio;
  const centerX = (box.x + box.w / 2) * dispW;
  const centerY = (box.y + box.h / 2) * dispH;
  const imgLeft = tile / 2 - centerX;
  const imgTop = tile / 2 - centerY;

  const boxW = box.w * dispW;
  const boxH = box.h * dispH;
  const boxLeft = tile / 2 - boxW / 2;
  const boxTop = tile / 2 - boxH / 2;

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden bg-[#0b0b0b] select-none"
      style={{ width: tile, height: tile }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="absolute max-w-none pointer-events-none"
        style={{ left: imgLeft, top: imgTop, width: dispW, height: dispH }}
      />
      <div
        className="absolute border border-[#3d4bff]"
        style={{ left: boxLeft, top: boxTop, width: boxW, height: boxH }}
      >
        <span
          className="annotation-tag"
          style={{ position: 'absolute', top: 0, left: 0, transform: 'translateY(-100%)' }}
        >
          {box.label} {box.score.toFixed(2)}
        </span>
      </div>
      <span className="absolute bottom-1.5 right-1.5 font-mono text-[9px] tracking-[0.08em] text-white/60 uppercase">
        Detect
      </span>
    </div>
  );
}
