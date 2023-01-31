import { renderBlock } from './lib.js'
import { toggleFavoriteItem } from './toggleFavoriteItem.js'

function responseToJson(requestPromise) {
  return requestPromise
    .then((response) => {
      return response.text()
    })
    .then((response) => {
      return JSON.parse(response)
    })
}

export function searchFormResult(checkinValue: number, checkoutValue: number, priceValue?: number) {
  console.log(checkinValue, checkoutValue, priceValue);
  let url = 'http://localhost:3030/places?' +
    `checkInDate=${checkinValue}&` +
    `checkOutDate=${checkoutValue}&` +
    'coordinates=59.9386,30.3141'

  if (priceValue != null) {
    url += `&maxPrice=${priceValue}`
  }

  return responseToJson(fetch(url))
}

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock(results) {
  let itemBlock = ''
  results.forEach(element => {
    itemBlock = itemBlock + `
    <ul class="results-list">
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites" id="${element.id}"></div>
            <img class="result-img" src="${element.image}">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${element.name}</p>
              <p class="price">${element.price}</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${element.remoteness}</div>
            <div class="result-info--descr">${element.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    `
  });
  renderBlock(
    'search-results-block',
    `<div class="search-results-header">
      <p>Результаты поиска</p>
      <div class="search-results-filter">
          <span><i class="icon icon-filter"></i> Сортировать:</span>
          <select>
              <option selected="">Сначала дешёвые</option>
              <option selected="">Сначала дорогие</option>
              <option>Сначала ближе</option>
          </select>
      </div>
    </div>
    ${itemBlock}`
  )

  const favBtns = <NodeListOf<HTMLElement>>document.querySelectorAll('.favorites');
  favBtns.forEach(el => {
    if (localStorage.getItem(`favoriteItems_${el.id}`) !== null) {
      el.classList.add('active');
    }
    el.onclick = (event) => {
      event.preventDefault()
      toggleFavoriteItem(event);
    }
  })
}
