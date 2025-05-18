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

// 카드 오브젝트
const cardItems: Item[] = [
  { name: '활', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/bow.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '검', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/sword.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '방패', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/shield.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '창', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/spear.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '거미', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/spider.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '모닝스타', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/morning-star.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '지팡이', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/cane.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '들개', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/dog.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '유령', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/ghost.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '쥐', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/rat.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '마법소녀 뾰로롱', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/wand.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '똥! ㅋㅋ', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/poo.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '고블린', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/goblin.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '달팽이', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/snail.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '버섯', rarity: 'N', rate: 70, images: '../../public/asserts/card/img/n/mushroom.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '드래곤', rarity: 'R', rate: 15, images: '../../public/asserts/card/img/r/dragon.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '유니콘', rarity: 'R', rate: 15, images: '../../public/asserts/card/img/r/unicorn.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '사신', rarity: 'R', rate: 15, images: '../../public/asserts/card/img/r/reaper.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '곰', rarity: 'R', rate: 15, images: '../../public/asserts/card/img/r/bear.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '오크', rarity: 'R', rate: 15, images: '../../public/asserts/card/img/r/ork.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '공듀', rarity: 'SR', rate: 10, images: '../../public/asserts/card/img/sr/princess.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '베리 하츄핑', rarity: 'SR', rate: 10, images: '../../public/asserts/card/img/sr/ping.svg', audio: '../../public/asserts/card/audio/ping' },
  { name: '신데렐라', rarity: 'SR', rate: 10, images: '../../public/asserts/card/img/sr/cinderella.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '엘사', rarity: 'SR', rate: 10, images: '../../public/asserts/card/img/sr/elsa.svg', audio: '../../public/asserts/card/audio/card-draw' },
  { name: '봄바르디로 크로코딜로', rarity: 'SSR', rate: 5, images: '../../public/asserts/card/img/ssr/croco.svg', audio: '../../public/asserts/card/audio/croco' },
  { name: '트랄랄레로 트랄랄라', rarity: 'SSR', rate: 5, images: '../../public/asserts/card/img/ssr/trala.svg', audio: '../../public/asserts/card/audio/trala' },
  { name: '퉁 퉁 퉁 퉁 퉁 퉁 퉁 퉁 퉁 사후르', rarity: 'SSR', rate: 5, images: '../../public/asserts/card/img/ssr/tung.svg', audio: '../../public/asserts/card/audio/tung' },
  { name: '브르르 브르르 파타핌', rarity: 'SSR', rate: 5, images: '../../public/asserts/card/img/ssr/brr.svg', audio: '../../public/asserts/card/audio/brr' },
  { name: '침판지니 바나니니', rarity: 'SSR', rate: 5, images: '../../public/asserts/card/img/ssr/banana.svg', audio: '../../public/asserts/card/audio/banana' },
];

// 초기 로드 시 localStorage에서 티켓 수량 불러오기
let ticketQuantity = document.querySelector('#ticket-quantity');
if (ticketQuantity) {
  const savedTicket = localStorage.getItem('ticket');
  ticketQuantity.textContent = savedTicket ?? '10';
}

let clickCount = document.querySelector('#click-count');
let getTicketButton = document.querySelector('#get-ticket-button');

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
        <img src="/asserts/card/img/card-back.svg" class="card-back w-full h-full object-cover rounded-lg" />
        <img src="${item.images}" class="card-front w-full h-full object-cover rounded-lg" />
      </div>
    `;

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

  if (item.audio) {
    const audio = new Audio(item.audio + '.mp3');
    audio.play().catch(err => console.error('오디오 재생 실패:', err));
    card.dataset.played = 'true';
  }

  // 이미 존재하는지 체크 후 없으면 추가
  const exists = collection.some(col => col.name === item.name);
  if (!exists) {
    collection.push({ name: item.name, rarity: item.rarity, images: item.images });
    localStorage.setItem('collection', JSON.stringify(collection));
  }
}

// 컬렉션 보기 버튼 처리
const viewCollectionButton = document.querySelector('#view-collection');

viewCollectionButton?.addEventListener('click', () => {
  const list = collection
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

  // 컬렉션 모달
  const modal = document.createElement('div');
  modal.className = 'close-modal fixed inset-0 flex justify-center items-center bg-white/50';
  modal.innerHTML = `
    <div class="bg-white p-6 w-[70%] h-[70%] overflow-y-auto rounded-2xl shadow-2xl border-1 border-gray-200">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold mb-5">내 컬렉션</h2>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">${list}</div>
    </div>
  `;

  document.body.appendChild(modal);

  document.querySelector('.close-modal')?.addEventListener('click', () => {
    modal.remove();
  });
});
