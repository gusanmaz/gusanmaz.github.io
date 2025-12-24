
// Theme Toggle
function toggleTheme() {
    const root = document.documentElement;
    root.classList.toggle('light-mode');
    const isLight = root.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
}

// Global p5 Utilities
// We will create instances of p5 sketches so they don't interfere
// Each step will have its own p5 instance attached to its div

// Shared Data
const themes = {
    colors: ['red', '🔴', 'black', '⚫', 'blue', '🔵', 'green', '🟢', 'white', '⚪', 'yellow', '🟡', 'orange', '🟠', 'gray', '🔘'],
    animals: ["cat", "🐱", "dog", "🐶", "lion", "🦁", "elephant", "🐘", "bird", "🐦", "fish", "🐟", "horse", "🐴", "turtle", "🐢"],
    professions: ["doctor", "🩺", "teacher", "📚", "engineer", "🛠️", "artist", "🎨", "chef", "👨‍🍳", "pilot", "✈️", "scientist", "🔬", "farmer", "🌾"],
    fruits: ["apple", "🍎", "banana", "🍌", "orange", "🍊", "grape", "🍇", "strawberry", "🍓", "cherry", "🍒", "pineapple", "🍍", "watermelon", "🍉"]
};

const wordsV1 = ['red', 'kirmizi', 'black', 'siyah', 'blue', 'mavi', 'green', 'yesil', 'white', 'beyaz', 'yellow', 'sari', 'orange', 'turuncu', 'gray', 'gri'];

// ==========================================
// STEP 1 DEMO: Basic Logic + Score (Console)
// ==========================================
const s1 = (p) => {
    let words = [...wordsV1];
    let mixedWords = [];
    let gameBoard = [];
    let satir1 = -1, sutun1 = -1, satir2 = -1, sutun2 = -1;
    let counter = -1;
    let score = 0;
    let gameStart = true;

    p.setup = () => {
        let canvas = p.createCanvas(400, 400);
        canvas.parent('demo-step1');
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16); // slightly smaller for 400x400
        words = p.shuffle(words);
        mixedWords = [...words];
        drawBoard();
    };

    p.draw = () => {
        if (counter != -1) counter++;
        if (counter == 30) {
            satir1 = -1; sutun1 = -1; satir2 = -1; sutun2 = -1; counter = -1;
            drawBoard();
        }
    };

    function drawBoard() {
        p.background(255);
        if (gameStart) {
            let idx = 0;
            for (let r = 0; r < 4; r++) {
                gameBoard[r] = [];
                for (let c = 0; c < 4; c++) {
                    gameBoard[r][c] = mixedWords[idx++];
                }
            }
            gameStart = false;
        }

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                p.fill(255);
                if (gameBoard[r][c] == "") p.fill(0);
                if (satir1 == r && sutun1 == c) p.fill('yellow');
                if (satir2 == r && sutun2 == c) p.fill('orange');
                p.rect(c * 100, r * 100, 100, 100);

                let w = gameBoard[r][c];
                p.fill(0);
                if (w != "") p.text(w, c * 100 + 50, r * 100 + 50);
            }
        }
    }

    p.mousePressed = () => {
        if (p.mouseX < 0 || p.mouseX > 400 || p.mouseY < 0 || p.mouseY > 400) return;

        let c = Math.floor(p.mouseX / 100);
        let r = Math.floor(p.mouseY / 100);

        // Simple Logic from Step 1
        if (satir1 == -1 && sutun1 == -1 && gameBoard[r][c] != "") {
            satir1 = r; sutun1 = c;
            drawBoard();
        } else if (satir2 == -1 && sutun2 == -1 && !(satir1 == r && sutun1 == c) && gameBoard[r][c] != "") {
            satir2 = r; sutun2 = c;
            drawBoard();

            // Score Logic
            let w1 = gameBoard[satir1][sutun1];
            let w2 = gameBoard[satir2][sutun2];
            let ind1 = wordsV1.indexOf(w1);
            let ind2 = wordsV1.indexOf(w2);

            if (Math.floor(ind1 / 2) == Math.floor(ind2 / 2)) {
                score += 10;
                console.log("Step 1 Score: " + score);
                gameBoard[satir1][sutun1] = "";
                gameBoard[satir2][sutun2] = "";
            } else {
                score -= 2;
                console.log("Step 1 Score: " + score);
            }
            counter = 0;
        }
    };
};
new p5(s1);

// ==========================================
// STEP 2 DEMO: UI Score
// ==========================================
const s2 = (p) => {
    let words = [...wordsV1];
    let mixedWords = [];
    let gameBoard = [];
    let satir1 = -1, sutun1 = -1, satir2 = -1, sutun2 = -1;
    let counter = -1;
    let score = 0;
    let gameStart = true;

    p.setup = () => {
        let canvas = p.createCanvas(400, 500); // TALLER
        canvas.parent('demo-step2');
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);
        words = p.shuffle(words);
        mixedWords = [...words];
        drawBoard();
    };

    p.draw = () => {
        if (counter != -1) counter++;
        if (counter == 30) {
            satir1 = -1; sutun1 = -1; satir2 = -1; sutun2 = -1; counter = -1;
            drawBoard();
        }
    };

    function drawBoard() {
        p.background(255);
        if (gameStart) {
            let idx = 0;
            for (let r = 0; r < 4; r++) {
                gameBoard[r] = [];
                for (let c = 0; c < 4; c++) {
                    gameBoard[r][c] = mixedWords[idx++];
                }
            }
            gameStart = false;
        }

        // Grid
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                p.fill(255);
                if (gameBoard[r][c] == "") p.fill(0);
                if (satir1 == r && sutun1 == c) p.fill('yellow');
                if (satir2 == r && sutun2 == c) p.fill('orange');
                p.rect(c * 100, r * 100, 100, 100);

                let w = gameBoard[r][c];
                p.fill(0);
                if (w != "") p.text(w, c * 100 + 50, r * 100 + 50);
            }
        }

        // SCORE AREA
        p.textSize(24);
        p.fill(0);
        p.text("Puan: " + score, 200, 450);
        p.textSize(16);
    }

    p.mousePressed = () => {
        // Buggy version: No check for Y > 400!
        // But for demo stability, we won't actually CRASH the browser, just not handle it or log it
        let c = Math.floor(p.mouseX / 100);
        let r = Math.floor(p.mouseY / 100);

        if (r >= 4) {
            console.log("Step 2: Clicked outside grid (Row " + r + ") - This would crash if we didn't handle array bounds carefully in this demo source!");
            return;
        }

        if (satir1 == -1 && sutun1 == -1 && gameBoard[r][c] != "") {
            satir1 = r; sutun1 = c;
            drawBoard();
        } else if (satir2 == -1 && sutun2 == -1 && !(satir1 == r && sutun1 == c) && gameBoard[r][c] != "") {
            satir2 = r; sutun2 = c;
            drawBoard();

            let w1 = gameBoard[satir1][sutun1];
            let w2 = gameBoard[satir2][sutun2];
            let ind1 = wordsV1.indexOf(w1);
            let ind2 = wordsV1.indexOf(w2);

            if (Math.floor(ind1 / 2) == Math.floor(ind2 / 2)) {
                score += 10;
                gameBoard[satir1][sutun1] = "";
                gameBoard[satir2][sutun2] = "";
            } else {
                score -= 2;
            }
            counter = 0;
        }
    };
};
new p5(s2);


// ==========================================
// STEP 3 DEMO: Safe Click
// ==========================================
const s3 = (p) => {
    let s2Instance = s2(p); // Reuse logic but add check
    // Actually simpler to rewrite minor part
    let words = [...wordsV1];
    let mixedWords = [];
    let gameBoard = [];
    let satir1 = -1, sutun1 = -1, satir2 = -1, sutun2 = -1;
    let counter = -1;
    let score = 0;
    let gameStart = true;

    // SAFE CLICK CHECK
    function isMouseInGameBoard(y) {
        return y < 400;
    }

    p.setup = () => {
        let canvas = p.createCanvas(400, 500);
        canvas.parent('demo-step3');
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);
        words = p.shuffle(words);
        mixedWords = [...words];
        drawBoard();
    };

    p.draw = () => {
        if (counter != -1) counter++;
        if (counter == 30) {
            satir1 = -1; sutun1 = -1; satir2 = -1; sutun2 = -1; counter = -1;
            drawBoard();
        }
    };

    function drawBoard() {
        p.background(255);
        if (gameStart) {
            let idx = 0;
            for (let r = 0; r < 4; r++) {
                gameBoard[r] = [];
                for (let c = 0; c < 4; c++) {
                    gameBoard[r][c] = mixedWords[idx++];
                }
            }
            gameStart = false;
        }
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                p.fill(255);
                if (gameBoard[r][c] == "") p.fill(0);
                if (satir1 == r && sutun1 == c) p.fill('yellow');
                if (satir2 == r && sutun2 == c) p.fill('orange');
                p.rect(c * 100, r * 100, 100, 100);
                let w = gameBoard[r][c];
                p.fill(0);
                if (w != "") p.text(w, c * 100 + 50, r * 100 + 50);
            }
        }
        // Visualizing safe zone removed for cleaner look
        // p.noStroke();
        // p.fill(0, 255, 0, 30); 
        // p.rect(0, 0, 400, 400);
        // p.fill(255, 0, 0, 30); 
        // p.rect(0, 400, 400, 100);

        p.stroke(0);
        p.textSize(24);
        p.fill(0);
        p.text("Puan: " + score, 200, 450);
        p.textSize(10);
        p.fill('red');
        p.text("(Buraya tıklamak yok)", 200, 480);
        p.textSize(16);
    }

    p.mousePressed = () => {
        if (!isMouseInGameBoard(p.mouseY)) {
            console.log("Safe click: ignored click outside board");
            return;
        }

        let c = Math.floor(p.mouseX / 100);
        let r = Math.floor(p.mouseY / 100);

        if (satir1 == -1 && sutun1 == -1 && gameBoard[r][c] != "") {
            satir1 = r; sutun1 = c;
            drawBoard();
        } else if (satir2 == -1 && sutun2 == -1 && !(satir1 == r && sutun1 == c) && gameBoard[r][c] != "") {
            satir2 = r; sutun2 = c;
            drawBoard();

            // Score Logic - restored from s2 to be playable
            let w1 = gameBoard[satir1][sutun1];
            let w2 = gameBoard[satir2][sutun2];
            let ind1 = wordsV1.indexOf(w1);
            let ind2 = wordsV1.indexOf(w2);

            if (Math.floor(ind1 / 2) == Math.floor(ind2 / 2)) {
                score += 10;
                gameBoard[satir1][sutun1] = "";
                gameBoard[satir2][sutun2] = "";
            } else {
                score -= 2;
            }
            counter = 0;
        }
    };
};
new p5(s3);

// ==========================================
// STEP 4 DEMO: Emojis
// ==========================================
const s4 = (p) => {
    let currentWords = [...themes.colors];
    let mixedWords = [];
    let gameBoard = [];
    let gameStart = true;

    p.setup = () => {
        let canvas = p.createCanvas(400, 400); // Back to square for simplicity in this demo
        canvas.parent('demo-step4');
        p.textAlign(p.CENTER, p.CENTER);
        currentWords = p.shuffle(currentWords);
        mixedWords = [...currentWords];
        drawBoard();
    };

    function drawBoard() {
        p.background(255);
        if (gameStart) {
            let idx = 0;
            for (let r = 0; r < 4; r++) {
                gameBoard[r] = [];
                for (let c = 0; c < 4; c++) {
                    gameBoard[r][c] = mixedWords[idx++];
                }
            }
            gameStart = false;
        }
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                p.fill(255);
                p.rect(c * 100, r * 100, 100, 100);
                let w = gameBoard[r][c];
                p.fill(0);
                p.textSize(20); // Small size as in step 4
                p.text(w, c * 100 + 50, r * 100 + 50);
            }
        }
    }
};
new p5(s4);

// ==========================================
// STEP 5 DEMO: Font Size
// ==========================================
const s5 = (p) => {
    let currentWords = [...themes.colors];
    let mixedWords = [];
    let gameBoard = [];
    let gameStart = true;

    // Segmenter Logic from Step 5 code
    function isEmoji(s) {
        // Use Extended_Pictographic to catch ZWJ sequences like 👨‍🍳
        return /\p{Extended_Pictographic}/u.test(s);
    }

    p.setup = () => {
        let canvas = p.createCanvas(400, 400);
        canvas.parent('demo-step5');
        p.textAlign(p.CENTER, p.CENTER);
        currentWords = p.shuffle(currentWords);
        mixedWords = [...currentWords];
        drawBoard();
    };

    function drawBoard() {
        p.background(255);
        if (gameStart) {
            let idx = 0;
            for (let r = 0; r < 4; r++) {
                gameBoard[r] = [];
                for (let c = 0; c < 4; c++) {
                    gameBoard[r][c] = mixedWords[idx++];
                }
            }
            gameStart = false;
        }
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                p.fill(255);
                p.rect(c * 100, r * 100, 100, 100);
                let w = gameBoard[r][c];
                p.fill(0);

                if (isEmoji(w)) {
                    p.textSize(60); // LARGE FOR EMOJI
                } else {
                    p.textSize(20); // SMALL FOR TEXT
                }

                p.text(w, c * 100 + 50, r * 100 + 50);
            }
        }
    }
};
new p5(s5);

// ==========================================
// STEP 7 DEMO: Themes
// ==========================================
let resetDemo7Trigger = false;
window.resetDemo7 = () => { resetDemo7Trigger = true; };

const s7 = (p) => {
    let mixedWords = [];
    let gameBoard = [];
    let gameStart = true;

    function isEmoji(s) {
        return /\p{Extended_Pictographic}/u.test(s);
    }

    p.setup = () => {
        let canvas = p.createCanvas(400, 400);
        canvas.parent('demo-step7');
        p.textAlign(p.CENTER, p.CENTER);
        pickRandomTheme();
        drawBoard();
    };

    function pickRandomTheme() {
        let keys = Object.keys(themes);
        let randKey = keys[Math.floor(Math.random() * keys.length)];
        let words = themes[randKey];
        mixedWords = p.shuffle([...words]);
        gameStart = true;
    }

    p.draw = () => {
        if (resetDemo7Trigger) {
            pickRandomTheme();
            drawBoard();
            resetDemo7Trigger = false;
        }
    };

    function drawBoard() {
        p.background(255);
        if (gameStart) {
            let idx = 0;
            for (let r = 0; r < 4; r++) {
                gameBoard[r] = [];
                for (let c = 0; c < 4; c++) {
                    gameBoard[r][c] = mixedWords[idx++];
                }
            }
            gameStart = false;
        }
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                p.fill(255);
                p.rect(c * 100, r * 100, 100, 100);
                let w = gameBoard[r][c];
                p.fill(0);
                if (isEmoji(w)) p.textSize(60);
                else p.textSize(20);
                p.text(w, c * 100 + 50, r * 100 + 50);
            }
        }
    }
};
new p5(s7);

// ==========================================
// STEP 8 DEMO: Levels (Full Game Simulation)
// ==========================================
let forceNextLevelTrigger = false;
let resetDemo8Trigger = false;
window.forceNextLevel = () => { forceNextLevelTrigger = true; };
window.resetDemo8 = () => { resetDemo8Trigger = true; };

const s8 = (p) => {
    let themeList = [themes.colors, themes.animals, themes.professions, themes.fruits];
    let level = 0;
    let gameFinished = false;

    let mixedWords = [];
    let gameBoard = [];
    let satir1 = -1, sutun1 = -1, satir2 = -1, sutun2 = -1;
    let counter = -1;
    let score = 0;
    let gameStart = true;
    let matchedPair = 0;

    function isEmoji(s) {
        return /\p{Extended_Pictographic}/u.test(s);
    }

    p.setup = () => {
        let canvas = p.createCanvas(400, 500);
        canvas.parent('demo-step8');
        p.textAlign(p.CENTER, p.CENTER);
        startLevel(0);
    };

    function startLevel(lvl) {
        if (lvl >= 4) {
            gameFinished = true;
            drawBoard();
            return;
        }
        level = lvl;
        let words = themeList[level];
        mixedWords = p.shuffle([...words]);
        gameBoard = [];
        satir1 = -1; sutun1 = -1; satir2 = -1; sutun2 = -1;
        counter = -1;
        matchedPair = 0;
        gameStart = true;
        drawBoard();
    }

    p.draw = () => {
        if (resetDemo8Trigger) {
            score = 0;
            gameFinished = false;
            startLevel(0);
            p.loop(); // In case loop was stopped at Game Over
            resetDemo8Trigger = false;
        }

        if (forceNextLevelTrigger) {
            startLevel(level + 1);
            forceNextLevelTrigger = false;
        }

        if (counter != -1) counter++;
        if (counter == 30) {
            satir1 = -1; sutun1 = -1; satir2 = -1; sutun2 = -1; counter = -1;
            drawBoard();
        }
    };

    function drawBoard() {
        if (gameFinished) {
            p.background("green");
            p.fill("white");
            p.textSize(32);
            p.text("TEBRIKLER!", 200, 200);
            p.textSize(20);
            p.text("Tüm Seviyeler Tamamlandı!", 200, 250);
            p.text(`Son Puan: ${score}`, 200, 300);
            return;
        }

        p.background(255);
        if (gameStart) {
            let idx = 0;
            for (let r = 0; r < 4; r++) {
                gameBoard[r] = [];
                for (let c = 0; c < 4; c++) {
                    gameBoard[r][c] = mixedWords[idx++];
                }
            }
            gameStart = false;
        }

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                p.fill(255);
                if (gameBoard[r][c] == "") p.fill(0);
                if (satir1 == r && sutun1 == c) p.fill('yellow');
                if (satir2 == r && sutun2 == c) p.fill('orange');
                p.rect(c * 100, r * 100, 100, 100);

                let w = gameBoard[r][c];
                p.fill(0);
                if (w != "") {
                    if (isEmoji(w)) p.textSize(60);
                    else p.textSize(20);
                    p.text(w, c * 100 + 50, r * 100 + 50);
                }
            }
        }

        // Stats
        p.textSize(20);
        p.fill(0);
        p.text(`Seviye: ${level + 1}/4   Puan: ${score}`, 200, 450);

        // Progress bar for fun
        let progress = matchedPair / 8;
        p.noStroke();
        p.fill(200);
        p.rect(50, 470, 300, 10);
        p.fill('green');
        p.rect(50, 470, 300 * progress, 10);
        p.stroke(0);
    }

    p.mousePressed = () => {
        if (gameFinished) return;
        if (p.mouseY > 400) return;
        let c = Math.floor(p.mouseX / 100);
        let r = Math.floor(p.mouseY / 100);

        if (satir1 == -1 && sutun1 == -1 && gameBoard[r][c] != "") {
            satir1 = r; sutun1 = c;
            drawBoard();
        } else if (satir2 == -1 && sutun2 == -1 && !(satir1 == r && sutun1 == c) && gameBoard[r][c] != "") {
            satir2 = r; sutun2 = c;
            drawBoard();

            let w1 = gameBoard[satir1][sutun1];
            let w2 = gameBoard[satir2][sutun2];

            // Need index logic - since we shuffle every time, we need original Theme array to check pairs
            let currentTheme = themeList[level];
            let ind1 = currentTheme.indexOf(w1);
            let ind2 = currentTheme.indexOf(w2);

            if (Math.floor(ind1 / 2) == Math.floor(ind2 / 2)) {
                score += 10;
                gameBoard[satir1][sutun1] = "";
                gameBoard[satir2][sutun2] = "";
                matchedPair++;

                if (matchedPair == 8) {
                    // Level Win!
                    setTimeout(() => {
                        score += 50; // Level bonus
                        startLevel(level + 1);
                    }, 500);
                }
            } else {
                score -= 2;
            }
            counter = 0;
        }
    }
};
new p5(s8);
