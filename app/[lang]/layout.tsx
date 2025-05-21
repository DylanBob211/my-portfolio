import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '../globals.css'
import Background from '../ui/background'
import { getDictionary } from './dictionaries'
import Header from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

const inter = Roboto({ subsets: ['latin'], weight: '300', style: 'normal' })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: 'en' | 'it' }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return {
    title: {
      template: `%s | ${dict.meta.title}`,
      default: dict.meta.title,
    },
    keywords: dict.meta.keywords,
    description: dict.meta.description,
    alternates: {
      canonical: 'https://nicoladoronzo.xyz',
      languages: {
        'en-US': 'https://nicoladoronzo.xyz/en',
        'it-IT': 'https://nicoladoronzo.xyz/it',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'it' }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)
  return (
    <html lang={resolvedParams.lang} suppressHydrationWarning>
      <body className={`${inter.className} transition`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Background />
          <div className="relative container mx-auto min-h-screen bg-transparent">
            <Header dict={dict} />
            <main className="pt-40 pb-26 lg:pt-46 lg:pb-20 lg:text-lg">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Person',
              name: "Nicola D'Oronzo",
              url: 'https://nicoladoronzo.xyz',
              sameAs: [
                'https://www.linkedin.com/in/nicola-d-oronzo-1a88a4128',
                'https://github.com/NicolaDoronzo',
                'https://www.instagram.com/nicola.doronzo/',
              ],
              jobTitle: dict.meta.jobTitle,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IT',
                addressLocality: 'Perugia',
                addressRegion: 'Umbria',
                postalCode: '06124',
              },
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance',
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
