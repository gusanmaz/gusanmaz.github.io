# Algoritmalar ve Veri Yapıları - İnteraktif Ders Sayfaları Projesi

## 📋 Proje Özeti

Bu proje, Python ile algoritmalar ve veri yapıları öğretimi için tasarlanmış **interaktif web sayfaları** içerir. Her sayfa:
- Tarayıcıda Python kodu çalıştırma (Pyodide)
- CodeMirror 6 ile canlı kod düzenleme
- Dark/Light tema desteği
- Otomatik navigasyon sistemi
- Syntax highlighting (Prism.js)
- İnteraktif görselleştirmeler ve animasyonlar

## 🗂️ Proje Yapısı

```
algs/
├── index.html              # Ana menü (tüm modülleri listeler)
├── pages/                  # Tüm ders sayfaları burada
│   ├── 0a_fonksiyonlar.html
│   ├── 1_algoritma_analizi.html
│   ├── 2a_stack_giris.html
│   └── ... (56 dosya)
├── src/
│   ├── main.css           # Birleşik CSS (tüm sayfalar kullanır)
│   ├── main.js            # Birleşik JS + CodeBlocks API
│   ├── visualizations.js  # Özel görselleştirme fonksiyonları
│   └── navigation.json    # Sayfa navigasyon yapısı
└── prompt.md              # Bu dosya
```

## 🎨 Unified Template Yapısı

Tüm sayfa dosyaları aşağıdaki standart yapıyı kullanır:

### HTML Template

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[MODÜL NO].[SAYFA NO]: [BAŞLIK]</title>

    <!-- Unified CSS -->
    <link rel="stylesheet" href="../src/main.css">

    <!-- Prism.js for syntax highlighting -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css" rel="stylesheet" />

    <!-- CodeMirror 6 -->
    <script type="module">
        import {EditorView, basicSetup} from "https://cdn.jsdelivr.net/npm/codemirror@6/dist/index.js"
        import {python} from "https://cdn.jsdelivr.net/npm/@codemirror/lang-python@6/dist/index.js"
        import {oneDark} from "https://cdn.jsdelivr.net/npm/@codemirror/theme-one-dark@6/dist/index.js"

        window.CodeMirror = {
            EditorView,
            basicSetup,
            python: () => python(),
            oneDark
        };
    </script>

    <!-- Pyodide for Python execution -->
    <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>

    <!-- Sayfaya özel CSS varsa buraya ekle -->
    <style>
        /* Özel stiller */
    </style>
</head>
<body>
    <div class="container">
        <!-- Theme Toggle Button (her sayfada olmalı) -->
        <button class="theme-toggle" aria-label="Toggle theme">🌙</button>

        <!-- Header -->
        <header>
            <h1>📚 [MODÜL NO].[SAYFA NO]: [BAŞLIK]</h1>
            <p>[ALT BAŞLIK]</p>
        </header>

        <!-- İçerik bölümleri -->
        <div class="section">
            <h2>[BÖLÜM BAŞLIĞI]</h2>
            <p>Açıklama metni...</p>

            <!-- Python kod bloğu örneği -->
            <div class="code-container">
                <div class="code-header">
                    <span class="code-header-title">🐍 Python - [KOD AÇIKLAMASI]</span>
                    <div class="code-actions">
                        <button class="code-btn" onclick="CodeBlocks.run(0)">▶️ Çalıştır</button>
                        <button class="code-btn" onclick="CodeBlocks.copy(0)">📋 Kopyala</button>
                    </div>
                </div>

                <pre class="line-numbers"><code class="language-python"># Python kodu buraya
def example():
    return "Hello, World!"

print(example())</code></pre>

                <div class="output" id="output-0"></div>
            </div>
        </div>

        <!-- Auto-generated navigation footer -->
        <div class="nav-footer"></div>
    </div>

    <!-- Prism.js scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>

    <!-- Unified JS -->
    <script src="../src/main.js"></script>
    <script src="../src/visualizations.js"></script>

    <!-- Sayfaya özel JavaScript varsa buraya ekle -->
    <script>
        // Özel JS kodları
    </script>
</body>
</html>
```

## 🎯 Önemli Kurallar

### 1. **ASLA Inline CSS/JS Kullanma**
- ❌ `<style>` içinde global CSS
- ❌ `<script>` içinde Pyodide/CodeMirror initialization
- ✅ Sadece sayfaya özel görselleştirmeler için `<style>` ve `<script>` kullan
- ✅ Tüm genel stiller `../src/main.css` içinde
- ✅ Tüm genel fonksiyonlar `../src/main.js` içinde

### 2. **CSS Variables Kullan (Dark Mode İçin)**

```css
/* ❌ Yanlış - Hardcoded renkler */
background: white;
color: #333;
border: 1px solid #ddd;

/* ✅ Doğru - CSS Variables */
background: var(--bg-primary);
color: var(--text-primary);
border: 1px solid var(--border-color);
```

**Mevcut CSS Variables:**
```css
/* Backgrounds */
--bg-primary, --bg-secondary, --bg-tertiary
--card-bg, --code-bg

/* Text */
--text-primary, --text-secondary, --text-tertiary

/* Borders & Accents */
--border-color
--accent-blue, --accent-red, --accent-green, --accent-orange, --accent-purple

/* Info boxes */
--info-bg, --success-bg, --warning-bg, --error-bg
```

### 3. **Python Kod Blokları**

Her Python kod bloğu için:

```html
<div class="code-container">
    <div class="code-header">
        <span class="code-header-title">🐍 Python - [Açıklama]</span>
        <div class="code-actions">
            <button class="code-btn" onclick="CodeBlocks.run(INDEX)">▶️ Çalıştır</button>
            <button class="code-btn" onclick="CodeBlocks.copy(INDEX)">📋 Kopyala</button>
        </div>
    </div>

    <pre class="line-numbers"><code class="language-python">[PYTHON KODU]</code></pre>

    <div class="output" id="output-INDEX"></div>
</div>
```

**ÖNEMLİ:**
- `INDEX` her kod bloğu için benzersiz olmalı (0, 1, 2, ...)
- `line-numbers` class'ı mutlaka ekle
- `onclick="CodeBlocks.run(INDEX)"` kullan (eski `runPython()` yok!)
- Output div'in id'si `output-INDEX` formatında olmalı
- ❌ `<textarea>` kullanma! CodeMirror otomatik oluşturulur

### 4. **Görselleştirmeler ve Animasyonlar**

Özel görselleştirmeler için:

```html
<style>
    /* Sayfaya özel stiller */
    .custom-visualization {
        /* CSS variables kullan */
        background: var(--card-bg);
        border: 2px solid var(--border-color);
    }
</style>

<div class="custom-visualization">
    <!-- Görselleştirme HTML'i -->
</div>

<script>
    // Sayfaya özel JavaScript
    function customAnimation() {
        // Animasyon kodu
    }
</script>
```

**Örnekler:**
- Canvas animasyonları (BST tree drawing)
- SVG diyagramlar (Node pointers, arrows)
- CSS animasyonlar (fadeIn, pulse, slide)
- Adım adım simülasyonlar (Sorting, BFS, DFS)

### 5. **Navigation System**

Navigation otomatik oluşturulur `src/navigation.json` dosyasından:

```html
<!-- Sadece bu satırı ekle, içeriği boş bırak -->
<div class="nav-footer"></div>
```

`main.js` otomatik olarak:
- Önceki/Sonraki sayfa butonları
- Modül rengi
- Sayfa numarası
ekler.

## 📚 Modül Yapısı ve Dosya İsimlendirme

### Mevcut Modüller

**⚠️ ÖNEMLI:** Aşağıdaki tablo **örnek** amaçlıdır ve güncel olmayabilir.

**Güncel modül listesi ve tüm sayfa detayları için `src/navigation.json` dosyasına bakınız.**

<details>
<summary>📋 Örnek Modül Listesi (Referans için - güncel olmayabilir)</summary>

| Modül | Konu | Dosyalar | Renk |
|-------|------|----------|------|
| 0 | Python Temelleri | 0a-0d (4 dosya) | #667eea |
| 1 | Algoritma Analizi | 1, 1a-1c (4 dosya) | #3498db |
| 2 | Stack | 2a-2f (6 dosya) + stack.html | #8e44ad |
| 3 | Queue | 3a-3g (7 dosya) + queue.html | #11998e |
| 4 | Linked List | 4a-4g (7 dosya) + linked_list.html | #e94560 |
| 5 | BST | 5, 5a-5d (5 dosya) + bst.html | #11998e |
| 6 | Arama | 6a-6b (2 dosya) | #3498db |
| 7 | Sıralama | 7a-7f (6 dosya) | #8e44ad |
| 8 | Hash Table | 8a-8f (6 dosya) | #11998e |
| 9 | Heap | 9a-9f (6 dosya) | #e94560 |

</details>

### Dosya İsimlendirme Kuralları

```
[MODÜL_NO][SAYFA_HARFI]_[KONU_ADI].html
```

**Örnekler:**
- `2a_stack_giris.html` → Modül 2, Sayfa A
- `7b_bubble_sort.html` → Modül 7, Sayfa B
- `5_tree_intro.html` → Modül 5, Ana sayfa (harf yok)

## 🎨 Sayfa İçeriği Tasarım Prensipleri

### 1. **Başlıklar ve Alt Başlıklar**

```html
<header>
    <h1>🎯 2.3: Big O Analizi</h1>
    <p>Stack İşlemlerinin Karmaşıklık Analizi</p>
</header>

<div class="section">
    <h2>1️⃣ Push İşlemi</h2>
    <h3>Zaman Karmaşıklığı</h3>
    <h4>Best Case vs Worst Case</h4>
</div>
```

### 2. **İnfo Boxes (Önemli Notlar)**

```html
<!-- Başarı mesajı -->
<div style="background: var(--success-bg); border-left: 5px solid #28a745; padding: 20px; border-radius: 10px;">
    <h4 style="color: #155724;">✅ Önemli Nokta</h4>
    <p>Açıklama...</p>
</div>

<!-- Uyarı -->
<div style="background: var(--warning-bg); border-left: 5px solid #ffc107; padding: 20px; border-radius: 10px;">
    <h4 style="color: #856404;">⚠️ Dikkat!</h4>
    <p>Açıklama...</p>
</div>

<!-- Bilgi -->
<div style="background: var(--info-bg); border-left: 5px solid #2196f3; padding: 20px; border-radius: 10px;">
    <h4 style="color: #1565c0;">💡 İpucu</h4>
    <p>Açıklama...</p>
</div>

<!-- Hata/Tehlike -->
<div style="background: var(--error-bg); border-left: 5px solid #dc3545; padding: 20px; border-radius: 10px;">
    <h4 style="color: #721c24;">🛑 Yaygın Hata</h4>
    <p>Açıklama...</p>
</div>
```

### 3. **Tablolar**

```html
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <thead style="background: var(--bg-tertiary);">
        <tr>
            <th style="padding: 12px; border: 1px solid var(--border-color);">İşlem</th>
            <th style="padding: 12px; border: 1px solid var(--border-color);">Karmaşıklık</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; border: 1px solid var(--border-color);">Push</td>
            <td style="padding: 10px; border: 1px solid var(--border-color);">O(1)</td>
        </tr>
    </tbody>
</table>
```

### 4. **Listeler**

```html
<ul style="margin-left: 20px; line-height: 2;">
    <li>✅ Avantaj 1</li>
    <li>✅ Avantaj 2</li>
    <li>❌ Dezavantaj 1</li>
</ul>
```

## 🔧 CodeBlocks API Kullanımı

`main.js` içinde tanımlı `CodeBlocks` object'i:

```javascript
CodeBlocks.run(index)     // Python kodunu çalıştır
CodeBlocks.copy(index)    // Kodu clipboard'a kopyala
CodeBlocks.edit(index)    // CodeMirror editörü aç/kapat
```

**Kullanım:**
```html
<button onclick="CodeBlocks.run(0)">▶️ Çalıştır</button>
<button onclick="CodeBlocks.copy(1)">📋 Kopyala</button>
```

## 🎨 Dark Mode Desteği

Tüm sayfalar otomatik dark mode destekler. **Yapmanız gerekenler:**

1. ✅ CSS variables kullan (hardcoded renkler değil)
2. ✅ Theme toggle butonu ekle: `<button class="theme-toggle">🌙</button>`
3. ✅ Canvas/SVG görselleştirmelerde tema değişikliğine göre renk güncelle

**Örnek - Canvas dark mode:**
```javascript
function drawVisualization() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bgColor = isDark ? '#1a1a1a' : '#ffffff';
    const textColor = isDark ? '#e0e0e0' : '#333333';

    // Canvas çizimi...
}

// Tema değiştiğinde yeniden çiz
document.addEventListener('themeChanged', drawVisualization);
```

## 📐 Görselleştirme Örnekleri

### 1. **Stack Visualization**

```html
<div style="display: flex; flex-direction: column-reverse; align-items: center; gap: 5px; padding: 20px;">
    <div style="padding: 12px 40px; background: var(--accent-blue); color: white; border-radius: 8px;">A</div>
    <div style="padding: 12px 40px; background: var(--accent-blue); color: white; border-radius: 8px;">B</div>
    <div style="padding: 12px 40px; background: var(--accent-red); color: white; border-radius: 8px;">C ← TOP</div>
</div>
```

### 2. **Complexity Comparison**

```html
<div style="background: linear-gradient(135deg, #d4edda, #c3e6cb); border-left: 5px solid #28a745; padding: 20px; border-radius: 10px; margin: 25px 0;">
    <h4 style="color: #155724; margin-top: 0;">🥇 O(1) - Sabit Zaman</h4>
    <p><strong>Tanım:</strong> Girdi boyutundan bağımsız</p>
    <p><strong>Örnek:</strong> Array indexing, hash table lookup</p>
</div>
```

### 3. **Adım Adım Simülasyon**

```html
<div style="text-align: center; margin: 20px 0;">
    <button class="btn" onclick="startAnimation()">▶️ Başlat</button>
    <button class="btn" onclick="stepAnimation()">➡️ Adım</button>
    <button class="btn" onclick="resetAnimation()">🔄 Sıfırla</button>
</div>

<div id="animation-area">
    <!-- Animasyon görselleri buraya -->
</div>

<script>
let currentStep = 0;

function startAnimation() {
    // Otomatik adım adım çalış
}

function stepAnimation() {
    currentStep++;
    updateVisualization();
}

function resetAnimation() {
    currentStep = 0;
    updateVisualization();
}

function updateVisualization() {
    // Görselleştirmeyi güncelle
}
</script>
```

## 📝 navigation.json Formatı

Yeni modül/sayfa ekleme:

```json
{
  "modules": [
    {
      "id": 2,
      "title": "Stack (Yığın)",
      "color": "#8e44ad",
      "menuFile": "stack.html",
      "pages": [
        {
          "file": "2a_stack_giris.html",
          "shortTitle": "Giriş",
          "title": "Stack Nedir?"
        },
        {
          "file": "2b_stack_numpy.html",
          "shortTitle": "Numpy",
          "title": "Numpy ile Stack"
        }
      ]
    }
  ]
}
```

## 🎯 Yeni Sayfa Oluşturma Adımları

### Adım 1: Dosya Oluştur
```
pages/[MODÜL][HARF]_[KONU].html
```

### Adım 2: Template Uygula
- Yukarıdaki HTML template'i kopyala
- Başlık, içerik ekle
- Python kod blokları ekle (INDEX numaralarına dikkat)
- Görselleştirmeler ekle

### Adım 3: CSS Variables Kontrol
- Hardcoded renk yok mu? (`#fff`, `white`, `#333`)
- `var(--...)` kullanılıyor mu?

### Adım 4: navigation.json Güncelle
- Yeni sayfayı modül listesine ekle
- `file`, `shortTitle`, `title` belirt

### Adım 5: Test Et
- Tema değişimi çalışıyor mu?
- Python kodu çalışıyor mu?
- Navigasyon butonları doğru mu?
- Dark mode'da görselleştirmeler düzgün mü?

## 📖 İçerik Yazma Rehberi

### Pedagojik Yapı

1. **Motivasyon** - Neden bu konu önemli?
2. **Teori** - Kavramsal açıklama
3. **Görselleştirme** - Diyagram, animasyon
4. **Kod Örnekleri** - Basit → Karmaşık
5. **Gerçek Dünya Örnekleri** - Pratik kullanım
6. **Karşılaştırma** - Alternatiflerle kıyaslama
7. **Özet** - Anahtar noktalar

### Ton ve Dil

- ✅ Türkçe, samimi, öğrenci dostu
- ✅ Teknik terimler hem İngilizce hem Türkçe
- ✅ Emoji kullan (ama abartma)
- ✅ Gerçek dünya örnekleri ver
- ❌ Çok fazla teorik jargon
- ❌ Pasif cümleler

### Kod Örnekleri

```python
# ✅ İyi örnek - Açıklayıcı, basit, yorumlu
def push(stack, element):
    """Stack'e eleman ekler - O(1)"""
    stack.append(element)
    print(f"✅ {element} eklendi")

# Test
my_stack = []
push(my_stack, 5)
push(my_stack, 10)
print(f"Stack: {my_stack}")
```

```python
# ❌ Kötü örnek - Açıklama yok, karmaşık
def x(s,e):
    s.append(e)
```

## 🔍 Kalite Kontrol Checklist

Yeni sayfa oluşturduğunda kontrol et:

- [ ] `<title>` doğru format: `[NO].[NO]: [BAŞLIK]`
- [ ] Theme toggle button var
- [ ] `main.css`, `main.js`, `visualizations.js` import edilmiş
- [ ] Prism.js line-numbers plugin var
- [ ] CodeMirror 6 import edilmiş
- [ ] Pyodide CDN yükleniyor
- [ ] Tüm kod blokları `CodeBlocks.run(INDEX)` kullanıyor
- [ ] `<textarea>` YOK
- [ ] CSS variables kullanılmış (hardcoded renk yok)
- [ ] `<div class="nav-footer"></div>` var (boş)
- [ ] navigation.json güncellendi
- [ ] Dark mode test edildi
- [ ] Python kodları çalışıyor
- [ ] Görselleştirmeler responsive
- [ ] Emoji kullanımı dengeli
- [ ] Türkçe karakter sorunları yok

## 💡 İpuçları ve Best Practices

### 1. Performans
- Büyük görselleştirmeler için lazy loading kullan
- Canvas yerine CSS animasyon tercih et (mümkünse)
- Pyodide her sayfada ayrı ayrı yükleniyor (cache'leniyor)

### 2. Accessibility
- Alt text ekle görsellere
- Keyboard navigation test et
- Renk körü dostça renkler (contrast ratio)

### 3. Mobile Responsive
- `flex-wrap: wrap` kullan
- Font boyutları relative (`em`, `rem`)
- Touch-friendly buton boyutları (min 44px)

### 4. SEO (Gelecek için)
- Meta description ekle
- Anlamlı başlıklar (h1, h2, h3)
- Alt text, title attribute

## 🚀 Örnek Sayfa Şablonları

### Algoritma Analizi Sayfası

```html
<div class="section">
    <h2>⏱️ Zaman Karmaşıklığı</h2>

    <div style="background: var(--info-bg); padding: 20px; border-radius: 10px;">
        <h3>Big O Notasyonu</h3>
        <p>Algoritmanın <strong>en kötü durum</strong> performansını ifade eder.</p>
    </div>

    <!-- Karşılaştırma tablosu -->
    <table>...</table>

    <!-- Kod örneği -->
    <div class="code-container">...</div>

    <!-- Görselleştirme -->
    <canvas id="complexity-chart"></canvas>
</div>
```

### Veri Yapısı Sayfası

```html
<div class="section">
    <h2>📦 Yapı ve Özellikler</h2>

    <!-- Görsel diyagram -->
    <div class="visualization">...</div>

    <!-- Temel işlemler -->
    <h3>Temel İşlemler</h3>
    <ul>
        <li>Insert - O(1)</li>
        <li>Delete - O(1)</li>
        <li>Search - O(n)</li>
    </ul>

    <!-- Python implementasyonu -->
    <div class="code-container">...</div>
</div>
```

## 📚 Ek Kaynaklar

### Harici Kütüphaneler
- **Pyodide:** v0.25.0 (Browser Python)
- **CodeMirror:** v6 (ES modules)
- **Prism.js:** v1.29.0 (Syntax highlighting)
- **Chart.js:** v4 (Grafikler için - opsiyonel)
- **Mermaid:** v10 (Diyagramlar için - opsiyonel)

### Renk Paleti
```css
/* Ana renkler */
--primary: #667eea;
--secondary: #764ba2;
--accent-blue: #3498db;
--accent-red: #e74c3c;
--accent-green: #27ae60;

/* Modül renkleri */
Module 0: #667eea (Purple)
Module 1: #3498db (Blue)
Module 2: #8e44ad (Dark Purple)
Module 3: #11998e (Teal)
Module 4: #e94560 (Red-Pink)
```

## 🎓 Örnek: Yeni "Graph" Modülü Eklemek

### 1. Dosyalar Oluştur
```
pages/10_graph_intro.html
pages/10a_graph_temsil.html
pages/10b_bfs.html
pages/10c_dfs.html
pages/graph.html (menü)
```

### 2. navigation.json Güncelle
```json
{
  "id": 10,
  "title": "Graf Algoritmaları",
  "color": "#ff6b6b",
  "menuFile": "graph.html",
  "pages": [
    {"file": "10_graph_intro.html", "shortTitle": "Giriş", "title": "Graf Nedir?"},
    {"file": "10a_graph_temsil.html", "shortTitle": "Temsil", "title": "Graf Temsilleri"},
    {"file": "10b_bfs.html", "shortTitle": "BFS", "title": "Breadth-First Search"},
    {"file": "10c_dfs.html", "shortTitle": "DFS", "title": "Depth-First Search"}
  ]
}
```

### 3. Template'den Sayfalar Oluştur
Her sayfa için yukarıdaki HTML template kullan, içeriği doldur.

### 4. index.html Güncelle
Ana menüye yeni modül kartı ekle.

---

## 📞 Destek ve Güncellemeler

Bu prompt, projenin **tam teknik spesifikasyonunu** içerir. Yeni bir LLM'e bu prompt verildiğinde:
- Mevcut sayfalarla %100 uyumlu yeni sayfalar üretebilir
- Tüm standartlara (CSS variables, CodeBlocks API, navigation) uyar
- Dark mode, responsive, accessibility özelliklerini korur

**Son Güncelleme:** Aralık 2025 (56 sayfa migration tamamlandı)
