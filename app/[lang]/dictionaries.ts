import 'server-only'

export type Dictionary = {
  meta: {
    title: string
    description: string
    jobTitle: string
    keywords: string
  }
  services: {
    webappDevelopment: { title: string; description: string }
    frontendDevelopment: { title: string; description: string }
    websitesDevelopment: { title: string; description: string }
    cta: string
  }
  contact: {
    introduction: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitButton: string
    emailSent: string
    emailGenericError: string
    emailLoading: string
  }
  homepage: {
    introduction: string
    cta: string
  }
  nav: {
    about: string
    services: string
    portfolio: string
    contact: string
  }
  portfolio: {
    title: string
    filterPlaceholder: string
    allProjects: string
    professional: string
    personal: string
    technologies: string
    role: string
    period: string
    results: string
    ongoing: string
    showMoreTechnologies: string
    showLessTechnologies: string
    clearFilters: string
    noProjectsFound: string
  }
}

const dictionaries: Record<'en' | 'it', () => Promise<Dictionary>> = {
  en: () => import('./locales/en.json').then((module) => module.default),
  it: () => import('./locales/it.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'it'): Promise<Dictionary> =>
  dictionaries[locale]()
