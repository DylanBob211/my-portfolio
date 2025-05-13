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

  function perlinNoise() {
    const grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ]

    const p = new Array(256)
    const perm = new Array(512)
    const gradP = new Array(512)

    for (let i = 0; i < 256; i++) {
      p[i] = Math.floor(random() * 256)
    }

    for (let i = 0; i < 512; i++) {
      perm[i] = p[i & 255]
      gradP[i] = grad3[perm[i] % 12]
    }

    function fade(t: number) {
      return t * t * t * (t * (t * 6 - 15) + 10)
    }

    function lerp(a: number, b: number, t: number) {
      return (1 - t) * a + t * b
    }

    function dot(g: number[], x: number, y: number) {
      return g[0] * x + g[1] * y
    }

    return function (x: number, y: number) {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255

      x -= Math.floor(x)
      y -= Math.floor(y)

      const u = fade(x)
      const v = fade(y)

      const g00 = gradP[X + perm[Y]]
      const g01 = gradP[X + perm[Y + 1]]
      const g10 = gradP[X + 1 + perm[Y]]
      const g11 = gradP[X + 1 + perm[Y + 1]]

      const n00 = dot(g00, x, y)
      const n10 = dot(g10, x - 1, y)
      const n01 = dot(g01, x, y - 1)
      const n11 = dot(g11, x - 1, y - 1)

      const nx0 = lerp(n00, n10, u)
      const nx1 = lerp(n01, n11, u)

      return lerp(nx0, nx1, v)
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
    noise: perlinNoise(),
  }
})()
