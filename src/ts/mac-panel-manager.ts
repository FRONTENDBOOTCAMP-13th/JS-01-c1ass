import { iconBar } from './icon-bar.ts';
import { panelContainer } from './mac-panel-container.ts';
const container = document.querySelector('#mac-panel-container');
// const icon_bar = document.querySelector('#icon-bar');
// const icon_arr = icon_bar?.querySelectorAll('.icon');

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
  const content = mac_panel_overlay.querySelector('.mac-panel-content') as HTMLElement;
  const program = content.querySelector('.mac-panel-program') as HTMLElement;
  const icon = document.querySelector(`li.icon[data-id="${id}"]`);
  if (icon) {
    const containerRect = container?.getBoundingClientRect();
    const rect = icon.getBoundingClientRect();

    content.style.position = 'absolute';
    content.style.width = rect.width + 'px';
    content.style.height = rect.height + 'px';
    content.style.left = rect.left - containerRect!.left + 'px';
    content.style.top = rect.top - containerRect!.top + 'px';
    content.style.opacity = '0';
    program.style.height = rect.height - 32 + 'px';
    content.style.transition = 'all 0.3s ease-out';
    program.style.transition = 'all 0.3s ease-out';
    container?.appendChild(mac_panel_overlay);

    requestAnimationFrame(() => {
      content.style.position = '';
      content.style.width = '';
      content.style.height = '';
      content.style.left = '0';
      content.style.top = '0';
      content.style.opacity = '1';
      program.style.height = '';
      setTimeout(() => {
        content.style.transition = '';
      }, 310);
    });
  }
}

export { insertIcon };
