import { useEffect, useState } from 'react';

export interface DetectionBox {
  /** Normalised [0..1] box within the source image. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** 0..1 salience score. */
  score: number;
  label: string;
}

const LABELS = ['BLOOM', 'PETAL', 'ROSE', 'TULIP', 'LEAF', 'FRUIT', 'STEM', 'BUD'];

/**
 * Compute salient regions of an image entirely client-side:
 *  1. downsample to ~COLS columns on a canvas,
 *  2. score each cell by colour distance from the border-average colour
 *     (the subject stands out from the dark ground) plus local edge strength,
 *  3. threshold at a high quantile,
 *  4. flood-fill connected components and take their bounding boxes,
 *  5. return the top-scoring boxes (normalised) with labels + scores.
 *
 * Fails silently (returns []) if the canvas is tainted or the image can't load.
 */
async function detect(src: string, cols = 48): Promise<DetectionBox[]> {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';
  const loaded = new Promise<boolean>((res) => {
    img.onload = () => res(true);
    img.onerror = () => res(false);
  });
  img.src = src;
  if (!(await loaded)) return [];

  const rows = Math.max(8, Math.round((cols * img.height) / img.width));
  const canvas = document.createElement('canvas');
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, cols, rows);

  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, cols, rows).data;
  } catch {
    return [];
  }

  const idx = (x: number, y: number) => (y * cols + x) * 4;
  const lum = (x: number, y: number) => {
    const i = idx(x, y);
    return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  };

  // Border-average colour (the ground the subject sits on).
  let br = 0, bg = 0, bb = 0, bn = 0;
  for (let x = 0; x < cols; x++) {
    for (const y of [0, rows - 1]) {
      const i = idx(x, y);
      br += data[i]; bg += data[i + 1]; bb += data[i + 2]; bn++;
    }
  }
  for (let y = 0; y < rows; y++) {
    for (const x of [0, cols - 1]) {
      const i = idx(x, y);
      br += data[i]; bg += data[i + 1]; bb += data[i + 2]; bn++;
    }
  }
  br /= bn; bg /= bn; bb /= bn;

  // Per-cell salience.
  const score = new Float32Array(cols * rows);
  let maxScore = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = idx(x, y);
      const dr = data[i] - br, dg = data[i + 1] - bg, db = data[i + 2] - bb;
      const colorDist = Math.sqrt(dr * dr + dg * dg + db * db) / 441.67; // 0..1
      const gx =
        x > 0 && x < cols - 1 ? Math.abs(lum(x + 1, y) - lum(x - 1, y)) : 0;
      const gy =
        y > 0 && y < rows - 1 ? Math.abs(lum(x, y + 1) - lum(x, y - 1)) : 0;
      const edge = Math.min(1, Math.sqrt(gx * gx + gy * gy) / 255);
      const s = colorDist * 0.72 + edge * 0.28;
      score[y * cols + x] = s;
      if (s > maxScore) maxScore = s;
    }
  }

  // Threshold at ~0.8 quantile.
  const sorted = Array.from(score).sort((a, b) => a - b);
  const threshold = sorted[Math.floor(sorted.length * 0.8)] || 0;

  // Connected components (4-neighbour flood fill).
  const visited = new Uint8Array(cols * rows);
  const boxes: DetectionBox[] = [];
  const stack: number[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const start = y * cols + x;
      if (visited[start] || score[start] < threshold) continue;
      let minX = x, maxX = x, minY = y, maxY = y, sum = 0, count = 0, peak = 0;
      stack.length = 0;
      stack.push(start);
      visited[start] = 1;
      while (stack.length) {
        const p = stack.pop()!;
        const px = p % cols;
        const py = (p / cols) | 0;
        sum += score[p];
        peak = Math.max(peak, score[p]);
        count++;
        minX = Math.min(minX, px); maxX = Math.max(maxX, px);
        minY = Math.min(minY, py); maxY = Math.max(maxY, py);
        const neighbours = [p - 1, p + 1, p - cols, p + cols];
        const edges = [px > 0, px < cols - 1, py > 0, py < rows - 1];
        for (let n = 0; n < 4; n++) {
          if (!edges[n]) continue;
          const q = neighbours[n];
          if (!visited[q] && score[q] >= threshold) {
            visited[q] = 1;
            stack.push(q);
          }
        }
      }
      if (count < 3) continue; // ignore specks
      boxes.push({
        x: minX / cols,
        y: minY / rows,
        w: (maxX - minX + 1) / cols,
        h: (maxY - minY + 1) / rows,
        score: peak,
        label: ''
      });
    }
  }

  boxes.sort((a, b) => b.score - a.score);
  return boxes.slice(0, 6).map((b, i) => ({
    ...b,
    label: `${String(i + 1).padStart(2, '0')} ${LABELS[i % LABELS.length]}`
  }));
}

/** React hook wrapper around `detect`, computed once per src. */
export function useDetectionBoxes(src: string): DetectionBox[] {
  const [boxes, setBoxes] = useState<DetectionBox[]>([]);
  useEffect(() => {
    let alive = true;
    detect(src).then((b) => {
      if (alive) setBoxes(b);
    });
    return () => {
      alive = false;
    };
  }, [src]);
  return boxes;
}
