// Connect4 Tutorial - Interactive Demos
// =====================================

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'light');
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update navigation dots on scroll
function updateNavDots() {
    const sections = document.querySelectorAll('.story-section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    let currentSection = 0;
    const scrollPos = window.scrollY + window.innerHeight / 3;
    
    sections.forEach((section, index) => {
        if (section.offsetTop <= scrollPos) {
            currentSection = index;
        }
    });
    
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSection);
    });
}

window.addEventListener('scroll', updateNavDots);

// =====================================
// Preview Grid (Hero Section)
// =====================================

let previewBoard = [];
let previewPlayer = 1;
let previewGameOver = false;

function initPreview() {
    const grid = document.getElementById('preview-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    previewBoard = [];
    previewPlayer = 1;
    previewGameOver = false;
    
    for (let r = 0; r < 6; r++) {
        previewBoard[r] = [];
        for (let c = 0; c < 7; c++) {
            previewBoard[r][c] = 0;
            const cell = document.createElement('div');
            cell.className = 'preview-cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => previewDropPiece(c));
            grid.appendChild(cell);
        }
    }
}

function previewDropPiece(col) {
    if (previewGameOver) return;
    
    for (let r = 5; r >= 0; r--) {
        if (previewBoard[r][col] === 0) {
            previewBoard[r][col] = previewPlayer;
            updatePreviewCell(r, col);
            
            if (checkPreviewWin(r, col, previewPlayer)) {
                previewGameOver = true;
                highlightPreviewWin();
            } else {
                previewPlayer = previewPlayer === 1 ? 2 : 1;
            }
            return;
        }
    }
}

function updatePreviewCell(row, col) {
    const grid = document.getElementById('preview-grid');
    const index = row * 7 + col;
    const cell = grid.children[index];
    cell.className = 'preview-cell player' + previewBoard[row][col];
}

function checkPreviewWin(row, col, player) {
    // Simplified win check
    const directions = [
        [[0, 1], [0, -1]],  // Horizontal
        [[1, 0], [-1, 0]],  // Vertical
        [[1, 1], [-1, -1]], // Diagonal 1
        [[1, -1], [-1, 1]]  // Diagonal 2
    ];
    
    for (const [dir1, dir2] of directions) {
        let count = 1;
        count += countInDirection(row, col, dir1[0], dir1[1], player);
        count += countInDirection(row, col, dir2[0], dir2[1], player);
        if (count >= 4) return true;
    }
    return false;
}

function countInDirection(row, col, dRow, dCol, player) {
    let count = 0;
    let r = row + dRow;
    let c = col + dCol;
    
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && previewBoard[r][c] === player) {
        count++;
        r += dRow;
        c += dCol;
    }
    return count;
}

function highlightPreviewWin() {
    // Simple highlight - just show game over state
    const grid = document.getElementById('preview-grid');
    for (let i = 0; i < grid.children.length; i++) {
        const cell = grid.children[i];
        if (cell.classList.contains('player' + previewPlayer)) {
            // Could add winning animation here
        }
    }
}

function resetPreview() {
    initPreview();
}

// =====================================
// Step 2: Coordinate Calculator
// =====================================

function updateStep2Calc() {
    const col = parseInt(document.getElementById('step2-col').value);
    const row = parseInt(document.getElementById('step2-row').value);
    
    document.getElementById('step2-col-val').textContent = col;
    document.getElementById('step2-row-val').textContent = row;
    
    const x = col * 80 + 40;
    const y = row * 80 + 40;
    
    document.getElementById('step2-x').textContent = x;
    document.getElementById('step2-y').textContent = y;
}

// =====================================
// Step 4: Click Demo
// =====================================

function initStep4Demo() {
    const grid = document.getElementById('step4-demo');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            const cell = document.createElement('div');
            cell.className = 'click-demo-cell';
            cell.addEventListener('click', () => {
                document.getElementById('step4-info').innerHTML = 
                    `<span style="color: var(--accent-green)">Tıklanan sütun: ${c}</span><br>` +
                    `<span style="color: var(--text-secondary)">mouseX / 80 = ${c * 80 + 40} / 80 ≈ ${c}</span>`;
                
                // Highlight column
                const cells = grid.querySelectorAll('.click-demo-cell');
                cells.forEach((cell, index) => {
                    const cellCol = index % 7;
                    cell.style.background = cellCol === c ? 'rgba(255, 255, 255, 0.3)' : '';
                });
            });
            grid.appendChild(cell);
        }
    }
}

// =====================================
// Step 8: Horizontal Check Demo
// =====================================

let horizontalDemoBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0],
    [0, 2, 2, 2, 1, 2, 0],
    [2, 1, 1, 2, 2, 1, 2]
];

function initHorizontalDemo() {
    const grid = document.getElementById('horizontal-demo');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            const cell = document.createElement('div');
            cell.className = 'win-check-cell';
            cell.id = `h-cell-${r}-${c}`;
            
            if (horizontalDemoBoard[r][c] === 1) {
                cell.classList.add('player1');
            } else if (horizontalDemoBoard[r][c] === 2) {
                cell.classList.add('player2');
            }
            
            grid.appendChild(cell);
        }
    }
}

function runHorizontalDemo() {
    const consoleEl = document.getElementById('horizontal-console');
    consoleEl.innerHTML = '';
    
    // Reset all cells
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            const cell = document.getElementById(`h-cell-${r}-${c}`);
            cell.classList.remove('checking', 'winning');
        }
    }
    
    const row = 3; // Check row 3
    let count = 0;
    let step = 0;
    const winningCells = [];
    
    function checkNext() {
        if (step > 0) {
            const prevCell = document.getElementById(`h-cell-${row}-${step - 1}`);
            prevCell.classList.remove('checking');
        }
        
        if (step >= 7) {
            // Done
            addConsoleLine(consoleEl, `Sonuç: ${winningCells.length >= 4 ? 'KAZANDI!' : 'Kazanma yok'}`, 
                winningCells.length >= 4 ? 'output' : 'dim');
            
            if (winningCells.length >= 4) {
                winningCells.forEach(c => {
                    document.getElementById(`h-cell-${row}-${c}`).classList.add('winning');
                });
            }
            return;
        }
        
        const cell = document.getElementById(`h-cell-${row}-${step}`);
        cell.classList.add('checking');
        
        if (horizontalDemoBoard[row][step] === 1) {
            count++;
            winningCells.push(step);
            addConsoleLine(consoleEl, `Sütun ${step}: Kırmızı ✓ (count = ${count})`, 'output');
        } else {
            count = 0;
            winningCells.length = 0;
            addConsoleLine(consoleEl, `Sütun ${step}: ${horizontalDemoBoard[row][step] === 2 ? 'Sarı' : 'Boş'} (count sıfırlandı)`, 'dim');
        }
        
        step++;
        setTimeout(checkNext, 600);
    }
    
    addConsoleLine(consoleEl, `Satır ${row} kontrol ediliyor...`, 'info');
    setTimeout(checkNext, 500);
}

function addConsoleLine(consoleEl, text, className = '') {
    const line = document.createElement('div');
    line.className = 'console-line ' + className;
    line.textContent = '> ' + text;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
}

// =====================================
// Final Game
// =====================================

let finalBoard = [];
let finalPlayer = 1;
let finalGameOver = false;
let finalScore = { p1: 0, p2: 0 };
let finalWinningCells = [];

function initFinalGame() {
    const grid = document.getElementById('final-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    finalBoard = [];
    finalPlayer = 1;
    finalGameOver = false;
    finalWinningCells = [];
    
    for (let r = 0; r < 6; r++) {
        finalBoard[r] = [];
        for (let c = 0; c < 7; c++) {
            finalBoard[r][c] = 0;
            const cell = document.createElement('div');
            cell.className = 'game-cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => finalDropPiece(c));
            grid.appendChild(cell);
        }
    }
    
    updateFinalStatus();
    document.getElementById('final-message').textContent = '';
    document.getElementById('final-message').className = 'game-message';
}

function finalDropPiece(col) {
    if (finalGameOver) return;
    
    for (let r = 5; r >= 0; r--) {
        if (finalBoard[r][col] === 0) {
            finalBoard[r][col] = finalPlayer;
            updateFinalCell(r, col);
            
            if (checkFinalWin(r, col, finalPlayer)) {
                finalGameOver = true;
                if (finalPlayer === 1) {
                    finalScore.p1++;
                    showFinalMessage('KIRMIZI KAZANDI!', 'win-red');
                } else {
                    finalScore.p2++;
                    showFinalMessage('SARI KAZANDI!', 'win-yellow');
                }
                updateFinalScore();
                highlightFinalWin();
            } else if (checkFinalDraw()) {
                finalGameOver = true;
                showFinalMessage('BERABERE!', 'draw');
            } else {
                finalPlayer = finalPlayer === 1 ? 2 : 1;
                updateFinalStatus();
            }
            return;
        }
    }
}

function updateFinalCell(row, col) {
    const grid = document.getElementById('final-grid');
    const index = row * 7 + col;
    const cell = grid.children[index];
    cell.className = 'game-cell player' + finalBoard[row][col];
}

function checkFinalWin(row, col, player) {
    const directions = [
        [[0, 1], [0, -1]],
        [[1, 0], [-1, 0]],
        [[1, 1], [-1, -1]],
        [[1, -1], [-1, 1]]
    ];
    
    for (const [dir1, dir2] of directions) {
        const cells1 = getCellsInDirection(row, col, dir1[0], dir1[1], player);
        const cells2 = getCellsInDirection(row, col, dir2[0], dir2[1], player);
        const allCells = [...cells1, [row, col], ...cells2];
        
        if (allCells.length >= 4) {
            finalWinningCells = allCells;
            return true;
        }
    }
    return false;
}

function getCellsInDirection(row, col, dRow, dCol, player) {
    const cells = [];
    let r = row + dRow;
    let c = col + dCol;
    
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && finalBoard[r][c] === player) {
        cells.push([r, c]);
        r += dRow;
        c += dCol;
    }
    return cells;
}

function checkFinalDraw() {
    for (let c = 0; c < 7; c++) {
        if (finalBoard[0][c] === 0) return false;
    }
    return true;
}

function highlightFinalWin() {
    const grid = document.getElementById('final-grid');
    finalWinningCells.forEach(([r, c]) => {
        const index = r * 7 + c;
        grid.children[index].classList.add('winning');
    });
}

function updateFinalStatus() {
    const status = document.getElementById('final-status');
    status.textContent = finalPlayer === 1 ? 'Sıra: Kırmızı' : 'Sıra: Sarı';
    status.style.color = finalPlayer === 1 ? 'var(--connect4-red)' : 'var(--connect4-yellow)';
}

function updateFinalScore() {
    document.getElementById('p1-score').textContent = finalScore.p1;
    document.getElementById('p2-score').textContent = finalScore.p2;
}

function showFinalMessage(text, className) {
    const msg = document.getElementById('final-message');
    msg.textContent = text;
    msg.className = 'game-message ' + className;
    
    const status = document.getElementById('final-status');
    status.textContent = 'Yeni oyun için tıklayın';
    status.style.color = 'var(--text-secondary)';
}

function resetFinalGame() {
    initFinalGame();
}

// =====================================
// Initialize on page load
// =====================================

document.addEventListener('DOMContentLoaded', () => {
    initPreview();
    initStep4Demo();
    initHorizontalDemo();
    initFinalGame();
    updateNavDots();
});
