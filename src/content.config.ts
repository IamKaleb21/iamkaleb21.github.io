import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			image: image().optional(),
			/** URL de imagen externa (internet). Si existe, se usa en lugar de image local. */
			imageUrl: z.string().url().optional(),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().optional().default(false),
		}),
});

export const collections = { blog };
