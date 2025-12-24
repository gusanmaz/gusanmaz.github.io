// Adım 3: Oyun Tahtası Dizisi
let gameBoard = [];

function setup() {
    createCanvas(560, 480);

    // 6 satır, 7 sütunluk boş tahta oluştur
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

            if (gameBoard[satir][sutun] == 0) {
                fill(255);            // Boş = Beyaz
            } else if (gameBoard[satir][sutun] == 1) {
                fill(255, 0, 0);      // Oyuncu 1 = Kırmızı
            } else {
                fill(255, 255, 0);    // Oyuncu 2 = Sarı
            }

            noStroke();
            ellipse(x, y, 70, 70);
        }
    }
}
