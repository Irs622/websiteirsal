/**
 * Public-domain Dutch/Flemish floral still lifes used as decorative imagery.
 * Sourced from Wikimedia Commons (all works pre-1800, public domain).
 * Each has an AVIF + WebP variant in /public/art (long edge ≤ 2400px).
 * Credited in the footer — see `artCredits`.
 */
export interface ArtPiece {
  slug: string;
  artist: string;
  title: string;
  date: string;
  /** width / height of the source painting. */
  ratio: number;
  source: string;
}

export const artPieces: ArtPiece[] = [
  {
    slug: 'ruysch-flowers',
    artist: 'Rachel Ruysch',
    title: 'Still Life with Flowers',
    date: 'c. 1700',
    ratio: 3559 / 4585,
    source: 'Wikimedia Commons (public domain)'
  },
  {
    slug: 'huysum-flowers',
    artist: 'Jan van Huysum',
    title: 'Vase of Flowers',
    date: 'c. 1720',
    ratio: 3840 / 5041,
    source: 'Wikimedia Commons (public domain)'
  },
  {
    slug: 'de-heem-festoon',
    artist: 'Jan Davidsz. de Heem',
    title: 'Festoon of Fruit and Flowers',
    date: 'c. 1660',
    ratio: 3840 / 4792,
    source: 'Rijksmuseum via Wikimedia Commons (public domain)'
  },
  {
    slug: 'ruysch-forest',
    artist: 'Rachel Ruysch',
    title: 'Vase of Flowers',
    date: 'c. 1700',
    ratio: 3724 / 4741,
    source: 'Mauritshuis via Wikimedia Commons (public domain)'
  }
];

export const artBySlug = Object.fromEntries(artPieces.map((p) => [p.slug, p]));

export function artSrc(slug: string, ext: 'avif' | 'webp') {
  return `/art/${slug}.${ext}`;
}

/** Responsive srcset (1200w + 2400w) for a painting. */
export function artSrcset(slug: string, ext: 'avif' | 'webp') {
  return `/art/${slug}-1200.${ext} 1200w, /art/${slug}.${ext} 2400w`;
}

/** Short credit line for the footer. */
export const artCredits =
  'Artwork: public-domain still lifes by Rachel Ruysch, Jan van Huysum & Jan Davidsz. de Heem (Wikimedia Commons).';
