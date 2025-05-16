'use client'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <motion.div
      key={path}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.8 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  )
}
