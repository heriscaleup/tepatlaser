// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    readTime: z.string(),
    publishDate: z.string(),
    image: z.string(),
    keywords: z.string(),
    schema: z.object({
      "@context": z.string(),
      "@type": z.string(),
      headline: z.string(),
      description: z.string(),
      image: z.string(),
      datePublished: z.string(),
      author: z.object({
        "@type": z.string(),
        name: z.string()
      })
    }).optional()
  })
});

export const collections = {
  'blog': blogCollection
};
