export function toggleFavoriteItem(event) {
    const favoriteItemImg = event.target.parentElement.lastElementChild.src;
    const favoriteItemName = event.target.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.textContent;
    const favoriteId = event.target.id;
    event.target.classList.toggle('active');
    if (event.target.classList.contains('active')) {
        localStorage.setItem(`favoriteItems_${favoriteId}`, JSON.stringify({
            id: favoriteId,
            image: favoriteItemImg,
            name: favoriteItemName
        }));
    }
    else {
        localStorage.removeItem(`favoriteItems_${favoriteId}`);
        console.log('remove');
    }
    localStorage.setItem('favoritesAmount', JSON.stringify(localStorage.length - 2));
}
