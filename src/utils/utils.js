export const formatCollectionName = (name) => {
    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}
