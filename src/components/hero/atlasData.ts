import { projectsContent } from '../../data/projects';
import { researchContent } from '../../data/research';

export type AtlasItem =
  | {
      kind: 'project';
      slug: string;
      title: string;
      subtitle: string;
      tag: string;
      to: string;
      image?: string;
      techStack: string[];
    }
  | {
      kind: 'research';
      title: string;
      category: string;
      description: string;
      tag: string;
      to: string;
      techStack: string[];
    };

/** Cards for the hero atlas, drawn from real project + research data. */
export const atlasItems: AtlasItem[] = [
  ...projectsContent.projects.map(
    (p): AtlasItem => ({
      kind: 'project',
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      image: p.image,
      techStack: p.techStack,
      tag: `PROJECT · ${p.slug}`,
      to: `/projects/${p.slug}`
    })
  ),
  ...researchContent.interests.map(
    (r): AtlasItem => ({
      kind: 'research',
      title: r.topic,
      category: r.category,
      description: r.description,
      techStack: [],
      tag: `RESEARCH · ${r.category}`,
      to: '/research'
    })
  )
];
