import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { widgetIDSet } from '../programID';
import { panelContainer } from './mac-panel-container';

if (!localStorage.getItem('memo-title1')) localStorage.setItem('memo-title1', '메모제목1');
if (!localStorage.getItem('memo-title2')) localStorage.setItem('memo-title2', '메모제목2');
if (!localStorage.getItem('memo-title3')) localStorage.setItem('memo-title3', '메모제목3');
if (!localStorage.getItem('memo-item1')) localStorage.setItem('memo-item1', '메모1');
if (!localStorage.getItem('memo-item2')) localStorage.setItem('memo-item2', '메모2');
if (!localStorage.getItem('memo-item3')) localStorage.setItem('memo-item3', '메모3');
const container = document.querySelector('#mac-panel-container');
const calendarWidget = document.querySelector('.calendar-widget');
const memoWidget = document.querySelector('.memo-widget');
calendarWidget?.addEventListener('click', () => {
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
  const resz = new ResizeObserver(() => {
    calendar.updateSize();
  });
  resz.observe(calendarEl);
});

const memoWidgetHeader = memoWidget?.querySelector('.memo-widget-header');
memoWidgetHeader?.addEventListener('click', () => {
  const tmppanel = panelContainer.createMacPanel('memo-widget', 1);
  container?.appendChild(tmppanel);

  const memoEl = container!.querySelector('.mac-panel[data-id="memo-widget"] .mac-panel-program') as HTMLElement;
  memoEl.classList.add('allow-scroll');
  const memoHd = container!.querySelector(`.mac-panel[data-id="memo-widget"] .mac-panel-header`) as HTMLElement;
  console.log(memoHd);
  memoHd.classList.add('bg-gradient-to-b', 'from-[#FFE855]', 'to-[#FFB115]');
  const memoTitle = container!.querySelector(`.mac-panel[data-id="memo-widget"] .mac-panel-title`) as HTMLElement;
  memoTitle.classList.add('text-white');
  let rst = '';
  rst += localStorage.getItem('memo-title1') + '\n';
  rst += localStorage.getItem('memo-title2') + '\n';
  rst += localStorage.getItem('memo-title3') + '\n';
  memoEl.innerText = rst;
});
const memoWidgetItems = memoWidget?.querySelectorAll('.memo-widget-item');
Array.from(memoWidgetItems!).forEach((e, i) => {
  e.textContent = localStorage.getItem(`memo-title${i + 1}`);
  e.addEventListener('click', () => {
    const tmppanel = panelContainer.createMacPanel(`memo-widget${i + 1}`, 1);
    container?.appendChild(tmppanel);

    const memoTitle = container!.querySelector(`.mac-panel[data-id="memo-widget${i + 1}"] .mac-panel-title`) as HTMLElement;
    memoTitle.textContent = localStorage.getItem(`memo-title${i + 1}`);
    const memoEl = container!.querySelector(`.mac-panel[data-id="memo-widget${i + 1}"] .mac-panel-program`) as HTMLElement;
    memoEl.textContent = localStorage.getItem(`memo-item${i + 1}`);
  });
});
interface WidgetManager {
  // createWidget(id: string): HTMLElement;
  isWidget(id: string): boolean;
  addEventToWidget(): void;
  switchWidgetToProgram(id: string): HTMLElement | undefined;
  makeCalendar(): HTMLElement | undefined;
  makeMemo(): HTMLElement | undefined;
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
  },
  makeCalendar(): HTMLElement | undefined {
    // const calendarEl = document.createElement('div');
    // const calendar = new Calendar(calendarEl, {
    //   plugins: [dayGridPlugin],
    //   initialView: 'dayGridMonth', // Add default view
    //   // headerToolbar: {
    //   //   left: 'prev,next today',
    //   //   center: 'title',
    //   //   right: 'dayGridMonth,dayGridWeek,dayGridDay',
    //   // },
    // });
    // if (!calendarEl || !calendar) return;

    // calendar.render();
    // return calendarEl;
    return;
  },
  makeMemo(): HTMLElement | undefined {
    return;
  },
};

export { widgetManager };
