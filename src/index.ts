import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getUserData } from './userData.js'
import { getFavoritesAmount } from './favoritesAmount.js'

const usersData = {
  'username': 'Wade Warren',
  'avatarUrl': '/img/avatar.png'
}
localStorage.setItem('user', JSON.stringify(usersData));

const userData = getUserData(localStorage);
const favoritesAmount = getFavoritesAmount(localStorage);

window.addEventListener('DOMContentLoaded', () => {

  const date = new Date();
  const firstDate = date.toJSON().slice(0, 10);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 1);
  const lastDate = lastDay.toJSON().slice(0, 10);

  renderUserBlock(userData.username, userData.avatarUrl, favoritesAmount)
  renderSearchFormBlock(firstDate, lastDate)
  renderSearchStubBlock()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  )
})

