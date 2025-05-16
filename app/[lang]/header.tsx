'use client'
import Link from '../ui/link'
import { motion } from 'motion/react'
import { Dictionary } from './dictionaries'
import NextLink from 'next/link'
import { useCurrentLocale } from '../helpers/locale'

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
      delay: 0.4,
      staggerChildren: 0.2,
    },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0 },
}

export default function Header({ dict }: { dict: Dictionary }) {
  const navItems = [
    { name: dict.nav.about, path: '' },
    { name: dict.nav.services, path: '/services' },
    { name: dict.nav.contact, path: '/contact' },
  ]
  const locale = useCurrentLocale()
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-white via-white/80 via-80% to-transparent pt-6 pb-10">
      <div className="container mx-auto">
        <NextLink href={`/${locale}`}>
          <motion.h1
            className="text-3xl font-bold lg:text-5xl"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            Nicola D&apos;Oronzo
          </motion.h1>
        </NextLink>
        <motion.h2
          className="mb-4 text-lg font-semibold"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
        >
          Web developer
        </motion.h2>

        <nav>
          <motion.ul initial="hidden" animate="show" variants={list}>
            {navItems.map((item, i) => (
              <motion.li key={item.name + item.path} variants={listItem}>
                <Link path={item.path}>{item.name}</Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </header>
  )
}
