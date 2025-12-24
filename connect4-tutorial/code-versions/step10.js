// Adım 10: Oyun Sonu Ekranı ile draw Fonksiyonu
let gameBoard = [];
let currentPlayer = 1;
let gameOver = false;
let winner = 0;

const DIRECTIONS = [
    [[0, 1], [0, -1]], [[1, 0], [-1, 0]], [[1, 1], [-1, -1]], [[1, -1], [-1, 1]]
];

function setup() {
    createCanvas(560, 480);
    initBoard();
}

function initBoard() {
    for (let r = 0; r < 6; r++) {
        gameBoard[r] = [];
        for (let c = 0; c < 7; c++) {
            gameBoard[r][c] = 0;
        }
    }
}

function countInDirection(row, col, dRow, dCol, player) {
    let count = 0;
    let r = row + dRow;
    let c = col + dCol;
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && gameBoard[r][c] == player) {
        count++;
        r += dRow;
        c += dCol;
    }
    return count;
}

function checkWin(row, col, player) {
    for (let [d1, d2] of DIRECTIONS) {
        if (1 + countInDirection(row, col, d1[0], d1[1], player)
            + countInDirection(row, col, d2[0], d2[1], player) >= 4) {
            return true;
        }
    }
    return false;
}

// ★ Oyun sonu ekranlı draw fonksiyonu ★
function draw() {
    background(0, 100, 200);
    drawBoard();

    if (gameOver) {
        drawGameOver();
    } else {
        fill(255);
        textSize(20);
        textAlign(LEFT);
        text((currentPlayer == 1) ? "Sıra: Kırmızı" : "Sıra: Sarı", 10, 470);
    }
}

function drawBoard() {
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            let x = c * 80 + 40;
            let y = r * 80 + 40;
            if (gameBoard[r][c] == 0) fill(255);
            else if (gameBoard[r][c] == 1) fill(255, 0, 0);
            else fill(255, 255, 0);
            noStroke();
            ellipse(x, y, 70, 70);
        }
    }
}

function drawGameOver() {
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);

    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    let msg = (winner == 1) ? "KIRMIZI KAZANDI!" : "SARI KAZANDI!";
    text(msg, width / 2, height / 2);

    textSize(20);
    text("Yeniden başlamak için tıklayın", width / 2, height / 2 + 50);
}

function mousePressed() {
    if (gameOver) {
        resetGame();
        return;
    }
    let sutun = floor(mouseX / 80);
    if (sutun >= 0 && sutun < 7) {
        dropPiece(sutun);
    }
}

function dropPiece(sutun) {
    for (let satir = 5; satir >= 0; satir--) {
        if (gameBoard[satir][sutun] == 0) {
            gameBoard[satir][sutun] = currentPlayer;
            if (checkWin(satir, sutun, currentPlayer)) {
                gameOver = true;
                winner = currentPlayer;
            } else {
                currentPlayer = (currentPlayer == 1) ? 2 : 1;
            }
            return;
        }
    }
}

function resetGame() {
    initBoard();
    currentPlayer = 1;
    gameOver = false;
    winner = 0;
}
