import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
window.addEventListener('DOMContentLoaded', () => {
    const date = new Date();
    const firstDate = date.toJSON().slice(0, 10);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 1);
    const lastDate = lastDay.toJSON().slice(0, 10);
    renderUserBlock('Wade Warren', '/img/avatar.png', '1');
    renderSearchFormBlock(firstDate, lastDate);
    renderSearchStubBlock();
    renderToast({ text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' }, { name: 'Понял', handler: () => { console.log('Уведомление закрыто'); } });
});
