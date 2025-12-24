// Adım 21: OOP Versiyonu - Connect4Game Sınıfı
class Connect4Game {
    constructor() {
        this.ROWS = 6;
        this.COLS = 7;
        this.CELL_SIZE = 80;
        this.PIECE_SIZE = 70;
        this.OFFSET_Y = 40;

        this.DIRECTIONS = [
            [[0, 1], [0, -1]], [[1, 0], [-1, 0]],
            [[1, 1], [-1, -1]], [[1, -1], [-1, 1]]
        ];

        this.gameBoard = [];
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winner = 0;
        this.score1 = 0;
        this.score2 = 0;
        this.winningCells = [];

        this.isAnimating = false;
        this.animY = 0;
        this.animTargetY = 0;
        this.animCol = 0;
        this.animRow = 0;
        this.animPlayer = 0;

        this.initBoard();
    }

    initBoard() {
        for (let r = 0; r < this.ROWS; r++) {
            this.gameBoard[r] = [];
            for (let c = 0; c < this.COLS; c++) {
                this.gameBoard[r][c] = 0;
            }
        }
    }

    countInDirection(row, col, dRow, dCol, player) {
        let count = 0;
        let r = row + dRow;
        let c = col + dCol;
        while (r >= 0 && r < this.ROWS && c >= 0 && c < this.COLS &&
            this.gameBoard[r][c] == player) {
            count++;
            r += dRow;
            c += dCol;
        }
        return count;
    }

    checkWin(row, col, player) {
        for (let [dir1, dir2] of this.DIRECTIONS) {
            let cells = [[row, col]];

            let r = row + dir1[0];
            let c = col + dir1[1];
            while (r >= 0 && r < this.ROWS && c >= 0 && c < this.COLS &&
                this.gameBoard[r][c] == player) {
                cells.push([r, c]);
                r += dir1[0];
                c += dir1[1];
            }

            r = row + dir2[0];
            c = col + dir2[1];
            while (r >= 0 && r < this.ROWS && c >= 0 && c < this.COLS &&
                this.gameBoard[r][c] == player) {
                cells.push([r, c]);
                r += dir2[0];
                c += dir2[1];
            }

            if (cells.length >= 4) {
                this.winningCells = cells;
                return true;
            }
        }
        return false;
    }

    checkDraw() {
        for (let c = 0; c < this.COLS; c++) {
            if (this.gameBoard[0][c] == 0) return false;
        }
        return true;
    }

    startDrop(sutun) {
        if (this.isAnimating || this.gameOver) return;

        for (let satir = this.ROWS - 1; satir >= 0; satir--) {
            if (this.gameBoard[satir][sutun] == 0) {
                this.isAnimating = true;
                this.animCol = sutun;
                this.animRow = satir;
                this.animPlayer = this.currentPlayer;
                this.animY = this.OFFSET_Y;
                this.animTargetY = satir * this.CELL_SIZE + this.CELL_SIZE / 2 + this.OFFSET_Y;
                return;
            }
        }
    }

    finishDrop() {
        this.gameBoard[this.animRow][this.animCol] = this.animPlayer;

        if (this.checkWin(this.animRow, this.animCol, this.animPlayer)) {
            this.gameOver = true;
            this.winner = this.animPlayer;
            if (this.winner == 1) this.score1++;
            else this.score2++;
        } else if (this.checkDraw()) {
            this.gameOver = true;
            this.winner = 0;
        } else {
            this.currentPlayer = (this.currentPlayer == 1) ? 2 : 1;
        }
    }

    reset() {
        this.initBoard();
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winner = 0;
        this.isAnimating = false;
        this.winningCells = [];
    }

    update() {
        if (this.isAnimating) {
            this.animY += 15;
            if (this.animY >= this.animTargetY) {
                this.animY = this.animTargetY;
                this.isAnimating = false;
                this.finishDrop();
            }
        }
    }
}

// Global oyun nesnesi
let game;

function setup() {
    game = new Connect4Game();
    createCanvas(game.COLS * game.CELL_SIZE, game.ROWS * game.CELL_SIZE + game.OFFSET_Y);
}

function draw() {
    game.update();

    background(0, 100, 200);

    // Skor ve UI çizimi
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Kırmızı: " + game.score1, 10, 25);
    textAlign(RIGHT);
    text("Sarı: " + game.score2, width - 10, 25);

    // Tahta çizimi
    for (let r = 0; r < game.ROWS; r++) {
        for (let c = 0; c < game.COLS; c++) {
            let x = c * game.CELL_SIZE + game.CELL_SIZE / 2;
            let y = r * game.CELL_SIZE + game.CELL_SIZE / 2 + game.OFFSET_Y;

            if (game.gameBoard[r][c] == 0) fill(255);
            else if (game.gameBoard[r][c] == 1) fill(255, 0, 0);
            else fill(255, 255, 0);

            noStroke();
            ellipse(x, y, game.PIECE_SIZE, game.PIECE_SIZE);
        }
    }

    // Animasyon çizimi
    if (game.isAnimating) {
        let x = game.animCol * game.CELL_SIZE + game.CELL_SIZE / 2;
        if (game.animPlayer == 1) fill(255, 0, 0);
        else fill(255, 255, 0);
        noStroke();
        ellipse(x, game.animY, game.PIECE_SIZE, game.PIECE_SIZE);
    }

    if (game.gameOver) {
        fill(0, 0, 0, 150);
        rect(0, game.OFFSET_Y, width, height - game.OFFSET_Y);
        fill(255);
        textSize(40);
        textAlign(CENTER, CENTER);
        if (game.winner == 0) text("BERABERE!", width / 2, height / 2);
        else text((game.winner == 1) ? "KIRMIZI KAZANDI!" : "SARI KAZANDI!", width / 2, height / 2);
        textSize(20);
        text("Yeniden başlamak için tıklayın", width / 2, height / 2 + 50);
    }
}

function mousePressed() {
    if (game.gameOver) {
        game.reset();
        return;
    }
    if (game.isAnimating) return;
    if (mouseY < game.OFFSET_Y) return;

    let sutun = floor(mouseX / game.CELL_SIZE);
    if (sutun >= 0 && sutun < game.COLS) {
        game.startDrop(sutun);
    }
}
