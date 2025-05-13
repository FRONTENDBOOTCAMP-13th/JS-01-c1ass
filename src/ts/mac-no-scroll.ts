const no_scroll_element = document.querySelector('.no-scroll');
function preventScroll(e: Event) {
  e.preventDefault();
}
no_scroll_element!.addEventListener('wheel', preventScroll, { passive: false });
