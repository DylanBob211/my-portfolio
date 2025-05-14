import { rgbaToString } from '../../helpers/colors'
import * as random from '../../helpers/random'

type RGBA = { r: number; g: number; b: number; a: number }
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

export interface AnimationSettings {
  width: number
  height: number
  frameCount: number
  sceneParams: {
    treesAmount: (w: number) => number
    clearColor: RGBA
    randomTreeDistributionFactor: number
    depth: number
    treeDrawingFrameRate: number
    treeDrawingFrameRateStutter: number
  }
  treeParams: {
    levels: number
    height: (height: number) => number
    width: number
    branchesAngleVariation: number
    sectionedBranching: boolean
    branchSections: number
    grassEffect: boolean
    color: RGBA
    mainBranchAngleVariation: number
  }
}

export class Tree {
  constructor(
    private w: number,
    private h: number,
    private subtrees: Tree[] = []
  ) {}

  drawBranch(
    context: CanvasRenderingContext2D,
    treeParams: AnimationSettings['treeParams']
  ) {
    context.fillStyle = rgbaToString(treeParams.color)
    context.strokeStyle = rgbaToString(treeParams.color)
    if (treeParams.sectionedBranching) {
      context.beginPath()
      const nodes = treeParams.branchSections

      for (let i = 0; i < nodes; i++) {
        context.save()
        context.translate(0, (this.h / nodes) * i)
        context.rotate((random.rangeFloor(-10, 10) * Math.PI) / 180)
        context.lineWidth = this.w / (i + 1)
        context.lineTo(this.w, this.h / nodes)
        context.stroke()
        context.restore()
      }
      context.closePath()
    } else {
      context.fillRect(0, 0, this.w, this.h)
    }
  }

  static draw(
    tree: Tree,
    context: CanvasRenderingContext2D,
    treeParams: AnimationSettings['treeParams']
  ) {
    tree.drawBranch(context, treeParams)
    tree.subtrees.forEach((subtree) => {
      context.save()
      context.translate(0, tree.h - random.range(0, tree.h / 4))
      context.rotate(
        (random.rangeFloor(
          -treeParams.branchesAngleVariation,
          treeParams.branchesAngleVariation
        ) *
          Math.PI) /
          180
      )
      Tree.draw(subtree, context, treeParams)
      context.restore()
    })
  }

  static build(
    levels: number,
    w: number,
    h: number,
    treeParams: AnimationSettings['treeParams']
  ): Tree {
    const nodeCons = (width: number, height: number) => (subs: Tree[]) =>
      new Tree(width, height, subs)
    if (levels <= 0) {
      return nodeCons(w, h)([])
    } else {
      return nodeCons(
        w,
        h
      )(
        [...new Array(random.rangeFloor(2, 5))].map((_, j) =>
          Tree.build(
            levels - 1,
            w * (levels / (levels + 1 + j)),
            treeParams.grassEffect
              ? h / levels / (j + 1)
              : h - ((h / levels) * j + 1),
            treeParams
          )
        )
      )
    }
  }

  static elapsed = 0

  static drawScene(
    context: CanvasRenderingContext2D,
    { width, height, frameCount, sceneParams, treeParams }: AnimationSettings
  ) {
    const cssWidth = width / devicePixelRatio
    const cssHeight = height / devicePixelRatio
    context.fillStyle = rgbaToString(sceneParams.clearColor)
    context.fillRect(0, 0, width, height)
    if (
      frameCount %
        random.randomValueBetweenVariation(
          sceneParams.treeDrawingFrameRate,
          sceneParams.treeDrawingFrameRateStutter
        ) !==
      0
    )
      return
    context.save()
    context.rotate(Math.PI)
    const treesAmount = sceneParams.treesAmount(cssWidth)
    const t = Tree.build(
      treeParams.levels,
      treeParams.width,
      treeParams.height(height),
      treeParams
    )
    if (treeParams.sectionedBranching) {
      context.translate(0, -t.h * 0.6)
    }
    for (let i = 0; i < treesAmount; i++) {
      const segment = cssWidth / treesAmount
      const offset = (segment * sceneParams.randomTreeDistributionFactor) / 100
      context.save()
      context.translate(
        segment * -i + random.rangeFloor(-offset, offset) - segment / 2,
        -cssHeight
      )
      context.rotate(
        (random.rangeFloor(
          -treeParams.mainBranchAngleVariation,
          treeParams.mainBranchAngleVariation
        ) *
          Math.PI) /
          180
      )
      const depth = random.range(
        1 / (sceneParams.depth * 10),
        sceneParams.depth / 10 + 1
      )
      context.scale(depth, depth)
      Tree.draw(t, context, treeParams)
      context.restore()
    }
    context.restore()
  }
}
