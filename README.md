# Portafolio de Aarón Kaleb Arteaga Rodríguez

Portafolio personal desarrollado con Astro, React, Tailwind CSS y Three.js. Sitio web estático optimizado que muestra mi experiencia como Ingeniero Full Stack JavaScript especializado en React, Next.js y Node.js.

## Stack Tecnológico

- **Framework:** [Astro](https://astro.build) 5.17+
- **UI Framework:** React 19
- **Estilos:** Tailwind CSS 4
- **3D Graphics:** Three.js con React Three Fiber
- **Animaciones:** GSAP
- **Íconos:** Astro Icon con Iconify
- **Gestión de paquetes:** pnpm

## Estructura del proyecto

```text
/
├── public/              # Assets estáticos (favicon, robots.txt, modelos 3D)
├── src/
│   ├── assets/          # Assets procesados por Astro
│   ├── components/      # Componentes Astro y React
│   ├── data/            # Datos del sitio (experiencia, estudios, info personal)
│   ├── layouts/         # Layouts de página
│   ├── pages/           # Páginas del sitio (routing)
│   └── styles/          # Estilos globales
├── astro.config.mjs     # Configuración de Astro
├── package.json
└── tsconfig.json
```

## Comandos

| Comando          | Acción                                              |
| :--------------- | :-------------------------------------------------- |
| `pnpm install`   | Instala las dependencias                            |
| `pnpm dev`       | Inicia servidor de desarrollo en `localhost:4321`   |
| `pnpm build`     | Construye el sitio para producción en `./dist/`     |
| `pnpm preview`   | Previsualiza el build localmente antes de desplegar |

## Despliegue

Este sitio está configurado para desplegarse en **GitHub Pages**:

- URL del sitio: `https://iamkaleb21.github.io`
- El sitemap se genera automáticamente con `@astrojs/sitemap`
- El archivo `robots.txt` está en `public/`

Para desplegar:

1. Ejecuta `pnpm build`
2. El contenido de `dist/` es lo que se despliega

## Características

- ✨ Modelo 3D interactivo con Three.js (laptop animado)
- 🎨 Diseño glassmorphism con efectos de blur y gradientes
- ⚡ Optimizado para rendimiento (lazy loading, code splitting)
- 📱 Completamente responsivo
- ♿ Accesible (skip links, ARIA labels, jerarquía semántica)
- 🔍 SEO optimizado (sitemap, meta tags, lang correcto)
- 🎭 Animaciones suaves con GSAP y ScrollTrigger
- 🌐 Integración con @astrojs/sitemap para generación automática de sitemap
- 🚧 (TODO) Backend para formulario de contacto (actualmente solo frontend demo)
- 🚧 (TODO) Crear Blog personal
- 🚧 (TODO) Actualizar sección de experiencia laboral
- 🚧 (TODO) Agregar nuevos proyectos
- 🚧 (TODO) Internacionalización (i18n) nativa de Astro

## Contacto

- **Email:** <hionta16@gmail.com>
- **LinkedIn:** [linkedin.com/in/imkaleb21](https://linkedin.com/in/imkaleb21)
- **GitHub:** [github.com/IamKaleb21](https://github.com/IamKaleb21)

---

Desarrollado con ❤️ usando Astro
