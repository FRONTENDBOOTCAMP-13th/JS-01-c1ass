import { iconBar } from './icon-bar.ts';
import { createBgSelectorUI } from './bg-selector.ts';

const macScreen = document.querySelector('.mac-screen') as HTMLElement;
if (!macScreen) throw new Error('mac-screen element not found');

macScreen.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault();

  const macScreenMenuArr = [{ changebg: '배경 화면 변경' }, { setusername: '사용자 이름 설정' }];
  const iconMenuArr = [{ open: '열기' }, { delete: '삭제' }];

  // 기존 메뉴 제거
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

    const rect = macScreen.getBoundingClientRect();
    const ulRect = ctx_ul.getBoundingClientRect();
    let left = e.clientX - rect.left;
    let top = e.clientY - rect.top;

    // 메뉴가 화면 밖으로 나가지 않게 조정
    if (left + ulRect.width > rect.width) left = rect.width - ulRect.width;
    if (top + ulRect.height > rect.height) top = rect.height - ulRect.height;

    ctx_ul.style.left = `${left}px`;
    ctx_ul.style.top = `${top}px`;
  } else {
    macScreenMenuArr.forEach(el => {
      const ctx_li = document.createElement('li');
      ctx_li.classList.add('context-menu-item');
      ctx_li.dataset.id = Object.keys(el)[0];
      ctx_li.textContent = Object.values(el)[0];
      ctx_ul.appendChild(ctx_li);
    });

    const rect = macScreen.getBoundingClientRect();
    const ulRect = ctx_ul.getBoundingClientRect();

    let left = e.clientX - rect.left;
    let top = e.clientY - rect.top;

    if (left + ulRect.width > rect.width) left = rect.width - ulRect.width;
    if (top + ulRect.height > rect.height) top = rect.height - ulRect.height;

    ctx_ul.style.left = `${left}px`;
    ctx_ul.style.top = `${top}px`;
  }

  // 클릭 외부 감지시 메뉴 제거
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
          targetIcon.style.transition = 'transform 0.3s';
          targetIcon.style.transform = 'scale(0, 1)';
          setTimeout(() => {
            iconBar.removeIcon(idx);
          }, 300);
        }
      }
      ctx_ul.remove();
    } else {
      if (targetId === 'changebg') {
        // 패널 생성
        const mac_panel_overlay = document.createElement('li');
        mac_panel_overlay.classList.add('mac-panel', 'mac-panel-overlay');
        // 유니크한 data-id 지정 (예: timestamp 기반)
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

        // 닫기 버튼
        const close_mac_panel = document.createElement('div');
        close_mac_panel.classList.add('close-mac-panel');
        close_mac_panel.title = '닫기';
        close_mac_panel.addEventListener('click', () => {
          mac_panel_overlay.remove();
        });

        // 최소화 버튼
        const minimize_mac_panel = document.createElement('div');
        minimize_mac_panel.classList.add('minimize-mac-panel');
        minimize_mac_panel.title = '최소화';

        // 전체화면 토글 버튼
        const full_mac_panel = document.createElement('div');
        full_mac_panel.classList.add('full-mac-panel');
        full_mac_panel.title = '전체화면 토글';

        // 이벤트 등록: 최소화 (컨텐츠 영역 숨기기/보이기)
        minimize_mac_panel.addEventListener('click', () => {
          if (mac_panel_content.style.height === '32px') {
            // 원래 크기 복구
            mac_panel_content.style.height = '';
          } else {
            mac_panel_content.style.height = '32px'; // 헤더 높이만 남김
          }
        });

        const mac_panel_program = document.createElement('div');
        mac_panel_program.classList.add('mac-panel-program');

        const mac_panel_cover = document.createElement('div');
        mac_panel_cover.classList.add('mac-panel-cover');

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

        // 배경 선택 UI 생성
        createBgSelectorUI(mac_panel_program);

        // 패널 드래그 가능하게 설정 (헤더를 드래그 영역으로)
        makePanelDraggable(mac_panel_overlay, mac_panel_header);

        ctx_ul.remove();
      } else if (targetId === 'setusername') {
        console.log('setusername click');
        ctx_ul.remove();
      }
    }
  });
});

// 패널 드래그 기능
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

    // 마우스 클릭 지점과 패널 좌측상단 좌표 차이 (부모 좌표 기준)
    offsetX = e.clientX - panelRect.left;
    offsetY = e.clientY - panelRect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    const parentRect = panel.parentElement!.getBoundingClientRect();

    // 부모 기준 좌표로 변환해서 위치 계산
    let left = e.clientX - parentRect.left - offsetX;
    let top = e.clientY - parentRect.top - offsetY;

    // 패널이 부모 영역 밖으로 나가지 않도록 제한 (선택사항)
    const maxLeft = parentRect.width - panel.offsetWidth;
    const maxTop = parentRect.height - panel.offsetHeight;

    if (left < 0) left = 0;
    else if (left > maxLeft) left = maxLeft;

    if (top < 0) top = 0;
    else if (top > maxTop) top = maxTop;

    // 위치 설정
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
