import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    layout: z.string().default('PostLayout.astro'),
    author: z.string().default('Andrew Betts'),
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published']).default('published'),
  })
});

export const collections = { posts };
