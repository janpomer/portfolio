import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog posts live as markdown files in src/content/blog/.
// Each needs a `title` and a `pubDate` (the timestamp shown in the list).
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
