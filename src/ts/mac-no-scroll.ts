const no_scroll_element = document.querySelector('.no-scroll');

function preventScroll(e: Event) {
  // 스크롤을 허용할 요소인지 확인
  const isScrollableElement = (e.target as HTMLElement).closest('.allow-scroll');

  if (!isScrollableElement) {
    e.preventDefault();
  }
}

no_scroll_element!.addEventListener('wheel', preventScroll, { passive: false });
