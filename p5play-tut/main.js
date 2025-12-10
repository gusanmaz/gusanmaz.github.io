// p5.play Interactive Tutorial - Main Application

let currentSection = 0;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    if (typeof tutorialData === 'undefined') {
        console.error('tutorialData not found!');
        document.getElementById('lesson-container').innerHTML = '<p style="color:red;padding:20px;">Hata: Tutorial verileri yüklenemedi!</p>';
        return;
    }
    
    console.log('tutorialData found:', tutorialData.length, 'sections');
    initNavigation();
    loadSection(0);
});

// Build navigation from tutorial data
function initNavigation() {
    const navLinks = document.getElementById('nav-links');
    
    if (!navLinks) {
        console.error('nav-links element not found');
        return;
    }
    
    // Group lessons by category
    const categories = {
        'Başlangıç': ['intro', 'sprites'],
        'Fizik & Hareket': ['physics', 'movement', 'collisions'],
        'Görselleştirme': ['visuals', 'groups'],
        'Kontroller & Kamera': ['input', 'camera'],
        'İleri Seviye': ['advanced']
    };
    
    Object.entries(categories).forEach(([category, ids]) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'nav-section';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'nav-section-title';
        titleDiv.textContent = category;
        sectionDiv.appendChild(titleDiv);
        
        tutorialData.forEach((lesson, index) => {
            if (ids.includes(lesson.id)) {
                const link = document.createElement('a');
                link.className = 'nav-link';
                link.innerHTML = `
                    <span class="icon">${lesson.icon || '📄'}</span>
                    <span>${lesson.title}</span>
                `;
                link.onclick = () => loadSection(index);
                link.dataset.index = index;
                sectionDiv.appendChild(link);
            }
        });
        
        navLinks.appendChild(sectionDiv);
    });
    
    console.log('Navigation built successfully');
}

// Load a section
function loadSection(index) {
    const container = document.getElementById('lesson-container');
    const lesson = tutorialData[index];
    
    if (!container || !lesson) {
        console.error('Cannot load section:', index);
        return;
    }
    
    // Update active nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', parseInt(link.dataset.index) === index);
    });
    
    currentSection = index;
    
    // Render content
    container.innerHTML = `<div class="fade-in">${lesson.content}</div>`;
    
    // Initialize all code playgrounds
    setTimeout(() => {
        initializePlaygrounds();
    }, 100);
    
    // Scroll to top
    document.getElementById('content').scrollTop = 0;
    
    console.log('Section loaded:', lesson.title);
}

// Initialize code playgrounds
function initializePlaygrounds() {
    const playgrounds = document.querySelectorAll('.code-playground');
    
    playgrounds.forEach((playground, idx) => {
        const codeArea = playground.querySelector('.code-editor');
        const codeHighlight = playground.querySelector('pre.code-highlight');
        const previewContainer = playground.querySelector('.preview-container');
        const runBtn = playground.querySelector('.btn-run');
        const resetBtn = playground.querySelector('.btn-reset');
        const copyBtn = playground.querySelector('.btn-copy');
        
        if (!codeArea) return;
        
        const originalCode = codeArea.dataset.original || codeArea.value;
        codeArea.dataset.original = originalCode;
        
        // Update line numbers and highlighting on input
        codeArea.addEventListener('input', () => {
            updateLineNumbers(codeArea);
            updateHighlight(codeArea, codeHighlight);
        });
        
        // Sync scroll
        codeArea.addEventListener('scroll', () => {
            syncScroll(codeArea, codeHighlight);
        });
        
        // Run button handler
        if (runBtn) {
            runBtn.onclick = () => runCode(codeArea.value, previewContainer);
        }
        
        // Reset button handler
        if (resetBtn) {
            resetBtn.onclick = () => {
                codeArea.value = originalCode;
                updateLineNumbers(codeArea);
                updateHighlight(codeArea, codeHighlight);
                runCode(originalCode, previewContainer);
            };
        }
        
        // Copy button handler
        if (copyBtn) {
            copyBtn.onclick = async () => {
                try {
                    await navigator.clipboard.writeText(codeArea.value);
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = '✓ Kopyalandı!';
                    copyBtn.style.background = '#00ff88';
                    copyBtn.style.color = '#000';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                        copyBtn.style.background = '';
                        copyBtn.style.color = '';
                    }, 1500);
                } catch (err) {
                    console.error('Kopyalama hatası:', err);
                }
            };
        }
        
        // Initial Prism highlight
        if (window.Prism && codeHighlight) {
            const codeEl = codeHighlight.querySelector('code');
            if (codeEl) Prism.highlightElement(codeEl);
        }
        
        // Auto-run on load
        runCode(codeArea.value, previewContainer);
    });
}

// Update line numbers
function updateLineNumbers(textarea) {
    const wrapper = textarea.closest('.editor-wrapper');
    const lineNumbers = wrapper?.querySelector('.line-numbers');
    if (!lineNumbers) return;
    
    const lines = textarea.value.split('\n').length;
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join('');
}

// Update syntax highlighting with Prism
function updateHighlight(textarea, highlightEl) {
    if (!highlightEl) return;
    
    const codeEl = highlightEl.querySelector('code');
    if (!codeEl) return;
    
    // Escape HTML
    const escaped = textarea.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    codeEl.innerHTML = escaped;
    
    // Re-highlight with Prism
    if (window.Prism) {
        Prism.highlightElement(codeEl);
    }
}

// Sync scroll between textarea, line numbers and highlight
function syncScroll(textarea, highlightEl) {
    const wrapper = textarea.closest('.editor-wrapper');
    const lineNumbers = wrapper?.querySelector('.line-numbers');
    
    if (lineNumbers) {
        lineNumbers.style.transform = `translateY(-${textarea.scrollTop}px)`;
    }
    if (highlightEl) {
        highlightEl.style.transform = `translate(-${textarea.scrollLeft}px, -${textarea.scrollTop}px)`;
    }
}

// Run code in preview iframe
function runCode(code, previewContainer) {
    if (!previewContainer) return;
    
    // Update status indicator
    const statusDot = previewContainer.closest('.preview-panel')?.querySelector('.status-dot');
    if (statusDot) {
        statusDot.style.background = '#febc2e';
    }
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #1a1a2e; 
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        canvas { 
            display: block;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .error-display {
            color: #ff5f57;
            background: rgba(255, 95, 87, 0.1);
            border: 1px solid rgba(255, 95, 87, 0.3);
            padding: 20px;
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            max-width: 90%;
            word-wrap: break-word;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"><\/script>
    <script src="https://p5play.org/v3/planck.min.js"><\/script>
    <script src="https://p5play.org/v3/p5play.js"><\/script>
</head>
<body>
    <script>
        window.onerror = function(msg, url, line, col, error) {
            document.body.innerHTML = '<div class="error-display"><strong>❌ Hata:</strong><br>' + msg + '<br><small>Satır: ' + line + '</small></div>';
            return true;
        };
        
        try {
            ${code}
        } catch(e) {
            document.body.innerHTML = '<div class="error-display"><strong>❌ Hata:</strong><br>' + e.message + '</div>';
        }
        
        // Signal successful load
        window.addEventListener('load', function() {
            window.parent.postMessage('sketch-loaded', '*');
        });
    <\/script>
</body>
</html>`;
    
    // Clear and create new iframe
    previewContainer.innerHTML = '';
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    previewContainer.appendChild(iframe);
    
    // Write content to iframe
    iframe.srcdoc = htmlContent;
    
    // Listen for load success
    window.addEventListener('message', function handler(e) {
        if (e.data === 'sketch-loaded' && statusDot) {
            statusDot.style.background = '#28c840';
            window.removeEventListener('message', handler);
        }
    });
}

// Export for use in content files
window.tutorialApp = {
    loadSection
};
