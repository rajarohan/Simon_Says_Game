let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let score = 0;

const h2 = document.querySelector("h2");
const allBtns = document.querySelectorAll(".btn");
const colors = ["yellow", "red", "blue", "green"];
const scoreValue = document.getElementById("score-value");

document.addEventListener("keypress", startGame);
allBtns.forEach((btn) => btn.addEventListener("click", handleUserInput));

function startGame() {
    if (!started) {
        resetGame();
        started = true;
        nextLevel();
    }
}

function resetGame() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0;
    started = false;
    updateScore();
    h2.innerText = "Press any key to start.";
}

function nextLevel() {
    userSeq = [];
    level++;
    updateLevelText();
    const randColor = getRandomColor();
    gameSeq.push(randColor);
    flashButton(randColor);
}

function getRandomColor() {
    const randIdx = Math.floor(Math.random() * colors.length);
    return colors[randIdx];
}

function flashButton(color) {
    const btn = document.querySelector(`.${color}`);
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 1000);
}

function handleUserInput() {
    const userColor = this.getAttribute("id");
    userSeq.push(userColor);
    flashUserButton(this);
    validateUserInput(userSeq.length - 1);
}

function flashUserButton(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 500);
}

function validateUserInput(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            score += level * 10;
            updateScore();
            setTimeout(nextLevel, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    h2.innerText = `Game over! Press any key to restart.Your final score: ${score}`;
    

    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 500);

    const buttons = document.querySelectorAll('.btn');
    const container = document.querySelector('.btn_container');

    buttons.forEach(btn => btn.classList.add('glow'));

    setTimeout(() => {
        buttons.forEach(btn => btn.classList.remove('glow'));
    }, 1500);
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    score = 0;

    updateScore();
}


function updateLevelText() {
    h2.innerText = `Level ${level}`;
}

function updateScore() {
    scoreValue.innerText = score;
}