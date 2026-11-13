import {
  boxCorners, corners, cylinder, depthOf, fitProjection, insetPlan,
  lineOnTop, planOutline, radialTicks, ring, segment, sideArc,
  sideSeam, slabOf, topMatrix, topTicks, translateAlong,
  type Plan, type Plane, type SolidPaths
} from '../utils/isoKit';

/**
 * FIGURE / concept, before geometry:
 * A compact talking-book player: its speaker is paired with a paper reading
 * window. One graphite playhead slides along that window as the illustrative
 * position changes. This is a tactile metaphor, not a working audio player.
 *
 * Parts plan (74 solids, plus engraved/inlaid details):
 * chassis: 4 foot pads + 4 collars, lower shell, gasket, lid, 4 lid screws (15);
 * speaker: seat, bezel, grille, 11 closed grille slots, 4 screws (18);
 * reader: recess, liner, paper, 2 retaining clips + 2 screws, 2 guides,
 *   2 end stops, ruler, 2 ruler screws (14);
 * moving head: 2 shoes, bridge, graphite index (4);
 * transport: 3 key seats + 3 caps + 3 tactile locator dots (9);
 * scrub wheel: seat, knurled rim, cap, spindle (4);
 * identity plate + 2 rivets, 2 hinges + 2 hinge pins, 3 closed vents (10).
 * The generated count below is also exposed on the figure for inspection.
 * No exposed cable routing: every assembly lands on the lid or its own seat.
 */

export const AUDIO_WIDTH = 760;
export const AUDIO_HEIGHT = 440;
export const AUDIO_INITIAL_POSITION = 32;
const BODY: Plan = { x: -142, y: -85, w: 284, d: 170, r: 15 };
export const AUDIO_PROJECTION = fitProjection(
  boxCorners(BODY, -8, 48), AUDIO_WIDTH, AUDIO_HEIGHT,
  { pad: 58, azimuth: 58, elevation: 38 }
);
const P = AUDIO_PROJECTION;
export type AudioMaterial = 'shell' | 'metal' | 'paper' | 'recess' | 'rubber' | 'lit';
export interface AudioPart {
  name: string;
  paths: SolidPaths;
  material: AudioMaterial;
  details?: string;
  engraving?: string;
}
const part = (name: string, paths: SolidPaths, material: AudioMaterial = 'shell', details?: string): AudioPart =>
  ({ name, paths, material, details });
const slab = (plan: Plan, z: number, h: number, bevel = 0.5) => slabOf(plan, z, h, P, 8, bevel);
const disc = (x: number, y: number, r: number, z: number, h: number) => cylinder(x, y, r, z, h, P, 72, 0.35);
const line = (a: Plane, b: Plane, z: number) => lineOnTop(a, b, z, P);
const screw = (name: string, x: number, y: number, z: number, r = 1.65) =>
  part(name, disc(x, y, r, z, 0.6), 'metal', line([x - r * 0.55, y], [x + r * 0.55, y], z + 0.6));
const byDepth = (points: Plane[]) => [...points].sort((a, b) => depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P));

export const AUDIO_SHADOW = planOutline({ ...BODY, x: BODY.x + 3, y: BODY.y + 4 }, -8, P);
export const AUDIO_CHASSIS: AudioPart[] = [];
for (const [i, [x, y]] of byDepth(corners(BODY, 23)).entries()) {
  AUDIO_CHASSIS.push(part(`foot-${i}`, disc(x, y, 9, -8, 5), 'rubber'));
  AUDIO_CHASSIS.push(part(`foot-collar-${i}`, disc(x, y, 7, -3, 3), 'metal'));
}
AUDIO_CHASSIS.push(
  part('lower-shell', slab(BODY, 0, 19, 1.2), 'shell', sideSeam(BODY, 6, P)),
  part('lid-gasket', slab(insetPlan(BODY, 0.7), 19, 1.5), 'rubber'),
  part('lid', slab(BODY, 20.5, 4.5, 1.1), 'paper', planOutline(insetPlan(BODY, 4), 25, P))
);
for (const [i, [x, y]] of corners(BODY, 10).entries()) AUDIO_CHASSIS.push(screw(`lid-screw-${i}`, x, y, 25));

// The speaker reads as a real shallow grille, not a waveform or an invented meter.
const SPEAKER: Plane = [-78, -17];
export const AUDIO_SPEAKER: AudioPart[] = [
  part('speaker-seat', disc(...SPEAKER, 46, 25, 1.5), 'metal'),
  part('speaker-bezel', disc(...SPEAKER, 43.5, 26.5, 2), 'shell'),
  part('speaker-grille', disc(...SPEAKER, 40.5, 28.5, 0.7), 'paper', ring(...SPEAKER, 38, 29.2, P))
];
for (let i = -5; i <= 5; i++) {
  const y = SPEAKER[1] + i * 5.7;
  const half = Math.sqrt(34 * 34 - (i * 5.7) ** 2);
  AUDIO_SPEAKER.push(part(`speaker-slot-${i + 5}`, slab({ x: SPEAKER[0] - half, y: y - 0.85, w: half * 2, d: 1.7, r: 0.85 }, 29.2, 0.12, 0), 'recess'));
}
for (const [i, angle] of [45, 135, 225, 315].entries()) {
  const a = angle * Math.PI / 180;
  AUDIO_SPEAKER.push(screw(`speaker-screw-${i}`, SPEAKER[0] + Math.cos(a) * 42, SPEAKER[1] + Math.sin(a) * 42, 28.5, 1.1));
}

const WINDOW: Plan = { x: -15, y: -65, w: 132, d: 79, r: 5 };
const PAPER: Plan = { x: -9, y: -59, w: 120, d: 67, r: 2 };
export const AUDIO_READER: AudioPart[] = [
  part('reading-window-seat', slab(WINDOW, 25, 1.2), 'metal'),
  part('reading-window-liner', slab(insetPlan(WINDOW, 2), 26.2, 0.8), 'recess'),
  part('reading-paper', slab(PAPER, 27, 0.5, 0), 'paper')
];
// These rules stand for an illustrative passage, never claimed to be app content.
AUDIO_READER[2].engraving = Array.from({ length: 8 }, (_, row) => {
  const y = -50 + row * 6.8;
  return [line([0, y], [33, y], 27.5), line([39, y], [row === 7 ? 79 : 101, y], 27.5)].join('');
}).join('');
for (const [i, x] of [-12, 109].entries()) {
  AUDIO_READER.push(part(`paper-clip-${i}`, slab({ x, y: -39, w: 5, d: 19, r: 1 }, 27.5, 1.2), 'metal'));
  AUDIO_READER.push(screw(`paper-clip-screw-${i}`, x + 2.5, -29.5, 28.7, 1.1));
}
for (const [i, y] of [-63, 11].entries()) {
  AUDIO_READER.push(part(`head-guide-${i}`, slab({ x: -10, y, w: 122, d: 2.2, r: 1.1 }, 27, 2.2), 'metal'));
}
for (const [i, x] of [-14, 112].entries()) {
  AUDIO_READER.push(part(`guide-end-stop-${i}`, slab({ x, y: -65, w: 4, d: 80, r: 1 }, 26.2, 4.4), 'shell'));
}
const RULER: Plan = { x: -9, y: 17, w: 120, d: 7, r: 1 };
const rulerTicks = topTicks(-4, 106, 5, 5, 17, 26, [2, 4], P);
AUDIO_READER.push(part('position-ruler', slab(RULER, 25, 1), 'metal', rulerTicks.minor + rulerTicks.major));
AUDIO_READER.push(screw('ruler-left-screw', -6, 21, 26, 0.9), screw('ruler-right-screw', 108, 21, 26, 0.9));

// The head is built once at x=0. Its shoes sit on the two real guides.
export const AUDIO_HEAD: AudioPart[] = [
  part('rear-guide-shoe', slab({ x: -3.4, y: -64, w: 6.8, d: 4.2, r: 1 }, 29.2, 2.8), 'metal'),
  part('front-guide-shoe', slab({ x: -3.4, y: 10, w: 6.8, d: 4.2, r: 1 }, 29.2, 2.8), 'metal'),
  part('reading-bridge', slab({ x: -1.7, y: -64, w: 3.4, d: 78.2, r: 0.8 }, 32, 1.4), 'shell'),
  part('playhead-index', slab({ x: -2.5, y: 14.2, w: 5, d: 9, r: 1 }, 32, 1.4), 'lit')
];
export const headTransform = (percent: number) => translateAlong(P, [percent * 1.02, 0, 0]);

export const AUDIO_TRANSPORT: AudioPart[] = [];
export const AUDIO_KEY_ICONS: { transform: string; kind: 'play' | 'back' | 'next' }[] = [];
for (const [i, x] of [-92, -55, -18].entries()) {
  const r = i === 0 ? 13 : 10;
  AUDIO_TRANSPORT.push(part(`transport-seat-${i}`, disc(x, 52, r + 2, 25, 1.4), 'metal'));
  AUDIO_TRANSPORT.push(part(`transport-key-${i}`, disc(x, 52, r, 26.4, 4.2), 'shell', ring(x, 52, r - 1.7, 30.6, P)));
  AUDIO_TRANSPORT.push(part(`tactile-locator-${i}`, disc(x, 52 + r - 4, 0.85, 30.6, 0.7), 'metal'));
  AUDIO_KEY_ICONS.push({ transform: topMatrix([x, 52], 30.65, P), kind: i === 0 ? 'play' : i === 1 ? 'back' : 'next' });
}

const WHEEL: Plane = [86, 53];
export const AUDIO_WHEEL: AudioPart[] = [
  part('scrub-wheel-seat', disc(...WHEEL, 22, 25, 1.5), 'metal'),
  part('scrub-wheel-rim', disc(...WHEEL, 18.5, 26.5, 7), 'shell'),
  part('scrub-wheel-cap', disc(...WHEEL, 16, 33.5, 1.2), 'paper'),
  part('scrub-wheel-spindle', disc(...WHEEL, 2.2, 34.7, 0.7), 'metal')
];
// Full-height knurls end on the actual rim seams, not in mid-surface.
AUDIO_WHEEL[1].details = Array.from({ length: 64 }, (_, i) => {
  const a = i / 64 * Math.PI * 2;
  if (Math.cos(a) * Math.cos(58 * Math.PI / 180) + Math.sin(a) * Math.sin(58 * Math.PI / 180) < 0.15) return '';
  return segment([86 + 18.5 * Math.cos(a), 53 + 18.5 * Math.sin(a), 26.5], [86 + 18.5 * Math.cos(a), 53 + 18.5 * Math.sin(a), 33.5], P);
}).join('') + sideArc(...WHEEL, 18.5, 33.5, P);
AUDIO_WHEEL[2].details = ring(...WHEEL, 14, 34.7, P) + radialTicks(...WHEEL, 14, 32, 4, 34.7, [1.3, 2.7], P).minor + radialTicks(...WHEEL, 14, 32, 4, 34.7, [1.3, 2.7], P).major;
export const wheelPointer = (percent: number) => {
  const angle = (-140 + percent * 2.8) * Math.PI / 180;
  return line([86 + 5 * Math.sin(angle), 53 - 5 * Math.cos(angle)], [86 + 12 * Math.sin(angle), 53 - 12 * Math.cos(angle)], 34.8);
};

const LABEL: Plan = { x: -107, y: -76, w: 57, d: 10, r: 1.3 };
export const AUDIO_FINISH: AudioPart[] = [
  part('identity-plate', slab(LABEL, 25, 0.6), 'metal'),
  screw('identity-left-rivet', -104, -71, 25.6, 0.8),
  screw('identity-right-rivet', -53, -71, 25.6, 0.8)
];
for (const [i, x] of [-118, 112].entries()) {
  AUDIO_FINISH.push(part(`lid-hinge-${i}`, slab({ x, y: -84, w: 10, d: 5, r: 1 }, 25, 2), 'metal'));
  AUDIO_FINISH.push(part(`hinge-pin-${i}`, slab({ x: x - 1, y: -84, w: 12, d: 2, r: 1 }, 27, 1.5), 'shell'));
}
for (let i = 0; i < 3; i++) AUDIO_FINISH.push(part(`closed-vent-${i}`, slab({ x: 123, y: -37 + i * 9, w: 6, d: 2.4, r: 1.2 }, 25, 0.15, 0), 'recess'));
export const AUDIO_LABEL_MATRIX = topMatrix([-78.5, -70.8], 25.7, P);
export const AUDIO_PART_COUNT = [AUDIO_CHASSIS, AUDIO_SPEAKER, AUDIO_READER, AUDIO_HEAD, AUDIO_TRANSPORT, AUDIO_WHEEL, AUDIO_FINISH].reduce((sum, parts) => sum + parts.length, 0);
export const AUDIO_HEAD_REST = headTransform(AUDIO_INITIAL_POSITION);
export const AUDIO_WHEEL_REST = wheelPointer(AUDIO_INITIAL_POSITION);

