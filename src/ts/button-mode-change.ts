const html = document.documentElement;
const toggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
const systemResetButton = document.getElementById('system-reset') as HTMLButtonElement;

// 시스템 다크 모드 감지
function isSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// 테마 적용 함수
function applyTheme(theme: string | null) {
  html.setAttribute('data-theme', theme ?? (isSystemDark() ? 'dark' : 'light'));
  // console.log('🎨 적용된 테마:', html.getAttribute('data-theme'));
}

// ✅ [초기 진입 시] 저장된 theme에 따라 적용!
const savedTheme = localStorage.getItem('theme');
// console.log('📦 초기 저장된 theme:', savedTheme ?? '(없음)');
applyTheme(savedTheme);

toggleButton?.addEventListener('click', () => {
  const current = localStorage.getItem('theme');

  // 👉 애니메이션 초기화
  toggleButton.classList.remove('wiggle');
  void toggleButton.offsetWidth; // ← reflow 강제 발생 (핵심!)
  toggleButton.classList.add('wiggle');

  if (!current) {
    const forced = isSystemDark() ? 'light' : 'dark';
    // console.log(`🔁 강제 적용: ${forced}`);
    localStorage.setItem('theme', forced);
    applyTheme(forced);
  } else {
    // console.log('🔄 시스템 모드로 복귀');
    localStorage.removeItem('theme');
    applyTheme(null);
  }

  // console.log('📦 저장 후 theme:', localStorage.getItem('theme'));
});

// 시스템 모드로 복귀 버튼
systemResetButton?.addEventListener('click', () => {
  localStorage.removeItem('theme');
  applyTheme(null);
  // console.log('🧹 시스템 모드 강제 복귀 완료');
});

// 시스템 설정 변경 시 자동 반영
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const theme = localStorage.getItem('theme');
  if (!theme) {
    // console.log('📡 시스템 변경 감지됨 → 테마 적용');
    applyTheme(null);
  }
});
