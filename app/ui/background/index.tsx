'use client'
import { useChange } from '@/app/helpers/hooks'
import { usePathname } from 'next/navigation'
import { useCanvas } from '../../helpers/canvas'
import noiseAnimation from './noiseAnimation'
import { motion } from 'motion/react'
export default function Background() {
  const path = usePathname()
  const [currentPath, previousPath] = useChange(path)

  const canvasRef = useCanvas(noiseAnimation, {
    refreshRate: 24,
    refreshRateStutter: 1,
  })

  return (
    <>
      <motion.canvas
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="fixed z-[-1]"
        ref={canvasRef}
      />
    </>
  )
}
