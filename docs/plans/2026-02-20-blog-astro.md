# Blog con Astro (Content Collections + MDX) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a blog to the portfolio using Astro Content Collections and MDX. Single language (Spanish). Listing page with title, date, excerpt, optional featured image; dedicated blog layout (not the global one). Enable the existing "Blog" button in the Nav to link to `/blog/`.

**Architecture:** Content collection `blog` in `src/content/blog/*.mdx` with schema in `src/content/config.ts`. Pages: `/blog/` (index) and `/blog/[...slug]/` (single post). Dedicated `BlogLayout.astro` (Nav + reading area + Footer, no Hero). `@astrojs/mdx` integration.

**Tech Stack:** Astro 5, Content Collections, MDX, Tailwind CSS 4, TypeScript.

**Design reference:** `docs/plans/2026-02-20-blog-astro-design.md`

---

## Task 1: Add @astrojs/mdx dependency and config

**Files:**
- Modify: `package.json` (via pnpm)
- Modify: `astro.config.mjs`

**Step 1: Install MDX integration**

Run: `pnpm add @astrojs/mdx`

Expected: Dependency added to package.json.

**Step 2: Register MDX in Astro config**

In `astro.config.mjs`, add import and add `mdx()` to the integrations array:

```js
import mdx from '@astrojs/mdx';

// inside defineConfig({ ... })
integrations: [icon(), react(), sitemap(), mdx()]
```

**Step 3: Verify build**

Run: `pnpm build`

Expected: Build succeeds (no new routes yet).

**Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs
git commit -m "chore(blog): add @astrojs/mdx integration"
```

---

## Task 2: Create Content Collections config and blog schema

**Files:**
- Create: `src/content/config.ts`

**Step 1: Define blog collection schema**

Create `src/content/config.ts`. Use `defineCollection` from `astro:content` and schema helpers from `astro:content/schema` (e.g. `z`). Define a `blog` collection with schema: `title` (string, required), `description` (string, required), `pubDate` (date, required), `updatedDate` (date, optional), `image` (image, optional), `draft` (boolean, optional, default false). Export `collections` as `{ blog }` where `blog = defineCollection({ schema: z.object({ ... }) })`.

Reference: Astro docs for Content Collections. For optional image use `z.image().optional()`.

**Step 2: Verify**

Run: `pnpm astro sync` (or `pnpm build`).

Expected: No errors; `src/content/config.ts` is valid.

**Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat(blog): add content config and blog collection schema"
```

---

## Task 3: Create BlogLayout.astro

**Files:**
- Create: `src/layouts/BlogLayout.astro`

**Step 1: Implement layout**

BlogLayout must:
- Import `../styles/global.css`.
- Accept props: `title: string`, `description: string` (for `<head>`).
- Call `getData('es')` from `@/data` (or `../data`) to get `data` for Nav and Footer.
- Render full HTML document: `<html lang="es">`, `<head>` with charset, viewport, title, meta description, canonical (use `import.meta.env.SITE` + path for blog pages), favicon, Open Graph meta (og:title, og:description, og:url, og:type, og:image if needed). Reuse the same Google Fonts links as in `Layout.astro` if desired.
- `<body>`: skip link to `#main`, then `<Nav locale="es" ui={data.ui} />`, then `<main id="main">` with a slot (narrow reading container, e.g. max-w-3xl mx-auto px-4), then `<Footer githubUrl={...} linkedinUrl={...} email={...} location={...} />` using `data.site`.

**Step 2: Verify**

Run: `pnpm build`. No blog pages yet, so no new output; ensure no import errors (e.g. create a temporary page that uses BlogLayout and then remove it, or proceed to Task 4 and verify there).

**Step 3: Commit**

```bash
git add src/layouts/BlogLayout.astro
git commit -m "feat(blog): add BlogLayout with Nav and Footer"
```

---

## Task 4: Create blog index page (list)

**Files:**
- Create: `src/pages/blog/index.astro`

**Step 1: Implement list page**

- Import `getCollection` from `astro:content`, `BlogLayout` from `../../layouts/BlogLayout.astro`, and `BlogCard` (to create in Task 5; if doing in order, create a minimal BlogCard first or inline the card markup here and extract in Task 5).
- In frontmatter: get all entries with `getCollection('blog')`. Filter out entries where `data.draft === true`. Sort by `data.pubDate` descending.
- Use BlogLayout with title like "Blog | [site name]" and description for the blog listing.
- In the main slot, render a heading (e.g. "Blog") and a list/grid of posts. Each post: link to `/blog/${entry.slug}/`, show title, formatted pubDate, description, and if `entry.data.image` exists use `<Image>` from `astro:content` or the image URL for a thumbnail. Style with Tailwind to match the site (e.g. cards with glassmorphism).

**Step 2: Create BlogCard component (or inline)**

If BlogCard is separate: create `src/components/BlogCard.astro` that accepts entry (or slug, title, pubDate, description, image) and renders one card with link to `/blog/[slug]/`. Use it in blog index.

**Step 3: Verify**

Run: `pnpm build`. Expect `dist/blog/index.html` (may be empty list until a post exists).

**Step 4: Commit**

```bash
git add src/pages/blog/index.astro src/components/BlogCard.astro
git commit -m "feat(blog): add blog index page and BlogCard component"
```

---

## Task 5: Create blog single post page (dynamic route)

**Files:**
- Create: `src/pages/blog/[...slug].astro`

**Step 1: Implement getStaticPaths**

Use `getCollection('blog')` and filter out drafts. For each entry, return `{ params: { slug: entry.slug } }`. Handle slug as string (single segment) or array if using `[...slug]` (then slug = params.slug joined by '/').

**Step 2: Render post**

For the resolved entry, use `getEntryBySlug('blog', slug)` (or find by slug from collection). If no entry, return 404. Otherwise render BlogLayout with title = post title, description = post data.description. In main: article with title (h1), pubDate (and updatedDate if present), optional featured image, then `<Content />` from the entry's `render()` or the Content component from `astro:content` for MDX body. Apply prose-like classes for readability.

**Step 3: Meta and OG image**

Set canonical to `${siteUrl}/blog/${slug}/`. If entry has image, use it for og:image (resolve URL for the image asset).

**Step 4: Verify**

Run: `pnpm build`. Without posts, getStaticPaths may return []; add one example post in Task 6 to verify.

**Step 5: Commit**

```bash
git add src/pages/blog/[...slug].astro
git commit -m "feat(blog): add blog post page with MDX Content"
```

---

## Task 6: Add example blog post(s)

**Files:**
- Create: `src/content/blog/ejemplo.mdx` (or similar)

**Step 1: Create at least one MDX post**

Create a `.mdx` file in `src/content/blog/` with frontmatter: title, description, pubDate (ISO string), no draft or draft: false. Optionally updatedDate and image. Add a short body (e.g. "Hola, este es un post de ejemplo.").

**Step 2: Verify build and preview**

Run: `pnpm build`

Expected: `dist/blog/index.html` and `dist/blog/ejemplo/index.html` (or the slug you used) exist.

Run: `pnpm preview` and open `/blog/` and `/blog/ejemplo/` (or your slug).

**Step 3: Commit**

```bash
git add src/content/blog/
git commit -m "content(blog): add example post"
```

---

## Task 7: Enable Blog link in Nav

**Files:**
- Modify: `src/components/Nav.astro`

**Step 1: Replace disabled button with link**

Replace the disabled button (lines ~53–60) with an anchor:

```astro
<a
  href="/blog/"
  class="glass-btn px-6 py-2 rounded-full text-sm text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
  aria-label="Ir al blog"
>
  <Icon name="mdi:notebook-outline" class="w-4 h-4" />
  Blog
</a>
```

Remove `disabled`, `cursor-not-allowed`, `text-white/50`, and `title="Próximamente"`. Use the same visual style so it looks like the current button but clickable.

**Step 2: Verify**

Run: `pnpm build && pnpm preview`. Click Blog in nav from `/` and from `/en/`; both should go to `/blog/`.

**Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat(nav): enable Blog link to /blog/"
```

---

## Task 8: Verify build and sitemap

**Files:**
- None (verification only)

**Step 1: Full build**

Run: `pnpm build`

Expected: Exit 0. `dist/blog/index.html`, `dist/blog/ejemplo/index.html` (or your slug) present.

**Step 2: Sitemap**

Inspect `dist/sitemap-index.xml` or `dist/sitemap-0.xml`. Expected: blog URLs included (e.g. `/blog/`, `/blog/ejemplo/`).

**Step 3: Optional manual test**

Run `pnpm preview`, navigate to `/`, click Blog, then open a post. Confirm layout (BlogLayout), no Hero, Nav and Footer present.

**Step 4: Commit**

No commit unless a fix was needed.

---

## Execution handoff

Plan complete and saved to `docs/plans/2026-02-20-blog-astro.md`.

Two execution options:

1. **Subagent-driven (this session)** — I run each task (or batches) in this chat, you review between tasks, and we iterate quickly.
2. **Parallel session (separate)** — You open a new session and use **executing-plans** there to run the plan in batches with checkpoints.

Which approach do you want?
