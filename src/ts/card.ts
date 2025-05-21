type Rarity = 'N' | 'R' | 'SR' | 'SSR';

interface Item {
  name: string;
  rarity: Rarity;
  rate: number;
  images: string;
  audio?: string;
}

interface CollectionItem {
  name: string;
  rarity: Rarity;
  images: string;
}

const cardImgPath: string = '/asserts/card/img';
const cardAudioPath: string = '/asserts/card/audio';

// 카드 오브젝트
const cardItems: Item[] = [
  { name: '활', rarity: 'N', rate: 70, images: `${cardImgPath}/n/bow.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '검', rarity: 'N', rate: 70, images: `${cardImgPath}/n/sword.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '방패', rarity: 'N', rate: 70, images: `${cardImgPath}/n/shield.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '창', rarity: 'N', rate: 70, images: `${cardImgPath}/n/spear.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '거미', rarity: 'N', rate: 70, images: `${cardImgPath}/n/spider.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '모닝스타', rarity: 'N', rate: 70, images: `${cardImgPath}/n/morning-star.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '지팡이', rarity: 'N', rate: 70, images: `${cardImgPath}/n/cane.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '들개', rarity: 'N', rate: 70, images: `${cardImgPath}/n/dog.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '유령', rarity: 'N', rate: 70, images: `${cardImgPath}/n/ghost.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '쥐', rarity: 'N', rate: 70, images: `${cardImgPath}/n/rat.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '마법소녀 뾰로롱', rarity: 'N', rate: 70, images: `${cardImgPath}/n/wand.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '똥! ㅋㅋ', rarity: 'N', rate: 70, images: `${cardImgPath}/n/poo.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '고블린', rarity: 'N', rate: 70, images: `${cardImgPath}/n/goblin.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '달팽이', rarity: 'N', rate: 70, images: `${cardImgPath}/n/snail.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '버섯', rarity: 'N', rate: 70, images: `${cardImgPath}/n/mushroom.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '드래곤', rarity: 'R', rate: 15, images: `${cardImgPath}/r/dragon.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '유니콘', rarity: 'R', rate: 15, images: `${cardImgPath}/r/unicorn.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '사신', rarity: 'R', rate: 15, images: `${cardImgPath}/r/reaper.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '곰', rarity: 'R', rate: 15, images: `${cardImgPath}/r/bear.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '오크', rarity: 'R', rate: 15, images: `${cardImgPath}/r/ork.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '공듀', rarity: 'SR', rate: 10, images: `${cardImgPath}/sr/princess.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '베리 하츄핑', rarity: 'SR', rate: 10, images: `${cardImgPath}/sr/ping.svg`, audio: `${cardAudioPath}/ping` },
  { name: '신데렐라', rarity: 'SR', rate: 10, images: `${cardImgPath}/sr/cinderella.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '엘사', rarity: 'SR', rate: 10, images: `${cardImgPath}/sr/elsa.svg`, audio: `${cardAudioPath}/card-draw` },
  { name: '봄바르디로 크로코딜로', rarity: 'SSR', rate: 5, images: `${cardImgPath}/ssr/croco.svg`, audio: `${cardAudioPath}/croco` },
  { name: '트랄랄레로 트랄랄라', rarity: 'SSR', rate: 5, images: `${cardImgPath}/ssr/trala.svg`, audio: `${cardAudioPath}/trala` },
  { name: '퉁 퉁 퉁 퉁 퉁 퉁 퉁 퉁 퉁 사후르', rarity: 'SSR', rate: 5, images: `${cardImgPath}/ssr/tung.svg`, audio: `${cardAudioPath}/tung` },
  { name: '브르르 브르르 파타핌', rarity: 'SSR', rate: 5, images: `${cardImgPath}/ssr/brr.svg`, audio: `${cardAudioPath}/brr` },
  { name: '침판지니 바나니니', rarity: 'SSR', rate: 5, images: `${cardImgPath}/ssr/banana.svg`, audio: `${cardAudioPath}/banana` },
];
// document.addEventListener('click', () => {
//   window.parent.postMessage('iframeClicked', 'card');
// });

// 이미지 미리 불러오기
const preloadImages = () => {
  cardItems.forEach(item => {
    const img = new Image();
    img.src = item.images;
  });

  const cardBack = new Image();
  cardBack.src = '/asserts/card/img/card-back.svg';
};

// 오디오 미리 불러오기
const preloadAudio = () => {
  const audioSet = new Set<string>(); // 중복 방지용

  cardItems.forEach(item => {
    if (item.audio && !audioSet.has(item.audio)) {
      const audio = new Audio();
      audio.src = item.audio + '.mp3';
      audio.load();
      audioSet.add(item.audio);
    }
  });
};

// 실행
preloadImages();
preloadAudio();

// 초기 로드 시 localStorage에서 티켓 수량 불러오기
const ticketQuantity = document.querySelector('#ticket-quantity');
if (ticketQuantity) {
  const savedTicket = localStorage.getItem('ticket');
  ticketQuantity.textContent = savedTicket ?? '10';
}

const clickCount = document.querySelector('#click-count');
const getTicketButton = document.querySelector('#get-ticket-button');

if (clickCount && getTicketButton && ticketQuantity) {
  const savedClick = localStorage.getItem('clickCount');
  clickCount.textContent = savedClick ?? '10';

  // 클릭 카운트 관련 함수
  getTicketButton.addEventListener('click', () => {
    const currentCount = parseInt(clickCount.textContent || '0');
    const newCount = currentCount - 1;
    clickCount.textContent = newCount.toString();
    localStorage.setItem('clickCount', newCount.toString());

    if (newCount === 0) {
      const currentTicket = parseInt(ticketQuantity.textContent || '0');
      const newTicket = currentTicket + 1;
      ticketQuantity.textContent = newTicket.toString();
      localStorage.setItem('ticket', newTicket.toString());

      clickCount.textContent = '10';
      localStorage.setItem('clickCount', '10');
    }
  });
}

const cardContainer = document.getElementById('card-container');
const drawButton = document.getElementById('draw-button');

drawButton?.addEventListener('click', () => {
  if (!cardContainer || !ticketQuantity) return;
  const currentTicket = parseInt(ticketQuantity.textContent || '0');

  // 티켓이 없으면 경고 메시지 띄우고 리턴
  if (currentTicket <= 0) {
    alert('티켓이 부족합니다!');
    return;
  }

  ticketQuantity.textContent = (currentTicket - 1).toString();
  localStorage.setItem('ticket', ticketQuantity.textContent);

  // 티켓 감소
  ticketQuantity.textContent = (currentTicket - 1).toString();

  // 기존 카드 제거
  cardContainer.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const item = getRandomItem();

    let rateClass = '';
    if (item.rarity === 'N') rateClass = 'border-4 border-[#9D7E69] bg-[#9D7E69]';
    else if (item.rarity === 'R') rateClass = 'border-4 border-[#FE71F3] bg-[#FE71F3]';
    else if (item.rarity === 'SR') rateClass = 'border-4 border-[#FFD963] bg-[#FFD963]';
    else if (item.rarity === 'SSR') rateClass = 'border-4 border-[#75008D]  bg-gradient-to-r from-[#EF4EFE] via-[#EF4EFE] to-[#66CDE3]';

    const card = document.createElement('div');
    card.className = `card sm:w-[4rem] sm:h-[6rem] lg:w-[11rem] lg:h-[15rem] relative cursor-pointer rounded-xl ${rateClass}`;

    card.innerHTML = `
      <div class="card-inner w-full h-full">
        <img src="/asserts/card/img/card-back.svg" tabindex="0" class="card-back w-full h-full object-cover rounded-lg" />
        <img src="${item.images}" class="card-front w-full h-full object-cover rounded-lg" />
      </div>
    `;

    const cardBack = card.querySelector('.card-back') as HTMLElement;

    // 키보드 Enter/Space로 뒤집기
    cardBack?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // 스페이스바의 기본 스크롤 방지
        card.classList.add('flipped');
        handleCardClick(card, item);
      }
    });

    card.addEventListener('click', () => {
      card.classList.add('flipped');
      handleCardClick(card, item);
      if (card.dataset.played === 'true') return;

      if (item.audio) {
        const audio = new Audio(item.audio + '.mp3');
        audio.play().catch(err => console.error('오디오 재생 실패:', err));
        card.dataset.played = 'true';
      }
    });

    cardContainer.appendChild(card);
  }
});

// 뽑기 및 확률계산
function getRandomItem(): Item {
  const totalRate = cardItems.reduce((acc, item) => acc + item.rate, 0);
  const rand = Math.random() * totalRate;

  let sum = 0;
  for (const item of cardItems) {
    sum += item.rate;
    if (rand <= sum) {
      return item;
    }
  }

  // 예외 방지용
  return cardItems[0];
}

// 컬렉션 저장용 배열
let collection: CollectionItem[] = [];

// localStorage에서 불러오기
const savedCollection = localStorage.getItem('collection');
if (savedCollection) {
  try {
    collection = JSON.parse(savedCollection);
  } catch (e) {
    console.error('컬렉션 파싱 오류:', e);
    collection = [];
  }
}

// 카드 클릭 이벤트에 컬렉션 저장 추가
function handleCardClick(card: HTMLElement, item: Item) {
  card.classList.add('flipped');

  if (card.dataset.played === 'true') return;

  // 이미 존재하는지 체크 후 없으면 추가
  const exists = collection.some(col => col.name === item.name);
  if (!exists) {
    collection.push({ name: item.name, rarity: item.rarity, images: item.images });
    localStorage.setItem('collection', JSON.stringify(collection));
  }
}

// 컬렉션 보기 버튼 처리
const viewCollectionButton = document.querySelector('#view-collection');
const collectionModal = document.getElementById('collection-modal');
const closeModalButton = document.getElementById('close-modal');
const collectionGrid = document.getElementById('collection-grid');

viewCollectionButton?.addEventListener('click', () => {
  if (!collectionGrid || !collectionModal) return;

  collectionGrid.innerHTML = collection
    .map(item => {
      let borderClass = '';
      if (item.rarity === 'N') borderClass = 'border-[#9D7E69] border-4';
      else if (item.rarity === 'R') borderClass = 'border-[#FE71F3] border-4';
      else if (item.rarity === 'SR') borderClass = 'border-[#FFD963] border-4';
      else if (item.rarity === 'SSR') borderClass = 'border-[#75008D] border-4';

      return `
        <div class="border rounded-lg flex flex-col justify-between items-center ${borderClass}">
          <img src="${item.images}" class="w-full h-auto mb-2 rounded-t-sm" />
          <p class="text-sm text-center mb-2">${item.name}</p>
        </div>
      `;
    })
    .join('');

  collectionModal?.classList.remove('hidden');
  collectionModal?.classList.add('flex');
});

closeModalButton?.addEventListener('click', () => {
  collectionModal?.classList.remove('flex');
  collectionModal?.classList.add('hidden');
});

// 바깥 영역 클릭 시 모달 닫기
collectionModal?.addEventListener('click', event => {
  // 클릭한 대상이 모달 그 자체(배경)일 때만 닫기
  if (event.target === collectionModal) {
    collectionModal.classList.remove('flex');
    collectionModal.classList.add('hidden');
  }
});

// 로딩창 요소
const cardLoadingScreen = document.getElementById('card-loading-screen');

// 이미지 로딩을 Promise로 감싸기
function loadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Image load error: ${src}`));
  });
}

// 오디오 로딩을 Promise로 감싸기
function loadAudio(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = src + '.mp3';
    audio.oncanplaythrough = () => resolve();
    audio.onerror = () => reject(new Error(`Audio load error: ${src}`));
    audio.load();
  });
}

// 모든 이미지, 오디오 미리 불러오기 함수
async function preloadAssets() {
  try {
    const imagePromises = cardItems.map(item => loadImage(item.images));
    const audioPromises = cardItems.filter(item => item.audio).map(item => loadAudio(item.audio!));

    // 로딩창 보이기
    cardLoadingScreen?.classList.remove('hidden');

    // 모두 기다리기
    await Promise.all([...imagePromises, ...audioPromises]);
  } catch (error) {
    console.error(error);
  } finally {
    // 로딩창 숨기기
    cardLoadingScreen?.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  preloadAssets(); // 호출
});
