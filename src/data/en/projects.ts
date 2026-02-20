import type { ImageMetadata } from 'astro';
import type { Project } from '../types';
import kaitoratImg from '../../assets/projects/kaitorat.png';
import equismathImg from '../../assets/projects/equismath.png';
import proyectaliaImg from '../../assets/projects/proyectalia.png';
import cronopusImg from '../../assets/projects/cronopus.png';

export const projects: Project[] = [
	{
		title: "CronOpus: AI-Powered Career Orchestrator",
		description: "Intelligent orchestrator using LLMs to rewrite and optimize resumes in LaTeX dynamically. Context injection engine to adapt profiles in real time.",
		tagline: "CV optimization with Artificial Intelligence",
		tags: ["Python", "Jinja2", "LaTeX", "LLMs"],
		image: cronopusImg as ImageMetadata,
		repoUrl: "https://github.com/IamKaleb21/CronOpus"
	},
	{
		title: "Kaitorat: Personal Productivity App",
		description: "Productivity app with aesthetics inspired by Persona 5 Royal. Pomodoro timer with real-time sync, customizable settings and PocketBase authentication.",
		tagline: "Productivity with Persona 5 style",
		tags: ["React", "TypeScript", "PocketBase", "Zustand", "Framer Motion"],
		image: kaitoratImg as ImageMetadata,
		demoUrl: "https://github.com/Kaitorat",
		repoUrl: "https://github.com/Kaitorat/frontend-web"
	},
	{
		title: "EquisMath: Gamified Algebra Learning",
		description: "Gamified web app to learn algebra by solving linear equations with draggable blocks. Includes student mode with levels and teacher sandbox mode.",
		tagline: "Learn algebra by playing",
		tags: ["React", "TypeScript", "Vite", "dnd-kit", "Zustand"],
		image: equismathImg as ImageMetadata,
		demoUrl: "https://github.com/IamKaleb21/EquisMath",
		repoUrl: "https://github.com/IamKaleb21/EquisMath"
	},
	{
		title: "ProyectaLia Hub: Student Collaboration Platform",
		description: "Platform to connect students and foster collaboration on innovative projects. Next.js frontend and Node/Express backend.",
		tagline: "Connect, collaborate, innovate",
		tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Express"],
		image: proyectaliaImg as ImageMetadata,
		demoUrl: "https://github.com/ProyectaLia",
		repoUrl: "https://github.com/ProyectaLia/frontend"
	}
];
