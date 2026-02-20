import type { ImageMetadata } from 'astro';

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

export interface AboutData {
	content: string;
}

export interface ContactData {
	heading: string;
	subheading1: string;
	subheading2: string;
	email: string;
}

export interface Experience {
	position: string;
	company: string;
	dates: string;
	location?: string;
	highlights: string[];
	description?: string;
}

export interface Project {
	title: string;
	description: string;
	tagline?: string;
	tags: string[];
	image?: ImageMetadata;
	demoUrl?: string;
	repoUrl?: string;
}

export interface Study {
	title: string;
	institution: string;
	dates: string;
	description?: string;
	badge?: string;
}

export interface Tech {
	name: string;
	label: string;
}

export interface TechCategory {
	title: string;
	techs: Tech[];
}

export interface UiData {
	nav: {
		about: string;
		experience: string;
		projects: string;
		techStack: string;
		studies: string;
		contact: string;
	};
	skipLink: string;
}
