// const openMacPanelBtn = document.getElementById('open-mac-panel') as HTMLButtonElement;
// const closeMacPanelBtn = document.getElementById('close-mac-panel') as HTMLButtonElement;
// const fullMacPanelBtn = document.getElementById('full-mac-panel') as HTMLButtonElement;
// const macPanelOverlay = document.getElementById('mac-panel-overlay') as HTMLElement;
// const macPanelContent = document.getElementById('mac-panel-content') as HTMLElement;
// const macPanelHeader = macPanelContent.querySelector('.mac-panel-header') as HTMLElement;

// // 맥패널 열기
// openMacPanelBtn.addEventListener('click', () => {
//   macPanelOverlay.classList.remove('hidden');
//   macPanelContent.style.left = '100px';
//   macPanelContent.style.top = '100px';
//   macPanelContent.style.position = 'fixed';
// });

// // 맥패널 닫기
// closeMacPanelBtn.addEventListener('click', () => {
//   macPanelOverlay.classList.add('hidden');
// });

// // 맥패널 전체화면
// fullMacPanelBtn.addEventListener('click', () => {

// });

// // 드래그 기능
// function makeDraggable(modal: HTMLElement, handle: HTMLElement): void {
//   let isDragging = false;
//   let offsetX = 0;
//   let offsetY = 0;

//   handle.addEventListener('mousedown', (e: MouseEvent) => {
//     isDragging = true;
//     const rect = modal.getBoundingClientRect();
//     offsetX = e.clientX - rect.left;
//     offsetY = e.clientY - rect.top;

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
//   });

//   function onMouseMove(e: MouseEvent) {
//     if (!isDragging) return;
//     modal.style.left = `${e.clientX - offsetX}px`;
//     modal.style.top = `${e.clientY - offsetY}px`;
//   }

//   function onMouseUp() {
//     isDragging = false;
//     document.removeEventListener('mousemove', onMouseMove);
//     document.removeEventListener('mouseup', onMouseUp);
//   }
// }

// makeDraggable(macPanelContent, macPanelHeader);
