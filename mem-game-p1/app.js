// ==========================================
// WORD DATA
// ==========================================
const en = ['red', 'black', 'blue', 'green', 'white', 'yellow', 'orange', 'gray'];
const tr = ['kırmızı', 'siyah', 'mavi', 'yeşil', 'beyaz', 'sarı', 'turuncu', 'gri'];

// ==========================================
// THEME TOGGLE
// ==========================================
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const themeIcon = document.querySelector('.theme-toggle .theme-icon');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        const themeIcon = document.querySelector('.theme-toggle .theme-icon');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
});

// ==========================================
// COLLAPSIBLE CODE FUNCTIONS
// ==========================================
function toggleCode(header) {
    const codeBlock = header.closest('.collapsible-code');
    codeBlock.classList.toggle('open');
}

function copyCode(event, codeId) {
    event.stopPropagation(); // Don't trigger toggle
    
    const codeEl = document.getElementById(codeId);
    if (!codeEl) return;
    
    const text = codeEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.currentTarget;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>✓</span> Kopyalandı!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function clearConsole(id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
}

function log(consoleId, message, type = '') {
    const consoleEl = document.getElementById(consoleId);
    if (!consoleEl) return;
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    line.textContent = message;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
}

// ==========================================
// NAVIGATION
// ==========================================
window.addEventListener('scroll', () => {
    const sections = ['prologue', 'basics', 'version1', 'version2', 'version3', 'version4', 'version5', 'summary'];
    const dots = document.querySelectorAll('.nav-dot');
    
    sections.forEach((section, index) => {
        const el = document.getElementById(section);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < 300 && rect.bottom > 0) {
                dots.forEach(d => d.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
            }
        }
    });
});

// ==========================================
// PROLOGUE: Goal Grid
// ==========================================
function initGoalGrid() {
    const grid = document.getElementById('goal-grid');
    if (!grid) return;
    shuffleGoalGrid();
}

function shuffleGoalGrid() {
    const grid = document.getElementById('goal-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    let words = [];
    en.forEach(w => words.push({ text: w, type: 'en' }));
    tr.forEach(w => words.push({ text: w, type: 'tr' }));
    
    // Shuffle
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    
    words.forEach(w => {
        const cell = document.createElement('div');
        cell.className = `goal-cell ${w.type}`;
        cell.textContent = w.text;
        grid.appendChild(cell);
    });
}

// ==========================================
// BASICS: Function Demo
// ==========================================
let sayHelloCount = 0;

function callSayHello() {
    sayHelloCount++;
    const consoleEl = document.getElementById('functionDemoConsole');
    if (!consoleEl) return;
    
    if (sayHelloCount === 1) {
        consoleEl.innerHTML = '';
    }
    
    log('functionDemoConsole', `> sayHello(); çağrıldı`, 'info');
    log('functionDemoConsole', `  Merhaba Dünya!`, 'output');
}

// ==========================================
// VERSION 1: Array Visualization
// ==========================================
function initV1Arrays() {
    // EN array
    const enContainer = document.getElementById('v1-en-array');
    if (enContainer) {
        enContainer.innerHTML = '';
        en.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = 'array-item en';
            item.innerHTML = `<span class="index">${i}</span>${word}`;
            item.onclick = () => highlightV1Match(i);
            enContainer.appendChild(item);
        });
    }
    
    // TR array
    const trContainer = document.getElementById('v1-tr-array');
    if (trContainer) {
        trContainer.innerHTML = '';
        tr.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = 'array-item tr';
            item.innerHTML = `<span class="index">${i}</span>${word}`;
            item.onclick = () => highlightV1Match(i);
            trContainer.appendChild(item);
        });
    }
    
    // EN used array - interactive!
    const enUsedContainer = document.getElementById('v1-en-used');
    if (enUsedContainer) {
        enUsedContainer.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const item = document.createElement('div');
            item.className = 'array-item false-val';
            item.id = `v1-en-used-${i}`;
            item.innerHTML = `<span class="index">${i}</span>false`;
            item.dataset.value = 'false';
            item.onclick = () => toggleV1Used('en', i);
            enUsedContainer.appendChild(item);
        }
    }
    
    // TR used array - interactive!
    const trUsedContainer = document.getElementById('v1-tr-used');
    if (trUsedContainer) {
        trUsedContainer.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const item = document.createElement('div');
            item.className = 'array-item false-val';
            item.id = `v1-tr-used-${i}`;
            item.innerHTML = `<span class="index">${i}</span>false`;
            item.dataset.value = 'false';
            item.onclick = () => toggleV1Used('tr', i);
            trUsedContainer.appendChild(item);
        }
    }
}

// V1 Used array toggle
function toggleV1Used(lang, index) {
    const item = document.getElementById(`v1-${lang}-used-${index}`);
    if (!item) return;
    
    const currentVal = item.dataset.value === 'true';
    const newVal = !currentVal;
    
    item.dataset.value = newVal.toString();
    item.className = `array-item ${newVal ? 'true-val' : 'false-val'}`;
    item.innerHTML = `<span class="index">${index}</span>${newVal}`;
    
    // Also update the word item visual
    const wordItem = document.querySelectorAll(`#v1-${lang}-array .array-item`)[index];
    if (wordItem) {
        wordItem.classList.toggle('used', newVal);
    }
}

function highlightV1Match(index) {
    // Clear previous highlights
    document.querySelectorAll('#v1-en-array .array-item, #v1-tr-array .array-item')
        .forEach(el => el.classList.remove('highlight'));
    
    // Highlight both
    const enItems = document.querySelectorAll('#v1-en-array .array-item');
    const trItems = document.querySelectorAll('#v1-tr-array .array-item');
    
    if (enItems[index]) enItems[index].classList.add('highlight');
    if (trItems[index]) trItems[index].classList.add('highlight');
    
    // Update match demo text
    const matchDemo = document.getElementById('v1-match-demo');
    if (matchDemo) {
        matchDemo.innerHTML = `
            <span style="color: var(--accent-blue)">en[${index}] = "${en[index]}"</span>
            <span style="margin: 0 0.5rem">↔</span>
            <span style="color: var(--accent-green)">tr[${index}] = "${tr[index]}"</span>
        `;
    }
}

// ==========================================
// VERSION 1: Canvas Explorer
// ==========================================
function initV1Canvas() {
    const canvas = document.getElementById('v1-canvas');
    if (!canvas) return;
    
    canvas.innerHTML = '';
    
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            cell.className = 'canvas-cell';
            const x = col * 100;
            const y = row * 100;
            cell.innerHTML = `
                <span class="corner"></span>
                <span>(${x}, ${y})</span>
            `;
            cell.onmouseenter = () => showCoordInfo(x, y);
            canvas.appendChild(cell);
        }
    }
}

function showCoordInfo(x, y) {
    const display = document.getElementById('v1-coord-display');
    if (!display) return;
    
    display.innerHTML = `
        <div style="margin-bottom: 0.5rem">
            <strong style="color: var(--accent-blue)">rect(${x}, ${y}, 100, 100)</strong>
        </div>
        <div style="font-size: 0.8rem">
            <span style="color: var(--accent-orange)">●</span> Sol üst köşe: (${x}, ${y})<br>
            <span style="color: var(--text-secondary)">○</span> Sağ alt köşe: (${x + 100}, ${y + 100})
        </div>
    `;
}

// ==========================================
// VERSION 1: allTrue Demo
// ==========================================
let allTrueV1State = [false, false, false, false, false, false, false, false];

function initAllTrueV1() {
    const container = document.getElementById('v1-alltrue-array');
    if (!container) return;
    
    container.innerHTML = '';
    
    allTrueV1State.forEach((val, i) => {
        const item = document.createElement('div');
        item.className = `array-item ${val ? 'true-val' : 'false-val'}`;
        item.id = `v1-at-${i}`;
        item.innerHTML = `<span class="index">${i}</span>${val}`;
        item.onclick = () => toggleAllTrueV1(i);
        container.appendChild(item);
    });
}

function toggleAllTrueV1(index) {
    allTrueV1State[index] = !allTrueV1State[index];
    const item = document.getElementById(`v1-at-${index}`);
    if (item) {
        item.className = `array-item ${allTrueV1State[index] ? 'true-val' : 'false-val'}`;
        item.innerHTML = `<span class="index">${index}</span>${allTrueV1State[index]}`;
    }
    
    // Reset result
    const result = document.querySelector('#v1-alltrue-result .result-value');
    if (result) {
        result.textContent = '?';
        result.className = 'result-value';
    }
}

async function runAllTrueV1() {
    const consoleEl = document.getElementById('v1-alltrue-console');
    const resultEl = document.querySelector('#v1-alltrue-result .result-value');
    
    clearConsole('v1-alltrue-console');
    log('v1-alltrue-console', `> allTrue([${allTrueV1State.join(', ')}]) çağrıldı`);
    
    // Remove previous checking states
    document.querySelectorAll('#v1-alltrue-array .array-item').forEach(el => {
        el.classList.remove('checking');
    });
    
    for (let i = 0; i < allTrueV1State.length; i++) {
        const item = document.getElementById(`v1-at-${i}`);
        if (item) item.classList.add('checking');
        
        log('v1-alltrue-console', `  i = ${i}: a[${i}] = ${allTrueV1State[i]}`);
        await sleep(400);
        
        if (allTrueV1State[i] === false) {
            log('v1-alltrue-console', `  ❌ false bulundu!`, 'error');
            log('v1-alltrue-console', `  return false; (fonksiyon burada biter)`, 'error');
            
            if (resultEl) {
                resultEl.textContent = 'false';
                resultEl.className = 'result-value false';
            }
            return;
        }
        
        log('v1-alltrue-console', `  ✓ true, devam...`, 'output');
        if (item) item.classList.remove('checking');
        await sleep(200);
    }
    
    log('v1-alltrue-console', `  ✅ Hepsi true!`, 'output');
    log('v1-alltrue-console', `  return true;`, 'output');
    
    if (resultEl) {
        resultEl.textContent = 'true';
        resultEl.className = 'result-value true';
    }
}

// ==========================================
// VERSION 2: selectText Demo (with bug)
// ==========================================
let v2EnUsed = [false, false, false, false, false, false, false, false];
let v2TrUsed = [false, false, false, false, false, false, false, false];
let v2SelectCount = 0;

function initV2Demo() {
    resetV2Demo();
}

function resetV2Demo() {
    v2EnUsed = [false, false, false, false, false, false, false, false];
    v2TrUsed = [false, false, false, false, false, false, false, false];
    v2SelectCount = 0;
    renderV2Arrays();
    clearConsole('v2-console');
    log('v2-console', '> "Bir Kelime Seç" butonuna bas');
}

function renderV2Arrays() {
    // EN words
    const enEl = document.getElementById('v2-en');
    if (enEl) {
        enEl.innerHTML = '';
        en.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = `array-item`;
            item.id = `v2-en-word-${i}`;
            item.textContent = word;
            enEl.appendChild(item);
        });
    }
    
    // EN used - Bu demo'da GÜNCELLENMEYECEK (bug'ı göstermek için)
    const enUsedEl = document.getElementById('v2-en-used');
    if (enUsedEl) {
        enUsedEl.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const item = document.createElement('div');
            item.className = 'array-item false-val';
            item.id = `v2-en-used-${i}`;
            item.textContent = 'F';
            enUsedEl.appendChild(item);
        }
    }
    
    // TR words
    const trEl = document.getElementById('v2-tr');
    if (trEl) {
        trEl.innerHTML = '';
        tr.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = `array-item`;
            item.id = `v2-tr-word-${i}`;
            item.textContent = word;
            trEl.appendChild(item);
        });
    }
    
    // TR used - Bu demo'da GÜNCELLENMEYECEK (bug'ı göstermek için)
    const trUsedEl = document.getElementById('v2-tr-used');
    if (trUsedEl) {
        trUsedEl.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const item = document.createElement('div');
            item.className = 'array-item false-val';
            item.id = `v2-tr-used-${i}`;
            item.textContent = 'F';
            trUsedEl.appendChild(item);
        }
    }
}

function runSelectTextV2() {
    v2SelectCount++;
    
    // Remove previous highlights
    document.querySelectorAll('#v2-en .array-item, #v2-tr .array-item').forEach(el => {
        el.classList.remove('highlight');
    });
    
    const r = Math.random();
    let selectedWord;
    let selectedLang;
    let selectedIndex;
    
    log('v2-console', `\n--- Seçim ${v2SelectCount} ---`, 'info');
    
    if (r < 0.5) {
        selectedIndex = Math.floor(Math.random() * 8);
        selectedWord = en[selectedIndex];
        selectedLang = 'en';
        log('v2-console', `r = ${r.toFixed(3)} < 0.5 → İngilizce seç`);
        log('v2-console', `random(8) = ${selectedIndex} → "${selectedWord}"`, 'output');
        
        // Highlight the selected word
        const wordEl = document.getElementById(`v2-en-word-${selectedIndex}`);
        if (wordEl) wordEl.classList.add('highlight');
        
        // BUG DEMONSTRATION: We're NOT updating v2EnUsed[selectedIndex] = true!
        // The used array stays all false
    } else {
        selectedIndex = Math.floor(Math.random() * 8);
        selectedWord = tr[selectedIndex];
        selectedLang = 'tr';
        log('v2-console', `r = ${r.toFixed(3)} >= 0.5 → Türkçe seç`);
        log('v2-console', `random(8) = ${selectedIndex} → "${selectedWord}"`, 'output');
        
        // Highlight the selected word
        const wordEl = document.getElementById(`v2-tr-word-${selectedIndex}`);
        if (wordEl) wordEl.classList.add('highlight');
        
        // BUG: NOT updating tr_used!
    }
    
    log('v2-console', `⚠️ BUG: ${selectedLang}_used[${selectedIndex}] = true YAPILMADI!`, 'warn');
    log('v2-console', `   Dizi hala: [F,F,F,F,F,F,F,F] - değişmedi!`, 'error');
    
    const wordEl = document.getElementById('v2-selected-word');
    if (wordEl) {
        wordEl.textContent = selectedWord;
        wordEl.style.color = selectedLang === 'en' ? 'var(--accent-blue)' : 'var(--accent-green)';
    }
    
    // Check if same word was selected before (to show the bug effect)
    if (v2SelectCount > 3) {
        log('v2-console', `💡 Birkaç kez daha tıkla - aynı kelime tekrar gelebilir!`, 'info');
    }
}

// ==========================================
// VERSION 3: Fixed selectText Demo
// ==========================================
let v3EnUsed = [false, false, false, false, false, false, false, false];
let v3TrUsed = [false, false, false, false, false, false, false, false];
let v3SelectedWords = [];

function initV3Demo() {
    resetV3();
}

function resetV3() {
    v3EnUsed = [false, false, false, false, false, false, false, false];
    v3TrUsed = [false, false, false, false, false, false, false, false];
    v3SelectedWords = [];
    renderV3();
    clearConsole('v3-console');
    log('v3-console', '> Sıfırlandı. "1 Kelime Seç" veya "16\'sını Seç" butonuna bas.');
}

function renderV3() {
    // EN words
    const enEl = document.getElementById('v3-en');
    if (enEl) {
        enEl.innerHTML = '';
        en.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${v3EnUsed[i] ? 'used' : ''}`;
            item.innerHTML = `<span class="index">${i}</span>${word}`;
            enEl.appendChild(item);
        });
    }
    
    // EN used
    const enUsedEl = document.getElementById('v3-en-used');
    if (enUsedEl) {
        enUsedEl.innerHTML = '';
        v3EnUsed.forEach((val, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${val ? 'true-val' : 'false-val'}`;
            item.textContent = val ? 'T' : 'F';
            enUsedEl.appendChild(item);
        });
    }
    
    // TR words
    const trEl = document.getElementById('v3-tr');
    if (trEl) {
        trEl.innerHTML = '';
        tr.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${v3TrUsed[i] ? 'used' : ''}`;
            item.innerHTML = `<span class="index">${i}</span>${word}`;
            trEl.appendChild(item);
        });
    }
    
    // TR used
    const trUsedEl = document.getElementById('v3-tr-used');
    if (trUsedEl) {
        trUsedEl.innerHTML = '';
        v3TrUsed.forEach((val, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${val ? 'true-val' : 'false-val'}`;
            item.textContent = val ? 'T' : 'F';
            trUsedEl.appendChild(item);
        });
    }
    
    // Counter
    const counterEl = document.getElementById('v3-counter');
    if (counterEl) {
        counterEl.textContent = v3SelectedWords.length;
    }
    
    // Selected words list
    const listEl = document.getElementById('v3-selected-list');
    if (listEl) {
        if (v3SelectedWords.length === 0) {
            listEl.innerHTML = '<div class="empty-message">Henüz kelime seçilmedi</div>';
        } else {
            listEl.innerHTML = '';
            v3SelectedWords.forEach((w, i) => {
                const item = document.createElement('div');
                item.className = `word-item ${w.lang}`;
                item.textContent = `${i + 1}. ${w.word}`;
                listEl.appendChild(item);
            });
            listEl.scrollTop = listEl.scrollHeight;
        }
    }
}

function selectOneV3() {
    if (v3SelectedWords.length >= 16) {
        log('v3-console', '> Tüm kelimeler seçildi! Sıfırla butonuna bas.', 'warn');
        return;
    }
    
    const allEnUsed = v3EnUsed.every(x => x);
    const allTrUsed = v3TrUsed.every(x => x);
    
    const r = Math.random();
    let useLang, usedArray, wordArray;
    
    log('v3-console', `\n--- Seçim ${v3SelectedWords.length + 1} ---`, 'info');
    log('v3-console', `r = ${r.toFixed(3)}`);
    
    if ((r < 0.5) && !allEnUsed) {
        useLang = 'en';
        usedArray = v3EnUsed;
        wordArray = en;
        log('v3-console', `r < 0.5 ve İngilizce kaldı → İngilizce`, 'output');
    } else if (!allTrUsed) {
        useLang = 'tr';
        usedArray = v3TrUsed;
        wordArray = tr;
        log('v3-console', `Türkçe seç`, 'output');
    } else {
        useLang = 'en';
        usedArray = v3EnUsed;
        wordArray = en;
        log('v3-console', `Türkçe bitti → İngilizce`, 'output');
    }
    
    let attempts = 0;
    let idx;
    do {
        idx = Math.floor(Math.random() * 8);
        attempts++;
        if (usedArray[idx]) {
            log('v3-console', `  random(8) = ${idx} → zaten kullanılmış! Tekrar...`, 'warn');
        }
    } while (usedArray[idx] && attempts < 50);
    
    usedArray[idx] = true;
    const word = wordArray[idx];
    
    log('v3-console', `  random(8) = ${idx} → "${word}" ✓`, 'output');
    log('v3-console', `  ${useLang}_used[${idx}] = true`, 'output');
    
    if (attempts > 1) {
        log('v3-console', `  (${attempts} deneme yapıldı)`, 'info');
    }
    
    v3SelectedWords.push({ word, lang: useLang });
    renderV3();
}

async function selectAllV3() {
    resetV3();
    await sleep(300);
    
    for (let i = 0; i < 16; i++) {
        selectOneV3();
        await sleep(150);
    }
    
    log('v3-console', '\n🎉 16 farklı kelime seçildi!', 'output');
}

// ==========================================
// VERSION 3: Unlucky Demo
// ==========================================
async function runUnluckyDemo() {
    const arrayEl = document.getElementById('unlucky-array');
    const attemptsEl = document.getElementById('unlucky-attempts');
    
    if (!arrayEl) return;
    
    // Setup: only index 7 is available
    const unluckyUsed = [true, true, true, true, true, true, true, false];
    
    arrayEl.innerHTML = '';
    unluckyUsed.forEach((val, i) => {
        const item = document.createElement('div');
        item.className = `array-item ${val ? 'true-val' : 'false-val'}`;
        item.id = `unlucky-${i}`;
        item.innerHTML = `<span class="index">${i}</span>${val ? 'T' : 'F'}`;
        arrayEl.appendChild(item);
    });
    
    clearConsole('unlucky-console');
    log('unlucky-console', '> while(true) döngüsü başlıyor...');
    
    let attempts = 0;
    let found = false;
    
    while (!found && attempts < 20) {
        attempts++;
        const a = Math.floor(Math.random() * 8);
        
        // Clear previous highlights
        document.querySelectorAll('#unlucky-array .array-item').forEach(el => {
            el.classList.remove('checking');
        });
        
        const item = document.getElementById(`unlucky-${a}`);
        if (item) item.classList.add('checking');
        
        attemptsEl.textContent = `Deneme: ${attempts}`;
        
        if (unluckyUsed[a]) {
            log('unlucky-console', `  a = ${a} → en_used[${a}] = true ❌ Şanssızlık!`, 'warn');
            await sleep(400);
        } else {
            log('unlucky-console', `  a = ${a} → en_used[${a}] = false ✓ BULUNDU!`, 'output');
            log('unlucky-console', `  "${en[a]}" seçildi (${attempts} denemede)`, 'output');
            found = true;
        }
    }
}

// ==========================================
// VERSION 4: Numbering Grid
// ==========================================
function initNumberingGrid() {
    const grid = document.getElementById('numbering-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const satir = Math.floor(i / 4);
        const sutun = i % 4;
        
        const cell = document.createElement('div');
        cell.className = 'numbering-cell';
        cell.innerHTML = `
            <span class="num">${i}</span>
            <span class="pos">(${satir}, ${sutun})</span>
        `;
        grid.appendChild(cell);
    }
}

// ==========================================
// VERSION 4: Calculator
// ==========================================
function initV4Calculator() {
    updateV4Calculator();
    initV4CalcGrid();
}

function initV4CalcGrid() {
    const grid = document.getElementById('v4-calc-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'calc-cell';
        cell.id = `v4-calc-${i}`;
        cell.textContent = i;
        grid.appendChild(cell);
    }
}

function updateV4Calculator() {
    const slider = document.getElementById('v4-slider');
    if (!slider) return;
    
    const i = parseInt(slider.value);
    const satir = Math.floor(i / 4);
    const sutun = i % 4;
    
    document.getElementById('v4-i-value').textContent = i;
    document.getElementById('v4-i1').textContent = i;
    document.getElementById('v4-i2').textContent = i;
    document.getElementById('v4-div').textContent = (i / 4).toFixed(2);
    document.getElementById('v4-satir').textContent = satir;
    document.getElementById('v4-sutun').textContent = sutun;
    
    // Update grid highlight
    document.querySelectorAll('#v4-calc-grid .calc-cell').forEach((cell, idx) => {
        cell.classList.toggle('active', idx === i);
    });
}

// ==========================================
// VERSION 4: Full Simulation
// ==========================================
let v4EnUsed = [false, false, false, false, false, false, false, false];
let v4TrUsed = [false, false, false, false, false, false, false, false];
let v4Grid = Array(16).fill(null);
let v4CurrentI = 0;
let v4AutoInterval = null;

function initV4Demo() {
    resetV4();
}

function resetV4() {
    if (v4AutoInterval) {
        clearInterval(v4AutoInterval);
        v4AutoInterval = null;
    }
    
    v4EnUsed = [false, false, false, false, false, false, false, false];
    v4TrUsed = [false, false, false, false, false, false, false, false];
    v4Grid = Array(16).fill(null);
    v4CurrentI = 0;
    
    renderV4();
    clearConsole('v4-console');
    log('v4-console', '> Sıfırlandı. Simülasyonu başlat.');
}

function renderV4() {
    // EN words
    const enWordsEl = document.getElementById('v4-en-words');
    if (enWordsEl) {
        enWordsEl.innerHTML = '';
        en.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${v4EnUsed[i] ? 'used' : ''}`;
            item.textContent = word;
            enWordsEl.appendChild(item);
        });
    }
    
    // EN used
    const enUsedEl = document.getElementById('v4-en-used');
    if (enUsedEl) {
        enUsedEl.innerHTML = '';
        v4EnUsed.forEach((val, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${val ? 'true-val' : 'false-val'}`;
            item.textContent = val ? 'T' : 'F';
            enUsedEl.appendChild(item);
        });
    }
    
    // TR words
    const trWordsEl = document.getElementById('v4-tr-words');
    if (trWordsEl) {
        trWordsEl.innerHTML = '';
        tr.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${v4TrUsed[i] ? 'used' : ''}`;
            item.textContent = word;
            trWordsEl.appendChild(item);
        });
    }
    
    // TR used
    const trUsedEl = document.getElementById('v4-tr-used');
    if (trUsedEl) {
        trUsedEl.innerHTML = '';
        v4TrUsed.forEach((val, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${val ? 'true-val' : 'false-val'}`;
            item.textContent = val ? 'T' : 'F';
            trUsedEl.appendChild(item);
        });
    }
    
    // Variables
    const satir = Math.floor(v4CurrentI / 4);
    const sutun = v4CurrentI % 4;
    
    const iEl = document.getElementById('v4-var-i');
    const satirEl = document.getElementById('v4-var-satir');
    const sutunEl = document.getElementById('v4-var-sutun');
    
    if (iEl) iEl.textContent = v4CurrentI;
    if (satirEl) satirEl.textContent = satir;
    if (sutunEl) sutunEl.textContent = sutun;
    
    // Grid
    const gridEl = document.getElementById('v4-grid');
    if (gridEl) {
        gridEl.innerHTML = '';
        
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'v4-cell';
            
            if (v4Grid[i]) {
                cell.classList.add(v4Grid[i].lang);
                cell.textContent = v4Grid[i].word;
            }
            
            if (i === v4CurrentI && v4CurrentI < 16) {
                cell.classList.add('active');
            }
            
            gridEl.appendChild(cell);
        }
    }
}

function stepV4() {
    if (v4CurrentI >= 16) {
        log('v4-console', '> Grid dolu! Sıfırla butonuna bas.', 'warn');
        return;
    }
    
    const i = v4CurrentI;
    const satir = Math.floor(i / 4);
    const sutun = i % 4;
    
    log('v4-console', `\n--- i = ${i} ---`, 'info');
    log('v4-console', `  satır = floor(${i}/4) = ${satir}`);
    log('v4-console', `  sütun = ${i} % 4 = ${sutun}`);
    
    // Select word
    const allEnDone = v4EnUsed.every(x => x);
    const allTrDone = v4TrUsed.every(x => x);
    
    const r = Math.random();
    let useLang, usedArray, wordArray;
    
    if ((r < 0.5) && !allEnDone) {
        useLang = 'en';
        usedArray = v4EnUsed;
        wordArray = en;
    } else if (!allTrDone) {
        useLang = 'tr';
        usedArray = v4TrUsed;
        wordArray = tr;
    } else {
        useLang = 'en';
        usedArray = v4EnUsed;
        wordArray = en;
    }
    
    let idx;
    let attempts = 0;
    do {
        idx = Math.floor(Math.random() * 8);
        attempts++;
    } while (usedArray[idx] && attempts < 50);
    
    usedArray[idx] = true;
    const word = wordArray[idx];
    
    log('v4-console', `  selectText() → "${word}" (${useLang === 'en' ? '🇬🇧' : '🇹🇷'})`, 'output');
    
    v4Grid[i] = { word, lang: useLang };
    v4CurrentI++;
    
    renderV4();
    
    if (v4CurrentI >= 16) {
        log('v4-console', '\n🎉 Grid tamamlandı!', 'output');
    }
}

function autoV4() {
    if (v4AutoInterval) {
        clearInterval(v4AutoInterval);
        v4AutoInterval = null;
        return;
    }
    
    if (v4CurrentI >= 16) {
        resetV4();
    }
    
    v4AutoInterval = setInterval(() => {
        if (v4CurrentI >= 16) {
            clearInterval(v4AutoInterval);
            v4AutoInterval = null;
            return;
        }
        stepV4();
    }, 400);
}

// ==========================================
// VERSION 5: Final Simulation with text()
// ==========================================
let v5EnUsed = [false, false, false, false, false, false, false, false];
let v5TrUsed = [false, false, false, false, false, false, false, false];
let v5Grid = Array(16).fill(null);
let v5CurrentI = 0;
let v5AutoInterval = null;

function initV5Demo() {
    resetV5();
    initTextPositionGrid();
}

function initTextPositionGrid() {
    const grid = document.getElementById('text-position-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const satir = Math.floor(i / 4);
        const sutun = i % 4;
        const x = sutun * 100 + 50;
        const y = satir * 100 + 50;
        
        const cell = document.createElement('div');
        cell.className = 'text-pos-cell';
        cell.innerHTML = `
            <span class="pos-num">${i}</span>
            <span class="pos-coord">(${x}, ${y})</span>
        `;
        cell.onmouseenter = () => {
            cell.innerHTML = `
                <span class="pos-num">${i}</span>
                <span class="pos-coord">x=${sutun}×100+50=${x}</span>
                <span class="pos-coord">y=${satir}×100+50=${y}</span>
            `;
        };
        cell.onmouseleave = () => {
            cell.innerHTML = `
                <span class="pos-num">${i}</span>
                <span class="pos-coord">(${x}, ${y})</span>
            `;
        };
        grid.appendChild(cell);
    }
}

function resetV5() {
    if (v5AutoInterval) {
        clearInterval(v5AutoInterval);
        v5AutoInterval = null;
    }
    
    v5EnUsed = [false, false, false, false, false, false, false, false];
    v5TrUsed = [false, false, false, false, false, false, false, false];
    v5Grid = Array(16).fill(null);
    v5CurrentI = 0;
    
    // Clear calculation table
    const tbody = document.getElementById('v5-calc-tbody');
    if (tbody) tbody.innerHTML = '';
    
    renderV5();
    clearConsole('v5-console');
    log('v5-console', '> Simülasyonu başlat');
}

function renderV5() {
    // EN words
    const enWordsEl = document.getElementById('v5-en-words');
    if (enWordsEl) {
        enWordsEl.innerHTML = '';
        en.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${v5EnUsed[i] ? 'used' : ''}`;
            item.textContent = word;
            enWordsEl.appendChild(item);
        });
    }
    
    // EN used
    const enUsedEl = document.getElementById('v5-en-used');
    if (enUsedEl) {
        enUsedEl.innerHTML = '';
        v5EnUsed.forEach((val, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${val ? 'true-val' : 'false-val'}`;
            item.textContent = val ? 'T' : 'F';
            enUsedEl.appendChild(item);
        });
    }
    
    // TR words
    const trWordsEl = document.getElementById('v5-tr-words');
    if (trWordsEl) {
        trWordsEl.innerHTML = '';
        tr.forEach((word, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${v5TrUsed[i] ? 'used' : ''}`;
            item.textContent = word;
            trWordsEl.appendChild(item);
        });
    }
    
    // TR used
    const trUsedEl = document.getElementById('v5-tr-used');
    if (trUsedEl) {
        trUsedEl.innerHTML = '';
        v5TrUsed.forEach((val, i) => {
            const item = document.createElement('div');
            item.className = `array-item ${val ? 'true-val' : 'false-val'}`;
            item.textContent = val ? 'T' : 'F';
            trUsedEl.appendChild(item);
        });
    }
    
    // Variables
    const satir = Math.floor(v5CurrentI / 4);
    const sutun = v5CurrentI % 4;
    const x = sutun * 100 + 50;
    const y = satir * 100 + 50;
    
    const updateEl = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };
    
    updateEl('v5-var-i', v5CurrentI);
    updateEl('v5-var-satir', satir);
    updateEl('v5-var-sutun', sutun);
    updateEl('v5-var-x', x);
    updateEl('v5-var-y', y);
    
    // Grid
    const gridEl = document.getElementById('v5-grid');
    if (gridEl) {
        gridEl.innerHTML = '';
        
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'v5-cell';
            
            if (v5Grid[i]) {
                cell.classList.add(v5Grid[i].lang);
                cell.textContent = v5Grid[i].word;
            }
            
            if (i === v5CurrentI && v5CurrentI < 16) {
                cell.classList.add('active');
            }
            
            gridEl.appendChild(cell);
        }
    }
}

function stepV5() {
    if (v5CurrentI >= 16) {
        log('v5-console', '> Grid dolu! Sıfırla butonuna bas.', 'warn');
        return;
    }
    
    const i = v5CurrentI;
    const satir = Math.floor(i / 4);
    const sutun = i % 4;
    const x = sutun * 100 + 50;
    const y = satir * 100 + 50;
    
    // Add row to calculation table
    const tbody = document.getElementById('v5-calc-tbody');
    if (tbody) {
        // Remove active class from previous rows
        tbody.querySelectorAll('tr').forEach(row => {
            row.classList.remove('active');
            row.classList.add('completed');
        });
        
        const row = document.createElement('tr');
        row.className = 'active';
        row.innerHTML = `
            <td>${i}</td>
            <td>${(i/4).toFixed(2)}</td>
            <td>${satir}</td>
            <td><strong>${satir}</strong></td>
            <td>${i}%4</td>
            <td><strong>${sutun}</strong></td>
            <td>${x}</td>
            <td>${y}</td>
        `;
        tbody.appendChild(row);
        
        // Scroll to bottom
        const container = tbody.closest('.calc-table-scroll');
        if (container) container.scrollTop = container.scrollHeight;
    }
    
    log('v5-console', `\n--- i = ${i} ---`, 'info');
    log('v5-console', `  satır = floor(${i}/4) = ${satir}, sütun = ${i}%4 = ${sutun}`);
    log('v5-console', `  x = ${sutun}×100+50 = ${x}, y = ${satir}×100+50 = ${y}`);
    
    // Select word
    const allEnDone = v5EnUsed.every(x => x);
    const allTrDone = v5TrUsed.every(x => x);
    
    const r = Math.random();
    let useLang, usedArray, wordArray;
    
    if ((r < 0.5) && !allEnDone) {
        useLang = 'en';
        usedArray = v5EnUsed;
        wordArray = en;
    } else if (!allTrDone) {
        useLang = 'tr';
        usedArray = v5TrUsed;
        wordArray = tr;
    } else {
        useLang = 'en';
        usedArray = v5EnUsed;
        wordArray = en;
    }
    
    let idx;
    let attempts = 0;
    do {
        idx = Math.floor(Math.random() * 8);
        attempts++;
    } while (usedArray[idx] && attempts < 50);
    
    usedArray[idx] = true;
    const word = wordArray[idx];
    
    log('v5-console', `  selectText() → "${word}" (${useLang === 'en' ? '🇬🇧' : '🇹🇷'})`, 'output');
    log('v5-console', `  text("${word}", ${x}, ${y})`, 'output');
    
    v5Grid[i] = { word, lang: useLang };
    v5CurrentI++;
    
    renderV5();
    
    if (v5CurrentI >= 16) {
        log('v5-console', '\n🎉 Grid tamamlandı! noLoop() çağrıldı.', 'output');
    }
}

function autoV5() {
    if (v5AutoInterval) {
        clearInterval(v5AutoInterval);
        v5AutoInterval = null;
        return;
    }
    
    if (v5CurrentI >= 16) {
        resetV5();
    }
    
    v5AutoInterval = setInterval(() => {
        if (v5CurrentI >= 16) {
            clearInterval(v5AutoInterval);
            v5AutoInterval = null;
            return;
        }
        stepV5();
    }, 350);
}

// ==========================================
// COLLAPSIBLE CODE BLOCKS
// ==========================================
function toggleCollapsible(element) {
    const codeBlock = element.closest('.collapsible-code');
    if (codeBlock) {
        codeBlock.classList.toggle('open');
    }
}

async function copyCode(button, codeId) {
    const codeElement = document.getElementById(codeId);
    if (!codeElement) return;

    // Get the raw code text (remove HTML tags)
    const codeText = codeElement.textContent || codeElement.innerText;

    try {
        await navigator.clipboard.writeText(codeText);

        // Visual feedback
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Kopyalandı!';
        button.classList.add('copied');

        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Kopyalama hatası:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        button.innerHTML = '✓ Kopyalandı!';
        button.classList.add('copied');
        setTimeout(() => {
            button.innerHTML = '📋 Kopyala';
            button.classList.remove('copied');
        }, 2000);
    }
}

// Load code files dynamically
async function loadCodeFile(filename) {
    try {
        const response = await fetch(`codes/${filename}`);
        if (!response.ok) throw new Error('File not found');
        return await response.text();
    } catch (err) {
        console.error(`Error loading ${filename}:`, err);
        return null;
    }
}

// Generate line numbers for code
function generateLineNumbers(code) {
    const lines = code.split('\n');
    return lines.map((_, i) => `<span>${i + 1}</span>`).join('\n');
}

// Apply syntax highlighting to code
function highlightCode(code) {
    // Basic syntax highlighting
    let highlighted = code
        // Escape HTML first
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Comments
        .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
        // Strings
        .replace(/('[^']*')/g, '<span class="string">$1</span>')
        .replace(/("[^"]*")/g, '<span class="string">$1</span>')
        // Keywords
        .replace(/\b(let|const|var|function|return|if|else|for|while|true|false|new)\b/g, '<span class="keyword">$1</span>')
        // Numbers
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
        // Function calls
        .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(');

    return highlighted;
}

// Initialize all code blocks
async function initCodeBlocks() {
    const codeContainers = document.querySelectorAll('[data-code-file]');

    for (const container of codeContainers) {
        const filename = container.dataset.codeFile;
        const code = await loadCodeFile(filename);

        if (code) {
            const lineNumbersEl = container.querySelector('.line-numbers');
            const codeContentEl = container.querySelector('.code-content pre');

            if (lineNumbersEl) {
                lineNumbersEl.innerHTML = generateLineNumbers(code);
            }

            if (codeContentEl) {
                codeContentEl.innerHTML = highlightCode(code);
            }
        }
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initGoalGrid();
    initV1Arrays();
    initV1Canvas();
    initAllTrueV1();
    initV2Demo();
    initV3Demo();
    initNumberingGrid();
    initV4Calculator();
    initV4Demo();
    initV5Demo();
    initCodeBlocks();
});
