import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Background from './ui/background'
import Link from './ui/link'
import { motion } from 'motion/react'
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
        <div className="flex min-h-screen flex-col items-end justify-end bg-transparent pt-6 pl-6">
          <Header />
          <main className="w-1/2 sm:w-2/5 lg:w-1/5">{children}</main>
        </div>
      </body>
    </html>
  )
}
