// Code Playground Generator
// Bu dosya içerik dosyalarından ÖNCE yüklenmeli

window.createPlayground = function(code, title = 'Kod Editörü') {
    // Kod girintilerini temizle
    const lines = code.split('\n');
    
    // Boş satırları baştan ve sondan kaldır
    while (lines.length && lines[0].trim() === '') lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
    
    // Minimum girintiyi bul
    let minIndent = Infinity;
    for (const line of lines) {
        if (line.trim() === '') continue;
        const indent = line.match(/^\s*/)[0].length;
        minIndent = Math.min(minIndent, indent);
    }
    if (minIndent === Infinity) minIndent = 0;
    
    // Girintiyi kaldır
    const cleanCode = lines.map(line => {
        if (line.trim() === '') return '';
        return line.slice(minIndent);
    }).join('\n');
    
    // Satır sayısı
    const lineCount = cleanCode.split('\n').length;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join('');
    
    // HTML escape for display
    const escapedForDisplay = cleanCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    // Escape for data attribute
    const escapedForAttr = cleanCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    
    return `
    <div class="code-playground">
        <div class="playground-header">
            <div class="playground-title">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span style="margin-left: 8px;">${title}</span>
            </div>
            <div class="playground-actions">
                <button class="btn btn-copy" title="Kodu kopyala">📋 Kopyala</button>
                <button class="btn btn-reset">↺ Sıfırla</button>
                <button class="btn btn-run">▶ Çalıştır</button>
            </div>
        </div>
        <div class="playground-body">
            <div class="editor-panel">
                <div class="editor-wrapper">
                    <div class="line-numbers">${lineNumbers}</div>
                    <div class="code-editor-container">
                        <pre class="code-highlight"><code class="language-javascript">${escapedForDisplay}</code></pre>
                        <textarea class="code-editor" spellcheck="false" data-original="${escapedForAttr}">${cleanCode}</textarea>
                    </div>
                </div>
            </div>
            <div class="preview-panel">
                <div class="preview-header">
                    <div class="status">
                        <span class="status-dot"></span>
                        <span>Canlı Önizleme</span>
                    </div>
                </div>
                <div class="preview-container"></div>
            </div>
        </div>
    </div>`;
};
