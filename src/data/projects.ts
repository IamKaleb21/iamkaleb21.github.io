import type { ImageMetadata } from 'astro';
import kaitoratImg from '../assets/projects/kaitorat.png';
import equismathImg from '../assets/projects/equismath.png';
import proyectaliaImg from '../assets/projects/proyectalia.png';

export interface Project {
    title: string;
    description: string;
    tagline?: string;
    tags: string[];
    image?: ImageMetadata;
    demoUrl?: string;
    repoUrl?: string;
}

export const projects: Project[] = [
    {
        title: "Kaitorat: App de Productividad Personal",
        description: "Aplicación de productividad con estética inspirada en Persona 5 Royal. Timer Pomodoro con sincronización en tiempo real, configuración personalizable y autenticación con PocketBase.",
        tagline: "Productividad con estilo Persona 5",
        tags: ["React", "TypeScript", "PocketBase", "Zustand", "Framer Motion"],
        image: kaitoratImg,
        demoUrl: "https://github.com/Kaitorat",
        repoUrl: "https://github.com/Kaitorat/frontend-web"
    },
    {
        title: "EquisMath: Aprendizaje Gamificado de Álgebra",
        description: "Aplicación web gamificada para aprender álgebra resolviendo ecuaciones lineales mediante bloques arrastrables. Incluye modo estudiante con niveles y modo profesor sandbox.",
        tagline: "Aprende álgebra jugando",
        tags: ["React", "TypeScript", "Vite", "dnd-kit", "Zustand"],
        image: equismathImg,
        demoUrl: "https://github.com/IamKaleb21/EquisMath",
        repoUrl: "https://github.com/IamKaleb21/EquisMath"
    },
    {
        title: "ProyectaLia Hub: Plataforma de Colaboración Estudiantil",
        description: "Plataforma para conectar estudiantes y fomentar la colaboración en proyectos innovadores. Frontend con Next.js y backend Node/Express.",
        tagline: "Conecta, colabora, innova",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Express"],
        image: proyectaliaImg,
        demoUrl: "https://github.com/ProyectaLia",
        repoUrl: "https://github.com/ProyectaLia/frontend"
    },
];
