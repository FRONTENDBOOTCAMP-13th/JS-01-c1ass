// 두더지 생성 및 제거 함수(효과음), 게임 시작 함수, 레벨 조절 함수, 게임 스타트 구현

import { isGameActive, minusTime, startTimer, reTimerBar } from './doodi-timer';

const holes = document.querySelectorAll<HTMLDivElement>('.hole');
let previousIndex = -1;
let previousRow = -1;
let previousCol = -1;

const startSound = new Audio('/asserts/doodi-game/etc/start.aac');
startSound.volume = 0.8;

const sound = new Audio('/asserts/doodi-game/etc/beep.aac');
sound.volume = 0.07;

// 같은 행에서 두더지가 나오지 않도록
function getRow(index: number) {
  return Math.floor(index / 4); // 4행 기준
}

// 같은 열에서 두더지가 나오지 않도록
function getCol(index: number) {
  return index % 4; // 4열 기준
}

// 게임 시작 함수
export function startGame() {
  setTimeout(() => {
    showMole(); // 두더지 생성 및 삭제
    startTimer(); // 타이머 시작
  }, 500);
}

// 스타트 이미지 생성 및 제거 함수
document.querySelector('.start')?.addEventListener('click', () => {
  readyStart();
});

export function readyStart() {
  const readyStart = document.getElementById('ready-start');

  readyStart?.classList.remove('hidden'); // 스타트 이미지 보이기
  startSound.play();
  reTimerBar();

  setTimeout(() => {
    readyStart?.classList.add('hidden');
    startGame(); // 게임 시작
  }, 2000);
}

export let moleTimeoutId: ReturnType<typeof setTimeout>;

// 특정 구멍(hole)에 두더지가 이미 있는지 확인하는 함수
function isMolePresent(index: number): boolean {
  const hole = holes[index];
  if (!hole) return false;
  return hole.querySelector('.mole') !== null; // mole 클래스가 있으면 이미 두더지 있음
}

// 두더지 생성 및 삭제 함수 (애니메이션, 효과음) + 포인트 증감 함수
export function showMole() {
  if (!isGameActive()) return;

  const candidateIndices = Array.from(holes.entries())
    // 이전 위치, 행, 열 조건 + 두더지 중복 생성 방지 조건 추가
    .filter(
      ([index]) => index !== previousIndex && getRow(index) !== previousRow && getCol(index) !== previousCol && !isMolePresent(index), // 이미 두더지 있는 곳은 제외
    )
    .map(([index]) => index);

  // 만약 후보가 없다면(모두 두더지가 있으면) 전체 구멍 중 두더지 없는 곳만 다시 필터
  let finalIndices = candidateIndices;
  if (finalIndices.length === 0) {
    finalIndices = Array.from(holes.entries())
      .filter(([index]) => !isMolePresent(index))
      .map(([index]) => index);
  }

  // 만약 그래도 후보가 없다면(전부 두더지 있으면) 아무거나 뽑음 (안 좋은 상황이지만 fallback)
  if (finalIndices.length === 0) {
    finalIndices = [...holes.keys()];
  }

  const randomIndex = finalIndices[Math.floor(Math.random() * finalIndices.length)];
  const currentRow = getRow(randomIndex);
  const currentCol = getCol(randomIndex);

  previousIndex = randomIndex;
  previousRow = currentRow;
  previousCol = currentCol;

  const isYellow = Math.random() < 0.8;

  const moleImg = document.createElement('img');
  moleImg.src = isYellow ? '/asserts/doodi-game/dooka_hole.webp' : '/asserts/doodi-game/doodi_hole.webp';
  moleImg.alt = isYellow ? 'Yellow Mole' : 'Red Mole';
  moleImg.className = 'w-full h-full object-cover';

  const mole = document.createElement('div');
  mole.className = `mole absolute w-19 h-19 top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/5 active:scale-[120%] mole-bounce`;
  mole.appendChild(moleImg);

  mole.addEventListener('click', () => {
    // 애니메이션 클래스 추가
    mole.classList.remove('mole-bounce');
    mole.classList.add('mole-shrink');

    // 맞는 효과음
    playHitSound();

    // 애니메이션 끝나면 제거
    mole.addEventListener(
      'animationend',
      () => {
        mole.remove();
      },
      { once: true },
    );

    const pointTag = document.getElementById('point');
    const pointViewTag = document.getElementById('point-view');
    const timerTag = document.getElementById('timer');
    if (pointTag && pointViewTag && timerTag) {
      let currentScore = parseInt(pointTag.innerText) || 0;
      let currentTime = parseInt(timerTag.innerText) || 0;

      if (isYellow) {
        currentScore += 100;
      } else {
        currentScore -= 100;
        currentTime -= 1;
        minusTime(1);
      }

      pointTag.innerText = currentScore.toString();
      pointViewTag.innerText = currentScore.toString();
      timerTag.innerText = currentTime.toString();
    }
  });

  holes[randomIndex].appendChild(mole);

  setTimeout(() => {
    mole.classList.add('mole-shrink');
    mole.addEventListener(
      'animationend',
      () => {
        mole.remove();
      },
      { once: true },
    );
  }, 1500); // 두더지 머무는 시간 (고정 또는 점수 기반으로 조정 가능)

  // 다음 두더지 등장 시간 계산
  const pointTag = document.getElementById('point');
  const currentScore = pointTag ? parseInt(pointTag.innerText) || 0 : 0;
  const nextDelay = getMoleDelay(currentScore);

  moleTimeoutId = setTimeout(showMole, nextDelay);
  // 다음 두더지 등장 예약
}

// 점수 기반 속도 조절 함수 (LEVEL)
function getMoleDelay(score: number): number {
  if (score >= 4000) {
    return 300;
  }
  if (score >= 3000) {
    return 400;
  }
  if (score >= 2000) {
    return 600;
  }
  if (score >= 1000) {
    return 800;
  }
  if (score >= 700) {
    return 1000;
  }
  if (score >= 400) {
    return 1500;
  }
  return 2000; // 기본 값
}

// 게임설명(howto) 페이지 인터랙션: bounce 애니메이션 & audio 이펙트
function addMoleBounceEffect(target: HTMLElement) {
  target.classList.remove('little-bounce'); // 이미 있을 경우 제거
  void target.offsetWidth; // 리플로우 강제 → 재적용 가능
  target.classList.add('little-bounce');
  playHitSound();

  target.addEventListener(
    'animationend',
    () => {
      target.classList.remove('little-bounce');
    },
    { once: true },
  );
}

// 두더지 버튼들에 이벤트 추가
document.querySelectorAll('.mole-btn').forEach(el => {
  el.addEventListener('click', () => {
    addMoleBounceEffect(el as HTMLElement);
  });
});

// hitSound() 연속 재생 위한 오디오 생성 함수
function playHitSound() {
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(console.error);
}
