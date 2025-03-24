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
    
    if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top
    ) {
        gameOver();
    }
}

// 게임 오버 함수
function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(animationId);
    alert(`게임 오버! 점수: ${score}\n다시 시작하려면 확인을 누르세요.`);
    resetGame();
}

// 게임 리셋 함수
function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    isGameOver = false;
    cactus.style.animationDuration = '1.5s';
    gameLoop();
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

// 게임 시작
gameLoop();

// 창 크기 조절 시 게임 재시작
window.addEventListener('resize', resetGame);