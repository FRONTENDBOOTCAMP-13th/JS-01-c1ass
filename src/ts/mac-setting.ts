import { default as size_arr } from './mac-screen-size.ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Icon, type Iconbar, type iconList, iconBar } from './icon.ts';
const body = document.querySelector('body');
const mac = document.querySelector('.mac') as HTMLDivElement;
const mac_screen = document.querySelector('.mac-screen') as HTMLDivElement;
const mac_bottom = document.querySelector('.mac-bottom') as HTMLDivElement;
const blank_widget_arr = document.querySelectorAll('.blank-widget');
const icon_bar = document.querySelector('#icon-bar');
const icon_arr = icon_bar!.querySelectorAll('.icon');
const icon_color_arr = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E3BAFF', '#FFCCE5', '#CCE5FF', '#D5FFCC', '#FFF0BA', '#FFCBA4', '#CBA4FF'];

addSelect();
paintBlankWidgets();
addBlankWidgetToggle();
paintIconColorful();
addBodyDragToggle();
addCreateIconBtn();
addRemoveIconBtn();

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
    console.log('click');
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
    iconBar.insertIcon(iconBar.createIcon(iconBar.icon_cnt, 0, iconBar.icon_cnt.toString()));
    iconBar.icon_cnt++;
  });
}
function addRemoveIconBtn() {
  const body = document.querySelector('body');
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
    iconBar.removeIcon(iconBar.icon_list[iconBar.icon_cnt - 1] as Icon);
    iconBar.icon_cnt--;
  });
}
