// 커서 바꾸는 함수
const cursorImgSrc = '/asserts/doodi-game/etc/toy_hammer.png';
const cursorClickImgSrc = '/asserts/doodi-game/etc/toy_hammer-hurt.png';

// 기본 커서 숨기기
document.body.style.cursor = 'none';

// 커서 이미지 두 개 만들기
const cursorDefault = document.createElement('img');
cursorDefault.src = cursorImgSrc;
cursorDefault.alt = '기본 커서';
cursorDefault.style.position = 'fixed';
cursorDefault.style.width = '50px';
cursorDefault.style.pointerEvents = 'none';
cursorDefault.style.zIndex = '999';
cursorDefault.style.userSelect = 'none';

const cursorClick = document.createElement('img');
cursorClick.src = cursorClickImgSrc;
cursorClick.alt = '클릭 커서';
cursorClick.style.position = 'fixed';
cursorClick.style.width = '60px';
cursorClick.style.pointerEvents = 'none';
cursorClick.style.zIndex = '999';
cursorClick.style.userSelect = 'none';
cursorClick.style.opacity = '0'; // 기본은 숨김

// 둘 다 body에 추가
document.body.appendChild(cursorDefault);
document.body.appendChild(cursorClick);

// 커서 따라다니기
document.addEventListener('mousemove', e => {
  const x = e.clientX - 25;
  const y = e.clientY - 25;
  cursorDefault.style.left = `${x}px`;
  cursorDefault.style.top = `${y}px`;
  cursorClick.style.left = `${x}px`;
  cursorClick.style.top = `${y}px`;
});

// 클릭 시 보이기 전환
document.addEventListener('mousedown', () => {
  cursorDefault.style.opacity = '0';
  cursorClick.style.opacity = '1';
});

// 클릭 해제 시 복원
document.addEventListener('mouseup', () => {
  cursorDefault.style.opacity = '1';
  cursorClick.style.opacity = '0';
});
