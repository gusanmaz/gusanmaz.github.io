// Adım 15: Parametrik Yapı - Sabitler
// ★ Sabitler (değişmeyecek değerler) ★
const ROWS = 6;
const COLS = 7;
const CELL_SIZE = 80;
const PIECE_SIZE = 70;

// Değişkenler (oyun sırasında değişebilir)
let gameBoard = [];
let currentPlayer = 1;
let gameOver = false;
let winner = 0;

const DIRECTIONS = [
    [[0, 1], [0, -1]], [[1, 0], [-1, 0]],
    [[1, 1], [-1, -1]], [[1, -1], [-1, 1]]
];

function setup() {
    createCanvas(COLS * CELL_SIZE, ROWS * CELL_SIZE);
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
    drawBoard();

    if (gameOver) {
        drawGameOver();
    } else {
        fill(255);
        textSize(20);
        textAlign(LEFT);
        text((currentPlayer == 1) ? "Sıra: Kırmızı" : "Sıra: Sarı", 10, height - 10);
    }
}

function drawBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            let x = c * CELL_SIZE + CELL_SIZE / 2;
            let y = r * CELL_SIZE + CELL_SIZE / 2;

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
    rect(0, 0, width, height);
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);

    if (winner == 0) {
        text("BERABERE!", width / 2, height / 2);
    } else {
        text((winner == 1) ? "KIRMIZI KAZANDI!" : "SARI KAZANDI!", width / 2, height / 2);
    }

    textSize(20);
    text("Yeniden başlamak için tıklayın", width / 2, height / 2 + 50);
}

function mousePressed() {
    if (gameOver) {
        resetGame();
        return;
    }
    let sutun = floor(mouseX / CELL_SIZE);
    if (sutun >= 0 && sutun < COLS) {
        dropPiece(sutun);
    }
}

function dropPiece(sutun) {
    for (let satir = ROWS - 1; satir >= 0; satir--) {
        if (gameBoard[satir][sutun] == 0) {
            gameBoard[satir][sutun] = currentPlayer;

            if (checkWin(satir, sutun, currentPlayer)) {
                gameOver = true;
                winner = currentPlayer;
            } else if (checkDraw()) {
                gameOver = true;
                winner = 0;
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
