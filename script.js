const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;
let isGameOver = false;
let animationId;

// 점수 증가 함수
function updateScore() {
    if (!isGameOver) {
        score++;
        scoreDisplay.textContent = score;
        
        // 점수에 따라 속도 증가
        if (score % 100 === 0) {
            const currentDuration = parseFloat(getComputedStyle(cactus).animationDuration);
            cactus.style.animationDuration = `${currentDuration * 0.9}s`;
        }
    }
}

// 점프 함수
function jump() {
    if (!isJumping && !isGameOver) {
        isJumping = true;
        dino.classList.add('jump');
        
        setTimeout(() => {
            dino.classList.remove('jump');
            isJumping = false;
        }, 500);
    }
}

// 충돌 감지 함수
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();
    
    // 선인장이 화면 안에 있을 때만 충돌 검사
    if (cactusRect.right > 0 && cactusRect.left < window.innerWidth) {
        if (
            dinoRect.right > cactusRect.left &&
            dinoRect.left < cactusRect.right &&
            dinoRect.bottom > cactusRect.top
        ) {
            gameOver();
        }
    }
}

// 게임 오버 함수
function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(animationId);
    
    // 알림창이 닫힐 때만 게임 재시작
    setTimeout(() => {
        alert(`게임 오버! 점수: ${score}\n다시 시작하려면 확인을 누르세요.`);
        resetGame();
    }, 100);
}

// 게임 리셋 함수
function resetGame() {
    // startGame 함수를 호출하여 모든 상태 초기화
    startGame();
}

// 게임 메인 루프
function gameLoop() {
    checkCollision();
    updateScore();
    animationId = requestAnimationFrame(gameLoop);
}

// 이벤트 리스너
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.key === 'ArrowUp') {
        jump();
    }
});

// 모바일 지원
document.addEventListener('touchstart', jump);

// 게임 초기화 및 시작
function startGame() {
    score = 0;
    isJumping = false;
    isGameOver = false;
    scoreDisplay.textContent = score;
    cactus.style.animationDuration = '1.5s';
    
    // 이전 게임 루프가 있으면 취소
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // 새 게임 루프 시작
    animationId = requestAnimationFrame(gameLoop);
}

// 게임 시작
startGame();

// 창 크기 조절 시 게임 재시작
window.addEventListener('resize', resetGame);