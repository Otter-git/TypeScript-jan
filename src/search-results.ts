import { renderBlock } from './lib.js'
import { toggleFavoriteItem } from './toggleFavoriteItem.js'
import { FlatRentSdk } from './flat-rent-sdk.js'
import { searchResultsArray } from './search-form.js'

function responseToJson(requestPromise: Promise<Response>) {
  return requestPromise
    .then((response) => {
      return response.text()
    })
    .then((response) => {
      return JSON.parse(response)
    })
}

class Flat {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  remoteness: number;

  constructor(id: string, name: string, description: string,
    image: string, price: number, remoteness: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.remoteness = remoteness;
  }

}
export async function searchFormResult(checkinValue: number, checkoutValue: number, priceValue?: number) {
  let url = 'http://localhost:3030/places?' +
    `checkInDate=${checkinValue}&` +
    `checkOutDate=${checkoutValue}&` +
    'coordinates=59.9386,30.3141'

  if (priceValue != null) {
    url += `&maxPrice=${priceValue}`
  }

  const results = [] as Array<object>;

  await responseToJson(fetch(url))
    .then(function (apiresults) {
      apiresults.forEach((element: { id: string; name: string; description: string; image: string; price: number; remoteness: number }) => {
        results.push(new Flat(element.id, element.name, element.description, element.image,
          element.price, element.remoteness));
      });
    })

  const sdkBase = new FlatRentSdk()

  const sdkBaseResults = sdkBase.search({
    city: 'Санкт-Петербург', checkInDate: new Date(checkinValue),
    checkOutDate: new Date(checkoutValue), priceLimit: priceValue as number,
  });
  sdkBaseResults.then(function (fileresults) {
    fileresults.forEach(element => {
      const days = (checkoutValue - checkinValue) / 86400000;
      results.push(new Flat(element.id, element.title, element.details,
        element.photos[0], element.totalPrice / days, 1))
    });
  });

  return new Promise((resolve, reject) => {
    resolve(results);
  });

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

export function renderEmptyOrErrorSearchBlock(reasonMessage: any) {
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

export function renderSearchResultsBlock(results: any) {
  let itemBlock = ''
  for (const element of results) {
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
  }
  renderBlock(
    'search-results-block',
    `<div class="search-results-header">
      <p>Результаты поиска</p>
      <div class="search-results-filter">
          <span><i class="icon icon-filter"></i> Сортировать:</span>
          <select class="select">
              <option selected="">Выберите критерий</option>
              <option value="cheap">Сначала дешёвые</option>
              <option value="expensive">Сначала дорогие</option>
              <option value="remoteness">Сначала ближе</option>
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

  const selectBtn = <HTMLSelectElement>document.querySelector('.select');
  selectBtn.addEventListener('change', function () {
    if (this.value == 'cheap') {
      searchResultsArray.sort(function (a: { price: number }, b: { price: number }) {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    }
    if (this.value == 'expensive') {
      searchResultsArray.sort(function (a: { price: number }, b: { price: number }) {
        if (b.price > a.price) {
          return 1;
        }
        if (b.price < a.price) {
          return -1;
        }
        return 0;
      });
    }
    if (this.value == 'remoteness') {
      searchResultsArray.sort(function (a: { remoteness: number }, b: { remoteness: number }) {
        if (a.remoteness > b.remoteness) {
          return 1;
        }
        if (a.remoteness < b.remoteness) {
          return -1;
        }
        return 0;
      });
    }
    renderSearchResultsBlock(searchResultsArray);
  })
}
