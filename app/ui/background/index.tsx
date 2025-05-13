'use client'
import { useChange } from '@/app/helpers/hooks'
import { clamp, lerp, normalize } from '@/app/helpers/math'
import { isObject } from '@/app/helpers/types'
import { usePathname } from 'next/navigation'
import { useCanvas } from '../../helpers/canvas'
import { AnimationSettings, Tree } from './treeAnimation'
import treeAnimation2 from './treeAnimation2'

type SceneAnimationSettings = Omit<
  AnimationSettings,
  'width' | 'height' | 'frameCount'
> & { refreshRate: number }
const animationsForPath: Record<string, SceneAnimationSettings> = {
  '/': {
    treeParams: {
      levels: 3,
      height: (height: number) => height / 3,
      width: 5,
      branchesAngleVariation: 40,
      sectionedBranching: true,
      branchSections: 3,
      grassEffect: true,
      color: { r: 20, g: 20, b: 20, a: 0.8 },
      mainBranchAngleVariation: 5,
    },
    sceneParams: {
      treesAmount: (width: number) =>
        Math.floor(width / (100 * window.devicePixelRatio)),
      clearColor: { r: 255, g: 246, b: 219, a: 0.03 },
      randomTreeDistributionFactor: 50,
      depth: 10,
      treeDrawingFrameRate: 50,
      treeDrawingFrameRateStutter: 50,
    },
    refreshRate: 1,
  },
  '/projects': {
    treeParams: {
      levels: 4,
      height: (height: number) => height / 2,
      width: 5,
      branchesAngleVariation: 50,
      sectionedBranching: true,
      branchSections: 10,
      grassEffect: true,
      color: { r: 20, g: 20, b: 20, a: 0.8 },
      mainBranchAngleVariation: 2,
    },
    sceneParams: {
      treesAmount: () => 1,
      clearColor: { r: 255, g: 255, b: 255, a: 0.5 },
      randomTreeDistributionFactor: 0,
      depth: 1,
      treeDrawingFrameRate: 1,
      treeDrawingFrameRateStutter: 0,
    },
    refreshRate: 1,
  },
  '/experiences': {
    treeParams: {
      levels: 5,
      height: (height: number) => height / 3,
      width: 5,
      branchesAngleVariation: 15,
      sectionedBranching: false,
      branchSections: 3,
      grassEffect: false,
      color: { r: 20, g: 20, b: 20, a: 1 },
      mainBranchAngleVariation: 5,
    },
    sceneParams: {
      treesAmount: () => 1,
      clearColor: { r: 197, g: 207, b: 186, a: 0.01 },
      randomTreeDistributionFactor: 25,
      depth: 1,
      treeDrawingFrameRate: 50,
      treeDrawingFrameRateStutter: 50,
    },
    refreshRate: 1,
  },
  '/bookshelf': {
    treeParams: {
      levels: 5,
      height: (height: number) => height / 4,
      width: 3,
      branchesAngleVariation: 40,
      sectionedBranching: false,
      branchSections: 3,
      grassEffect: false,
      color: { r: 20, g: 20, b: 20, a: 1 },
      mainBranchAngleVariation: 3,
    },
    sceneParams: {
      treesAmount: (width: number) =>
        Math.floor(width / (100 * window.devicePixelRatio)),
      clearColor: { r: 200, g: 200, b: 200, a: 0.8 },
      randomTreeDistributionFactor: 30,
      depth: 10,
      treeDrawingFrameRate: 1,
      treeDrawingFrameRateStutter: 1,
    },
    refreshRate: 75,
  },
  '/artworks': {
    treeParams: {
      levels: 4,
      height: (height: number) => height * 0.2,
      width: 4,
      branchesAngleVariation: 5,
      sectionedBranching: false,
      branchSections: 3,
      grassEffect: false,
      color: { r: 20, g: 20, b: 20, a: 0.5 },
      mainBranchAngleVariation: 5,
    },
    sceneParams: {
      treesAmount: (width: number) =>
        Math.floor(width / (100 * window.devicePixelRatio)),
      clearColor: { r: 213, g: 228, b: 230, a: 0.2 },
      randomTreeDistributionFactor: 0,
      depth: 2,
      treeDrawingFrameRate: 1,
      treeDrawingFrameRateStutter: 0,
    },
    refreshRate: 1,
  },
}

function lerpRecursive(a: any, b: any, alpha: number, maxAlpha: number): any {
  if (typeof a === 'number' && typeof b === 'number') return lerp(a, b, alpha)
  if (typeof a === 'boolean' && typeof b === 'boolean')
    return alpha >= maxAlpha / 2 ? b : a
  if (typeof a === 'function' && typeof b === 'function')
    return (...args: any[]) => lerpRecursive(a(args), b(args), alpha, maxAlpha)
  if (isObject(a) && isObject(b))
    return Object.keys(a).reduce(
      (acc, key) => ({
        ...acc,
        [key]: lerpRecursive(a[key], b[key], alpha, maxAlpha),
      }),
      {}
    )
  return b
}

export default function Background() {
  const path = usePathname()
  const [currentPath, previousPath] = useChange(path)
  const currentSettings =
    animationsForPath[currentPath] || animationsForPath['/']
  const previousSettings = previousPath
    ? animationsForPath[previousPath]
    : currentSettings
  let currentFrameCount = 0

  const canvasRef = useCanvas(
    ({ context, width, height, frameCount }) => {
      // currentFrameCount++;
      // const alpha = clamp(normalize(currentFrameCount, 100, 0), 0, 1);
      // const settings = lerpRecursive(previousSettings, currentSettings, alpha, 1);
      treeAnimation2({ context, width, height, frameCount })
    },
    { refreshRate: 24, refreshRateStutter: 100 }
  )

  return (
    <>
      <canvas className="fixed z-[-1]" ref={canvasRef} />
    </>
  )
}
