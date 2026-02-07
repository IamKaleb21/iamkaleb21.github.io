export interface Tech {
    name: string;
    label: string;
}

export interface TechCategory {
    title: string;
    techs: Tech[];
}

export const techCategories: TechCategory[] = [
    {
        title: "Frontend & Frameworks",
        techs: [
            { name: "simple-icons:typescript", label: "TypeScript" },
            { name: "simple-icons:react", label: "React" },
            { name: "devicon-plain:vitejs", label: "Vite" },
            { name: "simple-icons:astro", label: "Astro" },
            { name: "simple-icons:nextdotjs", label: "Next.js" },
            { name: "simple-icons:tailwindcss", label: "Tailwind CSS" },
            { name: "simple-icons:framer", label: "Framer Motion" },
            { name: "simple-icons:expo", label: "Expo" }
        ]
    },
    {
        title: "Librerías & UI",
        techs: [
            { name: "simple-icons:shadcnui", label: "shadcn/ui" },
            { name: "simple-icons:reactquery", label: "TanStack Query" },
            { name: "devicon-plain:zustand", label: "Zustand" }
        ]
    },
    {
        title: "Backend & Bases de Datos",
        techs: [
            { name: "simple-icons:supabase", label: "Supabase" },
            { name: "simple-icons:pocketbase", label: "PocketBase" },
            { name: "simple-icons:nodedotjs", label: "Node.js" },
            { name: "simple-icons:fastapi", label: "FastAPI" },
            { name: "simple-icons:postgresql", label: "PostgreSQL" },
            { name: "simple-icons:sqlite", label: "SQLite" },
            { name: "simple-icons:mongodb", label: "MongoDB" }
        ]
    },
    {
        title: "Testing & APIs",
        techs: [
            { name: "simple-icons:vitest", label: "Vitest" },
            { name: "simple-icons:playwright", label: "Playwright" },
            { name: "simple-icons:pytest", label: "Pytest" },
            { name: "simple-icons:postman", label: "Postman" }
        ]
    },
    {
        title: "Data Science & ML",
        techs: [
            { name: "simple-icons:python", label: "Python" },
            { name: "simple-icons:jupyter", label: "Jupyter" },
            { name: "simple-icons:pandas", label: "Pandas" },
            { name: "simple-icons:numpy", label: "NumPy" },
            { name: "simple-icons:scikitlearn", label: "Scikit-learn" },
            { name: "simple-icons:opencv", label: "OpenCV" },
            { name: "simple-icons:ollama", label: "Ollama" }
        ]
    },
    {
        title: "DevOps & Herramientas",
        techs: [
            { name: "simple-icons:git", label: "Git" },
            { name: "simple-icons:docker", label: "Docker" },
            { name: "simple-icons:coolify", label: "Coolify" },
            { name: "simple-icons:figma", label: "Figma" },
            { name: "simple-icons:n8n", label: "n8n" },
            { name: "simple-icons:linux", label: "Linux" },
            { name: "simple-icons:gnubash", label: "Bash" }
        ]
    }
];
