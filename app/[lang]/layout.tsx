import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '../globals.css'
import Background from '../ui/background'
import Link from '../ui/link'
import Header from './header'
import { getDictionary } from './dictionaries'

const inter = Roboto({ subsets: ['latin'], weight: '300', style: 'normal' })

export const metadata: Metadata = {
  title: {
    template: "%s | Nicola D'Oronzo",
    default: "Nicola D'Oronzo",
  },
  description: 'A portfolio website presenting myself, my work and what I like',
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
        <div className="min-h-screen bg-transparent p-6">
          <Header dict={dict} />

          <main className="pt-50">{children}</main>
        </div>
      </body>
    </html>
  )
}
