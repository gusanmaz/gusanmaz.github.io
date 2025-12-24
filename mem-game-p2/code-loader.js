// Code Loader - Kod dosyalarını dinamik olarak yükler, syntax highlighting ve satır numaraları ekler
async function loadCodeSnippet(stepNumber, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(`code-snippets/step${stepNumber}.js`);
        if (!response.ok) throw new Error('Dosya bulunamadı');
        const code = await response.text();

        // Syntax highlighting uygula
        const highlightedCode = applySyntaxHighlighting(code);

        // Satır numaraları ekle
        const lines = highlightedCode.split('\n');
        const numberedLines = lines.map((line, index) => {
            const lineNum = index + 1;
            return `<span class="line-number">${lineNum}</span>${line}`;
        }).join('\n');

        container.innerHTML = `<pre class="code-with-lines"><code>${numberedLines}</code></pre>`;
    } catch (error) {
        container.innerHTML = `<p style="color: var(--accent-red);">Kod yüklenemedi: ${error.message}</p>`;
    }
}

// Basit syntax highlighting
function applySyntaxHighlighting(code) {
    // Escape HTML karakterleri önce
    let highlighted = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Önce string'leri placeholder ile değiştir (keyword'ler string içinde işaretlenmesin)
    const strings = [];
    highlighted = highlighted.replace(/(["'])(?:(?!\1)[^\\]|\\.)*?\1/g, (match) => {
        strings.push(match);
        return `__STRING_${strings.length - 1}__`;
    });

    // Comments'leri de placeholder ile değiştir
    const comments = [];
    highlighted = highlighted.replace(/(\/\/.*$)/gm, (match) => {
        comments.push(match);
        return `__COMMENT_${comments.length - 1}__`;
    });

    // Keywords
    const keywords = ['let', 'const', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'true', 'false', 'null', 'undefined', 'new', 'this'];
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'g');
        highlighted = highlighted.replace(regex, '<span class="keyword">$1</span>');
    });

    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');

    // Function names (parantezden önce)
    highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(');

    // String placeholder'ları geri koy
    strings.forEach((str, i) => {
        highlighted = highlighted.replace(`__STRING_${i}__`, `<span class="string">${str}</span>`);
    });

    // Comment placeholder'ları geri koy
    comments.forEach((comment, i) => {
        highlighted = highlighted.replace(`__COMMENT_${i}__`, `<span class="comment">${comment}</span>`);
    });

    return highlighted;
}

// Sayfa yüklendiğinde tüm kod container'larını doldur
document.addEventListener('DOMContentLoaded', () => {
    // Her adım için kodu yükle
    for (let i = 1; i <= 8; i++) {
        const containerId = `code-step${i}`;
        if (document.getElementById(containerId)) {
            loadCodeSnippet(i, containerId);
        }
    }
});

