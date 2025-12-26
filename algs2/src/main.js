/**
 * Unified JavaScript for Algorithm Course Website
 * Handles: Theme, Navigation, CodeMirror, Pyodide, Code Execution
 */

// ===== THEME MANAGEMENT =====
const Theme = {
  init() {
    const saved = localStorage.getItem('theme') || 'light';
    this.set(saved);
    this.attachToggle();
  },

  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateToggleIcon(theme);

    // Trigger event for visualizations that need to update
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.set(current === 'dark' ? 'light' : 'dark');
  },

  updateToggleIcon(theme) {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  },

  attachToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
    }
  }
};

// ===== NAVIGATION SYSTEM =====
const Navigation = {
  config: null,
  currentPage: null,

  async init() {
    try {
      await this.loadConfig();
      this.detectCurrentPage();
      this.render();
    } catch (error) {
      console.error('Navigation initialization failed:', error);
    }
  },

  async loadConfig() {
    try {
      // Try relative path from pages/ directory
      let response = await fetch('../src/navigation.json');
      console.log('First fetch attempt (../src/navigation.json):', response.ok);

      // If failed, try from root
      if (!response.ok) {
        response = await fetch('src/navigation.json');
        console.log('Second fetch attempt (src/navigation.json):', response.ok);
      }

      if (!response.ok) {
        throw new Error('Failed to load navigation config');
      }

      this.config = await response.json();
      console.log('Navigation config loaded:', this.config);
    } catch (error) {
      console.error('Failed to load navigation config:', error);
      this.config = { modules: [] };
    }
  },

  detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    this.currentPage = filename || 'index.html';
    console.log('Current page detected:', this.currentPage);
  },

  findPageData(filename) {
    if (!this.config || !this.config.modules) return null;

    for (const module of this.config.modules) {
      if (!module.pages) continue;

      const pageIndex = module.pages.findIndex(p => p.file === filename);
      if (pageIndex !== -1) {
        return {
          module,
          page: module.pages[pageIndex],
          index: pageIndex
        };
      }
    }
    return null;
  },

  render() {
    const navFooter = document.querySelector('.nav-footer');
    console.log('Nav footer element found:', !!navFooter);
    if (!navFooter) return;

    const data = this.findPageData(this.currentPage);
    console.log('Page data found:', data);
    if (!data) {
      // No navigation data, leave footer empty or show just home button
      navFooter.innerHTML = `
        <span></span>
        <a href="../index.html" class="btn" style="background:#e67e22">🏠 Ana Menü</a>
        <span></span>
      `;
      console.log('No page data - showing only home button');
      return;
    }

    const { module, page, index } = data;
    const prevPage = module.pages[index - 1];
    const nextPage = module.pages[index + 1];

    // Build navigation HTML
    let html = '';

    // Previous button
    if (prevPage) {
      html += `<a href="${prevPage.file}" class="btn">⬅️ Önceki: ${prevPage.shortTitle}</a>`;
    } else {
      html += '<span></span>';
    }

    // Home button (always show)
    html += `<a href="../index.html" class="btn" style="background:#e67e22">🏠 Ana Menü</a>`;

    // Module menu button (if exists)
    if (module.menuFile) {
      html += `<a href="${module.menuFile}" class="btn" style="background:${module.color}">📋 ${module.title}</a>`;
    }

    // Next button
    if (nextPage) {
      html += `<a href="${nextPage.file}" class="btn btn-next">Sonraki: ${nextPage.shortTitle} ➡️</a>`;
    } else {
      html += '<span></span>';
    }

    navFooter.innerHTML = html;
    console.log('Navigation rendered successfully');
  }
};

// ===== PYODIDE MANAGER =====
const PyodideManager = {
  pyodide: null,
  ready: false,
  loading: false,
  loadingCallbacks: [],

  async init() {
    if (this.ready || this.loading) {
      return new Promise((resolve) => {
        if (this.ready) resolve();
        else this.loadingCallbacks.push(resolve);
      });
    }

    this.loading = true;
    this.showLoadingMessage('Python yükleniyor...');

    try {
      this.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
      });
      this.ready = true;
      this.loading = false;
      this.hideLoadingMessage();

      console.log('✅ Pyodide ready');

      // Resolve any waiting callbacks
      this.loadingCallbacks.forEach(cb => cb());
      this.loadingCallbacks = [];
    } catch (error) {
      this.loading = false;
      this.hideLoadingMessage();
      console.error('❌ Pyodide load failed:', error);
      throw error;
    }
  },

  async loadPackage(packageName) {
    if (!this.ready) await this.init();
    try {
      await this.pyodide.loadPackage(packageName);
      console.log(`✅ Loaded package: ${packageName}`);
    } catch (error) {
      console.error(`❌ Failed to load package ${packageName}:`, error);
      throw error;
    }
  },

  async run(code) {
    if (!this.ready) {
      await this.init();
    }

    try {
      // Capture stdout
      this.pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      // Run user code
      await this.pyodide.runPythonAsync(code);

      // Get output
      const stdout = this.pyodide.runPython("sys.stdout.getvalue()");
      const stderr = this.pyodide.runPython("sys.stderr.getvalue()");

      if (stderr) {
        throw new Error(stderr);
      }

      return stdout || '(Kod çalıştı, çıktı yok)';
    } catch (error) {
      throw new Error(error.message || String(error));
    }
  },

  showLoadingMessage(message) {
    let overlay = document.getElementById('pyodide-loading');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'pyodide-loading';
      overlay.className = 'loading-overlay';
      overlay.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">${message}</div>
      `;
      document.body.appendChild(overlay);
    }
  },

  hideLoadingMessage() {
    const overlay = document.getElementById('pyodide-loading');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 500);
    }
  }
};

// ===== CODEMIRROR 6 MANAGER =====
const EditorManager = {
  editors: {},

  async init() {
    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      console.warn('CodeMirror not loaded - skipping editor initialization');
      return false;
    }

    this.CodeMirror = CodeMirror;
    return true;
  },

  create(containerId, initialCode, options = {}) {
    // Check if CodeMirror is available
    if (typeof CodeMirror === 'undefined' || typeof CodeMirror.EditorView === 'undefined') {
      console.warn('CodeMirror not available');
      return null;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return null;
    }

    // Create editor
    const extensions = [
      CodeMirror.basicSetup,
      CodeMirror.python(),
      CodeMirror.EditorView.lineWrapping,
    ];

    // Add dark theme if active
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      extensions.push(CodeMirror.oneDark);
    }

    const view = new CodeMirror.EditorView({
      doc: initialCode,
      extensions,
      parent: container
    });

    this.editors[containerId] = view;
    return view;
  },

  getCode(containerId) {
    const editor = this.editors[containerId];
    if (!editor) return null;
    return editor.state.doc.toString();
  },

  setCode(containerId, code) {
    const editor = this.editors[containerId];
    if (!editor) return;

    editor.dispatch({
      changes: {
        from: 0,
        to: editor.state.doc.length,
        insert: code
      }
    });
  },

  destroy(containerId) {
    const editor = this.editors[containerId];
    if (editor) {
      editor.destroy();
      delete this.editors[containerId];
    }
  }
};

// ===== CODE BLOCK HANDLER (works with both Prism and CodeMirror) =====
const CodeBlocks = {
  blocks: [],

  init() {
    // Find all code containers
    const containers = document.querySelectorAll('.code-container');

    containers.forEach((container, idx) => {
      this.setupCodeBlock(container, idx);
    });

    // Also handle standalone pre>code blocks (legacy support)
    document.querySelectorAll('pre > code.language-python').forEach((codeBlock, idx) => {
      if (!codeBlock.closest('.code-container')) {
        this.wrapInContainer(codeBlock, containers.length + idx);
      }
    });
  },

  setupCodeBlock(container, idx) {
    const codeBlock = container.querySelector('pre code, pre');
    if (!codeBlock) return;

    const code = codeBlock.textContent.trim();
    const blockId = `code-block-${idx}`;
    const editorId = `editor-${idx}`;

    // Store block data
    this.blocks[idx] = {
      container,
      code,
      originalCode: code,
      id: blockId,
      editorId,
      codeBlock,
      isEditing: false,
      editor: null
    };

    // Setup header if not exists
    let header = container.querySelector('.code-header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'code-header';
      container.prepend(header);
    }

    // Update header with action buttons
    header.innerHTML = `
      <span class="code-header-title">🐍 Python Kodu</span>
      <div class="code-actions">
        <button class="code-btn" onclick="CodeBlocks.toggleEdit(${idx})" title="Düzenle">✏️ Düzenle</button>
        <button class="code-btn" onclick="CodeBlocks.run(${idx})" title="Kodu çalıştır">▶️ Çalıştır</button>
        <button class="code-btn" onclick="CodeBlocks.copy(${idx})" title="Kodu kopyala">📋 Kopyala</button>
      </div>
    `;

    // Create editor container (hidden by default)
    let editorContainer = container.querySelector('.cm-wrapper');
    if (!editorContainer) {
      editorContainer = document.createElement('div');
      editorContainer.className = 'cm-wrapper';
      editorContainer.id = editorId;
      editorContainer.style.display = 'none';

      // Insert after code block
      codeBlock.parentElement.insertBefore(editorContainer, codeBlock.nextSibling);
    }

    // Setup output area if not exists
    let output = container.querySelector('.output');
    if (!output) {
      output = document.createElement('div');
      output.className = 'output';
      output.id = `output-${idx}`;
      container.appendChild(output);
    } else {
      output.id = `output-${idx}`;
    }

    this.blocks[idx].output = output;
    this.blocks[idx].editorContainer = editorContainer;
  },

  toggleEdit(idx) {
    const block = this.blocks[idx];
    if (!block) return;

    const { codeBlock, editorContainer, editorId, isEditing } = block;

    if (!isEditing) {
      // Switch to edit mode
      codeBlock.closest('pre').style.display = 'none';
      editorContainer.style.display = 'block';

      // Create CodeMirror editor if not exists
      if (!block.editor && typeof CodeMirror !== 'undefined') {
        block.editor = EditorManager.create(editorId, block.code);
      }

      block.isEditing = true;

      // Update button
      const btn = block.container.querySelector('.code-actions button:first-child');
      if (btn) {
        btn.innerHTML = '👁️ Görüntüle';
        btn.title = 'Görüntüleme moduna geç';
      }
    } else {
      // Switch to view mode
      // Get updated code from editor
      if (block.editor) {
        block.code = EditorManager.getCode(editorId);
      }

      codeBlock.closest('pre').style.display = 'block';
      editorContainer.style.display = 'none';

      block.isEditing = false;

      // Update button
      const btn = block.container.querySelector('.code-actions button:first-child');
      if (btn) {
        btn.innerHTML = '✏️ Düzenle';
        btn.title = 'Düzenle';
      }
    }
  },

  wrapInContainer(codeBlock, idx) {
    const container = document.createElement('div');
    container.className = 'code-container';

    const pre = codeBlock.closest('pre');
    pre.parentNode.insertBefore(container, pre);
    container.appendChild(pre);

    this.setupCodeBlock(container, idx);
  },

  async run(idx) {
    const block = this.blocks[idx];
    if (!block) return;

    let code = block.code;

    // If in edit mode, get code from editor
    if (block.isEditing && block.editor) {
      code = EditorManager.getCode(block.editorId);
      block.code = code; // Update stored code
    }

    const { output } = block;

    output.textContent = '⏳ Çalışıyor...';
    output.className = 'output';

    try {
      const result = await PyodideManager.run(code);
      output.textContent = result;
      output.className = 'output';
    } catch (error) {
      output.textContent = `❌ Hata:\n${error.message}`;
      output.className = 'output error';
    }
  },

  async copy(idx) {
    const block = this.blocks[idx];
    if (!block) return;

    try {
      await navigator.clipboard.writeText(block.code);

      // Show feedback
      const btn = block.container.querySelector('.code-actions button:last-child');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '✅ Kopyalandı';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
        }, 2000);
      }
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın.');
    }
  }
};

// ===== UTILITIES =====
const Utils = {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  formatNumber(num) {
    return num.toLocaleString('tr-TR');
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Get CSS variable value
  getCssVar(varName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Initializing...');

  // Initialize theme first (synchronous, fast)
  Theme.init();

  // Initialize navigation (async but non-blocking)
  await Navigation.init();

  // Initialize code blocks (synchronous, fast)
  CodeBlocks.init();

  // Initialize Pyodide in background (async, slow - don't block)
  // Only init if there are code blocks to run
  if (document.querySelectorAll('.code-container').length > 0) {
    PyodideManager.init().catch(err => {
      console.error('Pyodide initialization failed:', err);
    });
  }

  console.log('✅ Initialization complete');
});

// ===== EXPORT FOR GLOBAL ACCESS =====
window.Theme = Theme;
window.Navigation = Navigation;
window.PyodideManager = PyodideManager;
window.EditorManager = EditorManager;
window.CodeBlocks = CodeBlocks;
window.Utils = Utils;
