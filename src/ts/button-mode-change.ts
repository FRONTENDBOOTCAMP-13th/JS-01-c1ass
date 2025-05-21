const html = document.documentElement;
const toggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;

function isSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme: string | null) {
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    // console.log('🌙 data-theme="dark" 적용');
  } else if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
    // console.log('☀️ data-theme="light" 적용');
  } else {
    const systemDark = isSystemDark();
    html.setAttribute('data-theme', systemDark ? 'dark' : 'light');
    // console.log(`🖥️ 시스템 테마 기반 적용: ${systemDark ? 'dark' : 'light'}`);
  }
}

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme);

toggleButton.addEventListener('click', () => {
  const current = localStorage.getItem('theme');

  // 👉 애니메이션 초기화
  toggleButton.classList.remove('wiggle');
  void toggleButton.offsetWidth; // ← reflow 강제 발생 (핵심!)
  toggleButton.classList.add('wiggle');

  // 토글 테마 적용
  if (!current) {
    const forced = isSystemDark() ? 'light' : 'dark';
    localStorage.setItem('theme', forced);
    applyTheme(forced);
  } else {
    localStorage.removeItem('theme');
    applyTheme(null);
  }
});
