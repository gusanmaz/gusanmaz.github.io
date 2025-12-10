const spritesContent = {
    id: "sprites",
    title: "Sprite Temelleri",
    icon: "🎯",
    content: `
        <div class="lesson-header">
            <h2>Sprite Temelleri</h2>
            <p class="subtitle">Sprite'lar p5.play'in temel yapı taşlarıdır. Şekil, boyut, renk ve fiziksel özelliklere sahip oyun nesneleridir.</p>
        </div>

        <div class="lesson-section">
            <h3>Sprite Constructor</h3>
            <p>Sprite oluşturucu çok esnektir. Farklı parametre kombinasyonlarıyla farklı şekiller oluşturabilirsiniz:</p>
            
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
}

function draw() {
    background('#1a1a2e');
}
            `, 'Temel Sprite Şekilleri')}
        </div>

        <div class="lesson-section">
            <h3>Özel Şekiller</h3>
            <p>Poligon, üçgen ve diğer özel şekiller:</p>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    
    // Üçgen
    let tri = new Sprite(80, 100, 50, 50, 'triangle');
    tri.color = '#c44dff';
    tri.text = '▲';
    
    // Düzensiz Poligon (nokta dizisi)
    let poly = new Sprite(200, 100, [
        [-30, -30], [30, -20], 
        [40, 20], [0, 40], [-40, 20]
    ]);
    poly.color = '#febc2e';
    
    // Düzenli Çokgen: x, y, çap, 'regular', kenarSayısı
    let hex = new Sprite(320, 100, 50, 'regular', 6);
    hex.color = '#00ff88';
    
    // Daha fazla kenar = daha yuvarlak
    let oct = new Sprite(120, 220, 50, 'regular', 8);
    oct.color = '#00d4ff';
    
    let penta = new Sprite(280, 220, 50, 'regular', 5);
    penta.color = '#ff6b9d';
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
            <h3>Sprite Görünürlük</h3>
            
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
function setup() {
    new Canvas(400, 300);
    
    // Arkadaki (düşük layer)
    let back = new Sprite(180, 150, 80, 80);
    back.color = '#ff6b9d';
    back.layer = 1;
    back.text = 'Arka';
    
    // Öndeki (yüksek layer)
    let front = new Sprite(220, 150, 80, 80);
    front.color = '#00d4ff';
    front.layer = 2;
    front.text = 'Ön';
    
    // Yarı saydam
    let ghost = new Sprite(320, 150, 60, 60);
    ghost.color = '#00ff88';
    ghost.opacity = 0.5;
    ghost.text = '👻';
    ghost.textSize = 30;
}

function draw() {
    background('#1a1a2e');
}
            `, 'Görünürlük ve Layer')}
        </div>

        <div class="lesson-section">
            <h3>Sprite Mirror (Aynalama)</h3>
            <p>Sprite'ı yatay veya dikey olarak aynalayın:</p>
            
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
}
            `, 'Mirror Örneği')}
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
