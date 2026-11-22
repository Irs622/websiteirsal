/**
 * noWidows — typographic polish.
 *
 * Joins the last two words of a string with a non-breaking space so a single
 * trailing word can never wrap alone onto its own line (a "widow"). Use on
 * headings and short paragraphs.
 *
 *   noWidows('Building technology with purpose')
 *   // => 'Building technology with purpose'
 *
 * Safe on empty / single-word strings (returned unchanged) and collapses only
 * the final gap, leaving the rest of the text untouched.
 */
const NBSP = ' ';

export function noWidows(text: string): string {
  if (!text) return text;
  const trimmedEnd = text.replace(/\s+$/, '');
  const lastSpace = trimmedEnd.lastIndexOf(' ');
  if (lastSpace === -1) return text;
  return trimmedEnd.slice(0, lastSpace) + NBSP + trimmedEnd.slice(lastSpace + 1);
}
