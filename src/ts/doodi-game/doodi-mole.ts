import { gameActive, addTime, minusTime } from './doodi-timer';

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
  const colorClass = isYellow ? 'bg-yellow-500' : 'bg-red-500';

  const mole = document.createElement('div');
  mole.className = `absolute w-10 h-10 ${colorClass} rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer`;

  mole.addEventListener('click', () => {
    mole.remove();

    const pointTag = document.getElementById('point');
    const timerTag = document.getElementById('timer');
    if (pointTag && timerTag) {
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
      timerTag.innerText = currentTime.toString();
    }
  });

  holes[randomIndex].appendChild(mole);

  setTimeout(() => {
    mole.remove();
  }, 1500); // 두더지 머무는 시간 (고정 또는 점수 기반으로 조정 가능)

  // ✅ 다음 두더지 등장 시간 계산
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
