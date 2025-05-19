const drawElement = document.getElementById('draw') as HTMLDivElement;
const drawContent = document.getElementById('draw-content') as HTMLDivElement;

const bgImages = ['/asserts/socks-game/paper1.png', '/asserts/socks-game/paper2.png', '/asserts/socks-game/paper3.png', '/asserts/socks-game/paper_package.png'];
const socksItems = [
  { img: '/asserts/socks-game/socks-list/socks1.png', title: '선물로 받았는데 어릴 적 악몽 괴물과 똑닮아 집구석에 쳐박아놓은 눈알양말', anal: '괜히 누가 날 지켜보는 기분. 신경이 곤두설지도?', purchase: 'https://startknitting.org/booties/very-hungry-caterpillar-socks-knitting-patterns/' },
  { img: '/asserts/socks-game/socks-list/socks2.png', title: '방귀를 참다가 양말까지 내려간 방귀에 부풀어버린 양말', anal: '사소한 걸 참고 억지로 눌러 담지 말기. 결국 이상한 데서 터집니다?', purchase: 'https://no6store.com/collections/accessories-socks-and-tights' },
  { img: '/asserts/socks-game/socks-list/socks3.png', title: '풍자용으로 샀는데 자서전이 되어버린 양말', anal: '괜히 나만 어색한 느낌? 신경 안 쓰려해도 뭔가 안 맞게 느껴질 수 있음ㅠ', purchase: 'https://www.lotteon.com/p/product/LO2435542782?sitmNo=LO2435542782_2435542783&mall_no=1&dp_infw_cd=SCH%5E%5E%ED%8A%B8%EB%9F%BC%ED%94%84%EC%96%91%EB%A7%90&areaCode=SCH' },
];

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
        const randomSock = socksItems[Math.floor(Math.random() * socksItems.length)];

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

function paperSoundEffect() {
  const paperSound = new Audio('/asserts/socks-game/paper-sound.aac');
  paperSound.volume = 0.5;
  paperSound.play();
}
