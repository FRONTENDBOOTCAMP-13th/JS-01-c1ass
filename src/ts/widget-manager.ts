import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { widgetIDSet } from '../programID';
import { panelContainer } from './mac-panel-container';
import { makeStopwatch } from './clock-stopWatch';

if (!localStorage.getItem('memo-title1')) localStorage.setItem('memo-title1', '메모제목1');
if (!localStorage.getItem('memo-title2')) localStorage.setItem('memo-title2', '메모제목2');
if (!localStorage.getItem('memo-title3')) localStorage.setItem('memo-title3', '메모제목3');
if (!localStorage.getItem('memo-item1')) localStorage.setItem('memo-item1', '메모1');
if (!localStorage.getItem('memo-item2')) localStorage.setItem('memo-item2', '메모2');
if (!localStorage.getItem('memo-item3')) localStorage.setItem('memo-item3', '메모3');
const container = document.querySelector('#mac-panel-container');
const calendarWidget = document.querySelector('.calendar-widget');
const memoWidget = document.querySelector('.memo-widget');
const clockWidget = document.querySelector('.clock-widget-component');
calendarWidget?.addEventListener('click', () => {
  if (container!.querySelector('.mac-panel[data-id="calendar-widget"] .mac-panel-program')) return;
  const tmppanel = panelContainer.createMacPanel('calendar-widget', 1);
  container?.appendChild(tmppanel);

  const calendarEl = container!.querySelector('.mac-panel[data-id="calendar-widget"] .mac-panel-program') as HTMLElement;
  calendarEl.classList.add('allow-scroll');
  if (!calendarEl) {
    console.error('Calendar element not found');
    return;
  }

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek',
    },
  });
  calendar.render();
  const may26 = document.querySelector('[data-date="2025-05-26"] .fc-daygrid-day-events') as HTMLElement;
  const may27 = document.querySelector('[data-date="2025-05-27"] .fc-daygrid-day-events') as HTMLElement;
  may26.textContent = '♥휴강♥';
  may27.textContent = '♥리액트♥';
  may26.style.textAlign = 'center';
  may27.style.textAlign = 'center';

  const resz = new ResizeObserver(() => {
    calendar.updateSize();
  });
  resz.observe(calendarEl);
});

const memoWidgetHeader = memoWidget?.querySelector('.memo-widget-header');
memoWidgetHeader?.addEventListener('click', () => {
  createMemoPanel();
});

const memoWidgetItems = memoWidget?.querySelectorAll('.memo-widget-item');
Array.from(memoWidgetItems!).forEach((e, i) => {
  e.textContent = localStorage.getItem(`memo-title${i + 1}`);
  e.addEventListener('click', () => {
    createMemoPanel(i + 1);
  });
});

clockWidget?.addEventListener('click', () => {
  if (container!.querySelector('.mac-panel[data-id="clock-widget"] .mac-panel-program')) return;
  const tmppanel = panelContainer.createMacPanel('clock-widget', 1);
  container?.appendChild(tmppanel);
  const clockProgram = container!.querySelector('.mac-panel[data-id="clock-widget"] .mac-panel-program') as HTMLElement;
  clockProgram.classList.add('dark:bg-[#000000]');

  const clock_container_div = document.createElement('div');
  clock_container_div.className = 'clock-container dark:bg-[#4A4C4E]';
  const stopwatch_label = document.createElement('label');
  stopwatch_label.className = 'stopwatch-label pt-3';
  const stopwatch_radio = document.createElement('input');
  stopwatch_radio.classList.add('stopwatch-radio');
  stopwatch_radio.type = 'radio';
  stopwatch_radio.name = 'clocktype';
  stopwatch_radio.value = 'stopwatch';
  stopwatch_radio.checked = true;
  const stopwatch_text = document.createTextNode('스톱워치');
  const timer_label = document.createElement('label');
  timer_label.className = 'timer-label pt-3';
  const timer_radio = document.createElement('input');
  timer_radio.classList.add('timer-radio');
  timer_radio.type = 'radio';
  timer_radio.name = 'clocktype';
  timer_radio.value = 'timer';
  const timer_text = document.createTextNode('타이머');
  clock_container_div.appendChild(stopwatch_label);
  clock_container_div.appendChild(timer_label);
  stopwatch_label.appendChild(stopwatch_radio);
  stopwatch_label.appendChild(stopwatch_text);
  timer_label.appendChild(timer_radio);
  timer_label.appendChild(timer_text);

  const clock_panel = document.createElement('div');
  clock_panel.className = 'clock-panel flex flex-col justify-center h-full';
  clock_panel.appendChild(makeStopwatch());
  clock_container_div.appendChild(clock_panel);

  clockProgram.appendChild(clock_container_div);

  const stopwatchElement = makeStopwatch();
  const timerElement = makeTimer();

  // 초기 표시
  if (stopwatch_radio.checked) {
    stopwatchElement.style.display = 'block';
    timerElement.style.display = 'none';
    clock_panel.appendChild(stopwatchElement);
  }

  stopwatch_radio.addEventListener('change', () => {
    if (stopwatch_radio.checked) {
      stopwatchElement.style.display = 'block';
      timerElement.style.display = 'none';
      clock_panel.innerHTML = '';
      clock_panel.appendChild(stopwatchElement);
    }
  });

  timer_radio.addEventListener('change', () => {
    if (timer_radio.checked) {
      stopwatchElement.style.display = 'none';
      timerElement.style.display = 'block';
      clock_panel.innerHTML = '';
      clock_panel.appendChild(timerElement);
    }
  });


  function makeTimer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'w-[640px] h-[318px] bg-[#1f1f1f] rounded-md flex flex-col justify-center items-center gap-6 text-white shadow-xl relative';

    const display = document.createElement('div');
    display.className = 'text-[48px] text-white';
    display.textContent = '00:00:00';

    const inputGroup = document.createElement('div');
    inputGroup.className = 'flex gap-4';

    const createInput = (placeholder: string) => {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.placeholder = placeholder;
      input.className = 'w-[70px] bg-gray-100 text-black text-center py-1 px-2 rounded border border-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400';
      return input;
    };

    const hourInput = createInput('시');
    const minInput = createInput('분');
    const secInput = createInput('초');
    inputGroup.append(hourInput, minInput, secInput);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'flex gap-4 justify-center w-full';

    const createButton = (text: string, bgColor: string, hoverColor: string) => {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.className = `${bgColor} ${hoverColor} text-black py-2 rounded w-[100px]`;
      return btn;
    };

    const startBtn = createButton('start', 'bg-green-400', 'hover:bg-green-500');
    const stopBtn = createButton('stop', 'bg-red-300', 'hover:bg-red-400');
    const resetBtn = createButton('reset', 'bg-gray-400', 'hover:bg-gray-500');

    buttonGroup.append(startBtn, stopBtn, resetBtn);

    const endMessage = document.createElement('div');
    endMessage.textContent = '타이머 종료';
    endMessage.className = 'absolute top-2 left-1/2 -translate-x-1/2 text-white text-2xl hidden';

    let interval: number | undefined;
    let remaining = 0;
    let blinkInterval: number | undefined;

    const updateDisplay = () => {
      const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
      const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
      const s = String(remaining % 60).padStart(2, '0');
      display.textContent = `${h}:${m}:${s}`;
    };

    const stopBlink = () => {
      if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = undefined;
        endMessage.style.opacity = '1';
      }
    };

    startBtn.onclick = () => {
      const h = parseInt(hourInput.value) || 0;
      const m = parseInt(minInput.value) || 0;
      const s = parseInt(secInput.value) || 0;
      remaining = h * 3600 + m * 60 + s;

      if (remaining <= 0) return;

      clearInterval(interval);
      stopBlink();
      updateDisplay();
      endMessage.classList.add('hidden');

      interval = window.setInterval(() => {
        remaining--;
        updateDisplay();
        if (remaining <= 0) {
          clearInterval(interval);
          endMessage.classList.remove('hidden');

          blinkInterval = window.setInterval(() => {
            endMessage.style.opacity = endMessage.style.opacity === '1' ? '0' : '1';
          }, 500);
        }
      }, 1000);
    };

    stopBtn.onclick = () => {
      clearInterval(interval);
      stopBlink();
    };

    resetBtn.onclick = () => {
      clearInterval(interval);
      stopBlink();
      remaining = 0;
      hourInput.value = '';
      minInput.value = '';
      secInput.value = '';
      display.textContent = '00:00:00';
      endMessage.classList.add('hidden');
    };

    container.appendChild(endMessage);
    container.appendChild(display);
    container.appendChild(inputGroup);
    container.appendChild(buttonGroup);

    return container;
  }
});

interface WidgetManager {
  // createWidget(id: string): HTMLElement;
  isWidget(id: string): boolean;
  addEventToWidget(): void;
  switchWidgetToProgram(id: string): HTMLElement | undefined;
  makeCalendar(): HTMLElement | undefined;
  makeMemo(): HTMLElement | undefined;
  makeClock(): HTMLElement | undefined;
}

const widgetManager: WidgetManager = {
  // createWidget(id: string): HTMLElement {
  //   if (id === 'calendar-widget') {
  //     // calendar-widget 마크업
  //   }
  //   // 에러 막는 임시 return
  //   return document.createElement('div');
  // },
  isWidget(id: string): boolean {
    return widgetIDSet.has(id);
  },
  addEventToWidget(): void {
    const widgetContainer = document.querySelector('#widget-container') as HTMLElement;
    Array.from(widgetContainer.children).forEach(e => {
      if (e.classList.contains('calendar-widget')) {
        e.addEventListener('click', () => {});
      }
    });
  },
  switchWidgetToProgram(id: string): HTMLElement | undefined {
    if (id === 'calendar-widget') return this.makeCalendar();
    if (id === 'memo-widget') return this.makeMemo();
    if (id === 'clock-widget') return this.makeClock();
  },
  makeCalendar(): HTMLElement | undefined {
    return;
  },
  makeMemo(): HTMLElement | undefined {
    return;
  },
  makeClock(): HTMLElement | undefined {
    return;
  },
};

function createMemoPanel(key?: number) {
  if (container!.querySelector('.mac-panel[data-id="memo-widget"] .mac-panel-program')) return;
  const tmppanel = panelContainer.createMacPanel('memo-widget', 1);
  container?.appendChild(tmppanel);

  const memoEl = container!.querySelector('.mac-panel[data-id="memo-widget"] .mac-panel-program') as HTMLElement;
  console.log(memoEl);
  memoEl.classList.add('allow-scroll');
  memoEl.classList.add('dark:bg-[#000000]');
  const memoHd = container!.querySelector(`.mac-panel[data-id="memo-widget"] .mac-panel-header`) as HTMLElement;
  memoHd.classList.add('bg-gradient-to-b', 'from-[#FFE855]', 'to-[#FFB115]');
  const memoTitle = container!.querySelector(`.mac-panel[data-id="memo-widget"] .mac-panel-title`) as HTMLElement;
  memoTitle.classList.add('text-white');

  const memo_container = document.createElement('div');
  memo_container.classList.add('memo-container');
  const memo_sidebar_container = document.createElement('div');
  memo_sidebar_container.classList.add('memo-sidebar-container');
  const memo_sidebar = document.createElement('div');
  memo_sidebar.classList.add('memo-sidebar');
  const memo_sidebar_header = document.createElement('div');
  memo_sidebar_header.classList.add('memo-sidebar-header');
  const memo_sidebar_title = document.createElement('div');
  memo_sidebar_title.classList.add('memo-sidebar-title');
  const memo_add_btn = document.createElement('button');
  memo_add_btn.classList.add('memo-add-btn');
  memo_add_btn.type = 'button';
  // const memo_searchbar = document.createElement('input');
  // memo_searchbar.classList.add('memo-searchbar');
  // memo_searchbar.type = 'search';
  const memo_sidebar_ul = document.createElement('ul');
  memo_sidebar_ul.classList.add('memo-sidebar-ul');
  const memo_sidebar_footer = document.createElement('div');
  memo_sidebar_footer.classList.add('memo-sidebar-footer');
  const memo_main = document.createElement('div');
  memo_main.classList.add('memo-main');
  const memo_main_title = document.createElement('input');
  memo_main_title.classList.add('memo-main-title');
  memo_main_title.type = 'text';
  if (typeof key === 'number') memo_main_title.value = localStorage.getItem('memo-title' + key)!;
  else memo_main_title.value = '';
  const memo_main_content = document.createElement('textarea');
  memo_main_content.classList.add('memo-main-content');
  if (typeof key === 'number') memo_main_content.textContent = localStorage.getItem('memo-item' + key)!;

  const memo_save_btn_container = document.createElement('div');
  memo_save_btn_container.classList.add('memo-save-btn-container');
  const memo_save_btn = document.createElement('button');
  memo_save_btn.classList.add('memo-save-btn');
  memo_save_btn.type = 'button';
  memo_save_btn.textContent = '완료';

  let memoCnt = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      if (key.startsWith('memo-title')) {
        memoCnt++;
        const idx = key.slice('memo-title'.length);
        const memo_sidebar_li = document.createElement('li');
        memo_sidebar_li.classList.add('memo-sidebar-li');
        const memo_item_title = document.createElement('div');
        memo_item_title.classList.add('memo-item-title');
        const memo_item_content = document.createElement('div');
        memo_item_content.classList.add('memo-item-content');
        memo_sidebar_ul.appendChild(memo_sidebar_li);
        memo_sidebar_li.appendChild(memo_item_title);
        memo_sidebar_li.appendChild(memo_item_content);
        memo_sidebar_li.dataset.memoid = idx;
        memo_item_title.textContent = localStorage.getItem(`memo-title${idx}`);
        memo_item_content.textContent = localStorage.getItem(`memo-item${idx}`);
        memo_sidebar_li.addEventListener('click', () => {
          memo_main_title.value = localStorage.getItem(`memo-title${idx}`) || '';
          memo_main_content.textContent = localStorage.getItem(`memo-item${idx}`) || '';
          memo_main.dataset.memoid = idx;
        });
      }
    }
  }
  memo_add_btn.addEventListener('click', () => {
    memoCnt++;
    localStorage.setItem(`memo-title${memoCnt}`, `새 메모${memoCnt}`);
    localStorage.setItem(`memo-item${memoCnt}`, `메모를 입력하세요.`);
    const memo_sidebar_li = document.createElement('li');
    memo_sidebar_li.classList.add('memo-sidebar-li');
    const memo_item_title = document.createElement('div');
    memo_item_title.classList.add('memo-item-title');
    const memo_item_content = document.createElement('div');
    memo_item_content.classList.add('memo-item-content');
    memo_sidebar_ul.appendChild(memo_sidebar_li);
    memo_sidebar_li.appendChild(memo_item_title);
    memo_sidebar_li.appendChild(memo_item_content);
    memo_sidebar_li.dataset.memoid = memoCnt.toString();
    memo_item_title.textContent = localStorage.getItem(`memo-title${memoCnt}`);
    memo_item_content.textContent = localStorage.getItem(`memo-item${memoCnt}`);
    memo_sidebar_li.addEventListener('click', () => {
      memo_main_title.value = localStorage.getItem(`memo-title${memoCnt}`) || '';
      memo_main_content.textContent = localStorage.getItem(`memo-item${memoCnt}`) || '';
      memo_main.dataset.memoid = memoCnt.toString();
    });
    memo_sidebar_li.click();
  });

  memo_save_btn.addEventListener('click', () => {
    const targetMain = memo_save_btn.closest('.memo-main') as HTMLElement;
    const targetTitle = targetMain.querySelector('.memo-main-title') as HTMLInputElement;
    const targetContent = targetMain.querySelector('.memo-main-content') as HTMLTextAreaElement;
    const id = targetMain.dataset.memoid;
    localStorage.setItem(`memo-title${id}`, targetTitle.value);
    localStorage.setItem(`memo-item${id}`, targetContent.value || '');
    const targetLiList = targetMain.previousElementSibling?.querySelectorAll('li');
    Array.from(targetLiList!).forEach(e => {
      if (e.dataset.memoid === id) {
        e.querySelector('.memo-item-title')!.textContent = localStorage.getItem(`memo-title${id}`);
        e.querySelector('.memo-item-content')!.textContent = localStorage.getItem(`memo-item${id}`);
      }
    });
    Array.from(memoWidgetItems!).forEach((e, i) => {
      e.textContent = localStorage.getItem(`memo-title${i + 1}`);
      e.addEventListener('click', () => {
        createMemoPanel(i + 1);
      });
    });
  });
  memoEl.appendChild(memo_container);
  memo_container.appendChild(memo_sidebar_container);
  memo_sidebar_container.appendChild(memo_sidebar);
  memo_sidebar.appendChild(memo_sidebar_header);
  memo_sidebar_header.appendChild(memo_sidebar_title);
  memo_sidebar_header.appendChild(memo_add_btn);
  // memo_sidebar.appendChild(memo_searchbar);
  memo_sidebar.appendChild(memo_sidebar_ul);
  memo_sidebar_container.appendChild(memo_sidebar_footer);
  memo_container.appendChild(memo_main);
  memo_main.appendChild(memo_main_title);
  memo_main.appendChild(memo_main_content);
  memo_main.appendChild(memo_save_btn_container);
  memo_save_btn_container.appendChild(memo_save_btn);
  if (typeof key === 'number') memo_main.dataset.memoid = key.toString();

  memo_sidebar_title.textContent = '메모';
  // memo_searchbar.placeholder = '검색';
  memo_sidebar_footer.textContent = `${memoCnt}개의 메모`;
}

export { widgetManager };
