export function getFavoritesAmount(value) {
    if (value instanceof Storage) {
        const amount = value.getItem('favoritesAmount');
        return amount;
    }
}
