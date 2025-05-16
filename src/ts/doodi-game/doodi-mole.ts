import { gameActive, addTime, minusTime, startTimer } from './doodi-timer';

// 두더지(mole)
const holes = document.querySelectorAll<HTMLDivElement>('.hole');
let previousIndex = -1;
let previousRow = -1;
let previousCol = -1;

function getRow(index: number) {
  return Math.floor(index / 4); // 4행 기준
}

function getCol(index: number) {
  return index % 4; // 4열 기준
}

// 게임 시작 함수
function startGame() {
  setTimeout(() => {
    showMole();
    startTimer();
  }, 500);
}

// 버튼 클릭 → 스타트 이미지 → 3초 후 게임 시작
document.querySelector('.start')?.addEventListener('click', () => {
  const readyStart = document.getElementById('ready-start');

  readyStart?.classList.remove('hidden'); // 스타트 이미지 보이기

  setTimeout(() => {
    readyStart?.remove(); // 또는 classList.add('hidden')도 가능
    startGame(); // 게임 시작
  }, 2000);
});

// 버튼 클릭 → 스타트 이미지 → 3초 후 게임 시작
document.getElementById('replay')?.addEventListener('click', () => {
  const readyStart = document.getElementById('ready-start');

  readyStart?.classList.remove('hidden'); // 스타트 이미지 보이기

  setTimeout(() => {
    readyStart?.remove(); // 또는 classList.add('hidden')도 가능
    startGame(); // 게임 시작
  }, 2000);
});

export function showMole() {
  if (!gameActive) return;

  const candidateIndices = Array.from(holes.entries())
    .filter(([index]) => index !== previousIndex && getRow(index) !== previousRow && getCol(index) !== previousCol)
    .map(([index]) => index);

  const finalIndices = candidateIndices.length > 0 ? candidateIndices : [...holes.keys()];
  const randomIndex = finalIndices[Math.floor(Math.random() * finalIndices.length)];
  const currentRow = getRow(randomIndex);
  const currentCol = getCol(randomIndex);

  previousIndex = randomIndex;
  previousRow = currentRow;
  previousCol = currentCol;

  const isYellow = Math.random() < 0.8;

  const moleImg = document.createElement('img');
  moleImg.src = isYellow ? '../../../public/asserts/doodi-game/dooka_hole.webp' : '../../../public/asserts/doodi-game/doodi_hole.webp';
  moleImg.alt = isYellow ? 'Yellow Mole' : 'Red Mole';
  moleImg.className = 'w-full h-full object-cover';

  const mole = document.createElement('div');
  mole.className = `mole absolute w-17 h-17 top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/5 cursor-pointer active:scale-[120%] mole-bounce`;
  mole.appendChild(moleImg);

  mole.addEventListener('click', () => {
    // 애니메이션 클래스 추가
    mole.classList.remove('mole-bounce');
    mole.classList.add('mole-shrink');

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
        currentTime += 1;
        addTime(1);
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

  setTimeout(showMole, nextDelay); // 다음 두더지 등장 예약
}

// 점수 기반 속도 조절 함수
function getMoleDelay(score: number): number {
  if (score >= 4000) {
    console.log('level6');
    return 300;
  }
  if (score >= 3000) {
    console.log('level6');
    return 500;
  }
  if (score >= 2000) {
    console.log('level5');
    return 700;
  }
  if (score >= 1000) {
    console.log('level4');
    return 1000;
  }
  if (score >= 700) {
    console.log('level3');
    return 1500;
  }
  if (score >= 400) {
    console.log('level2');
    return 2000;
  }
  return 2500; // 기본 값
}

// bounce 애니메이션
function addMoleBounceEffect(target: HTMLElement) {
  target.classList.remove('little-bounce'); // 이미 있을 경우 제거
  void target.offsetWidth; // 리플로우 강제 → 재적용 가능
  target.classList.add('little-bounce');

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
