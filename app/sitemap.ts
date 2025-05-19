import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nicoladoronzo.xyz/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          it: 'https://nicoladoronzo.xyz/it',
          en: 'https://nicoladoronzo.xyz/en',
        },
      },
    },
    {
      url: 'https://nicoladoronzo.xyz/services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          it: 'https://nicoladoronzo.xyz/it/services',
          en: 'https://nicoladoronzo.xyz/en/services',
        },
      },
    },
    {
      url: 'https://nicoladoronzo.xyz/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: {
        languages: {
          it: 'https://nicoladoronzo.xyz/it/contact',
          en: 'https://nicoladoronzo.xyz/en/contact',
        },
      },
    },
  ]
}
