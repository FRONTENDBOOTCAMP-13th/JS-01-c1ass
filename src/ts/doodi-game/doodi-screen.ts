// 화면 전환, 게임 상태 초기화 (replay, home 버튼 기능) 구현

import { setTime, isGameActive, setGameActive, reTimerBar } from './doodi-timer';
import { readyStart, moleTimeoutId } from './doodi-mole';

// video 2배속 재생
const video = document.getElementById('myVideo') as HTMLVideoElement | null;
if (video) {
  video.playbackRate = 2.0;
}

// 모든 화면 div 가져오기
const screens = document.querySelectorAll<HTMLElement>('.screen');

// 현재 화면 인덱스
let currentIndex = 0;

// 화면 전환 함수
function showScreen(index: number): void {
  screens.forEach((screen, i) => {
    screen.classList.toggle('hidden', i !== index);
  });
}

// 버튼 클릭 핸들러 (before, after 버튼을 누를 때 화면 전환)
function handleNavigation(event: Event): void {
  const target = event.target as HTMLElement;
  const button = target.closest('button');
  if (!button) return;

  if (button.classList.contains('before') && currentIndex > 0) {
    currentIndex--;
  } else if (button.classList.contains('after') && currentIndex < screens.length - 1) {
    currentIndex++;
  }

  showScreen(currentIndex);
  effectPopSound();
}

// 효과음 (pop) : 버튼 클릭 효과음
export function effectPopSound() {
  const popSound = new Audio('/asserts/doodi-game/etc/effect_pop.mp3');
  popSound.volume = 0.1;
  popSound.play().catch(err => {
    console.warn('오디오 실행 실패:', err);
  });
}

// 모든 before/after 버튼에 이벤트 연결
document.querySelectorAll<HTMLButtonElement>('.before, .after').forEach(button => {
  button.addEventListener('click', handleNavigation);
});

// 시작 시 첫 화면만 보이게
showScreen(currentIndex);

// 게임 상태 초기화
function resetGameState() {
  console.log('게임 상태 초기화 시작: resetGameState()');

  // 1) 게임 활성화 상태 재설정
  setGameActive(true);
  if (isGameActive()) {
  }

  // 2) 타이머 초기화
  const initialTime = 40;
  setTime(initialTime);
  const timerTag = document.getElementById('timer') as HTMLElement;
  if (timerTag) {
    timerTag.innerText = initialTime.toString();
  }

  // 3) 점수 초기화
  const pointTag = document.getElementById('point') as HTMLElement;
  const pointViewTag = document.getElementById('point-view');
  if (pointTag) pointTag.innerText = '0';
  if (pointViewTag) pointViewTag.innerText = '0';

  // 4) 타임오버 이미지 숨기기
  const gameOverImg = document.getElementById('game-over') as HTMLImageElement;

  if (gameOverImg) {
    gameOverImg.classList.add('hidden');
  }

  // 5) 두더지 반복 제거
  clearTimeout(moleTimeoutId);

  // 6) 타이머 바 초기화 (있다면)
  reTimerBar();
}

const replayBtn = document.getElementById('replay');

function handleReplayClick() {
  resetGameState();
  showScreen(3);
  readyStart();
}

if (replayBtn) {
  replayBtn.removeEventListener('click', handleReplayClick); // 혹시 이전 핸들러 제거
  replayBtn.addEventListener('click', handleReplayClick);
  effectPopSound();
}

// 'home' 버튼 기능 구현
function home() {
  currentIndex = 0;
  showScreen(0);
}

document.getElementById('home')?.addEventListener('click', () => {
  home();
  resetGameState();
  console.log('move to home');
  effectPopSound();
});
