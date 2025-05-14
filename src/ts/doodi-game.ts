// video 2배속 재생
const video = document.getElementById('myVideo') as HTMLVideoElement | null;
if (video) {
  video.playbackRate = 2.0;
}

// // 화면 바꾸기 함수
// function hideParentElement(event: Event): void {
//   const target = event.target as HTMLElement;

//   // 버튼 → img 태그일 수 있으므로, button까지 탐색
//   const button = target.closest('button');
//   if (!button) return;

//   const cover = document.getElementById('cover');
//   const intro = document.getElementById('game');
//   if (cover) {
//     cover.classList.add('hidden'); // Tailwind의 hidden 클래스
//   }
//   if (intro) {
//     intro.classList.remove('hidden');
//   }
// }

// // 버튼과 화면 바꾸기 함수 연결
// const startButton = document.getElementById('start');
// if (startButton) {
//   startButton.addEventListener('click', hideParentElement);
// }

// 모든 화면 div 가져오기
const screens = document.querySelectorAll<HTMLElement>('.screen');

// 현재 화면 인덱스
let currentIndex = 0;

// 화면 전환 함수
function showScreen(index: number): void {
  screens.forEach((screen, i) => {
    screen.classList.toggle('hidden', i !== index);
  });
}

// 버튼 클릭 핸들러
function handleNavigation(event: Event): void {
  const target = event.target as HTMLElement;
  const button = target.closest('button');
  if (!button) return;

  if (button.classList.contains('before') && currentIndex > 0) {
    currentIndex--;
  } else if (button.classList.contains('after') && currentIndex < screens.length - 1) {
    currentIndex++;
  }

  showScreen(currentIndex);
}

// 모든 before/after 버튼에 이벤트 연결
document.querySelectorAll<HTMLButtonElement>('.before, .after').forEach(button => {
  button.addEventListener('click', handleNavigation);
});

// 시작 시 첫 화면만 보이게
showScreen(currentIndex);
