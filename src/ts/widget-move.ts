let draggedElement: HTMLElement | null = null;
const dragStartOffset = { x: 0, y: 0, colOffset: 0, rowOffset: 0 }; // 드래그 시작 위치의 오프셋
const container = document.getElementById('widget-container');

// 현재 위치를 읽는 함수
function getCurrentPosition(element: HTMLElement): { col: number; row: number } {
  const gridColumnStart = element.style.gridColumnStart || '';
  const gridRowStart = element.style.gridRowStart || '';

  const col = parseInt(gridColumnStart.split(' ')[0]) || 1;
  const row = parseInt(gridRowStart.split(' ')[0]) || 1;

  return { col, row };
}

// 위치 업데이트 함수
function updateWidgetPosition(element: HTMLElement, col: number, row: number) {
  const colSpan = element.dataset.col || '1';
  const rowSpan = element.dataset.row || '1';

  if (!container) return;

  // 2칸짜리 위젯에 대해서만 처리
  if (colSpan === '2') {
    const widgetWidth = parseInt(colSpan) * (container.getBoundingClientRect().width / 9);
    const isGrabbedRight = dragStartOffset.x > widgetWidth / 2;
    if (!isGrabbedRight) {
      // 왼쪽을 잡은 경우: 오른쪽 끝에 놓을 때만 1을 뺌
      const isAtRightEdge = col > 10 - parseInt(colSpan);
      if (isAtRightEdge) {
        col = col - 1;
      }
    } else {
      // 오른쪽을 잡은 경우: col이 1이 아닐 때만 1을 빼서 조정
      if (col > 1) {
        col = col - 1;
      }
    }
  }

  // 명시적으로 span 설정
  element.style.gridColumnStart = `${col}`;
  element.style.gridColumnEnd = `span ${colSpan}`;
  element.style.gridRowStart = `${row}`;
  element.style.gridRowEnd = `span ${rowSpan}`;
}

// 그리드 셀 위치 계산 (오프셋 고려)
function getGridPosition(e: DragEvent): { col: number; row: number } | null {
  if (!container || !draggedElement) return null;
  const rect = container.getBoundingClientRect();

  // 위젯의 크기 계산
  const rowSpan = parseInt(draggedElement.dataset.row || '1');

  // 마우스의 절대 위치에서 컨테이너의 위치를 빼서 상대 위치 계산
  const relativeX = e.clientX - rect.left;
  const relativeY = e.clientY - rect.top;

  // 전체 너비/높이를 grid 칸 수로 나누어 각 칸의 전체 크기 계산
  const totalCellWidth = rect.width / 9; // 전체 너비를 9등분
  const totalCellHeight = rect.height / 4; // 전체 높이를 4등분

  // 위치 계산
  let col = Math.floor(relativeX / totalCellWidth) + 1;
  let row = Math.floor(relativeY / totalCellHeight) + 1;

  // 경계 검사 - 항상 9까지만 허용
  col = Math.max(1, Math.min(col, 9));
  row = Math.max(1, Math.min(row, 4 - rowSpan + 1));

  return { col, row };
}

// 위젯 교환 함수
function swapWidgets(widget1: HTMLElement, pos1: { col: number; row: number }, widget2: HTMLElement, pos2: { col: number; row: number }) {
  updateWidgetPosition(widget1, pos2.col, pos2.row);
  updateWidgetPosition(widget2, pos1.col, pos1.row);
}

if (container) {
  container.addEventListener('dragstart', (e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (!target || !target.draggable) return;

    draggedElement = target; // 드래그 시작 위치의 오프셋 계산
    const rect = container.getBoundingClientRect();
    const totalGapWidth = 20 * 8; // 8개의 gap
    const totalGapHeight = 20 * 3; // 3개의 gap
    const cellWidth = (rect.width - totalGapWidth) / 9;
    const cellHeight = (rect.height - totalGapHeight) / 4;

    // 위젯 내에서의 클릭 위치 계산
    const widgetRect = target.getBoundingClientRect();
    dragStartOffset.x = e.clientX - widgetRect.left;
    dragStartOffset.y = e.clientY - widgetRect.top;

    // 클릭 위치의 그리드 셀 내 상대 위치를 계산
    dragStartOffset.colOffset = (dragStartOffset.x % cellWidth) / cellWidth;
    dragStartOffset.rowOffset = (dragStartOffset.y % cellHeight) / cellHeight;

    draggedElement.classList.add('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110');
  });

  container.addEventListener('dragend', () => {
    if (draggedElement) {
      draggedElement.classList.remove('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110');
    }
  });

  container.addEventListener('dragover', (e: DragEvent) => {
    e.preventDefault();
    if (!draggedElement) return;

    // const position = getGridPosition(e);
    // if (position) {
    //   // 현재 드래그 중인 위치 표시 가능
    //   // console.log(`Grid position: ${position.col}, ${position.row}`);
    // }
  });

  container.addEventListener('drop', (e: DragEvent) => {
    e.preventDefault();
    if (!draggedElement) return;

    const position = getGridPosition(e);
    if (!position) {
      draggedElement.classList.remove('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110');
      draggedElement = null;
      return;
    }

    const targetWidget = [...container.children].find(child => {
      const el = child as HTMLElement;
      const currentPos = getCurrentPosition(el);
      return currentPos.col === position.col && currentPos.row === position.row && el !== draggedElement;
    }) as HTMLElement;

    const draggedPos = getCurrentPosition(draggedElement);

    if (targetWidget) {
      // 위젯 교환
      swapWidgets(draggedElement, draggedPos, targetWidget, position);

      // 드롭 애니메이션
      draggedElement.classList.add('drop-animation');
      targetWidget.classList.add('drop-animation');
      setTimeout(() => {
        draggedElement?.classList.remove('drop-animation');
        targetWidget.classList.remove('drop-animation');
      }, 300);
    } else {
      // 빈 공간으로 이동
      updateWidgetPosition(draggedElement, position.col, position.row);
      draggedElement.classList.add('drop-animation');
      setTimeout(() => {
        draggedElement?.classList.remove('drop-animation');
      }, 300);
    }

    draggedElement.classList.remove('ring-4', 'ring-blue-500', 'scale-110', 'shadow-lg', 'brightness-110');
    draggedElement = null;
  });

  // 초기화: 모든 드래그 가능한 위젯에 그리드 위치 정보 설정
  const widgets = container.querySelectorAll('[draggable="true"]');
  widgets.forEach((widget, index) => {
    const el = widget as HTMLElement;
    // 초기 위치 설정 (1행에 3개씩 배치)
    const col = (index % 3) + 1;
    const row = Math.floor(index / 3) + 1;

    // 초기 grid position 적용
    updateWidgetPosition(el, col, row);
  });
}
