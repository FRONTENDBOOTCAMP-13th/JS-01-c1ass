let draggedElement: HTMLElement | null = null;

const container = document.getElementById('widget-container');
const getBlankWidgets = () => document.querySelectorAll('.blank-widget');

// 빈 위젯 스타일 적용 함수
function applyBlankWidgetStyle(el: HTMLElement) {
  el.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
  el.classList.add('backdrop-blur-sm', 'border-2', 'border-blue-300', 'transition-colors', 'duration-300');
}

// 빈 위젯 스타일 초기화 함수
function clearBlankWidgetStyle(el: HTMLElement) {
  el.style.backgroundColor = '';
  el.classList.remove('backdrop-blur-sm', 'border-2', 'border-dashed', 'border-blue-300', 'transition-colors', 'duration-300');
}

if (container) {
  container.addEventListener('dragstart', (e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (!target || !target.draggable) return;

    draggedElement = target;

    // 드래그 대상 강조 스타일
    target.classList.add('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110', 'transition-transform', 'duration-300');

    // 빈 위젯 스타일 적용
    getBlankWidgets().forEach(w => applyBlankWidgetStyle(w as HTMLElement));
  });

  container.addEventListener('dragend', () => {
    if (draggedElement) {
      // 드래그 대상 강조 스타일 제거
      draggedElement.classList.remove('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110', 'transition-transform', 'duration-300');
    }

    // 빈 위젯 스타일 초기화
    getBlankWidgets().forEach(w => clearBlankWidgetStyle(w as HTMLElement));
  });

  container.addEventListener('dragover', (e: DragEvent) => {
    e.preventDefault(); // 드롭 허용
  });

  container.addEventListener('drop', (e: DragEvent) => {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const dropTarget = target.closest('.blank-widget') as HTMLElement;

    if (!draggedElement || !dropTarget || draggedElement === dropTarget) return;

    // 드롭 전 강조 스타일 제거 (애니메이션 전용)
    draggedElement.classList.remove('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110');

    // 드롭 애니메이션 추가
    draggedElement.classList.add('drop-animation');
    dropTarget.classList.add('drop-animation');

    setTimeout(() => {
      draggedElement?.classList.remove('drop-animation');
      dropTarget.classList.remove('drop-animation');
    }, 300);

    // 요소 복제 및 교체
    const draggedClone = draggedElement.cloneNode(true) as HTMLElement;
    const dropClone = dropTarget.cloneNode(true) as HTMLElement;

    // 드래그 가능 속성 유지
    if (draggedClone.classList.contains('clock-widget-component')) {
      draggedClone.setAttribute('draggable', 'true');
    }

    // blank-widget 클래스 관리
    if (dropTarget.classList.contains('blank-widget')) draggedClone.classList.add('blank-widget');
    if (draggedElement.classList.contains('blank-widget')) dropClone.classList.add('blank-widget');

    // 강조 스타일 제거
    draggedClone.classList.remove('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110');
    dropClone.classList.remove('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110');

    // DOM 교체
    container.replaceChild(draggedClone, dropTarget);
    container.replaceChild(dropClone, draggedElement);

    // 빈 위젯 스타일 초기화
    getBlankWidgets().forEach(w => clearBlankWidgetStyle(w as HTMLElement));

    draggedElement = null;
  });
}
