export function getFavoritesAmount(value: unknown) {
    if (value instanceof Storage) {
        const amount = value.getItem('favoritesAmount');
        return amount
    }
}