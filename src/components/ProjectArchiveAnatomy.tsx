import React, { memo, useId } from 'react';
import { projectsContent, type ProjectItem } from '../data/projects';
import { boxCorners, corners, depthOf, fitProjection, iso, lineOnTop, planOutline, sideMatrix, sideSeam, slabOf, type Plan, type SolidPaths } from '../utils/isoKit';

/**
 * Figure: a working flat-file cabinet, one drawer per project. The open drawer
 * is the study at the reading line, not a playback or a project-status metric.
 * Parts plan: four feet, plinth, back, two sides, lid (9); seven pairs of guides
 * (14); seven drawers, each floor/back/two sides/front/pull/paper/label (56).
 * Total: 79 solids. Screws, folded seams and paper rules belong to those parts.
 * Drawer travel is 36 world units; the same projection drives art and motion.
 */
const BODY: Plan = { x: -74, y: -48, w: 148, d: 100, r: 2 };
const WIDTH = 560;
const HEIGHT = 480;
const P = fitProjection(boxCorners({ ...BODY, d: 150 }, -8, 126), WIDTH, HEIGHT, { pad: 45, azimuth: 58, elevation: 25 });
type Material = 'frame' | 'drawer' | 'paper' | 'metal' | 'dark';
interface Part { name: string; paths: SolidPaths; material: Material; detail?: string }
const part = (name: string, plan: Plan, z: number, height: number, material: Material, detail?: string): Part => ({ name, paths: slabOf(plan, z, height, P, 4, Math.min(.6, height / 4)), material, detail });
const plan = (x: number, y: number, w: number, d: number, r = .6): Plan => ({ x, y, w, d, r });
const feet = [...corners(BODY, 11)].sort((a, b) => depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P));
const rear: Part[] = [
  ...feet.map(([x, y], i) => part(`foot-${i}`, plan(x - 5, y - 5, 10, 10, 1), -8, 8, 'dark')),
  part('plinth', BODY, 0, 7, 'frame', sideSeam(BODY, 3, P, 4)),
  part('back-panel', plan(-74, -48, 148, 4), 7, 108, 'frame'),
  part('left-wall', plan(-74, -44, 5, 96), 7, 108, 'frame')
];
const guides = Array.from({ length: 7 }, (_, index) => {
  const z = 10 + index * 14;
  return [-68, 64].map((x, side) => part(`guide-${index}-${side}`, plan(x, -43, 4, 91), z - 1.5, 1.5, 'metal'));
}).flat();
const drawers = Array.from({ length: 7 }, (_, index) => {
  const z = 10 + (6 - index) * 14;
  const parts = [
    part('floor', plan(-64, -42, 128, 89), z, 1.5, 'drawer'),
    part('back', plan(-64, -42, 128, 2), z + 1.5, 9, 'drawer'),
    part('left', plan(-64, -40, 2, 87), z + 1.5, 9, 'drawer'),
    part('paper', plan(-57, -35, 114, 73), z + 1.5, .35, 'paper', Array.from({ length: 7 }, (_, row) => lineOnTop([-46, -22 + row * 7], [row === 6 ? 18 : 43, -22 + row * 7], z + 1.85, P)).join('')),
    part('right', plan(62, -40, 2, 87), z + 1.5, 9, 'drawer'),
    part('front', plan(-67, 47, 134, 3, 1), z - 1, 12.5, 'drawer'),
    part('pull', plan(-21, 50, 42, 5, 1), z + 4, 3.5, 'metal'),
    part('label-holder', plan(33, 50, 22, .5, .2), z + 2, 5, 'metal')
  ];
  const screws = [-57, 57].map(x => {
    const [a, b] = iso([x, 50.1, z + 5], P);
    return { x: a, y: b };
  });
  return { parts, screws };
});
const front: Part[] = [
  part('right-wall', plan(69, -44, 5, 96), 7, 108, 'frame', sideSeam(plan(69, -44, 5, 96), 13, P, 4)),
  part('lid', BODY, 115, 5, 'frame', planOutline({ ...BODY, x: -70, y: -44, w: 140, d: 92 }, 120, P, 4))
];
const origin = iso([0, 0, 0], P);
const travel = iso([0, 36, 0], P);
const OPEN = `translate(${travel[0] - origin[0]}px, ${travel[1] - origin[1]}px)`;
const labelMatrix = sideMatrix([0, 52.05], 117.7, P, 'left');

const Solid = memo(function Solid({ item }: { item: Part }) {
  return <g className={`archive-solid archive-${item.material}`} data-part={item.name}>
    <path className="archive-fill" d={item.paths.fill} />
    {item.paths.shades.map((d, i) => d ? <path key={i} className={`archive-shade-${i}`} d={d} /> : null)}
    <path className="archive-top" d={item.paths.top} />
    <path className="archive-edge" d={item.paths.crease} />
    {item.paths.bevel && <path className="archive-bevel" d={item.paths.bevel} />}
    {item.detail && <path className={item.material === 'paper' ? 'archive-paper-rules' : 'archive-detail'} d={item.detail} />}
    <path className="archive-edge" d={item.paths.outline} />
  </g>;
});
const Parts = memo(function Parts({ items }: { items: Part[] }) { return <>{items.map(item => <Solid key={item.name} item={item} />)}</>; });

export function ProjectArchiveAnatomy({ activeProject, projects, onSelect }: { activeProject: ProjectItem; projects: ProjectItem[]; onSelect: (index: number) => void }) {
  const id = useId();
  const active = projectsContent.projects.indexOf(activeProject);
  return <figure className="project-archive" aria-labelledby={`${id}-caption`}>
    <figcaption id={`${id}-caption`} className="archive-caption"><span>PROJECT ARCHIVE</span><span>{String(projectsContent.projects.length).padStart(2, '0')} studies</span></figcaption>
    <svg className="archive-drawing" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="group" aria-label="An isometric flat-file cabinet. Each drawer opens its corresponding project in the reading column.">
      <path className="archive-shadow" d={planOutline({ ...BODY, x: BODY.x + 4, y: BODY.y + 4 }, -8, P)} />
      <Parts items={rear} />
      <Parts items={guides} />
      {[...drawers].reverse().map((drawer, reverseIndex) => {
        const index = 6 - reverseIndex;
        const project = projectsContent.projects[index];
        const filteredIndex = projects.indexOf(project);
        return <g key={project.id} className="archive-drawer" data-open={index === active} style={{ transform: index === active ? OPEN : 'translate(0px, 0px)' }} role="button" tabIndex={filteredIndex >= 0 ? 0 : -1} aria-disabled={filteredIndex < 0} aria-pressed={index === active} aria-label={`Read ${project.title}`} onClick={() => { if (filteredIndex >= 0) onSelect(filteredIndex); }} onKeyDown={event => { if ((event.key === 'Enter' || event.key === ' ') && filteredIndex >= 0) { event.preventDefault(); onSelect(filteredIndex); } }}>
          <Parts items={drawer.parts} />
          {drawer.screws.map((point, i) => <circle key={i} cx={point.x} cy={point.y} r=".55" className="archive-fastener" />)}
        </g>;
      })}
      <Parts items={front} />
      <text className="archive-engraving" transform={labelMatrix} textAnchor="middle">SELECTED WORK</text>
    </svg>
    <div className="archive-readout"><span>DRAWER {String(active + 1).padStart(2, '0')}</span><span>{activeProject.title}</span></div>
    <p className="archive-hint">Scroll through the studies, or select a drawer.</p>
  </figure>;
}
