# Diseño: Internacionalización nativa (Astro i18n) — Portfolio

**Fecha:** 2026-02-19  
**Estado:** Aprobado

## Objetivo

Añadir internacionalización nativa de Astro al portfolio: español (por defecto) e inglés, con selector en la nav y preferencia guardada en localStorage.

## Requisitos acordados

- **Idiomas:** solo español (es) e inglés (en).
- **URLs:** español en `/`, inglés en `/en/` (español por defecto).
- **Selector:** en la barra de navegación (ES | EN), con preferencia guardada en localStorage; si el usuario eligió inglés, al visitar `/` se redirige a `/en/`.

---

## Sección 1 — Arquitectura y rutas

- **Config (`astro.config.mjs`):** Añadir `i18n` con `defaultLocale: 'es'`, `locales: ['es', 'en']`, `prefixDefaultLocale: false`. Resultado: `/` = español, `/en/` = inglés.
- **Páginas:** Una ruta dinámica por locale (`src/pages/[[locale]]/index.astro`) o, si no aplica, `src/pages/index.astro` + `src/pages/en/index.astro`. Mismo contenido; solo cambia el locale para cargar datos.
- **Layout y componentes:** Sin duplicar; reciben el locale (p. ej. `Astro.currentLocale` o prop) y cargan datos de ese idioma.
- **Build:** Estático; deploy actual (GitHub Pages, `withastro/action@v2`) sin cambios.

## Sección 2 — Capa de datos

- **Estructura (opción 2a):** Carpetas `src/data/es/` y `src/data/en/` con los mismos archivos: `site.ts`, `about.ts`, `experience.ts`, `projects.ts`, `studies.ts`, `techstack.ts`, `contact.ts`. Interfaces compartidas en `src/data/types.ts` (o en cada archivo si se prefiere por locale).
- **Carga:** La página obtiene `Astro.currentLocale`, usa un helper que importa desde `@/data/{locale}/...` (o equivalente) y pasa los datos ya traducidos a los componentes. Los componentes no importan directamente de `@/data/`; reciben props.
- **UI strings:** Archivos `src/data/es/ui.ts` y `src/data/en/ui.ts` con claves para nav (Sobre mí, Experiencia, etc.); la página los pasa al Layout/Nav.

## Sección 3 — Componentes, Nav y selector

- **Página:** Lee `Astro.currentLocale`, carga datos y strings de UI de ese locale, pasa todo a Layout y secciones.
- **Nav:** Recibe strings de UI (nav.about, nav.projects, etc.) y locale. Añadir selector "ES | EN" (enlaces a `/` y `/en/`), con estilo coherente y `aria-label` / `aria-current` según corresponda.
- **localStorage:** Al elegir EN o ES, guardar `preferredLocale`. En `/`, si `preferredLocale === 'en'`, redirigir a `/en/` (script client-side en Layout o página). Solo aplicar en raíz.

## Sección 4 — Build, GitHub Pages y SEO

- **Build y deploy:** Sin cambios; sitemap incluirá `/` y `/en/` automáticamente.
- **SEO:** En el `<head>` del layout, `<link rel="alternate" hreflang="es" href=".../" />`, `hreflang="en" href=".../en/" />`, y `hreflang="x-default"` apuntando a la versión por defecto (español).

## Sección 5 — Fallbacks

- Locale inválido: 404 (Astro no genera ruta).
- Datos: mismas interfaces en ambos locales para evitar campos faltantes.
- localStorage no disponible: no redirección; se muestra default (español).

## Sección 6 — Validación

- Manual: probar `/`, `/en/`, selector, preferencia guardada y redirección; revisar sitemap y hreflang.
- Build: `pnpm build` sin errores, con `index.html` y `en/index.html` en `dist/`.
