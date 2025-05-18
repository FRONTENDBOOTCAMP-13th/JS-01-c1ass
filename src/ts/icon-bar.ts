const icon_bar = document.querySelector('#icon-bar');

interface Iconbar {
  createIcon(status: number, id: string): HTMLLIElement;
  setIconStatus(id: string, status: number): void;
  removeIcon(id: string): void;
  getIconStatus(id: string): number | undefined;
}

const iconBar: Iconbar = {
  createIcon(status: number, id: string): HTMLLIElement {
    const iconLi = document.createElement('li');
    iconLi.classList.add('icon');
    iconLi.dataset.status = status.toString();
    iconLi.dataset.id = id;
    if (status !== 0) iconLi.classList.add('active');
    else iconLi.classList.remove('active');
    icon_bar!.appendChild(iconLi);
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
};

export { iconBar };
