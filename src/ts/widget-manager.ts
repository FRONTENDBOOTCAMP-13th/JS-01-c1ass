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
  const resz = new ResizeObserver(() => {
    calendar.updateSize();
  });
  resz.observe(calendarEl);
});

const memoWidgetHeader = memoWidget?.querySelector('.memo-widget-header');
memoWidgetHeader?.addEventListener('click', () => {
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
  const memo_searchbar = document.createElement('input');
  memo_searchbar.classList.add('memo-searchbar');
  memo_searchbar.type = 'search';
  const memo_sidebar_ul = document.createElement('ul');
  memo_sidebar_ul.classList.add('memo-sidebar-ul');
  const memo_sidebar_footer = document.createElement('div');
  memo_sidebar_footer.classList.add('memo-sedebar-footer');
  const memo_main = document.createElement('div');
  memo_main.classList.add('memo-main');
  const memo_main_title = document.createElement('input');
  memo_main_title.classList.add('memo-main-title');
  memo_main_title.type = 'text';
  memo_main_title.value = '';
  const memo_main_content = document.createElement('textarea');
  memo_main_content.classList.add('memo-main-content');

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
        memo_item_title.textContent = localStorage.getItem(`memo-title${idx}`);
        memo_item_content.textContent = localStorage.getItem(`memo-item${idx}`);
        memo_sidebar_li.addEventListener('click', () => {
          memo_main_title.value = localStorage.getItem(`memo-title${idx}`) || '';
          memo_main_content.textContent = localStorage.getItem(`memo-item${idx}`) || '';
        });
      }
    }
  }
  memoEl.appendChild(memo_container);
  memo_container.appendChild(memo_sidebar_container);
  memo_sidebar_container.appendChild(memo_sidebar);
  memo_sidebar.appendChild(memo_sidebar_header);
  memo_sidebar_header.appendChild(memo_sidebar_title);
  memo_sidebar_header.appendChild(memo_add_btn);
  memo_sidebar.appendChild(memo_searchbar);
  memo_sidebar.appendChild(memo_sidebar_ul);
  memo_sidebar_container.appendChild(memo_sidebar_footer);
  memo_container.appendChild(memo_main);
  memo_main.appendChild(memo_main_title);
  memo_main.appendChild(memo_main_content);

  memo_sidebar_title.textContent = '메모';
  memo_searchbar.placeholder = '검색';
  memo_sidebar_footer.textContent = `${memoCnt}개의 메모`;
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
