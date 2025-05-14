import { showMole } from './doodi-mole';

// 타이머
export let time = 30;
let timerInterval: number;
export let gameActive = true;
export function addTime(value: number) {
  time += value;
}
export function minusTime(value: number) {
  time -= value;
}

function startTimer() {
  const timerTag = document.getElementById('timer');
  timerTag!.innerText = time.toString();

  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      gameActive = false;
      return;
    }

    time--;
    timerTag!.innerText = time.toString();
  }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
  startTimer();
  showMole();
});
