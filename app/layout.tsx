import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Background from './ui/background'
import Link from './ui/link'
import { AnimatePresence, motion } from 'motion/react'
import Header from './header'

const inter = Roboto({ subsets: ['latin'], weight: '300', style: 'normal' })

export const metadata: Metadata = {
  title: {
    template: "%s | Nicola D'Oronzo",
    default: "Nicola D'Oronzo",
  },
  description: 'A portfolio website presenting myself, my work and what I like',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Background />
        <div className="bg-transparent p-6">
          <Header />
          <main className="pt-54">
            <AnimatePresence>{children}</AnimatePresence>
          </main>
        </div>
      </body>
    </html>
  )
}
