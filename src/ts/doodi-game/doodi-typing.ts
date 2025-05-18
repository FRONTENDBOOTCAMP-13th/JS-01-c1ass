// 타이핑 애니메이션, 오디오 효과 (배경음악 등)
import { effectPopSound } from './doodi-screen';

const startText = 'Doodi Doodi..!!\nDoodi Doodi Doodi\nDododoodidoo Doodi!!';
const transText = '나는 농부 두디...!!\n해충을 잡고 농작물을 가꿔주지.\n농작물을 훔쳐먹는 나쁜 두카들을 잡아줘!!';

const startText2 = '시간 제한이 사라지기 전에\n나쁜 두카들을 잡아줘!\n두디와 헷갈리지 않는게 중요해!';

const typingEl = document.getElementById('typing') as HTMLElement;
const typingEl2 = document.getElementById('typing2') as HTMLElement;

const doodiSound = new Audio('/public/asserts/doodi-game/doodi/doodi_dub.aac');
doodiSound.volume = 0.3;

// hitSound() 연속 재생 위한 오디오 생성 함수
export function playDoodiSound() {
  // 현재 재생 중이면 멈추고 처음부터 재생
  doodiSound.pause();
  doodiSound.currentTime = 0;
  doodiSound.play().catch(console.error);
}

// 타이핑 효과 함수
function typeText(text: string, element: HTMLElement, callback?: () => void) {
  playDoodiSound();
  element.innerHTML = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text[i] === '\n' ? '<br />' : text[i];
      i++;
      setTimeout(type, 30);
    } else {
      callback?.();
    }
  }

  type();
}

// 번역 효과 함수 (한 글자씩 바꾸기)
function translateText(original: string, translated: string, element: HTMLElement) {
  playDoodiSound();
  let i = 0;
  const length = Math.max(original.length, translated.length);
  const tempArr = original.split('');

  function change() {
    if (i < length) {
      tempArr[i] = translated[i] ?? ''; // 번역 텍스트가 짧은 경우도 고려
      element.innerHTML = tempArr.map(char => (char === '\n' ? '<br />' : char)).join('');
      i++;
      setTimeout(change, 40);
    }
  }

  change();
}

// 이벤트 리스너
document.getElementById('start')?.addEventListener('click', () => {
  typeText(startText, typingEl);
});

document.getElementById('skip')?.addEventListener('click', () => {
  typeText(startText2, typingEl2);
});

document.getElementById('trans')?.addEventListener('click', () => {
  translateText(startText, transText, typingEl);
  effectPopSound();
});

// 배경음악
let bgm: HTMLAudioElement;
document.addEventListener('DOMContentLoaded', () => {
  bgm = new Audio('/public/asserts/doodi-game/etc/background.aac');
  bgm.loop = true;
  bgm.volume = 0.01;
});

// 사용자 클릭 후 재생하는 방식 (버튼 예시)
document.querySelector('#start')?.addEventListener('click', () => {
  bgm?.play().catch(console.error);
});
