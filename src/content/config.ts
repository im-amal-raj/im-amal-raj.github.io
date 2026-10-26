import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    tech: z.array(z.string()).default([]),
  }),
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    category: z.string().default('Devlog'),
    readTime: z.string().optional(),
    youtubeUrl: z.string().optional(),
    youtubeId: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, writing };
