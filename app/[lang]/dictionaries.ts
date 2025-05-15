import 'server-only'

type Dictionary = {
  services: {
    softwareDevelopment: { title: string; description: string }
    frontendDevelopment: { title: string; description: string }
    websitesDevelopment: { title: string; description: string }
  }
  contact: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitButton: string
  }
  homepage: {
    introduction: string
    cta: string
  }
}

const dictionaries: Record<'en' | 'it', () => Promise<Dictionary>> = {
  en: () => import('./locales/en.json').then((module) => module.default),
  it: () => import('./locales/it.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'it'): Promise<Dictionary> =>
  dictionaries[locale]()
