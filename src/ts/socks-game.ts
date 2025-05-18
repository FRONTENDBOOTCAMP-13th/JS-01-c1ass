function showDrawElement() {
  const drawElement = document.getElementById('draw');
  if (!drawElement) return;

  if (drawElement.classList.contains('hidden')) {
    drawElement.classList.remove('hidden');
  }
}

// 버튼에 함수 연결
const button = document.querySelector('button');
button?.addEventListener('click', showDrawElement);
