const resourceList: string[] = ['/asserts/doodi-game/doodi/doodi_dub.aac', '/asserts/doodi-game/doodi/doodi_intro.svg', '/asserts/doodi-game/doodi/doodi-half_hurt.svg', '/asserts/doodi-game/doodi/doodi_dub.aac', '/asserts/doodi-game/doodi/doodi.aac', '/asserts/doodi-game/dooka/dooka-half_hurt.svg', '/asserts/doodi-game/etc/background.aac', '/asserts/doodi-game/etc/beep.aac', '/asserts/doodi-game/etc/effect_pop.mp3', '/asserts/doodi-game/etc/fence.svg', '/asserts/doodi-game/etc/soil_covered.svg', '/asserts/doodi-game/etc/soil_square.svg', '/asserts/doodi-game/etc/talking.svg', '/asserts/doodi-game/etc/toy_hammer-hurt.png', '/asserts/doodi-game/etc/toy_hammer.png', '/asserts/doodi-game/logo/ready_start.svg', '/asserts/doodi-game/', '/asserts/doodi-game/doodi_hole.webp', '/asserts/doodi-game/doodi_logo.svg', '/asserts/doodi-game/Doodi_speedUp.mp4', '/asserts/doodi-game/dooka_hole.webp', '/asserts/doodi-game/soil_hole.svg', '/asserts/doodi-game/soil1.svg', '/asserts/doodi-game/soli_group.svg', '/asserts/doodi-game/START.svg', '/asserts/doodi-game/time_over.svg'];

function preloadResource(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const ext = url.split('.').pop()?.toLowerCase();
    if (!ext) return resolve();

    if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = url;
    } else if (['mp4', 'webm'].includes(ext)) {
      const video = document.createElement('video');
      video.onloadeddata = () => resolve();
      video.onerror = () => reject();
      video.src = url;
    } else {
      resolve(); // 기타 확장자는 무시
    }
  });
}

export async function startPreload() {
  const loading = document.getElementById('loading-screen');
  const mainScreen = document.getElementById('cover'); // 초기 화면 또는 게임 시작 화면

  try {
    await Promise.all(resourceList.map(preloadResource));
    if (loading) loading.remove();
    if (mainScreen) mainScreen.classList.remove('hidden');
  } catch (err) {
    console.error('리소스 로딩 실패:', err);
    if (loading) loading.innerHTML = '<p class="text-red-500">로딩 실패 😢</p>';
  }
}
