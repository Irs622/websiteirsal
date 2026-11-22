/**
 * Real pre-cut (transparent) detail objects for the contact assemble sequence,
 * derived from public/art/cutouts/manifest.json. Coordinates are fractions of
 * the van Huysum master, so placing each cutout at (x,y,w,h) over the full
 * painting reconstructs the still life exactly.
 */
export interface ContactObject {
  id: string;
  label: string;
  file: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const contactPainting = 'van-huysum-still-life';

export const contactObjects: ContactObject[] = [
  { id: '0101', label: '0101 TULIP', file: '/art/cutouts/0101-tulip.webp', x: 0.2313, y: 0.0731, w: 0.2067, h: 0.1896 },
  { id: '0102', label: '0102 POPPY', file: '/art/cutouts/0102-poppy.webp', x: 0.5767, y: 0.0318, w: 0.2171, h: 0.1372 },
  { id: '0104', label: '0104 ANEMONE', file: '/art/cutouts/0104-anemone.webp', x: 0.4658, y: 0.372, w: 0.1417, h: 0.0772 },
  { id: '0105', label: '0105 ROSES', file: '/art/cutouts/0105-roses.webp', x: 0.1379, y: 0.5127, w: 0.2729, h: 0.1922 },
  { id: '0106', label: '0106 MARIGOLD', file: '/art/cutouts/0106-marigold.webp', x: 0.1925, y: 0.4441, w: 0.0854, h: 0.0661 },
  { id: '0107', label: '0107 CARNATION', file: '/art/cutouts/0107-carnation.webp', x: 0.0825, y: 0.3253, w: 0.1437, h: 0.1223 },
  { id: '0108', label: '0108 GRAPES', file: '/art/cutouts/0108-grapes.webp', x: 0.5092, y: 0.6896, w: 0.2579, h: 0.1398 },
  { id: '0109', label: '0109 PEACH', file: '/art/cutouts/0109-peach.webp', x: 0.6633, y: 0.7881, w: 0.1446, h: 0.1017 },
  { id: '0110', label: '0110 PEACH', file: '/art/cutouts/0110-peach.webp', x: 0.8717, y: 0.8018, w: 0.0896, h: 0.0734 },
  { id: '0111', label: '0111 ROSEBUD', file: '/art/cutouts/0111-rosebud.webp', x: 0.4637, y: 0.8818, w: 0.0708, h: 0.0556 }
];
