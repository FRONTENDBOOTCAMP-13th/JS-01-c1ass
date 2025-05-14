const icon_bar = document.querySelector('#icon-bar');
const icon_arr = icon_bar!.querySelectorAll('.icon');
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
  const idx = icon.getIndex();
  Array.from(icon_arr).find(e => {
    if ((e as HTMLLIElement).dataset.idx === idx.toString()) {
      e.remove();
      icon_list[idx] = undefined;
    }
  });
}

createIcon(0, 0, '0');
// dummycode
Array.from(icon_arr).forEach((e, i) => {
  e.addEventListener('click', () => {
    e.textContent = i.toString();
  });
});
