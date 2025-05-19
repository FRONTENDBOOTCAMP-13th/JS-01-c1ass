const drawElement = document.getElementById('draw') as HTMLDivElement;
const drawContent = document.getElementById('draw-content') as HTMLDivElement;
const paperSound = new Audio('/asserts/socks-game/paper-sound.aac');
paperSound.volume = 0.5;

const bgImages = ['/asserts/socks-game/paper1.png', '/asserts/socks-game/paper2.png', '/asserts/socks-game/paper3.png', '/asserts/socks-game/paper_package.png'];
const socksItems = [
  { img: '/asserts/socks-game/socks-list/socks1.png', title: '어릴 적 악몽 괴물과 똑닮아\n 집구석에 쳐박아놓은 눈알양말.', anal: '괜히 누가 날 지켜보는 기분.\n신경이 곤두설지도?', purchase: 'https://startknitting.org/booties/very-hungry-caterpillar-socks-knitting-patterns/' },
  { img: '/asserts/socks-game/socks-list/socks2.png', title: '방귀를 참다가 양말까지 내려가서\n 부풀어버린 양말.', anal: '사소한 걸 참고 억지로 눌러 담지 말기.\n결국 이상한 데서 터집니다?', purchase: 'https://no6store.com/collections/accessories-socks-and-tights' },
  { img: '/asserts/socks-game/socks-list/socks3.png', title: '풍자용으로 샀는데 자서전이 되어버린 양말.', anal: '괜히 나만 어색한 느낌?\n신경 안 쓰려해도 오늘따라 나만 동떨어진다 느낄 수 있음', purchase: 'https://www.lotteon.com/p/product/LO2435542782?sitmNo=LO2435542782_2435542783&mall_no=1&dp_infw_cd=SCH%5E%5E%ED%8A%B8%EB%9F%BC%ED%94%84%EC%96%91%EB%A7%90&areaCode=SCH' },
  { img: '/asserts/socks-game/socks-list/socks4.png', title: '털을 달면 귀여울거라 생각했지만\n 큰 오산이었던 양말.', anal: '계획한 느낌은 아닌데 괜히 기억에 남는 하루가 될 지도!\n오늘만 P로 살아보는 건 어떤가용?', purchase: 'https://wear.jp/item/3687866/' },
  { img: '/asserts/socks-game/socks-list/socks5.png', title: '털을 달면 귀여울거라 생각했지만\n 큰 오산이었던 양말.', anal: '계획한 느낌은 아닌데 괜히 기억에 남는 하루가 될 지도!\n오늘만 P로 살아보는 건 어떤가용?', purchase: 'https://wear.jp/item/3687866/' },
];
const allImagesToPreload = [...bgImages, ...socksItems.map(sock => sock.img)];
preloadImages(allImagesToPreload);

// ✅ 이미 보여준 양말 인덱스 추적용 배열
let usedSocks: number[] = [];

// draw 나타나는 함수
function showDrawWithAnimation() {
  drawElement.classList.remove('hidden');
  paperSoundEffect();

  // ✅ 기존 내용 초기화
  const imgDiv = document.getElementById('img') as HTMLDivElement;
  const titleSpan = document.getElementById('title') as HTMLSpanElement;
  const analSpan = document.getElementById('anal') as HTMLSpanElement;

  imgDiv.style.backgroundImage = '';
  titleSpan.textContent = '';
  analSpan.textContent = '';

  // 1. 첫 이미지(bg1) + 흔들림 애니메이션
  drawContent.style.backgroundImage = `url(${bgImages[0]})`;
  drawContent.classList.add('shake');

  // 2. 흔들림 끝난 후(1초)부터 나머지 이미지 보여주기 시작
  setTimeout(() => {
    drawContent.classList.remove('shake');

    let index = 1;
    const interval = setInterval(() => {
      drawContent.style.backgroundImage = `url(${bgImages[index]})`;

      // ✅ 양말은 마지막 배경 전 타이밍에 보여줌
      if (index === bgImages.length - 2) {
        const randomSock = getUniqueRandomSock();

        const imgDiv = document.getElementById('img') as HTMLDivElement;
        const titleSpan = document.getElementById('title') as HTMLSpanElement;
        const analSpan = document.getElementById('anal') as HTMLSpanElement;

        imgDiv.style.backgroundImage = `url(${randomSock.img})`;
        imgDiv.style.backgroundSize = 'contain';
        imgDiv.style.backgroundRepeat = 'no-repeat';
        imgDiv.style.backgroundPosition = 'center';

        titleSpan.textContent = randomSock.title;
        analSpan.textContent = randomSock.anal;
      }

      // ✅ 마지막 배경을 출력한 직후 종료
      if (index === bgImages.length - 1) {
        clearInterval(interval);
      }

      // ✅ 마지막에 index 증가
      index++;
    }, 200);
  }, 500);
}

// 버튼 클릭 이벤트에 연결
const button = document.querySelector('button');
button?.addEventListener('click', showDrawWithAnimation);

// 종이 효과음
function paperSoundEffect() {
  paperSound.play();
}

// 양말이 겹치지 않도록 조정하는 함수
function getUniqueRandomSock() {
  // 모든 양말을 다 썼으면 초기화
  if (usedSocks.length === socksItems.length) {
    usedSocks = [];
  }

  // 사용되지 않은 인덱스만 골라내기
  const unusedIndexes = socksItems.map((_, i) => i).filter(i => !usedSocks.includes(i));

  // 무작위 선택
  const randomIndex = unusedIndexes[Math.floor(Math.random() * unusedIndexes.length)];
  usedSocks.push(randomIndex); // 사용한 인덱스 저장
  return socksItems[randomIndex];
}

// draw 요소 외부 클릭 => 닫기
document.addEventListener('click', event => {
  const draw = document.getElementById('draw');
  const drawContent = document.getElementById('draw-content');

  // draw가 표시 중일 때만 실행
  if (!draw || draw.classList.contains('hidden')) return;

  const target = event.target as Node;

  // draw-content 내부를 클릭한 경우 무시
  if (drawContent && drawContent.contains(target)) return;

  const postBox = document.getElementById('post-box');
  if (postBox && postBox.contains(target)) return;

  // 이 외의 영역 클릭 시 draw 숨김
  draw.classList.add('hidden');
});

// 이미지 프리로드
function preloadImages(urls: string[]) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
