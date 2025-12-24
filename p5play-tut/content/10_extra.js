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

        <div class="lesson-section">
            <h3>spriteArt - Pixel Art Oluşturma</h3>
            <p><code>spriteArt()</code> fonksiyonu ile metin tabanlı pixel art görseller oluşturabilirsiniz. Her karakter bir piksel rengini temsil eder:</p>
            
            <pre style="background: var(--bg-elevated); padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0;">
<code>// spriteArt(stringArt, scale)
// Varsayılan renkler:
// . = şeffaf, w = beyaz, b = siyah
// r = kırmızı, g = yeşil, u = mavi (blue)
// y = sarı, o = turuncu, p = pembe
// c = cyan, v = mor (violet)

let art = spriteArt(\`
..rr..
.rrrr.
rrrrrr
rrrrrr
.rrrr.
..rr..
\`, 8); // 8x büyütme

sprite.image = art;</code></pre>
            
            ${createPlayground(`
let player;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Kalp pixel art
    let heartArt = spriteArt(\`
.rr.rr.
rrrrrrr
rrrrrrr
.rrrrr.
..rrr..
...r...
\`, 10);
    
    player = new Sprite(200, 150);
    player.image = heartArt;
    player.collider = 'kinematic';
}

function draw() {
    background('#1a1a2e');
    
    // Mouse'a dogru hareket
    player.moveTowards(mouse, 0.05);
    
    // Nabiz efekti
    let scale = 1 + sin(frameCount * 0.1) * 0.1;
    player.scale = scale;
    
    fill(255);
    textSize(12);
    text('spriteArt ile pixel art', 15, 25);
    text('Mouse ile hareket ettir', 15, 45);
}
            `, 'spriteArt Örneği')}
        </div>

        <div class="lesson-section">
            <h3>Tiles - Harita Oluşturma</h3>
            <p><code>new Tiles()</code> ile metin tabanlı harita/level tasarımı yapabilirsiniz:</p>
            
            ${createPlayground(`
let player;
let walls;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    walls = new Group();
    walls.color = '#2d3436';
    walls.collider = 'static';
    
    // Harita tasarimi
    // Her karakter 25x25 piksel
    new Tiles(
        [
            '================',
            '=..............=',
            '=..===....===..=',
            '=..=........=..=',
            '=..=........=..=',
            '=..===....===..=',
            '=..............=',
            '=....====......=',
            '=..............=',
            '=..............=',
            '=..............=',
            '================'
        ],
        0, 0, 25, 25
    );
    
    // Oyuncu
    player = new Sprite(200, 150, 20);
    player.color = '#00d4ff';
}

function draw() {
    background('#1a1a2e');
    
    // WASD kontrolu
    if (kb.pressing('w')) player.vel.y = -3;
    else if (kb.pressing('s')) player.vel.y = 3;
    else player.vel.y = 0;
    
    if (kb.pressing('a')) player.vel.x = -3;
    else if (kb.pressing('d')) player.vel.x = 3;
    else player.vel.x = 0;
    
    fill(255);
    textSize(11);
    text('WASD ile hareket et', 15, 25);
}
            `, 'Tiles ile Labirent')}
            
            <div class="info-box tip">
                <div class="info-title">💡 Tiles Parametreleri</div>
                <p><code>new Tiles(stringArray, x, y, tileWidth, tileHeight)</code><br>
                Her satırdaki karakterler için aynı isimde bir Group olmalı (= karakteri için walls grubu).</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>attractTo - Çekim Kuvveti</h3>
            <p><code>sprite.attractTo(target, force)</code> ile bir sprite'ı başka bir noktaya veya sprite'a çekebilirsiniz:</p>
            
            ${createPlayground(`
let sun, planets = [];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Güneş (sabit)
    sun = new Sprite(200, 150, 40);
    sun.color = '#febc2e';
    sun.collider = 'static';
    sun.text = '☀️';
    sun.textSize = 25;
    
    // Gezegenler
    for (let i = 0; i < 4; i++) {
        let p = new Sprite(
            200 + random(-150, 150),
            150 + random(-100, 100),
            15 + i * 5
        );
        p.color = ['#ff6b9d', '#00d4ff', '#00ff88', '#c44dff'][i];
        p.mass = 0.5;
        
        // Baslangic hizi (yörünge için)
        let angle = atan2(p.y - sun.y, p.x - sun.x);
        p.vel.x = cos(angle + PI/2) * 3;
        p.vel.y = sin(angle + PI/2) * 3;
        
        planets.push(p);
    }
}

function draw() {
    background('#1a1a2e');
    
    // Her gezegeni güneşe çek
    for (let p of planets) {
        p.attractTo(sun, 0.8);
    }
    
    fill(255);
    textSize(11);
    text('attractTo ile yercekim simulasyonu', 15, 25);
}
            `, 'Yörünge Simülasyonu')}
        </div>

        <div class="lesson-section">
            <h3>moveAway - Uzaklaşma</h3>
            <p><code>sprite.moveAway(target, speed)</code> ile sprite'ı bir noktadan uzaklaştırabilirsiniz:</p>
            
            ${createPlayground(`
let player;
let enemies = [];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 30);
    player.color = '#00d4ff';
    player.text = '😎';
    player.textSize = 20;
    player.collider = 'kinematic';
    
    // Düşmanlar
    for (let i = 0; i < 8; i++) {
        let e = new Sprite(
            random(50, 350),
            random(50, 250),
            25
        );
        e.color = '#ff6b9d';
        e.text = '👻';
        e.textSize = 15;
        enemies.push(e);
    }
}

function draw() {
    background('#1a1a2e');
    
    // Player mouse'a git
    player.moveTowards(mouse, 0.1);
    
    // Düşmanlar player'dan kaçsın
    for (let e of enemies) {
        let d = dist(e.x, e.y, player.x, player.y);
        if (d < 100) {
            e.moveAway(player, 2);
        }
    }
    
    fill(255);
    textSize(11);
    text('Mouse ile hareket et', 15, 25);
    text('Dusmanlar senden kacar!', 15, 45);
}
            `, 'moveAway Örneği')}
        </div>

        <div class="lesson-section">
            <h3>sleep ve delay - Asenkron Bekleme</h3>
            <p><code>await sleep(ms)</code> ve <code>await delay(frames)</code> ile asenkron bekleme yapabilirsiniz:</p>
            
            ${createPlayground(`
let message = 'Tikla!';
let messageColor = '#ffffff';

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
}

async function showSequence() {
    message = 'Basliyor...';
    messageColor = '#00d4ff';
    
    await sleep(1000); // 1 saniye bekle
    
    message = '3...';
    messageColor = '#ff6b9d';
    
    await sleep(1000);
    
    message = '2...';
    messageColor = '#febc2e';
    
    await sleep(1000);
    
    message = '1...';
    messageColor = '#00ff88';
    
    await sleep(1000);
    
    message = 'BASLA!';
    messageColor = '#c44dff';
    
    // 60 frame bekle
    await delay(60);
    
    message = 'Tekrar tikla!';
    messageColor = '#ffffff';
}

function draw() {
    background('#1a1a2e');
    
    if (mouse.presses()) {
        showSequence();
    }
    
    fill(messageColor);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(message, 200, 150);
    
    fill(255);
    textSize(11);
    textAlign(LEFT, TOP);
    text('sleep() ve delay() ornegi', 15, 25);
}
            `, 'Asenkron Bekleme')}
        </div>

        <div class="lesson-section">
            <h3>angleTo ve rotateTowards</h3>
            <p>Sprite'ın yönünü başka bir noktaya veya sprite'a çevirin:</p>
            
            ${createPlayground(`
let arrow;
let target;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Ok sprite
    let arrowArt = spriteArt(\`
....gg
....ggg
gggggggg
ggggggggg
gggggggg
....ggg
....gg
\`, 5);
    
    arrow = new Sprite(100, 150);
    arrow.image = arrowArt;
    arrow.collider = 'kinematic';
    
    // Hedef
    target = new Sprite(300, 150, 30);
    target.color = '#ff6b9d';
    target.text = '🎯';
    target.textSize = 20;
    target.collider = 'kinematic';
}

function draw() {
    background('#1a1a2e');
    
    // Hedef mouse'u takip etsin
    target.moveTowards(mouse, 0.1);
    
    // Ok hedefe dogru don
    arrow.rotateTowards(target, 0.1);
    
    // Mesafe hesapla
    let angle = arrow.angleTo(target);
    
    fill(255);
    textSize(11);
    text('angleTo: ' + round(angle) + ' derece', 15, 25);
    text('rotateTowards ile otomatik don', 15, 45);
}
            `, 'Yön Hesaplama')}
        </div>

        <div class="lesson-section">
            <h3>distanceTo - Mesafe Hesaplama</h3>
            <p><code>sprite.distanceTo(target)</code> ile iki sprite arasındaki mesafeyi hesaplayın:</p>
            
            ${createPlayground(`
let player;
let collectibles = [];
let score = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 25);
    player.color = '#00d4ff';
    player.collider = 'kinematic';
    
    // Toplanacak nesneler
    for (let i = 0; i < 10; i++) {
        let c = new Sprite(
            random(30, 370),
            random(30, 270),
            20
        );
        c.color = '#febc2e';
        c.text = '⭐';
        c.textSize = 14;
        c.collider = 'none';
        collectibles.push(c);
    }
}

function draw() {
    background('#1a1a2e');
    
    player.moveTowards(mouse, 0.15);
    
    // Mesafe kontrolü ile toplama
    for (let i = collectibles.length - 1; i >= 0; i--) {
        let c = collectibles[i];
        let d = player.distanceTo(c);
        
        // Yakinsa topla
        if (d < 25) {
            c.remove();
            collectibles.splice(i, 1);
            score++;
        }
        
        // Yakinlasinca büyüt
        if (d < 80) {
            c.scale = 1.3;
        } else {
            c.scale = 1;
        }
    }
    
    fill(255);
    textSize(14);
    text('Skor: ' + score, 15, 25);
    text('Yildizlari topla!', 15, 45);
}
            `, 'Mesafe ile Toplama')}
        </div>

        <div class="lesson-section">
            <h3>Mouse Sprite Etkileşimi</h3>
            <p>Mouse'un sprite ile etkileşimini algılayın:</p>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.mouse.hovering()</div>
                    <div class="type">boolean</div>
                    <div class="description">Mouse sprite üzerinde mi?</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.mouse.pressing()</div>
                    <div class="type">boolean</div>
                    <div class="description">Sprite'a basılı tutuluyor mu?</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.mouse.dragging()</div>
                    <div class="type">boolean</div>
                    <div class="description">Sprite sürükleniyor mu?</div>
                </div>
            </div>
            
            ${createPlayground(`
let buttons = [];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    let labels = ['Oynat', 'Durdur', 'Ayarlar'];
    let colors = ['#00ff88', '#ff6b9d', '#00d4ff'];
    
    for (let i = 0; i < 3; i++) {
        let btn = new Sprite(200, 80 + i * 70, 150, 50);
        btn.color = colors[i];
        btn.text = labels[i];
        btn.textSize = 16;
        btn.collider = 'static';
        btn.originalColor = colors[i];
        btn.label = labels[i];
        buttons.push(btn);
    }
}

function draw() {
    background('#1a1a2e');
    
    for (let btn of buttons) {
        // Hover efekti
        if (btn.mouse.hovering()) {
            btn.scale = 1.1;
            btn.color = '#febc2e';
        } else {
            btn.scale = 1;
            btn.color = btn.originalColor;
        }
        
        // Tiklama
        if (btn.mouse.presses()) {
            console.log(btn.label + ' tiklandi!');
        }
    }
    
    fill(255);
    textSize(12);
    text('Butonlarin uzerine gel ve tikla', 15, 25);
}
            `, 'Buton Sistemi')}
        </div>

        <div class="lesson-section">
            <h3>Sprite.remove() ve Yaşam Döngüsü</h3>
            <p>Sprite'ları oyundan kaldırma ve yaşam süreleri:</p>
            
            ${createPlayground(`
let particles = [];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 5;
}

function draw() {
    background('#1a1a2e');
    
    // Her frame parçacık oluştur
    if (frameCount % 3 === 0) {
        let p = new Sprite(mouseX, mouseY, random(5, 15));
        p.color = color(
            random(100, 255),
            random(100, 255),
            random(100, 255)
        );
        p.vel.x = random(-3, 3);
        p.vel.y = random(-5, -1);
        p.life = 100; // 100 frame yaşa
        p.collider = 'none';
        particles.push(p);
    }
    
    // Parçacıkları güncelle
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.life--;
        
        // Opaklığı azalt
        let alpha = map(p.life, 0, 100, 0, 255);
        p.color.setAlpha(alpha);
        
        // Ömrü bittiyse sil
        if (p.life <= 0) {
            p.remove();
            particles.splice(i, 1);
        }
    }
    
    fill(255);
    textSize(11);
    text('Mouse ile parcacik olustur', 15, 25);
    text('Parcacik sayisi: ' + particles.length, 15, 45);
}
            `, 'Parçacık Sistemi')}
        </div>

        <div class="lesson-section">
            <h3>bearing - Yön Bulma</h3>
            <p><code>sprite.bearing</code> sprite'ın mevcut hareket yönünü derece cinsinden verir:</p>
            
            ${createPlayground(`
let car;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Araba sprite
    let carArt = spriteArt(\`
..bb..
.bbbb.
bbbbbb
bbbbbb
.bbbb.
..bb..
\`, 8);
    
    car = new Sprite(200, 150);
    car.image = carArt;
    car.drag = 1;
    car.rotationDrag = 1;
}

function draw() {
    background('#1a1a2e');
    
    // Araba kontrolü
    if (kb.pressing('up')) {
        car.bearing = car.rotation;
        car.applyForce(2);
    }
    if (kb.pressing('down')) {
        car.bearing = car.rotation;
        car.applyForce(-1);
    }
    if (kb.pressing('left')) {
        car.rotationSpeed -= 0.5;
    }
    if (kb.pressing('right')) {
        car.rotationSpeed += 0.5;
    }
    
    fill(255);
    textSize(11);
    text('Ok tuslari ile sur', 15, 25);
    text('Hiz: ' + round(car.speed * 10) / 10, 15, 45);
    text('Yon: ' + round(car.rotation) + ' derece', 15, 65);
}
            `, 'Araba Kontrolü')}
        </div>

        <div class="lesson-section">
            <h3>Tam Sprite Metod Listesi</h3>
            
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Metod</th>
                        <th>Açıklama</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>move(distance, direction, speed)</code></td><td>Belirli mesafe/yöne hareket</td></tr>
                    <tr><td><code>moveTo(x, y, speed)</code></td><td>Belirli noktaya git (async)</td></tr>
                    <tr><td><code>moveTowards(target, tracking)</code></td><td>Hedefe doğru sürekli hareket</td></tr>
                    <tr><td><code>moveAway(target, speed)</code></td><td>Hedeften uzaklaş</td></tr>
                    <tr><td><code>attractTo(target, force)</code></td><td>Hedefe çekim kuvveti uygula</td></tr>
                    <tr><td><code>applyForce(force)</code></td><td>bearing yönünde kuvvet uygula</td></tr>
                    <tr><td><code>applyForceScaled(force)</code></td><td>Kütle ile ölçekli kuvvet</td></tr>
                    <tr><td><code>rotate(angle)</code></td><td>Belirli açı kadar dön (async)</td></tr>
                    <tr><td><code>rotateTo(angle, speed)</code></td><td>Belirli açıya dön (async)</td></tr>
                    <tr><td><code>rotateTowards(target, tracking)</code></td><td>Hedefe doğru sürekli dön</td></tr>
                    <tr><td><code>angleTo(target)</code></td><td>Hedefe açıyı hesapla</td></tr>
                    <tr><td><code>distanceTo(target)</code></td><td>Hedefe mesafeyi hesapla</td></tr>
                    <tr><td><code>collides(target)</code></td><td>Çarpışma başladı mı?</td></tr>
                    <tr><td><code>colliding(target)</code></td><td>Çarpışma devam ediyor mu?</td></tr>
                    <tr><td><code>collided(target)</code></td><td>Çarpışma bitti mi?</td></tr>
                    <tr><td><code>overlaps(target)</code></td><td>Örtüşme başladı mı?</td></tr>
                    <tr><td><code>overlapping(target)</code></td><td>Örtüşme devam ediyor mu?</td></tr>
                    <tr><td><code>overlapped(target)</code></td><td>Örtüşme bitti mi?</td></tr>
                    <tr><td><code>remove()</code></td><td>Sprite'ı sil</td></tr>
                </tbody>
            </table>
        </div>
    `
};

