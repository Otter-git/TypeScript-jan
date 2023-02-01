import { renderBlock } from './lib.js'

export function renderUserBlock(userName: string, picLink: string, favoriteItemsAmount?: string) {
  const favoritesCaption = favoriteItemsAmount !== '0' && favoriteItemsAmount != null ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount !== '0' && favoriteItemsAmount != null ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${picLink}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}

export function renderUserFavorites(favoriteItemsAmount?: string) {
  const favoritesCaption = favoriteItemsAmount !== '0' && favoriteItemsAmount != null ? favoriteItemsAmount : 'ничего нет';
  const hasFavoriteItems = favoriteItemsAmount !== '0' && favoriteItemsAmount != null ? true : false;
  (<HTMLElement>document.querySelector('.fav')).innerHTML = `<i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}`;
}
