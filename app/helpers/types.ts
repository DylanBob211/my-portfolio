export function isObject(a: unknown): a is Record<string, any> {
    return typeof a === 'object' &&
        !Array.isArray(a) &&
        a !== null
}