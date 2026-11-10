import React, { useEffect, useMemo, useState } from 'react';
import {
  boxCorners,
  coil,
  corners,
  cylinder,
  fitProjection,
  haloOf,
  insetPlan,
  iso,
  lineOnTop,
  onTop,
  pathOf,
  planOutline,
  ring,
  roundedPlan,
  sideMatrix,
  slabOf,
  translateAlong,
  type Flat,
  type LineTone,
  type Plan,
  type Point3,
  type SolidPaths,
  type Tone
} from '../utils/isoKit';

// ============================================================================
// ANATOMY REACT DRAWING PRIMITIVES (wheresryan22/anatomy kit/react/draw.tsx)
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
  sand: {
    fill: '#f7f3eb',
    top: '#fcfaf5',
    shades: ['#d6cebf', '#e1d9cb', '#ebe4d8', '#f3efe6'],
    edge: '#2c2a27',
    crease: '#cfc6b6'
  },
  sage: {
    fill: '#e3eee7',
    top: '#eef6f1',
    shades: ['#b6cebf', '#c4d8cc', '#d2e2d8', '#e0ece5'],
    edge: '#1e3a2b',
    crease: '#adc6b7'
  },
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
  color
}: SolidProps) {
  const pal = color ? MATERIAL_PALETTES[color] : undefined;
  return (
    <g
      className="iso-solid"
      data-lit={lit ? '' : undefined}
      data-seamless={paths.seamless ? '' : undefined}
    >
      {halo ? <path className="iso-halo" d={paths.fill} /> : null}
      <path
        className="iso-fill"
        d={paths.fill}
        style={pal ? { fill: pal.fill } : undefined}
      />
      {flat
        ? null
        : paths.shades.map((d, shade) =>
            d ? (
              <path
                key={shade}
                className="iso-shade"
                data-shade={shade}
                d={d}
                style={pal ? { fill: pal.shades[shade] || pal.shades[0] } : undefined}
              />
            ) : null
          )}
      {flat ? null : (
        <path
          className="iso-top"
          d={paths.top}
          style={pal ? { fill: pal.top } : undefined}
        />
      )}
      {crease === 'none' || !paths.crease ? null : (
        <path
          className="iso-line iso-crease"
          data-tone={crease}
          d={paths.crease}
          style={pal ? { stroke: pal.crease } : undefined}
        />
      )}
      {crease === 'none' || !paths.bevel ? null : (
        <path
          className="iso-line iso-bevel"
          data-tone={crease}
          d={paths.bevel}
          style={pal ? { stroke: pal.crease } : undefined}
        />
      )}
      <path
        className="iso-line iso-edge"
        data-tone={tone}
        d={paths.outline}
        style={pal ? { stroke: pal.edge } : undefined}
      />
    </g>
  );
}

function Line({
  d,
  tone = 'lo',
  stroke
}: {
  d: string;
  tone?: LineTone;
  stroke?: string;
}) {
  if (!d) return null;
  return (
    <path
      className="iso-line"
      data-tone={tone}
      d={d}
      style={stroke ? { stroke } : undefined}
    />
  );
}

const tenth = (v: number) => Math.round(v * 10) / 10;

function Dots({
  points,
  size = 0.65,
  tone = 'mid',
  fill
}: {
  points: Flat[];
  size?: number;
  tone?: Tone;
  fill?: string;
}) {
  return (
    <g className="iso-dots" data-tone={tone}>
      {points.map(([x, y], index) => (
        <circle
          key={index}
          cx={tenth(x)}
          cy={tenth(y)}
          r={size}
          style={fill ? { fill } : undefined}
        />
      ))}
    </g>
  );
}

// ============================================================================
// COMPUTER ANATOMY SPINE NODES ("TITIK" POROS TIMELINE ISOMETRIK)
// Adapted directly from wheresryan22/anatomy's desk-computer & hardware craft:
//   01: All-in-One CRT Desk Computer + Mechanical Keyboard + Coiled Cord
//   02: Linux VPS Server Rack Tower + Sliding Hot-Swap Docker Blade Bays
//   03: Motherboard PCB + Finned CPU Heatsink + 4 DDR RAM DIMMs + Capacitor Bank
//   04: Open Notebook Workstation + Docked Mobile Handset + Coiled Debug Cord
// ============================================================================

const VIEW_W = 108;
const VIEW_H = 108;
const PLATE: Plan = { x: -34, y: -32, w: 68, d: 72, r: 5 };
const PLATE_H = 4.5;
const FOOT_H = 2.5;

const P = fitProjection(
  [
    ...boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    ...boxCorners({ x: -32, y: -30, w: 64, d: 68, r: 0 }, 0, 52)
  ],
  VIEW_W,
  VIEW_H,
  { pad: 6, azimuth: 56, elevation: 30 }
);

const at = (pt: Point3) => iso(pt, P);
const join = (list: string[]) => list.filter(Boolean).join('');

function flatRectOnFront(x0: number, z0: number, x1: number, z1: number, r: number, steps = 5) {
  return pathOf(
    roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([u, z]) => [u, -z]),
    true
  );
}

function buildComputerAnatomyGeometries() {
  // Shared precision bench plate with 4 feet, inset groove, and corner screws
  const footCoords = corners(PLATE, 7.5);
  const screwCoords = corners(PLATE, 4.5);

  const base = {
    halo: haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P),
    feet: footCoords.map(([fx, fy]) => cylinder(fx, fy, 3.2, -PLATE_H - FOOT_H, FOOT_H, P, 16)),
    slab: slabOf(PLATE, -PLATE_H, PLATE_H, P, 6, 0.9),
    groove: planOutline(insetPlan(PLATE, 2.6), 0, P),
    screws: screwCoords.map(([sx, sy]) => at([sx, sy, 0])),
    screwRings: join(screwCoords.map(([sx, sy]) => ring(sx, sy, 1.2, 0, P, 12)))
  };

  // --------------------------------------------------------------------------
  // 01. DESK COMPUTER ANATOMY (PT Inpartner Optima Integra)
  // All-in-one 1984-style CRT computer case + front CRT screen + floppy slot
  // + mechanical keyboard with individual keys + coiled keyboard cord.
  // --------------------------------------------------------------------------
  const pcCase: Plan = { x: -21, y: -22, w: 42, d: 36, r: 3.2 };
  const pcFrontY = pcCase.y + pcCase.d; // y = 14
  const pcTopZ = 48;
  const kbPlan: Plan = { x: -24, y: 19, w: 48, d: 17, r: 2 };

  // 12 individual mechanical keycaps in 2 rows on the keyboard
  const keyPlans: Plan[] = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 6; col++) {
      keyPlans.push({
        x: -20.5 + col * 6.9,
        y: 21 + row * 6.8,
        w: 5.8,
        d: 5.6,
        r: 0.8
      });
    }
  }

  const crtTransform = sideMatrix([0, pcFrontY], 0, P, 'left');
  const crtBezelPath = flatRectOnFront(-16, 20, 16, 44, 2.2);
  const crtGlassPath = flatRectOnFront(-13.5, 22.5, 13.5, 41.5, 2.6);
  const floppySlotPath = flatRectOnFront(2, 12.5, 15, 14.8, 0.8);
  const speakerGrillePath = join(
    [0, 1, 2, 3, 4].map((i) => flatRectOnFront(-15 + i * 2.2, 11.5, -14 + i * 2.2, 15.5, 0.3, 2))
  );

  // Scanlines & prompt inside CRT
  const scanLines: string[] = [];
  for (let z = 25; z <= 39; z += 2.8) {
    scanLines.push(`M-11 ${-z}H11`);
  }

  // Top vents on the CRT case
  const topVents = join(
    [0, 1, 2, 3, 4].map((i) =>
      planOutline({ x: -12, y: pcCase.y + 6 + i * 2.6, w: 24, d: 1.0, r: 0.4 }, pcTopZ, P, 3)
    )
  );

  const kbCord = coil(10, 22, [25.5, 1.8], 1.6, 8, 'y', P);

  const deskComputer = {
    plinth: slabOf(insetPlan(pcCase, 1.5), 0, 2.2, P, 5),
    body: slabOf(pcCase, 2.2, pcTopZ - 2.2, P, 6, 0.9),
    handle: planOutline({ x: -13, y: pcCase.y + 2.2, w: 26, d: 3.5, r: 1.5 }, pcTopZ, P, 5),
    topVents,
    crtTransform,
    crtBezelPath,
    crtGlassPath,
    floppySlotPath,
    speakerGrillePath,
    scanLines: scanLines.join(''),
    ledDot: [at([-15, pcFrontY, 9])],
    sidePort: slabOf({ x: pcCase.x + pcCase.w, y: 4, w: 2.2, d: 5, r: 0.6 }, 3, 4, P, 3),
    kbBase: slabOf(kbPlan, 0.5, 3.2, P, 4, 0.5),
    kbWell: planOutline(insetPlan(kbPlan, 1.8), 3.7, P, 3),
    keys: keyPlans.map((kp) => slabOf(kp, 3.7, 2.2, P, 3, 0.3)),
    keyTops: keyPlans.map((kp) => planOutline(insetPlan(kp, 0.8), 5.9, P, 2)),
    kbCord
  };

  // --------------------------------------------------------------------------
  // 02. SERVER RACK & DOCKER BLADE ANATOMY (WALHI Jawa Barat)
  // Vertical Linux VPS rack chassis + 4 hot-swap blade bays (1 pulls out)
  // + side cooling louvers + dual redundant PSU cylinders + patch cord.
  // --------------------------------------------------------------------------
  const rackPlan: Plan = { x: -20, y: -18, w: 40, d: 36, r: 2.5 };
  const rackTopZ = 48;
  const bladeZs = [5, 15, 25, 35];
  const bladePlan: Plan = { x: -16.5, y: -12, w: 33, d: 31, r: 1.5 };

  const serverRack = {
    plinth: slabOf(insetPlan(rackPlan, 1.5), 0, 2.5, P, 4),
    chassisBack: slabOf({ x: -20, y: -18, w: 40, d: 28, r: 2.5 }, 2.5, rackTopZ - 2.5, P, 5, 0.8),
    topFanRing: ring(0, -4, 11, rackTopZ, P, 24),
    topFanHub: cylinder(0, -4, 4.2, rackTopZ, 1.2, P, 16),
    blades: bladeZs.map((bz) => ({
      body: slabOf(bladePlan, bz, 7.5, P, 4, 0.5),
      handle: slabOf({ x: -12, y: 19, w: 24, d: 2.2, r: 0.7 }, bz + 1.8, 3.8, P, 3),
      leds: [at([-13.5, 19, bz + 5.5]), at([-10.5, 19, bz + 5.5])]
    })),
    psuCylinders: [-26, 26].map((px) => cylinder(px, -10, 4.8, 0, 18, P, 20, 0.5)),
    patchCord: coil(-8, 14, [26, 2.0], 1.8, 7, 'y', P)
  };

  // --------------------------------------------------------------------------
  // 03. MOTHERBOARD, CPU SOCKET & RAM DIMM ANATOMY (PC Fatayat NU Sukabumi)
  // Multi-layer mainboard PCB + central CPU socket & finned cooler tower
  // + 4 vertical DDR memory DIMM sticks + VRM capacitor bank + I/O shield.
  // --------------------------------------------------------------------------
  const pcbPlan: Plan = { x: -28, y: -24, w: 56, d: 52, r: 2.5 };
  const cpuPlan: Plan = { x: -12, y: -12, w: 22, d: 22, r: 2 };
  const ramYs = [-18, -13.5, -9, -4.5];
  const capCoords: Flat[] = [
    [-21, -16],
    [-21, -8],
    [-21, 0],
    [-21, 8]
  ];

  // PCB copper bus traces leading from CPU to RAM and Southbridge
  const busTraces = join([
    lineOnTop([10, -10], [22, -10], 3.2, P),
    lineOnTop([10, -6], [22, -6], 3.2, P),
    lineOnTop([10, -2], [22, -2], 3.2, P),
    lineOnTop([-6, 10], [-6, 22], 3.2, P),
    lineOnTop([0, 10], [0, 22], 3.2, P),
    lineOnTop([6, 10], [6, 22], 3.2, P)
  ]);

  const motherboard = {
    pcb: slabOf(pcbPlan, 0, 3.2, P, 5, 0.5),
    pcbOutline: planOutline(insetPlan(pcbPlan, 2.0), 3.2, P, 4),
    busTraces,
    ioTower: slabOf({ x: -26, y: -22, w: 9, d: 24, r: 1.2 }, 3.2, 16, P, 3, 0.5),
    vrmCaps: capCoords.map(([cx, cy]) => cylinder(cx, cy, 2.8, 3.2, 7.5, P, 16, 0.4)),
    cpuSocket: slabOf({ x: -14, y: -14, w: 26, d: 26, r: 2 }, 3.2, 2.8, P, 4),
    cpuHeatsink: slabOf(cpuPlan, 6.0, 14, P, 4, 0.8),
    cpuFanRing: ring(-1, -1, 8.2, 20.0, P, 24),
    cpuFanHub: cylinder(-1, -1, 3.4, 20.0, 2.2, P, 16),
    ramSlots: [14, 18.5, 23].map((rx) =>
      slabOf({ x: rx, y: -19, w: 3.0, d: 26, r: 0.6 }, 3.2, 13.5, P, 3, 0.4)
    ),
    southbridge: slabOf({ x: -10, y: 13, w: 22, d: 11, r: 1.5 }, 3.2, 4.5, P, 4, 0.5),
    southbridgeFins: join(
      [-6, -2, 2, 6].map((gx) => lineOnTop([gx, 14.5], [gx, 22.5], 7.7, P))
    ),
    ramYs
  };

  // --------------------------------------------------------------------------
  // 04. LAPTOP WORKSTATION & MOBILE HANDSET DOCK ANATOMY (Freelance Practice)
  // Open isometric laptop (base deck + keyboard + trackpad + upright screen)
  // + docked smartphone handset in test cradle + coiled debug cable.
  // --------------------------------------------------------------------------
  const laptopBase: Plan = { x: -28, y: -8, w: 38, d: 30, r: 2.2 };
  const laptopLid: Plan = { x: -28, y: -13, w: 38, d: 4.5, r: 1.8 };
  const lidFrontY = laptopLid.y + laptopLid.d;
  const lidTransform = sideMatrix([0, lidFrontY], 0, P, 'left');
  const lidScreenPath = flatRectOnFront(-25, 7, 7, 32, 1.5);
  const lidCodeLines = [13, 17, 21, 25].map((z, idx) => `M-22 ${-z}H${idx % 2 === 0 ? 2 : -5}`).join('');

  // Laptop keyboard key rows
  const laptopKeys: SolidPaths[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      laptopKeys.push(
        slabOf(
          { x: -25 + c * 6.6, y: -4 + r * 5.2, w: 5.4, d: 4.2, r: 0.6 },
          4.0,
          1.4,
          P,
          2
        )
      );
    }
  }

  // Mobile Handset Dock on the right side of the bench
  const dockPlan: Plan = { x: 14, y: 2, w: 16, d: 20, r: 2 };
  const phonePlan: Plan = { x: 16, y: 4, w: 12, d: 16, r: 2 };

  const laptopMobile = {
    laptopDeck: slabOf(laptopBase, 0, 4.0, P, 5, 0.6),
    trackpad: planOutline({ x: -15, y: 13, w: 12, d: 6.5, r: 1 }, 4.0, P, 3),
    laptopKeys,
    laptopLid: slabOf(laptopLid, 3.5, 32, P, 4, 0.7),
    lidTransform,
    lidScreenPath,
    lidCodeLines,
    dockBase: slabOf(dockPlan, 0, 4.5, P, 4, 0.5),
    phoneBody: slabOf(phonePlan, 4.5, 18, P, 4, 0.7),
    phoneScreen: planOutline(insetPlan(phonePlan, 1.6), 22.5, P, 3),
    phoneSpeaker: onTop([[20, 6.5], [24, 6.5]], 22.5, P),
    usbCoil: coil(-4, 6, [15, 2.0], 1.5, 5, 'y', P)
  };

  return { base, deskComputer, serverRack, motherboard, laptopMobile };
}

export function ExperienceSpinePin({
  index,
  company,
  isActive,
  isPassed,
  scrollProgress = 0,
  reducedMotion = false,
  onClick
}: {
  index: number;
  company: string;
  isActive: boolean;
  isPassed: boolean;
  scrollProgress?: number;
  reducedMotion?: boolean;
  onClick: () => void;
}) {
  const geo = useMemo(() => buildComputerAnatomyGeometries(), []);
  const [phase, setPhase] = useState(0);
  const [hovered, setHovered] = useState(false);

  const safeIdx = Math.min(3, Math.max(0, index));
  const shouldAnimate = (isActive || hovered) && !reducedMotion;

  useEffect(() => {
    if (!shouldAnimate) return;
    let rafId = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      setPhase((prev) => prev + dt * Math.PI * 2 * (hovered ? 1.1 : 0.65));
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [shouldAnimate, hovered]);

  const effectivePhase = phase + scrollProgress * Math.PI * 6;
  const sinP = Math.sin(effectivePhase);

  // Dynamic mechanical animations for each Computer Anatomy node
  const anim = useMemo(() => {
    // 01: Typing keys on the mechanical keyboard + CRT cursor blink
    const activeKeyIdx = Math.floor(((effectivePhase * 2.5) % 12 + 12) % 12);
    const keyPressTransform = translateAlong(P, [0, 0, -1.6]);
    const cursorVisible = Math.sin(effectivePhase * 3) > -0.2;

    // 02: Hot-swap Docker server blade #2 sliding out along +Y towards the viewer
    const bladePullY = isActive || hovered ? (sinP + 1) * 4.2 : 0;
    const bladeSlideTransform = translateAlong(P, [0, bladePullY, 0]);
    const fanAngle = effectivePhase;
    const fx = Math.cos(fanAngle) * 8.5;
    const fy = Math.sin(fanAngle) * 8.5;
    const fanCross = join([
      lineOnTop([-fx, -4 - fy], [fx, -4 + fy], 48.1, P),
      lineOnTop([fy, -4 - fx], [-fy, -4 + fx], 48.1, P)
    ]);

    // 03: CPU cooler fan blades rotating + DDR RAM DIMMs pulsing
    const cfx = Math.cos(effectivePhase * 1.2) * 6.8;
    const cfy = Math.sin(effectivePhase * 1.2) * 6.8;
    const cpuFanBlades = join([
      lineOnTop([-1 - cfx, -1 - cfy], [-1 + cfx, -1 + cfy], 20.1, P),
      lineOnTop([-1 + cfy, -1 - cfx], [-1 - cfy, -1 + cfx], 20.1, P)
    ]);
    const ramTransforms = [0, 1, 2].map((rIdx) => {
      const dz = isActive || hovered ? Math.max(0, Math.sin(effectivePhase + rIdx * 1.3)) * 2.4 : 0;
      return translateAlong(P, [0, 0, dz]);
    });

    // 04: Mobile handset lifting/docking in test cradle + laptop typing key
    const phoneLiftZ = isActive || hovered ? (sinP + 1) * 2.6 : 0;
    const phoneTransform = translateAlong(P, [0, 0, phoneLiftZ]);
    const activeLaptopKey = Math.floor(((effectivePhase * 2) % 15 + 15) % 15);

    return {
      activeKeyIdx,
      keyPressTransform,
      cursorVisible,
      bladeSlideTransform,
      fanCross,
      cpuFanBlades,
      ramTransforms,
      phoneTransform,
      activeLaptopKey
    };
  }, [effectivePhase, sinP, isActive, hovered]);

  const baseTone: Tone = isActive ? 'hi' : isPassed ? 'mid' : 'lo';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Focus ${company} (Computer Anatomy Node 0${index + 1})`}
      title={`0${index + 1} • ${company}`}
      className={`iso group absolute left-[24px] md:left-[25%] top-6 -translate-x-1/2 z-20 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer focus:outline-none transition-all duration-500 ${
        isActive
          ? 'scale-110 drop-shadow-[0_8px_18px_rgba(27,67,48,0.38)]'
          : isPassed
          ? 'scale-100 opacity-95'
          : 'scale-95 opacity-55'
      }`}
    >
      <svg
        className="iso-svg w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        aria-hidden="true"
      >
        <defs>
          <filter id={`node-glow-${index}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Green Glowing Shadow when Active */}
        {isActive && (
          <path
            d={geo.base.halo}
            fill="#1b4330"
            opacity="0.32"
            filter={`url(#node-glow-${index})`}
          />
        )}

        {/* Shared Isometric Bench Plate, Feet, Groove & Screws */}
        <path className="iso-halo" d={geo.base.halo} />
        {geo.base.feet.map((paths, idx) => (
          <Solid
            key={idx}
            paths={paths}
            tone="lo"
            crease="faint"
            color={isActive ? 'forest' : undefined}
          />
        ))}
        <Solid
          paths={geo.base.slab}
          tone={baseTone}
          crease="faint"
          halo={isActive || hovered}
          color={isActive ? 'forest' : isPassed ? 'sage' : 'sand'}
        />
        <Line d={geo.base.groove} tone={isActive ? 'lit' : 'lo'} stroke={isActive ? '#86efac' : undefined} />
        <Line d={geo.base.screwRings} tone={isActive ? 'lit' : 'lo'} stroke={isActive ? '#86efac' : undefined} />
        <Dots
          points={geo.base.screws}
          size={0.5}
          tone={isActive ? 'lit' : baseTone}
          fill={isActive ? '#86efac' : undefined}
        />

        {/* ================================================================
            01. ALL-IN-ONE CRT DESK COMPUTER & MECHANICAL KEYBOARD
            ================================================================ */}
        {safeIdx === 0 && (
          <g>
            <Solid paths={geo.deskComputer.plinth} tone="lo" crease="faint" color={isActive ? 'forest' : undefined} />
            <Solid
              paths={geo.deskComputer.body}
              tone={baseTone}
              crease="faint"
              lit={isActive}
              color={isActive ? 'sand' : undefined}
            />
            <Line d={geo.deskComputer.handle} tone="lo" />
            <Line d={geo.deskComputer.topVents} tone="faint" />

            {/* Front Plane of CRT Case: Bezel, Screen, Scanlines, Prompt, Floppy & Speaker */}
            <g transform={geo.deskComputer.crtTransform}>
              <path
                d={geo.deskComputer.crtBezelPath}
                fill={isActive ? '#f3efe6' : '#efece6'}
                stroke={isActive ? '#1b4330' : '#6e6b65'}
                strokeWidth="0.65"
                vectorEffect="non-scaling-stroke"
              />
              {/* Green Illuminated CRT Terminal Glass */}
              <path
                d={geo.deskComputer.crtGlassPath}
                fill={isActive ? '#0f2418' : '#2c2b29'}
                stroke={isActive ? '#22c55e' : '#141413'}
                strokeWidth={isActive ? '0.85' : '0.65'}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={geo.deskComputer.scanLines}
                stroke={isActive ? '#86efac' : '#fbfbf9'}
                strokeOpacity={isActive ? '0.45' : '0.22'}
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
              {/* Terminal Prompt "> _" on CRT glass glowing bright green */}
              <path
                d="M-9 -35 L-5 -33 L-9 -31"
                fill="none"
                stroke={isActive ? '#86efac' : '#fbfbf9'}
                strokeWidth="1.1"
                vectorEffect="non-scaling-stroke"
              />
              {anim.cursorVisible && (
                <rect x="-3" y="-35.5" width="4.5" height="4.5" fill={isActive ? '#86efac' : '#fbfbf9'} />
              )}
              <path
                d={geo.deskComputer.floppySlotPath}
                fill={isActive ? '#1b4330' : '#2c2b29'}
                stroke={isActive ? '#6be0a0' : '#141413'}
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={geo.deskComputer.speakerGrillePath}
                fill="none"
                stroke={isActive ? '#1b4330' : '#6e6b65'}
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <Dots points={geo.deskComputer.ledDot} size={0.9} tone="hi" fill={isActive ? '#22c55e' : undefined} />

            {/* Side Port & Coiled Keyboard Cord */}
            <Solid paths={geo.deskComputer.sidePort} tone="mid" crease="none" color={isActive ? 'forest' : undefined} />
            <Line d={geo.deskComputer.kbCord.back} tone="lo" stroke={isActive ? '#1b4330' : undefined} />
            <Line d={geo.deskComputer.kbCord.front} tone="lit" stroke={isActive ? '#22c55e' : undefined} />

            {/* Mechanical Keyboard & Animated Typing Keys */}
            <Solid
              paths={geo.deskComputer.kbBase}
              tone={baseTone}
              crease="faint"
              lit={isActive}
              color={isActive ? 'sage' : undefined}
            />
            <Line d={geo.deskComputer.kbWell} tone="lo" stroke={isActive ? '#1b4330' : undefined} />
            {geo.deskComputer.keys.map((kPaths, kIdx) => {
              const isPressed = (isActive || hovered) && kIdx === anim.activeKeyIdx;
              return (
                <g
                  key={kIdx}
                  transform={isPressed ? anim.keyPressTransform : undefined}
                >
                  <Solid
                    paths={kPaths}
                    tone={isPressed ? 'hi' : 'mid'}
                    crease="faint"
                    lit={isPressed}
                    color={isPressed ? 'forest' : isActive ? 'sage' : undefined}
                  />
                  <Line d={geo.deskComputer.keyTops[kIdx]} tone="faint" stroke={isPressed ? '#86efac' : undefined} />
                </g>
              );
            })}
          </g>
        )}

        {/* ================================================================
            02. LINUX VPS SERVER RACK TOWER & SLIDING DOCKER BLADE BAYS
            ================================================================ */}
        {safeIdx === 1 && (
          <g>
            {/* Redundant Rear/Side PSU Cylinders & Coiled Patch Cord */}
            {geo.serverRack.psuCylinders.map((paths, idx) => (
              <Solid key={idx} paths={paths} tone="mid" crease="faint" color={isActive ? 'sage' : undefined} />
            ))}
            <Line d={geo.serverRack.patchCord.back} tone="lo" stroke={isActive ? '#1b4330' : undefined} />
            <Line d={geo.serverRack.patchCord.front} tone="lit" stroke={isActive ? '#22c55e' : undefined} />

            {/* Server Rack Tower Chassis */}
            <Solid paths={geo.serverRack.plinth} tone="lo" crease="faint" color={isActive ? 'forest' : undefined} />
            <Solid
              paths={geo.serverRack.chassisBack}
              tone={baseTone}
              crease="faint"
              lit={isActive}
              color={isActive ? 'sand' : undefined}
            />
            <Line d={geo.serverRack.topFanRing} tone="lo" stroke={isActive ? '#1b4330' : undefined} />
            <Line d={anim.fanCross} tone="lit" stroke={isActive ? '#22c55e' : undefined} />
            <Solid paths={geo.serverRack.topFanHub} tone="hi" crease="none" color={isActive ? 'forest' : undefined} />

            {/* 4 Hot-Swap Docker Blade Drawers (Bay #2 slides out smoothly) */}
            {geo.serverRack.blades.map((blade, bIdx) => {
              const isSlidingBay = bIdx === 1;
              return (
                <g
                  key={bIdx}
                  transform={isSlidingBay ? anim.bladeSlideTransform : undefined}
                >
                  <Solid
                    paths={blade.body}
                    tone={isSlidingBay && isActive ? 'hi' : baseTone}
                    crease="faint"
                    lit={isSlidingBay && isActive}
                    color={isSlidingBay && isActive ? 'forest' : isActive ? 'sage' : undefined}
                  />
                  <Solid paths={blade.handle} tone="hi" crease="none" color={isActive ? 'forest' : undefined} />
                  <Dots points={blade.leds} size={0.7} tone="hi" fill={isActive ? '#22c55e' : undefined} />
                </g>
              );
            })}
          </g>
        )}

        {/* ================================================================
            03. MOTHERBOARD PCB, CPU HEATSINK TOWER & 4 DDR RAM DIMMS
            ================================================================ */}
        {safeIdx === 2 && (
          <g>
            {/* Multi-Layer Motherboard PCB & Copper Bus Traces */}
            <Solid
              paths={geo.motherboard.pcb}
              tone={baseTone}
              crease="faint"
              lit={isActive}
              color={isActive ? 'forest' : isPassed ? 'sage' : undefined}
            />
            <Line d={geo.motherboard.pcbOutline} tone="lo" stroke={isActive ? '#86efac' : undefined} />
            <Line d={geo.motherboard.busTraces} tone="lit" stroke={isActive ? '#86efac' : undefined} />

            {/* Rear I/O Shield & VRM Capacitor Cylinders */}
            <Solid paths={geo.motherboard.ioTower} tone="mid" crease="faint" color={isActive ? 'sand' : undefined} />
            {geo.motherboard.vrmCaps.map((paths, idx) => (
              <Solid key={idx} paths={paths} tone="hi" crease="faint" color={isActive ? 'forest' : undefined} />
            ))}

            {/* Central CPU Socket, Finned Cooler & Spinning Rotor */}
            <Solid paths={geo.motherboard.cpuSocket} tone="lo" crease="faint" color={isActive ? 'sand' : undefined} />
            <Solid
              paths={geo.motherboard.cpuHeatsink}
              tone="hi"
              crease="faint"
              lit={isActive}
              color={isActive ? 'sage' : undefined}
            />
            <Line d={geo.motherboard.cpuFanRing} tone="lo" stroke={isActive ? '#1b4330' : undefined} />
            <Line d={anim.cpuFanBlades} tone="lit" stroke={isActive ? '#22c55e' : undefined} />
            <Solid paths={geo.motherboard.cpuFanHub} tone="hi" crease="none" color={isActive ? 'forest' : undefined} />

            {/* DDR Memory DIMM Sticks */}
            {geo.motherboard.ramSlots.map((paths, rIdx) => (
              <g key={rIdx} transform={anim.ramTransforms[rIdx]}>
                <Solid
                  paths={paths}
                  tone="hi"
                  crease="faint"
                  lit={isActive}
                  color={isActive ? 'forest' : undefined}
                />
              </g>
            ))}

            {/* Southbridge Chipset Heatsink */}
            <Solid paths={geo.motherboard.southbridge} tone="mid" crease="faint" color={isActive ? 'sand' : undefined} />
            <Line d={geo.motherboard.southbridgeFins} tone="lo" stroke={isActive ? '#86efac' : undefined} />
          </g>
        )}

        {/* ================================================================
            04. OPEN LAPTOP WORKSTATION & DOCKED MOBILE HANDSET CRADLE
            ================================================================ */}
        {safeIdx === 3 && (
          <g>
            {/* Upright Laptop Display Lid & Screen */}
            <Solid
              paths={geo.laptopMobile.laptopLid}
              tone={baseTone}
              crease="faint"
              lit={isActive}
              color={isActive ? 'sand' : undefined}
            />
            <g transform={geo.laptopMobile.lidTransform}>
              <path
                d={geo.laptopMobile.lidScreenPath}
                fill={isActive ? '#0f2418' : '#2c2b29'}
                stroke={isActive ? '#22c55e' : '#141413'}
                strokeWidth={isActive ? '0.8' : '0.6'}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={geo.laptopMobile.lidCodeLines}
                stroke={isActive ? '#86efac' : '#fbfbf9'}
                strokeWidth="0.85"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Laptop Base Deck, Keyboard Matrix & Trackpad */}
            <Solid
              paths={geo.laptopMobile.laptopDeck}
              tone={baseTone}
              crease="faint"
              lit={isActive}
              color={isActive ? 'sage' : undefined}
            />
            <Line d={geo.laptopMobile.trackpad} tone="lo" stroke={isActive ? '#1b4330' : undefined} />
            {geo.laptopMobile.laptopKeys.map((kPaths, kIdx) => {
              const isKeyActive = (isActive || hovered) && kIdx === anim.activeLaptopKey;
              return (
                <Solid
                  key={kIdx}
                  paths={kPaths}
                  tone={isKeyActive ? 'hi' : 'mid'}
                  crease="none"
                  color={isKeyActive ? 'forest' : undefined}
                />
              );
            })}

            {/* Coiled USB Debug Cable */}
            <Line d={geo.laptopMobile.usbCoil.back} tone="lo" stroke={isActive ? '#1b4330' : undefined} />
            <Line d={geo.laptopMobile.usbCoil.front} tone="lit" stroke={isActive ? '#22c55e' : undefined} />

            {/* Mobile Handset Test Dock & Lifting Smartphone */}
            <Solid paths={geo.laptopMobile.dockBase} tone="lo" crease="faint" color={isActive ? 'sand' : undefined} />
            <g transform={anim.phoneTransform}>
              <Solid
                paths={geo.laptopMobile.phoneBody}
                tone="hi"
                crease="faint"
                lit={isActive}
                color={isActive ? 'forest' : undefined}
              />
              <Line d={geo.laptopMobile.phoneScreen} tone="hi" stroke={isActive ? '#86efac' : undefined} />
              <Line d={geo.laptopMobile.phoneSpeaker} tone="lo" stroke={isActive ? '#86efac' : undefined} />
            </g>
          </g>
        )}
      </svg>
    </button>
  );
}
