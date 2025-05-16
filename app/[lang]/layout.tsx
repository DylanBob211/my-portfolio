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

          <main className="pt-50 pb-20 lg:pt-60">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
