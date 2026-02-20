import type { AboutData, ContactData, Experience, Project, SiteData, Study, TechCategory, UiData } from './types';
import { siteData as siteEs } from './es/site';
import { aboutData as aboutEs } from './es/about';
import { contactData as contactEs } from './es/contact';
import { experiences as experienceEs } from './es/experience';
import { projects as projectsEs } from './es/projects';
import { studies as studiesEs } from './es/studies';
import { techCategories as techstackEs } from './es/techstack';
import { ui as uiEs } from './es/ui';
import { siteData as siteEn } from './en/site';
import { aboutData as aboutEn } from './en/about';
import { contactData as contactEn } from './en/contact';
import { experiences as experienceEn } from './en/experience';
import { projects as projectsEn } from './en/projects';
import { studies as studiesEn } from './en/studies';
import { techCategories as techstackEn } from './en/techstack';
import { ui as uiEn } from './en/ui';

export interface LocaleData {
	site: SiteData;
	about: AboutData;
	contact: ContactData;
	experience: Experience[];
	projects: Project[];
	studies: Study[];
	techstack: TechCategory[];
	ui: UiData;
}

const dataEs: LocaleData = {
	site: siteEs,
	about: aboutEs,
	contact: contactEs,
	experience: experienceEs,
	projects: projectsEs,
	studies: studiesEs,
	techstack: techstackEs,
	ui: uiEs
};

const dataEn: LocaleData = {
	site: siteEn,
	about: aboutEn,
	contact: contactEn,
	experience: experienceEn,
	projects: projectsEn,
	studies: studiesEn,
	techstack: techstackEn,
	ui: uiEn
};

export function getData(locale: 'es' | 'en'): LocaleData {
	return locale === 'en' ? dataEn : dataEs;
}
