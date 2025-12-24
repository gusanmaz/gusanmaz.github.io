// Theme Toggle
function toggleTheme() {
    const root = document.documentElement;
    root.classList.toggle('light-mode');
    const isLight = root.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
}

// Scroll Navigation
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update active nav dot
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.story-section');
    const dots = document.querySelectorAll('.nav-dot');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('onclick').includes(current)) {
            dot.classList.add('active');
        }
    });
});

// Shared Data
const words = ['red', 'kirmizi', 'black', 'siyah', 'blue', 'mavi',
    'green', 'yesil', 'white', 'beyaz', 'yellow', 'sari',
    'orange', 'turuncu', 'gray', 'gri'];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    let newArray = [...array];
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
}

// --- Step 1 Demo ---
function initStep1Demo() {
    const container = document.getElementById('demo-step1');
    if (!container) return;

    const mixedWords = shuffle(words);
    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(4, 80px)';
    container.style.gap = '5px';
    container.style.justifyContent = 'center';

    mixedWords.forEach(word => {
        const cell = document.createElement('div');
        cell.className = 'v5-cell';
        cell.textContent = word;
        container.appendChild(cell);
    });
}

// ========================================
// --- Step 2 Demo (BASİT - Counter YOK) ---
// ========================================
let step2SimpleState = {
    satir1: -1, sutun1: -1,
    satir2: -1, sutun2: -1,
    mixedWords: [],
    gameBoard: []
};

function resetDemo2Simple() {
    const container = document.getElementById('demo-step2-simple');
    const consoleOut = document.getElementById('console-step2-simple');
    if (!container) return;

    step2SimpleState.mixedWords = shuffle(words);
    step2SimpleState.satir1 = -1; step2SimpleState.sutun1 = -1;
    step2SimpleState.satir2 = -1; step2SimpleState.sutun2 = -1;
    step2SimpleState.gameBoard = [];

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(4, 80px)';
    container.style.gap = '5px';
    container.style.justifyContent = 'center';
    consoleOut.innerHTML = '<div class="console-line dim">// Console Output</div>';

    // Fill gameBoard
    let idx = 0;
    for(let r=0; r<4; r++) {
        step2SimpleState.gameBoard[r] = [];
        for(let c=0; c<4; c++) {
            step2SimpleState.gameBoard[r][c] = step2SimpleState.mixedWords[idx++];
        }
    }

    drawStep2SimpleBoard();
    updateStep2SimpleDisplay();
}

function drawStep2SimpleBoard() {
    const container = document.getElementById('demo-step2-simple');
    if (!container) return;

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(4, 80px)';
    container.style.gap = '5px';
    container.style.justifyContent = 'center';

    for(let r=0; r<4; r++) {
        for(let c=0; c<4; c++) {
            const cell = document.createElement('div');
            cell.className = 'v5-cell';
            cell.textContent = step2SimpleState.gameBoard[r][c];
            cell.onclick = () => handleStep2SimpleClick(r, c);

            // Highlight selections
            if (step2SimpleState.satir1 === r && step2SimpleState.sutun1 === c) {
                cell.style.borderColor = 'yellow';
                cell.style.backgroundColor = 'rgba(255, 229, 133, 0.3)';
            }
            if (step2SimpleState.satir2 === r && step2SimpleState.sutun2 === c) {
                cell.style.borderColor = 'orange';
                cell.style.backgroundColor = 'rgba(255, 153, 64, 0.3)';
            }

            container.appendChild(cell);
        }
    }
}

function logStep2Simple(msg, type='info') {
    const consoleOut = document.getElementById('console-step2-simple');
    if (!consoleOut) return;
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    line.textContent = `> ${msg}`;
    consoleOut.appendChild(line);
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

function updateStep2SimpleDisplay() {
    const s1 = document.getElementById('step2-s1-simple');
    const c1 = document.getElementById('step2-c1-simple');
    const s2 = document.getElementById('step2-s2-simple');
    const c2 = document.getElementById('step2-c2-simple');
    const status = document.getElementById('step2-status-simple');

    if (s1) s1.textContent = step2SimpleState.satir1;
    if (c1) c1.textContent = step2SimpleState.sutun1;
    if (s2) s2.textContent = step2SimpleState.satir2;
    if (c2) c2.textContent = step2SimpleState.sutun2;

    if (status) {
        if (step2SimpleState.satir1 === -1) {
            status.textContent = "Birinci kartı seçin...";
            status.style.color = "var(--accent-blue)";
        } else if (step2SimpleState.satir2 === -1) {
            status.textContent = "İkinci kartı seçin...";
            status.style.color = "var(--accent-orange)";
        } else {
            status.textContent = "⚠️ İki kart seçildi ama değerler -1'e dönmüyor! Yeniden başlatın.";
            status.style.color = "var(--accent-red)";
        }
    }
}

function handleStep2SimpleClick(r, c) {
    // BASİT VERSİYON - Counter YOK, değerler -1'e DÖNMÜYOR
    if (step2SimpleState.satir1 === -1 && step2SimpleState.sutun1 === -1) {
        step2SimpleState.satir1 = r;
        step2SimpleState.sutun1 = c;
        logStep2Simple(`Seçim 1: [${r}, ${c}] - ${step2SimpleState.gameBoard[r][c]}`);
        drawStep2SimpleBoard();
        updateStep2SimpleDisplay();
    } else if (step2SimpleState.satir2 === -1 && step2SimpleState.sutun2 === -1) {
        step2SimpleState.satir2 = r;
        step2SimpleState.sutun2 = c;
        logStep2Simple(`Seçim 2: [${r}, ${c}] - ${step2SimpleState.gameBoard[r][c]}`);
        drawStep2SimpleBoard();

        // Check match
        let w1 = step2SimpleState.gameBoard[step2SimpleState.satir1][step2SimpleState.sutun1];
        let w2 = step2SimpleState.gameBoard[step2SimpleState.satir2][step2SimpleState.sutun2];
        let ind1 = words.indexOf(w1);
        let ind2 = words.indexOf(w2);

        logStep2Simple(`ind1 = ${ind1}, floor(${ind1}/2) = ${Math.floor(ind1/2)}`);
        logStep2Simple(`ind2 = ${ind2}, floor(${ind2}/2) = ${Math.floor(ind2/2)}`);

        if (Math.floor(ind1 / 2) === Math.floor(ind2 / 2)) {
            logStep2Simple("✓ Pair buldum!", "output");
        } else {
            logStep2Simple("✗ Pair bulamadim", "error");
        }

        // BU VERSİYONDA RESET YOK!
        logStep2Simple("⚠️ Değerler -1'e dönmedi! Yeni seçim yapılamıyor.", "error");
        updateStep2SimpleDisplay();
    }
}

// ========================================
// --- Step 3 Demo (COUNTER İLE) ---
// ========================================
let step3State = {
    satir1: -1, sutun1: -1,
    satir2: -1, sutun2: -1,
    mixedWords: [],
    gameBoard: [],
    counter: -1
};

let step3Interval = null;

function resetDemo3WithCounter() {
    const container = document.getElementById('demo-step3');
    const consoleOut = document.getElementById('console-step3');
    if (!container) return;

    // Clear any existing interval
    if (step3Interval) {
        clearInterval(step3Interval);
        step3Interval = null;
    }

    step3State.mixedWords = shuffle(words);
    step3State.satir1 = -1; step3State.sutun1 = -1;
    step3State.satir2 = -1; step3State.sutun2 = -1;
    step3State.gameBoard = [];
    step3State.counter = -1;

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(4, 80px)';
    container.style.gap = '5px';
    container.style.justifyContent = 'center';
    consoleOut.innerHTML = '<div class="console-line dim">// Console Output</div>';

    // Fill gameBoard
    let idx = 0;
    for(let r=0; r<4; r++) {
        step3State.gameBoard[r] = [];
        for(let c=0; c<4; c++) {
            step3State.gameBoard[r][c] = step3State.mixedWords[idx++];
        }
    }

    drawStep3Board();
    updateStep3Display();

    // Start game loop for counter
    step3Interval = setInterval(step3GameLoop, 1000/30); // 30 FPS
}

function step3GameLoop() {
    if (step3State.counter !== -1) {
        step3State.counter++;
        // Update counter display
        const counterEl = document.getElementById('step3-counter');
        if (counterEl) counterEl.textContent = step3State.counter;
    }
    if (step3State.counter >= 120) { // ~2 seconds at 60 FPS (gerçek oyundaki gibi)
        logStep3("✓ Counter 120'ye ulaştı! Kartlar sıfırlanıyor...", "output");
        step3State.satir1 = -1;
        step3State.sutun1 = -1;
        step3State.satir2 = -1;
        step3State.sutun2 = -1;
        step3State.counter = -1;
        drawStep3Board();
        updateStep3Display();
    }
}

function drawStep3Board() {
    const container = document.getElementById('demo-step3');
    if (!container) return;

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(4, 80px)';
    container.style.gap = '5px';
    container.style.justifyContent = 'center';

    for(let r=0; r<4; r++) {
        for(let c=0; c<4; c++) {
            const cell = document.createElement('div');
            cell.className = 'v5-cell';
            cell.textContent = step3State.gameBoard[r][c];
            cell.onclick = () => handleStep3Click(r, c);

            // Highlight selections
            if (step3State.satir1 === r && step3State.sutun1 === c) {
                cell.style.borderColor = 'yellow';
                cell.style.backgroundColor = 'rgba(255, 229, 133, 0.3)';
            }
            if (step3State.satir2 === r && step3State.sutun2 === c) {
                cell.style.borderColor = 'orange';
                cell.style.backgroundColor = 'rgba(255, 153, 64, 0.3)';
            }

            container.appendChild(cell);
        }
    }
}

function logStep3(msg, type='info') {
    const consoleOut = document.getElementById('console-step3');
    if (!consoleOut) return;
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    line.textContent = `> ${msg}`;
    consoleOut.appendChild(line);
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

function updateStep3Display() {
    const s1 = document.getElementById('step3-s1');
    const c1 = document.getElementById('step3-c1');
    const s2 = document.getElementById('step3-s2');
    const c2 = document.getElementById('step3-c2');
    const counterEl = document.getElementById('step3-counter');
    const status = document.getElementById('step3-status');

    if (s1) s1.textContent = step3State.satir1;
    if (c1) c1.textContent = step3State.sutun1;
    if (s2) s2.textContent = step3State.satir2;
    if (c2) c2.textContent = step3State.sutun2;
    if (counterEl) counterEl.textContent = step3State.counter;

    if (status) {
        if (step3State.satir1 === -1) {
            status.textContent = "Birinci kartı seçin...";
            status.style.color = "var(--accent-blue)";
        } else if (step3State.satir2 === -1) {
            status.textContent = "İkinci kartı seçin...";
            status.style.color = "var(--accent-orange)";
        } else if (step3State.counter !== -1) {
            status.textContent = `Counter çalışıyor... (${step3State.counter}/120)`;
            status.style.color = "var(--accent-purple)";
        } else {
            status.textContent = "Kartlar sıfırlandı! Yeni seçim yapabilirsiniz.";
            status.style.color = "var(--accent-green)";
        }
    }
}

function handleStep3Click(r, c) {
    // Counter çalışıyorken tıklama kabul etme
    if (step3State.counter !== -1) return;

    if (step3State.satir1 === -1 && step3State.sutun1 === -1) {
        step3State.satir1 = r;
        step3State.sutun1 = c;
        logStep3(`Seçim 1: [${r}, ${c}] - ${step3State.gameBoard[r][c]}`);
        drawStep3Board();
        updateStep3Display();
    } else if (step3State.satir2 === -1 && step3State.sutun2 === -1) {
        step3State.satir2 = r;
        step3State.sutun2 = c;
        logStep3(`Seçim 2: [${r}, ${c}] - ${step3State.gameBoard[r][c]}`);
        drawStep3Board();

        // Check match
        let w1 = step3State.gameBoard[step3State.satir1][step3State.sutun1];
        let w2 = step3State.gameBoard[step3State.satir2][step3State.sutun2];
        let ind1 = words.indexOf(w1);
        let ind2 = words.indexOf(w2);

        logStep3(`ind1 = ${ind1}, floor(${ind1}/2) = ${Math.floor(ind1/2)}`);
        logStep3(`ind2 = ${ind2}, floor(${ind2}/2) = ${Math.floor(ind2/2)}`);

        if (Math.floor(ind1 / 2) === Math.floor(ind2 / 2)) {
            logStep3("✓ Pair buldum!", "output");
        } else {
            logStep3("✗ Pair bulamadim", "error");
        }

        // COUNTER BAŞLAT!
        step3State.counter = 0;
        logStep3("Counter başladı (0), 120'ye kadar sayacak...", "dim");
        updateStep3Display();
    }
}

// ========================================
// --- Eski Step 2 (backward compatibility) ---
// ========================================
function resetDemo2() {
    resetDemo2Simple();
}

// --- Disco Mode Demo ---
let discoInterval;
function toggleDiscoMode() {
    const container = document.getElementById('disco-grid');
    if (!container) return;

    if (discoInterval) {
        clearInterval(discoInterval);
        discoInterval = null;
        container.innerHTML = '<div style="padding:2rem; color:var(--text-secondary)">Disko modu durduruldu.</div>';
        return;
    }

    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(4, 80px)';
    container.style.gap = '5px';
    container.style.justifyContent = 'center';

    discoInterval = setInterval(() => {
        container.innerHTML = '';
        const currentWords = shuffle(words); // Reshuffle every frame!
        currentWords.forEach(word => {
            const cell = document.createElement('div');
            cell.className = 'v5-cell';
            cell.textContent = word;
            // Random colors to enhance effect
            cell.style.borderColor = `hsl(${Math.random()*360}, 70%, 60%)`;
            container.appendChild(cell);
        });
    }, 100); // 10 FPS
}

// --- Counter Demo ---
let counterDemoInterval;
let counterDemoValue = -1;
let counterDemoRunning = false;

function toggleCounterDemo() {
    const btn = document.getElementById('counter-toggle-btn');
    if (!btn) return;

    if (counterDemoRunning) {
        // Durdur
        stopCounterDemo();
        btn.textContent = 'Devam Et';
    } else {
        // Başlat veya devam et
        if (counterDemoValue === -1) {
            counterDemoValue = 0;
        }
        startCounterDemo();
        btn.textContent = 'Durdur';
    }
}

function startCounterDemo() {
    if (counterDemoRunning) return;
    counterDemoRunning = true;

    counterDemoInterval = setInterval(() => {
        const display = document.getElementById('counter-display');
        const status = document.getElementById('counter-status');
        const progress = document.getElementById('counter-progress');
        const percent = document.getElementById('counter-percent');
        const btn = document.getElementById('counter-toggle-btn');

        if (!display) {
            stopCounterDemo();
            return;
        }

        display.textContent = counterDemoValue;
        const percentage = (counterDemoValue / 20) * 100; // 20 frame'e düşürdük
        progress.style.width = percentage + '%';
        percent.textContent = Math.floor(percentage);

        if (counterDemoValue < 20) { // 20 frame
            status.textContent = `Counter çalışıyor... (${counterDemoValue}/20)`;
            status.style.color = 'var(--accent-blue)';
            counterDemoValue++;
        } else {
            status.textContent = "Counter 20'ye ulaştı! Kartlar sıfırlanacak.";
            status.style.color = 'var(--accent-green)';
            setTimeout(() => {
                counterDemoValue = -1;
                display.textContent = '-1';
                status.textContent = 'Counter -1\'e döndü (counter === -1). Tekrar başlatabilirsiniz.';
                status.style.color = 'var(--accent-orange)';
                progress.style.width = '0%';
                percent.textContent = '0';
                if (btn) btn.textContent = 'Başlat';
                stopCounterDemo();
            }, 1000);
        }
    }, 100); // Daha yavaş: 100ms = saniyede 10 frame
}

function stopCounterDemo() {
    if (counterDemoInterval) {
        clearInterval(counterDemoInterval);
        counterDemoInterval = null;
    }
    counterDemoRunning = false;
}

function resetCounterDemo() {
    stopCounterDemo();
    counterDemoValue = -1;

    const display = document.getElementById('counter-display');
    const status = document.getElementById('counter-status');
    const progress = document.getElementById('counter-progress');
    const percent = document.getElementById('counter-percent');
    const btn = document.getElementById('counter-toggle-btn');

    if (display) display.textContent = '-1';
    if (status) {
        status.textContent = 'Counter durumda (counter === -1)';
        status.style.color = 'var(--text-secondary)';
    }
    if (progress) progress.style.width = '0%';
    if (percent) percent.textContent = '0';
    if (btn) btn.textContent = 'Başlat';
}

// --- Final Game ---
let finalState = {
    gameBoard: [],
    satir1: -1, sutun1: -1,
    satir2: -1, sutun2: -1,
    counter: -1,
    gameStart: true,
    matchedPair: 0
};

function resetFinalGame() {
    const container = document.getElementById('final-grid');
    const msg = document.getElementById('final-message');
    const consoleOut = document.getElementById('final-console');

    if (!container) return;

    finalState.gameBoard = [];
    finalState.satir1 = -1; finalState.sutun1 = -1;
    finalState.satir2 = -1; finalState.sutun2 = -1;
    finalState.counter = -1;
    finalState.gameStart = true;
    finalState.matchedPair = 0;

    msg.textContent = "";
    msg.style.color = "var(--accent-green)";
    consoleOut.innerHTML = '<div class="console-line dim">// Game Console</div>';

    // Setup board
    let mixed = shuffle(words);
    let idx = 0;
    for(let r=0; r<4; r++) {
        finalState.gameBoard[r] = [];
        for(let c=0; c<4; c++) {
            finalState.gameBoard[r][c] = mixed[idx++];
        }
    }
    finalState.gameStart = false;

    drawFinalBoard();

    // Start game loop for counter
    if (window.finalGameLoop) clearInterval(window.finalGameLoop);
    window.finalGameLoop = setInterval(finalGameUpdate, 1000/60); // 60 FPS
}

function logFinal(msg, type='info') {
    const consoleOut = document.getElementById('final-console');
    if (!consoleOut) return;
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    line.textContent = `> ${msg}`;
    consoleOut.appendChild(line);
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

function finalGameUpdate() {
    if (finalState.counter != -1) {
        finalState.counter++;
    }
    if (finalState.counter >= 60) { // 1 second wait (approx)
        finalState.satir1 = -1;
        finalState.sutun1 = -1;
        finalState.satir2 = -1;
        finalState.sutun2 = -1;
        finalState.counter = -1;
        drawFinalBoard();
    }
}

function drawFinalBoard() {
    const container = document.getElementById('final-grid');
    container.innerHTML = '';

    for(let r=0; r<4; r++) {
        for(let c=0; c<4; c++) {
            const cell = document.createElement('div');
            cell.className = 'v5-cell';

            let word = finalState.gameBoard[r][c];

            if (word === "") {
                cell.style.backgroundColor = 'black';
                cell.style.borderColor = '#333';
                cell.style.cursor = 'default';
            } else {
                cell.textContent = word;
                cell.onclick = () => handleFinalClick(r, c);

                // Highlight selections
                if (finalState.satir1 == r && finalState.sutun1 == c) {
                    cell.style.backgroundColor = 'yellow';
                    cell.style.color = 'black';
                    cell.style.borderColor = 'yellow';
                }
                if (finalState.satir2 == r && finalState.sutun2 == c) {
                    cell.style.backgroundColor = 'orange';
                    cell.style.color = 'black';
                    cell.style.borderColor = 'orange';
                }
            }
            container.appendChild(cell);
        }
    }
}

function handleFinalClick(r, c) {
    // Prevent clicking if waiting or empty
    if (finalState.counter != -1) return;
    if (finalState.gameBoard[r][c] === "") return;

    if (finalState.satir1 == -1 && finalState.sutun1 == -1) {
        finalState.satir1 = r;
        finalState.sutun1 = c;
        drawFinalBoard();
    } else if (finalState.satir2 == -1 && finalState.sutun2 == -1 &&
               !(finalState.satir1 == r && finalState.sutun1 == c)) {

        finalState.satir2 = r;
        finalState.sutun2 = c;
        drawFinalBoard();

        let w1 = finalState.gameBoard[finalState.satir1][finalState.sutun1];
        let w2 = finalState.gameBoard[finalState.satir2][finalState.sutun2];
        let ind1 = words.indexOf(w1);
        let ind2 = words.indexOf(w2);

        if (Math.floor(ind1 / 2) == Math.floor(ind2 / 2)) {
            logFinal("Eşleşme bulundu!", "output");
            // Remove words
            setTimeout(() => {
                finalState.gameBoard[finalState.satir1][finalState.sutun1] = "";
                finalState.gameBoard[finalState.satir2][finalState.sutun2] = "";
                finalState.satir1 = -1;
                finalState.sutun1 = -1;
                finalState.satir2 = -1;
                finalState.sutun2 = -1;
                drawFinalBoard();
                checkWin();
            }, 500);
        } else {
            logFinal("Eşleşme yok.", "dim");
            finalState.counter = 0; // Start timer to hide
        }
    }
}

function checkWin() {
    let isEmpty = true;
    for(let r=0; r<4; r++) {
        for(let c=0; c<4; c++) {
            if (finalState.gameBoard[r][c] !== "") {
                isEmpty = false;
                break;
            }
        }
    }

    if (isEmpty) {
        const msg = document.getElementById('final-message');
        msg.textContent = "TEBRİKLER! OYUN BİTTİ! 🎉";
        logFinal("OYUN BİTTİ!", "output");
        document.getElementById('final-grid').style.backgroundColor = 'rgba(127, 217, 98, 0.1)';
    }
}

// Initialize
window.onload = () => {
    initStep1Demo();
    resetDemo2Simple();
    resetDemo3WithCounter();
    resetFinalGame();
};

