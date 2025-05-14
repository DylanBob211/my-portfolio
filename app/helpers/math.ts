import { isObject } from './types'

export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

export function lerp(a: number, b: number, alpha: number) {
  return a + alpha * (b - a)
}

export function normalize(val: number, max: number, min: number) {
  return (val - min) / (max - min)
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
