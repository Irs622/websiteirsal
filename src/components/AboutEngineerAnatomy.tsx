import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  boxCorners,
  coil,
  corners,
  cylinder,
  depthOf,
  fitProjection,
  haloOf,
  insetPlan,
  iso,
  knurl,
  lineOnTop,
  onTop,
  pathOf,
  planOutline,
  ring,
  roundedPlan,
  segment,
  sideArc,
  sideMatrix,
  sideSeam,
  slabOf,
  topTicks,
  translateAlong,
  type Flat,
  type LineTone,
  type Plan,
  type Point3,
  type SolidPaths,
  type Tone
} from '../utils/isoKit';

// ============================================================================
// ANATOMY REACT DRAWING PRIMITIVES (wheresryan22/anatomy craft specification)
// ============================================================================

type MaterialColor = 'sand' | 'sage' | 'forest';

const MATERIAL_PALETTES: Record<
  MaterialColor,
  {
    fill: string;
    top: string;
    shades: [string, string, string, string];
    edge: string;
    crease: string;
  }
> = {
  // Color 1: Warm Sand / Stone (Harmonized with #fbfbf9 background)
  sand: {
    fill: '#f7f4ee',
    top: '#fbf9f5',
    shades: ['#d6cfc2', '#e0d9cd', '#eae4da', '#f2eee7'],
    edge: '#57534d',
    crease: '#cfc8ba'
  },
  // Color 2A: Soft Botanical Sage (Light tint of #1e3a2b accent)
  sage: {
    fill: '#e6efe9',
    top: '#f0f6f2',
    shades: ['#bdd1c5', '#c9dbd0', '#d5e4db', '#e2ede6'],
    edge: '#1e3a2b',
    crease: '#b5cbbd'
  },
  // Color 2B: Deep Botanical Forest Green (#1e3a2b primary accent)
  forest: {
    fill: '#1e3a2b',
    top: '#2d543f',
    shades: ['#13261c', '#183023', '#1e3a2b', '#254634'],
    edge: '#0f1f16',
    crease: '#38664d'
  }
};

interface SolidProps {
  paths: SolidPaths;
  tone?: Tone;
  crease?: Tone | 'none';
  halo?: boolean;
  lit?: boolean;
  flat?: boolean;
  color?: MaterialColor;
}

function Solid({
  paths,
  tone = 'hi',
  crease = 'faint',
  halo = false,
  lit = false,
  flat = false,
  color = 'sand'
}: SolidProps) {
  const pal = MATERIAL_PALETTES[color];
  return (
    <g
      className="iso-solid"
      data-lit={lit ? '' : undefined}
      data-seamless={paths.seamless ? '' : undefined}
    >
      {halo ? <path className="iso-halo" d={paths.fill} /> : null}
      <path className="iso-fill" d={paths.fill} style={{ fill: pal.fill }} />
      {flat
        ? null
        : paths.shades.map((d, shade) =>
            d ? (
              <path
                key={shade}
                className="iso-shade"
                data-shade={shade}
                d={d}
                style={{ fill: pal.shades[shade] || pal.shades[0] }}
              />
            ) : null
          )}
      {flat ? null : (
        <path className="iso-top" d={paths.top} style={{ fill: pal.top }} />
      )}
      {crease === 'none' || !paths.crease ? null : (
        <path
          className="iso-line iso-crease"
          data-tone={crease}
          d={paths.crease}
          style={{ stroke: pal.crease }}
        />
      )}
      {crease === 'none' || !paths.bevel ? null : (
        <path
          className="iso-line iso-bevel"
          data-tone={crease}
          d={paths.bevel}
          style={{ stroke: pal.crease }}
        />
      )}
      <path
        className="iso-line iso-edge"
        data-tone={tone}
        d={paths.outline}
        style={{ stroke: pal.edge }}
      />
    </g>
  );
}

function Line({
  d,
  tone = 'lo',
  dashed = false,
  flow = false
}: {
  d: string;
  tone?: LineTone;
  dashed?: boolean;
  flow?: boolean;
}) {
  if (!d) return null;
  return (
    <path
      className="iso-line"
      data-tone={tone}
      data-dashed={dashed ? '' : undefined}
      data-flow={flow ? '' : undefined}
      d={d}
    />
  );
}

const tenth = (v: number) => Math.round(v * 10) / 10;

function Dots({
  points,
  size = 0.6,
  tone = 'mid'
}: {
  points: Flat[];
  size?: number;
  tone?: Tone;
}) {
  return (
    <g className="iso-dots" data-tone={tone}>
      {points.map(([x, y], index) => (
        <circle key={index} cx={tenth(x)} cy={tenth(y)} r={size} />
      ))}
    </g>
  );
}

// ============================================================================
// FIG 01 • THE ENGINEER AT THE WORKBENCH (HUMAN-IN-THE-LOOP ARCHITECTURE)
// ~68 solid parts in strict back-to-front, bottom-to-top painter's order:
//   1. Precision Machined Workbench Base, 4 Leveled Feet, Ruler Strip & Plate
//   2. Back-Right Widescreen IDE Code Monitor + Cantilevered Task Lamp
//   3. Back-Left Sculpted Software Engineer (Face, Eyeglasses, Nose Bridge,
//      Jaw, Hair Cap, Studio Headphones, Jacket Torso & Animated Typing Hands)
//   4. Center-Right Open Laptop Workstation (18 Animated Keycaps, Trackpad,
//      Riser Stand & Upright Display Lid Facing the Engineer)
//   5. Front Peripherals: Ceramic Coffee Mug with Rising Steam, Knurled
//      Rotary Macro Pad, Coiled Debug Cable & Mobile Accessibility Test Dock
// ============================================================================

const VIEW_W = 210;
const VIEW_H = 148;
const PLATE: Plan = { x: -38, y: -35, w: 76, d: 70, r: 5 };
const PLATE_H = 5.0;
const FOOT_H = 3.0;

const P = fitProjection(
  [
    ...boxCorners(PLATE, -PLATE_H - FOOT_H, 6),
    [-28, -12, 49],
    [-11, 5, 49],
    [-14, -29, 48],
    [27, -25, 40],
    [27, 11, 31]
  ],
  VIEW_W,
  VIEW_H,
  { pad: 2, azimuth: 50, elevation: 28 }
);

const at = (pt: Point3) => iso(pt, P);
const join = (list: string[]) => list.filter(Boolean).join('');

function flatRectOnFace(x0: number, z0: number, x1: number, z1: number, r: number, steps = 5) {
  return pathOf(
    roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([u, z]) => [u, -z]),
    true
  );
}

export type FocusMode = 'fullstack' | 'a11y' | 'research';

const FOCUS_MODES: {
  id: FocusMode;
  code: string;
  label: string;
  readout: string;
  caption: string;
}[] = [
  {
    id: 'fullstack',
    code: '01',
    label: 'Full-Stack & IDE',
    readout: 'SYS: REACT + LARAVEL • 99.4% CWV',
    caption: 'Production web engineering at PT Inpartner Optima Integra & containerized Linux deployments.'
  },
  {
    id: 'a11y',
    code: '02',
    label: 'Mobile & a11y',
    readout: 'A11Y: WCAG 2.2 AAA • ANDROID TTS',
    caption: 'Assistive mobile interfaces, spatial audio navigation, and tactile screen-reader ergonomics.'
  },
  {
    id: 'research',
    code: '03',
    label: 'WAF & AI Research',
    readout: 'RES: WAF EFFICACY • LPDP SCHOLAR',
    caption: 'Empirical investigation into Web Application Firewalls, LLM interfaces, and educational systems.'
  }
];

function buildEngineerWorkbenchGeometry() {
  // --------------------------------------------------------------------------
  // 1. WORKBENCH BASE PLATE, FEET, GROOVE, RULER STRIP & NAMEPLATE
  // --------------------------------------------------------------------------
  const footCoords = [...corners(PLATE, 7)].sort(
    (a, b) => depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P)
  );
  const screwCoords = corners(PLATE, 4.2);

  const rulerPlan: Plan = { x: -31, y: 27.5, w: 42, d: 5.2, r: 0.8 };
  const rulerTicks = topTicks(-28, 8, 2.5, 4, 28.1, 0.6, [1.6, 3.0], P, 'x');

  const labelPlan: Plan = { x: 14, y: 27.2, w: 18, d: 5.5, r: 0.9 };
  const labelRules = join([
    lineOnTop([16.2, 29.0], [29.5, 29.0], 0.7, P),
    lineOnTop([16.2, 30.4], [26.5, 30.4], 0.7, P),
    lineOnTop([16.2, 31.6], [23.5, 31.6], 0.7, P)
  ]);

  const base = {
    halo: haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P),
    feet: footCoords.map(([fx, fy]) => ({
      flange: cylinder(fx, fy, 3.8, -PLATE_H - FOOT_H, 1.1, P, 20),
      pad: cylinder(fx, fy, 2.9, -PLATE_H - FOOT_H + 1.1, FOOT_H - 1.1, P, 20)
    })),
    slab: slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.0),
    slabSeam: sideSeam(PLATE, -2.2, P, 8),
    groove: planOutline(insetPlan(PLATE, 2.6), 0, P, 8),
    screwRings: join(screwCoords.map(([sx, sy]) => ring(sx, sy, 1.3, 0, P, 14))),
    screws: screwCoords.map(([sx, sy]) => at([sx, sy, 0])),
    deskMat: slabOf({ x: -10, y: -18, w: 42, d: 32, r: 2.5 }, 0, 0.5, P, 6),
     deskMatInset: planOutline({ x: -8.5, y: -16.5, w: 39, d: 29, r: 2.0 }, 0.5, P, 6),
    rulerSlab: slabOf(rulerPlan, 0, 0.6, P, 3),
    rulerTicks,
    labelSlab: slabOf(labelPlan, 0, 0.7, P, 3),
    labelInset: planOutline(insetPlan(labelPlan, 0.9), 0.7, P, 3),
    labelRules,
    labelScrews: [at([15.2, 29.9, 0.7]), at([30.8, 29.9, 0.7])]
  };

  // --------------------------------------------------------------------------
  // 2. BACK-RIGHT SECONDARY WIDESCREEN IDE MONITOR & TASK LAMP (y = -32..-18)
  // --------------------------------------------------------------------------
  const monPlan: Plan = { x: -3, y: -25, w: 30, d: 4.5, r: 1.5 };
  const monFrontY = monPlan.y + monPlan.d; // y = -20.5 (faces +Y toward viewer)
  const monTransform = sideMatrix([0, monFrontY], 0, P, 'left');
  const monBezelPath = flatRectOnFace(-1.2, 14.5, 25.2, 37.5, 1.2);
  const monScreenPath = flatRectOnFace(0.2, 16.0, 23.8, 36.0, 1.0);

  const lampPostX = -12;
  const lampPostY = -28;

  const backRig = {
    lampCollar: cylinder(lampPostX, lampPostY, 3.6, 0, 2.5, P, 20),
    lampStem: cylinder(lampPostX, lampPostY, 1.8, 2.5, 42, P, 18),
    lampStemRings: join([12, 24, 36].map((z) => sideArc(lampPostX, lampPostY, 1.8, z, P, 14))),
    lampJoint: slabOf({ x: lampPostX - 2.6, y: lampPostY - 2.6, w: 5.2, d: 5.2, r: 1.2 }, 43, 4.5, P, 4, 0.4),
    lampArm: slabOf({ x: lampPostX - 1.5, y: lampPostY - 1.2, w: 22, d: 2.6, r: 0.8 }, 45.5, 2.2, P, 4, 0.3),
    lampHood: slabOf({ x: 4, y: lampPostY - 3.5, w: 11, d: 7, r: 2.0 }, 43.0, 3.2, P, 5, 0.6),
    lampGlowRing: ring(9.5, lampPostY, 3.8, 43.0, P, 18),

    monBase: cylinder(12, -26, 5.2, 0, 2.0, P, 24, 0.3),
    monPost: cylinder(12, -26, 2.2, 2.0, 16, P, 20),
    monClamp: slabOf({ x: 9.2, y: -28.5, w: 5.6, d: 5.5, r: 1.0 }, 11, 4.5, P, 4, 0.4),
    monChassis: slabOf(monPlan, 13.5, 25.5, P, 5, 0.7),
    monVents: join(
      [0, 1, 2, 3, 4].map((i) =>
        lineOnTop([1 + i * 5.2, -23.8], [4.2 + i * 5.2, -23.8], 39.0, P)
      )
    ),
    monTransform,
    monBezelPath,
    monScreenPath,
    monLed: [at([24.5, monFrontY, 14.5])]
  };

  // --------------------------------------------------------------------------
  // 3. BACK-LEFT SOFTWARE ENGINEER (BUST, SCULPTED FACE, GLASSES, HANDS)
  //    Positioned at x = -33..-10, y = -15..9, facing +X toward the Laptop!
  // --------------------------------------------------------------------------
  const chairBack: Plan = { x: -35.5, y: -13, w: 3.8, d: 20, r: 1.4 };
  const chairSeat: Plan = { x: -31.5, y: -13, w: 16, d: 20, r: 2.0 };
  const torsoPlan: Plan = { x: -29, y: -13.5, w: 15.5, d: 21, r: 3.2 };
  const collarPlan: Plan = { x: -25.5, y: -8.5, w: 10.5, d: 11, r: 2.2 };

  // Head & Face Assembly (z = 27..48)
  const jawPlan: Plan = { x: -25.0, y: -8.5, w: 13.0, d: 11.0, r: 2.6 };
  const headPlan: Plan = { x: -26.5, y: -9.5, w: 15.0, d: 13.0, r: 3.2 };
  const hairTopPlan: Plan = { x: -27.2, y: -10.0, w: 16.2, d: 14.0, r: 3.4 };
  const hairBackPlan: Plan = { x: -27.5, y: -10.0, w: 5.5, d: 14.0, r: 2.2 };

  // Face features on the +X plane (x = -11.5, facing the laptop & camera)
  const faceX = headPlan.x + headPlan.w; // x = -11.5
  const faceTransform = sideMatrix([faceX, 0], 0, P, 'right');

  // Protruding 3D Nose Bridge & Eyeglasses Frame on the +X face
  const noseBridgePlan: Plan = { x: -12.0, y: -4.2, w: 2.3, d: 2.4, r: 0.7 };
  const glassesLeftRim: Plan = { x: -11.8, y: -8.2, w: 1.5, d: 4.0, r: 0.5 };
  const glassesRightRim: Plan = { x: -11.8, y: -1.8, w: 1.5, d: 4.0, r: 0.5 };
  const glassesBridge: Plan = { x: -11.7, y: -4.4, w: 1.3, d: 2.8, r: 0.3 };

  // Studio Over-Ear Headphones (Back/Left earcup at y = -11.2, Front/Right at y = 3.5)
  const earcupLeftPlan: Plan = { x: -21.5, y: -11.6, w: 5.2, d: 2.4, r: 1.1 };
  const earcupRightPlan: Plan = { x: -21.5, y: 3.2, w: 5.2, d: 2.6, r: 1.1 };
  const headbandPlan: Plan = { x: -21.2, y: -11.2, w: 4.6, d: 16.6, r: 1.5 };

  // Articulated Arms & Typing Hands reaching from shoulders to laptop keyboard
  const leftUpperArm: Plan = { x: -22, y: -15.5, w: 11, d: 4.8, r: 1.6 };
  const leftForearm: Plan = { x: -13, y: -14.5, w: 14, d: 4.4, r: 1.4 };
  const leftHandPlan: Plan = { x: 0.5, y: -12.5, w: 6.2, d: 4.8, r: 1.2 };

  const rightUpperArm: Plan = { x: -22, y: 4.8, w: 11, d: 4.8, r: 1.6 };
  const rightForearm: Plan = { x: -13, y: 3.8, w: 14, d: 4.4, r: 1.4 };
  const rightHandPlan: Plan = { x: 0.5, y: 1.8, w: 6.2, d: 4.8, r: 1.2 };

  const engineer = {
    chairPost: cylinder(-26, -3, 2.8, 0, 4.5, P, 18),
    chairSeat: slabOf(chairSeat, 4.0, 3.0, P, 5, 0.5),
    chairBack: slabOf(chairBack, 6.0, 21.0, P, 5, 0.6),

    // Left arm (further back, drawn before torso/head)
    leftUpperArm: slabOf(leftUpperArm, 11.5, 7.5, P, 4, 0.5),
    leftForearm: slabOf(leftForearm, 9.0, 4.8, P, 4, 0.5),
    leftHand: slabOf(leftHandPlan, 9.2, 2.6, P, 4, 0.4),
    leftFingers: join([
      lineOnTop([4.2, -11.2], [6.4, -11.2], 11.8, P),
      lineOnTop([4.2, -10.0], [6.4, -10.0], 11.8, P),
      lineOnTop([4.2, -8.8], [6.4, -8.8], 11.8, P)
    ]),

    // Torso & Collar
    torso: slabOf(torsoPlan, 6.5, 17.5, P, 6, 1.0),
    torsoSeam: sideSeam(torsoPlan, 14.0, P, 6),
    lapelLines: join([
      segment([-13.5, -6.5, 16], [-13.5, -3.5, 24], P),
      segment([-13.5, 0.5, 16], [-13.5, -2.5, 24], P)
    ]),
    collar: slabOf(collarPlan, 24.0, 2.8, P, 5, 0.5),
    neck: cylinder(-19.5, -3.0, 3.9, 26.2, 3.5, P, 20),

    // Back/Left Headphone Cup
    earcupLeft: slabOf(earcupLeftPlan, 34.5, 6.5, P, 4, 0.5),

    // Sculpted Jaw, Cranium & Hair Cap
    jaw: slabOf(jawPlan, 29.0, 5.5, P, 5, 0.7),
    head: slabOf(headPlan, 33.5, 10.5, P, 6, 0.9),
    hairBack: slabOf(hairBackPlan, 33.5, 11.0, P, 5, 0.6),
    hairTop: slabOf(hairTopPlan, 43.2, 4.2, P, 6, 1.0),
    hairTexture: join([
      lineOnTop([-24, -7], [-13, -7], 47.4, P),
      lineOnTop([-24, -4], [-12.5, -4], 47.4, P),
      lineOnTop([-24, -1], [-12.5, -1], 47.4, P),
      lineOnTop([-24, 2], [-13.5, 2], 47.4, P)
    ]),

    // 3D Nose Bridge & Eyeglasses on the +X Face
    noseBridge: slabOf(noseBridgePlan, 34.2, 4.6, P, 4, 0.4),
    glassesBridge: slabOf(glassesBridge, 38.0, 1.2, P, 3, 0.2),
    glassesLeftRim: slabOf(glassesLeftRim, 36.2, 3.8, P, 4, 0.3),
    glassesRightRim: slabOf(glassesRightRim, 36.2, 3.8, P, 4, 0.3),
    glassesTempleRight: lineOnTop([-11.5, 2.2], [-19.0, 3.5], 38.6, P),
    faceTransform,

    // Front/Right Earcup & Headband Arch
    earcupRight: slabOf(earcupRightPlan, 34.5, 6.5, P, 4, 0.6),
    earcupRightRing: planOutline(insetPlan(earcupRightPlan, 0.6), 41.0, P, 3),
    headband: slabOf(headbandPlan, 47.2, 1.8, P, 4, 0.4),

    // Right arm (closer to viewer, drawn after torso)
    rightUpperArm: slabOf(rightUpperArm, 11.5, 7.5, P, 4, 0.5),
    rightForearm: slabOf(rightForearm, 9.0, 4.8, P, 4, 0.5),
    rightWatch: slabOf({ x: -2.2, y: 3.6, w: 2.2, d: 4.8, r: 0.5 }, 9.2, 5.1, P, 3, 0.2),
    rightHand: slabOf(rightHandPlan, 9.2, 2.6, P, 4, 0.4),
    rightFingers: join([
      lineOnTop([4.2, 2.8], [6.4, 2.8], 11.8, P),
      lineOnTop([4.2, 4.0], [6.4, 4.0], 11.8, P),
      lineOnTop([4.2, 5.2], [6.4, 5.2], 11.8, P)
    ])
  };

  // --------------------------------------------------------------------------
  // 4. CENTER-RIGHT OPEN CODING LAPTOP WORKSTATION (x = 1..28, y = -16..10)
  // --------------------------------------------------------------------------
  const standPlan: Plan = { x: 3.5, y: -14, w: 21, d: 22, r: 2.0 };
  const deckPlan: Plan = { x: 1.5, y: -15.5, w: 24.5, d: 25, r: 2.2 };
  const kbWellPlan: Plan = { x: 7.2, y: -13.5, w: 13.6, d: 21, r: 1.2 };

  // 18 Individual Mechanical Keycaps (3 cols × 6 rows)
  const keyPlans: Plan[] = [];
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 6; row++) {
      keyPlans.push({
        x: 7.8 + col * 4.3,
        y: -12.8 + row * 3.3,
        w: 3.6,
        d: 2.7,
        r: 0.45
      });
    }
  }

  // Open Laptop Display Lid at the +X edge of the deck (x = 23..26.5), facing -X toward Engineer
  const lidPlan: Plan = { x: 23.0, y: -15.5, w: 3.2, d: 25, r: 1.4 };
  const lidBackX = lidPlan.x + lidPlan.w; // x = 26.2 (+X back of lid)
  const lidBackTransform = sideMatrix([lidBackX, 0], 0, P, 'right');

  const laptop = {
    stand: slabOf(standPlan, 0.5, 3.8, P, 5, 0.5),
    standFootFront: slabOf({ x: 2.0, y: 5.5, w: 23, d: 2.2, r: 0.6 }, 0.5, 4.0, P, 3),
    deck: slabOf(deckPlan, 4.3, 3.4, P, 6, 0.6),
    deckSeam: sideSeam(deckPlan, 5.8, P, 6),
    trackpad: planOutline({ x: 2.6, y: -5.8, w: 4.0, d: 6.2, r: 0.7 }, 7.7, P, 4),
    kbWell: planOutline(kbWellPlan, 7.7, P, 4),
    keys: keyPlans.map((kp) => slabOf(kp, 7.7, 1.35, P, 3, 0.25)),
    keyTops: keyPlans.map((kp) => planOutline(insetPlan(kp, 0.55), 9.05, P, 2)),
    sidePorts: [
      at([10.5, 9.5, 6.0]),
      at([13.0, 9.5, 6.0]),
      at([15.5, 9.5, 6.0])
    ],
    hinge: slabOf({ x: 21.8, y: -11.5, w: 2.0, d: 17, r: 0.5 }, 7.2, 1.6, P, 3),
    lid: slabOf(lidPlan, 7.5, 22.5, P, 5, 0.6),
    lidTopBevel: planOutline(insetPlan(lidPlan, 0.6), 30.0, P, 4),
    lidBackTransform,
    // Subtle light rays linking the open laptop screen (x = 23) to the engineer's glasses (x = -10)
    lightRays: join([
      segment([22.8, -6.5, 24.5], [-10.0, -6.2, 38.0], P),
      segment([22.8, 0.5, 24.5], [-10.0, -0.2, 38.0], P)
    ])
  };

  // --------------------------------------------------------------------------
  // 5. FRONT PERIPHERALS: COFFEE MUG, KNURLED MACRO PAD & MOBILE A11Y DOCK
  //    (y = 13..26, closest to viewer — painted last!)
  // --------------------------------------------------------------------------
  const mugX = -20.5;
  const mugY = 18.5;

  const macroPlan: Plan = { x: -7.5, y: 15.0, w: 11.5, d: 9.5, r: 1.5 };
  const knobX = -1.8;
  const knobY = 19.8;

  const dockPlan: Plan = { x: 9.5, y: 14.0, w: 17.5, d: 11.5, r: 1.8 };
  const phonePlan: Plan = { x: 11.5, y: 15.5, w: 13.5, d: 8.5, r: 1.5 };

  const frontRig = {
    // Ceramic Coffee Mug + Coaster + Handle
    coaster: cylinder(mugX, mugY, 6.2, 0, 1.0, P, 24, 0.2),
    coasterRing: ring(mugX, mugY, 5.2, 1.0, P, 20),
    mugBody: cylinder(mugX, mugY, 4.6, 1.0, 10.5, P, 24, 0.5),
    mugRim: ring(mugX, mugY, 3.8, 11.5, P, 20),
    mugHandle: slabOf({ x: mugX - 6.8, y: mugY - 1.2, w: 2.5, d: 2.4, r: 0.7 }, 3.5, 5.8, P, 3, 0.3),
    steamRings: [0, 1, 2].map((i) =>
      ring(mugX + (i % 2 === 0 ? 0.5 : -0.5), mugY, 2.2 - i * 0.35, 13.8 + i * 2.6, P, 16)
    ),

    // Rotary Macro Pad & Knurled Encoder
    macroBase: slabOf(macroPlan, 0, 3.2, P, 4, 0.5),
    macroInset: planOutline(insetPlan(macroPlan, 1.0), 3.2, P, 4),
    knobCollar: cylinder(knobX, knobY, 3.8, 3.2, 1.2, P, 20),
    knobBody: cylinder(knobX, knobY, 3.1, 4.4, 3.2, P, 24, 0.3),
    knobKnurl: knurl(knobX, knobY, 3.1, 4.4, 7.6, 20, P, 0.35),
    knobPointer: lineOnTop([knobX, knobY], [knobX + 2.4, knobY], 7.6, P),

    // Coiled USB-C Debug Cord + Mobile Accessibility Handset Cradle
    usbCord: coil(9.5, 15.0, [14.5, 2.2], 1.4, 5, 'y', P),
    dockBase: slabOf(dockPlan, 0, 3.8, P, 5, 0.6),
    dockSlot: planOutline(insetPlan(dockPlan, 1.6), 3.8, P, 4),
    phoneBody: slabOf(phonePlan, 3.8, 13.5, P, 5, 0.7),
    phoneScreen: planOutline(insetPlan(phonePlan, 1.2), 17.3, P, 4),
    phoneSpeaker: lineOnTop([16.5, 17.2], [20.0, 17.2], 17.3, P),
    phoneWaveforms: join([
      lineOnTop([13.5, 19.2], [22.5, 19.2], 17.3, P),
      lineOnTop([13.5, 20.6], [20.5, 20.6], 17.3, P),
      lineOnTop([13.5, 22.0], [18.5, 22.0], 17.3, P)
    ]),
    dockLeds: [at([11.5, 25.5, 2.2]), at([13.8, 25.5, 2.2])]
  };

  return { base, backRig, engineer, laptop, frontRig };
}

export function AboutEngineerAnatomy() {
  const geo = useMemo(() => buildEngineerWorkbenchGeometry(), []);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [focusMode, setFocusMode] = useState<FocusMode>('fullstack');
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let rafId = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      setPhase((prev) => prev + dt * Math.PI * 2 * (hovered ? 0.95 : 0.55));
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reducedMotion, hovered]);

  // Dynamic mechanical animations driven by phase
  const anim = useMemo(() => {
    const sinP = Math.sin(phase);
    const cosP = Math.cos(phase);

    // Subtle breathing / head focus nod of the engineer
    const headDz = reducedMotion ? 0 : sinP * 0.45;
    const headTransform = translateAlong(P, [0, 0, headDz]);

    // Alternating left & right typing hands on the laptop keyboard
    const leftHandDz = reducedMotion ? 0 : Math.min(0, Math.sin(phase * 3.2)) * 1.15;
    const rightHandDz = reducedMotion ? 0 : Math.min(0, Math.cos(phase * 3.2)) * 1.15;
    const leftHandTransform = translateAlong(P, [0, 0, leftHandDz]);
    const rightHandTransform = translateAlong(P, [0, 0, rightHandDz]);

    // Active depressed mechanical keycaps on the 18-key matrix
    const activeKeyA = Math.floor(((phase * 3.5) % 9 + 9) % 9);
    const activeKeyB = 9 + Math.floor(((phase * 2.9 + 2) % 9 + 9) % 9);
    const keyPressTransform = translateAlong(P, [0, 0, -1.0]);

    // Mobile handset gentle test lift when in 'a11y' mode
    const phoneLiftZ =
      !reducedMotion && focusMode === 'a11y' ? (sinP + 1) * 1.6 : 0;
    const phoneTransform = translateAlong(P, [0, 0, phoneLiftZ]);

    // Steam rings rising from the ceramic coffee mug
    const steamDz = reducedMotion ? 0 : ((phase * 0.8) % (Math.PI * 2)) / (Math.PI * 2) * 1.8;
    const steamTransform = translateAlong(P, [0, 0, steamDz]);

    // Blinking cursor on the secondary IDE monitor
    const cursorOn = reducedMotion ? true : Math.sin(phase * 2.6) > -0.15;

    // Spectacle lens reflection glint shift
    const glintShift = reducedMotion ? 0 : cosP * 0.4;

    return {
      headTransform,
      leftHandTransform,
      rightHandTransform,
      activeKeyA,
      activeKeyB,
      keyPressTransform,
      phoneTransform,
      steamTransform,
      cursorOn,
      glintShift
    };
  }, [phase, reducedMotion, focusMode]);

  const activeConfig =
    FOCUS_MODES.find((m) => m.id === focusMode) || FOCUS_MODES[0]!;

  const cycleMode = () => {
    const idx = FOCUS_MODES.findIndex((m) => m.id === focusMode);
    const next = FOCUS_MODES[(idx + 1) % FOCUS_MODES.length];
    if (next) setFocusMode(next.id);
  };

  const isFullStack = focusMode === 'fullstack';
  const isA11y = focusMode === 'a11y';
  const isResearch = focusMode === 'research';

  return (
    <figure
      ref={containerRef}
      className="iso w-full overflow-hidden"
    >
      {/* Interactive Isometric SVG Stage */}
      <div
        role="button"
        tabIndex={0}
        onClick={cycleMode}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            cycleMode();
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Interactive Isometric Engineer Coding Anatomy — Click to cycle engineering focus mode"
        className="relative cursor-pointer select-none focus:outline-none group"
      >
        <svg
          className="iso-svg w-full h-auto overflow-visible"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Isometric illustration of a software engineer wearing glasses and headphones working in front of an open coding laptop and dual code monitor"
        >
          {/* ==============================================================
              1. WORKBENCH BASE PLATE, FEET, GROOVE, RULER & NAMEPLATE
              ============================================================== */}
          <path className="iso-halo" d={geo.base.halo} />
          {geo.base.feet.map((foot, idx) => (
            <React.Fragment key={idx}>
              <Solid paths={foot.flange} tone="lo" crease="faint" color="sand" />
              <Solid paths={foot.pad} tone="mid" crease="faint" color="sand" />
            </React.Fragment>
          ))}
          <Solid paths={geo.base.slab} tone="mid" crease="faint" halo={hovered} color="sand" />
          <Line d={geo.base.slabSeam} tone="faint" />
          <Line d={geo.base.groove} tone="lo" />
          <Line d={geo.base.screwRings} tone="lo" />
          <Dots points={geo.base.screws} size={0.55} tone="mid" />

          {/* Desk Mat under Laptop - Accent Color 2 (Sage) */}
          <Solid paths={geo.base.deskMat} tone="lo" crease="none" color="sage" />
          <Line d={geo.base.deskMatInset} tone="faint" />

          {/* Front Precision Ruler Strip & Engraved Nameplate */}
          <Solid paths={geo.base.rulerSlab} tone="lo" crease="none" color="sand" />
          <Line d={geo.base.rulerTicks.minor} tone="lo" />
          <Line d={geo.base.rulerTicks.major} tone="mid" />

          <Solid paths={geo.base.labelSlab} tone="lo" crease="none" color="sand" />
          <Line d={geo.base.labelInset} tone="faint" />
          <Line d={geo.base.labelRules} tone="lo" />
          <Dots points={geo.base.labelScrews} size={0.45} tone="mid" />

          {/* ==============================================================
              2. BACK-RIGHT SECONDARY WIDESCREEN IDE MONITOR & TASK LAMP
              ============================================================== */}
          <Solid paths={geo.backRig.lampCollar} tone="lo" crease="faint" color="sand" />
          <Solid paths={geo.backRig.lampStem} tone="mid" crease="none" color="sand" />
          <Line d={geo.backRig.lampStemRings} tone="faint" />
          <Solid paths={geo.backRig.lampJoint} tone="mid" crease="faint" color="sand" />
          <Solid paths={geo.backRig.lampArm} tone="mid" crease="faint" color="sand" />
          <Solid
            paths={geo.backRig.lampHood}
            tone="hi"
            crease="faint"
            lit={isResearch}
            color="forest"
          />
          <Line d={geo.backRig.lampGlowRing} tone={isResearch ? 'lit' : 'lo'} />

          {/* Secondary Widescreen Code Monitor */}
          <Solid paths={geo.backRig.monBase} tone="lo" crease="faint" color="sand" />
          <Solid paths={geo.backRig.monPost} tone="mid" crease="none" color="sand" />
          <Solid paths={geo.backRig.monClamp} tone="mid" crease="faint" color="sand" />
          <Solid
            paths={geo.backRig.monChassis}
            tone={isResearch || isFullStack ? 'hi' : 'mid'}
            crease="faint"
            lit={isResearch}
            color="sand"
          />
          <Line d={geo.backRig.monVents} tone="lo" />

          {/* Front Plane of Secondary IDE Monitor (+Y face facing viewer) */}
          <g transform={geo.backRig.monTransform}>
            <path
              d={geo.backRig.monBezelPath}
              fill="#efece6"
              stroke="#6e6b65"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={geo.backRig.monScreenPath}
              fill="#1e3a2b"
              stroke="#1e3a2b"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
            {/* Top IDE Tab Bar inside Monitor */}
            <path
              d="M0.5 -33.5 H23.5"
              stroke="#6be0a0"
              strokeOpacity="0.45"
              strokeWidth="0.55"
              vectorEffect="non-scaling-stroke"
            />
            {/* Gutter Line Numbers */}
            <path
              d="M2.2 -31.2 H3.2 M2.2 -28.6 H3.2 M2.2 -26.0 H3.2 M2.2 -23.4 H3.2 M2.2 -20.8 H3.2"
              stroke="#c9dbd0"
              strokeOpacity="0.6"
              strokeWidth="0.65"
              vectorEffect="non-scaling-stroke"
            />
            {/* Syntax-Highlighted Code Lines in Isometric Plane */}
            <path
              d={
                isResearch
                  ? 'M4.8 -31.2 H18.5 M6.2 -28.6 H21.0 M6.2 -26.0 H15.5 M4.8 -23.4 H19.8'
                  : isA11y
                  ? 'M4.8 -31.2 H16.0 M6.2 -28.6 H22.0 M7.5 -26.0 H18.2 M4.8 -23.4 H14.0'
                  : 'M4.8 -31.2 H20.2 M6.2 -28.6 H16.8 M6.2 -26.0 H21.5 M4.8 -23.4 H15.0'
              }
              stroke="#fbfbf9"
              strokeWidth="0.85"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Accent Telemetry / Green Pass Line */}
            <path
              d="M4.8 -20.8 H13.2"
              stroke="#6be0a0"
              strokeWidth="0.9"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {anim.cursorOn && (
              <rect x="14.6" y="-21.7" width="2.2" height="1.8" fill="#fbfbf9" />
            )}
          </g>
          <Dots points={geo.backRig.monLed} size={0.65} tone="hi" />

          {/* ==============================================================
              3. BACK-LEFT SOFTWARE ENGINEER (SCULPTED FACE, GLASSES, HANDS)
              ============================================================== */}
          {/* Ergonomic Chair Base & Backrest */}
          <Solid paths={geo.engineer.chairPost} tone="lo" crease="none" color="sand" />
          <Solid paths={geo.engineer.chairSeat} tone="lo" crease="faint" color="sand" />
          <Solid paths={geo.engineer.chairBack} tone="mid" crease="faint" color="forest" />

          {/* Left Arm & Animated Left Typing Hand (further back) */}
          <Solid paths={geo.engineer.leftUpperArm} tone="mid" crease="faint" color="forest" />
          <Solid paths={geo.engineer.leftForearm} tone="mid" crease="faint" color="sand" />
          <g transform={anim.leftHandTransform}>
            <Solid paths={geo.engineer.leftHand} tone="hi" crease="faint" lit={isFullStack} color="sand" />
            <Line d={geo.engineer.leftFingers} tone="mid" />
          </g>

          {/* Engineer Torso (Forest Green Jacket) & Collar */}
          <Solid paths={geo.engineer.torso} tone="hi" crease="faint" color="forest" />
          <Line d={geo.engineer.torsoSeam} tone="faint" />
          <Line d={geo.engineer.lapelLines} tone="lo" />
          <Solid paths={geo.engineer.collar} tone="mid" crease="faint" color="sage" />
          <Solid paths={geo.engineer.neck} tone="mid" crease="none" color="sand" />

          {/* Animated Sculpted Head, Face, Glasses & Studio Headphones */}
          <g transform={anim.headTransform}>
            {/* Left/Back Studio Headphone Earcup */}
            <Solid paths={geo.engineer.earcupLeft} tone="mid" crease="faint" color="forest" />

            {/* Sculpted Jaw/Chin, Cranium & Hair Cap */}
            <Solid paths={geo.engineer.jaw} tone="hi" crease="faint" color="sand" />
            <Solid paths={geo.engineer.head} tone="hi" crease="faint" lit color="sand" />
            <Solid paths={geo.engineer.hairBack} tone="mid" crease="faint" color="sand" />
            <Solid paths={geo.engineer.hairTop} tone="hi" crease="faint" color="sand" />
            <Line d={geo.engineer.hairTexture} tone="lo" />

            {/* Facial Features on the +X Face (Eyebrows, Eyes & Focused Expression) */}
            <g transform={geo.engineer.faceTransform}>
              {/* Focused Eyebrows */}
              <path
                d="M4.6 -40.8 L7.5 -40.4 M-1.2 -40.4 L1.6 -40.8"
                fill="none"
                stroke="#1e3a2b"
                strokeWidth="0.85"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* Spectacle Lens Glints (reflecting laptop code light) */}
              <path
                d={`M${5.0 + anim.glintShift} -37.2 L${6.8 + anim.glintShift} -39.0 M${-0.8 + anim.glintShift} -37.2 L${1.0 + anim.glintShift} -39.0`}
                fill="none"
                stroke="#1e3a2b"
                strokeWidth="0.75"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* Calm Focused Mouth Contour on Lower Jaw */}
              <path
                d="M1.5 -32.2 Q3.0 -31.7 4.6 -32.3"
                fill="none"
                stroke="#1e3a2b"
                strokeWidth="0.7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* 3D Protruding Nose Bridge & Isometric Spectacles Frame */}
            <Solid paths={geo.engineer.noseBridge} tone="hi" crease="faint" lit color="sand" />
            <Solid paths={geo.engineer.glassesLeftRim} tone="hi" crease="none" color="forest" />
            <Solid paths={geo.engineer.glassesBridge} tone="hi" crease="none" color="forest" />
            <Solid paths={geo.engineer.glassesRightRim} tone="hi" crease="none" color="forest" />
            <Line d={geo.engineer.glassesTempleRight} tone="hi" />

            {/* Front/Right Studio Headphone Earcup & Headband Arch */}
            <Solid paths={geo.engineer.earcupRight} tone="hi" crease="faint" color="forest" />
            <Line d={geo.engineer.earcupRightRing} tone="lo" />
            <Solid paths={geo.engineer.headband} tone="mid" crease="faint" color="forest" />
          </g>

          {/* Right Arm, Wristwatch & Animated Right Typing Hand (closer to viewer) */}
          <Solid paths={geo.engineer.rightUpperArm} tone="hi" crease="faint" color="forest" />
          <Solid paths={geo.engineer.rightForearm} tone="hi" crease="faint" color="sand" />
          <Solid paths={geo.engineer.rightWatch} tone="mid" crease="none" color="forest" />
          <g transform={anim.rightHandTransform}>
            <Solid paths={geo.engineer.rightHand} tone="hi" crease="faint" lit={isFullStack} color="sand" />
            <Line d={geo.engineer.rightFingers} tone="mid" />
          </g>

          {/* ==============================================================
              4. CENTER-RIGHT OPEN CODING LAPTOP WORKSTATION
              ============================================================== */}
          {/* Subtle Code Glow Rays from Laptop Screen toward Engineer's Glasses */}
          <Line d={geo.laptop.lightRays} tone="faint" dashed flow />

          <Solid paths={geo.laptop.stand} tone="lo" crease="faint" color="sand" />
          <Solid paths={geo.laptop.standFootFront} tone="mid" crease="none" color="sand" />
          <Solid
            paths={geo.laptop.deck}
            tone="hi"
            crease="faint"
            lit={isFullStack}
            color="sand"
          />
          <Line d={geo.laptop.deckSeam} tone="faint" />
          <Line d={geo.laptop.trackpad} tone="lo" />
          <Line d={geo.laptop.kbWell} tone="lo" />
          <Dots points={geo.laptop.sidePorts} size={0.5} tone="hi" />

          {/* 18 Animated Mechanical Keycaps - Accent color */}
          {geo.laptop.keys.map((kPaths, kIdx) => {
            const isPressed =
              !reducedMotion &&
              (kIdx === anim.activeKeyA || kIdx === anim.activeKeyB);
            return (
              <g
                key={kIdx}
                transform={isPressed ? anim.keyPressTransform : undefined}
              >
                <Solid
                  paths={kPaths}
                  tone={isPressed ? 'hi' : 'mid'}
                  crease="none"
                  lit={isPressed}
                  color={isPressed ? 'forest' : 'sage'}
                />
                <Line d={geo.laptop.keyTops[kIdx] || ''} tone="faint" />
              </g>
            );
          })}

          {/* Open Laptop Display Lid (at +X edge facing -X toward Engineer) */}
          <Solid paths={geo.laptop.hinge} tone="mid" crease="none" color="sand" />
          <Solid
            paths={geo.laptop.lid}
            tone="hi"
            crease="faint"
            lit={isFullStack}
            color="sand"
          />
          <Line d={geo.laptop.lidTopBevel} tone="lo" />

          {/* Precision Geometric Emblem on Back of Laptop Lid (+X face) */}
          <g transform={geo.laptop.lidBackTransform}>
            <rect
              x="1.2"
              y="-21.5"
              width="3.6"
              height="3.6"
              rx="0.6"
              fill="#1e3a2b"
              stroke="#1e3a2b"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          {/* ==============================================================
              5. FRONT PERIPHERALS: COFFEE MUG, MACRO PAD & MOBILE A11Y DOCK
              ============================================================== */}
          {/* Ceramic Coffee Mug & Rising Steam Rings */}
          <Solid paths={geo.frontRig.coaster} tone="lo" crease="faint" color="sand" />
          <Line d={geo.frontRig.coasterRing} tone="faint" />
          <Solid paths={geo.frontRig.mugHandle} tone="mid" crease="none" color="sand" />
          <Solid paths={geo.frontRig.mugBody} tone="hi" crease="faint" color="forest" />
          <Line d={geo.frontRig.mugRim} tone="mid" />
          <g transform={anim.steamTransform}>
            {geo.frontRig.steamRings.map((sPath, idx) => (
              <Line key={idx} d={sPath} tone={idx === 0 ? 'mid' : 'faint'} />
            ))}
          </g>

          {/* Rotary Macro Pad & Knurled Encoder Knob */}
          <Solid paths={geo.frontRig.macroBase} tone="mid" crease="faint" color="sand" />
          <Line d={geo.frontRig.macroInset} tone="lo" />
          <Solid paths={geo.frontRig.knobCollar} tone="lo" crease="none" color="sand" />
          <Solid paths={geo.frontRig.knobBody} tone="hi" crease="faint" color="sage" />
          <Line d={geo.frontRig.knobKnurl} tone="lo" />
          <Line d={geo.frontRig.knobPointer} tone="hi" />

          {/* Coiled USB-C Debug Cable & Mobile Accessibility Handset Dock */}
          <Line d={geo.frontRig.usbCord.back} tone="lo" />
          <Line
            d={geo.frontRig.usbCord.front}
            tone={isA11y ? 'lit' : 'mid'}
          />
          <Solid paths={geo.frontRig.dockBase} tone="mid" crease="faint" color="sand" />
          <Line d={geo.frontRig.dockSlot} tone="lo" />
          <Dots points={geo.frontRig.dockLeds} size={0.55} tone="hi" />
          <g transform={anim.phoneTransform}>
            <Solid
              paths={geo.frontRig.phoneBody}
              tone="hi"
              crease="faint"
              lit={isA11y}
              color="forest"
            />
            <Line d={geo.frontRig.phoneScreen} tone="hi" />
            <Line d={geo.frontRig.phoneSpeaker} tone="lo" />
            <Line
              d={geo.frontRig.phoneWaveforms}
              tone={isA11y ? 'lit' : 'mid'}
            />
          </g>
        </svg>
      </div>
    </figure>
  );
}
