// import { default as size_arr } from './mac-screen-size.ts';
import { iconBar } from './icon-bar.ts';
import { insertIcon } from './mac-panel-manager.ts';
// import { insertWidget } from './mac-panel-manager.ts';
import { programIDSet, programID } from '../programID.ts';
// import { widgetIDSet, widgetID } from '../programID.ts';
// import { widgetManager } from './widget-manager.ts';
// import { panelContainer } from './mac-panel-container.ts';

// const body = document.querySelector('body');
// const screen_overlay = document.querySelector('#screen-overlay');
// const mac = document.querySelector('.mac') as HTMLDivElement;
// const mac_screen = document.querySelector('.mac-screen') as HTMLDivElement;
// const mac_bottom = document.querySelector('.mac-bottom') as HTMLDivElement;
// const blank_widget_arr = document.querySelectorAll('.blank-widget');
// // const icon_bar = document.querySelector('#icon-bar');
// const icon_color_arr = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E3BAFF', '#FFCCE5', '#CCE5FF', '#D5FFCC', '#FFF0BA', '#FFCBA4', '#CBA4FF'];

// let iconCounter = 0;
// let widgetCounter = 0;

setInitIcon();
iconBar.insertAddIconBtn();
// setInitWidget();
// addSelect();
// paintBlankWidgets();
// addBlankWidgetToggle();
// paintIconColorful();
// addBodyDragToggle();
// addCreateIconBtn();
// addRemoveIconBtn();
// hiddenScreenOverlay();

// body?.addEventListener('click', showID);

// function hiddenScreenOverlay() {
//   const btn = document.createElement('button');
//   btn.style.position = 'absolute';
//   btn.style.top = '210px';
//   btn.style.left = '10px';
//   btn.style.border = '1px solid black';
//   btn.style.paddingInline = '4px';
//   btn.style.borderRadius = '8px';
//   btn.style.backgroundColor = '#d9d9d9';
//   btn.setAttribute('type', 'button');
//   btn.textContent = '맥 커버 제거';

//   body?.insertBefore(btn, body.firstChild);
//   btn.addEventListener('click', () => {
//     if (screen_overlay!.classList.contains('hidden')) {
//       screen_overlay!.classList.remove('hidden');
//       btn.textContent = '맥 커버 추가';
//     } else {
//       screen_overlay!.classList.add('hidden');
//       btn.textContent = '맥 커버 제거';
//     }
//   });
// }

function setInitIcon() {
  programID.forEach((_, i) => {
    if (programIDSet.has(programID[i].pid)) {
      // iconCounter++;
      const tmpicon = iconBar.createIcon(0, programID[i].pid);
      insertIcon(tmpicon);
    }
  });
}

// function setInitWidget() {
//   widgetID.forEach((_, i) => {
//     if (widgetIDSet.has(widgetID[i].wid)) {
//       widgetCounter++;
//       console.log(widgetCounter);
//       const tmpWidget = widgetManager.createWidget(widgetID[i].wid);
//       insertWidget(tmpWidget);
//     }
//   });
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function showID() {
//   const iconarr = document.querySelectorAll('.icon');
//   iconarr.forEach(e => {
//     e.textContent = (e as HTMLLIElement).dataset.id!;
//   });

//   const panelarr = document.querySelectorAll('.mac-panel');
//   panelarr.forEach(e => {
//     const content = e.querySelector('.mac-panel-program');
//     content!.textContent = (e as HTMLDivElement).dataset.id!;
//   });
// }
// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
//   // openModal();
// });
// function addSelect() {
//   const select = document.createElement('select');
//   select.classList.add('mac-screen-size');
//   select.style.position = 'absolute';
//   select.style.top = '10px';
//   select.style.left = '10px';
//   select.style.border = '1px solid black';
//   size_arr.forEach((e: number[], i: number) => {
//     const option = document.createElement('option');
//     if (e[0] === 1200) {
//       option.setAttribute('selected', 'true');
//       mac_bottom.style.height = (Math.sqrt(size_arr[i][0]) * 3).toString() + 'px';
//     }
//     const str = `${e[0]}px ${e[1]}px`;
//     option.setAttribute('value', `${i}`);
//     option.textContent = str;
//     select.appendChild(option);
//   });
//   body?.insertBefore(select, mac as HTMLDivElement);
//   select.addEventListener('change', (e: Event) => {
//     const target = e.target as HTMLSelectElement;
//     const selectedIndex = target.value;
//     const index = parseInt(selectedIndex);

//     mac_screen.style.width = size_arr[index][0].toString() + 'px';
//     mac_screen.style.height = size_arr[index][1].toString() + 'px';
//     body!.style.gridTemplateColumns = `1fr calc(${size_arr[index][0].toString()}px + 80px) 1fr`;
//     mac_bottom.style.height = (Math.sqrt(size_arr[index][0]) * 3).toString() + 'px';
//   });
// }

// function paintBlankWidgets() {
//   Array.from(blank_widget_arr).forEach(e => {
//     (e as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
//   });
// }

// function addBlankWidgetToggle() {
//   const btn = document.createElement('button');
//   btn.style.position = 'absolute';
//   btn.style.top = '50px';
//   btn.style.left = '10px';
//   btn.style.border = '1px solid black';
//   btn.style.paddingInline = '4px';
//   btn.style.borderRadius = '8px';
//   btn.style.backgroundColor = '#d9d9d9';
//   btn.setAttribute('type', 'button');
//   btn.textContent = '그리드 격자 제거';

//   body?.insertBefore(btn, body.firstChild);
//   btn.addEventListener('click', () => {
//     Array.from(blank_widget_arr).forEach(e => {
//       if ((e as HTMLDivElement).style.backgroundColor) {
//         (e as HTMLDivElement).style.backgroundColor = '';
//         btn.textContent = '그리드 격자 추가';
//       } else {
//         (e as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
//         btn.textContent = '그리드 격자 제거';
//       }
//     });
//   });
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function paintIconColorful() {
//   const icon_arr = icon_bar!.querySelectorAll('.icon');
//   Array.from(icon_arr).forEach((e, i) => {
//     (e as HTMLLIElement).style.backgroundColor = icon_color_arr[i];
//   });
// }

// function addBodyDragToggle() {
//   const btn = document.createElement('button');
//   btn.style.position = 'absolute';
//   btn.style.top = '90px';
//   btn.style.left = '10px';
//   btn.style.border = '1px solid black';
//   btn.style.paddingInline = '4px';
//   btn.style.borderRadius = '8px';
//   btn.style.backgroundColor = '#d9d9d9';
//   btn.setAttribute('type', 'button');
//   btn.textContent = '드래그 기능 추가';

//   body?.insertBefore(btn, body.firstChild);
//   btn.addEventListener('click', () => {
//     if (body?.classList.contains('select-none')) {
//       body!.classList.remove('select-none');
//       btn.textContent = '드래그 기능 제거';
//     } else {
//       body!.classList.add('select-none');
//       btn.textContent = '드래그 기능 추가';
//     }
//   });
// }

// function addCreateIconBtn() {
//   const btn = document.createElement('button');
//   btn.style.position = 'absolute';
//   btn.style.top = '130px';
//   btn.style.left = '10px';
//   btn.style.border = '1px solid black';
//   btn.style.paddingInline = '4px';
//   btn.style.borderRadius = '8px';
//   btn.style.backgroundColor = '#d9d9d9';
//   btn.setAttribute('type', 'button');
//   btn.textContent = '아이콘 추가';

//   body?.insertBefore(btn, body.firstChild);
//   btn.addEventListener('click', () => {
//     iconCounter++;
//     const tmpicon = iconBar.createIcon(0, iconCounter.toString());
//     insertIcon(tmpicon);
//     (tmpicon as HTMLElement).style.backgroundColor = icon_color_arr[(iconCounter - 1) % icon_color_arr.length];
//   });
// }

// function addRemoveIconBtn() {
//   const btn = document.createElement('button');
//   btn.style.position = 'absolute';
//   btn.style.top = '170px';
//   btn.style.left = '10px';
//   btn.style.border = '1px solid black';
//   btn.style.paddingInline = '4px';
//   btn.style.borderRadius = '8px';
//   btn.style.backgroundColor = '#d9d9d9';
//   btn.setAttribute('type', 'button');
//   btn.textContent = '아이콘 삭제';

//   body?.insertBefore(btn, body.firstChild);
//   btn.addEventListener('click', () => {
//     if (iconCounter > 0) {
//       iconBar.removeIcon(iconCounter.toString());
//       iconCounter--;
//     }
//   });
// }

const postIt = document.getElementById('clickablePostIt') as HTMLDivElement | null;

if (postIt) {
  // const stepsGroup: string[][] = [
  //   ['1. 기본 마크업 및 스타일링 구현', '2. 맥패널과 호환되게 마크업 및 스타일링 구현', '3. 게임시작 버튼 클릭 시 게임이 시작되도록 구현', '4. 키보드 WASD 또는 방향키로 플레이어를 조종할 수 있도록 구현', '5. 화살(게임오버 요소)에 플레이어가 닿으면 게임오버가 되도록 구현', '6. 화살(게임오버 요소)가 화면 밖으로 나가면 득점, 이후 난이도가 증가되는 함수 구현', '7. 게임 오버 시 최종점수가 출력되고 다시 시작 버튼이 출력되게 구현', '8. 다시 시작 버튼 클릭 시 게임이 재 실행되도록 구현'],
  //   ['1. 기본 마크업 및 스타일링 구현', '2. 맥패널과 호환되게 마크업 및 스타일링 구현', '3. 관련 assets 추가', '4. START 버튼 클릭 시 대화창으로 이동되도록 구현, 이후 대화창에서 Next 버튼 클릭 시 게임화면으로 이동되도록 구현', '5. 게임화면 진입 시 시간감소 함수 실행, 화면 우측에 프로그래스 바로 확인 가능하도록 구현', '6. 점수를 확인 할 수 있는 html 요소 구현', '7. 두디(실점 요소)를 클릭 시 점수 -100, 두카(득점 요소)를 클릭 시 점수 +100을 계산 하는 함수 구현', '8. 시간종료 후 최종 점수, 리플레이, 홈 버튼 구현', '9. 리플레이 버튼 클릭 시 게임이 재 실행되도록 구현', '10. 홈 버튼 클릭 시 시작화면으로 이동되도록 구현'],
  //   ['1. 기본 마크업 및 스타일링 구현', '2. 맥패널과 호환되게 마크업 및 스타일링 구현', '3. 관련 assets 추가', '4. 뽑기권 획득 버튼 클릭 시 뽑기권이 늘어나는 기능 구현', '5. 로컬스토리지를 활용해 뽑기권 값이 유지되도록 구현', '6. 컬렉션 보기 버튼 클릭 시 컬렉션 모달창 출력 기능구현', '7. 컬렉션은 로컬스토리지를 활용하여 저장되게 구현', '8. 랜덤뽑기 버튼 클릭 시 카드가 5장 출력 되도록 구현', '9. 카드 5장 출력 시 초기 이미지는 카드 뒷면, 클릭 시 카드의 앞면이 나오도록 구현', '10. 특정카드가 나올 시 audio와 함께 출력'],
  // ];
  const stepsGroup: string[][] = [
    ['1. 맥의 전원 기능을 로고 클릭으로 구현', '2. 스탠드 클릭으로 라이트/다크 모드 전환', '3. contextmenu를 커스텀하여 배경화면 변경', '4. 로컬 스토리지를 이용한 메모', '5. 위젯 호버/드래그&드롭 기능 구현', '6. 인터버로 구현한 스톱워치/타이머', '7. id/url 구성의 객체로 아이콘 생성', '8. 고유 id로 아이콘-맥패널 1:1 매칭', '9. iframe을 이용한 맥패널 내부 html'],
    ['1. 페이지 로딩 화면 동안 리소스 병렬 로드', '2. promise 객체를 이용하여 프리로드 시간 단축', '3. 종이가 펼쳐지는 4단계 애니메이션', '4. 보여준 양말을 배열에 담아서 중복 방지', '5. 배열이 양말 총 개수와 같으면 초기화'],
    ['1. 맥 패널과 호환되는 반응형 구현', '2. 텍스트 출력에 타이핑 효과 적용', '3. 게임화면 진입 시 제한 시간 감소 함수 실행', '4. 제한 시간 감소 시각화', '5. 무작위 위치에 고정 확률로 두디/두카 생성', '6. 중복 위치 생성 불가 기능 구현', '7. 클릭 대상에 따른 점수 증감 함수 구현', '8. 클릭 대상 애니메이션 및 효과음', '9. 최종 점수, 리플레이 및 홈 버튼 동작 구현'],
    ['1. 뽑기권 획득 클릭 시 count 감소', '1-1. count가 0일 때 클릭 시 10으로 초기화', '1-2. count가 0일 때 클릭 시 뽑기권 1 증가', '2. 랜덤 뽑기 클릭 시 랜덤 카드 5장 출력', '3. N:70%, R:15%, SR:10%, SSR:5% 확률 구조 설계', '4. 카드 클릭 시 효과음 및 이미지 변경 애니메이션', '5. 특정 카드의 고유 효과음 기능', '6. 컬렉션 보기 클릭 시 최신순으로 모달창에 출력', '7. count, 뽑기권, 컬렉션을 로컬스토리지에 저장'],
    ['1. Canvas API로 애니메이션 및 충돌 기반 회피 게임', '2. 8방향 이동 및 대각선 속도 보정', '3. 랜덤 위치, 방향의 발사체 생성', '4. AABB(Axis-Aligned Bounding Box) 충돌 검사 알고리즘', '5. 점수 기반 난이도 상승', '6. requestAnimationFrame 메소드로 최적화 게임 루프', '7. 상태 추적 객체로 UI 제어'],
    ['1. 닫기, 최소화, 최대화 구현', '2. 사용자 이름 로컬스토리지에 저장', '3. 맥 시작 화면에 사용자 이름 출력', '4. fullcalendar 라이브러리를 이용하여 달력 구현', '5. Open Weather API를 이용하여 날씨 위젯 구현', '6. 메모 추가 및 수정'],
  ];

  const POSTIT_INITIAL_WIDTH = 150;
  const POSTIT_INITIAL_HEIGHT = 150;

  let currentGroupIndex = 0;
  let currentStepIndex = 0;
  let isEnlarged = false;

  const setContent = (html: string) => {
    postIt.innerHTML = html;
  };

  const enlargePostIt = () => {
    const parent = postIt.parentElement;
    if (!parent) return;

    const newWidth = 300; // 확대 크기
    const newHeight = 600;
    postIt.style.width = `${newWidth}px`;
    postIt.style.height = `${newHeight}px`;
    postIt.style.position = 'fixed';
    postIt.style.right = '0.5%';
    postIt.style.top = '70%';
    postIt.style.left = '';
    postIt.style.transform = 'translateY(-50%)';
    postIt.style.zIndex = '20';
    postIt.style.transition = 'all 0.3s ease';

    isEnlarged = true;
  };

  const shrinkPostIt = () => {
    postIt.style.width = `${POSTIT_INITIAL_WIDTH}px`;
    postIt.style.height = `${POSTIT_INITIAL_HEIGHT}px`;
    postIt.style.left = '';
    postIt.style.top = '57%';
    postIt.style.right = '5%';
    postIt.style.transform = 'translateY(-50%)';
    postIt.style.position = 'fixed';
    postIt.style.zIndex = '10';

    isEnlarged = false;
    currentGroupIndex = 0;
    currentStepIndex = 0;
    setContent('<p class="m-0"></p>');
  };

  const showNextStep = () => {
    if (!isEnlarged) {
      enlargePostIt();
      if (currentStepIndex === 0 && currentGroupIndex < stepsGroup.length) {
        setContent(`<p class="m-0 py-2 text-center text-gray-600"> mec1 </p>`);
        return;
      }
    }

    if (currentGroupIndex >= stepsGroup.length) {
      setContent('<p class="text-center">모든 그룹 완료! (클릭: 축소 / F2: 처음부터)</p>');
      currentGroupIndex = 0;
      currentStepIndex = 0;
      return;
    }

    const currentGroup = stepsGroup[currentGroupIndex];
    if (currentStepIndex < currentGroup.length) {
      const stepHtml = currentGroup
        .slice(0, currentStepIndex + 1)
        .map(text => `<p class="m-0 py-[2px]">${text}</p>`)
        .join('');
      setContent(stepHtml);
      currentStepIndex++;
    } else {
      currentGroupIndex++;
      currentStepIndex = 0;

      if (currentGroupIndex === 1) {
        setContent(`<p class="m-0 py-2 text-center text-gray-600"> sockast </p>`);
      } else if (currentGroupIndex === 2) {
        setContent(`<p class="m-0 py-2 text-center text-gray-600"> doodi </p>`);
      } else if (currentGroupIndex === 3) {
        setContent(`<p class="m-0 py-2 text-center text-gray-600"> card </p>`);
      } else if (currentGroupIndex === 4) {
        setContent(`<p class="m-0 py-2 text-center text-gray-600"> arrow-dodge </p>`);
      } else if (currentGroupIndex === 5) {
        setContent(`<p class="m-0 py-2 text-center text-gray-600"> mec2 </p>`);
      } else {
        setContent('<p class="text-center">모든 그룹 완료! (클릭: 축소 / F2: 처음부터)</p>');
        currentGroupIndex = 0;
      }
    }
  };

  postIt.addEventListener('click', () => {
    if (!isEnlarged) {
      enlargePostIt();
      setContent(`<p class="m-0 py-2 text-center text-gray-600"> mec1 </p>`);
    } else {
      shrinkPostIt();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'F2') {
      e.preventDefault();
      showNextStep();
    }
  });
}
