'use client'

import { motion } from 'motion/react'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
}

const listItem = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0 },
}

export function Footer() {
  const links = [
    {
      icon: <FaLinkedin size="24" />,
      href: 'https://www.linkedin.com/in/nicola-d-oronzo-1a88a4128',
    },
    {
      icon: <FaGithub size="24" />,
      href: 'https://github.com/NicolaDoronzo',
    },
    {
      icon: <FaInstagram size="24" />,
      href: 'https://www.instagram.com/nicola.doronzo/',
    },
  ]
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 via-80% to-transparent py-6">
      <motion.div
        className="container mx-auto flex gap-4"
        initial="hidden"
        animate="show"
        variants={list}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 1.2,
          staggerChildren: 0.2,
        }}
      >
        {links.map((link) => (
          <motion.a
            key={link.href}
            className="text-gray-700 transition-colors duration-300 hover:scale-105 hover:text-gray-500 active:scale-95"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial="hidden"
            animate="show"
            variants={listItem}
            transition={{ when: 'afterParent' }}
          >
            {link.icon}
          </motion.a>
        ))}
      </motion.div>
    </footer>
  )
}
