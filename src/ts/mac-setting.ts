import { default as size_arr } from './mac-screen-size.ts';
import { iconBar } from './icon-bar.ts';
import { insertIcon } from './mac-panel-manager.ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const body = document.querySelector('body');
const mac = document.querySelector('.mac') as HTMLDivElement;
const mac_screen = document.querySelector('.mac-screen') as HTMLDivElement;
const mac_bottom = document.querySelector('.mac-bottom') as HTMLDivElement;
const blank_widget_arr = document.querySelectorAll('.blank-widget');
const icon_bar = document.querySelector('#icon-bar');
const icon_color_arr = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E3BAFF', '#FFCCE5', '#CCE5FF', '#D5FFCC', '#FFF0BA', '#FFCBA4', '#CBA4FF'];

let iconCounter = 0;

setInitIcon();
addSelect();
paintBlankWidgets();
addBlankWidgetToggle();
paintIconColorful();
addBodyDragToggle();
addCreateIconBtn();
addRemoveIconBtn();

body?.addEventListener('click', showID);

function setInitIcon() {
  iconCounter++;
  const tmpicon1 = iconBar.createIcon(0, iconCounter.toString());
  insertIcon(tmpicon1);
  (tmpicon1 as HTMLElement).style.backgroundColor = icon_color_arr[(iconCounter - 1) % icon_color_arr.length];
  iconCounter++;
  const tmpicon2 = iconBar.createIcon(0, iconCounter.toString());
  insertIcon(tmpicon2);
  (tmpicon2 as HTMLElement).style.backgroundColor = icon_color_arr[(iconCounter - 1) % icon_color_arr.length];
  iconCounter++;
  const tmpicon3 = iconBar.createIcon(0, iconCounter.toString());
  insertIcon(tmpicon3);
  (tmpicon3 as HTMLElement).style.backgroundColor = icon_color_arr[(iconCounter - 1) % icon_color_arr.length];
  iconCounter++;
  const tmpicon4 = iconBar.createIcon(0, iconCounter.toString());
  insertIcon(tmpicon4);
  (tmpicon4 as HTMLElement).style.backgroundColor = icon_color_arr[(iconCounter - 1) % icon_color_arr.length];
  (tmpicon1 as HTMLElement).textContent = tmpicon1.dataset.id!;
  (tmpicon2 as HTMLElement).textContent = tmpicon2.dataset.id!;
  (tmpicon3 as HTMLElement).textContent = tmpicon3.dataset.id!;
  (tmpicon4 as HTMLElement).textContent = tmpicon4.dataset.id!;
}

function showID() {
  const iconarr = document.querySelectorAll('.icon');
  iconarr.forEach(e => {
    e.textContent = (e as HTMLLIElement).dataset.id!;
  });

  const panelarr = document.querySelectorAll('.mac-panel');
  panelarr.forEach(e => {
    const content = e.querySelector('.mac-panel-program');
    content!.textContent = (e as HTMLDivElement).dataset.id!;
  });
}

function addSelect() {
  const select = document.createElement('select');
  select.classList.add('mac-screen-size');
  select.style.position = 'absolute';
  select.style.top = '10px';
  select.style.left = '10px';
  select.style.border = '1px solid black';
  size_arr.forEach((e: number[], i: number) => {
    const option = document.createElement('option');
    if (e[0] === 1200) {
      option.setAttribute('selected', 'true');
      mac_bottom.style.height = (Math.sqrt(size_arr[i][0]) * 3).toString() + 'px';
    }
    const str = `${e[0]}px ${e[1]}px`;
    option.setAttribute('value', `${i}`);
    option.textContent = str;
    select.appendChild(option);
  });
  body?.insertBefore(select, mac as HTMLDivElement);
  select.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const selectedIndex = target.value;
    const index = parseInt(selectedIndex);

    mac_screen.style.width = size_arr[index][0].toString() + 'px';
    mac_screen.style.height = size_arr[index][1].toString() + 'px';
    mac_bottom.style.height = (Math.sqrt(size_arr[index][0]) * 3).toString() + 'px';
  });
}

function paintBlankWidgets() {
  Array.from(blank_widget_arr).forEach(e => {
    (e as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
  });
}

function addBlankWidgetToggle() {
  const btn = document.createElement('button');
  btn.style.position = 'absolute';
  btn.style.top = '50px';
  btn.style.left = '10px';
  btn.style.border = '1px solid black';
  btn.style.paddingInline = '4px';
  btn.style.borderRadius = '8px';
  btn.style.backgroundColor = '#d9d9d9';
  btn.setAttribute('type', 'button');
  btn.textContent = '그리드 격자 제거';

  body?.insertBefore(btn, body.firstChild);
  btn.addEventListener('click', () => {
    Array.from(blank_widget_arr).forEach(e => {
      if ((e as HTMLDivElement).style.backgroundColor) {
        (e as HTMLDivElement).style.backgroundColor = '';
        btn.textContent = '그리드 격자 추가';
      } else {
        (e as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
        btn.textContent = '그리드 격자 제거';
      }
    });
  });
}
function paintIconColorful() {
  const icon_arr = icon_bar!.querySelectorAll('.icon');
  Array.from(icon_arr).forEach((e, i) => {
    (e as HTMLLIElement).style.backgroundColor = icon_color_arr[i];
  });
}

function addBodyDragToggle() {
  const btn = document.createElement('button');
  btn.style.position = 'absolute';
  btn.style.top = '90px';
  btn.style.left = '10px';
  btn.style.border = '1px solid black';
  btn.style.paddingInline = '4px';
  btn.style.borderRadius = '8px';
  btn.style.backgroundColor = '#d9d9d9';
  btn.setAttribute('type', 'button');
  btn.textContent = '드래그 기능 추가';

  body?.insertBefore(btn, body.firstChild);
  btn.addEventListener('click', () => {
    if (body?.classList.contains('select-none')) {
      body!.classList.remove('select-none');
      btn.textContent = '드래그 기능 제거';
    } else {
      body!.classList.add('select-none');
      btn.textContent = '드래그 기능 추가';
    }
  });
}

function addCreateIconBtn() {
  const btn = document.createElement('button');
  btn.style.position = 'absolute';
  btn.style.top = '130px';
  btn.style.left = '10px';
  btn.style.border = '1px solid black';
  btn.style.paddingInline = '4px';
  btn.style.borderRadius = '8px';
  btn.style.backgroundColor = '#d9d9d9';
  btn.setAttribute('type', 'button');
  btn.textContent = '아이콘 추가';

  body?.insertBefore(btn, body.firstChild);
  btn.addEventListener('click', () => {
    iconCounter++;
    const tmpicon = iconBar.createIcon(0, iconCounter.toString());
    insertIcon(tmpicon);
    (tmpicon as HTMLElement).style.backgroundColor = icon_color_arr[(iconCounter - 1) % icon_color_arr.length];
  });
}

function addRemoveIconBtn() {
  const btn = document.createElement('button');
  btn.style.position = 'absolute';
  btn.style.top = '170px';
  btn.style.left = '10px';
  btn.style.border = '1px solid black';
  btn.style.paddingInline = '4px';
  btn.style.borderRadius = '8px';
  btn.style.backgroundColor = '#d9d9d9';
  btn.setAttribute('type', 'button');
  btn.textContent = '아이콘 삭제';

  body?.insertBefore(btn, body.firstChild);
  btn.addEventListener('click', () => {
    if (iconCounter > 0) {
      iconBar.removeIcon(iconCounter.toString());
      iconCounter--;
    }
  });
}
