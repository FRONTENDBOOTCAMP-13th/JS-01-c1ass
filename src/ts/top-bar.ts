function getFormattedDate(): string {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, '0'); // 1~12월 두 자리
  const date = String(now.getDate()).padStart(2, '0'); // 일 두 자리

  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = day[now.getDay()];

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const ampm = hours < 12 ? '오전' : '오후';
  hours = hours % 12 || 12; // 0시는 12로 표시

  return `${month}월 ${date}일 (${dayOfWeek}) ${ampm} ${hours}:${minutes}`;
}

function updateTime(): void {
  const dateElements = document.querySelectorAll<HTMLElement>('.current-date');
  const formatted = getFormattedDate();

  dateElements.forEach(el => {
    el.textContent = formatted;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  updateTime(); // 최초 1회 표시
  setInterval(updateTime, 1000); // 1초마다 갱신
});
