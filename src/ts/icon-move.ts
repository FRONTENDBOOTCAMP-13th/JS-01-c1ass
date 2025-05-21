import Sortable from 'sortablejs';
const iconBar = document.querySelector('#icon-bar');
Sortable.create(iconBar as HTMLElement, {
  animation: 150,
  direction: 'horizontal',
});
