import { iconBar } from './icon-bar.ts';
import { programIDSet, programID } from '../programID.ts';
const container = document.querySelector('#mac-panel-container');

interface MacPanelContainer {
  createMacPanel(id: string, status: number): HTMLLIElement;
  setStatus(id: string, status: number): void;
  removePanel(id: string): void;
  getNextZIndex(): number;
}

const panelContainer: MacPanelContainer = {
  createMacPanel(id: string, status: number): HTMLLIElement {
    const mac_panel_overlay = document.createElement('li');
    mac_panel_overlay.classList.add('mac-panel');
    mac_panel_overlay.classList.add('mac-panel-overlay');
    const mac_panel_content = document.createElement('div');
    mac_panel_content.classList.add('mac-panel-content');
    const mac_panel_header = document.createElement('div');
    mac_panel_header.classList.add('mac-panel-header');
    const mac_panel_title = document.createElement('div');
    mac_panel_title.classList.add('mac-panel-title');
    const mac_panel_header_left = document.createElement('div');
    mac_panel_header_left.classList.add('mac-panel-header-left');
    const mac_panel_header_right = document.createElement('div');
    mac_panel_header_right.classList.add('mac-panel-header-right');
    const mac_panel_program = document.createElement('div');
    mac_panel_program.classList.add('mac-panel-program');
    const close_mac_panel = document.createElement('div');
    close_mac_panel.classList.add('close-mac-panel');
    const minimize_mac_panel = document.createElement('div');
    minimize_mac_panel.classList.add('minimize-mac-panel');
    const full_mac_panel = document.createElement('div');
    full_mac_panel.classList.add('full-mac-panel');
    const mac_panel_inner_program = document.createElement('iframe');
    // mac_panel_inner_program.src = '/src/pages/card.html';
    if (programIDSet.has(id)) {
      for (let i = 0; i < programID.length; i++) {
        if (programID[i].pid === id) {
          mac_panel_inner_program.src = programID[i].fileURL;
          break;
        }
      }
    } else mac_panel_inner_program.src = '/src/pages/notfound.html';
    // mac_panel_inner_program.src = 'https://papago.naver.com/';
    // mac_panel_inner_program.src = 'https://quokkadocs.netlify.app/';
    mac_panel_inner_program.classList.add('w-full', 'h-full');
    mac_panel_inner_program.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');

    mac_panel_overlay.appendChild(mac_panel_content);
    mac_panel_content.appendChild(mac_panel_header);
    mac_panel_content.appendChild(mac_panel_program);
    mac_panel_header.appendChild(mac_panel_header_left);
    mac_panel_header.appendChild(mac_panel_title);
    mac_panel_header.appendChild(mac_panel_header_right);
    mac_panel_header_left.appendChild(close_mac_panel);
    mac_panel_header_left.appendChild(minimize_mac_panel);
    mac_panel_header_left.appendChild(full_mac_panel);
    mac_panel_program.appendChild(mac_panel_inner_program);

    close_mac_panel.addEventListener('click', () => {
      const icon = document.querySelector(`li.icon[data-id="${id}"]`);
      const targetPanel = document.querySelector(`li.mac-panel[data-id="${id}"]`) as HTMLElement;
      if (targetPanel) {
        const targetContent = targetPanel.querySelector('.mac-panel-content') as HTMLElement;
        targetPanel.dataset!.zIndex = panelContainer.getNextZIndex().toString();
        targetContent.style.zIndex = targetPanel.dataset.zIndex;
      }
      if (icon) {
        const containerRect = container?.getBoundingClientRect();
        const rect = icon.getBoundingClientRect();

        mac_panel_content.style.position = 'absolute';
        mac_panel_content.style.transition = 'all 0.3s ease-out';
        // mac_panel_program.style.transition = 'all 0.3s ease-out';

        requestAnimationFrame(() => {
          mac_panel_content.style.position = '';
          mac_panel_content.style.width = rect.width + 'px';
          mac_panel_content.style.height = rect.height + 'px';
          mac_panel_content.style.left = rect.left - containerRect!.left + 'px';
          mac_panel_content.style.top = rect.top - containerRect!.top + 'px';
          mac_panel_content.style.opacity = '0';
          mac_panel_program.style.height = rect.height - 32 + 'px';
          setTimeout(() => {
            mac_panel_content.style.transition = '';
          }, 310);
        });
      }
      setTimeout(() => {
        this.removePanel(id);
        iconBar.setIconStatus(id, 0);
      }, 340);
    });
    minimize_mac_panel.addEventListener('click', () => {
      const icon = document.querySelector(`li.icon[data-id="${id}"]`);
      const targetPanel = document.querySelector(`li.mac-panel[data-id="${id}"]`) as HTMLElement;
      if (targetPanel) {
        const targetContent = targetPanel.querySelector('.mac-panel-content') as HTMLElement;
        targetPanel.dataset!.zIndex = panelContainer.getNextZIndex().toString();
        targetContent.style.zIndex = targetPanel.dataset.zIndex;
      }
      if (icon) {
        const containerRect = container?.getBoundingClientRect();
        const rect = icon.getBoundingClientRect();
        if (targetPanel.dataset!.status !== '2') {
          mac_panel_content.dataset.left = mac_panel_content.style.left;
          mac_panel_content.dataset.top = mac_panel_content.style.top;
        }

        mac_panel_content.style.position = 'absolute';
        mac_panel_content.style.transition = 'all 0.3s ease-out';
        // mac_panel_program.style.transition = 'all 0.3s ease-out';
        targetPanel.classList.add('pointer-events-none');

        requestAnimationFrame(() => {
          mac_panel_content.style.position = '';
          mac_panel_content.style.width = rect.width + 'px';
          mac_panel_content.style.height = rect.height + 'px';
          mac_panel_content.style.left = rect.left - containerRect!.left + 'px';
          mac_panel_content.style.top = rect.top - containerRect!.top + 'px';
          mac_panel_content.style.opacity = '0';
          mac_panel_program.style.height = rect.height - 32 + 'px';
          setTimeout(() => {
            mac_panel_content.style.transition = '';
          }, 310);
        });
      }
      setTimeout(() => {
        this.setStatus(id, 3);
        iconBar.setIconStatus(id, 3);
      }, 340);
    });
    full_mac_panel.addEventListener('click', () => {
      const currentStatus = mac_panel_overlay.dataset.status;
      const newStatus = currentStatus === '1' ? 2 : 1;
      this.setStatus(id, newStatus);
      const targetPanel = document.querySelector(`li.mac-panel[data-id="${id}"]`) as HTMLElement;
      if (targetPanel) {
        const targetContent = targetPanel.querySelector('.mac-panel-content') as HTMLElement;
        targetPanel.dataset!.zIndex = panelContainer.getNextZIndex().toString();
        targetContent.style.zIndex = targetPanel.dataset.zIndex;
      }
    });
    close_mac_panel.addEventListener('mousedown', event => {
      event.stopPropagation();
    });
    close_mac_panel.addEventListener('mousemove', event => {
      event.stopPropagation();
    });
    close_mac_panel.addEventListener('mouseup', event => {
      event.stopPropagation();
    });
    minimize_mac_panel.addEventListener('mousedown', event => {
      event.stopPropagation();
    });
    minimize_mac_panel.addEventListener('mousemove', event => {
      event.stopPropagation();
    });
    minimize_mac_panel.addEventListener('mouseup', event => {
      event.stopPropagation();
    });
    full_mac_panel.addEventListener('mousedown', event => {
      event.stopPropagation();
    });
    full_mac_panel.addEventListener('mousemove', event => {
      event.stopPropagation();
    });
    full_mac_panel.addEventListener('mouseup', event => {
      event.stopPropagation();
    });

    makeDraggable(mac_panel_content, mac_panel_header);
    mac_panel_overlay.dataset.id = id;
    mac_panel_overlay.dataset.status = status.toString();
    mac_panel_overlay.dataset.zIndex = this.getNextZIndex().toString();
    mac_panel_content.style.zIndex = mac_panel_overlay.dataset.zIndex;
    mac_panel_title.textContent = id;

    mac_panel_program.addEventListener('mousedown', () => {
      const targetPanel = document.querySelector(`li.mac-panel[data-id="${id}"]`) as HTMLElement;
      if (targetPanel) {
        const targetContent = targetPanel.querySelector('.mac-panel-content') as HTMLElement;
        targetPanel.dataset!.zIndex = panelContainer.getNextZIndex().toString();
        targetContent.style.zIndex = targetPanel.dataset.zIndex;
      }
    });

    return mac_panel_overlay;
  },

  setStatus(id: string, status: number): void {
    const panel = container?.querySelector(`.mac-panel-overlay[data-id="${id}"]`) as HTMLElement;
    if (!panel) return;

    const content = panel.querySelector('.mac-panel-content') as HTMLElement;
    panel.dataset.status = status.toString();
    if (status === 1) {
      content.classList.remove('w-full', 'h-full');
      content.style.left = content.dataset.left as string;
      content.style.top = content.dataset.top as string;
      content.dataset.left = '';
      content.dataset.top = '';
      setTimeout(() => {
        content.classList.remove('transition-all');
      }, 300);
    } else if (status === 2) {
      content.classList.add('transition-all');
      if (!(content.classList.contains('w-full') && content.classList.contains('h-full'))) {
        content.dataset.left = content.style.left;
        content.dataset.top = content.style.top;
      }
      content.classList.add('w-full', 'h-full');
      content.style.left = '0';
      content.style.top = '0';
    } else if (status === 3) {
      setTimeout(() => {
        content.classList.remove('transition-all');
      }, 300);
    }
  },

  removePanel(id: string): void {
    const panel = container?.querySelector(`.mac-panel-overlay[data-id="${id}"]`);
    panel?.remove();
  },

  getNextZIndex(): number {
    const panels = container?.querySelectorAll('.mac-panel-overlay') || [];
    let maxZ = 0;
    panels.forEach(panel => {
      const z = parseInt((panel as HTMLElement).dataset.zIndex || '0');
      maxZ = Math.max(maxZ, z);
    });
    return maxZ + 1;
  },
};

function makeDraggable(modal: HTMLElement, handle: HTMLElement): void {
  let isDragging = false;
  const containerRec = container?.getBoundingClientRect();
  let offsetX = 0;
  let offsetY = 0;

  handle.addEventListener('mousedown', (e: MouseEvent) => {
    // fullscreen 상태면 드래그 금지
    if (modal.parentElement?.dataset.status === '2') return;
    modal.parentElement!.dataset!.zIndex = panelContainer.getNextZIndex().toString();
    modal.style.zIndex = modal.parentElement!.dataset.zIndex;
    isDragging = true;
    const rect = modal.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    modal.style.left = `${e.clientX - offsetX - containerRec!.left}px`;
    modal.style.top = `${e.clientY - offsetY - containerRec!.top}px`;
  }
  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

export { panelContainer };
