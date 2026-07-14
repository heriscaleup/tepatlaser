// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    category: z.string(),
    readTime: z.string(),
    publishDate: z.string(),
    updatedDate: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    keywords: z.string(),
    primaryKeyword: z.string(),
    author: z.string().default('Tim Teknis Tepat Laser'),
    keyTakeaways: z.array(z.string()).min(2).max(5),
    relatedLinks: z.array(z.object({
      title: z.string(),
      url: z.string()
    })).min(2).max(5),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).min(2).max(5)
  })
});

export const collections = {
  'blog': blogCollection
};
