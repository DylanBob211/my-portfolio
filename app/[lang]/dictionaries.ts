import 'server-only'

export type Dictionary = {
  services: {
    webappDevelopment: { title: string; description: string }
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
    contact: string
  }
}

const dictionaries: Record<'en' | 'it', () => Promise<Dictionary>> = {
  en: () => import('./locales/en.json').then((module) => module.default),
  it: () => import('./locales/it.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'it'): Promise<Dictionary> =>
  dictionaries[locale]()
