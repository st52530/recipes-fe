export function getSlug(text) {
    return text.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(' ')
        .join('-')
        .toLowerCase()
}