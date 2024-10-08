document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let gameActive = false;
    let coinSpeed = 4;
    let totalCoins = parseInt(localStorage.getItem('totalCoins')) || 0;
    let username = "Ваш Ник";
    let avatar = "default-avatar.png";

    const scoreDisplay = document.getElementById('score');
    const finalScoreDisplay = document.getElementById('final-score');
    const totalCoinsDisplay = document.getElementById('total-coins');
    const profileNameDisplay = document.getElementById('profile-name');
    const profileAvatarDisplay = document.getElementById('profile-avatar');
    const gameArea = document.getElementById('game-area');
    const startButton = document.getElementById('start-game');
    const restartGameButton = document.getElementById('restart-game');
    const mainMenu = document.getElementById('main-menu');
    const gameContainer = document.getElementById('game-container');
    const leaderboard = document.getElementById('leaderboard');
    const leaderboardList = document.getElementById('leaderboard-list');
    const profileBtn = document.getElementById('profile-btn');
    const leaderboardBtn = document.getElementById('leaderboard-btn');
    const backToMenuBtn = document.getElementById('back-to-menu');

    totalCoinsDisplay.textContent = totalCoins;

    // Telegram Web App Integration
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        username = tg.initDataUnsafe.user.username || "Ваш Ник";
        avatar = tg.initDataUnsafe.user.photo_url || "default-avatar.png";
    }

    profileNameDisplay.textContent = username;
    profileAvatarDisplay.src = avatar;

    function createCoin() {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
        coin.style.animationDuration = `${coinSpeed}s`;

        coin.addEventListener('click', () => {
            if (gameActive) {
                score++;
                scoreDisplay.textContent = score;
                coin.remove();
                coinSpeed = Math.max(coinSpeed - 0.1, 1);
            }
        });

        coin.addEventListener('animationend', () => {
            if (gameActive) {
                endGame();
            }
        });

        gameArea.appendChild(coin);
    }

    function startGame() {
        score = 0;
        coinSpeed = 4;
        gameActive = true;
        scoreDisplay.textContent = score;
        mainMenu.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        createCoin();
    }

    function endGame() {
        gameActive = false;
        document.querySelectorAll('.coin').forEach(coin => coin.remove());
        finalScoreDisplay.textContent = score;
        totalCoins += score;
        localStorage.setItem('totalCoins', totalCoins);
        totalCoinsDisplay.textContent = totalCoins;
        saveLeaderboard();
        gameContainer.classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
    }

    function showLeaderboard() {
        leaderboardList.innerHTML = '';
        const leaders = JSON.parse(localStorage.getItem('leaders')) || [];
        leaders.forEach((leader, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${leader.username}: ${leader.score} DRMVCOIN`;
            leaderboardList.appendChild(li);
        });
        leaderboard.classList.remove('hidden');
        mainMenu.classList.add('hidden');
    }

    function saveLeaderboard() {
        const leaders = JSON.parse(localStorage.getItem('leaders')) || [];
        leaders.push({ username, score });
        leaders.sort((a, b) => b.score - a.score);
        localStorage.setItem('leaders', JSON.stringify(leaders));
    }

    startButton.addEventListener('click', startGame);
    restartGameButton.addEventListener('click', () => {
        document.getElementById('results').classList.add('hidden');
        startGame();
    });
    leaderboardBtn.addEventListener('click', showLeaderboard);
    backToMenuBtn.addEventListener('click', () => {
        leaderboard.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    });
    profileBtn.addEventListener('click', () => {
        alert('Профиль пользователя: ' + username);
    });

    // Инициализация главного меню при загрузке страницы
    mainMenu.classList.remove('hidden');
    totalCoinsDisplay.textContent = totalCoins;
});
