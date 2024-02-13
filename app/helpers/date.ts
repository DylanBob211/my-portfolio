export function MMdashYYYY(d: Date) {
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
}