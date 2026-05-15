import { defineCollection, z } from 'astro:content';

/**
 * Content schemas — mirror academic-content-schema SKILL.
 * Every field in _workspace/content/*.json must round-trip through these.
 */

const authorSchema = z.object({
  name: z.string(),
  is_me: z.boolean().default(false),
  equal_contrib: z.boolean().optional(),
  url: z.string().url().nullable().optional(),
});

const linksSchema = z.object({
  arxiv: z.string().url().nullable().optional(),
  pdf: z.string().url().nullable().optional(),
  code: z.string().url().nullable().optional(),
  project_page: z.string().url().nullable().optional(),
  video: z.string().url().nullable().optional(),
  slides: z.string().url().nullable().optional(),
  bibtex: z.string().nullable().optional(),
});

const assetsSchema = z.object({
  thumbnail: z.string().nullable().optional(),
  hover_video: z.string().nullable().optional(),
});

const papers = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    authors: z.array(authorSchema).min(1),
    venue: z.string(),
    venue_full: z.string().optional(),
    year: z.number().int().min(1900).max(2100),
    honors: z.array(z.string()).default([]),
    links: linksSchema.default({}),
    assets: assetsSchema.default({}),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    one_liner: z.string().nullable().optional(),
    tldr: z.string().nullable().optional(),
  }),
});

/**
 * Projects schema — for /projects board page.
 * Mirrors _workspace/content/projects.json field-by-field.
 * All optional/unknown fields are nullable so partially-known entries still validate.
 */
const projectLinksSchema = z.object({
  repo: z.string().url().nullable().optional(),
  demo: z.string().url().nullable().optional(),
  paper: z.string().url().nullable().optional(),
});

const projectAssetsSchema = z.object({
  thumbnail: z.string().nullable().optional(),
  video: z.string().nullable().optional(),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    year: z.number().int().min(1900).max(2100),
    period: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    role: z.string().nullable().optional(),
    links: projectLinksSchema.default({}),
    tags: z.array(z.string()).default([]),
    assets: projectAssetsSchema.default({}),
    tagline: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    featured: z.boolean().default(false),
  }),
});

/**
 * Career schema — for /career page.
 * Mirrors _workspace/content/career.json field-by-field.
 * Distinct from projects: includes organization and kind enum.
 */
const careerLinksSchema = z.object({
  site: z.string().url().nullable().optional(),
  repo: z.string().url().nullable().optional(),
});

const career = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    organization: z.string(),
    year: z.number().int().min(1900).max(2100),
    period: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    role: z.string().nullable().optional(),
    kind: z.enum([
      'teaching',
      'industry',
      'mentoring',
      'research',
      'fellowship',
    ]),
    links: careerLinksSchema.default({}),
    tags: z.array(z.string()).default([]),
    tagline: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    featured: z.boolean().default(false),
  }),
});

/**
 * Domestic papers schema — for /papers page.
 * Mirrors _workspace/content/domestic-papers.json field-by-field.
 * Collection directory: src/content/domestic-papers/.
 */
const domesticPaperLinksSchema = z.object({
  paper: z.string().url().nullable().optional(),
  arxiv: z.string().url().nullable().optional(),
  slides: z.string().url().nullable().optional(),
});

const domesticPapers = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    title_ko: z.string().nullable().optional(),
    venue: z.string(),
    venue_full: z.string().nullable().optional(),
    venue_iteration: z.string().nullable().optional(),
    year: z.number().int().min(1900).max(2100),
    honors: z.array(z.string()).default([]),
    language: z.enum(['ko', 'en']).default('en'),
    links: domesticPaperLinksSchema.default({}),
    tags: z.array(z.string()).default([]),
    tagline: z.string().nullable().optional(),
    featured: z.boolean().default(false),
  }),
});

const profileLink = z.string().url().nullable().optional();

const profile = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.object({
      display: z.string(),
      korean: z.string().optional(),
    }),
    title: z.string(),
    affiliation: z.object({
      lab: z.string(),
      lab_url: profileLink,
      department: z.string(),
      institution: z.string(),
      location: z.string(),
    }),
    advisor: z.object({
      name: z.string(),
      url: profileLink,
    }),
    contact: z.object({
      email: z.string().email().nullable().optional(),
      scholar: profileLink,
      linkedin: profileLink,
      github: profileLink,
      twitter: profileLink,
    }),
    research_interests: z.array(z.string()).default([]),
    education: z.array(
      z.object({
        degree: z.string(),
        program: z.string(),
        institution: z.string(),
        location: z.string(),
        start: z.string(),
        end: z.string().nullable().optional(),
        advisors: z.array(z.string()).default([]),
      })
    ),
    profile_image: z.string().optional(),
    bio_short: z.string().nullable(),
    bio_long: z.string().nullable(),
    research_vision: z.string().nullable().optional(),
    ongoing_projects: z
      .array(
        z.object({
          title: z.string(),
          note: z.string().nullable().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  papers,
  profile,
  projects,
  career,
  'domestic-papers': domesticPapers,
};
