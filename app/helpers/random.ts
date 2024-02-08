
export function range(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function rangeFloor(min: number, max: number) {
    return Math.floor(range(min, max));
}