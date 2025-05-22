window.addEventListener('DOMContentLoaded', () => {
  const screenOverlay = document.getElementById('screen-overlay')!;
  const helloText = document.getElementById('screen-overlay-hello')!;
  const appleLogo = document.querySelector('.mac-bottom img')!;

  let isOverlayVisible = true;
  let isHelloVisible = false;

  appleLogo.addEventListener('click', () => {
    if (isOverlayVisible) {
      if (!isHelloVisible) {
        // 안녕하세요 등장
        helloText.style.bottom = '0';
        helloText.style.opacity = '1';
        isHelloVisible = true;

        powerOn();
        // 오버레이 페이드 아웃
        setTimeout(() => {
          screenOverlay.style.opacity = '0';

          setTimeout(() => {
            screenOverlay.classList.add('hidden');
            isOverlayVisible = false;

            // "안녕하세요" 다시 숨김
            helloText.style.bottom = '-15%';
            helloText.style.opacity = '0';
            isHelloVisible = false;
          }, 800);
        }, 1800);
      }
    } else {
      powerOff();
      screenOverlay.classList.remove('hidden');
      requestAnimationFrame(() => {
        screenOverlay.style.opacity = '1';
      });
      isOverlayVisible = true;
    }
  });
});

const powerOnSound = new Audio('/asserts/mac/startUp.mp3');
powerOnSound.volume = 0.1;

const powerOffSound = new Audio('/asserts/mac/powerOff.mp3');
powerOffSound.volume = 0.1;

function powerOn() {
  powerOnSound.pause();
  powerOnSound.currentTime = 0;
  powerOnSound.play();
}

function powerOff() {
  powerOffSound.pause();
  powerOffSound.currentTime = 0;
  powerOffSound.play();
}
