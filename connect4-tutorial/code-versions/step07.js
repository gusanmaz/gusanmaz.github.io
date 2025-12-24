// Adım 7: countInDirection Fonksiyonu
let gameBoard = [];
let currentPlayer = 1;
let gameOver = false;
let winner = 0;

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

// ★ Yön vektörleri ile sayma fonksiyonu ★
function countInDirection(row, col, dRow, dCol, player) {
    let count = 0;
    let r = row + dRow;
    let c = col + dCol;

    while (r >= 0 && r < 6 && c >= 0 && c < 7 &&
        gameBoard[r][c] == player) {
        count++;
        r += dRow;
        c += dCol;
    }
    return count;
}

function draw() {
    background(0, 100, 200);
    drawBoard();

    fill(255);
    textSize(20);
    textAlign(LEFT);
    let t = (currentPlayer == 1) ? "Sıra: Kırmızı" : "Sıra: Sarı";
    text(t, 10, 470);
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

function mousePressed() {
    let sutun = floor(mouseX / 80);
    if (sutun >= 0 && sutun < 7) {
        dropPiece(sutun);
    }
}

function dropPiece(sutun) {
    for (let satir = 5; satir >= 0; satir--) {
        if (gameBoard[satir][sutun] == 0) {
            gameBoard[satir][sutun] = currentPlayer;
            currentPlayer = (currentPlayer == 1) ? 2 : 1;
            return;
        }
    }
}
