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
    let s1 = new Sprite(70, 100, 60);
    s1.color = '#ff6b9d';
    s1.text = 'Normal';
    s1.textSize = 10;
    
    // Kenarlı
    let s2 = new Sprite(170, 100, 60);
    s2.color = '#00d4ff';
    s2.stroke = '#fff';
    s2.strokeWeight = 4;
    s2.text = 'Kenar';
    s2.textSize = 10;
    
    // Yarı saydam
    let s3 = new Sprite(270, 100, 60);
    s3.color = '#00ff88';
    s3.opacity = 0.5;
    s3.text = 'Opacity';
    s3.textSize = 10;
    
    // Layer örneği
    let back = new Sprite(150, 220, 80, 80);
    back.color = '#c44dff';
    back.layer = 1;
    back.text = 'Arka';
    
    let front = new Sprite(180, 220, 80, 80);
    front.color = '#febc2e';
    front.layer = 2;
    front.text = 'Ön';
}

function draw() {
    background('#1a1a2e');
}
            `, 'Görsel Özellikler')}
        </div>

        <div class="lesson-section">
            <h3>Emoji Karakterler</h3>
            <p>Resim dosyası olmadan emoji kullanarak karakterler oluşturun:</p>
            
            ${createPlayground(`
let player;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 64, 64);
    player.color = 'transparent';
    player.stroke = false;
    player.text = '🧙‍♂️';
    player.textSize = 48;
}

function draw() {
    background('#1a1a2e');
    
    player.moveTowards(mouse, 0.05);
    
    // Yön değiştir
    if (mouseX < player.x) {
        player.mirror.x = true;
    } else {
        player.mirror.x = false;
    }
    
    fill(255);
    textSize(12);
    text('Mouse ile hareket et', 15, 25);
    text('Emoji karakter kullanımı', 15, 45);
}
            `, 'Emoji Karakter')}
        </div>

        <div class="lesson-section">
            <h3>Özel Draw Fonksiyonu</h3>
            <p>Sprite'ın çizimini tamamen özelleştirmek için <code>sprite.draw</code> fonksiyonunu override edin:</p>
            
            ${createPlayground(`
let robot;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    robot = new Sprite(200, 150, 80, 100);
    robot.color = 'transparent';
    robot.stroke = false;
    
    // Özel çizim fonksiyonu
    robot.draw = function() {
        push();
        
        // Gövde
        fill('#2d3436');
        rectMode(CENTER);
        rect(0, 10, 60, 70, 10);
        
        // Kafa
        fill('#636e72');
        rect(0, -40, 50, 40, 8);
        
        // Gözler
        fill('#00d4ff');
        ellipse(-12, -42, 15, 15);
        ellipse(12, -42, 15, 15);
        
        // Göz bebekleri
        fill('#1a1a2e');
        let ex = constrain((mouseX - this.x) / 30, -3, 3);
        let ey = constrain((mouseY - this.y) / 30, -3, 3);
        ellipse(-12 + ex, -42 + ey, 6, 6);
        ellipse(12 + ex, -42 + ey, 6, 6);
        
        // Anten
        stroke('#febc2e');
        strokeWeight(3);
        line(0, -60, 0, -75);
        noStroke();
        fill('#febc2e');
        ellipse(0, -78, 10);
        
        // Ağız
        fill('#ff6b9d');
        let mw = 30 + sin(frameCount * 0.1) * 10;
        rect(0, -25, mw, 8, 4);
        
        pop();
    };
}

function draw() {
    background('#1a1a2e');
    
    robot.moveTowards(mouse, 0.03);
    
    fill(255);
    textSize(12);
    text('Özel draw() fonksiyonu', 15, 25);
    text('Gözler mouse takip ediyor', 15, 45);
}
            `, 'Custom Draw Örneği')}
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
    
    character = new Sprite(200, 150, 60, 60);
    character.color = 'transparent';
    character.stroke = false;
    character.textSize = 40;
    character.text = '🧍';
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
    
    // Animasyon
    if (moving && frameCount % 10 === 0) {
        frameIdx = (frameIdx + 1) % frames.length;
    }
    
    character.text = moving ? frames[frameIdx] : '🧍';
    
    fill(255);
    textSize(12);
    text('← → veya A D: Hareket', 15, 25);
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
            <p>Sprite'ı yatay veya dikey aynalayın:</p>
            
            ${createPlayground(`
let original, mirrored;

function setup() {
    new Canvas(400, 300);
    
    original = new Sprite(130, 150, 60, 80);
    original.color = '#00d4ff';
    original.text = '👉';
    original.textSize = 30;
    
    mirrored = new Sprite(270, 150, 60, 80);
    mirrored.color = '#ff6b9d';
    mirrored.text = '👉';
    mirrored.textSize = 30;
    mirrored.mirror.x = true;
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text('Normal', 130, 220);
    text('mirror.x = true', 270, 220);
    textAlign(LEFT);
}
            `, 'Mirror Örneği')}
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
