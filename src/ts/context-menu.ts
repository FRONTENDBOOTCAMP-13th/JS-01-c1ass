import { iconBar } from './icon-bar.ts';
import { createBgSelectorUI } from './bg-selector.ts';

const macScreen = document.querySelector('.mac-screen') as HTMLElement;
if (!macScreen) throw new Error('mac-screen element not found');

//페이지 로드 시 저장된 이름이 있다면 표시
const savedName = localStorage.getItem('username');
if (savedName) {
  const helloTarget = document.querySelector('#screen-overlay-hello');
  if (helloTarget) {
    helloTarget.textContent = `안녕하세요 ${savedName}님.`;
  }
}

macScreen.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault();

  const macScreenMenuArr = [{ changebg: '배경 화면 변경' }, { setusername: '사용자 이름 설정' }];
  const iconMenuArr = [{ open: '열기' }, { delete: '삭제' }];

  const existingMenu = macScreen.querySelector('.context-menu');
  if (existingMenu) existingMenu.remove();

  const ctx_ul = document.createElement('ul');
  ctx_ul.classList.add('context-menu');
  macScreen.appendChild(ctx_ul);

  const target = e.target as HTMLElement;

  if (target.classList.contains('icon-cover')) {
    iconMenuArr.forEach(el => {
      const ctx_li = document.createElement('li');
      ctx_li.classList.add('context-menu-item');
      ctx_li.dataset.id = Object.keys(el)[0];
      ctx_li.textContent = Object.values(el)[0];
      ctx_ul.appendChild(ctx_li);

      const closestIcon = target.closest('.icon') as HTMLElement | null;
      if (closestIcon) {
        ctx_ul.dataset.target = `icon${closestIcon.dataset.id ?? ''}`;
      }
    });
  } else {
    macScreenMenuArr.forEach(el => {
      const ctx_li = document.createElement('li');
      ctx_li.classList.add('context-menu-item');
      ctx_li.dataset.id = Object.keys(el)[0];
      ctx_li.textContent = Object.values(el)[0];
      ctx_ul.appendChild(ctx_li);
    });
  }

  const rect = macScreen.getBoundingClientRect();
  const ulRect = ctx_ul.getBoundingClientRect();
  let left = e.clientX - rect.left;
  let top = e.clientY - rect.top;

  if (left + ulRect.width > rect.width) left = rect.width - ulRect.width;
  if (top + ulRect.height > rect.height) top = rect.height - ulRect.height;

  ctx_ul.style.left = `${left}px`;
  ctx_ul.style.top = `${top}px`;

  const handleClickOutside = (evt: MouseEvent) => {
    if (!ctx_ul.contains(evt.target as Node)) {
      ctx_ul.remove();
      document.removeEventListener('click', handleClickOutside);
    }
  };
  document.addEventListener('click', handleClickOutside);

  ctx_ul.addEventListener('click', (event: MouseEvent) => {
    const targetLi = event.target as HTMLElement;
    const targetId = targetLi.dataset.id;
    const currentTarget = event.currentTarget as HTMLElement;

    if (currentTarget.dataset.target?.startsWith('icon')) {
      const idx = currentTarget.dataset.target.slice('icon'.length);
      if (targetId === 'open') {
        const iconLi = document.querySelector(`li.icon[data-id="${idx}"]`) as HTMLElement | null;
        iconLi?.click();
      } else if (targetId === 'delete') {
        const targetIcon = document.querySelector(`li.icon[data-id="${idx}"]`) as HTMLElement | null;
        if (targetIcon) {
          iconBar.removeIcon(idx);
        }
      }
      ctx_ul.remove();
    } else {
      if (targetId === 'changebg') {
        const mac_panel_overlay = document.createElement('li');
        mac_panel_overlay.classList.add('mac-panel', 'mac-panel-overlay');
        mac_panel_overlay.dataset.id = 'bgpanel-' + Date.now();

        const mac_panel_content = document.createElement('div');
        mac_panel_content.classList.add('mac-panel-content');

        const mac_panel_header = document.createElement('div');
        mac_panel_header.classList.add('mac-panel-header');

        const mac_panel_title = document.createElement('div');
        mac_panel_title.classList.add('mac-panel-title');
        mac_panel_title.textContent = '배경화면 선택';

        const mac_panel_header_left = document.createElement('div');
        mac_panel_header_left.classList.add('mac-panel-header-left');

        const mac_panel_header_right = document.createElement('div');
        mac_panel_header_right.classList.add('mac-panel-header-right');

        const close_mac_panel = document.createElement('div');
        close_mac_panel.classList.add('close-mac-panel');
        close_mac_panel.title = '닫기';
        close_mac_panel.addEventListener('click', () => {
          mac_panel_overlay.remove();
        });

        const minimize_mac_panel = document.createElement('div');
        minimize_mac_panel.classList.add('minimize-mac-panel');
        minimize_mac_panel.title = '최소화';
        minimize_mac_panel.addEventListener('click', () => {
          if (mac_panel_content.style.height === '32px') {
            mac_panel_content.style.height = '';
          } else {
            mac_panel_content.style.height = '32px';
          }
        });

        const full_mac_panel = document.createElement('div');
        full_mac_panel.classList.add('full-mac-panel');
        full_mac_panel.title = '전체화면 토글';

        const mac_panel_program = document.createElement('div');
        mac_panel_program.classList.add('mac-panel-program', 'allow-scroll', 'w-full', 'h-full');

        mac_panel_overlay.appendChild(mac_panel_content);
        mac_panel_content.appendChild(mac_panel_header);
        mac_panel_content.appendChild(mac_panel_program);
        mac_panel_header.appendChild(mac_panel_header_left);
        mac_panel_header.appendChild(mac_panel_title);
        mac_panel_header.appendChild(mac_panel_header_right);
        mac_panel_header_left.appendChild(close_mac_panel);
        mac_panel_header_left.appendChild(minimize_mac_panel);
        mac_panel_header_left.appendChild(full_mac_panel);

        const container = document.querySelector('#mac-panel-container');
        container?.appendChild(mac_panel_overlay);

        createBgSelectorUI(mac_panel_program);
        makePanelDraggable(mac_panel_overlay, mac_panel_header);
        ctx_ul.remove();
      } else if (targetId === 'setusername') {
        const mac_panel_overlay = document.createElement('li');
        mac_panel_overlay.classList.add('mac-panel', 'mac-panel-overlay');
        mac_panel_overlay.dataset.id = 'userpanel-' + Date.now();

        const mac_panel_content = document.createElement('div');
        mac_panel_content.classList.add('mac-panel-content');

        const mac_panel_header = document.createElement('div');
        mac_panel_header.classList.add('mac-panel-header');

        const mac_panel_title = document.createElement('div');
        mac_panel_title.classList.add('mac-panel-title');
        mac_panel_title.textContent = '사용자 이름 설정';

        const mac_panel_header_left = document.createElement('div');
        mac_panel_header_left.classList.add('mac-panel-header-left');

        const mac_panel_header_right = document.createElement('div');
        mac_panel_header_right.classList.add('mac-panel-header-right');

        const close_mac_panel = document.createElement('div');
        close_mac_panel.classList.add('close-mac-panel');
        close_mac_panel.title = '닫기';
        close_mac_panel.addEventListener('click', () => {
          mac_panel_overlay.remove();
        });

        const minimize_mac_panel = document.createElement('div');
        minimize_mac_panel.classList.add('minimize-mac-panel');
        minimize_mac_panel.title = '최소화';
        minimize_mac_panel.addEventListener('click', () => {
          if (mac_panel_content.style.height === '32px') {
            mac_panel_content.style.height = '';
          } else {
            mac_panel_content.style.height = '32px';
          }
        });

        const full_mac_panel = document.createElement('div');
        full_mac_panel.classList.add('full-mac-panel');
        full_mac_panel.title = '전체화면 토글';

        const mac_panel_program = document.createElement('div');
        mac_panel_program.classList.add('mac-panel-program', 'allow-scroll', 'w-full', 'h-full', 'flex', 'items-center', 'justify-around');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '이름을 입력하세요';
        // 스타일 추가
        // 스타일 추가
        input.classList.add('border', 'border-gray-300', 'rounded-lg', 'px-4', 'py-4', 'w-[70%]', 'text-base', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');

        input.classList.add('username-input');

        const button = document.createElement('button');
        button.classList.add('bg-blue-500', 'hover:bg-blue-600', 'text-white', 'font-semibold', 'px-1', 'py-4', 'rounded-lg', 'w-1/5', 'transition', 'duration-150');
        button.textContent = '저장';
        button.classList.add('username-save-btn');

        button.addEventListener('click', () => {
          const name = input.value.trim();
          if (name) {
            localStorage.setItem('username', name);
            const helloTarget = document.querySelector('#screen-overlay-hello');
            if (helloTarget) {
              helloTarget.textContent = `안녕하세요 ${name}님.`;
            }
            mac_panel_overlay.remove();
          }
        });

        input.addEventListener('keydown', e => {
          if (e.key === 'Enter') button.click();
        });

        mac_panel_program.appendChild(input);
        mac_panel_program.appendChild(button);

        mac_panel_overlay.appendChild(mac_panel_content);
        mac_panel_content.appendChild(mac_panel_header);
        mac_panel_content.appendChild(mac_panel_program);
        mac_panel_header.appendChild(mac_panel_header_left);
        mac_panel_header.appendChild(mac_panel_title);
        mac_panel_header.appendChild(mac_panel_header_right);
        mac_panel_header_left.appendChild(close_mac_panel);
        mac_panel_header_left.appendChild(minimize_mac_panel);
        mac_panel_header_left.appendChild(full_mac_panel);

        const container = document.querySelector('#mac-panel-container');
        container?.appendChild(mac_panel_overlay);

        makePanelDraggable(mac_panel_overlay, mac_panel_header);
        ctx_ul.remove();
      }
    }
  });
});

function makePanelDraggable(panel: HTMLElement, handle: HTMLElement) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const parent = panel.parentElement;
  if (!parent) return;

  function onMouseDown(e: MouseEvent) {
    e.preventDefault();
    isDragging = true;

    const panelRect = panel.getBoundingClientRect();

    offsetX = e.clientX - panelRect.left;
    offsetY = e.clientY - panelRect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    const parentRect = panel.parentElement!.getBoundingClientRect();

    let left = e.clientX - parentRect.left - offsetX;
    let top = e.clientY - parentRect.top - offsetY;

    const maxLeft = parentRect.width - panel.offsetWidth;
    const maxTop = parentRect.height - panel.offsetHeight;

    if (left < 0) left = 0;
    else if (left > maxLeft) left = maxLeft;

    if (top < 0) top = 0;
    else if (top > maxTop) top = maxTop;

    panel.style.position = 'absolute';
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  function onMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  handle.addEventListener('mousedown', onMouseDown);
}
