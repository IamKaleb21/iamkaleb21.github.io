export interface SiteData {
	name: string;
	subtitle: string;
	tagline: string;
	location: string;
	defaultTitle: string;
	defaultDescription: string;
	githubUrl: string;
	role: string;
	learning: string;
	socialLinks: {
		github: string;
		linkedin: string;
		email: string;
		website: string;
	};
}

export const siteData: SiteData = {
	name: "Kaleb Arteaga",
	subtitle: "Desarrollo software que resuelve problemas reales",
	tagline: "Web · Data · Mobile",
	location: "Trujillo / Lima, Perú",
	defaultTitle: "Portafolio de Aarón Kaleb Arteaga Rodríguez",
	defaultDescription: "Aarón Kaleb Arteaga | Desarrollador Full Stack JavaScript especializado en React, Next.js, Node.js y Express. Egresado de Ingeniería Informática con experiencia en desarrollo web escalable y metodologías ágiles.",
	githubUrl: "https://github.com/IamKaleb21",
	role: "full stack developer",
	learning: "Arquitectura limpia, mejores prácticas en React/Next.js y Node.js",
	socialLinks: {
		github: "https://github.com/IamKaleb21",
		linkedin: "https://linkedin.com/in/imkaleb21",
		email: "mailto:hionta16@gmail.com",
		website: "https://iamkaleb21.github.io"
	}
};
