import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { widgetIDSet } from '../programID';
import { panelContainer } from './mac-panel-container';

const container = document.querySelector('#mac-panel-container');
const calendarWidget = document.querySelector('.calendar-widget');
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
interface WidgetManager {
  createWidget(id: string): HTMLElement;
  isWidget(id: string): boolean;
  addEventToWidget(): void;
  switchWidgetToProgram(id: string): HTMLElement | undefined;
  makeCalendar(): HTMLElement | undefined;
}

const widgetManager: WidgetManager = {
  createWidget(id: string): HTMLElement {
    if (id === 'calendar-widget') {
      // calendar-widget 마크업
    }
    // 에러 막는 임시 return
    return document.createElement('div');
  },
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
  },
  makeCalendar(): HTMLElement | undefined {
    const calendarEl = document.createElement('div');
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth', // Add default view
      // headerToolbar: {
      //   left: 'prev,next today',
      //   center: 'title',
      //   right: 'dayGridMonth,dayGridWeek,dayGridDay',
      // },
    });
    if (!calendarEl || !calendar) return;

    calendar.render();
    return calendarEl;
  },
};

export { widgetManager };
