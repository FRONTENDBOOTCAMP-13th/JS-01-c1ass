import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html', // 기본 index.html
        mac: 'src/pages/mac.html',
        card: 'src/pages/card.html',
        'doodi-game': 'src/pages/doodi-all.html',
        'arrow-dodge-game': 'src/pages/arrow-dodge-game.html',
        'socks-game': 'src/pages/socks-game.html',

        'calendar-widget': 'src/components/calendar-widget.html',
        'clock-widget': 'src/components/clock-widget.html',
        'icon-bar': 'src/components/icon-bar.html',
        icon: 'src/components/icon.html',
        'mac-panel': 'src/components/mac-panel.html',
        'memo-widget': 'src/components/memo-widget.html',
        'top-bar': 'src/components/top-bar.html',
        'weather-widget': 'src/components/weather-widget.html',
        'doodi-character': 'src/components/doodi-game/doodi-character.html',
        'doodi-gamepage': 'src/components/doodi-game/doodi-gamepage.html',
        'context-menu': 'src/components/context-menu.html',
        'memo-program': 'src/components/memo-program.html',

        notfound: 'src/pages/notfound.html',
      },
    },
  },
  appType: 'mpa', // fallback 사용안함
  plugins: [tailwindcss()],
});
