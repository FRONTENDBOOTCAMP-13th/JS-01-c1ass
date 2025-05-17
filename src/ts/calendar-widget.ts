const days: string[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function updateDateInfo() {
  const now: Date = new Date();
  const dayName: string = days[now.getDay()];
  const dayNumber: number = now.getDate();

  document.querySelectorAll('.day-name').forEach(element => {
    element.textContent = dayName;
  });
  document.querySelectorAll('.day-number').forEach(element => {
    element.textContent = `${dayNumber}`;
  });
}

updateDateInfo();

// 1분마다 체크 -> 날짜가 바뀌면 업데이트
let lastDay = new Date().getDate();

setInterval(() => {
  const currentDay = new Date().getDate();
  if (currentDay !== lastDay) {
    lastDay = currentDay;
    updateDateInfo(); // 날짜가 바뀌었을 때
  }
}, 60 * 1000); // 1분마다 체크
