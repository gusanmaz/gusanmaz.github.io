const extraContent = {
    id: "extra",
    title: "Ekstra Özellikler",
    icon: "🎁",
    content: `
        <div class="lesson-header">
            <h2>Ekstra Özellikler ve API Referansı</h2>
            <p class="subtitle">p5.play'in Tiles sistemi, detaylı Input yönetimi ve tam API referansı.</p>
        </div>

        <div class="lesson-section">
            <h3>Sprite Oluşturma Yöntemleri</h3>
            <p>Sprite'lar birçok farklı şekilde oluşturulabilir:</p>
            
            <pre style="background: var(--bg-elevated); padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0;">
<code>// 1. Basit daire
let circle = new Sprite(x, y, diameter);

// 2. Dikdörtgen
let rect = new Sprite(x, y, width, height);

// 3. Collider türü ile
let staticRect = new Sprite(x, y, w, h, 'static');

// 4. Sadece pozisyon (boyut sonra ayarlanır)
let s = new Sprite(x, y);
s.w = 50;
s.h = 30;

// 5. Sprite silme
sprite.remove();</code></pre>

            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Daire
    let c = new Sprite(80, 100, 50);
    c.color = '#ff6b9d';
    c.text = 'Daire';
    c.textSize = 10;
    
    // Dikdörtgen
    let r = new Sprite(200, 100, 80, 50);
    r.color = '#00d4ff';
    r.text = 'Rect';
    r.textSize = 10;
    
    // Static (sabit)
    let s = new Sprite(320, 100, 60, 60, 'static');
    s.color = '#00ff88';
    s.text = 'Static';
    s.textSize = 10;
    
    // Kinematic
    let k = new Sprite(200, 220, 100, 30, 'kinematic');
    k.color = '#febc2e';
    k.text = 'Kinematic';
    k.textSize = 10;
}

function draw() {
    background('#1a1a2e');
    
    // Kinematic hareketi
    let k = allSprites[3];
    k.x = 200 + sin(frameCount * 0.03) * 100;
}
            `, 'Sprite Türleri')}
        </div>

        <div class="lesson-section">
            <h3>Önemli Sprite Özellikleri (Tam Liste)</h3>
            
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Özellik</th>
                        <th>Tip</th>
                        <th>Açıklama</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>x, y</code></td><td>number</td><td>Pozisyon</td></tr>
                    <tr><td><code>w, h</code></td><td>number</td><td>Genişlik, yükseklik (dikdörtgen)</td></tr>
                    <tr><td><code>d</code></td><td>number</td><td>Çap (daire)</td></tr>
                    <tr><td><code>vel.x, vel.y</code></td><td>number</td><td>Hız vektörü</td></tr>
                    <tr><td><code>speed</code></td><td>number</td><td>Toplam hız</td></tr>
                    <tr><td><code>direction</code></td><td>number</td><td>Hareket yönü (derece)</td></tr>
                    <tr><td><code>rotation</code></td><td>number</td><td>Dönüş açısı</td></tr>
                    <tr><td><code>rotationSpeed</code></td><td>number</td><td>Dönüş hızı</td></tr>
                    <tr><td><code>scale</code></td><td>number</td><td>Ölçek (1 = normal)</td></tr>
                    <tr><td><code>mass</code></td><td>number</td><td>Kütle</td></tr>
                    <tr><td><code>bounciness</code></td><td>0-1</td><td>Sekme katsayısı</td></tr>
                    <tr><td><code>friction</code></td><td>0-1</td><td>Sürtünme</td></tr>
                    <tr><td><code>drag</code></td><td>number</td><td>Hava direnci</td></tr>
                    <tr><td><code>color</code></td><td>string</td><td>Dolgu rengi</td></tr>
                    <tr><td><code>stroke</code></td><td>string</td><td>Kenar rengi</td></tr>
                    <tr><td><code>text</code></td><td>string</td><td>Üzerindeki metin</td></tr>
                    <tr><td><code>textSize</code></td><td>number</td><td>Metin boyutu</td></tr>
                    <tr><td><code>visible</code></td><td>boolean</td><td>Görünürlük</td></tr>
                    <tr><td><code>layer</code></td><td>number</td><td>Çizim katmanı</td></tr>
                    <tr><td><code>life</code></td><td>number</td><td>Ömür (frame). 0'da silinir</td></tr>
                </tbody>
            </table>
        </div>

        <div class="lesson-section">
            <h3>Önemli Sprite Metodları</h3>
            
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Metod</th>
                        <th>Açıklama</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>moveTowards(target, speed)</code></td><td>Hedefe doğru sürekli hareket</td></tr>
                    <tr><td><code>moveAway(target, speed)</code></td><td>Hedeften uzaklaş</td></tr>
                    <tr><td><code>moveTo(x, y, speed)</code></td><td>Hedefe git (async, await kullanılabilir)</td></tr>
                    <tr><td><code>move(dist, dir, speed)</code></td><td>Belirli mesafe git</td></tr>
                    <tr><td><code>applyForce(x, y)</code></td><td>Kuvvet uygula</td></tr>
                    <tr><td><code>collides(other)</code></td><td>Çarpışma anında true</td></tr>
                    <tr><td><code>colliding(other)</code></td><td>Çarpışma süresince true</td></tr>
                    <tr><td><code>overlaps(other)</code></td><td>Örtüşme başlangıcında true</td></tr>
                    <tr><td><code>overlapping(other)</code></td><td>Örtüşme süresince true</td></tr>
                    <tr><td><code>remove()</code></td><td>Sprite'ı sil</td></tr>
                </tbody>
            </table>
        </div>

        <div class="lesson-section">
            <h3>Gelişmiş Input (Girdi) Yönetimi</h3>
            <p>Klavye ve Mouse durumlarını detaylı kontrol edebilirsiniz:</p>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">kb.presses('key')</div>
                    <div class="type">boolean</div>
                    <div class="description">Tuşa basıldığı <strong>ilk karede</strong> true döner.</div>
                </div>
                <div class="property-card">
                    <div class="name">kb.pressing('key')</div>
                    <div class="type">boolean</div>
                    <div class="description">Tuş basılı tutulduğu <strong>sürece</strong> true.</div>
                </div>
                <div class="property-card">
                    <div class="name">kb.released('key')</div>
                    <div class="type">boolean</div>
                    <div class="description">Tuş bırakıldığı <strong>ilk karede</strong> true.</div>
                </div>
                <div class="property-card">
                    <div class="name">mouse.presses()</div>
                    <div class="type">boolean</div>
                    <div name="description">Tıklandığı ilk kare</div>
                </div>
            </div>
            
            ${createPlayground(`
let box;
let jumpCount = 0;
let moveCount = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    box = new Sprite(200, 150, 50, 50);
    box.color = '#c44dff';
}

function draw() {
    background('#1a1a2e');
    
    // PRESSES: Sadece 1 kere tetiklenir
    if (kb.presses('space')) {
        jumpCount++;
        box.vel.y = -8;
    }
    
    // PRESSING: Basılı tutulduğu sürece
    if (kb.pressing('left')) {
        box.x -= 3;
        moveCount++;
    }
    if (kb.pressing('right')) {
        box.x += 3;
        moveCount++;
    }
    
    // RELEASED: Bırakıldığında
    if (kb.released('space')) {
        box.color = '#00ff88';
    }
    if (kb.pressing('space')) {
        box.color = '#ff6b9d';
    }
    if (!kb.pressing('space') && !kb.released('space')) {
        box.color = '#c44dff';
    }
    
    // Yerçekimi simülasyonu
    box.vel.y += 0.3;
    box.y = min(box.y, 220);
    if (box.y >= 220) box.vel.y = 0;
    
    fill(255);
    textSize(11);
    text('SPACE: Zipla (presses) = ' + jumpCount, 15, 25);
    text('Sol/Sag: Hareket (pressing) = ' + moveCount, 15, 45);
}
            `, 'Input Detaylı Test')}
        </div>

        <div class="lesson-section">
            <h3>Sprite Ömrü (life)</h3>
            <p>Sprite'a ömür vererek otomatik silinmesini sağlayın - mermiler, parçacıklar için ideal:</p>
            
            ${createPlayground(`
let particles;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    particles = new Group();
    particles.d = 15;
    particles.life = 60; // 60 frame = 1 saniye
}

function draw() {
    background('#1a1a2e');
    
    // Her karede yeni parçacık
    if (frameCount % 3 === 0) {
        let p = new particles.Sprite(mouseX, mouseY);
        p.color = color(
            random(200, 255),
            random(100, 200),
            random(150, 255)
        );
        p.vel.x = random(-3, 3);
        p.vel.y = random(-3, 3);
    }
    
    // Yaşlandıkça küçült
    for (let p of particles) {
        p.d = map(p.life, 0, 60, 2, 15);
        p.opacity = map(p.life, 0, 60, 0, 1);
    }
    
    fill(255);
    textSize(12);
    text('Mouse ile parcacik olustur', 15, 25);
    text('Parcacik sayisi: ' + particles.length, 15, 45);
}
            `, 'Otomatik Ömür (life)')}
        </div>

        <div class="lesson-section">
            <h3>allSprites - Tüm Sprite'lar</h3>
            <p><code>allSprites</code> otomatik oluşturulan bir grup olup tüm sprite'ları içerir:</p>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Rastgele sprite'lar
    for (let i = 0; i < 10; i++) {
        let s = new Sprite(
            random(50, 350),
            random(50, 250),
            random(30, 50)
        );
        s.color = color(random(255), random(255), random(255));
        s.vel.x = random(-2, 2);
        s.vel.y = random(-2, 2);
    }
}

function draw() {
    background('#1a1a2e');
    
    // allSprites ile tümünü kontrol et
    for (let s of allSprites) {
        // Sınırlardan sekme
        if (s.x < 25 || s.x > 375) s.vel.x *= -1;
        if (s.y < 25 || s.y > 275) s.vel.y *= -1;
    }
    
    // Tıklayınca en yakınını sil
    if (mouse.presses()) {
        let closest = null;
        let minDist = Infinity;
        for (let s of allSprites) {
            let d = dist(mouseX, mouseY, s.x, s.y);
            if (d < minDist) {
                minDist = d;
                closest = s;
            }
        }
        if (closest && minDist < 50) {
            closest.remove();
        }
    }
    
    fill(255);
    textSize(12);
    text('Toplam sprite: ' + allSprites.length, 15, 25);
    text('Tikla: En yakini sil', 15, 45);
}
            `, 'allSprites Kullanımı')}
        </div>

        <div class="lesson-section">
            <h3>world Ayarları</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">world.gravity.x/y</div>
                    <div class="type">number</div>
                    <div class="description">Yerçekimi. y=10 normal, y=0 uzay.</div>
                </div>
                <div class="property-card">
                    <div class="name">world.velocityIterations</div>
                    <div class="type">number</div>
                    <div class="description">Fizik hassasiyeti (varsayılan 8).</div>
                </div>
                <div class="property-card">
                    <div class="name">world.positionIterations</div>
                    <div class="type">number</div>
                    <div class="description">Pozisyon düzeltme hassasiyeti.</div>
                </div>
            </div>
        </div>
    `
};

