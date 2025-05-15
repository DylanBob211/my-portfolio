import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '../globals.css'
import Background from '../ui/background'
import Link from '../ui/link'
import Header from './header'

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
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Background />
        <div className="min-h-screen bg-transparent p-6">
          <Header />

          <main className="pt-50">{children}</main>
        </div>
      </body>
    </html>
  )
}
