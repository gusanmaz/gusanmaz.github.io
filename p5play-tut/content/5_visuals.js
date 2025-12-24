const visualsContent = {
    id: "visuals",
    title: "Görseller",
    icon: "🎨",
    content: `
        <div class="lesson-header">
            <h2>Görsel Özelleştirme</h2>
            <p class="subtitle">Sprite'lara resim, animasyon ekleyebilir veya özel çizim fonksiyonları yazabilirsiniz.</p>
        </div>

        <div class="lesson-section">
            <h3>Temel Görsel Özellikler</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.color</div>
                    <div class="type">string | p5.Color</div>
                    <div class="description">Dolgu rengi. CSS renkleri, hex, rgb() desteklenir.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.stroke</div>
                    <div class="type">string | false</div>
                    <div class="description">Kenar rengi. <code>false</code> ile kapatılır.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.strokeWeight</div>
                    <div class="type">number</div>
                    <div class="description">Kenar kalınlığı (piksel).</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.opacity</div>
                    <div class="type">number (0-1)</div>
                    <div class="description">Saydamlık. 0 = görünmez, 1 = opak.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.visible</div>
                    <div class="type">boolean</div>
                    <div class="description">false yapılırsa sprite görünmez ama fizik çalışır.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.layer</div>
                    <div class="type">number</div>
                    <div class="description">Çizim sırası. Yüksek = önde çizilir.</div>
                </div>
            </div>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    
    // Normal sprite
    let s1 = new Sprite(70, 70, 60);
    s1.color = '#ff6b9d';
    s1.text = 'Normal';
    s1.textSize = 10;
    s1.collider = 'static';
    
    // Kenarlı
    let s2 = new Sprite(170, 70, 60);
    s2.color = '#00d4ff';
    s2.stroke = '#fff';
    s2.strokeWeight = 4;
    s2.text = 'Kenar';
    s2.textSize = 10;
    s2.collider = 'static';
    
    // Yarı saydam
    let s3 = new Sprite(270, 70, 60);
    s3.color = '#00ff88';
    s3.opacity = 0.5;
    s3.text = 'Opacity';
    s3.textSize = 10;
    s3.collider = 'static';
}

function draw() {
    background('#1a1a2e');
}
            `, 'Görsel Özellikler')}
        </div>
        
        <div class="lesson-section">
            <h3>Görünürlük ve Layer</h3>
            <p><strong>Layer (Katman)</strong> sprite'ların çizim sırasını belirler. Yüksek layer değerine sahip sprite'lar önde (üstte) çizilir. Bu özellik, özellikle üst üste binen sprite'larda hangisinin görüneceğini kontrol etmek için kullanılır.</p>
            
            ${createPlayground(`
let kirmizi, mavi, yesil;

function setup() {
    new Canvas(400, 300);
    
    // Üç kart - aynı merkezde üst üste
    // Fizik yok, sadece görsel çakışma
    
    // Kırmızı kart - layer 0 (en altta)
    kirmizi = new Sprite(150, 150, 100, 140);
    kirmizi.color = '#ff5f57';
    kirmizi.layer = 0;
    kirmizi.text = 'Kırmızı\\nLayer: 0';
    kirmizi.textSize = 14;
    kirmizi.collider = 'none';
    
    // Mavi kart - layer 1 (ortada)
    mavi = new Sprite(200, 150, 100, 140);
    mavi.color = '#007aff';
    mavi.layer = 1;
    mavi.text = 'Mavi\\nLayer: 1';
    mavi.textSize = 14;
    mavi.collider = 'none';
    
    // Yeşil kart - layer 2 (en üstte)
    yesil = new Sprite(250, 150, 100, 140);
    yesil.color = '#28cd41';
    yesil.layer = 2;
    yesil.text = 'Yeşil\\nLayer: 2';
    yesil.textSize = 14;
    yesil.collider = 'none';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(12);
    textAlign(LEFT);
    text('1, 2, 3 tuşları ile layer değiştir', 10, 20);
    text('Kırmızı L:' + kirmizi.layer + ' | Mavi L:' + mavi.layer + ' | Yeşil L:' + yesil.layer, 10, 40);
    
    // Klavye ile layer değiştir
    if (kb.presses('1')) {
        // Kırmızıyı öne getir
        kirmizi.layer = 10;
        mavi.layer = 1;
        yesil.layer = 2;
        kirmizi.text = 'Kırmızı\\nLayer: 10';
        mavi.text = 'Mavi\\nLayer: 1';
        yesil.text = 'Yeşil\\nLayer: 2';
    }
    if (kb.presses('2')) {
        // Maviyi öne getir
        kirmizi.layer = 0;
        mavi.layer = 10;
        yesil.layer = 2;
        kirmizi.text = 'Kırmızı\\nLayer: 0';
        mavi.text = 'Mavi\\nLayer: 10';
        yesil.text = 'Yeşil\\nLayer: 2';
    }
    if (kb.presses('3')) {
        // Yeşili öne getir
        kirmizi.layer = 0;
        mavi.layer = 1;
        yesil.layer = 10;
        kirmizi.text = 'Kırmızı\\nLayer: 0';
        mavi.text = 'Mavi\\nLayer: 1';
        yesil.text = 'Yeşil\\nLayer: 10';
    }
}
            `, 'Layer (Katman) Örneği')}
            
            <div class="info-box tip">
                <strong>💡 Layer İpuçları:</strong>
                <ul>
                    <li><code>layer</code> değeri yüksek olan sprite <strong>önde</strong> (üstte) çizilir</li>
                    <li>Aynı layer'daki sprite'lar oluşturulma sırasına göre çizilir</li>
                    <li>Negatif layer değerleri de kullanılabilir</li>
                    <li>Layer sadece çizim sırasını etkiler, fizik veya çarpışma ile ilgisi yoktur</li>
                </ul>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Emoji Karakterler</h3>
            <p>Resim dosyası olmadan emoji kullanarak karakterler oluşturun:</p>
            
            ${createPlayground(`
let player;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Emoji sprite - Direkt emoji string ile oluştur
    player = new Sprite(200, 150, 50);
    player.text = '🧙';
    player.textSize = 40;
}

function draw() {
    background('#1a1a2e');
    
    player.moveTowards(mouse, 0.05);
    
    // Yön değiştir (solda ise aynala)
    if (mouseX < player.x) {
        player.mirror.x = true;
    } else {
        player.mirror.x = false;
    }
    
    fill(255);
    textSize(12);
    text('Mouse ile hareket et', 15, 25);
    text('Emoji: ' + player.text, 15, 45);
}
            `, 'Emoji Karakter')}
        </div>

        <div class="lesson-section">
            <h3>Özel Draw Fonksiyonu</h3>
            <p>Sprite'ın çizimini tamamen özelleştirmek için <code>sprite.draw</code> fonksiyonunu override edin. Custom draw fonksiyonu içinde (0, 0) sprite'ın merkez noktasıdır.</p>
            
            ${createPlayground(`
let robot;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    robot = new Sprite(200, 150, 80, 100);
    robot.collider = 'kinematic';
    
    // Özel çizim fonksiyonu
    robot.draw = function() {
        // Gövde
        fill('#2d3436');
        noStroke();
        rect(-30, -25, 60, 70, 10);
        
        // Kafa
        fill('#636e72');
        rect(-25, -55, 50, 40, 8);
        
        // Gözler
        fill('#00d4ff');
        ellipse(-12, -40, 12, 12);
        ellipse(12, -40, 12, 12);
        
        // Göz bebekleri
        fill('#1a1a2e');
        ellipse(-12, -40, 5, 5);
        ellipse(12, -40, 5, 5);
        
        // Anten
        stroke('#febc2e');
        strokeWeight(3);
        line(0, -55, 0, -70);
        noStroke();
        fill('#febc2e');
        ellipse(0, -73, 8);
        
        // Ağız (animasyonlu)
        fill('#ff6b9d');
        let mouthWidth = 25 + sin(frameCount * 0.1) * 8;
        rect(-mouthWidth/2, -25, mouthWidth, 6, 3);
    };
}

function draw() {
    background('#1a1a2e');
    
    robot.moveTowards(mouse, 0.03);
    
    fill(255);
    noStroke();
    textSize(12);
    text('Ozel draw() fonksiyonu ile robot', 15, 25);
    text('Mouse ile hareket ettir', 15, 45);
}
            `, 'Custom Draw Örneği')}
            
            <div class="info-box tip">
                <strong>💡 İpucu:</strong> Custom draw fonksiyonu içinde:
                <ul>
                    <li><code>(0, 0)</code> sprite'ın merkez noktasıdır</li>
                    <li>Sprite otomatik olarak doğru pozisyona translate edilir</li>
                    <li>Varsayılan çizimi de çağırmak için <code>this._draw()</code> kullanabilirsiniz</li>
                </ul>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Animasyon Simülasyonu</h3>
            <p>Emoji değiştirerek basit animasyon:</p>
            
            ${createPlayground(`
let character;
let frames = ['🚶', '🏃'];
let frameIdx = 0;
let moving = false;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    character = new Sprite(200, 150, 50);
    character.text = '🧍';
    character.textSize = 40;
}

function draw() {
    background('#1a1a2e');
    
    moving = false;
    
    if (kb.pressing('left') || kb.pressing('a')) {
        character.x -= 3;
        character.mirror.x = true;
        moving = true;
    }
    if (kb.pressing('right') || kb.pressing('d')) {
        character.x += 3;
        character.mirror.x = false;
        moving = true;
    }
    
    // Animasyon (her 10 karede bir değiştir)
    if (moving && frameCount % 10 === 0) {
        frameIdx = (frameIdx + 1) % frames.length;
    }
    
    character.text = moving ? frames[frameIdx] : '🧍';
    
    fill(255);
    textSize(12);
    text('Sol/Sag Ok veya A/D: Hareket', 15, 25);
}
            `, 'Animasyon Simülasyonu')}
            
            <div class="info-box note">
                <div class="info-title">📝 Gerçek Animasyon</div>
                <p>Gerçek projelerde sprite sheet kullanmak için:</p>
                <pre style="background: var(--bg-elevated); padding: 16px; border-radius: 8px; margin-top: 12px; overflow-x: auto;">
<code>function preload() {
    walkAni = loadAni('walk0.png', 4);
}

function setup() {
    player = new Sprite(200, 200);
    player.addAni('walk', walkAni);
}</code></pre>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Mirror (Aynalama)</h3>
            <p>Sprite'in gorselini yatay veya dikey olarak aynalamak icin <code>mirror.x</code> ve <code>mirror.y</code> ozelliklerini kullanin:</p>
            
            ${createPlayground(`
let left, right;

function setup() {
    new Canvas(400, 300);
    
    // Pixel art ok gorseli olustur
    let arrowArt = spriteArt(\`
.....yyy
.....yyy
yyyyyyy.
yyyyyyyy
yyyyyyyy
yyyyyyy.
.....yyy
.....yyy
\`, 6);
    
    // Sol sprite - normal
    left = new Sprite(120, 150);
    left.image = arrowArt;
    left.collider = 'static';
    
    // Sag sprite - yatay aynali
    right = new Sprite(280, 150);
    right.image = arrowArt;
    right.mirror.x = true;
    right.collider = 'static';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    noStroke();
    textSize(12);
    text('Normal', 95, 220);
    text('mirror.x = true', 245, 220);
    
    stroke(100);
    strokeWeight(1);
    line(200, 70, 200, 230);
}
            `, 'Mirror Ornegi')}
            
            <div class="info-box tip">
                <strong>Not:</strong> <code>mirror</code> ozelligi sprite'a atanan <strong>image</strong> veya <strong>animation</strong> icin calisir. Karakter sprite'larinin yon degistirmesi icin idealdir.
            </div>
        </div>

        <div class="lesson-section">
            <h3>Debug Modu</h3>
            <p>Collider sınırlarını görmek için debug modunu kullanın:</p>
            
            ${createPlayground(`
let player;
let obstacle;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(100, 150, 50, 70);
    player.color = '#00d4ff';
    player.debug = true; // Collider göster
    
    obstacle = new Sprite(280, 150, 80, 80, 'static');
    obstacle.color = '#ff6b9d';
    obstacle.debug = true;
}

function draw() {
    background('#1a1a2e');
    
    player.moveTowards(mouse, 0.1);
    
    fill(255);
    textSize(12);
    text('sprite.debug = true', 15, 25);
    text('Collider sınırları görünür', 15, 45);
}
            `, 'Debug Modu')}
        </div>

        <div class="info-box tip">
            <div class="info-title">💡 İpucu</div>
            <p>Geliştirme sırasında <code>allSprites.debug = true</code> yaparak tüm sprite'ların collider'larını görebilirsiniz.</p>
        </div>
    `
};
