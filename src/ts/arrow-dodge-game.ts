console.log('극한의 화살 피하기 TypeScript 로직 시작');

// 타입 정의
interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Projectile {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  color: string;
}

interface KeysPressed {
  [key: string]: boolean;
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded: 게임 설정 및 초기화 시작');

  // --- HTML 요소 가져오기 ---
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement | null;
  const scoreBoard = document.getElementById('scoreBoard') as HTMLDivElement | null;
  const difficultyLevelEl = document.getElementById('difficultyLevel') as HTMLDivElement | null;
  const uiContainer = document.getElementById('ui-container') as HTMLDivElement | null;
  const gameContainer = document.getElementById('game-container') as HTMLDivElement | null; // 반응형 크기 조절용

  const startScreenEl = document.getElementById('startScreen') as HTMLDivElement | null;
  const startButton = document.getElementById('startButton') as HTMLButtonElement | null;
  const gameOverMessageEl = document.getElementById('gameOverMessage') as HTMLDivElement | null;
  const finalScoreEl = document.getElementById('finalScore') as HTMLSpanElement | null;
  const restartButton = document.getElementById('restartButton') as HTMLButtonElement | null;

  // --- 필수 요소 확인 ---
  if (!canvas || !scoreBoard || !difficultyLevelEl || !uiContainer || !gameContainer || !startScreenEl || !startButton || !gameOverMessageEl || !finalScoreEl || !restartButton) {
    console.error('CRITICAL ERROR: 필수 HTML 요소 중 하나 이상을 찾을 수 없습니다. HTML ID를 확인하세요.');
    alert('게임 실행에 필요한 중요 HTML 요소를 찾을 수 없습니다! 개발자 콘솔을 확인해주세요.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('CRITICAL ERROR: 2D 렌더링 컨텍스트를 가져올 수 없습니다.');
    alert('게임 실행 오류: 캔버스 컨텍스트를 가져올 수 없습니다!');
    return;
  }
  console.log('모든 필수 HTML 요소 정상적으로 찾음.');

  // --- 게임 상수 및 설정 ---
  const BASE_CANVAS_WIDTH: number = 1120;
  const BASE_CANVAS_HEIGHT: number = 630;
  const PLAYER_WIDTH: number = 25;
  const PLAYER_HEIGHT: number = 25;
  const PLAYER_SPEED: number = 5;
  const PLAYER_COLOR: string = '#00FFFF'; // 플레이어 색상

  // --- 게임 상태 변수 ---
  let currentCanvasWidth: number = BASE_CANVAS_WIDTH;
  let currentCanvasHeight: number = BASE_CANVAS_HEIGHT;
  let player: Player;
  let projectiles: Projectile[] = [];
  let score: number = 0;
  let gameOver: boolean = true; // 초기에는 게임오버(시작 전) 상태
  let gameStarted: boolean = false; // 게임이 실제로 플레이 시작되었는지 여부
  let gameLoopId: number | undefined;
  let frameCount: number = 0;

  // 난이도 관련 변수
  let difficultyLevel: number = 1;
  let projectileBaseSpeed: number = 2.0;
  let projectileSpawnInterval: number = 90; // 프레임 (숫자가 작을수록 자주 생성)
  let maxProjectiles: number = 3;
  let lastScoreForDifficultyUpdate: number = 0;

  // --- 유틸리티 함수 ---
  function distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function showElement(element: HTMLElement): void {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
    if (getComputedStyle(element).display === 'none') {
      element.style.display = 'flex';
    }
  }

  function hideElement(element: HTMLElement): void {
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
  }

  // --- 캔버스 크기 조절 ---
  function resizeCanvas(): void {
    const aspectRatio: number = BASE_CANVAS_WIDTH / BASE_CANVAS_HEIGHT;
    let newWidth: number = window.innerWidth * 0.95;
    let newHeight: number = window.innerHeight * 0.85;

    if (newWidth / newHeight > aspectRatio) {
      newWidth = newHeight * aspectRatio;
    } else {
      newHeight = newWidth / aspectRatio;
    }

    newWidth = Math.min(newWidth, BASE_CANVAS_WIDTH);
    newHeight = Math.min(newHeight, BASE_CANVAS_HEIGHT);
    newWidth = Math.max(newWidth, 300); // 최소 너비
    newHeight = Math.max(newHeight, newWidth / aspectRatio); // 비율에 따른 최소 높이

    const finalWidth = Math.floor(newWidth);
    const finalHeight = Math.floor(newHeight);

    if (canvas!.width !== finalWidth || canvas!.height !== finalHeight) {
      currentCanvasWidth = finalWidth;
      currentCanvasHeight = finalHeight;
      canvas!.width = currentCanvasWidth;
      canvas!.height = currentCanvasHeight;

      gameContainer!.style.width = `${currentCanvasWidth}px`;
      uiContainer!.style.width = `${currentCanvasWidth}px`;
      console.log(`캔버스 크기 재설정: ${canvas!.width}x${canvas!.height}`);

      if (gameStarted && !gameOver) {
        initGame();
      } else {
        draw();
      }
    }
  }

  // --- 게임 초기화 ---
  function initGame(): void {
    console.log('initGame: 게임 초기화 및 시작');
    player = {
      // 플레이어 객체 새로 생성 또는 값 재할당
      x: currentCanvasWidth / 2 - PLAYER_WIDTH / 2,
      y: currentCanvasHeight / 2 - PLAYER_HEIGHT / 2, // 중앙 시작
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      color: PLAYER_COLOR,
    };
    projectiles = [];
    score = 0;
    difficultyLevel = 1;
    projectileBaseSpeed = 2.0;
    projectileSpawnInterval = 90;
    maxProjectiles = 3;
    frameCount = 0;
    lastScoreForDifficultyUpdate = 0;

    gameOver = false;
    gameStarted = true;

    updateDifficultyDisplay();
    hideElement(startScreenEl!);
    hideElement(gameOverMessageEl!);

    if (gameLoopId) {
      cancelAnimationFrame(gameLoopId);
      console.log('이전 게임 루프 취소');
    }
    gameLoopId = requestAnimationFrame(gameLoop);
    console.log('initGame: 새 게임 루프 시작됨. ID:', gameLoopId);
  }

  // --- UI 업데이트 ---
  function updateDifficultyDisplay(): void {
    scoreBoard!.textContent = `점수: ${score}`;
    difficultyLevelEl!.textContent = `난이도: ${difficultyLevel}`;
  }

  function increaseDifficulty(): void {
    difficultyLevel++;
    projectileBaseSpeed += 0.4; // 난이도 상승폭 조절 가능
    if (projectileSpawnInterval > 15) projectileSpawnInterval -= 7; // 생성 간격 감소폭 조절
    if (maxProjectiles < 25) maxProjectiles += 1;
    updateDifficultyDisplay();
    console.log(`난이도 ${difficultyLevel} 상승! 속도기반: ${projectileBaseSpeed.toFixed(1)}, 생성간격: ${projectileSpawnInterval}, 최대 발사체: ${maxProjectiles}`);
  }

  // --- 키보드 입력 ---
  const keysPressed: KeysPressed = {};
  const validKeys: string[] = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 's', 'a', 'd'];
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (validKeys.includes(key)) {
      keysPressed[key] = true;
    }
  });
  document.addEventListener('keyup', (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (validKeys.includes(key)) {
      keysPressed[key] = false;
    }
  });

  // --- 발사체 생성 ---
  function spawnProjectile(): void {
    if (!gameStarted || gameOver || projectiles.length >= maxProjectiles) return;

    const pWidth = 10 + Math.random() * 12;
    const pHeight = 25 + Math.random() * 20;
    let x: number, y: number, vx: number, vy: number;
    const currentSpeed = projectileBaseSpeed + (Math.random() * 1.5 - 0.75);
    const side = Math.floor(Math.random() * 4);

    switch (side) {
      case 0:
        x = Math.random() * (currentCanvasWidth - pWidth);
        y = -pHeight;
        vx = (Math.random() - 0.5) * currentSpeed;
        vy = currentSpeed * (0.7 + Math.random() * 0.6);
        break;
      case 1:
        x = currentCanvasWidth + pWidth;
        y = Math.random() * (currentCanvasHeight - pHeight);
        vx = -currentSpeed * (0.7 + Math.random() * 0.6);
        vy = (Math.random() - 0.5) * currentSpeed;
        break;
      case 2:
        x = Math.random() * (currentCanvasWidth - pWidth);
        y = currentCanvasHeight + pHeight;
        vx = (Math.random() - 0.5) * currentSpeed;
        vy = -currentSpeed * (0.7 + Math.random() * 0.6);
        break;
      case 3:
        x = -pWidth;
        y = Math.random() * (currentCanvasHeight - pHeight);
        vx = currentSpeed * (0.7 + Math.random() * 0.6);
        vy = (Math.random() - 0.5) * currentSpeed;
        break;
      default:
        x = 0;
        y = 0;
        vx = 0;
        vy = 0;
        console.warn('Invalid side in spawnProjectile');
        break;
    }

    if (player && distance(x + pWidth / 2, y + pHeight / 2, player.x + player.width / 2, player.y + player.height / 2) < player.width * 4) {
      // 중심점 기준 거리 체크
      return;
    }
    projectiles.push({ x, y, width: pWidth, height: pHeight, vx, vy, color: `hsl(${Math.random() * 360}, 80%, 65%)` });
  }

  // --- 게임 업데이트 로직 ---
  function update(): void {
    if (gameOver || !gameStarted) return;
    frameCount++;

    let moveX = 0;
    let moveY = 0;
    if (keysPressed['arrowleft'] || keysPressed['a']) moveX -= 1;
    if (keysPressed['arrowright'] || keysPressed['d']) moveX += 1;
    if (keysPressed['arrowup'] || keysPressed['w']) moveY -= 1;
    if (keysPressed['arrowdown'] || keysPressed['s']) moveY += 1;

    if (moveX !== 0 && moveY !== 0) {
      const diagonalFactor = Math.sqrt(0.5);
      player.x += moveX * PLAYER_SPEED * diagonalFactor;
      player.y += moveY * PLAYER_SPEED * diagonalFactor;
    } else {
      player.x += moveX * PLAYER_SPEED;
      player.y += moveY * PLAYER_SPEED;
    }

    player.x = Math.max(0, Math.min(player.x, currentCanvasWidth - player.width));
    player.y = Math.max(0, Math.min(player.y, currentCanvasHeight - player.height));

    if (frameCount % Math.max(5, Math.floor(projectileSpawnInterval)) === 0) {
      spawnProjectile();
    }

    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (player.x < p.x + p.width && player.x + player.width > p.x && player.y < p.y + p.height && player.y + player.height > p.y) {
        gameOver = true;
        gameStarted = false;
        finalScoreEl!.textContent = score.toString();
        showElement(gameOverMessageEl!);
        console.log('GAME OVER: 발사체 충돌!');
        break;
      }

      const outOfBoundsBuffer = 100;
      if (p.x + p.width < -outOfBoundsBuffer || p.x > currentCanvasWidth + outOfBoundsBuffer || p.y + p.height < -outOfBoundsBuffer || p.y > currentCanvasHeight + outOfBoundsBuffer) {
        projectiles.splice(i, 1);
        score += 10;
        updateDifficultyDisplay();
        if (score >= lastScoreForDifficultyUpdate + 30 && score > 0) {
          increaseDifficulty();
          lastScoreForDifficultyUpdate += 30;
        }
      }
    }
  }

  // --- 그리기 함수 ---
  function drawProjectile(p: Projectile): void {
    ctx!.fillStyle = p.color; // ctx는 null 아님
    const centerX = p.x + p.width / 2;
    const centerY = p.y + p.height / 2;
    const angle = Math.atan2(p.vy, p.vx);
    ctx!.save();
    ctx!.translate(centerX, centerY);
    ctx!.rotate(angle);
    const arrowLength = Math.max(p.width, p.height) * 1.2;
    const arrowWidth = Math.min(p.width, p.height) * 0.8;
    ctx!.beginPath();
    ctx!.rect(-arrowLength / 2, -arrowWidth / 2, arrowLength * 0.7, arrowWidth);
    ctx!.fill();
    ctx!.beginPath();
    ctx!.moveTo((arrowLength * 0.7) / 2, 0);
    ctx!.lineTo((arrowLength * 0.7) / 2 - arrowWidth, -arrowWidth * 0.7);
    ctx!.lineTo((arrowLength * 0.7) / 2 - arrowWidth, arrowWidth * 0.7);
    ctx!.closePath();
    ctx!.fill();
    ctx!.restore();
  }

  function draw(): void {
    ctx!.fillStyle = '#001f3f'; // 캔버스 배경색
    ctx!.fillRect(0, 0, currentCanvasWidth, currentCanvasHeight);

    if (gameStarted && player) {
      ctx!.fillStyle = player.color;
      ctx!.fillRect(player.x, player.y, player.width, player.height);
    }

    projectiles.forEach(p => drawProjectile(p));
  }

  // --- 게임 루프 ---
  function gameLoop(): void {
    if (!gameStarted && !gameOver) {
      draw();
    } else if (gameOver) {
      console.log('Game Over 상태. 루프 중단됨.');

      return;
    } else if (gameStarted && !gameOver) {
      update();
      draw();
    }

    // gameOver 상태가 아니면 다음 프레임 요청
    if (!gameOver) {
      gameLoopId = requestAnimationFrame(gameLoop);
    } else if (gameLoopId) {
      // gameOver가 되었으면 이전 루프ID는 취소
      cancelAnimationFrame(gameLoopId);
      gameLoopId = undefined;
    }
  }

  // --- 이벤트 리스너 연결 ---
  startButton!.addEventListener('click', () => {
    console.log('Start button clicked.');
    if (!gameStarted) {
      initGame();
    }
  });
  restartButton!.addEventListener('click', () => {
    console.log('Restart button clicked.');
    // gameOver 상태이거나, 어떤 이유로든 gameStarted가 false가 되었을 때 재시작
    if (gameOver || !gameStarted) {
      initGame();
    }
  });

  window.addEventListener('resize', resizeCanvas);

  // --- 초기 실행 ---
  resizeCanvas(); // 초기 캔버스 크기 설정 및 UI 너비 조정
  showElement(startScreenEl!);
  hideElement(gameOverMessageEl!);

  console.log('모든 함수 정의 완료. 시작 버튼 대기 중.');
  gameLoopId = requestAnimationFrame(gameLoop);
});
