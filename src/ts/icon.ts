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
interface Iconbar {
  icon_list: iconList;
  icon_cnt: number;
  createIcon(idx: number, status: number, id?: string): HTMLLIElement;
  insertIcon(icon: HTMLLIElement): void;
  removeIcon(icon: Icon): void;
}
type iconList = {
  [key: number]: Icon | undefined;
};
// const icon_list: iconList = {};
// let icon_cnt: number = 0;
const iconBar: Iconbar = {
  icon_list: {},
  icon_cnt: 0,
  createIcon(idx: number, status: number, id?: string): HTMLLIElement {
    const tmpIcon: Icon = new Icon(idx, status);
    this.icon_list[idx] = tmpIcon;
    if (id !== undefined) tmpIcon.programID = id;
    const iconLi = document.createElement('li');
    iconLi.classList.add('icon');
    iconLi.dataset.idx = tmpIcon.getIndex().toString();
    iconLi.dataset.status = tmpIcon.getIsRunning().toString();
    if (tmpIcon.programID !== undefined) iconLi.dataset.id = tmpIcon.programID.toString();
    return iconLi;
  },
  insertIcon(icon: HTMLLIElement): void {
    icon_bar!.appendChild(icon);
  },
  removeIcon(icon: Icon): void {
    const icon_arr = icon_bar!.querySelectorAll('.icon');
    console.log(icon);
    const idx = icon.getIndex();
    Array.from(icon_arr).forEach(e => {
      console.log((e as HTMLLIElement).dataset.idx);
    });
    const targetIcon = Array.from(icon_arr).find(e => (e as HTMLLIElement).dataset.idx === idx.toString());
    console.log(targetIcon);
    this.icon_list[idx] = undefined;
    icon_arr[idx].remove();
    targetIcon?.remove();
  },
};
export { Icon, type Iconbar, type iconList, iconBar };
// function createIcon(idx: number, status: number, id?: string): HTMLLIElement {
//   const tmpIcon: Icon = new Icon(idx, status);
//   icon_list[idx] = tmpIcon;
//   if (id !== undefined) tmpIcon.programID = id;
//   const iconLi = document.createElement('li');
//   iconLi.classList.add('icon');
//   iconLi.dataset.idx = tmpIcon.getIndex().toString();
//   iconLi.dataset.status = tmpIcon.getIsRunning().toString();
//   if (tmpIcon.programID !== undefined) iconLi.dataset.id = tmpIcon.programID.toString();
//   return iconLi;
// }
// function insertIcon(icon: HTMLLIElement) {
//   icon_bar!.appendChild(icon);
// }
// function removeIcon(icon: Icon) {
//   const icon_arr = icon_bar!.querySelectorAll('.icon');
//   console.log(icon);
//   const idx = icon.getIndex();
//   Array.from(icon_arr).forEach(e => {
//     console.log((e as HTMLLIElement).dataset.idx);
//   });
//   const targetIcon = Array.from(icon_arr).find(e => (e as HTMLLIElement).dataset.idx === idx.toString());
//   console.log(targetIcon);
//   icon_list[idx] = undefined;
//   icon_arr[idx].remove();
//   targetIcon?.remove();
// }

// ----------------임시 버튼 테스트 코드---------------------------
