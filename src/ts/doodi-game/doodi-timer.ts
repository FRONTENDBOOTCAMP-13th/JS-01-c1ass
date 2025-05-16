// 타이머
export let time = 30;
let timerInterval: number;
export let gameActive = true;

// 타임오버 이미지 표시 함수
function showGameOverImage() {
  const gameOverImg = document.getElementById('game-over') as HTMLImageElement;
  if (gameOverImg) {
    gameOverImg.classList.remove('hidden');
  }

  // 모든 홀에서 두더지를 제거
  const holes = document.querySelectorAll<HTMLDivElement>('.hole');
  holes.forEach(hole => {
    const mole = hole.querySelector('div');
    if (mole) mole.remove();
  });
}

// 타임 추가 및 삭제 함수
export function addTime(value: number) {
  time += value;
}
export function minusTime(value: number) {
  time -= value;
}

export function startTimer() {
  const timerTag = document.getElementById('timer');
  timerTag!.innerText = time.toString();

  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      gameActive = false;
      showGameOverImage();
      return;
    }

    time--;
    timerTag!.innerText = time.toString();
  }, 1000);
}
