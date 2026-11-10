// Photos you add to src/assets/photos are picked up by file name (see README there).
const found = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
const map = Object.fromEntries(Object.entries(found).map(([p, url]) => [p.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase(), url]))
export const photo = (key) => map[key]
