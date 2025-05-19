const drawElement = document.getElementById('draw') as HTMLDivElement;
const drawContent = document.getElementById('draw-content') as HTMLDivElement;

const bgImages = ['/asserts/socks-game/paper1.png', '/asserts/socks-game/paper2.png', '/asserts/socks-game/paper3.png', '/asserts/socks-game/paper_package.png'];

// draw 나타나는 함수
function showDrawWithAnimation() {
  drawElement.classList.remove('hidden');

  // 1. 첫 이미지(bg1) + 흔들림 애니메이션
  drawContent.style.backgroundImage = `url(${bgImages[0]})`;
  drawContent.classList.add('shake');

  // 2. 흔들림 끝난 후(1초)부터 나머지 이미지 보여주기 시작
  setTimeout(() => {
    drawContent.classList.remove('shake');

    let index = 1; // bg2부터 시작
    const interval = setInterval(() => {
      drawContent.style.backgroundImage = `url(${bgImages[index]})`;
      index++;

      if (index >= bgImages.length) {
        clearInterval(interval);
      }
    }, 200); // 각 이미지 1초 간격
  }, 500); // 흔들림 1초 동안 유지
}

// 버튼 클릭 이벤트에 연결
const button = document.querySelector('button');
button?.addEventListener('click', showDrawWithAnimation);
