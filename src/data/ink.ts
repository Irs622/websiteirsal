/**
 * Background "ink" passages for the hero canvas and the Contact section.
 * Rendered as tiny monospace text in cloud-shaped blobs; text near the
 * cursor becomes more opaque. Purely decorative: mark the canvas
 * aria-hidden. Edit freely; keep each passage roughly 40-70 words.
 */
export const inkPassages: string[] = [
  "Software is used by people who never asked how it was built. Someone listening through a screen reader at night, on a slow connection, with a battery at nine percent, does not care about the stack. They care that the button says what it does, that the audio starts when they press play, and that nothing on the page moves without a reason.",

  "Accessibility is not a feature added at the end. It is a constraint taken seriously from the first data model: every interactive element has a name, every state can be reached by keyboard, every sound can be paused. Designing for the person with the fewest options usually produces the clearest system for everyone else.",

  "I prefer deterministic systems over clever ones. A clean schema, a predictable state machine, a cache that still works offline. Ornament can be added later; a wrong foundation cannot be repaired by styling. Good engineering is mostly the quiet work of removing uncertainty until the only thing left is what the user came to do.",
];
