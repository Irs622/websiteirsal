import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  boxCorners,
  cameraOf,
  corners,
  cylinder,
  fitProjection,
  haloOf,
  insetPlan,
  iso,
  lineOnTop,
  pathOf,
  planOutline,
  ring,
  roundedPlan,
  segment,
  sideMatrix,
  sideSeam,
  slabOf,
  towardViewer,
  translateAlong,
  type Flat,
  type LineTone,
  type Plan,
  type Plane,
  type Point3,
  type Projection,
  type SolidPaths,
  type Tone
} from '../utils/isoKit';

// ============================================================================
// ANATOMY REACT DRAWING PRIMITIVES (wheresryan22/anatomy craft specification)
// Two-Color Editorial Palette (Warm Sand/Cream + Botanical Forest/Sage Green)
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
  // Color 1: Warm Sand / Cream (Harmonized with #fbfbf9 background)
  sand: {
    fill: '#f7f3eb',
    top: '#fcfaf5',
    shades: ['#d6cebf', '#e1d9cb', '#ebe4d8', '#f3efe6'],
    edge: '#2c2a27',
    crease: '#cfc6b6'
  },
  // Color 2A: Soft Botanical Sage (Light tint of #1e3a2b accent)
  sage: {
    fill: '#e3eee7',
    top: '#eef6f1',
    shades: ['#b6cebf', '#c4d8cc', '#d2e2d8', '#e0ece5'],
    edge: '#1e3a2b',
    crease: '#adc6b7'
  },
  // Color 2B: Deep Botanical Forest Green (#1e3a2b primary accent)
  forest: {
    fill: '#1b4330',
    top: '#285c43',
    shades: ['#112b1e', '#153626', '#1b4330', '#22503a'],
    edge: '#0f2318',
    crease: '#356f52'
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
// ANATOMY GEOMETRY BUILDER (Pure isoKit.ts 3D Solids & Painter's Order)
// ============================================================================

const VIEW_W = 208;
const VIEW_H = 152;
const PLATE: Plan = { x: -37, y: -33, w: 76, d: 64, r: 6.2 };
const LOWER_PLATE: Plan = insetPlan(PLATE, 1.1);
const INNER_DECK: Plan = insetPlan(PLATE, 3.4);

const P = fitProjection(
  [
    ...boxCorners(PLATE, -8.5, 5),
    [-35, -18, 43],
    [-12, 0, 43],
    [-10, -30, 48],
    [30, -25, 42],
    [38, 12, 26]
  ],
  VIEW_W,
  VIEW_H,
  { pad: 2.0, azimuth: 48, elevation: 29 }
);

const at = (pt: Point3) => iso(pt, P);
const join = (list: string[]) => list.filter(Boolean).join('');

function flatRectOnFace(x0: number, z0: number, x1: number, z1: number, r: number, steps = 5) {
  return pathOf(
    roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([u, z]) => [u, -z]),
    true
  );
}

/**
 * Tilted 3D solid prism (used for the angled open laptop display lid & emblem)
 */
function tiltedSlabOf(
  plan: Plan,
  z: number,
  height: number,
  tiltX: number,
  tiltY: number,
  projection: Projection,
  steps = 5
): SolidPaths {
  const ring = roundedPlan(plan, steps);
  const count = ring.length;
  const [vx, vy] = towardViewer(projection);
  const { sinA, cosA } = cameraOf(projection);

  const normals = ring.map(([ax, ay], index) => {
    const [bx, by] = ring[(index + 1) % count]!;
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    return [dy / len, -dx / len] as Plane;
  });

  const facing = normals.map(([nx, ny]) => nx * vx + ny * vy > 1e-9);
  const top = ring.map(([x, y]) => iso([x + tiltX, y + tiltY, z + height], projection));
  const bottom = ring.map(([x, y]) => iso([x, y, z], projection));

  const outline: string[] = [pathOf(top, true)];
  const crease: string[] = [];

  for (let i = 0; i < count; i++) {
    if (!facing[i]) continue;
    const next = (i + 1) % count;
    outline.push(pathOf([bottom[i]!, bottom[next]!]));
    if (!facing[(i + count - 1) % count]) {
      outline.push(pathOf([top[i]!, bottom[i]!]));
    }
    if (!facing[next]) {
      outline.push(pathOf([top[next]!, bottom[next]!]));
    }
  }

  const parts: string[] = [pathOf(top, true), pathOf(bottom, true)];
  const buckets: string[][] = [[], [], [], []];
  const [lx, ly] = [-sinA, cosA];

  for (let i = 0; i < count; i++) {
    if (!facing[i]) continue;
    const next = (i + 1) % count;
    const quad = pathOf([top[i]!, top[next]!, bottom[next]!, bottom[i]!], true);
    parts.push(quad);
    const [nx, ny] = normals[i]!;
    const lit = (nx * lx + ny * ly + 1) / 2;
    const shade = Math.min(3, Math.max(0, Math.floor(lit * 4)));
    buckets[shade]!.push(quad);
  }

  return {
    fill: parts.join(''),
    outline: outline.join(''),
    crease: crease.join(''),
    top: pathOf(top, true),
    shades: buckets.map((b) => b.join(''))
  };
}

function buildWorkstationAnatomy() {
  // --------------------------------------------------------------------------
  // 1. TWO-TIER PLATFORM BASE, 4 CORNER BOLTS, INNER STEP & FOREST DESK MAT
  // --------------------------------------------------------------------------
  const boltCoords = corners(PLATE, 3.4);
  // Green Desk Mat: x = -19.0..23.5, y = -15.5..26.0
  const matPlan: Plan = { x: -19.0, y: -15.5, w: 42.5, d: 41.5, r: 3.8 };

  const base = {
    halo: haloOf(LOWER_PLATE, -8.8, 4.0, P),
    lowerGreenTier: slabOf(LOWER_PLATE, -8.2, 3.4, P, 8, 0.8),
    upperSandTier: slabOf(PLATE, -4.8, 4.8, P, 8, 1.0),
    upperSeam: sideSeam(PLATE, -2.2, P, 8),
    boltRings: join(boltCoords.map(([bx, by]) => ring(bx, by, 1.4, 0, P, 14))),
    boltDots: boltCoords.map(([bx, by]) => at([bx, by, 0])),
    innerDeck: slabOf(INNER_DECK, 0, 1.2, P, 8, 0.4),
    innerGroove: planOutline(insetPlan(INNER_DECK, 1.3), 1.2, P, 8),
    deskMat: slabOf(matPlan, 1.2, 0.55, P, 6, 0.2),
    deskMatOutline: planOutline(insetPlan(matPlan, 1.0), 1.75, P, 6)
  };

  // --------------------------------------------------------------------------
  // 2. BACK-RIGHT: CANTILEVERED ARCHITECT LAMP & WIDESCREEN CODE MONITOR
  //    (On the back cream deck: y = -29.0..-20.8 < -15.5)
  // --------------------------------------------------------------------------
  const lampBasePlan: Plan = { x: -10.5, y: -29.0, w: 8.8, d: 8.8, r: 1.8 };
  const lampPostPlan: Plan = { x: -8.0, y: -26.5, w: 3.8, d: 3.8, r: 0.8 };
  const lampShoulderPlan: Plan = { x: -8.7, y: -27.2, w: 6.4, d: 5.2, r: 1.3 };
  const lampArmPlan: Plan = { x: -2.8, y: -26.4, w: 26.8, d: 3.8, r: 1.0 };
  const lampHoodPlan: Plan = { x: 0.2, y: -26.9, w: 23.8, d: 4.8, r: 1.4 };

  // Large Widescreen Monitor sits at x = -2.0..28.5, y = -25.5..-20.8, facing +Y
  const monBasePlan: Plan = { x: 7.0, y: -27.0, w: 14.0, d: 8.8, r: 1.8 };
  const monPadPlan: Plan = insetPlan(monBasePlan, 1.5);
  const monChassisPlan: Plan = { x: -2.0, y: -25.5, w: 30.5, d: 4.7, r: 2.0 };
  const monFrontY = monChassisPlan.y + monChassisPlan.d; // y = -20.8
  const monTransform = sideMatrix([0, monFrontY], 0, P, 'left');
  const monBezelPath = flatRectOnFace(-0.2, 13.2, 27.0, 35.8, 1.5);
  const monScreenPath = flatRectOnFace(1.2, 14.6, 25.6, 34.4, 1.2);

  const beamPolygon = pathOf(
    [
      at([2.2, -25.2, 42.0]),
      at([22.8, -25.2, 42.0]),
      at([26.2, -18.5, 16.0]),
      at([-0.5, -18.5, 16.0])
    ],
    true
  );

  const backRig = {
    lampBase: slabOf(lampBasePlan, 1.2, 2.6, P, 4, 0.4),
    lampPost: slabOf(lampPostPlan, 3.8, 38.8, P, 4, 0.3),
    lampPostSeam: sideSeam(lampPostPlan, 22.0, P, 4),
    lampShoulder: slabOf(lampShoulderPlan, 42.2, 4.6, P, 4, 0.5),
    lampArm: slabOf(lampArmPlan, 43.6, 2.5, P, 4, 0.4),
    lampHood: slabOf(lampHoodPlan, 41.8, 2.4, P, 5, 0.5),
    lampLedLine: lineOnTop([2.2, -25.5], [22.2, -25.5], 41.8, P),
    beamPolygon,
    beamRays: join([
      segment([4.8, -25.5, 41.6], [3.2, -20.8, 22.0], P),
      segment([13.2, -25.5, 41.6], [13.2, -20.8, 22.0], P),
      segment([21.0, -25.5, 41.6], [22.5, -20.8, 22.0], P)
    ]),

    monBase: slabOf(monBasePlan, 1.2, 2.1, P, 4, 0.4),
    monBasePad: slabOf(monPadPlan, 3.3, 0.5, P, 4, 0.1),
    monNeck: cylinder(14.0, -22.6, 2.5, 3.8, 9.0, P, 20),
    monChassis: slabOf(monChassisPlan, 11.8, 25.4, P, 5, 0.8),
    monTransform,
    monBezelPath,
    monScreenPath
  };

  // --------------------------------------------------------------------------
  // 3. BACK-LEFT: HIGH-BACK GAMING CHAIR & CHIBI ENGINEER IN GREEN HOODIE
  //    (Proportionately scaled so the Laptop & Peripherals look large & dominant!)
  // --------------------------------------------------------------------------
  const chairSeatPlan: Plan = { x: -32.2, y: -16.8, w: 13.2, d: 15.6, r: 2.0 };
  const chairBackOuter: Plan = { x: -34.0, y: -16.8, w: 3.6, d: 15.6, r: 1.7 };
  const chairBackInner: Plan = { x: -31.2, y: -15.5, w: 2.8, d: 13.0, r: 1.3 };
  const headrestOuter: Plan = { x: -33.4, y: -13.8, w: 3.5, d: 9.8, r: 1.4 };
  const headrestInner: Plan = { x: -30.8, y: -12.9, w: 2.4, d: 8.0, r: 1.1 };

  // Engineer Hoodie Torso & Hood Collar
  const torsoPlan: Plan = { x: -28.6, y: -15.3, w: 12.4, d: 13.4, r: 3.2 };
  const hoodCollarPlan: Plan = { x: -27.2, y: -13.5, w: 10.2, d: 9.8, r: 2.2 };

  // Left Arm (back) & Right Arm (front) reaching clearly onto the laptop keys
  const leftSleevePlan: Plan = { x: -21.8, y: -16.0, w: 8.8, d: 4.0, r: 1.4 };
  const leftHandPlan: Plan = { x: -13.4, y: -14.6, w: 5.2, d: 4.2, r: 1.3 };

  const rightSleevePlan: Plan = { x: -23.6, y: -5.2, w: 9.6, d: 4.2, r: 1.5 };
  const rightHandPlan: Plan = { x: -14.0, y: -5.6, w: 5.4, d: 4.4, r: 1.3 };

  // Proportionate Cute Rounded Isometric Head & Unified Green Hair Cap
  const headPlan: Plan = { x: -27.4, y: -14.4, w: 12.6, d: 11.6, r: 3.4 };
  const hairBackPlan: Plan = { x: -28.3, y: -14.9, w: 5.4, d: 12.6, r: 2.4 };
  const hairCapPlan: Plan = { x: -28.1, y: -14.9, w: 13.6, d: 12.6, r: 3.4 };

  // Face plane centered on the visible +X face of head (x = -14.8, yVisualCenter = -7.0)
  const faceX = headPlan.x + headPlan.w; // x = -14.8
  const faceTransform = sideMatrix([faceX, -7.0], 0, P, 'right');

  // Snug Over-Ear Headphones (Sand headband & cushion + Forest disc + `</>` emblem)
  const earcupBackPlan: Plan = { x: -24.2, y: -16.2, w: 5.0, d: 2.0, r: 1.6 };
  const headbandPlan: Plan = { x: -23.8, y: -15.6, w: 4.0, d: 14.0, r: 1.4 };
  const earcupFrontOuter: Plan = { x: -24.2, y: -3.4, w: 5.4, d: 2.2, r: 1.7 };
  const earcupFrontInner: Plan = { x: -23.1, y: -1.8, w: 3.2, d: 0.8, r: 1.0 };
  const earcupLogoTransform = sideMatrix([-21.5, -0.95], 28.6, P, 'left');

  const engineer = {
    chairSeat: slabOf(chairSeatPlan, 1.75, 2.6, P, 5, 0.5),
    chairBackOuter: slabOf(chairBackOuter, 3.8, 17.6, P, 5, 0.65),
    chairBackInner: slabOf(chairBackInner, 4.8, 16.0, P, 5, 0.55),
    headrestOuter: slabOf(headrestOuter, 21.6, 6.4, P, 4, 0.55),
    headrestInner: slabOf(headrestInner, 22.1, 5.4, P, 4, 0.45),

    // Left Sleeve & Animated Left Chibi Hand
    leftSleeve: slabOf(leftSleevePlan, 7.0, 4.8, P, 4, 0.45),
    leftHand: slabOf(leftHandPlan, 5.4, 4.2, P, 4, 0.4),

    // Hoodie Torso, Drawstrings & Collar
    torso: slabOf(torsoPlan, 5.2, 14.0, P, 6, 0.9),
    torsoSeam: sideSeam(torsoPlan, 11.2, P, 6),
    drawstrings: join([
      segment([-16.1, -10.2, 12.8], [-16.1, -10.2, 19.0], P),
      segment([-16.1, -6.8, 12.8], [-16.1, -6.8, 19.0], P)
    ]),
    drawstringTips: [at([-16.1, -10.2, 12.6]), at([-16.1, -6.8, 12.6])],
    hoodCollar: slabOf(hoodCollarPlan, 19.0, 2.4, P, 5, 0.45),
    neck: cylinder(-22.1, -8.6, 3.1, 21.2, 2.0, P, 20),

    // Proportionate Head, Unified Hair Cap & Snug Headphones
    earcupBack: slabOf(earcupBackPlan, 25.0, 6.2, P, 4, 0.45),
    head: slabOf(headPlan, 22.6, 10.2, P, 6, 0.9),
    hairBack: slabOf(hairBackPlan, 23.6, 8.4, P, 5, 0.65),
    hairFront: slabOf(hairCapPlan, 31.4, 3.0, P, 6, 0.8),
    hairWaves: join([
      lineOnTop([-26.2, -12.0], [-15.8, -12.0], 34.4, P),
      lineOnTop([-26.2, -8.6], [-15.5, -8.6], 34.4, P),
      lineOnTop([-26.2, -5.2], [-15.8, -5.2], 34.4, P)
    ]),
    faceTransform,
    headband: slabOf(headbandPlan, 34.0, 1.5, P, 4, 0.35),
    earcupFrontOuter: slabOf(earcupFrontOuter, 24.8, 6.6, P, 5, 0.55),
    earcupFrontInner: slabOf(earcupFrontInner, 26.0, 4.2, P, 4, 0.25),
    earcupLogoTransform,

    // Right Sleeve & Animated Right Chibi Hand
    rightSleeve: slabOf(rightSleevePlan, 6.6, 4.8, P, 4, 0.45),
    rightHand: slabOf(rightHandPlan, 5.4, 4.2, P, 4, 0.4)
  };

  // --------------------------------------------------------------------------
  // 4. CENTER: DOMINANT, LARGE OPEN CODING LAPTOP WITH ANGLED DISPLAY LID
  //    (x = -14.0..2.5, y = -15.2..5.8 -> w = 16.5, d = 21.0!)
  // --------------------------------------------------------------------------
  const deckPlan: Plan = { x: -14.0, y: -15.2, w: 16.5, d: 21.0, r: 2.0 };
  const kbWellPlan: Plan = { x: -9.0, y: -13.4, w: 9.0, d: 17.4, r: 1.0 };

  // 15 Individual Mechanical Keycaps (3 cols × 5 rows)
  const keyPlans: Plan[] = [];
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 5; row++) {
      keyPlans.push({
        x: -8.2 + col * 2.8,
        y: -12.6 + row * 3.25,
        w: 2.35,
        d: 2.65,
        r: 0.36
      });
    }
  }

  // Angled Open Laptop Display Lid (tilts +3.0 along +X from z=4.0 to z=19.8)
  const lidPlan: Plan = { x: -0.3, y: -15.2, w: 2.8, d: 21.0, r: 1.5 };
  const lidTiltX = 3.0;
  const lidH = 15.8;
  // Forest Green Emblem centered on the angled back of the display lid
  const logoZ0 = 9.3;
  const logoH = 4.6;
  const logoShiftX = lidTiltX * ((logoZ0 - 4.0) / lidH);
  const logoTiltX = lidTiltX * (logoH / lidH);
  const lidLogoPlan: Plan = { x: 1.9 + logoShiftX, y: -6.9, w: 0.9, d: 4.6, r: 0.5 };

  const laptop = {
    deck: slabOf(deckPlan, 1.75, 2.55, P, 5, 0.55),
    kbWell: planOutline(kbWellPlan, 4.3, P, 4),
    keys: keyPlans.map((kp) => slabOf(kp, 4.3, 1.1, P, 3, 0.24)),
    hinge: slabOf({ x: -1.4, y: -11.2, w: 1.5, d: 13.0, r: 0.45 }, 3.9, 1.1, P, 3),
    lid: tiltedSlabOf(lidPlan, 4.0, lidH, lidTiltX, 0, P, 5),
    lidTopInset: planOutline(
      insetPlan({ ...lidPlan, x: lidPlan.x + lidTiltX }, 0.45),
      4.0 + lidH,
      P,
      4
    ),
    lidLogo: tiltedSlabOf(lidLogoPlan, logoZ0, logoH, logoTiltX, 0, P, 3)
  };

  // --------------------------------------------------------------------------
  // 5. LARGE, BOLD FOREGROUND PERIPHERALS STEPPING CLEANLY ALONG ISOMETRIC AXES
  // --------------------------------------------------------------------------
  // 5A. Stack of Two Thick Green Hardcover Books ON RIGHT CREAM DECK (x = 24.1..35.2, y = -15.5..-2.4)
  const book1Cover: Plan = { x: 24.4, y: -15.2, w: 10.8, d: 12.8, r: 1.3 };
  const book1Pages: Plan = { x: 25.1, y: -14.5, w: 9.8, d: 11.8, r: 0.6 };
  const book2Cover: Plan = { x: 24.1, y: -15.5, w: 10.8, d: 12.8, r: 1.3 };
  const book2Pages: Plan = { x: 24.8, y: -14.8, w: 9.8, d: 11.8, r: 0.6 };

  // 5B. Sculpted Potted Succulent Plant ON RIGHT CORNER OF GREEN MAT (x = 14.5..21.9, y = -5.2..2.2)
  const potPlan: Plan = { x: 14.5, y: -5.2, w: 7.4, d: 7.4, r: 1.5 };
  const plantLeafTier1: Plan = { x: 15.1, y: -4.6, w: 6.2, d: 6.2, r: 2.1 };
  const plantLeafTier2: Plan = { x: 15.9, y: -3.8, w: 4.6, d: 4.6, r: 1.6 };
  const plantBudPlan: Plan = { x: 16.8, y: -2.9, w: 2.8, d: 2.8, r: 1.0 };

  // 5C. Front-Left `</>` Coffee Mug on Coaster ON LEFT CREAM DECK (x = -33.2..-21.2, y = 2.8..14.8)
  const coasterPlan: Plan = { x: -33.2, y: 2.8, w: 12.0, d: 12.0, r: 2.4 };
  const mugX = -27.2;
  const mugY = 8.8;
  const mugLogoTransform = sideMatrix([mugX, mugY + 5.0], 7.6, P, 'left');

  // 5D. Large Smartphone ON FRONT-LEFT GREEN MAT (x = -17.5..-10.1, y = 8.5..18.7)
  const phonePlan: Plan = { x: -17.5, y: 8.5, w: 7.4, d: 10.2, r: 1.4 };
  const phoneScreenPlan: Plan = insetPlan(phonePlan, 0.95);

  // 5E. Large Rounded Square Accessory Case ON FRONT-BOTTOM GREEN MAT (x = -6.0..1.6, y = 16.8..24.4)
  const casePlan: Plan = { x: -6.0, y: 16.8, w: 7.6, d: 7.6, r: 1.9 };

  // 5F. Large Spiral Checklist Notepad STEPPED UP-RIGHT ON GREEN MAT (x = 6.0..17.4, y = 9.2..20.4)
  const padPlan: Plan = { x: 6.0, y: 9.2, w: 11.4, d: 11.2, r: 1.5 };
  const spiralRings = join(
    [0, 1, 2, 3].map((i) => {
      const sx = 7.9 + i * 2.5;
      return segment([sx, 8.7, 2.5], [sx, 10.1, 4.35], P);
    })
  );
  const checkBoxes = [0, 1, 2].map((i) => {
    const cy = 11.5 + i * 2.75;
    return {
      box: planOutline({ x: 7.9, y: cy, w: 1.7, d: 1.7, r: 0.25 }, 3.9, P, 2),
      fillSlab: slabOf({ x: 7.9, y: cy, w: 1.7, d: 1.7, r: 0.25 }, 3.85, 0.35, P, 2),
      line: lineOnTop([10.8, cy + 0.85], [15.8, cy + 0.85], 3.9, P)
    };
  });

  const frontItems = {
    // Stacked Books
    book1Bottom: slabOf(book1Cover, 1.2, 0.8, P, 4, 0.2),
    book1Pages: slabOf(book1Pages, 2.0, 2.8, P, 4, 0.25),
    book1Top: slabOf(book1Cover, 4.8, 0.8, P, 4, 0.2),
    book2Bottom: slabOf(book2Cover, 5.6, 0.8, P, 4, 0.2),
    book2Pages: slabOf(book2Pages, 6.4, 2.8, P, 4, 0.25),
    book2Top: slabOf(book2Cover, 9.2, 0.8, P, 4, 0.2),

    // Potted Plant
    pot: slabOf(potPlan, 1.75, 5.6, P, 4, 0.55),
    potRim: planOutline(insetPlan(potPlan, 0.8), 7.35, P, 4),
    plantTier1: slabOf(plantLeafTier1, 7.2, 2.1, P, 5, 0.5),
    plantTier2: slabOf(plantLeafTier2, 9.3, 2.0, P, 5, 0.5),
    plantBud: slabOf(plantBudPlan, 11.3, 1.8, P, 4, 0.4),
    plantLeafLines: join([
      lineOnTop([15.9, -1.5], [20.5, -1.5], 9.35, P),
      lineOnTop([18.2, -3.8], [18.2, 0.8], 9.35, P)
    ]),

    // Coffee Mug + Coaster + Steam
    coaster: slabOf(coasterPlan, 1.2, 1.4, P, 4, 0.35),
    coasterInset: planOutline(insetPlan(coasterPlan, 1.2), 2.6, P, 4),
    mugHandle: slabOf({ x: mugX + 4.0, y: mugY - 1.3, w: 2.5, d: 2.6, r: 0.75 }, 4.9, 5.5, P, 3, 0.25),
    mugBody: cylinder(mugX, mugY, 4.9, 2.6, 10.4, P, 24, 0.45),
    mugCoffee: cylinder(mugX, mugY, 3.7, 12.4, 0.5, P, 20),
    mugLogoTransform,
    steamRings: [0, 1, 2].map((i) =>
      ring(mugX + (i % 2 === 0 ? 0.42 : -0.42), mugY, 2.2 - i * 0.35, 14.6 + i * 2.4, P, 16)
    ),

    // Smartphone
    phoneBody: slabOf(phonePlan, 1.75, 1.55, P, 4, 0.35),
    phoneScreen: slabOf(phoneScreenPlan, 3.3, 0.3, P, 3, 0.12),
    phoneBar: lineOnTop([-15.1, 17.2], [-12.5, 17.2], 3.65, P),
    phoneNoticeLines: join([
      lineOnTop([-15.8, 11.2], [-12.0, 11.2], 3.65, P),
      lineOnTop([-15.8, 13.6], [-13.2, 13.6], 3.65, P)
    ]),
    phoneNoticeDot: [at([-16.3, 11.2, 3.65])],

    // Small Accessory Case
    caseBody: slabOf(casePlan, 1.75, 2.6, P, 4, 0.45),
    caseSeam: sideSeam(casePlan, 3.05, P, 4),
    caseLed: [at([-2.2, 24.5, 3.05])],

    // Spiral Checklist Notepad
    padBody: slabOf(padPlan, 1.75, 2.1, P, 4, 0.4),
    spiralRings,
    checkBoxes
  };

  return { base, backRig, engineer, laptop, frontItems };
}

export function AboutEngineerAnatomy() {
  const geo = useMemo(() => buildWorkstationAnatomy(), []);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Core environmental states
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState(0);

  // Scroll tracking states
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  // Pointer tilt physics
  const pointerTiltRef = useRef({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Interactive items state
  const [lampLit, setLampLit] = useState(true);
  const [lampRecoilAge, setLampRecoilAge] = useState(10);
  const [hyperTypingTimer, setHyperTypingTimer] = useState(0);
  const [engineerMood, setEngineerMood] = useState<'focused' | 'flow'>('flow');
  const [coffeeSips, setCoffeeSips] = useState(0);
  const [coffeeBoostTimer, setCoffeeBoostTimer] = useState(0);
  const [coffeeLiftAge, setCoffeeLiftAge] = useState(10);
  const [manualCheckCount, setManualCheckCount] = useState<number | null>(null);
  const [padBounceAge, setPadBounceAge] = useState(10);
  const [phoneAwake, setPhoneAwake] = useState(true);
  const [plantBounceAge, setPlantBounceAge] = useState(10);
  const [bookShiftAge, setBookShiftAge] = useState(10);
  const [caseActive, setCaseActive] = useState(true);

  // Telemetry banner feedback
  const [telemetryMessage, setTelemetryMessage] = useState<string | null>(null);
  const telemetryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const announce = (msg: string) => {
    setTelemetryMessage(msg);
    if (telemetryTimeoutRef.current) clearTimeout(telemetryTimeoutRef.current);
    telemetryTimeoutRef.current = setTimeout(() => setTelemetryMessage(null), 3200);
  };

  // 1. Reduced Motion Preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // 2. Intersection Observer (Loop efficiency when offscreen)
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '120px 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // 3. Scroll Tracker & Velocity Monitor
  useEffect(() => {
    if (typeof window === 'undefined') return;
    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();

    const onScroll = () => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowH = window.innerHeight || 800;
      const total = windowH + rect.height;
      const current = windowH - rect.top;
      const prog = Math.max(0, Math.min(1, current / total));
      setScrollProgress(prog);

      const now = performance.now();
      const dt = Math.max(16, now - lastScrollTime.current);
      const dy = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;
      scrollVelocityRef.current = Math.max(-80, Math.min(80, dy / dt));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 4. Interactive Pointer Move for 3D Tilt
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    pointerTiltRef.current = {
      x: -py * 5.0, // tilt X up/down
      y: px * 6.5   // tilt Y left/right
    };
  };

  const handlePointerLeave = () => {
    pointerTiltRef.current = { x: 0, y: 0 };
    setHovered(false);
  };

  // 5. Main Animation & Physics Loop (RAF)
  useEffect(() => {
    if (!inView || reducedMotion) return;
    let rafId = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      // Scroll velocity smooth decay
      scrollVelocityRef.current *= 0.91;
      const scrollSpeedBoost = Math.min(2.5, Math.abs(scrollVelocityRef.current) * 0.9);

      // Decrement interactive event timers
      setHyperTypingTimer((prev) => Math.max(0, prev - dt));
      setCoffeeBoostTimer((prev) => Math.max(0, prev - dt));
      setLampRecoilAge((prev) => prev + dt);
      setCoffeeLiftAge((prev) => prev + dt);
      setPadBounceAge((prev) => prev + dt);
      setPlantBounceAge((prev) => prev + dt);
      setBookShiftAge((prev) => prev + dt);

      // Smooth pointer tilt interpolation
      setTilt((prev) => ({
        x: prev.x + (pointerTiltRef.current.x - prev.x) * (dt * 7.5),
        y: prev.y + (pointerTiltRef.current.y - prev.y) * (dt * 7.5)
      }));

      // Combined cadence driver
      const isHyper = hyperTypingTimer > 0;
      const isBoosted = coffeeBoostTimer > 0;
      const baseCadence = hovered ? 0.95 : 0.6;
      const cadence =
        (baseCadence + scrollSpeedBoost + (isHyper ? 2.8 : 0) + (isBoosted ? 0.75 : 0)) *
        (Math.PI * 2);

      setPhase((prev) => prev + dt * cadence);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reducedMotion, hovered, hyperTypingTimer, coffeeBoostTimer]);

  // Direct Interactive Action Handlers (clean side-effects outside state updaters)
  const toggleLamp = () => {
    setLampLit((prev) => !prev);
    setLampRecoilAge(0);
    announce(lampLit ? 'Architect Lamp: Standby' : 'Architect Lamp: Active (3000K Warm Beam)');
  };

  const triggerHyperTyping = () => {
    setHyperTypingTimer(3.0);
    announce('Workstation: High-Throughput Compilation Mode');
  };

  const toggleEngineerMood = () => {
    setEngineerMood((prev) => (prev === 'focused' ? 'flow' : 'focused'));
    announce(engineerMood === 'focused' ? 'Audio: Lo-Fi Coding Beats (Flow State)' : 'Audio: Muted (Deep Focus)');
  };

  const sipCoffee = () => {
    setCoffeeSips((prev) => (prev + 1) % 5);
    setCoffeeBoostTimer(4.5);
    setCoffeeLiftAge(0);
    announce('Caffeine: Single-Origin Pour Over (+25% Speed Boost)');
  };

  const cycleChecklist = () => {
    setManualCheckCount((prev) => (prev === null ? 1 : (prev + 1) % 4));
    setPadBounceAge(0);
    announce('Checklist: Architecture Milestones Updated');
  };

  const togglePhone = () => {
    setPhoneAwake((prev) => !prev);
    announce(phoneAwake ? 'Mobile Test Dock: Screen Standby' : 'Mobile Test Dock: Active (Incoming Ping)');
  };

  const pokePlant = () => {
    setPlantBounceAge(0);
    announce('Botanical: Succulent Potted Desk Specimen');
  };

  const nudgeBooks = () => {
    setBookShiftAge(0);
    announce('References: Systems Architecture & A11y Standards');
  };

  const toggleCase = () => {
    setCaseActive((prev) => !prev);
    announce(caseActive ? 'Accessory Case: Standby' : 'Accessory Case: Status LED Green');
  };

  // Derive all animated transforms & visual parameters
  const anim = useMemo(() => {
    const isHyper = hyperTypingTimer > 0;
    const isFlow = engineerMood === 'flow';

    // 1. Lamp Recoil Spring
    const lampBounce =
      reducedMotion || lampRecoilAge > 1.2
        ? 0
        : Math.sin(lampRecoilAge * Math.PI * 5) * Math.exp(-lampRecoilAge * 4) * 0.8;
    const lampTransform = translateAlong(P, [0, 0, lampBounce]);

    // 2. Engineer head nod & rhythmic vibe
    const headNodAmp = isFlow ? 0.75 : 0.45;
    const headDz = reducedMotion ? 0 : Math.sin(phase) * headNodAmp;
    const headTransform = translateAlong(P, [0, 0, headDz]);

    // Blinking logic (less frequent when hyper-typing)
    const blinkCycle = isHyper ? Math.PI * 6 : Math.PI * 4;
    const blinkMod = (phase % blinkCycle) / blinkCycle;
    const isBlinking = !reducedMotion && !isFlow && blinkMod > 0.92;

    // 3. Chibi hands typing pace
    const handSpeed = isHyper ? 6.5 : isFlow ? 3.8 : 3.2;
    const leftHandDz = reducedMotion ? 0 : Math.min(0, Math.sin(phase * handSpeed)) * 1.35;
    const rightHandDz = reducedMotion ? 0 : Math.min(0, Math.cos(phase * handSpeed)) * 1.35;
    const leftHandTransform = translateAlong(P, [0, 0, leftHandDz]);
    const rightHandTransform = translateAlong(P, [0, 0, rightHandDz]);

    // 4. Mechanical keycaps active matrix
    const keyCadence = isHyper ? 8.2 : 3.4;
    const activeKeyA = Math.floor(((phase * keyCadence) % 8 + 8) % 8);
    const activeKeyB = 7 + Math.floor(((phase * (keyCadence * 0.85) + 2) % 8 + 8) % 8);
    const keyPressTransform = translateAlong(P, [0, 0, -0.9]);

    // 5. Widescreen monitor code progression
    // Tied to both loop phase and scroll progress
    const scrollDrivenStep = scrollProgress * 3.8;
    const loopStep = (phase * (isHyper ? 1.2 : 0.45)) % 4;
    const codeStep = (loopStep + scrollDrivenStep) % 4;
    const w1 = Math.min(1, Math.max(0.2, codeStep));
    const w2 = Math.min(1, Math.max(0.15, codeStep - 0.5));
    const w3 = Math.min(1, Math.max(0.2, codeStep - 1.1));
    const cursorOn = reducedMotion ? true : Math.sin(phase * (isHyper ? 5.5 : 2.8)) > -0.15;

    // 6. Checklist notepad tasks (0..3)
    const autoChecked = Math.min(3, Math.floor(scrollProgress * 4.2));
    const checkedCount =
      manualCheckCount !== null
        ? manualCheckCount
        : reducedMotion
          ? 3
          : autoChecked;

    const padBounce =
      reducedMotion || padBounceAge > 1.0
        ? 0
        : Math.sin(padBounceAge * Math.PI * 6) * Math.exp(-padBounceAge * 4.5) * 1.1;
    const padTransform = translateAlong(P, [0, 0, padBounce]);

    // 7. Coffee mug lift & steam rings
    const mugLift =
      reducedMotion || coffeeLiftAge > 1.8
        ? 0
        : Math.sin(coffeeLiftAge * Math.PI * 2) * Math.exp(-coffeeLiftAge * 2.2) * 1.6;
    const mugTransform = translateAlong(P, [0, 0, mugLift]);

    const steamBaseDz = ((phase * 0.75) % (Math.PI * 2)) / (Math.PI * 2) * 1.9;
    const steamBoost = coffeeBoostTimer > 0 ? 0.8 : 0;
    const steamTransform = translateAlong(P, [0, 0, reducedMotion ? 0 : steamBaseDz + steamBoost]);

    // 8. Succulent plant jiggle
    const plantBreath = Math.sin(phase * 1.5) * 0.35;
    const plantJiggle =
      plantBounceAge > 1.2
        ? 0
        : Math.sin(plantBounceAge * Math.PI * 7) * Math.exp(-plantBounceAge * 3.8) * 1.5;
    const plantTransform = translateAlong(P, [0, 0, reducedMotion ? 0 : plantBreath + plantJiggle]);

    // 9. Stack of books top nudge
    const bookSlide =
      reducedMotion || bookShiftAge > 1.2
        ? 0
        : Math.sin(bookShiftAge * Math.PI * 3) * Math.exp(-bookShiftAge * 3.2) * 1.4;
    const bookTopTransform = translateAlong(P, [bookSlide * 0.7, bookSlide * 0.7, 0]);

    // 10. Lo-fi Equalizer Wave Bars on Headphones (Flow State)
    const eq1 = 0.5 + Math.sin(phase * 4.2) * 0.45;
    const eq2 = 0.5 + Math.cos(phase * 5.1) * 0.45;
    const eq3 = 0.5 + Math.sin(phase * 3.6 + 1.2) * 0.45;

    return {
      lampTransform,
      headTransform,
      isBlinking,
      isFlow,
      leftHandTransform,
      rightHandTransform,
      activeKeyA,
      activeKeyB,
      keyPressTransform,
      w1,
      w2,
      w3,
      cursorOn,
      checkedCount,
      padTransform,
      mugTransform,
      steamTransform,
      plantTransform,
      bookTopTransform,
      isHyper,
      eq1,
      eq2,
      eq3
    };
  }, [
    phase,
    reducedMotion,
    hyperTypingTimer,
    coffeeBoostTimer,
    lampRecoilAge,
    coffeeLiftAge,
    padBounceAge,
    plantBounceAge,
    bookShiftAge,
    scrollProgress,
    manualCheckCount,
    engineerMood
  ]);

  // Telemetry status labels
  const coffeeLevel = 4 - coffeeSips;
  const coffeeBar = coffeeLevel === 0 ? 'EMPTY' : '▮'.repeat(coffeeLevel) + '▯'.repeat(4 - coffeeLevel);

  return (
    <figure
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="iso w-full overflow-visible"
    >
      <div
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className="relative select-none group"
      >
        <svg
          className="iso-svg w-full h-auto overflow-visible"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Interactive Isometric Engineer Coding Workstation with clickable peripherals, real-time telemetry, and scroll-driven parallax"
        >
          <defs>
            <linearGradient id="iso-lamp-glow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" stopOpacity={lampLit ? '0.34' : '0'} />
              <stop offset="55%" stopColor="#fef08a" stopOpacity={lampLit ? '0.14' : '0'} />
              <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
            </linearGradient>
            <filter id="iso-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ==============================================================
              1. TWO-TIER PLATFORM BASE, 4 CORNER BOLTS, INNER DECK & MAT
              ============================================================== */}
          <path className="iso-halo" d={geo.base.halo} />
          <Solid paths={geo.base.lowerGreenTier} tone="hi" crease="faint" color="forest" />
          <Solid
            paths={geo.base.upperSandTier}
            tone="mid"
            crease="faint"
            halo={hovered}
            color="sand"
          />
          <Line d={geo.base.upperSeam} tone="faint" />
          <Line d={geo.base.boltRings} tone="lo" />
          <Dots points={geo.base.boltDots} size={0.55} tone="mid" />

          {/* Raised Inner Deck & Forest Desk Mat */}
          <Solid paths={geo.base.innerDeck} tone="mid" crease="faint" color="sand" />
          <Line d={geo.base.innerGroove} tone="faint" />
          <Solid paths={geo.base.deskMat} tone="hi" crease="none" color="forest" />
          <Line d={geo.base.deskMatOutline} tone="lo" />

          {/* ==============================================================
              2. BACK-RIGHT: ARCHITECT LAMP & WIDESCREEN CODE MONITOR
              ============================================================== */}
          {/* Interactive Architect Lamp Group */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              toggleLamp();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLamp();
              }
            }}
            aria-label="Toggle Architect Task Lamp"
            className="cursor-pointer group/lamp focus:outline-none"
          >
            <Solid paths={geo.backRig.lampBase} tone="mid" crease="faint" color="sand" />
            <Solid paths={geo.backRig.lampPost} tone="mid" crease="faint" color="sand" />
            <Line d={geo.backRig.lampPostSeam} tone="faint" />
            <Solid paths={geo.backRig.lampShoulder} tone="mid" crease="faint" color="sand" />

            <g transform={anim.lampTransform}>
              {lampLit && (
                <>
                  <path d={geo.backRig.beamPolygon} fill="url(#iso-lamp-glow)" />
                  <Line d={geo.backRig.beamRays} tone="faint" dashed flow />
                </>
              )}
              <Solid paths={geo.backRig.lampArm} tone="mid" crease="faint" color="sand" />
              <Solid paths={geo.backRig.lampHood} tone="hi" crease="faint" color="forest" />
              <Line d={geo.backRig.lampLedLine} tone={lampLit ? 'lit' : 'lo'} />
            </g>
          </g>

          {/* Interactive Widescreen Code Monitor Group */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              triggerHyperTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerHyperTyping();
              }
            }}
            aria-label="Widescreen Code Monitor - Click to trigger compilation burst"
            className="cursor-pointer group/mon focus:outline-none"
          >
            <Solid paths={geo.backRig.monBase} tone="mid" crease="faint" color="sand" />
            <Solid paths={geo.backRig.monBasePad} tone="hi" crease="none" color="forest" />
            <Solid paths={geo.backRig.monNeck} tone="mid" crease="none" color="sand" />
            <Solid paths={geo.backRig.monChassis} tone="hi" crease="faint" color="sand" />

            {/* Front Plane of Widescreen Monitor (+Y face facing viewer) */}
            <g transform={geo.backRig.monTransform}>
              <path
                d={geo.backRig.monBezelPath}
                fill="#f3efe6"
                stroke="#57534d"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={geo.backRig.monScreenPath}
                fill="#153626"
                stroke="#0f2318"
                strokeWidth="0.65"
                vectorEffect="non-scaling-stroke"
              />
              {/* 5 Left-Gutter Module Square Icons */}
              {[0, 1, 2, 3, 4].map((row) => {
                const zPos = -30.5 + row * 3.2;
                return (
                  <rect
                    key={row}
                    x="5.2"
                    y={zPos}
                    width="1.5"
                    height="1.5"
                    rx="0.25"
                    fill={row === anim.checkedCount ? '#86efac' : '#6be0a0'}
                  />
                );
              })}
              {/* Animated Syntax Code Lines (Accelerates during HyperTyping) */}
              <path
                d={`M8.4 -29.8 H${8.4 + 13.5 * anim.w1}`}
                stroke="#6be0a0"
                strokeWidth="1.0"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={`M8.4 -26.6 H${8.4 + 9.8 * anim.w2}`}
                stroke="#fbfbf9"
                strokeWidth="0.95"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M8.4 -23.4 H14.2"
                stroke="#fbfbf9"
                strokeWidth="0.95"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={`M15.4 -23.4 H${15.4 + 6.8 * anim.w3}`}
                stroke="#6be0a0"
                strokeWidth="0.95"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M8.4 -20.2 H18.8 M8.4 -17.0 H14.5"
                stroke="#fbfbf9"
                strokeWidth="0.95"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M15.8 -17.0 H19.6"
                stroke="#6be0a0"
                strokeWidth="1.0"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {anim.cursorOn && (
                <rect
                  x="20.6"
                  y="-17.8"
                  width="1.8"
                  height="1.5"
                  fill={anim.isHyper ? '#86efac' : '#fbfbf9'}
                />
              )}
            </g>
          </g>

          {/* ==============================================================
              3. BACK-LEFT: GAMING CHAIR & ENGINEER IN GREEN HOODIE
              ============================================================== */}
          <Solid paths={geo.engineer.chairSeat} tone="mid" crease="faint" color="sand" />
          <Solid paths={geo.engineer.chairBackOuter} tone="mid" crease="faint" color="sand" />
          <Solid paths={geo.engineer.chairBackInner} tone="hi" crease="faint" color="forest" />
          <Solid paths={geo.engineer.headrestOuter} tone="mid" crease="faint" color="sand" />
          <Solid paths={geo.engineer.headrestInner} tone="hi" crease="faint" color="forest" />

          {/* Left Sleeve (Behind Torso) */}
          <Solid paths={geo.engineer.leftSleeve} tone="hi" crease="faint" color="forest" />

          {/* Engineer Green Hoodie Torso, White Drawstrings, Hood Collar & Neck */}
          <Solid paths={geo.engineer.torso} tone="hi" crease="faint" color="forest" />
          <Line d={geo.engineer.torsoSeam} tone="faint" />
          <path
            d={geo.engineer.drawstrings}
            fill="none"
            stroke="#fcfaf5"
            strokeWidth="1.15"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <Dots points={geo.engineer.drawstringTips} size={0.5} tone="hi" />
          <Solid paths={geo.engineer.hoodCollar} tone="hi" crease="faint" color="forest" />
          <Solid paths={geo.engineer.neck} tone="mid" crease="none" color="sand" />

          {/* ==============================================================
              4A. CENTER: OPEN CODING LAPTOP DECK & KEYBOARD MATRIX
              ============================================================== */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              triggerHyperTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerHyperTyping();
              }
            }}
            aria-label="Coding Laptop - Click to burst compile and type furiously"
            className="cursor-pointer group/laptop focus:outline-none"
          >
            <Solid paths={geo.laptop.deck} tone="hi" crease="faint" color="sand" />
            <Line d={geo.laptop.kbWell} tone="lo" />

            {/* 15 Animated Mechanical Keycaps */}
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
                    color={isPressed ? 'forest' : 'sage'}
                  />
                </g>
              );
            })}
          </g>

          {/* Left & Right Chibi Hands Resting Above the Laptop Deck */}
          <g transform={anim.leftHandTransform}>
            <Solid paths={geo.engineer.leftHand} tone="hi" crease="faint" color="sand" />
          </g>
          <Solid paths={geo.engineer.rightSleeve} tone="hi" crease="faint" color="forest" />
          <g transform={anim.rightHandTransform}>
            <Solid paths={geo.engineer.rightHand} tone="hi" crease="faint" color="sand" />
          </g>

          {/* Animated Chibi Head, Centered Expressive Face, Green Hair & `</>` Headphones */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              toggleEngineerMood();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleEngineerMood();
              }
            }}
            aria-label="Engineer Character - Click to toggle between focused and flow audio mode"
            className="cursor-pointer group/engineer focus:outline-none"
            transform={anim.headTransform}
          >
            {/* Back/Left Headphone Earcup */}
            <Solid paths={geo.engineer.earcupBack} tone="mid" crease="faint" color="sand" />

            {/* Proportionate Rounded Isometric Head & Green Hair Cap */}
            <Solid paths={geo.engineer.head} tone="hi" crease="faint" color="sand" />
            <Solid paths={geo.engineer.hairBack} tone="hi" crease="faint" color="forest" />
            <Solid paths={geo.engineer.hairFront} tone="hi" crease="faint" color="forest" />
            <Line d={geo.engineer.hairWaves} tone="lo" />

            {/* Centered Expressive Face on the +X Plane (Bangs, Eyebrows, Eyes & Smile) */}
            <g transform={geo.engineer.faceTransform}>
              {/* Wavy Front Hair Fringe / Bangs Along Top of Forehead */}
              <path
                d="M-4.6 -31.6 Q-3.0 -30.2 -1.4 -31.4 Q0.0 -30.0 1.6 -31.4 Q3.1 -30.2 4.6 -31.6"
                fill="none"
                stroke="#153626"
                strokeWidth="1.05"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* Curved Eyebrows */}
              <path
                d="M1.6 -29.3 Q2.5 -29.9 3.4 -29.3 M-3.4 -29.3 Q-2.5 -29.9 -1.6 -29.3"
                fill="none"
                stroke="#153626"
                strokeWidth="0.85"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* Expressive Eyes: Cheerful Squint (^ _ ^) in Flow mode, or Blinking/Open in Focus mode */}
              {anim.isFlow ? (
                // Happy curved eyes in flow state
                <path
                  d="M-3.5 -27.2 Q-2.5 -28.4 -1.5 -27.2 M1.5 -27.2 Q2.5 -28.4 3.5 -27.2"
                  fill="none"
                  stroke="#153626"
                  strokeWidth="0.95"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ) : anim.isBlinking ? (
                <path
                  d="M1.6 -27.1 Q2.5 -26.5 3.4 -27.1 M-3.4 -27.1 Q-2.5 -26.5 -1.6 -27.1"
                  fill="none"
                  stroke="#153626"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ) : (
                <>
                  <ellipse cx="2.5" cy="-27.1" rx="0.8" ry="1.15" fill="#153626" />
                  <ellipse cx="-2.5" cy="-27.1" rx="0.8" ry="1.15" fill="#153626" />
                </>
              )}

              {/* Friendly Centered Smile */}
              <path
                d={anim.isFlow ? 'M-1.3 -24.2 Q0.0 -23.0 1.3 -24.2' : 'M-1.0 -24.4 Q0.0 -23.5 1.0 -24.4'}
                fill="none"
                stroke="#153626"
                strokeWidth="0.85"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Snug Cream Headband Arch & Front Earcup with Forest Disc + `</>` Icon */}
            <Solid paths={geo.engineer.headband} tone="mid" crease="faint" color="sand" />
            <Solid paths={geo.engineer.earcupFrontOuter} tone="hi" crease="faint" color="sand" />
            <Solid paths={geo.engineer.earcupFrontInner} tone="hi" crease="none" color="forest" />
            <g transform={geo.engineer.earcupLogoTransform}>
              <path
                d="M-0.8 -0.7 L-1.5 0 L-0.8 0.7 M0.8 -0.7 L1.5 0 L0.8 0.7 M0.25 -0.95 L-0.25 0.95"
                fill="none"
                stroke="#fcfaf5"
                strokeWidth="0.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* Animated Pulsing Soundwave Equalizer Waves (Flow State) */}
              {anim.isFlow && (
                <g opacity="0.85">
                  <line
                    x1="2.2"
                    y1={-1.4 * anim.eq1}
                    x2="2.2"
                    y2={1.4 * anim.eq1}
                    stroke="#1b4330"
                    strokeWidth="0.55"
                    strokeLinecap="round"
                  />
                  <line
                    x1="3.1"
                    y1={-1.8 * anim.eq2}
                    x2="3.1"
                    y2={1.8 * anim.eq2}
                    stroke="#1b4330"
                    strokeWidth="0.55"
                    strokeLinecap="round"
                  />
                  <line
                    x1="4.0"
                    y1={-1.2 * anim.eq3}
                    x2="4.0"
                    y2={1.2 * anim.eq3}
                    stroke="#1b4330"
                    strokeWidth="0.55"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </g>
          </g>

          {/* ==============================================================
              4B. OPEN LAPTOP DISPLAY LID + FOREST GREEN EMBLEM ON BACK
              ============================================================== */}
          <Solid paths={geo.laptop.hinge} tone="mid" crease="none" color="sand" />
          <Solid paths={geo.laptop.lid} tone="hi" crease="faint" color="sand" />
          <Line d={geo.laptop.lidTopInset} tone="faint" />
          <Solid paths={geo.laptop.lidLogo} tone="hi" crease="none" color="forest" />

          {/* ==============================================================
              5. FOREGROUND ITEMS: BOOKS, PLANT, `</>` MUG, PHONE, CASE, NOTEPAD
              ============================================================== */}
          {/* 5A. Stack of Two Forest Hardcover Books with Sand Pages */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              nudgeBooks();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                nudgeBooks();
              }
            }}
            aria-label="Documentation Books - Click to nudge"
            className="cursor-pointer group/books focus:outline-none"
          >
            <Solid paths={geo.frontItems.book1Bottom} tone="hi" crease="none" color="forest" />
            <Solid paths={geo.frontItems.book1Pages} tone="mid" crease="faint" color="sand" />
            <Solid paths={geo.frontItems.book1Top} tone="hi" crease="faint" color="forest" />

            <g transform={anim.bookTopTransform}>
              <Solid paths={geo.frontItems.book2Bottom} tone="hi" crease="none" color="forest" />
              <Solid paths={geo.frontItems.book2Pages} tone="mid" crease="faint" color="sand" />
              <Solid paths={geo.frontItems.book2Top} tone="hi" crease="faint" color="forest" />
            </g>
          </g>

          {/* 5B. Potted Succulent Plant */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              pokePlant();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                pokePlant();
              }
            }}
            aria-label="Succulent Desk Plant - Click to jiggle"
            className="cursor-pointer group/plant focus:outline-none"
          >
            <Solid paths={geo.frontItems.pot} tone="hi" crease="faint" color="sand" />
            <Line d={geo.frontItems.potRim} tone="lo" />
            <g transform={anim.plantTransform}>
              <Solid paths={geo.frontItems.plantTier1} tone="hi" crease="faint" color="forest" />
              <Solid paths={geo.frontItems.plantTier2} tone="hi" crease="faint" color="sage" />
              <Line d={geo.frontItems.plantLeafLines} tone="lo" />
              <Solid paths={geo.frontItems.plantBud} tone="hi" crease="none" color="forest" />
            </g>
          </g>

          {/* 5C. Front-Left `</>` Coffee Mug on Coaster + Rising Steam Rings */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              sipCoffee();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                sipCoffee();
              }
            }}
            aria-label="Coffee Mug - Click to take a sip and boost speed"
            className="cursor-pointer group/mug focus:outline-none"
          >
            <Solid paths={geo.frontItems.coaster} tone="mid" crease="faint" color="sand" />
            <Line d={geo.frontItems.coasterInset} tone="faint" />

            <g transform={anim.mugTransform}>
              <Solid paths={geo.frontItems.mugHandle} tone="mid" crease="none" color="sand" />
              <Solid paths={geo.frontItems.mugBody} tone="hi" crease="faint" color="sand" />
              <Solid
                paths={geo.frontItems.mugCoffee}
                tone="hi"
                crease="none"
                color={coffeeLevel === 0 ? 'sand' : 'forest'}
              />
              <g transform={geo.frontItems.mugLogoTransform}>
                <path
                  d="M-0.8 -0.65 L-1.5 0 L-0.8 0.65 M0.8 -0.65 L1.5 0 L0.8 0.65 M0.25 -0.9 L-0.25 0.9"
                  fill="none"
                  stroke="#1b4330"
                  strokeWidth="0.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            </g>

            <g transform={anim.steamTransform}>
              {geo.frontItems.steamRings.map((sPath, idx) => (
                <Line
                  key={idx}
                  d={sPath}
                  tone={idx === 0 ? 'mid' : 'faint'}
                  dashed={idx === 2}
                />
              ))}
            </g>
          </g>

          {/* 5D. Isometric Smartphone */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              togglePhone();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePhone();
              }
            }}
            aria-label="Smartphone Test Rig - Click to wake or standby"
            className="cursor-pointer group/phone focus:outline-none"
          >
            <Solid paths={geo.frontItems.phoneBody} tone="hi" crease="faint" color="sand" />
            <Solid
              paths={geo.frontItems.phoneScreen}
              tone="hi"
              crease="none"
              color={phoneAwake ? 'sage' : 'forest'}
            />
            <Line d={geo.frontItems.phoneBar} tone={phoneAwake ? 'lit' : 'mid'} />

            {/* Notification Indicator Dot & Bars when Awake */}
            {phoneAwake && (
              <g>
                <Dots points={geo.frontItems.phoneNoticeDot} size={0.55} tone="hi" />
                <Line d={geo.frontItems.phoneNoticeLines} tone="hi" />
              </g>
            )}
          </g>

          {/* 5E. Small Rounded Accessory Case */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              toggleCase();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCase();
              }
            }}
            aria-label="Accessory Case - Click to toggle LED"
            className="cursor-pointer group/case focus:outline-none"
          >
            <Solid paths={geo.frontItems.caseBody} tone="hi" crease="faint" color="sand" />
            <Line d={geo.frontItems.caseSeam} tone="lo" />
            <Dots
              points={geo.frontItems.caseLed}
              size={caseActive ? 0.65 : 0.45}
              tone={caseActive ? 'lit' : 'mid'}
            />
          </g>

          {/* 5F. Spiral Checklist Notepad */}
          <g
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              cycleChecklist();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                cycleChecklist();
              }
            }}
            aria-label="Milestone Checklist Notepad - Click to toggle tasks"
            className="cursor-pointer group/notepad focus:outline-none"
            transform={anim.padTransform}
          >
            <Solid paths={geo.frontItems.padBody} tone="hi" crease="faint" color="sand" />
            <Line d={geo.frontItems.spiralRings} tone="hi" />
            {geo.frontItems.checkBoxes.map((cb, idx) => {
              const isChecked = idx < anim.checkedCount;
              return (
                <React.Fragment key={idx}>
                  {isChecked ? (
                    <Solid paths={cb.fillSlab} tone="hi" crease="none" color="sage" />
                  ) : (
                    <Line d={cb.box} tone="mid" />
                  )}
                  <Line d={cb.line} tone={isChecked ? 'lo' : 'faint'} />
                </React.Fragment>
              );
            })}
          </g>
        </svg>

        {/* Live Anatomy Telemetry Status Ribbon */}
        <div className="mt-3 pt-2.5 border-t border-[#e5e2dc]/80 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3 text-[10px] font-mono tracking-wider text-[#6e6b65] uppercase select-none">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleLamp}
              className="inline-flex items-center gap-1.5 font-medium text-[#1b4330] hover:text-[#0f2318] focus:outline-none transition-colors"
              title="Click to toggle architect lamp"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  lampLit ? 'bg-[#1b4330] animate-pulse' : 'bg-[#d0ccc3]'
                }`}
              />
              <span>
                {telemetryMessage ||
                  (anim.isHyper
                    ? 'STATUS: BURST COMPILING'
                    : anim.isFlow
                      ? 'AUDIO: LO-FI VIBES'
                      : 'STATUS: READY')}
              </span>
            </button>
            <span className="text-[#d0ccc3]">&bull;</span>
            <button
              type="button"
              onClick={sipCoffee}
              className="hidden xs:inline hover:text-[#1b4330] focus:outline-none transition-colors"
              title="Click to take a sip of coffee"
            >
              COFFEE: <span className="text-[#1b4330] font-medium">{coffeeBar}</span>
            </button>
            <span className="text-[#d0ccc3] hidden xs:inline">&bull;</span>
            <button
              type="button"
              onClick={cycleChecklist}
              className="hover:text-[#1b4330] focus:outline-none transition-colors"
              title="Click to cycle checklist tasks"
            >
              TASKS: <span className="text-[#1b4330] font-medium">{anim.checkedCount}/3</span>
            </button>
          </div>

          <div className="text-[9px] text-[#9c9890] tracking-normal">
            [CLICK ITEMS &bull; SCROLL TO EXPLORE]
          </div>
        </div>
      </div>
    </figure>
  );
}
