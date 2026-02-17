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
		position: "Desarrollador de Software",
		company: "IEP John Nash",
		location: "Trujillo, Perú",
		dates: "Julio 2024 – Enero 2026",
		highlights: [
			"Migración de flujos operativos manuales a un ecosistema web con Laravel, Vite y PostgreSQL.",
			"Automatización del Sistema de Matrículas (+200 estudiantes), reduciendo el proceso de 5 días a horas.",
			"Desarrollo del Sistema de Reclamos y arquitectura del CRM institucional."
		]
	},
	{
		position: "Practicante Preprofesional Backend & DevOps",
		company: "Servicios Generales Neyo EIRL",
		location: "Trujillo, Perú",
		dates: "Julio 2024 – Diciembre 2024",
		highlights: [
			"Desarrollo de backend e-commerce seguro con Python (FastAPI) y autenticación JWT.",
			"Contenerización de servicios con Docker para estandarizar entornos de desarrollo y producción.",
			"Optimización de servidor para consultas rápidas en catálogo de autopartes."
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
