const cameraContent = {
    id: "camera",
    title: "Kamera",
    icon: "📷",
    content: `
        <div class="lesson-header">
            <h2>Kamera Sistemi</h2>
            <p class="subtitle">p5.play'in kamera sistemi ile büyük oyun dünyaları oluşturabilir, oyuncuyu takip edebilir ve sinematik efektler ekleyebilirsiniz.</p>
        </div>

        <div class="lesson-section">
            <h3>Kamera Neden Gerekli?</h3>
            <p>Oyun dünyası genellikle ekrandan çok daha büyüktür. Kamera, bu geniş dünyanın sadece bir bölümünü göstermenizi sağlar:</p>
            <ul>
                <li><strong>Platform Oyunları:</strong> Mario gibi yatay kaydırmalı oyunlarda</li>
                <li><strong>RPG Oyunları:</strong> Geniş haritalarda gezinti</li>
                <li><strong>Takip Efektleri:</strong> Oyuncu karakterini merkeze almak</li>
                <li><strong>Sinematik Anlar:</strong> Zoom, shake, pan efektleri</li>
            </ul>
        </div>

        <div class="lesson-section">
            <h3>Temel Kamera Özellikleri</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">camera.x, camera.y</div>
                    <div class="type">number</div>
                    <div class="description">Kameranın baktığı nokta. Bu koordinat ekranın merkezinde görünür.</div>
                </div>
                <div class="property-card">
                    <div class="name">camera.zoom</div>
                    <div class="type">number</div>
                    <div class="description">Yakınlaştırma oranı. 1=normal, 2=2x büyük, 0.5=yarı boyut.</div>
                </div>
                <div class="property-card">
                    <div class="name">camera.off()</div>
                    <div class="type">method</div>
                    <div class="description">Kamera transformunu geçici olarak kapat. UI çizimi için kullanılır.</div>
                </div>
                <div class="property-card">
                    <div class="name">camera.on()</div>
                    <div class="type">method</div>
                    <div class="description">Kamera transformunu tekrar aç.</div>
                </div>
            </div>
            
            <div class="info-box note">
                <div class="info-title">🌍 Dünya vs Ekran Koordinatları - ÖNEMLİ!</div>
                <p>Bu kavram kamera sisteminin temelidir:</p>
                <ul>
                    <li><strong>Dünya (World) Koordinatları:</strong> Sprite'ların gerçek konumu. <code>sprite.x = 1000</code> demek sprite dünyada x=1000 noktasında.</li>
                    <li><strong>Ekran (Screen) Koordinatları:</strong> Canvas üzerinde gördüğümüz piksel konumu. Kamera hareket ettikçe değişir.</li>
                </ul>
                <p>Örnek: Oyuncu dünyada x=500'de. Kamera x=500'e ayarlanırsa, oyuncu ekranın <em>tam ortasında</em> görünür. Kamera x=400 olursa, oyuncu ekranda sağa kayar.</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Basit Kamera Takibi</h3>
            <p>Kamerayı bir sprite'a kilitlemek çok kolaydır:</p>
            
            ${createPlayground(`
let player;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Oyuncu
    player = new Sprite(200, 200, 40, 40);
    player.color = '#00d4ff';
    player.text = '🏃';
    player.textSize = 24;
    
    // Dünya sınırları
    let colors = ['#ff6b9d', '#00ff88', '#febc2e', '#c44dff'];
    for (let i = 0; i < 4; i++) {
        let wall;
        if (i === 0) wall = new Sprite(0, 400, 20, 800, 'static');
        if (i === 1) wall = new Sprite(800, 400, 20, 800, 'static');
        if (i === 2) wall = new Sprite(400, 0, 800, 20, 'static');
        if (i === 3) wall = new Sprite(400, 800, 800, 20, 'static');
        wall.color = colors[i];
    }
    
    // Rastgele objeler
    for (let i = 0; i < 20; i++) {
        let s = new Sprite(
            random(50, 750),
            random(50, 750),
            random(30, 60)
        );
        s.color = '#3d5a80';
        s.collider = 'static';
    }
}

function draw() {
    background('#1a1a2e');
    
    // Oyuncu hareketi
    if (kb.pressing('w')) player.vel.y = -4;
    else if (kb.pressing('s')) player.vel.y = 4;
    else player.vel.y = 0;
    
    if (kb.pressing('a')) player.vel.x = -4;
    else if (kb.pressing('d')) player.vel.x = 4;
    else player.vel.x = 0;
    
    // Kamera oyuncuyu takip
    camera.x = player.x;
    camera.y = player.y;
    
    // UI
    camera.off();
    fill(255);
    textSize(12);
    text('WASD: Hareket', 15, 25);
    text('Pos: ' + round(player.x) + ', ' + round(player.y), 15, 45);
    camera.on();
}
            `, 'Kamera Takibi')}
        </div>

        <div class="lesson-section">
            <h3>Yumuşak Kamera Takibi</h3>
            <p>Daha sinematik bir his için lerp kullanın:</p>
            
            ${createPlayground(`
let player;
let smoothness = 0.05;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(400, 400, 35, 35);
    player.color = '#00d4ff';
    player.text = '🎯';
    player.textSize = 20;
    
    // Rastgele objeler
    for (let i = 0; i < 30; i++) {
        let s = new Sprite(
            random(0, 800),
            random(0, 800),
            random(20, 60)
        );
        s.color = '#3d5a80';
        s.collider = 'static';
    }
}

function draw() {
    background('#1a1a2e');
    
    // Hareket
    player.moveTowards(mouse, 0.1);
    
    // Yumuşak kamera
    camera.x = lerp(camera.x, player.x, smoothness);
    camera.y = lerp(camera.y, player.y, smoothness);
    
    // Smoothness ayarla
    if (kb.pressing('up')) smoothness = min(0.2, smoothness + 0.005);
    if (kb.pressing('down')) smoothness = max(0.01, smoothness - 0.005);
    
    // UI
    camera.off();
    fill(255);
    textSize(12);
    text('Mouse: Hareket', 15, 25);
    text('↑↓: Yumuşaklık: ' + smoothness.toFixed(3), 15, 45);
    camera.on();
}
            `, 'Yumuşak Takip (Lerp)')}
        </div>

        <div class="lesson-section">
            <h3>Zoom Kontrolü</h3>
            
            ${createPlayground(`
let target;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    target = new Sprite(200, 150, 50);
    target.color = '#ff6b9d';
    target.text = '🎯';
    target.textSize = 30;
    
    // Çevre objeleri
    for (let angle = 0; angle < 360; angle += 30) {
        let r = 150;
        let x = 200 + cos(radians(angle)) * r;
        let y = 150 + sin(radians(angle)) * r;
        let s = new Sprite(x, y, 30);
        s.color = '#00d4ff';
        s.collider = 'static';
    }
}

function draw() {
    background('#1a1a2e');
    
    // Kamera hedefi takip
    camera.x = target.x;
    camera.y = target.y;
    
    // Zoom kontrol
    if (kb.pressing('q')) {
        camera.zoom = min(3, camera.zoom + 0.02);
    }
    if (kb.pressing('e')) {
        camera.zoom = max(0.3, camera.zoom - 0.02);
    }
    
    // Hedef hareket
    target.moveTowards(mouse, 0.05);
    
    // UI
    camera.off();
    fill(255);
    textSize(12);
    text('Q/E: Zoom In/Out', 15, 25);
    text('Zoom: ' + camera.zoom.toFixed(2) + 'x', 15, 45);
    camera.on();
}
            `, 'Zoom Kontrolü')}
        </div>

        <div class="lesson-section">
            <h3>Kamera Shake Efekti</h3>
            <p>Patlama, hasar gibi anlarda kamera sallama efekti:</p>
            
            ${createPlayground(`
let player;
let enemies;
let health = 100;
let shakeAmount = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 40, 40);
    player.color = '#00d4ff';
    player.text = '💪';
    player.textSize = 24;
    
    enemies = new Group();
    enemies.d = 30;
    enemies.color = '#ff6b9d';
    enemies.text = '💀';
    enemies.textSize = 18;
    
    for (let i = 0; i < 5; i++) {
        new enemies.Sprite(random(50, 350), random(50, 250));
    }
}

function draw() {
    background('#1a1a2e');
    
    // Manuel shake efekti
    if (shakeAmount > 0) {
        camera.x = 200 + random(-shakeAmount, shakeAmount);
        camera.y = 150 + random(-shakeAmount, shakeAmount);
        shakeAmount *= 0.9;
    } else {
        camera.x = 200;
        camera.y = 150;
    }
    
    // Oyuncu hareketi
    player.moveTowards(mouse, 0.1);
    
    // Düşman takibi
    for (let e of enemies) {
        e.moveTowards(player, 0.01);
    }
    
    // Çarpışma
    if (player.collides(enemies)) {
        health -= 10;
        shakeAmount = 15; // Shake başlat
        player.color = '#ff5f57';
    } else {
        player.color = '#00d4ff';
    }
    
    // Reset
    if (health <= 0) {
        health = 100;
        player.x = 200;
        player.y = 150;
        shakeAmount = 30;
    }
    
    // UI
    camera.off();
    fill(255);
    textSize(12);
    text('Mouse: Hareket', 15, 25);
    
    fill(50);
    rect(15, 40, 100, 15, 3);
    fill(health > 30 ? '#00ff88' : '#ff5f57');
    rect(15, 40, health, 15, 3);
    
    fill(255);
    text('Düşmanlara çarp = Shake', 15, 75);
    camera.on();
}
            `, 'Camera Shake')}
        </div>

        <div class="lesson-section">
            <h3>UI Layer (Kamera Bağımsız)</h3>
            <p><code>camera.off()</code> ve <code>camera.on()</code> ile ekran koordinatlarında çizim yapın:</p>
            
            ${createPlayground(`
let player;
let score = 0;
let stars;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(400, 400, 40, 40);
    player.color = '#00d4ff';
    player.text = '🚀';
    player.textSize = 24;
    
    stars = new Group();
    stars.d = 30;
    stars.color = '#febc2e';
    stars.text = '⭐';
    stars.textSize = 20;
    stars.collider = 'static';
    
    for (let i = 0; i < 15; i++) {
        new stars.Sprite(random(50, 750), random(50, 750));
    }
}

function draw() {
    background('#1a1a2e');
    
    // Hareket
    if (kb.pressing('w')) player.y -= 5;
    if (kb.pressing('s')) player.y += 5;
    if (kb.pressing('a')) player.x -= 5;
    if (kb.pressing('d')) player.x += 5;
    
    // Kamera takibi
    camera.x = lerp(camera.x, player.x, 0.1);
    camera.y = lerp(camera.y, player.y, 0.1);
    
    // Yıldız toplama
    player.overlaps(stars, (p, s) => {
        s.x = random(50, 750);
        s.y = random(50, 750);
        score += 10;
    });
    
    // === UI LAYER ===
    camera.off();
    
    fill(0, 150);
    noStroke();
    rect(10, 10, 120, 50, 8);
    
    fill('#febc2e');
    textSize(20);
    text('⭐ ' + score, 25, 40);
    
    fill(200);
    textSize(10);
    text('WASD: Hareket', 25, 55);
    
    camera.on();
}
            `, 'UI Layer Örneği')}
        </div>

        <div class="info-box tip">
            <div class="info-title">💡 İpucu</div>
            <p>UI elementlerini çizmeden önce <code>camera.off()</code>, çizdikten sonra <code>camera.on()</code> çağırın. Böylece UI her zaman ekranda sabit kalır.</p>
        </div>
    `
};
