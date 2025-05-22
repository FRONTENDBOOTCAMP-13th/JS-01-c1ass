import { programIDSet, programID } from '../programID.ts';
import { insertIcon } from './mac-panel-manager.ts';
const icon_bar = document.querySelector('#icon-bar');

interface Iconbar {
  createIcon(status: number, id: string): HTMLLIElement;
  setIconStatus(id: string, status: number): void;
  removeIcon(id: string): void;
  getIconStatus(id: string): number | undefined;
  insertAddIconBtn(): void;
}

const iconBar: Iconbar = {
  createIcon(status: number, id: string): HTMLLIElement {
    const iconLi = document.createElement('li');
    if (programIDSet.has(id)) {
      for (let i = 0; i < programID.length; i++) {
        if (programID[i].pid === id) {
          iconLi.style.backgroundImage = `url('${programID[i].imageURL}')`;
          break;
        }
      }
    } else if (id === 'add-icon') iconLi.style.backgroundImage = "url('/asserts/mac/add-icon.svg')";
    else iconLi.style.backgroundImage = `url('/asserts/mac/notfound.png')`;
    iconLi.style.backgroundRepeat = 'no-repeat';
    iconLi.style.backgroundPosition = 'center';
    if (id !== 'add-icon') iconLi.style.backgroundSize = 'cover';
    iconLi.classList.add('icon');
    iconLi.dataset.status = status.toString();
    iconLi.dataset.id = id;
    const iconCover = document.createElement('div');
    iconCover.classList.add('icon-cover');
    if (status !== 0) iconLi.classList.add('active');
    else iconLi.classList.remove('active');
    icon_bar!.appendChild(iconLi);
    iconLi.appendChild(iconCover);
    return iconLi;
  },

  setIconStatus(id: string, status: number): void {
    const iconElement = document.querySelector(`li.icon[data-id="${id}"]`);
    if (iconElement) {
      (iconElement as HTMLElement).dataset.status = status.toString();
      if (status !== 0) iconElement.classList.add('active');
      else iconElement.classList.remove('active');
    }
  },

  removeIcon(id: string): void {
    const iconElement = document.querySelector(`li.icon[data-id="${id}"]`);
    if (iconElement) {
      iconElement.remove();
    }
  },

  getIconStatus(id: string): number | undefined {
    const iconElement = document.querySelector(`li.icon[data-id="${id}"]`);
    if (iconElement) {
      return Number((iconElement as HTMLElement).dataset.status);
    }
    return undefined;
  },
  insertAddIconBtn(): void {
    const tmpicon = iconBar.createIcon(0, 'add-icon');
    insertIcon(tmpicon);
    icon_bar!.appendChild(tmpicon);
  },
};

export { iconBar };
