let score = 0;
let totalCoins = 0;
let gameInterval;
let gameInProgress = false;

const playButton = document.getElementById('play-button');
const leaderboardButton = document.getElementById('leaderboard-button');
const profileButton = document.getElementById('profile-button');
const returnButton = document.getElementById('return-button');
const gameContainer = document.getElementById('game-container');
const gameArea = document.getElementById('game-area');
const scoreBoard = document.getElementById('score-board');
const totalCoinsElement = document.getElementById('total-coins');
const menu = document.querySelector('.menu');
const gameOverScreen = document.getElementById('game-over-screen');

function startGame() {
    menu.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    score = 0;
    gameInProgress = true;
    gameInterval = setInterval(spawnCoin, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    gameInProgress = false;
    gameContainer.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    totalCoins += score;
    updateTotalCoins();
    updateLeaderboard();
}

function spawnCoin() {
    if (!gameInProgress) return;
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${Math.random() * 90}vw`;
    coin.style.animationDuration = `${2 - score * 0.05}s`;
    gameArea.appendChild(coin);
    
    coin.addEventListener('click', () => {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        coin.remove();
    });

    setTimeout(() => {
        if (coin.parentElement) {
            coin.remove();
            endGame();
        }
    }, 2000);
}

function updateTotalCoins() {
    totalCoinsElement.textContent = `DRMVCOIN: ${totalCoins}`;
}

function updateLeaderboard() {
    // Simple example for updating leaderboard
    // Add your leaderboard update logic here
}

playButton.addEventListener('click', startGame);
returnButton.addEventListener('click', () => {
    menu.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
});

leaderboardButton.addEventListener('click', () => {
    // Logic for showing the leaderboard
});

profileButton.addEventListener('click', () => {
    // Logic for showing the profile
});
