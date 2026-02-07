export interface Experience {
	position: string;
	company: string;
	dates: string;
	location?: string;
	highlights: string[];
	description?: string;
}

export const experiences: Experience[] = [
	{
		position: "Asistente de Ingeniería de Software",
		company: "BiofMat",
		location: "Remoto",
		dates: "Enero 2025 – Presente",
		highlights: [
			"Diseño y desarrollo de interfaces atómicas con React.",
			"Integración eficiente de APIs RESTful y Backend.",
			"Optimización de rendimiento y gestión de estado.",
			"Calidad de código y metodologías ágiles."
		]
	},
	{
		position: "Desarrollador Full Stack Freelance",
		company: "Proyectos independientes",
		location: "Remoto",
		dates: "Enero 2024 – Presente",
		highlights: [
			"Fidelidad visual UI/UX desde diseño a código.",
			"Desarrollo Full Stack y lógica de negocio.",
			"Despliegue y configuración en producción."
		]
	}
];
