export function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max)
}

export function lerp(a: number, b: number, alpha: number) {
    return a + alpha * (b - a)
}

export function normalize(val: number, max: number, min: number) {
    return (val - min) / (max - min);
}; 