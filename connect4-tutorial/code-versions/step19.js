// Adım 19: Skor Sistemi
const ROWS = 6;
const COLS = 7;
const CELL_SIZE = 80;
const PIECE_SIZE = 70;
const OFFSET_Y = 40;

let gameBoard = [];
let currentPlayer = 1;
let gameOver = false;
let winner = 0;

// ★ Skor değişkenleri ★
let score1 = 0;  // Kırmızı skor
let score2 = 0;  // Sarı skor

let isAnimating = false;
let animY = 0;
let animTargetY = 0;
let animCol = 0;
let animRow = 0;
let animPlayer = 0;

const DIRECTIONS = [
    [[0, 1], [0, -1]], [[1, 0], [-1, 0]],
    [[1, 1], [-1, -1]], [[1, -1], [-1, 1]]
];

function setup() {
    createCanvas(COLS * CELL_SIZE, ROWS * CELL_SIZE + OFFSET_Y);
    initBoard();
}

function initBoard() {
    for (let r = 0; r < ROWS; r++) {
        gameBoard[r] = [];
        for (let c = 0; c < COLS; c++) {
            gameBoard[r][c] = 0;
        }
    }
}

function countInDirection(row, col, dRow, dCol, player) {
    let count = 0;
    let r = row + dRow;
    let c = col + dCol;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] == player) {
        count++;
        r += dRow;
        c += dCol;
    }
    return count;
}

function checkWin(row, col, player) {
    for (let [dir1, dir2] of DIRECTIONS) {
        let count = 1 + countInDirection(row, col, dir1[0], dir1[1], player)
            + countInDirection(row, col, dir2[0], dir2[1], player);
        if (count >= 4) return true;
    }
    return false;
}

function checkDraw() {
    for (let c = 0; c < COLS; c++) {
        if (gameBoard[0][c] == 0) return false;
    }
    return true;
}

function draw() {
    background(0, 100, 200);

    // ★ Skor gösterimi ★
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Kırmızı: " + score1, 10, 25);
    textAlign(RIGHT);
    text("Sarı: " + score2, width - 10, 25);

    if (!gameOver && !isAnimating && mouseY >= OFFSET_Y) {
        let hoverCol = floor(mouseX / CELL_SIZE);
        if (hoverCol >= 0 && hoverCol < COLS && gameBoard[0][hoverCol] == 0) {
            let x = hoverCol * CELL_SIZE + CELL_SIZE / 2;
            if (currentPlayer == 1) fill(255, 0, 0, 150);
            else fill(255, 255, 0, 150);
            noStroke();
            ellipse(x, 20, PIECE_SIZE * 0.6, PIECE_SIZE * 0.6);
        }
    }

    drawBoard();

    if (isAnimating) {
        let x = animCol * CELL_SIZE + CELL_SIZE / 2;
        if (animPlayer == 1) fill(255, 0, 0);
        else fill(255, 255, 0);
        noStroke();
        ellipse(x, animY, PIECE_SIZE, PIECE_SIZE);

        animY += 15;
        if (animY >= animTargetY) {
            animY = animTargetY;
            isAnimating = false;
            finishDrop();
        }
    }

    if (gameOver) {
        drawGameOver();
    } else if (!isAnimating) {
        textAlign(CENTER);
        text((currentPlayer == 1) ? "Sıra: Kırmızı" : "Sıra: Sarı", width / 2, 25);
    }
}

function drawBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            let x = c * CELL_SIZE + CELL_SIZE / 2;
            let y = r * CELL_SIZE + CELL_SIZE / 2 + OFFSET_Y;

            if (gameBoard[r][c] == 0) fill(255);
            else if (gameBoard[r][c] == 1) fill(255, 0, 0);
            else fill(255, 255, 0);

            noStroke();
            ellipse(x, y, PIECE_SIZE, PIECE_SIZE);
        }
    }
}

function drawGameOver() {
    fill(0, 0, 0, 150);
    rect(0, OFFSET_Y, width, height - OFFSET_Y);
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);

    if (winner == 0) text("BERABERE!", width / 2, height / 2);
    else text((winner == 1) ? "KIRMIZI KAZANDI!" : "SARI KAZANDI!", width / 2, height / 2);

    textSize(20);
    text("Yeniden başlamak için tıklayın", width / 2, height / 2 + 50);
}

function mousePressed() {
    if (gameOver) {
        resetGame();
        return;
    }
    if (isAnimating) return;
    if (mouseY < OFFSET_Y) return;

    let sutun = floor(mouseX / CELL_SIZE);
    if (sutun >= 0 && sutun < COLS) {
        startDrop(sutun);
    }
}

function startDrop(sutun) {
    for (let satir = ROWS - 1; satir >= 0; satir--) {
        if (gameBoard[satir][sutun] == 0) {
            isAnimating = true;
            animCol = sutun;
            animRow = satir;
            animPlayer = currentPlayer;
            animY = OFFSET_Y;
            animTargetY = satir * CELL_SIZE + CELL_SIZE / 2 + OFFSET_Y;
            return;
        }
    }
}

function finishDrop() {
    gameBoard[animRow][animCol] = animPlayer;

    if (checkWin(animRow, animCol, animPlayer)) {
        gameOver = true;
        winner = animPlayer;
        // ★ Kazanan için skor artır ★
        if (winner == 1) score1++;
        else score2++;
    } else if (checkDraw()) {
        gameOver = true;
        winner = 0;
    } else {
        currentPlayer = (currentPlayer == 1) ? 2 : 1;
    }
}

function resetGame() {
    initBoard();
    currentPlayer = 1;
    gameOver = false;
    winner = 0;
    isAnimating = false;
    // NOT: Skorlar sıfırlanmaz!
}
