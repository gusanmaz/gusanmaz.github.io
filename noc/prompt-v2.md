# Nature of Code - Türkçe İnteraktif Eğitim Sitesi Oluşturma Prompt'u

## 📋 Genel Bakış

Bu prompt, Daniel Shiffman'ın "Nature of Code" kitabının herhangi bir bölümünü Türkçe interaktif bir eğitim sitesine dönüştürmek için kullanılabilir.

---

## 🎯 Hedef

Kitabın bir bölümünü (chapter) alıp:
1. Türkçeye çevrilmiş
2. Başlangıç seviyesi öğrenciler için detaylı açıklamalarla genişletilmiş
3. Çalıştırılabilir kod editörleri içeren
4. Dark/Light tema destekli
5. Mobil uyumlu (responsive)
6. Görseller ve formüllerle zenginleştirilmiş

bir web sitesi oluşturmak.

---

## 🎓 Hedef Kitle Profili

### Programlama Seviyesi: BAŞLANGIÇ
- p5.js ile **yeni tanıştı**
- Temel JavaScript kavramları **yeni oturuyor** (if/else, for, diziler, temel OOP)
- Fonksiyonlar ve parametreleri **tam anlamadı**

### Matematik/Fizik Seviyesi: DÜŞÜK
- Fizik formüllerini **ezberden bilmiyor**
- Kavramlar **detaylı açıklanmalı**

### Bu Nedenle:
1. **Her satırı açıkla** - "Bu satır ne yapıyor?" sorusuna cevap ver
2. **Konseptleri detaylı anlat** - Kitaptaki açıklamayı genişlet
3. **Basitten karmaşığa git** - Önce basit örnek, sonra tam kod
4. **Görsellerle destekle** - Formülleri diagram/görsellerle açıkla

---

## 📁 Proje Yapısı

```
project/
├── index.html                    # Ana sayfa (konu kartları)
├── css/
│   └── style.css                 # Tüm stiller
├── js/
│   ├── theme.js                  # Dark/Light tema toggle
│   └── live-editor.js            # Çalıştırılabilir kod editörü
├── images/                       # Kitaptan görseller
└── pages/
    ├── konu-1.html
    ├── konu-2.html
    └── ...
```

---

## 🔧 Teknik Gereksinimler

### 1. Live Code Editor Özellikleri

```
┌─────────────────────────────────────────────────────────────┐
│ [sketch.js] [mover.js]           [▶ Çalıştır] [↻ Sıfırla]  │
├─────────────────────────┬───────────────────────────────────┤
│  1 │ let mover;         │                                   │
│  2 │ function setup() { │      ┌─────────────────┐          │
│  3 │   createCanvas(...) │      │   p5.js Canvas  │         │
│  4 │   ...              │      │                 │          │
│  5 │ }                  │      └─────────────────┘          │
└─────────────────────────┴───────────────────────────────────┘
```

**Editör Özellikleri:**
| Özellik | Açıklama |
|---------|----------|
| Çoklu Dosya Tab'ları | Her dosya için ayrı tab (sketch.js, mover.js, vb.) |
| Satır Numaraları | Her satırın solunda - kod ile hizalı |
| Syntax Highlighting | Keywords, strings, numbers, comments farklı renkte |
| Düzenlenebilir | Kullanıcı kodu değiştirebilir |
| ▶ Çalıştır | Tüm dosyaları birleştirip p5.js olarak çalıştır |
| ↻ Sıfırla | Orijinal koda dön |
| Ctrl+Enter | Kısayol ile çalıştırma |

**Kritik CSS Gereksinimleri (Cursor Pozisyonu İçin):**
```css
/* Textarea ve highlight layer'da tüm font özellikleri AÇIKÇA ve AYNI belirtilmeli */
.code-highlight, .code-editor textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 14px;
    line-height: 1.6;
    letter-spacing: normal;
    word-spacing: normal;
    tab-size: 2;
    white-space: pre;
    padding: 1rem;
    /* AYNI değerler her ikisinde de olmalı */
}

/* Textarea şeffaf, highlight görünür */
.code-editor textarea {
    color: transparent;
    -webkit-text-fill-color: transparent;
    caret-color: var(--code-text); /* Cursor görünür */
    z-index: 1;
}

/* Highlight layer scroll etmez, transform ile kaydırılır */
.code-highlight {
    overflow: hidden;
    pointer-events: none;
}
```

**JavaScript Scroll Senkronizasyonu:**
```javascript
textarea.addEventListener('scroll', () => {
    // Line numbers
    lineNumbers.scrollTop = textarea.scrollTop;
    // Highlight layer - transform ile (performanslı)
    highlightCode.style.transform = `translate(${-textarea.scrollLeft}px, ${-textarea.scrollTop}px)`;
});
```

### 2. Syntax Highlighting Renkleri

```css
:root {
    /* Light Theme */
    --hl-keyword: #d73a49;    /* let, const, function, class */
    --hl-string: #22863a;     /* "string", 'string' */
    --hl-number: #005cc5;     /* 42, 3.14 */
    --hl-comment: #6a737d;    /* // yorum */
    --hl-function: #6f42c1;   /* createVector, draw */
    --hl-method: #005cc5;     /* .add(), .mult() */
}

[data-theme="dark"] {
    --hl-keyword: #ff7b72;
    --hl-string: #a5d6ff;
    --hl-number: #79c0ff;
    --hl-comment: #8b949e;
    --hl-function: #d2a8ff;
    --hl-method: #79c0ff;
}
```

### 3. Dark/Light Tema

- Toggle butonu sağ üstte (🌙/☀️)
- localStorage ile tercih kaydet
- CSS değişkenleri ile renk yönetimi

### 4. Responsive Design

**Desktop (>900px):** Kod ve canvas yan yana
**Mobil (<900px):** Kod üstte, canvas altta

---

## 📝 İçerik Formatı

### 1. Başlıklara İngilizce Terim Ekle

```html
<h2>Sürtünme <span class="term-en">(Friction)</span></h2>
```

```css
.term-en {
    font-size: 0.85em;
    color: var(--text-muted);
    font-style: italic;
}
```

### 2. Formüllerde Vektör Simgeleri Kullan

```html
<!-- Vektörler için ⃗ (combining arrow) kullan -->
<div class="formula">F⃗ = m × a⃗</div>
<div class="formula">a⃗ = F⃗ / m</div>

<!-- Alt indis için subscript -->
<div class="formula">F⃗<sub>net</sub> = F⃗₁ + F⃗₂</div>

<!-- Birim vektör için şapka -->
<div class="formula">v̂</div> <!-- hız birim vektörü -->
```

### 3. SVG Diyagramlar (ASCII Art Yerine)

```html
<div class="vector-diagram">
    <svg viewBox="0 0 320 220" class="vector-svg">
        <!-- Grid arka plan -->
        <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-color)" stroke-width="0.5" opacity="0.3"/>
            </pattern>
            <!-- Ok başları -->
            <marker id="arrowA" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
        </defs>
        <rect width="320" height="220" fill="url(#grid)"/>
        
        <!-- Vektörler -->
        <line x1="40" y1="40" x2="160" y2="40" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowA)"/>
        <text x="90" y="30" fill="#ef4444" font-size="14" font-weight="bold">A⃗ = (3, 0)</text>
        
        <!-- Açıklama kutusu -->
        <rect x="10" y="150" width="300" height="60" rx="8" fill="var(--bg-tertiary)" opacity="0.9"/>
        <text x="20" y="172" fill="var(--text-primary)" font-size="13">Açıklama metni</text>
    </svg>
</div>
```

### 4. Kod Açıklama Formatı

```javascript
/**
 * applyForce - Cisme kuvvet uygular
 * @param {p5.Vector} force - Uygulanacak kuvvet vektörü
 */
applyForce(force) {
  // Newton'un 2. yasası: a = F / m
  // p5.Vector.div() -> statik metod, YENİ vektör döndürür
  // Neden statik? force'u değiştirmek istemiyoruz
  let f = p5.Vector.div(force, this.mass);
  
  // İvmeye EKLE (biriktir) - üzerine yazma!
  this.acceleration.add(f);
}
```

### 5. "Deneyin" Kutuları

```html
<div class="try-box">
    <h4>🔬 Deneyin:</h4>
    <ol>
        <li>
            <strong>Satır 13:</strong> Yerçekimini <code>createVector(0, 0.5)</code> yapın.
            <span class="expectation">Beklenti: Top daha hızlı düşer</span>
        </li>
    </ol>
</div>
```

### 6. Bilgi/Uyarı Kutuları

```html
<div class="info-box note">
    <h4>💡 Başlık</h4>
    <p>Açıklama...</p>
</div>

<div class="info-box warning">
    <h4>⚠️ Dikkat</h4>
    <p>Uyarı...</p>
</div>

<div class="info-box tip">
    <h4>🎮 İpucu</h4>
    <p>Öneri...</p>
</div>
```

---

## 🖼️ Görseller

### Kaynak
```
https://raw.githubusercontent.com/nature-of-code/noc-book-2/main/content/images/[CHAPTER]/[FILE].png
```

### Görselleri Doğru Konuma Yerleştirme
1. Kitabın HTML dosyasını incele: `content/[chapter].html`
2. Her `<figure>` ve `<figcaption>` etiketine bak
3. Görselin hangi başlık/konu altında olduğunu belirle
4. Türkçe figcaption ekle

```html
<div class="image-container">
    <img src="https://raw.githubusercontent.com/nature-of-code/noc-book-2/main/content/images/02_forces/02_forces_2.png"
         alt="Açıklayıcı alt text" class="content-image">
    <figcaption>Şekil 2.1: Türkçe açıklama</figcaption>
</div>
```

---

## 📚 Bölüm İşleme Adımları

### Adım 1: Kaynak Analizi
1. GitHub'dan bölümün HTML'ini al: `content/[chapter].html`
2. Görselleri listele: `content/images/[chapter]/`
3. Kod örneklerini incele: `content/examples/[chapter]/`

### Adım 2: Konu Bölümleme
Kitabın başlıklarına göre konuları ayır:
- Her `<h2>` veya `<h3>` bir sayfa olabilir
- Çok uzun bölümler alt sayfalara bölünebilir

### Adım 3: İçerik Oluşturma
Her konu için:
1. Türkçe başlık + İngilizce terim
2. Giriş paragrafı (basit açıklama)
3. Detaylı açıklama (kavramlar)
4. Formüller (vektör simgeleri ile)
5. Görsel/diyagram
6. Kod örneği (çalıştırılabilir editör)
7. Satır satır açıklama
8. "Deneyin" kutusu

### Adım 4: Navigasyon
- Ana sayfada konu kartları
- Her sayfada önceki/sonraki linkleri
- Geri dön linki

---

## ✅ Kontrol Listesi

### Editör
- [ ] Syntax highlighting çalışıyor
- [ ] Cursor doğru pozisyonda
- [ ] Scroll düzgün çalışıyor
- [ ] Tab'lar arası geçiş çalışıyor
- [ ] Çalıştır butonu çalışıyor
- [ ] Sıfırla butonu çalışıyor

### Tema
- [ ] Dark/Light toggle çalışıyor
- [ ] localStorage'a kaydediyor
- [ ] Tüm elementler tema değişikliğine uyuyor

### Responsive
- [ ] Mobilde düzgün görünüyor
- [ ] Tab'lar yatay scroll yapabiliyor
- [ ] Butonlar yeterince büyük

### İçerik
- [ ] Tüm formüllerde vektör simgeleri var
- [ ] İngilizce terimler eklenmiş
- [ ] Görseller doğru konumda
- [ ] Figcaption'lar Türkçe
- [ ] Kod açıklamaları detaylı

---

## 🚫 Yapılmaması Gerekenler

1. **Kodu açıklamadan gösterme** - Her satırı açıkla
2. **"Bu basit" deme** - Her şeyi açıkla
3. **Fizik formülünü vermeden geçme** - Detaylı anlat
4. **Görsel olmadan bırakma** - Diyagram/resim ekle
5. **Tek dosya gösterip diğerlerini atlama** - Tüm dosyaları göster
6. **ASCII art kullanma** - SVG diyagram kullan
7. **Sadece Türkçe terim kullanma** - İngilizce karşılığını da yaz

---

## 📖 Örnek Bölüm Yapısı

### Ana Sayfa (index.html)
- Header (başlık + tema toggle)
- Giriş bölümü (bölüm hakkında)
- Temel kavram kutusu (varsa)
- Konu kartları grid'i
- Kaynaklar bölümü
- Footer

### Konu Sayfası (pages/konu.html)
- Header (geri link + başlık + tema toggle)
- İçerik bölümleri (her biri `<section class="content-section">`)
  - Başlık (İngilizce terimli)
  - Açıklama paragrafları
  - Formül kutusu
  - Görsel/diyagram
  - Kod editörü
  - Açıklama listesi
  - Deneyin kutusu
- Sayfa navigasyonu (önceki/sonraki)
- Footer

---

## 🔄 Güncelleme Notları

Bu prompt v2, şu iyileştirmeleri içerir:
1. Cursor pozisyonu düzeltmeleri (font eşleşmesi)
2. SVG diyagram kullanımı
3. Vektör simgeleri (⃗) kullanımı
4. İngilizce terim ekleme formatı
5. Scroll senkronizasyonu (transform ile)
6. Syntax highlighting renk şeması
7. Detaylı CSS gereksinimleri

---

**Bu prompt'u kullanarak kitabın herhangi bir bölümünü (Vectors, Oscillation, Particle Systems, vb.) aynı kalitede Türkçe interaktif eğitim sitesine dönüştürebilirsin.**

