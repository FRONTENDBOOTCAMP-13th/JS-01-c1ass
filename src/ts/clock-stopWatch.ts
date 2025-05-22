export function makeStopwatch(): HTMLDivElement {
  // stopwatch 기능을 담고 있는 div를 반환하면 패널로 들어감
  const existing = document.querySelector('.stopwatch-wrapper');
  if (existing) return existing as HTMLDivElement;

  const wrapper = document.createElement('div');
  wrapper.className = 'stopwatch-wrapper flex flex-col items-center text-center justify-center space-y-5';

  const timeDisplay = document.createElement('div');
  timeDisplay.className = 'flex flex-row items-center justify-center text-6xl font-semibold mt-5';
  const timeHours = document.createElement('p');
  timeHours.className = 'inline-block w-[93px] text-center';
  timeHours.textContent = '00';
  const colon = document.createElement('p');
  colon.textContent = ':';
  const timeMinutes = document.createElement('p');
  timeMinutes.className = 'inline-block w-[93px] text-center';
  timeMinutes.textContent = '00';
  const colon2 = document.createElement('p');
  colon2.textContent = ':';
  const timeSeconds = document.createElement('p');
  timeSeconds.className = 'inline-block w-[93px] text-center';
  timeSeconds.textContent = '00';
  const dot = document.createElement('p');
  dot.textContent = '.';
  const timeCenti = document.createElement('p');
  timeCenti.className = 'inline-block w-[93px] text-center';
  timeCenti.textContent = '00';

  timeDisplay.appendChild(timeHours);
  timeDisplay.appendChild(colon);
  timeDisplay.appendChild(timeMinutes);
  timeDisplay.appendChild(colon2);
  timeDisplay.appendChild(timeSeconds);
  timeDisplay.appendChild(dot);
  timeDisplay.appendChild(timeCenti);

  let intervalId: number | null = null;
  let startTime = 0;
  let elapsed = 0;
  let isRunning = false;

  function updateDisplay(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    timeHours.textContent = `${hours}`;
    timeMinutes.textContent = `${minutes}`;
    timeSeconds.textContent = `${seconds}`;
    timeCenti.textContent = `${centiseconds}`;
  }

  const startBtn = document.createElement('button');
  startBtn.textContent = '시작';
  startBtn.className = 'inline-block w-[60px] py-1 rounded bg-white/60 hover:bg-gray-500/60 text-black hover:text-white';

  const resetBtn = document.createElement('button');
  resetBtn.textContent = '초기화';
  resetBtn.className = 'inline-block w-[60px] py-1 rounded bg-red-400/60 hover:bg-red-500/60 text-white';

  const recordBtn = document.createElement('button');
  recordBtn.textContent = '기록';
  recordBtn.className = 'inline-block w-[60px] py-1 rounded bg-blue-400/60 hover:bg-blue-500/60 text-white';

  resetBtn.style.display = 'none';
  recordBtn.style.display = 'none';

  const btnGroup = document.createElement('div');
  btnGroup.className = 'flex gap-6 justify-center';
  btnGroup.append(startBtn, recordBtn, resetBtn);

  const recordList = document.createElement('ul');
  recordList.className = 'mt-6 mx-30 text-xl font-medium text-gray-500 dark:text-white divide-y divide-white border-t border-white overflow-y-auto h-[122px]';

  startBtn.addEventListener('click', () => {
    if (!isRunning) {
      isRunning = true;
      startBtn.textContent = '정지';
      startBtn.classList.replace('bg-white/60', 'bg-black/60');
      startBtn.classList.replace('hover:bg-black/60', 'hover:bg-white/60');
      startBtn.classList.replace('text-black', 'text-white');
      startBtn.classList.replace('hover:text-white', 'hover:text-black');

      // run 중엔 기록 버튼만 보이기
      recordBtn.style.display = '';
      resetBtn.style.display = 'none';

      startTime = Date.now() - elapsed;
      intervalId = window.setInterval(() => {
        elapsed = Date.now() - startTime;
        updateDisplay(elapsed);
      }, 10);
    } else {
      // ⏸ 멈춤 → ▶ 시작
      isRunning = false;
      startBtn.textContent = '시작';
      startBtn.classList.replace('bg-black/60', 'bg-white/60');
      startBtn.classList.replace('hover:bg-white/60', 'hover:bg-black/60');
      startBtn.classList.replace('text-white', 'text-black');
      startBtn.classList.replace('hover:text-black', 'hover:text-white');
      if (intervalId) clearInterval(intervalId);

      // 멈춘 후엔 초기화 버튼만 보이기
      recordBtn.style.display = 'none';
      resetBtn.style.display = '';
    }
  });

  // reset 버튼 로직 (멈춘 후에만 보임)
  resetBtn.addEventListener('click', () => {
    isRunning = false;
    if (intervalId) clearInterval(intervalId);
    elapsed = 0;
    updateDisplay(0);

    // 리셋 후엔 완전 초기 상태로
    startBtn.textContent = '시작';
    startBtn.classList.replace('bg-black/60', 'bg-white/60');
    startBtn.classList.replace('hover:bg-white/60', 'hover:bg-black/60');
    startBtn.classList.replace('text-white', 'text-black');
    startBtn.classList.replace('hover:text-black', 'hover:text-white');
    recordBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    recordList.innerHTML = '';
  });

  // 기록 버튼 로직
  recordBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.className = 'py-1.5';
    const totalSeconds = Math.floor(elapsed / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const centiseconds = String(Math.floor((elapsed % 1000) / 10)).padStart(2, '0');
    li.textContent = `${hours}:${minutes}:${seconds}.${centiseconds}`;
    recordList.appendChild(li);
  });

  wrapper.appendChild(timeDisplay);
  wrapper.appendChild(btnGroup);
  wrapper.appendChild(recordList);

  // 기본적으로 숨김 처리 (라디오 선택 시만 표시)
  wrapper.style.display = 'none';

  return wrapper;
}
