// Adım 5: Taş Bırakma
let gameBoard = [];
let currentPlayer = 1;  // 1 = Kırmızı, 2 = Sarı

function setup() {
    createCanvas(560, 480);

    for (let satir = 0; satir < 6; satir++) {
        gameBoard[satir] = [];
        for (let sutun = 0; sutun < 7; sutun++) {
            gameBoard[satir][sutun] = 0;
        }
    }
}

function draw() {
    background(0, 100, 200);
    drawBoard();
}

function drawBoard() {
    for (let satir = 0; satir < 6; satir++) {
        for (let sutun = 0; sutun < 7; sutun++) {
            let x = sutun * 80 + 40;
            let y = satir * 80 + 40;

            if (gameBoard[satir][sutun] == 0) fill(255);
            else if (gameBoard[satir][sutun] == 1) fill(255, 0, 0);
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
    print("Sütun dolu!");
}
