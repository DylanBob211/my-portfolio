import { CanvasDrawFn } from '../../helpers/canvas/useCanvas'
import { random } from './random'

const iterations = 5
const maxBranchLength = 8
const presetIndex = 1
const variability = 0.1
random.seed('3')

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

const generateLSystemV2 = (preset: Preset, iterations: number): string =>
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

const lSystemString = generateLSystemV2(PRESETS[presetIndex], iterations) //generateLSystem(axiom, rules, iterations)

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
const processChar = (
  char: string,
  state: { x: number; y: number; angle: number },
  stack: { x: number; y: number; angle: number }[],
  branches: { x: number; y: number; xEnd: number; yEnd: number }[],
  length: number
) => {
  const { x, y, angle } = state
  const randomLength = random.randomRange(
    length * (1 - variability),
    length * (1 + variability)
  )
  const randomAngle =
    angle * random.randomRange(1 - variability, 1 + variability)
  switch (char) {
    case 'F': {
      const { branch, state: newState } = calculateBranch(
        x,
        y,
        angle,
        randomLength
      )
      return { state: newState, stack, branches: [...branches, branch] }
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
      return { state, stack: [...stack, { x, y, angle }], branches }
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
  lSystemString: string
) => {
  const initialState = { x, y, angle }
  const initialStack: { x: number; y: number; angle: number }[] = []
  const initialBranches: {
    x: number
    y: number
    xEnd: number
    yEnd: number
  }[] = []

  const { branches } = [...lSystemString].reduce(
    ({ state, stack, branches }, char) =>
      processChar(char, state, stack, branches, length),
    { state: initialState, stack: initialStack, branches: initialBranches }
  )

  return branches
}

const drawLSystemFromData = (
  branches: { x: number; y: number; xEnd: number; yEnd: number }[],
  context: CanvasRenderingContext2D
) => {
  for (const branch of branches) {
    context.beginPath()
    context.moveTo(branch.x, branch.y)
    context.lineTo(branch.xEnd, branch.yEnd)
    context.strokeStyle = 'black'
    context.lineWidth = 1
    context.stroke()
  }
}
const data = generateLSystemData(
  0,
  0,
  Math.PI / 2,
  maxBranchLength,
  lSystemString
)

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

  context.save()
  context.translate(cssWidth / 2, cssHeight)

  drawLSystemFromData(data, context)

  context.restore()
}

export default treeAnimation2
