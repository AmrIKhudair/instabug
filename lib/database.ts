export function generateId(prefix: string, length = 12) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const id = []

    for (let i = 0; i < length; i++) {
        const index = Math.floor(length * Math.random());
        id.push(chars[index])
    }

    return prefix + '_' + id.join('')
}