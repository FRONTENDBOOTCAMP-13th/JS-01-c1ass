const resourceList: string[] = ['/asserts/doodi-game/doodi/doodi_dub.aac', '/asserts/doodi-game/doodi/doodi_intro.svg', '/asserts/doodi-game/doodi/doodi-half_hurt.svg', '/asserts/doodi-game/doodi/doodi_dub.aac', '/asserts/doodi-game/doodi/doodi.aac', '/asserts/doodi-game/dooka/dooka-half_hurt.svg', '/asserts/doodi-game/etc/background.aac', '/asserts/doodi-game/etc/beep.aac', '/asserts/doodi-game/etc/effect_pop.mp3', '/asserts/doodi-game/etc/fence.svg', '/asserts/doodi-game/etc/soil_covered.svg', '/asserts/doodi-game/etc/soil_square.svg', '/asserts/doodi-game/etc/talking.svg', '/asserts/doodi-game/etc/toy_hammer-hurt.png', '/asserts/doodi-game/etc/toy_hammer.png', '/asserts/doodi-game/logo/ready_start.svg', '/asserts/doodi-game/', '/asserts/doodi-game/doodi_hole.webp', '/asserts/doodi-game/doodi_logo.svg', '/asserts/doodi-game/Doodi_speedUp.mp4', '/asserts/doodi-game/dooka_hole.webp', '/asserts/doodi-game/soil_hole.svg', '/asserts/doodi-game/soil1.svg', '/asserts/doodi-game/soli_group.svg', '/asserts/doodi-game/START.svg', '/asserts/doodi-game/time_over.svg'];

// 리소스별 로딩 처리
function preloadResource(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const ext = url.split('.').pop()?.toLowerCase();
    if (!ext) return resolve();

    if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Image load error: ${url}`));
      img.src = url;
    } else if (['mp3', 'aac'].includes(ext)) {
      const audio = new Audio();
      audio.src = url;
      audio.oncanplaythrough = () => resolve();
      audio.onerror = () => reject(new Error(`Audio load error: ${url}`));
      audio.load();
    } else if (['mp4', 'webm'].includes(ext)) {
      const video = document.createElement('video');
      video.src = url;
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error(`Video load error: ${url}`));
    } else {
      resolve(); // 기타 확장자 무시
    }
  });
}

// 프리로드 실행
export async function startPreload() {
  const loading = document.getElementById('loading');
  const mainScreen = document.getElementById('cover'); // 게임 시작 화면

  try {
    // 로딩 시작 시 보여주기
    loading?.classList.remove('hidden');

    // 모든 리소스 로딩
    await Promise.all(resourceList.map(preloadResource));

    // 완료 후 전환
    loading?.remove();
    mainScreen?.classList.remove('hidden');
  } catch (err) {
    console.error('리소스 로딩 실패:', err);
    if (loading) loading.innerHTML = '<p class="text-red-500">로딩 실패 😢</p>';
  }
}
