// Adım 2: Grid Çizimi
function setup() {
    createCanvas(560, 480);
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
            fill(255);
            noStroke();
            ellipse(x, y, 70, 70);
        }
    }
}
