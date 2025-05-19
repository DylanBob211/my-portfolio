import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '../globals.css'
import Background from '../ui/background'
import { getDictionary } from './dictionaries'
import Header from './header'
import { Footer } from './footer'

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
    <html lang={resolvedParams.lang}>
      <body className={inter.className}>
        <Background />
        <div className="relative container mx-auto min-h-screen bg-transparent">
          <Header dict={dict} />
          <main className="pt-40 pb-20 lg:pt-42">{children}</main>

          <Footer />
        </div>
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
              jobTitle: 'Web Developer, Front-end Specialist and Consultant',
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
