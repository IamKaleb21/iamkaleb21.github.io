# Blog con Astro (Content Collections + MDX) — Design

**Fecha:** 2026-02-20

## Objetivo

Añadir un blog al portfolio usando lo que Astro ofrece por defecto: Content Collections y MDX. Un solo idioma (español) por ahora. Listado con título, fecha, extracto e imagen destacada opcional; layout propio del blog (distinto al global).

## Decisiones

- **Idioma:** Un solo idioma (español). Sin rutas `/en/blog/` por ahora.
- **Formato de entradas:** MDX como estándar (`src/content/blog/*.mdx`).
- **Layout:** Layout específico del blog (no el `Layout.astro` global): misma Nav y Footer para consistencia, pero sin Hero y con estructura/estilo orientado a lectura (contenedor más estrecho, tipografía de artículo).
- **Imagen destacada:** Opcional en el schema de la colección.
- **Navegación:** El botón "Blog" ya existe en el Nav; se convertirá en enlace a `/blog/` (en ambos idiomas apunta a `/blog/`).

## Arquitectura

- **Content Collections:** Colección `blog` en `src/content/blog/`, schema en `src/content/config.ts`.
- **Rutas:** `/blog/` (listado) y `/blog/[slug]/` (entrada individual).
- **Integración:** `@astrojs/mdx` para renderizar entradas en MDX.
- **Layout del blog:** `BlogLayout.astro` (o similar) en `src/layouts/`: incluye Nav + Footer, sin Hero, contenedor y estilos para lectura.

## Schema de la colección `blog`

| Campo         | Tipo   | Obligatorio | Notas |
|---------------|--------|-------------|--------|
| `title`       | string | Sí          | Título del post |
| `description` | string | Sí          | Extracto para listado y meta description |
| `pubDate`     | date   | Sí          | Fecha de publicación (ISO) |
| `updatedDate` | date   | No          | Última actualización |
| `image`       | image  | No          | Imagen destacada (referencia en `src/`; opcional) |
| `draft`       | boolean| No (default: false) | Si `true`, no se lista ni se publica |

## Páginas y componentes

- **`src/pages/blog/index.astro`:** Listado de entradas (`getCollection('blog')`), filtrar drafts, orden por `pubDate` desc. Cada ítem: imagen (si existe), título, fecha, extracto, enlace a `/blog/[slug]/`. Estilo coherente con el sitio (Tailwind, glassmorphism).
- **`src/pages/blog/[...slug].astro`:** Entrada individual (`getEntryBySlug` o equivalente). 404 si no existe. Render con `<Content />` para MDX. Meta: title, description, og:image si hay imagen.
- **Componente:** `BlogCard.astro` para cada ítem del listado (reutilizable).
- **Layout:** `BlogLayout.astro`: Nav + área principal (contenedor de lectura) + Footer; sin Hero.

## Nav

- Reemplazar el `<button disabled>` "Blog" en `Nav.astro` por `<a href="/blog/">` con el mismo estilo (glass-btn, icono, texto "Blog"). Quitar `disabled`, `cursor-not-allowed` y `title="Próximamente"`. En ES y EN el enlace es `/blog/`.

## Dependencias

- Añadir `@astrojs/mdx` e incluirlo en `astro.config.mjs`. El sitemap existente incluirá `/blog/` y `/blog/*` automáticamente.

## Tech stack

Astro 5, Content Collections, MDX, Tailwind CSS 4, TypeScript. Sin cambios en React/Three.js.
