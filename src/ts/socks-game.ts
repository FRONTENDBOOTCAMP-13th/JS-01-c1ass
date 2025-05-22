// 로드되어야 할 이미지들
const imageUrls: string[] = ['/asserts/socks-game/label_404.png', '/asserts/socks-game/logo_sockast.png', '/asserts/socks-game/story_eng.png', '/asserts/socks-game/postBox.png', '/asserts/socks-game/check.svg', '/asserts/socks-game/paper-sound.aac', '/asserts/socks-game/paper1.png', '/asserts/socks-game/paper2.png', '/asserts/socks-game/paper3.png', '/asserts/socks-game/paper_package.png', '/asserts/socks-game/socks-list/socks1.png', '/asserts/socks-game/socks-list/socks2.png', '/asserts/socks-game/socks-list/socks3.png', '/asserts/socks-game/socks-list/socks4.png', '/asserts/socks-game/socks-list/socks5.png', '/asserts/socks-game/socks-list/socks6.png', '/asserts/socks-game/socks-list/socks7.png', '/asserts/socks-game/socks-list/socks8.png', '/asserts/socks-game/socks-list/socks9.png', '/asserts/socks-game/socks-list/socks10.png', '/asserts/socks-game/socks-list/socks11.png', '/asserts/socks-game/socks-list/socks12.png', '/asserts/socks-game/socks-list/socks13.png', '/asserts/socks-game/socks-list/socks14.png', '/asserts/socks-game/socks-list/socks15.png', '/asserts/socks-game/socks-list/socks16.png', '/asserts/socks-game/socks-list/socks17.png', '/asserts/socks-game/socks-list/socks18.png', '/asserts/socks-game/socks-list/socks19.png', '/asserts/socks-game/socks-list/socks20.png', '/asserts/socks-game/socks-list/socks21.png', '/asserts/socks-game/socks-list/socks22.png', '/asserts/socks-game/socks-list/socks23.png', '/asserts/socks-game/socks-list/socks24.png', '/asserts/socks-game/socks-list/socks25.png'];

// 리소스별 로딩 처리
function preloadResourceSocks(url: string): Promise<void> {
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
export async function startPreloadSocks() {
  const loading = document.getElementById('loading-screen');
  const mainScreen = document.getElementById('cover'); // 게임 시작 화면

  try {
    // 로딩 시작 시 보여주기
    loading?.classList.remove('hidden');

    // 모든 리소스 로딩
    await Promise.all(imageUrls.map(preloadResourceSocks));

    // 완료 후 전환
    loading?.remove();
    mainScreen?.classList.remove('hidden');
  } catch (err) {
    console.error('리소스 로딩 실패:', err);
    if (loading) loading.innerHTML = '<p class="text-red-500">로딩 실패 😢</p>';
  }
}

// 랜덤뽑기
const drawElement = document.getElementById('draw') as HTMLDivElement;
const drawContent = document.getElementById('draw-content') as HTMLDivElement;
const paperSound = new Audio('/asserts/socks-game/paper-sound.aac');
paperSound.volume = 0.5;

const bgImages = ['/asserts/socks-game/paper1.png', '/asserts/socks-game/paper2.png', '/asserts/socks-game/paper3.png', '/asserts/socks-game/paper_package.png'];
const socksItems = [
  { img: '/asserts/socks-game/socks-list/socks1.png', title: '어릴 적 악몽 괴물과 똑닮아\n집구석에 쳐박아놓은 눈알양말.', anal: '괜히 누가 날 지켜보는 기분이 들 수도.\n어. 뒤에 뭐가 움직였는데?', purchase: 'https://startknitting.org/booties/very-hungry-caterpillar-socks-knitting-patterns/' },
  { img: '/asserts/socks-game/socks-list/socks2.png', title: '방귀를 참다가 양말까지 내려가서\n부풀어버린 양말.', anal: '사소한 걸 참고 억지로 눌러 담지 말기.\n결국 이상한 데서 터집니다?', purchase: 'https://no6store.com/collections/accessories-socks-and-tights' },
  { img: '/asserts/socks-game/socks-list/socks3.png', title: '풍자용으로 샀는데 자서전이 되어버린 양말.', anal: '괜히 나만 어색한 느낌?\n신경 안 쓰려 해도 오늘따라 나만 동떨어진다 느낄 수 있음.', purchase: 'https://www.lotteon.com/p/product/LO2435542782?sitmNo=LO2435542782_2435542783&mall_no=1&dp_infw_cd=SCH%5E%5E%ED%8A%B8%EB%9F%BC%ED%94%84%EC%96%91%EB%A7%90&areaCode=SCH' },
  { img: '/asserts/socks-game/socks-list/socks4.png', title: '털을 달면 귀여울거라 생각했지만\n이런걸 기대하진 않았어 양말.', anal: '계획한 느낌은 아닌데 괜히 기억에 남는 하루가 될 지도!\n오늘만 P로 살아보는 건 어떤가용?', purchase: 'https://wear.jp/item/3687866/' },
  { img: '/asserts/socks-game/socks-list/socks5.png', title: '할머니의 보물창고에서 발견했는데,\n50년 전엔 꽤 비쌌을 것 같은 골동품 양말.', anal: '스쳐갈 것들 속에서\n묘하게 가치 있는 걸 발견할지도!', purchase: 'https://no6store.com/collections/accessories-socks-and-tights' },
  { img: '/asserts/socks-game/socks-list/socks6.png', title: '발레리나가 꿈이었을 수도 있잖아 양말.', anal: '평소와 같은 하루를 보내다\n나도 모르는 사이 시선집중 될 수도?', purchase: 'https://no6store.com/collections/accessories-socks-and-tights' },
  { img: '/asserts/socks-game/socks-list/socks7.png', title: '더운데 벗긴 싫어서\n과감히 발등에 구멍 뚫어버린 양말.', anal: '뭐 하나 마음에 안 들긴 하는데,\n 그렇다고 새로 시작하긴 귀찮을 지도.', purchase: 'https://www.ebay.com/itm/356689822053?_trkparms=amclksrc%3DITM%26aid%3D1110006%26algo%3DHOMESPLICE.SIM%26ao%3D1%26asc%3D286129%2C286025%2C286089%26meid%3D9268a3ec88ce4746917cc1c16f8d58ac%26pid%3D101224%26rk%3D1%26rkt%3D5%26sd%3D225500596973%26itm%3D356689822053%26pmt%3D0%26noa%3D1%26pg%3D2332490%26algv%3DDefaultOrganicWebV9BertRefreshRankerWithCassiniEmbRecall%26brand%3DUnbranded&_trksid=p2332490.c101224.m-1' },
  { img: '/asserts/socks-game/socks-list/socks8.png', title: '샌들은 신고 싶은데\n발이 못생겼을 때 신는 양말.', anal: '하고 싶은 마음과 하기 싫은 마음이\n한짝씩 섞여 있는 하루.', purchase: 'https://www.amazon.in/Fascigirl-Women-Simulated-Cotton-Casual/dp/B07VDKQ7VV' },
  { img: '/asserts/socks-game/socks-list/socks9.png', title: '아빠가 해외여행 가서 웃기다며 사 온 양말.', anal: '웃기려고 한 건 맞는데\n진심처럼 받아들여질 수 있는 하루.\n선을 지키는게 필요함!', purchase: 'https://www.amazon.in/Fascigirl-Women-Simulated-Cotton-Casual/dp/B07VDKQ7VV' },
  { img: '/asserts/socks-game/socks-list/socks10.png', title: '나 대신 멍 때려주는 문어 양말.', anal: '생각이 많은 날.\n표정관리까진 안 될 수 있음.', purchase: 'https://sumally.com/' },
  { img: '/asserts/socks-game/socks-list/socks11.png', title: '한 번 신으면 빨아도\n계속 찾게 되는 애착 별 양말.', anal: '선택을 해야 하는 날인데\n결국 익숙한 걸 찾게 될지도 몰라.', purchase: 'https://www.ae.com/us/en/c/women/accessories-socks/socks/cat6180024?redirectedFrom=plp' },
  { img: '/asserts/socks-game/socks-list/socks12.png', title: '초딩때 책 빌렸다가 반납 못 했는데\n결국 제출 못한 연체카드 양말.', anal: '별 뜻 없이 한 말이나 행동이\n괜히 마음에 남을 수도 있어.\n너무 깊게 생각하지 말자!!!', purchase: 'https://product.kyobobook.co.kr/detail/S000201281176' },
  { img: '/asserts/socks-game/socks-list/socks13.png', title: '어떻게든 버리진 않았더니\n에스토니아 박물관까지 간 양말.', anal: '별 대단한 일은 안했는데\n나중에 그럴싸하게 포장할 수 있는 하루가 될지도?', purchase: 'https://www.muis.ee/museaalview/470765' },
  { img: '/asserts/socks-game/socks-list/socks14.png', title: '옷은 명품으로 준비해서\n부족한 예산으로 준비한 산타 양말.', anal: '준비는 열심히 했는데\n딱 하나 부족한 게 자꾸 눈에 밟히는 날.', purchase: 'https://www.temu.com/kr/1-%EC%8C%8D%EC%9D%98-%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4-%EC%82%B0%ED%83%80-%EC%82%AC%EC%8A%B4-%EB%88%88%EC%86%A1%EC%9D%B4-%EC%9E%90%EC%88%98-%EC%96%91%EB%A7%90-%EB%B6%80%EB%93%9C%EB%9F%AC%EC%9A%B4-%ED%8E%B8%EC%95%88%ED%95%9C-%EC%9C%A0%ED%96%89-%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%A4%91%EA%B0%84-%ED%8A%9C%EB%B8%8C-%EC%96%91%EB%A7%90-g-601099526606475.html?top_gallery_url=https%3A%2F%2Fimg.kwcdn.com%2Fproduct%2Fopen%2F2023-09-17%2F1694923065417-418539836df049ab9610b10a19173eb0-goods.jpeg&spec_gallery_id=2031673510&share_token=NqwxDyJwQzmU7PIsUeSuijAxbpfOc9bwelRbyxv_ewfYkVgVLjXSlaf1lDTM7wNSJ9s1S0nZ0Cyx0p9y9wtAVjmcLMlx4w1_TERIjsPaq1Np8-cPYRixhDwj4U92j2tLPDe5RIEKyJQV8_srKgAvdAFzuDAgi3mejI-Jd4fW_CJ&refer_page_el_sn=209279&_x_vst_scene=adg&_x_ads_channel=pinterest&_x_ads_creative_id=4260608653576&_x_ads_id=2680082619032&_x_ads_set=626753426557&_x_ads_sub_channel=shopping&_x_ns_catalog_id=1531572374380&_x_ns_creative=4260608653576&_x_ns_product_id=17592260983607&_x_ns_prz_type=101&refer_page_name=kuiper&refer_page_id=14021_1747753406113_geozxzh4yr&refer_page_sn=14021&_x_sessn_id=5ytczokj2r' },
  { img: '/asserts/socks-game/socks-list/socks15.png', title: '쉴 거면 확실히 쉬자는\n워라벨 인간의 양말.', anal: '아무것도 안 하고 쉴랬지만 이상하게 바쁜 날.\n편하게 쉬는 연습이 필요해!', purchase: 'https://www.worldmarket.com/p/light-blue-rest-relax-repeat-grippy-women-s-travel-socks-627327.html?camp=sp%3Apinterest%3A2023_daba_purchase_conversion_broad_holiday&epik=dj0yJnU9QkhsZGlhaDhpd3pEeGJ4Tzh1YXVQYnh5U2doTUI0VjkmcD0wJm49MWJCbUUyM1pCTlVFaUZhSjFOMTBjdyZ0PUFBQUFBR2dzbjJj' },
  { img: '/asserts/socks-game/socks-list/socks16.png', title: '시장 구경하다 시강이어서 쳐다봤는데\n분위기에 휩쓸려 사버린 양말.', anal: '그땐 나름 이유가 있었는데\n막상 하고 나니 조금 후회되는 경험을 할지도.', purchase: 'https://www.temu.com/kr/1-%EC%8C%8D%EC%9D%98-%EB%82%A8%EC%84%B1%EC%9A%A9-%ED%8A%B8%EB%A0%8C%EB%94%94%ED%95%9C-%EC%B9%B4%ED%88%B0-%ED%8E%98%ED%8D%BC-%ED%8C%A8%ED%84%B4-%ED%81%AC%EB%A3%A8-%EC%96%91%EB%A7%90-%EB%A9%B4-%EC%88%A8%EA%B8%B0-%ED%8E%B8%EC%95%88%ED%95%9C-%EC%BA%90%EC%A3%BC%EC%96%BC-%EC%9C%A0%EB%8B%88%EC%84%B9%EC%8A%A4-%EC%96%91%EB%A7%90-%EB%82%A8%EC%84%B1%EC%9A%A9-%EC%95%84%EC%9B%83%EB%8F%84%EC%96%B4-%EC%B0%A9%EC%9A%A9%EC%9A%A9-%EB%AA%A8%EB%93%A0-%EA%B3%84%EC%A0%88-%EC%B0%A9%EC%9A%A9%EC%9A%A9-%EC%8A%A4%ED%8A%B8%EB%A6%AC%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-g-601099537034950.html?top_gallery_url=https%3A%2F%2Fimg.kwcdn.com%2Fproduct%2FFancyalgo%2FVirtualModelMatting%2F93fc6c6047b8a733a1187fb0b3d0447c.jpg&spec_gallery_id=2066209850&share_token=NqwxDyJwQzmU7PIsUeSuijAxbpfOc9bwelRbyxv_ewffSckHTxMCmb5bXn8bT39WwrfnjBoIEOcB5Iv_5BgJECjstODMXFyoQdzaPXTdINagzohYZ4AV3-ckRuKtDWAyWjG0uADBYRoA59mOkc2saMVR5Vts6wXQVJDDQnOOVLS&refer_page_el_sn=209279&_x_vst_scene=adg&_x_ads_channel=pinterest&_x_ads_creative_id=4260608653576&_x_ads_id=2680082619032&_x_ads_set=626753426557&_x_ads_sub_channel=shopping&_x_ns_catalog_id=1531572374380&_x_ns_creative=4260608653576&_x_ns_product_id=17592302520537&_x_ns_prz_type=101&refer_page_name=kuiper&refer_page_id=14021_1747755479268_wkyw3romkk&refer_page_sn=14021&_x_sessn_id=w6vi901orf' },
  { img: '/asserts/socks-game/socks-list/socks17.png', title: '감정 정리 못 하고 나온 날\n짝짝이로 신어버린 지킬앤하이드 양말.', anal: '나도 내가 왜 이러는지 잘 모르겠는 날.\n기분이랑 행동이 따로 놀 수도 있지만 절대 이상한 거 아님.', purchase: 'https://smartstore.naver.com/montonkorea/products/10008398183' },
  { img: '/asserts/socks-game/socks-list/socks18.png', title: '회고 7조가 신어야 하는 양말.\n선영님 공구 부탁드려요', anal: 'chill하게 보낼 수 있는 날.\n오늘만 명예 7조로 껴줌.', purchase: 'https://www.etsy.com/listing/1829652244/chill-guy-meme-socks-funny-all-over' },
  { img: '/asserts/socks-game/socks-list/socks19.png', title: '승균님의 따봉 양말.', anal: '굉장한 행운이 있는 날.\n따봉 발가락 실물영접할 수 있는 날.', purchase: 'https://github.com/seuchoi0531' },
  { img: '/asserts/socks-game/socks-list/socks20.png', title: '싸이코 양말 같은데\n알고 보면 유기농인 양말.', anal: '항상 날서 있지 말기. 표정 구린 사람도 알고보면\n고양이를 생각하며 행복해하는 걸지도?', purchase: 'https://www.chattyfeet.com/products/organic-socks-artist-feetasso' },
  { img: '/asserts/socks-game/socks-list/socks21.png', title: '술 약속 있는 날\n내기에서 진 사람이 신을 양말.', anal: '내가 주도하지 않았지만\n내가 중심에 있는 날.', purchase: 'https://www.amazon.com/Animal-Novelty-Crocodile-Christmas-Creative/dp/B09MLQFW4P?ref_=pinterest_fplfs&th=1&psc=1' },
  { img: '/asserts/socks-game/socks-list/socks22.png', title: '컨닝하려다 쥐날 것 같은 양말.', anal: '괜히 준비 많이 한 티 내고 싶은 날.\n정작 필요한 순간에 쓰이지 못할 수도...', purchase: 'https://www.amazon.ae/KASTWAVE-Cotton-Funny-Dress-Socks/dp/B0BZCPDDZ8' },
  { img: '/asserts/socks-game/socks-list/socks23.png', title: '엄지발가락만 추울 때 신는 양말.', anal: '진짜 괜찮은데 자꾸 누가 뭘 더 해주려는 날.\n난 혼자가 좋아...', purchase: 'https://m.vieetmaison.com/product/%EB%B2%A0%EC%9D%B4%EB%B9%84-%EC%BD%94%ED%8A%BC-%EC%95%84%EA%B8%B0-%EC%96%91%EB%A7%90/1075/' },
  { img: '/asserts/socks-game/socks-list/socks24.png', title: '귀엽도록 의도했는데\n불쾌한 골짜기가 돼버린 젖소양말.', anal: '내가 봐도 이상한 건 알겠는데\n괜히 그 이상한 거 하나에 꽂히는 날.', purchase: 'https://www.amazon.com/K-Bell-Socks-Womens-Multi/dp/B0053O3GEK/ref=sr_1_39?s=apparel&ie=UTF8&qid=1332286993&sr=1-39' },
  { img: '/asserts/socks-game/socks-list/socks25.png', title: '체리 냄새가 날 것 같은데\n딸기 냄새가 나는 양말', anal: '누군가는 실수라 부를지 몰라도\n오히려 마음에 드는 결과를 불러올지도 몰라!', purchase: 'https://kr.shein.com/2%EC%BC%A4%EB%A0%88-%EA%B3%A0%ED%92%88%EC%A7%88-%EC%9C%A0%EB%8B%88%EC%84%B9%EC%8A%A4-%EC%9E%AC%EB%AF%B8%EC%9E%88%EB%8A%94-%EC%B2%B4%EB%A6%AC-%ED%8C%A8%ED%84%B4-%EC%96%91%EB%A7%90,-%ED%8E%B8%EC%95%88%ED%95%98%EA%B3%A0-%EB%B6%80%EB%93%9C%EB%9F%AC%EC%9A%B4-%EB%94%94%EC%9E%90%EC%9D%B8-p-71750047.html?mallCode=1' },
];

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
