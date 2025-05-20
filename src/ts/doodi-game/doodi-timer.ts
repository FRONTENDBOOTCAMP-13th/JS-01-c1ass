// 타이머 및 타임 오버 함수
export let time = 40;
let timerInterval: number;
export let gameActive = true;

const overSound = new Audio('/asserts/doodi-game/etc/start.aac');
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

let lastTime = Date.now();
let smoothBarAnimationId: number;

// 부드러운 타이머 바 애니메이션
function animateTimerBar() {
  const timerBar = document.getElementById('timer-bar') as HTMLDivElement;
  if (!timerBar) return;

  const now = Date.now();
  const elapsed = (now - lastTime) / 1000; // 초 단위

  // 현재 시간을 기준으로 남은 시간 비율 계산
  const currentTimeRatio = Math.max(time - elapsed, 0) / 40;
  const percent = currentTimeRatio * 100;

  timerBar.style.height = `${percent}%`;
  timerBar.style.top = `${100 - percent}%`;

  if (currentTimeRatio > 0) {
    smoothBarAnimationId = requestAnimationFrame(animateTimerBar);
  }
}

// 타이머(숫자) 시작
export function startTimer() {
  const timerTag = document.getElementById('timer');
  timerTag!.innerText = time.toString();

  lastTime = Date.now(); // 시작 시점 기록
  animateTimerBar(); // 부드러운 바 애니메이션 시작

  // 숫자 타이머
  timerInterval = setInterval(() => {
    time--;
    timerTag!.innerText = time.toString();

    if (time <= 0) {
      clearInterval(timerInterval);
      gameActive = false;
      cancelAnimationFrame(smoothBarAnimationId); // 애니메이션 정지
      showGameOverImage();
    } else {
      lastTime = Date.now(); // 매초마다 기준점 갱신
    }
  }, 1000);
}

// 타이머 바 초기화
export function reTimerBar() {
  const timerBar = document.getElementById('timer-bar') as HTMLDivElement | null;
  if (timerBar) {
    const percent = (time / 40) * 100;
    timerBar.style.height = `${percent}%`;
    timerBar.style.top = `${100 - percent}%`;
  }
}
