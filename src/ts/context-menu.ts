import { iconBar } from './icon-bar.ts';
const macScreen = document.querySelector('.mac-screen');

macScreen!.addEventListener('contextmenu', e => {
  const macScreenMenuArr: { [key: string]: string }[] = [{ changebg: '배경 화면 변경' }, { setusername: '사용자 이름 설정' }];
  const iconMenuArr: { [key: string]: string }[] = [{ open: '열기' }, { delete: '삭제' }];

  const ctx_ul = document.createElement('ul');
  ctx_ul.classList.add('context-menu');
  macScreen?.appendChild(ctx_ul);

  e.preventDefault();
  if ((e.target! as HTMLElement).classList.contains('icon-cover')) {
    iconMenuArr.forEach(el => {
      const ctx_li = document.createElement('li');
      ctx_li.classList.add('context-menu-item');
      ctx_li.dataset.id = Object.keys(el)[0];
      ctx_li.textContent = Object.values(el)[0];
      ctx_ul.appendChild(ctx_li);
      ctx_ul.dataset.target = `icon${((e.target! as HTMLElement).closest('.icon') as HTMLElement).dataset.id}`;
    });
    const rect = macScreen?.getBoundingClientRect();
    const ulRect = ctx_ul.getBoundingClientRect();
    ctx_ul.style.left = (e as MouseEvent).clientX - rect!.x + 'px';
    ctx_ul.style.top = (e as MouseEvent).clientY - rect!.y - ulRect.height + 'px';
  } else {
    macScreenMenuArr.forEach(e => {
      const ctx_li = document.createElement('li');
      ctx_li.classList.add('context-menu-item');
      ctx_li.dataset.id = Object.keys(e)[0];
      ctx_li.textContent = Object.values(e)[0];
      ctx_ul.appendChild(ctx_li);
    });

    const rect = macScreen?.getBoundingClientRect();
    ctx_ul.style.left = (e as MouseEvent).clientX - rect!.x + 'px';
    ctx_ul.style.top = (e as MouseEvent).clientY - rect!.y + 'px';
  }
  const handleMouseUp = () => {
    ctx_ul.remove();
    document.removeEventListener('mouseup', handleMouseUp);
  };
  document.addEventListener('mouseup', handleMouseUp);
  ctx_ul.addEventListener('mouseup', e => {
    if ((e.currentTarget as HTMLElement).dataset.target) {
      if ((e.currentTarget as HTMLElement).dataset.target!.startsWith('icon')) {
        const idx = (e.currentTarget as HTMLElement).dataset.target!.slice('icon'.length);
        if ((e.target as HTMLElement).dataset.id === 'open') {
          (document.querySelector(`li.icon[data-id="${idx}"]`) as HTMLElement).click();
        } else if ((e.target as HTMLElement).dataset.id === 'delete') {
          const targetIcon = document.querySelector(`li.icon[data-id="${idx}"]`) as HTMLElement;
          targetIcon.style.transition = 'scale';
          targetIcon.style.transitionDuration = '0.3s';
          targetIcon.style.scale = '0 1';
          setTimeout(() => {
            iconBar.removeIcon(idx);
          }, 300);
        }
      }
    } else {
      if ((e.target as HTMLElement).dataset.id === 'changebg') {
        console.log('changebg click');
        // 배경 변경
      } else if ((e.target as HTMLElement).dataset.id === 'setusername') {
        console.log('setusername click');
        // 유저 이름 변경
      }
    }
  });
});
