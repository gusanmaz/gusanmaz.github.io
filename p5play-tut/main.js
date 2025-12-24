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

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<span class="icon">🌙</span> Tema Değiştir';
        }

        themeToggle.onclick = () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggle.innerHTML = isLight ?
                '<span class="icon">🌙</span> Tema Değiştir' :
                '<span class="icon">☀️</span> Tema Değiştir';

            // CodeMirror temalarını güncelle
            updateEditorThemes(!isLight);
        };
    }

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
        'İleri Seviye': ['advanced', 'extra']
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

// Store CodeMirror instances
const cmEditors = new Map();

// Initialize code playgrounds with CodeMirror
function initializePlaygrounds() {
    const playgrounds = document.querySelectorAll('.code-playground');
    
    playgrounds.forEach((playground, idx) => {
        const sourceArea = playground.querySelector('.code-editor-source');
        const previewContainer = playground.querySelector('.preview-container');
        const runBtn = playground.querySelector('.btn-run');
        const resetBtn = playground.querySelector('.btn-reset');
        const copyBtn = playground.querySelector('.btn-copy');
        
        if (!sourceArea) return;

        const originalCode = sourceArea.dataset.original || sourceArea.value;
        sourceArea.dataset.original = originalCode;

        // CodeMirror editör oluştur
        const editor = CodeMirror.fromTextArea(sourceArea, {
            mode: 'javascript',
            theme: document.body.classList.contains('light-mode') ? 'default' : 'dracula',
            lineNumbers: true,
            tabSize: 2,
            indentWithTabs: false,
            lineWrapping: false,
            autoCloseBrackets: true,
            matchBrackets: true,
            styleActiveLine: true,
            scrollbarStyle: 'native'
        });

        // Editör yüksekliğini ayarla
        editor.setSize('100%', '100%');

        // Editörü sakla
        cmEditors.set(sourceArea.id, editor);

        // Run button handler
        if (runBtn) {
            runBtn.onclick = () => runCode(editor.getValue(), previewContainer);
        }
        
        // Reset button handler
        if (resetBtn) {
            resetBtn.onclick = () => {
                editor.setValue(originalCode);
                runCode(originalCode, previewContainer);
            };
        }
        
        // Copy button handler
        if (copyBtn) {
            copyBtn.onclick = async () => {
                try {
                    await navigator.clipboard.writeText(editor.getValue());
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
        
        // Auto-run on load
        runCode(editor.getValue(), previewContainer);
    });
}

// Update CodeMirror themes when theme changes
function updateEditorThemes(isDark) {
    cmEditors.forEach(editor => {
        editor.setOption('theme', isDark ? 'dracula' : 'default');
    });
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
