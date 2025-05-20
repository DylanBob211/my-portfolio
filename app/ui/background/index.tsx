'use client'
import { motion } from 'motion/react'
import { useCanvas } from '../../helpers/canvas'
import noiseAnimation from './noiseAnimation'
import { useTheme } from 'next-themes'
export default function Background() {
  const { resolvedTheme } = useTheme()

  const canvasRef = useCanvas(
    noiseAnimation({
      strokeStyle:
        resolvedTheme === 'light'
          ? 'rgba(0, 0, 0, 0.1)'
          : 'rgba(255, 255, 255, 0.25)',
    }),
    {
      refreshRate: 24,
      refreshRateStutter: 1,
    }
  )

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
