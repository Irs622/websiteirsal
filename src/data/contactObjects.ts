/**
 * "Cut-out" detail objects for the contact assemble sequence. Each is a region
 * (fractional rect) of the contact painting; the sequence flies them in and
 * they reconstruct the full still life. Stored here per spec.
 */
export interface ContactObject {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const contactPainting = 'de-heem-festoon';

export const contactObjects: ContactObject[] = [
  { label: 'BLOOM', x: 0.34, y: 0.05, w: 0.17, h: 0.13 },
  { label: 'ROSE', x: 0.13, y: 0.19, w: 0.16, h: 0.13 },
  { label: 'TULIP', x: 0.58, y: 0.15, w: 0.16, h: 0.13 },
  { label: 'PETAL', x: 0.40, y: 0.30, w: 0.17, h: 0.13 },
  { label: 'LEAF', x: 0.19, y: 0.44, w: 0.16, h: 0.13 },
  { label: 'FRUIT', x: 0.61, y: 0.42, w: 0.17, h: 0.14 },
  { label: 'GRAPE', x: 0.35, y: 0.56, w: 0.17, h: 0.13 },
  { label: 'BUD', x: 0.13, y: 0.66, w: 0.16, h: 0.13 },
  { label: 'STEM', x: 0.60, y: 0.66, w: 0.16, h: 0.13 },
  { label: 'SHELL', x: 0.37, y: 0.80, w: 0.19, h: 0.14 }
];
