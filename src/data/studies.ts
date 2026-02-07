export interface Study {
	title: string;
	institution: string;
	dates: string;
	description?: string;
	badge?: string;
}

export const studies: Study[] = [
	{
		title: "CCNA: Switching, Routing, and Wireless Essentials",
		institution: "Cisco Networking Academy",
		dates: "2024",
		description: "Infraestructura robusta: Diseño y configuración de redes empresariales escalables y seguras.",
		badge: "Certificación"
	},
	{
		title: "CyberOps Associate",
		institution: "Cisco Networking Academy",
		dates: "2025",
		description: "Mindset DevSecOps: Detección proactiva de amenazas y respuesta a incidentes en tiempo real.",
		badge: "Certificación"
	},
	{
		title: "Python Essentials",
		institution: "Cisco Networking Academy",
		dates: "2021",
		description: "Scripting & Automatización: Resolución eficiente de problemas complejos mediante algoritmos optimizados.",
		badge: "Certificación"
	},
	{
		title: "Ingeniería Informática",
		institution: "Universidad Nacional de Trujillo",
		dates: "Marzo 2020 – Egresado",
		description: "Fundamentos de Ingeniería: Arquitectura de software escalable, patrones de diseño y sistemas distribuidos."
	}
];
