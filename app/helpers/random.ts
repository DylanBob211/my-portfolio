
export function range(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function rangeFloor(min: number, max: number) {
    return Math.floor(range(min, max));
}

export function randomValueBetweenVariation(value: number, variationPercentage: number) {
    return (value + rangeFloor(-value * variationPercentage / 100, value * variationPercentage / 100))
}