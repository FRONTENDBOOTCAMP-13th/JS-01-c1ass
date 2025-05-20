import { iconBar } from './icon-bar.ts';
import { panelContainer } from './mac-panel-container.ts';
const container = document.querySelector('#mac-panel-container');
// const icon_bar = document.querySelector('#icon-bar');
// const icon_arr = icon_bar?.querySelectorAll('.icon');

// window.addEventListener('message', e => {
//   if (e.data === 'iframeClicked') {
//     console.log('iframe 안에서 클릭됨');
//   }
// });

function insertIcon(icon: HTMLLIElement) {
  icon.addEventListener('click', () => {
    const iconId = icon.dataset.id!;
    const status = icon.dataset.status!;
    if (status === '0') {
      openPanel(iconId);
      iconBar.setIconStatus(iconId, 1);
    } else if (status === '1') {
      const targetPanel = document.querySelector(`li.mac-panel[data-id="${iconId}"]`) as HTMLElement;
      if (targetPanel) {
        const targetContent = targetPanel.querySelector('.mac-panel-content') as HTMLElement;
        targetPanel.dataset!.zIndex = panelContainer.getNextZIndex().toString();
        targetContent.style.zIndex = targetPanel.dataset.zIndex;
      }
    } else if (status === '3') {
      const targetPanel = document.querySelector(`li.mac-panel[data-id="${iconId}"]`) as HTMLElement;
      if (targetPanel) {
        targetPanel.classList.remove('pointer-events-none');
        const targetContent = targetPanel.querySelector('.mac-panel-content') as HTMLElement;
        const targetProgram = targetContent.querySelector('.mac-panel-program') as HTMLElement;
        targetPanel.dataset!.zIndex = panelContainer.getNextZIndex().toString();
        targetContent.style.zIndex = targetPanel.dataset.zIndex;
        if (icon) {
          // const containerRect = container?.getBoundingClientRect();
          const rect = icon.getBoundingClientRect();

          targetContent.style.position = 'absolute';
          targetContent.style.width = rect.width + 'px';
          targetContent.style.height = rect.height + 'px';
          // targetContent.dataset.left = targetContent.style.left;
          // targetContent.dataset.top = targetContent.style.top;
          // targetContent.style.left = rect.left - containerRect!.left + 'px';
          // targetContent.style.top = rect.top - containerRect!.top + 'px';
          targetContent.style.opacity = '0';
          targetProgram.style.height = rect.height - 32 + 'px';
          targetContent.style.transition = 'all 0.3s ease-out';
          // targetProgram.style.transition = 'all 0.3s ease-out';

          requestAnimationFrame(() => {
            targetContent.style.position = '';
            targetContent.style.width = '';
            targetContent.style.height = '';
            targetContent.style.left = targetContent.dataset.left + 'px';
            targetContent.style.top = targetContent.dataset.top + 'px';
            // targetContent.style.left = targetContent.dataset.left as string;
            // targetContent.style.top = targetContent.dataset.top as string;
            targetContent.style.opacity = '1';
            targetProgram.style.height = '';
            setTimeout(() => {
              targetContent.style.transition = '';
            }, 310);
          });
        }
        if (targetContent.classList.contains('w-full') && targetContent.classList.contains('h-full')) {
          targetContent.classList.remove('w-full', 'h-full');
          targetContent.style.width = '';
          targetContent.style.height = '';
          targetContent.classList.add('w-full', 'h-full');
          panelContainer.setStatus(iconId, 2);
        } else {
          iconBar.setIconStatus(iconId, 1);
          panelContainer.setStatus(iconId, 1);
        }
      }
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
    // program.style.transition = 'all 0.01s ease-out';
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
