const macScreen = document.querySelector('.mac-screen');

macScreen!.addEventListener('contextmenu', e => {
  console.log(e.currentTarget);
  console.log(e.target);
  const macScreenMenuArr: { [key: string]: string }[] = [{ changebg: '배경 화면 변경' }, { setusername: '사용자 이름 설정' }];
  const iconMenuArr: { [key: string]: string }[] = [{ open: '열기' }, { delete: '삭제' }];

  const ctx_ul = document.createElement('ul');
  ctx_ul.classList.add('context-menu');
  macScreen?.appendChild(ctx_ul);

  e.preventDefault();
  if ((e.target! as HTMLElement).classList.contains('icon-cover')) {
    iconMenuArr.forEach(e => {
      const ctx_li = document.createElement('li');
      ctx_li.classList.add('context-menu-item');
      ctx_li.dataset.id = Object.keys(e)[0];
      ctx_li.textContent = Object.values(e)[0];
      ctx_ul.appendChild(ctx_li);
    });
    console.log('dddddddd');
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
});
