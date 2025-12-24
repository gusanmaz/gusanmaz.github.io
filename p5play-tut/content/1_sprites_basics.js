const spritesContent = {
    id: "sprites",
    title: "Sprite Temelleri",
    icon: "🎯",
    content: `
        <div class="lesson-header">
            <h2>Sprite Temelleri</h2>
            <p class="subtitle">Sprite'lar p5.play'in temel yapı taşlarıdır. Oyununuzdaki her nesne - karakterler, düşmanlar, platformlar, mermiler - birer sprite'tır.</p>
        </div>

        <div class="lesson-section">
            <h3>Sprite Nedir?</h3>
            <p><strong>Sprite</strong> kelimesi video oyun tarihinde "ekranda hareket eden grafik nesne" anlamına gelir. p5.play'de sprite:</p>
            
            <ul style="margin: 16px 0; padding-left: 24px; line-height: 1.8;">
                <li><strong>Konum (x, y):</strong> Sprite'ın canvas üzerindeki yeri</li>
                <li><strong>Boyut (width, height veya diameter):</strong> Sprite'ın büyüklüğü</li>
                <li><strong>Şekil:</strong> Dikdörtgen, daire, çokgen vb.</li>
                <li><strong>Görsel:</strong> Renk, görüntü veya animasyon</li>
                <li><strong>Fizik:</strong> Hız, ivme, kütle, sürtünme</li>
                <li><strong>Collider:</strong> Çarpışma algılama için sınır</li>
            </ul>
            
            <div class="info-box note">
                <div class="info-title">📝 Önemli</div>
                <p>Bir sprite oluşturduğunuzda otomatik olarak <code>allSprites</code> grubuna eklenir ve her frame'de otomatik çizilir. Manuel çizim yapmanıza gerek yok!</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Sprite Constructor (Yapıcı Fonksiyon)</h3>
            <p><strong>Constructor</strong>, bir nesne oluşturmak için kullanılan özel fonksiyondur. <code>new Sprite()</code> yazdığınızda constructor çağrılır.</p>
            
            <p>Sprite constructor'ı çok esnektir - farklı parametre kombinasyonlarıyla farklı şekiller oluşturabilirsiniz:</p>
            
            <pre style="background: var(--bg-elevated); padding: 16px; border-radius: 8px; margin: 12px 0; overflow-x: auto;"><code>// Dikdörtgen: x, y, genişlik, yükseklik
new Sprite(x, y, w, h)

// Daire: x, y, çap
new Sprite(x, y, diameter)

// Çizgi: x, y, uzunluk, açı, 'line'
new Sprite(x, y, length, angle, 'line')

// Çokgen: x, y, kenarUzunluğu, 'şekilAdı'
new Sprite(x, y, sideLength, 'triangle')
new Sprite(x, y, sideLength, 'pentagon')
new Sprite(x, y, sideLength, 'hexagon')</code></pre>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 350);
    
    // 1. Dikdörtgen: x, y, genişlik, yükseklik
    let box = new Sprite(80, 80, 60, 40);
    box.color = '#ff6b9d';
    box.text = 'Kutu';
    
    // 2. Daire: x, y, çap
    let circle = new Sprite(200, 80, 50);
    circle.color = '#00d4ff';
    circle.text = 'Daire';
    
    // 3. Kare: x, y, boyut
    let square = new Sprite(320, 80, 50, 50);
    square.color = '#00ff88';
    square.text = 'Kare';
    
    // 4. Çizgi: x, y, uzunluk, açı, 'line'
    let line1 = new Sprite(80, 280, 80, 45, 'line');
    line1.color = '#febc2e';
    line1.strokeWeight = 4;
    line1.text = 'Çizgi';
}

function draw() {
    background('#1a1a2e');
}
            `, 'Temel Sprite Şekilleri')}
        </div>

        <div class="lesson-section">
            <h3>Özel Şekiller</h3>
            <p>p5.play'de üçgen, beşgen, altıgen gibi düzenli çokgenler oluşturabilirsiniz. Bunlar için şekil adını string olarak verirsiniz:</p>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    
    // Üçgen: x, y, kenarUzunluğu, 'triangle'
    let tri = new Sprite(80, 80, 50, 'triangle');
    tri.color = '#c44dff';
    
    // Pentagon: x, y, kenarUzunluğu, 'pentagon'
    let penta = new Sprite(200, 80, 40, 'pentagon');
    penta.color = '#00ff88';
    
    // Hexagon: x, y, kenarUzunluğu, 'hexagon'
    let hex = new Sprite(320, 80, 35, 'hexagon');
    hex.color = '#febc2e';
    
    // Octagon: x, y, kenarUzunluğu, 'octagon'
    let oct = new Sprite(80, 200, 30, 'octagon');
    oct.color = '#00d4ff';
    
    // Düzensiz Polygon (nokta dizisi - kapalı)
    // Noktaların başı ve sonu aynı olmalı
    let poly = new Sprite([
        [200, 170], [260, 160], 
        [270, 210], [230, 240], [180, 210], [200, 170]
    ]);
    poly.color = '#ff6b9d';
}

function draw() {
    background('#1a1a2e');
}
            `, 'Özel Şekiller')}
        </div>

        <div class="lesson-section">
            <h3>Temel Sprite Özellikleri</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.x, sprite.y</div>
                    <div class="type">number</div>
                    <div class="description">Sprite'ın merkez konumu (piksel cinsinden).</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.w, sprite.h</div>
                    <div class="type">number</div>
                    <div class="description">Genişlik ve yükseklik. <code>width</code>, <code>height</code> da kullanılabilir.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.d</div>
                    <div class="type">number</div>
                    <div class="description">Daire çapı (diameter). Sadece dairesel sprite'lar için.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.color</div>
                    <div class="type">string | p5.Color</div>
                    <div class="description">Sprite rengi. CSS renk adları, hex veya rgb() kullanılabilir.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.stroke</div>
                    <div class="type">string | p5.Color</div>
                    <div class="description">Kenar çizgisi rengi. <code>false</code> ile kapatılabilir.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.strokeWeight</div>
                    <div class="type">number</div>
                    <div class="description">Kenar çizgisi kalınlığı (piksel).</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.text</div>
                    <div class="type">string</div>
                    <div class="description">Sprite üzerinde gösterilecek metin veya emoji.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.textSize</div>
                    <div class="type">number</div>
                    <div class="description">Metin boyutu (piksel).</div>
                </div>
            </div>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    
    let s = new Sprite(200, 150, 100, 80);
    
    // Renk ve kenar
    s.color = '#ff6b9d';
    s.stroke = '#fff';
    s.strokeWeight = 3;
    
    // Metin
    s.text = 'Merhaba!';
    s.textSize = 16;
    s.textColor = '#fff';
}

function draw() {
    background('#1a1a2e');
}
            `, 'Sprite Stilleri')}
        </div>

        <div class="lesson-section">
            <h3>Dönme (Rotation)</h3>
            <p>Sprite'lar açı değerleriyle döndürülebilir veya otomatik dönme hızı verilebilir:</p>
            
            ${createPlayground(`
let spinner, controlled;

function setup() {
    new Canvas(400, 300);
    
    // Otomatik dönen sprite
    spinner = new Sprite(120, 150, 80, 30);
    spinner.color = '#ff6b9d';
    spinner.rotationSpeed = 2;
    spinner.text = '🔄';
    
    // Manuel kontrollü dönen sprite
    controlled = new Sprite(280, 150, 80, 30);
    controlled.color = '#00d4ff';
    controlled.text = '🎯';
}

function draw() {
    background('#1a1a2e');
    
    // Mouse ile kontrol
    controlled.rotation = map(mouseX, 0, width, -180, 180);
    
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text('rotationSpeed: 2', 120, 220);
    text('Mouse X: ' + Math.round(controlled.rotation) + '°', 280, 220);
}
            `, 'Rotation Örneği')}
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.rotation</div>
                    <div class="type">number</div>
                    <div class="description">Anlık açı (derece cinsinden).</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.rotationSpeed</div>
                    <div class="type">number</div>
                    <div class="description">Her frame'de eklenecek açı. Pozitif = saat yönü.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.rotationLock</div>
                    <div class="type">boolean</div>
                    <div class="description">true yapılırsa fizik etkileşimlerinde dönmez.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.bearing</div>
                    <div class="type">number</div>
                    <div class="description">Hareket yönü (derece). rotation'dan bağımsız.</div>
                </div>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Ölçeklendirme (Scale)</h3>
            <p>Sprite'ı büyütmek veya küçültmek için <code>scale</code> özelliğini kullanın:</p>
            
            ${createPlayground(`
let growing;
let currentScale = 1;
let scaleDir = 0.02;

function setup() {
    new Canvas(400, 300);
    
    growing = new Sprite(200, 150, 50);
    growing.color = '#c44dff';
    growing.text = '💜';
    growing.textSize = 20;
}

function draw() {
    background('#1a1a2e');
    
    // Scale animasyonu
    currentScale += scaleDir;
    if (currentScale > 2 || currentScale < 0.5) {
        scaleDir *= -1;
    }
    growing.scale = currentScale;
    
    // Bilgi göster
    fill(255);
    textSize(14);
    textAlign(CENTER);
    text('scale: ' + currentScale.toFixed(2), 200, 250);
}
            `, 'Scale Animasyonu')}
            
            <div class="info-box tip">
                <div class="info-title">💡 Scale.x ve Scale.y</div>
                <p>X ve Y eksenlerini ayrı ayrı ölçekleyebilirsiniz: <code>sprite.scale.x = 2</code> sadece genişliği 2 katına çıkarır.</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Sprite Pozisyon ve Boyut</h3>
            
            ${createPlayground(`
let box;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    box = new Sprite(200, 150, 60, 60);
    box.color = '#00d4ff';
}

function draw() {
    background('#1a1a2e');
    
    // Mouse ile hareket
    box.moveTowards(mouse, 0.1);
    
    // Pozisyon bilgisi
    fill(255);
    textSize(12);
    text('x: ' + Math.round(box.x), 20, 25);
    text('y: ' + Math.round(box.y), 20, 45);
    text('w: ' + box.w + ', h: ' + box.h, 20, 65);
    
    // Merkez noktası
    fill('#ff6b9d');
    noStroke();
    ellipse(box.x, box.y, 8);
}
            `, 'Pozisyon ve Boyut')}
        </div>

        <div class="lesson-section">
            <h3>Sprite Mirror (Aynalama)</h3>
            <p><code>mirror.x</code> ozelligi sprite'in gorselini yatay olarak aynalar:</p>
            
            ${createPlayground(`
let left, right;

function setup() {
    new Canvas(400, 300);
    
    // Asimetrik ok sekli (spriteArt ile)
    let okImg = spriteArt(\`
..bb
..bbb
bbbbb
bbbbbb
bbbbb
..bbb
..bb
\`, 8);
    
    // Sol - normal
    left = new Sprite(120, 150);
    left.image = okImg;
    left.collider = 'static';
    
    // Sag - aynali
    right = new Sprite(280, 150);
    right.image = okImg;
    right.mirror.x = true;
    right.collider = 'static';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(11);
    text('Normal', 100, 220);
    text('mirror.x = true', 248, 220);
    
    stroke(100);
    line(200, 80, 200, 220);
}
            `, 'Mirror Ornegi')}
        </div>

        <div class="lesson-section">
            <h3>Sprite'ı Kaldırma</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.visible</div>
                    <div class="type">boolean</div>
                    <div class="description">false yapılırsa sprite görünmez ama fizik çalışır.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.opacity</div>
                    <div class="type">number (0-1)</div>
                    <div class="description">Saydamlık. 0 = tamamen saydam, 1 = opak.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.layer</div>
                    <div class="type">number</div>
                    <div class="description">Çizim sırası. Yüksek = önde çizilir.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.debug</div>
                    <div class="type">boolean</div>
                    <div class="description">true yapılırsa collider sınırları gösterilir.</div>
                </div>
            </div>
            
            ${createPlayground(`
let kirmizi, mavi, yesil;

function setup() {
    new Canvas(400, 300);
    
    // Üç kart - üst üste binecek şekilde
    // collider 'none' = fizik yok, birbirini itmez
    
    // Kırmızı kart (en altta başlar)
    kirmizi = new Sprite(160, 150, 100, 130);
    kirmizi.color = '#ff5f57';
    kirmizi.layer = 0;
    kirmizi.text = 'KIRMIZI';
    kirmizi.textSize = 12;
    kirmizi.collider = 'none';
    
    // Mavi kart (ortada başlar)
    mavi = new Sprite(200, 150, 100, 130);
    mavi.color = '#007aff';
    mavi.layer = 1;
    mavi.text = 'MAVİ';
    mavi.textSize = 12;
    mavi.collider = 'none';
    
    // Yeşil kart (en üstte başlar)
    yesil = new Sprite(240, 150, 100, 130);
    yesil.color = '#28cd41';
    yesil.layer = 2;
    yesil.text = 'YEŞİL\\n(ÖN)';
    yesil.textSize = 12;
    yesil.collider = 'none';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(11);
    text('1, 2, 3 tuşlarına bas - o kartı öne getir', 10, 20);
    
    // Klavye ile layer değiştir
    if (kb.presses('1')) {
        kirmizi.layer = 10;
        mavi.layer = 1;
        yesil.layer = 2;
        kirmizi.text = 'KIRMIZI\\n(ÖN)';
        mavi.text = 'MAVİ';
        yesil.text = 'YEŞİL';
    }
    if (kb.presses('2')) {
        kirmizi.layer = 0;
        mavi.layer = 10;
        yesil.layer = 2;
        kirmizi.text = 'KIRMIZI';
        mavi.text = 'MAVİ\\n(ÖN)';
        yesil.text = 'YEŞİL';
    }
    if (kb.presses('3')) {
        kirmizi.layer = 0;
        mavi.layer = 1;
        yesil.layer = 10;
        kirmizi.text = 'KIRMIZI';
        mavi.text = 'MAVİ';
        yesil.text = 'YEŞİL\\n(ÖN)';
    }
}
            `, 'Görünürlük ve Layer')}
        </div>


        <div class="lesson-section">
            <h3>Sprite'ı Kaldırma</h3>
            <p>Oyundan bir sprite'ı kaldırmak için <code>remove()</code> metodunu kullanın:</p>
            
            ${createPlayground(`
let balls = [];

function setup() {
    new Canvas(400, 300);
}

function draw() {
    background('#1a1a2e');
    
    // Her 30 frame'de yeni top
    if (frameCount % 30 === 0) {
        let b = new Sprite(random(50, 350), 50, 30);
        b.color = color(random(255), random(255), random(255));
        b.vel.y = 2;
        balls.push(b);
    }
    
    // Ekrandan çıkanları kaldır
    for (let i = balls.length - 1; i >= 0; i--) {
        if (balls[i].y > 320) {
            balls[i].remove();
            balls.splice(i, 1);
        }
    }
    
    fill(255);
    textSize(14);
    text('Aktif toplar: ' + balls.length, 20, 25);
}
            `, 'Sprite Remove')}
        </div>

        <div class="lesson-section">
            <h3>life Özelliği (Otomatik Kaldırma)</h3>
            <p>Sprite'ın belirli frame sonra otomatik kaldırılmasını sağlar:</p>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
}

function draw() {
    background('#1a1a2e');
    
    // Tıklayınca parçacık oluştur
    if (mouse.pressing()) {
        let p = new Sprite(mouseX, mouseY, random(10, 25));
        p.color = color(random(255), random(255), random(255));
        p.vel.x = random(-3, 3);
        p.vel.y = random(-3, 3);
        p.life = 60; // 60 frame (1 saniye) sonra otomatik silinir
    }
    
    fill(255);
    textSize(12);
    text('Tıkla: Parçacık oluştur', 15, 25);
    text('Sprite sayısı: ' + allSprites.length, 15, 45);
}
            `, 'life Özelliği')}
        </div>

        <div class="info-box note">
            <div class="info-title">📝 allSprites</div>
            <p><code>allSprites</code> tüm sprite'ları içeren özel bir gruptur. Toplam sprite sayısını görmek için <code>allSprites.length</code> kullanabilirsiniz.</p>
        </div>
    `
};
