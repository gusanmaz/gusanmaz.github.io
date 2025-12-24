// Adım 6: Sıra Göstergesi
let gameBoard = [];
let currentPlayer = 1;

function setup() {
    createCanvas(560, 480);
    for (let r = 0; r < 6; r++) {
        gameBoard[r] = [];
        for (let c = 0; c < 7; c++) {
            gameBoard[r][c] = 0;
        }
    }
}

function draw() {
    background(0, 100, 200);
    drawBoard();

    // Sıra göstergesi
    fill(255);
    textSize(20);
    textAlign(LEFT);
    if (currentPlayer == 1) {
        text("Sıra: Kırmızı", 10, 470);
    } else {
        text("Sıra: Sarı", 10, 470);
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
