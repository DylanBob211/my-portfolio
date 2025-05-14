import { CanvasDrawFn } from '@/app/helpers/canvas'
import { random } from './random'

const noise = random.noise

const drawingFunc: CanvasDrawFn = ({
  context,
  width,
  height,
  frameCount,
  mouseX,
  mouseY,
}) => {
  const cssWidth = width / devicePixelRatio
  const cssHeight = height / devicePixelRatio
  context.clearRect(0, 0, cssWidth, cssHeight)

  const gridSize = cssHeight / 100
  const time = frameCount / 200
  const centerX = cssWidth / 2

  for (let i = 0; i < 10; i++) {
    const x = centerX
    const lineNoiseStrength = 1 + i * 0.2

    context.beginPath()

    const distanceToCenter = Math.abs(x - centerX) / centerX
    const variationFactor = 1 - distanceToCenter
    const noiseValue = noise(x / 200 + time, 0 / 200 + time)
    let offsetX =
      gridSize * 5 * noiseValue * variationFactor * lineNoiseStrength

    const mouseRadius = 150
    const dx = mouseX - (x + offsetX)
    const dy = mouseY - 0
    const distanceToMouse = Math.sqrt(dx * dx + dy * dy)
    if (distanceToMouse < mouseRadius) {
      const mouseEffect = (mouseRadius - distanceToMouse) / mouseRadius
      offsetX += mouseEffect * 20
    }

    context.moveTo(x + offsetX, 0)

    for (let y = gridSize; y <= cssHeight; y += gridSize) {
      const distanceToCenter = Math.abs(x - centerX) / centerX
      const variationFactor = 1 - distanceToCenter
      const noiseValue = noise(x / 200 + time, y / 200 + time)
      let offsetX =
        gridSize * 5 * noiseValue * variationFactor * lineNoiseStrength

      const dx = mouseX - (x + offsetX)
      const dy = mouseY - y
      const distanceToMouse = Math.sqrt(dx * dx + dy * dy)
      if (distanceToMouse < mouseRadius) {
        const mouseEffect = (mouseRadius - distanceToMouse) / mouseRadius
        offsetX *= mouseEffect * 10
      }

      context.lineTo(x + offsetX, y)
    }

    context.strokeStyle = 'rgba(0, 0, 0, 0.1)'
    context.lineWidth = 1.5
    context.stroke()
  }
}

export default drawingFunc
