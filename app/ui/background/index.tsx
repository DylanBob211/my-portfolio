'use client'
import { motion } from 'motion/react'
import { useCanvas } from '../../helpers/canvas'
import noiseAnimation from './noiseAnimation'
export default function Background() {
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
