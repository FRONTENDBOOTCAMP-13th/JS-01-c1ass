// 타이머 및 타임 오버
export let time = 20;
let timerInterval: number;
let barTimerInterval: number;
export let gameActive = true;

const overSound = new Audio('../../../public/asserts/doodi-game/etc/start.aac');
overSound.volume = 0.8;

export function setGameActive(state: boolean) {
  gameActive = state;
}

export function isGameActive(): boolean {
  return gameActive;
}

export function setTime(value: number) {
  time = value;
}

// 타임오버 이미지 표시 함수
function showGameOverImage() {
  console.log('showGameOverImage 실행');

  const gameOverImg = document.getElementById('game-over') as HTMLImageElement;
  if (gameOverImg) {
    gameOverImg.classList.remove('hidden');
    overSound.play();
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

// 타이머(숫자) 시작
export function startTimer() {
  console.log('startTimer 실행');
  const timerTag = document.getElementById('timer');
  timerTag!.innerText = time.toString();

  // 숫자 타이머
  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      clearInterval(barTimerInterval);
      gameActive = false;
      showGameOverImage();
      return;
    }

    time--;
    timerTag!.innerText = time.toString();
  }, 1000);

  // 🟩 그 후에 인터벌로 계속 갱신
  barTimerInterval = setInterval(() => {
    const timerBar = document.getElementById('timer-bar') as HTMLDivElement;
    if (timerBar) {
      const percent = (time / 40) * 100;
      timerBar.style.height = `${percent}%`;
      timerBar.style.top = `${100 - percent}%`;
    }
  }, 500);
}

// 타이머 바 초기화
export function reTimerBar() {
  const timerBar = document.getElementById('timer-bar') as HTMLDivElement | null;
  if (timerBar) {
    const percent = (time / 40) * 100;
    timerBar.style.height = `${percent}%`;
    timerBar.style.top = `${100 - percent}%`;
  }
  console.log(`타이머 바 초기화: ${timerBar?.style.height}`);
}
