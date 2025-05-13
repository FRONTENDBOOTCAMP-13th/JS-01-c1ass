// new Date() - 날짜, 요일명 가져옴
const days: string[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const today: Date = new Date();
const dayName: string = days[today.getDay()];
const dayNumber: number = today.getDate();

// 가져온 날짜, 요일명으로 텍스트 초기화
document.querySelectorAll('.day-name').forEach(element => {
  element.textContent = dayName;
});
document.querySelectorAll('.day-number').forEach(element => {
  element.textContent = `${dayNumber}`;
});
