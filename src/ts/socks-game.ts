const drawElement = document.getElementById('draw') as HTMLDivElement;
const drawContent = document.getElementById('draw-content') as HTMLDivElement;
const paperSound = new Audio('/asserts/socks-game/paper-sound.aac');
paperSound.volume = 0.5;

const bgImages = ['/asserts/socks-game/paper1.png', '/asserts/socks-game/paper2.png', '/asserts/socks-game/paper3.png', '/asserts/socks-game/paper_package.png'];
const socksItems = [
  { img: '/asserts/socks-game/socks-list/socks1.png', title: '어릴 적 악몽 괴물과 똑닮아\n집구석에 쳐박아놓은 눈알양말.', anal: '괜히 누가 날 지켜보는 기분이 들 수도.\n어. 뒤에 뭐가 움직였는데?', purchase: 'https://startknitting.org/booties/very-hungry-caterpillar-socks-knitting-patterns/' },
  { img: '/asserts/socks-game/socks-list/socks2.png', title: '방귀를 참다가 양말까지 내려가서\n부풀어버린 양말.', anal: '사소한 걸 참고 억지로 눌러 담지 말기.\n결국 이상한 데서 터집니다?', purchase: 'https://no6store.com/collections/accessories-socks-and-tights' },
  { img: '/asserts/socks-game/socks-list/socks3.png', title: '풍자용으로 샀는데 자서전이 되어버린 양말.', anal: '괜히 나만 어색한 느낌?\n신경 안 쓰려해도 오늘따라 나만 동떨어진다 느낄 수 있음.', purchase: 'https://www.lotteon.com/p/product/LO2435542782?sitmNo=LO2435542782_2435542783&mall_no=1&dp_infw_cd=SCH%5E%5E%ED%8A%B8%EB%9F%BC%ED%94%84%EC%96%91%EB%A7%90&areaCode=SCH' },
  { img: '/asserts/socks-game/socks-list/socks4.png', title: '털을 달면 귀여울거라 생각했지만\n이런걸 기대하진 않았어 양말.', anal: '계획한 느낌은 아닌데 괜히 기억에 남는 하루가 될 지도!\n오늘만 P로 살아보는 건 어떤가용?', purchase: 'https://wear.jp/item/3687866/' },
  { img: '/asserts/socks-game/socks-list/socks5.png', title: '할머니의 보물창고에서 발견했는데,\n50년 전엔 꽤 비쌌을 것 같은 골동품 양말.', anal: '스쳐갈 것들 속에서\n묘하게 가치 있는 걸 발견할지도!', purchase: 'https://no6store.com/collections/accessories-socks-and-tights' },
  { img: '/asserts/socks-game/socks-list/socks6.png', title: '발레리나가 꿈이었을 수도 있잖아 양말.', anal: '평소와 같은 하루를 보내다\n나도 모르는 사이 시선집중 될 수도?', purchase: 'https://no6store.com/collections/accessories-socks-and-tights' },
  { img: '/asserts/socks-game/socks-list/socks7.png', title: '더운데 벗긴 싫어서\n과감히 발등에 구멍 뚫어버린 양말.', anal: '뭐 하나 마음에 안 들긴 하는데,\n 그렇다고 새로 시작하긴 귀찮을 지도.', purchase: 'https://www.ebay.com/itm/356689822053?_trkparms=amclksrc%3DITM%26aid%3D1110006%26algo%3DHOMESPLICE.SIM%26ao%3D1%26asc%3D286129%2C286025%2C286089%26meid%3D9268a3ec88ce4746917cc1c16f8d58ac%26pid%3D101224%26rk%3D1%26rkt%3D5%26sd%3D225500596973%26itm%3D356689822053%26pmt%3D0%26noa%3D1%26pg%3D2332490%26algv%3DDefaultOrganicWebV9BertRefreshRankerWithCassiniEmbRecall%26brand%3DUnbranded&_trksid=p2332490.c101224.m-1' },
  { img: '/asserts/socks-game/socks-list/socks8.png', title: '샌들은 신고 싶은데\n발이 못생겼을 때 신는 양말.', anal: '하고 시픈 마음과 하기 싫은 마음이\n한짝씩 섞여 있는 하루.', purchase: 'https://www.amazon.in/Fascigirl-Women-Simulated-Cotton-Casual/dp/B07VDKQ7VV' },
  { img: '/asserts/socks-game/socks-list/socks9.png', title: '아빠가 해외여행 가서 웃기다며 사 온 양말.', anal: '웃기려고 한 건 맞는데\n진심처럼 받아들여질 수 있는 하루.\n선을 지키는게 필요함!', purchase: 'https://www.amazon.in/Fascigirl-Women-Simulated-Cotton-Casual/dp/B07VDKQ7VV' },
  { img: '/asserts/socks-game/socks-list/socks10.png', title: '나 대신 멍 때려주는 문어 양말.', anal: '생각이 많은 날.\n표정관리까진 안 될 수 있음.', purchase: 'https://sumally.com/' },
  { img: '/asserts/socks-game/socks-list/socks11.png', title: '한 번 신으면 빨아도\n계속 찾게 되는 애착 별 양말.', anal: '선택을 해야 하는 날인데\n결국 익숙한 걸 찾게 될지도 몰라.', purchase: 'https://www.ae.com/us/en/c/women/accessories-socks/socks/cat6180024?redirectedFrom=plp' },
  { img: '/asserts/socks-game/socks-list/socks12.png', title: '초딩때 책 빌렸다가 반납 못 했는데\n결국 제출 못한 연체카드 양말.', anal: '별 뜻 없이 한 말이나 행동이\n괜히 마음에 남을 수도 있어.\n너무 깊게 생각하지 말고 웃어 넘겨도 좋아.', purchase: 'https://product.kyobobook.co.kr/detail/S000201281176' },
  { img: '/asserts/socks-game/socks-list/socks13png', title: '초딩때 책 빌렸다가 반납 못 했는데\n결국 제출 못한 연체카드 양말.', anal: '별 뜻 없이 한 말이나 행동이\n괜히 마음에 남을 수도 있어.\n너무 깊게 생각하지 말고 웃어 넘겨도 좋아.', purchase: 'https://product.kyobobook.co.kr/detail/S000201281176' },
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
