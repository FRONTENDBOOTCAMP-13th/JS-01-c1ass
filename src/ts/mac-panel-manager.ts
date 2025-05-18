import { iconBar } from './icon-bar.ts';
import { panelContainer } from './mac-panel-container.ts';
const container = document.querySelector('#mac-panel-container');
const icon_bar = document.querySelector('#icon-bar');
const icon_arr = icon_bar?.querySelectorAll('.icon');

Array.from(icon_arr!).forEach(el => {
  el.addEventListener('click', e => {
    const iconElement = e.target as HTMLLIElement;
    const iconId = iconElement.dataset.id!;
    const status = iconBar.getIconStatus(iconId);
    if (status === 0) {
      openPanel(iconId);
      iconBar.setIconStatus(iconId, 1);
    }
  });
});

function insertIcon(icon: HTMLLIElement) {
  const iconId = icon.dataset.id!;
  const status = icon.dataset.status!;
  icon.addEventListener('click', () => {
    if (status === '0') {
      openPanel(iconId);
      iconBar.setIconStatus(iconId, 1);
    }
    if (status === '1') {
      // 구현해야함
    }
  });
}

function openPanel(id: string) {
  const mac_panel_overlay = panelContainer.createMacPanel(id, 1);
  container?.appendChild(mac_panel_overlay);
}

export { insertIcon };
