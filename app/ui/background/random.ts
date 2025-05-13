export const random = (function () {
  function xmur3(str: string) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
      (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
        (h = (h << 13) | (h >>> 19))
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507)
      h = Math.imul(h ^ (h >>> 13), 3266489909)
      return (h ^= h >>> 16) >>> 0
    }
  }

  function sfc32(a: number, b: number, c: number, d: number): () => number {
    return function () {
      a >>>= 0
      b >>>= 0
      c >>>= 0
      d >>>= 0
      let t = (a + b) | 0
      a = b ^ (b >>> 9)
      b = (c + (c << 3)) | 0
      c = (c << 21) | (c >>> 11)
      d = (d + 1) | 0
      t = (t + d) | 0
      c = (c + t) | 0
      return (t >>> 0) / 4294967296
    }
  }

  let seededRandom: (() => number) | null = null

  function random(): number {
    if (!seededRandom) {
      _Seed('abc')
    }

    return seededRandom!()
  }

  function randomRange(a: number, b: number): number {
    return random() * (b - a) + a
  }

  function _Seed(s: string): void {
    const seed = xmur3(s + '')
    seededRandom = sfc32(seed(), seed(), seed(), seed())
  }

  return {
    seed: _Seed,
    random,
    randomRange,
  }
})()
