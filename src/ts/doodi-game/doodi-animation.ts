// 커서 바꾸는 함수

const cursorImgSrc = '../../../public/asserts/doodi-game/etc/toy_hammer.png';
const cursorClickImgSrc = '../../../public/asserts/doodi-game/etc/toy_hammer-hurt.png';

// 이미지 요소 만들기
const fakeCursor = document.createElement('img');
fakeCursor.src = cursorImgSrc;
fakeCursor.alt = '커서 이미지';
fakeCursor.style.position = 'fixed';
fakeCursor.style.width = '50px';
fakeCursor.style.pointerEvents = 'none';
fakeCursor.style.zIndex = '9999';
document.body.appendChild(fakeCursor);

// 기본 커서 숨기기
document.body.style.cursor = 'none';

// 커서 따라다니기
document.addEventListener('mousemove', e => {
  fakeCursor.style.left = `${e.clientX - 25}px`;
  fakeCursor.style.top = `${e.clientY - 25}px`;
});

// 눌렀을 때 이미지 변경
document.addEventListener('mousedown', () => {
  fakeCursor.src = cursorClickImgSrc;
  fakeCursor.style.width = '60px';
});

// 뗐을 때 이미지 복원
document.addEventListener('mouseup', () => {
  fakeCursor.src = cursorImgSrc;
  fakeCursor.style.width = '50px';
});
