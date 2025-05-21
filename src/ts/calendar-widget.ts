const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function updateDateInfo() {
  const now = new Date();
  const dayName = days[now.getDay()];
  const dayNumber = now.getDate();

  document.querySelectorAll('.day-name').forEach(el => (el.textContent = dayName));
  document.querySelectorAll('.day-number').forEach(el => (el.textContent = `${dayNumber}`));
}

// 자정인지 체크하는 헬퍼 함수
function isMidnight(): boolean {
  const now = new Date();
  return now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() < 2;
}

function watchForMidnight() {
  setInterval(() => {
    if (isMidnight()) {
      updateDateInfo();
    }
  }, 1000); // 1초마다 자정 체크
}

document.addEventListener('DOMContentLoaded', () => {
  updateDateInfo();
  watchForMidnight();
});
