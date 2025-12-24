#!/usr/bin/env python3
"""
Script to add expandable full code sections to all tutorial steps
"""

import re

# Read the HTML file
with open('/home/guvenc/connect4_kilo_anti/connect4-tutorial/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the full code for each step
# Each entry: step_number -> code content (plain text, will be wrapped in HTML)
full_codes = {
    7: '''// Adım 7: Akıllı kazanma algoritması temel kavramları
// (Önceki kod + countInDirection fonksiyonu)

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

// Yön vektörleri ile sayma fonksiyonu
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
}''',

    12: '''// Adım 12: Oyun sonu ekranı
let gameBoard = [];
let currentPlayer = 1;
let gameOver = false;
let winner = 0;

// ... önceki fonksiyonlar ...

function draw() {
    background(0, 100, 200);
    drawBoard();
    
    if (gameOver) {
        // Yarı saydam overlay
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);
        
        // Kazanan mesajı
        fill(255);
        textSize(40);
        textAlign(CENTER, CENTER);
        if (winner == 1) {
            text("KIRMIZI KAZANDI!", width/2, height/2);
        } else {
            text("SARI KAZANDI!", width/2, height/2);
        }
        
        textSize(20);
        text("Yeniden başlamak için tıklayın", width/2, height/2 + 50);
    } else {
        fill(255);
        textSize(20);
        textAlign(LEFT);
        let playerText = (currentPlayer == 1) ? "Kırmızı" : "Sarı";
        text("Sıra: " + playerText, 10, 470);
    }
}''',

    13: '''// Adım 13: Oyunu sıfırlama
let gameBoard = [];
let currentPlayer = 1;
let gameOver = false;
let winner = 0;

function mousePressed() {
    if (gameOver) {
        resetGame();
        return;
    }
    
    let sutun = floor(mouseX / 80);
    if (sutun >= 0 && sutun < 7) {
        dropPiece(sutun);
    }
}

function resetGame() {
    initBoard();
    currentPlayer = 1;
    gameOver = false;
    winner = 0;
}

// ... diğer fonksiyonlar (draw, drawBoard, checkWin, vb.) ...''',
}

def create_expandable_html(step_num, code):
    """Create the expandable HTML block for a step"""
    # Escape HTML entities in the code
    code_escaped = code.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    
    return f'''
            <!-- Expandable Full Code -->
            <details class="full-code-expandable">
                <summary>📂 Adım {step_num} Sonrası Tam Kod</summary>
                <div class="code-block">
                    <div class="code-header">
                        <div class="code-dots"><span class="red"></span><span class="yellow"></span><span class="green"></span></div>
                        sketch.js - Tam Kod (Adım {step_num})
                    </div>
<pre>{code_escaped}</pre>
                </div>
            </details>'''

# Find all sections and add expandable code before their closing tags
def add_expandable_to_step(content, step_num, code):
    """Add expandable code section to a specific step"""
    # Pattern to find the section end
    pattern = rf'(</section>\s*\n\s*<!-- STEP {step_num + 1}:)'
    
    html_block = create_expandable_html(step_num, code)
    
    # Replace only if the expandable doesn't already exist for this step
    check_pattern = rf'Adım {step_num} Sonrası Tam Kod'
    if re.search(check_pattern, content):
        print(f"Step {step_num} already has expandable code, skipping...")
        return content
    
    # Find and replace
    replacement = html_block + r'\n        </section>\n\n        <!-- STEP ' + str(step_num + 1) + ':'
    new_content = re.sub(pattern, replacement, content, count=1)
    
    if new_content != content:
        print(f"Added expandable code to Step {step_num}")
    else:
        print(f"Could not find insertion point for Step {step_num}")
    
    return new_content

# Process each step
for step_num, code in full_codes.items():
    content = add_expandable_to_step(content, step_num, code)

# Write the updated content
with open('/home/guvenc/connect4_kilo_anti/connect4-tutorial/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
