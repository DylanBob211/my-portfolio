import { CanvasDrawFn } from '../../helpers/canvas/useCanvas'
import { random } from './random'

const iterations = 4
const maxBranchLength = 10
const presetIndex = 2
const variability = 0.1
const branchWidith = 1
random.seed('2')

type Rule = { symbol: string; odds: number; newSymbols: string }
type Preset = {
  axiom: string
  rules: Rule[]
}

const PRESETS: Preset[] = [
  {
    axiom: 'F',
    rules: [
      { symbol: 'F', odds: 0.33, newSymbols: 'F[+F]F[-F][F]' },
      { symbol: 'F', odds: 0.33, newSymbols: 'F[+F][F]' },
      { symbol: 'F', odds: 0.34, newSymbols: 'F[-F][F]' },
    ],
  },
  {
    axiom: 'X',
    rules: [
      { symbol: 'F', odds: 1.0, newSymbols: 'FF' },
      {
        symbol: 'X',
        odds: 1.0,
        newSymbols: 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]',
      },
    ],
  },
  {
    axiom: 'F',
    rules: [{ symbol: 'F', odds: 1.0, newSymbols: 'FF+[+F-F-F]-[-F+F+F]' }],
  },
  {
    axiom: 'X',
    rules: [
      { symbol: 'F', odds: 1.0, newSymbols: 'FX[FX[+XF]]' },
      { symbol: 'X', odds: 1.0, newSymbols: 'FF[+XZ++X-F[+ZX]][-X++F-X]' },
      { symbol: 'Z', odds: 1.0, newSymbols: '[+F-X-F][++ZX]' },
    ],
  },
  {
    axiom: 'F',
    rules: [{ symbol: 'F', odds: 1.0, newSymbols: 'F[+F]F[-F]F' }],
  },
  {
    axiom: 'X',
    rules: [
      { symbol: 'X', odds: 0.33, newSymbols: 'F[+X]F[-X]+X' },
      { symbol: 'X', odds: 0.33, newSymbols: 'F[-X]F[-X]+X' },
      { symbol: 'X', odds: 0.34, newSymbols: 'F[-X]F+X' },
      { symbol: 'F', odds: 1.0, newSymbols: 'FF' },
    ],
  },
  {
    axiom: 'X',
    rules: [
      { symbol: 'X', odds: 1.0, newSymbols: 'F[-[[X]+X]]+F[+FX]-X' },
      { symbol: 'F', odds: 1.0, newSymbols: 'FF' },
    ],
  },
]

function rouletteSelection(rules: Rule[]) {
  const roll = random.random()
  let sum = 0
  for (let r of rules) {
    sum += r.odds
    if (roll < sum) {
      return r
    }
  }
  return rules[rules.length - 1]
}

const generateLSystem = (preset: Preset, iterations: number): string =>
  applyRules(preset, iterations).join('')

function applyRulesToSentence(sentence: string[], rules: Rule[]) {
  return sentence.flatMap((c) => {
    const matchingRules = rules.filter((rule) => rule.symbol === c)
    if (matchingRules.length > 0) {
      const rule = rouletteSelection(matchingRules)
      return rule.newSymbols.split('')
    }
    return [c]
  })
}

function applyRules(preset: Preset, iterations: number) {
  let cur = preset.axiom.split('')

  for (let i = 0; i < iterations; i++) {
    cur = applyRulesToSentence(cur, preset.rules)
  }
  return cur
}

const lSystemString = generateLSystem(PRESETS[presetIndex], iterations)

const calculateBranch = (
  x: number,
  y: number,
  angle: number,
  length: number
) => {
  const xEnd = x + length * Math.cos(angle)
  const yEnd = y - length * Math.sin(angle)
  return { branch: { x, y, xEnd, yEnd }, state: { x: xEnd, y: yEnd, angle } }
}

const cache: Record<string, number> = {}
const memo = (key: string) => {
  return (fn: () => number) => {
    if (cache[key] === undefined) {
      cache[key] = fn()
    }
    return cache[key]
  }
}

const processChar = (
  char: string,
  state: { x: number; y: number; angle: number },
  stack: { x: number; y: number; angle: number; iteration: number }[],
  branches: {
    x: number
    y: number
    xEnd: number
    yEnd: number
    iteration: number
  }[],
  length: number,
  windStrength: number,
  iteration: number
) => {
  const { x, y, angle } = state
  const id = `${char}${iteration}`
  const randomLength = memo(id + 'length')(() =>
    random.randomRange(length * (1 - variability), length * (1 + variability))
  )
  const randomAngle =
    angle *
    memo(id + 'angle')(() =>
      random.randomRange(1 - variability, 1 + variability)
    )
  switch (char) {
    case 'F': {
      const { branch, state: newState } = calculateBranch(
        x,
        y,
        angle + windStrength,
        randomLength
      )
      return {
        state: newState,
        stack,
        branches: [...branches, { ...branch, iteration }],
      }
    }
    case '+':
      return {
        state: { x, y, angle: randomAngle - Math.PI / 6 },
        stack,
        branches,
      }
    case '-':
      return {
        state: { x, y, angle: randomAngle + Math.PI / 6 },
        stack,
        branches,
      }
    case '[':
      return { state, stack: [...stack, { x, y, angle, iteration }], branches }
    case ']': {
      const newState = stack.pop() || state
      return { state: newState, stack, branches }
    }
    default:
      return { state, stack, branches }
  }
}

const generateLSystemData = (
  x: number,
  y: number,
  angle: number,
  length: number,
  lSystemString: string,
  windStrength: number
) => {
  const initialState = { x, y, angle }
  const initialStack: {
    x: number
    y: number
    angle: number
    iteration: number
  }[] = []
  const initialBranches: {
    x: number
    y: number
    xEnd: number
    yEnd: number
    iteration: number
  }[] = []

  const { branches } = [...lSystemString].reduce(
    ({ state, stack, branches }, char, index) =>
      processChar(char, state, stack, branches, length, windStrength, index),
    { state: initialState, stack: initialStack, branches: initialBranches }
  )

  return branches
}

const drawLSystemFromData = (
  branches: {
    x: number
    y: number
    xEnd: number
    yEnd: number
    iteration: number
  }[],
  context: CanvasRenderingContext2D
) => {
  for (const branch of branches) {
    context.beginPath()
    context.moveTo(branch.x, branch.y)
    context.lineTo(branch.xEnd, branch.yEnd)
    context.strokeStyle = 'black'
    context.lineWidth = Math.max(5 - branch.iteration, 0.5)
    context.stroke()
  }
}

const leaves = Array.from({ length: 100 }, () => ({
  x: random.randomRange(-2000 / 2, 2000 / 2),
  y: random.randomRange(-2000, 0),
  size: random.randomRange(2, 5),
  speedX: random.randomRange(-0.5, 0.5),
  speedY: random.randomRange(0.5, 1.5),
}))

const treeAnimation2: CanvasDrawFn = ({
  context,
  width,
  height,
  frameCount,
}) => {
  const cssWidth = width / devicePixelRatio
  const cssHeight = height / devicePixelRatio
  context.fillStyle = 'white'
  context.fillRect(0, 0, cssWidth, cssHeight)

  const updateAndDrawLeaves = (
    context: CanvasRenderingContext2D,
    windStrength: number
  ) => {
    for (const leaf of leaves) {
      // Update leaf position
      leaf.x += leaf.speedX + windStrength * 50
      leaf.y += leaf.speedY

      // Reset leaf position if it goes out of bounds
      if (
        leaf.x > cssWidth / 2 ||
        leaf.x < -cssWidth / 2 ||
        leaf.y > cssHeight
      ) {
        leaf.x = random.randomRange(-cssWidth / 2, cssWidth / 2)
        leaf.y = random.randomRange(-cssHeight, 0)
        leaf.size = random.randomRange(2, 5)
        leaf.speedX = random.randomRange(-0.5, 0.5)
        leaf.speedY = random.randomRange(0.5, 1.5)
      }

      // Draw the leaf

      context.beginPath()
      context.moveTo(leaf.x, leaf.y)
      context.lineTo(leaf.x + 1, leaf.y - 1)
      context.lineTo(leaf.x, leaf.y - 4)
      context.lineTo(leaf.x - 1, leaf.y - 1)
      context.lineTo(leaf.x, leaf.y)
      context.closePath()
      context.fillStyle = 'black' // Greenish color
      context.fill()
      context.stroke()
    }
  }

  context.save()
  context.translate(cssWidth / 2, cssHeight)

  const windStrength =
    (random.noise(frameCount / 100, frameCount / 100) - 0.5) * 0.02
  const data = generateLSystemData(
    0,
    0,
    Math.PI / 2,
    maxBranchLength,
    lSystemString,
    windStrength
  )

  // Draw the tree
  drawLSystemFromData(data, context)

  // Draw the storm of leaves
  updateAndDrawLeaves(context, windStrength * 5)

  context.restore()
}

export default treeAnimation2
