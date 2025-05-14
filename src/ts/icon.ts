const icon_bar = document.querySelector('#icon-bar');
// interface Icon {
//   index: number;
//   isRunning: boolean;
//   programID?: string;
// }
class Icon {
  index: number; // ordering in icon-bar
  isRunning: number; // 0: none, 1: default, 2: fullscreen, 3: minimize
  programID?: string;
  constructor(index: number, isRunning: number) {
    this.index = index;
    this.isRunning = isRunning;
  }
  getIndex(): number {
    return this.index;
  }
  setIndex(idx: number): void {
    this.index = idx;
  }
  getIsRunning(): number {
    return this.isRunning;
  }
  setIsRunning(status: number) {
    this.isRunning = status;
  }
}
// class Iconbar {

// }
type iconList = {
  [key: number]: Icon | undefined;
};
const icon_list: iconList = {};
let icon_cnt: number = 0;

function createIcon(idx: number, status: number, id?: string) {
  const tmpIcon: Icon = new Icon(idx, status);

  icon_list[idx] = tmpIcon;
  if (id !== undefined) tmpIcon.programID = id;
  const iconLi = document.createElement('li');
  iconLi.classList.add('icon');
  iconLi.dataset.idx = tmpIcon.getIndex().toString();
  iconLi.dataset.status = tmpIcon.getIsRunning().toString();
  if (tmpIcon.programID !== undefined) iconLi.dataset.id = tmpIcon.programID.toString();
  icon_bar!.appendChild(iconLi);
}

function removeIcon(icon: Icon) {
  const icon_arr = icon_bar!.querySelectorAll('.icon');
  console.log(icon);
  const idx = icon.getIndex();
  Array.from(icon_arr).forEach(e => {
    console.log((e as HTMLLIElement).dataset.idx);
  });
  const targetIcon = Array.from(icon_arr).find(e => (e as HTMLLIElement).dataset.idx === idx.toString());
  console.log(targetIcon);
  icon_list[idx] = undefined;
  icon_arr[idx].remove();
  targetIcon?.remove();
}

// ----------------임시 버튼 테스트 코드---------------------------
addCreateIconBtn();
addRemoveIconBtn();
function addCreateIconBtn() {
  const body = document.querySelector('body');
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
    createIcon(icon_cnt, 0, icon_cnt.toString());
    icon_cnt++;
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
    removeIcon(icon_list[icon_cnt - 1] as Icon);
    icon_cnt--;
  });
}
