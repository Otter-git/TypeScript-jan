import { renderBlock } from './lib.js'
import { searchFormResult } from './search-results.js'

export function renderSearchFormBlock(firstDate, lastDate) {
  const date = new Date();
  const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2);
  const checkinDate = nextDay.toJSON().slice(0, 10);
  const lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4);
  const checkoutDate = lastDay.toJSON().slice(0, 10);

  function search(event) {
    event.preventDefault();
    const checkinValue = (<HTMLInputElement>document.getElementById('check-in-date')).value;
    const checkoutValue = (<HTMLInputElement>document.getElementById('check-out-date')).value;
    const priceValue = (<HTMLInputElement>document.getElementById('max-price')).value;
    searchFormResult(checkinValue, checkoutValue, priceValue);
  }

  renderBlock(
    'search-form-block',
    `
    <form id="form-btn">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkinDate}" min="${firstDate}" max="${lastDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkoutDate}" min="${firstDate}" max="${lastDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  const formBtn = <HTMLFormElement>document.getElementById('form-btn');
  formBtn.addEventListener('submit', search);
}
