const days: string[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

// 날짜 정보 갱신 함수
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

// 다음 갱신까지의 시간 계산 (다음 자정까지)
function nextMidnightUpdate() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1); // 내일로 날짜 이동
  tomorrow.setHours(0, 0, 0, 0); // 00:00:00.000 자정 정렬

  // 다음 자정까지의 시간 계산
  const delay = tomorrow.getTime() - now.getTime();

  setTimeout(() => {
    updateDateInfo();
    nextMidnightUpdate(); // 다시 다음 자정을 예약
  }, delay);
}

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
  updateDateInfo(); // 현재 날짜 표시
  nextMidnightUpdate(); // 자정 갱신 예약
});
