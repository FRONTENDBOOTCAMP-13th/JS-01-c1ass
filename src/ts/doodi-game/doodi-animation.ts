// 커서 이미지 경로 (원하는 이미지로 변경)
const cursorImgSrc = '../../../public/asserts/doodi-game/etc/toy_hammer.png';

// 이미지 요소 만들기
const fakeCursor = document.createElement('img');
fakeCursor.src = cursorImgSrc;
fakeCursor.alt = '커서 이미지';
fakeCursor.style.position = 'fixed';
fakeCursor.style.width = '50px'; // 원하는 사이즈로 조정
fakeCursor.style.pointerEvents = 'none'; // 마우스 이벤트 막지 않도록
fakeCursor.style.zIndex = '9999';
document.body.appendChild(fakeCursor);

// 마우스 움직임 감지해서 이미지 위치 이동
document.addEventListener('mousemove', e => {
  fakeCursor.style.left = `${e.clientX - 25}px`;
  fakeCursor.style.top = `${e.clientY - 25}px`;
});
