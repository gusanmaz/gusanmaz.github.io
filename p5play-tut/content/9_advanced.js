const advancedContent = {
    id: "advanced",
    title: "İleri Konular",
    icon: "🔬",
    content: `
        <div class="lesson-header">
            <h2>İleri Seviye Konular</h2>
            <p class="subtitle">Joints, özel şekiller ve performans optimizasyonu gibi ileri konuları keşfedin.</p>
        </div>

        <div class="lesson-section">
            <h3>Joints (Eklemler)</h3>
            <p>İki sprite'ı fiziksel olarak birbirine bağlayın. p5.play v3'te joint türleri:</p>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">new GlueJoint(a, b)</div>
                    <div class="type">Joint</div>
                    <div class="description">İki sprite'ı yapıştırır, aralarındaki mesafe sabit kalır.</div>
                </div>
                <div class="property-card">
                    <div class="name">new DistanceJoint(a, b)</div>
                    <div class="type">Joint</div>
                    <div class="description">Esnek mesafe bağlantısı (yay gibi).</div>
                </div>
                <div class="property-card">
                    <div class="name">new WheelJoint(a, b)</div>
                    <div class="type">Joint</div>
                    <div class="description">Tekerlek bağlantısı, bir eksen etrafında döner.</div>
                </div>
                <div class="property-card">
                    <div class="name">new HingeJoint(a, b)</div>
                    <div class="type">Joint</div>
                    <div class="description">Menteşe bağlantısı, bir nokta etrafında döner.</div>
                </div>
            </div>
            
            ${createPlayground(`
let anchor, ball;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 10;
    
    // Sabit nokta (tavana asılı)
    anchor = new Sprite(200, 40, 20, 20, 'static');
    anchor.color = '#636e72';
    
    // Sarkaç topu
    ball = new Sprite(280, 140, 40);
    ball.color = '#ff6b9d';
    ball.bounciness = 0.3;
    
    // DistanceJoint ile bağla (ip gibi)
    let rope = new DistanceJoint(anchor, ball);
    rope.springiness = 0; // Esnek değil, sabit uzunluk
}

function draw() {
    background('#1a1a2e');
    
    // İpi çiz
    stroke('#febc2e');
    strokeWeight(3);
    line(anchor.x, anchor.y, ball.x, ball.y);
    noStroke();
    
    // Tıklayınca kuvvet uygula
    if (mouse.presses()) {
        ball.vel.x += (ball.x - mouseX) * 0.1;
        ball.vel.y += (ball.y - mouseY) * 0.1;
    }
    
    fill(255);
    textSize(12);
    text('Tikla: Sarkaci it', 15, 25);
    text('DistanceJoint kullanimi', 15, 45);
}
            `, 'Basit Sarkaç (DistanceJoint)')}
        </div>

        <div class="lesson-section">
            <h3>Zincir Efekti</h3>
            <p>Birden fazla sprite'ı birbirine bağlayarak zincir oluşturun:</p>
            
            ${createPlayground(`
let chain = [];
let chainLength = 6;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 10;
    
    // İlk halka (sabit - tavana asılı)
    let prev = new Sprite(200, 30, 15, 15, 'static');
    prev.color = '#2d3436';
    chain.push(prev);
    
    // Zincir halkaları
    for (let i = 1; i < chainLength; i++) {
        let link = new Sprite(200, 30 + i * 30, 20);
        link.color = '#febc2e';
        link.mass = 0.3;
        
        // Önceki halkaya DistanceJoint ile bağla
        let j = new DistanceJoint(prev, link);
        j.springiness = 0;
        
        chain.push(link);
        prev = link;
    }
    
    // Son halka büyük ve renkli
    let last = chain[chain.length - 1];
    last.d = 35;
    last.color = '#ff6b9d';
}

function draw() {
    background('#1a1a2e');
    
    // Zincir çizgilerini çiz
    stroke('#febc2e');
    strokeWeight(2);
    for (let i = 0; i < chain.length - 1; i++) {
        line(chain[i].x, chain[i].y, chain[i+1].x, chain[i+1].y);
    }
    noStroke();
    
    // Mouse ile son halkayı çek
    if (mouse.pressing()) {
        let last = chain[chain.length - 1];
        last.vel.x += (mouseX - last.x) * 0.02;
        last.vel.y += (mouseY - last.y) * 0.02;
    }
    
    fill(255);
    textSize(12);
    text('Mouse ile zinciri cek', 15, 25);
}
            `, 'Zincir Efekti')}
        </div>

        <div class="lesson-section">
            <h3>Platform Oyunu Temeli</h3>
            <p>Basit bir platform oyunu yapısı:</p>
            
            ${createPlayground(`
let player;
let platforms;
let onGround = false;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 20;
    
    // Oyuncu
    player = new Sprite(50, 100, 30, 40);
    player.color = '#00d4ff';
    player.rotationLock = true;
    player.friction = 0;
    player.text = '🧍';
    player.textSize = 24;
    
    // Platformlar
    platforms = new Group();
    platforms.collider = 'static';
    platforms.color = '#2d3436';
    
    // Zemin
    new platforms.Sprite(200, 290, 400, 20);
    
    // Platformlar
    new platforms.Sprite(80, 220, 100, 15);
    new platforms.Sprite(220, 170, 100, 15);
    new platforms.Sprite(340, 120, 80, 15);
    new platforms.Sprite(150, 80, 80, 15);
}

function draw() {
    background('#1a1a2e');
    
    // Zemin kontrolü
    onGround = player.colliding(platforms);
    
    // Yatay hareket
    if (kb.pressing('left') || kb.pressing('a')) {
        player.vel.x = -5;
        player.mirror.x = true;
    } else if (kb.pressing('right') || kb.pressing('d')) {
        player.vel.x = 5;
        player.mirror.x = false;
    } else {
        player.vel.x = 0;
    }
    
    // Zıplama
    if ((kb.presses('up') || kb.presses('space')) && onGround) {
        player.vel.y = -12;
    }
    
    // Emoji güncelle
    player.text = onGround ? '🧍' : '🦘';
    
    // Ekrandan düşerse reset
    if (player.y > 350) {
        player.x = 50;
        player.y = 100;
        player.vel.y = 0;
    }
    
    fill(255);
    textSize(11);
    text('← → / A D: Hareket | ↑ / SPACE: Zıpla', 15, 25);
    text('Zeminde: ' + (onGround ? '✅' : '❌'), 15, 45);
}
            `, 'Platform Oyunu')}
        </div>

        <div class="lesson-section">
            <h3>Combo Colliders</h3>
            <p>Tek sprite'a birden fazla şekil ekleyin:</p>
            
            ${createPlayground(`
let spaceship;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    spaceship = new Sprite(200, 150, 60, 25);
    spaceship.color = '#00d4ff';
    
    // Kanatlar
    spaceship.addCollider(-20, -15, 15, 8);
    spaceship.addCollider(20, -15, 15, 8);
    
    spaceship.drag = 0.95;
}

function draw() {
    background('#1a1a2e');
    
    // WASD hareket
    if (kb.pressing('w')) spaceship.vel.y -= 0.3;
    if (kb.pressing('s')) spaceship.vel.y += 0.3;
    if (kb.pressing('a')) spaceship.vel.x -= 0.3;
    if (kb.pressing('d')) spaceship.vel.x += 0.3;
    
    // Sınırlar
    spaceship.x = constrain(spaceship.x, 40, 360);
    spaceship.y = constrain(spaceship.y, 40, 260);
    
    fill(255);
    textSize(12);
    text('WASD: Hareket', 15, 25);
    text('addCollider() ile kanatlar eklendi', 15, 45);
}
            `, 'Combo Collider')}
        </div>

        <div class="lesson-section">
            <h3>Sensör Bölgeleri</h3>
            <p>Görünmez sensörlerle bölge tabanlı olaylar:</p>
            
            ${createPlayground(`
let player;
let dangerZone, safeZone;
let status = 'Dolaşıyorsun';

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 35, 35);
    player.color = '#00d4ff';
    player.text = '🧍';
    player.textSize = 20;
    
    // Tehlike bölgesi (sensör - collider: none)
    dangerZone = new Sprite(100, 150, 100, 100, 'none');
    dangerZone.color = '#4a1a1a';
    dangerZone.stroke = '#ff5f57';
    dangerZone.strokeWeight = 2;
    dangerZone.text = '⚠️';
    dangerZone.textSize = 30;
    
    // Güvenli bölge
    safeZone = new Sprite(300, 150, 100, 100, 'none');
    safeZone.color = '#1a4a2a';
    safeZone.stroke = '#00ff88';
    safeZone.strokeWeight = 2;
    safeZone.text = '🏠';
    safeZone.textSize = 30;
}

function draw() {
    background('#1a1a2e');
    
    // Hareket
    player.moveTowards(mouse, 0.1);
    
    // Sensör kontrolleri (overlapping)
    if (player.overlapping(dangerZone)) {
        status = '⚠️ TEHLİKE!';
        player.color = '#ff5f57';
    } else if (player.overlapping(safeZone)) {
        status = '✅ GÜVENDESİN';
        player.color = '#00ff88';
    } else {
        status = '🚶 Dolaşıyorsun';
        player.color = '#00d4ff';
    }
    
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(status, 200, 30);
    textAlign(LEFT);
    textSize(10);
    text('collider: "none" = sensör (geçilebilir)', 15, 285);
}
            `, 'Sensör Bölgeleri')}
        </div>

        <div class="lesson-section">
            <h3>Performans İpuçları</h3>
            
            <div class="info-box tip">
                <div class="info-title">🚀 Performans Optimizasyonu</div>
                <ul style="margin-left: 20px; margin-top: 12px;">
                    <li><strong>Sprite sayısını sınırlayın:</strong> Ekran dışındaki sprite'ları <code>remove()</code> ile kaldırın.</li>
                    <li><strong>Group varsayılanları:</strong> Her sprite için ayrı özellik yerine grup özelliklerini kullanın.</li>
                    <li><strong>Static collider:</strong> Hareket etmeyen nesneler için <code>'static'</code> kullanın.</li>
                    <li><strong>life özelliği:</strong> Geçici sprite'lar için <code>sprite.life = 60</code> kullanın.</li>
                </ul>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Mini Oyun: Space Shooter</h3>
            
            ${createPlayground(`
let player, enemies, bullets;
let score = 0, health = 100;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 260, 35, 35);
    player.color = '#00d4ff';
    player.text = '🚀';
    player.textSize = 24;
    player.collider = 'kinematic';
    
    enemies = new Group();
    enemies.d = 28;
    enemies.color = '#ff6b9d';
    enemies.text = '👾';
    enemies.textSize = 18;
    
    bullets = new Group();
    bullets.d = 8;
    bullets.color = '#febc2e';
    bullets.life = 50;
}

function draw() {
    background('#1a1a2e');
    
    // Oyuncu mouse takip
    player.x = lerp(player.x, mouseX, 0.15);
    player.x = constrain(player.x, 20, 380);
    
    // Ateş
    if (mouse.presses() || kb.presses('space')) {
        let b = new bullets.Sprite(player.x, player.y - 20);
        b.vel.y = -10;
    }
    
    // Düşman spawn (her 90 frame)
    if (frameCount % 90 === 0 && health > 0) {
        let e = new enemies.Sprite(random(30, 370), -20);
        e.vel.y = 2;
    }
    
    // Düşman hareketi ve kontrol
    for (let e of enemies) {
        if (e.y > 320) {
            e.remove();
            health -= 15;
        }
    }
    
    // Mermi-düşman çarpışma
    bullets.overlaps(enemies, (b, e) => {
        b.remove();
        e.remove();
        score += 10;
    });
    
    // Game Over
    if (health <= 0) {
        enemies.removeAll();
        bullets.removeAll();
        health = 100;
        score = 0;
    }
    
    // UI
    fill(255);
    textSize(14);
    text('⭐ ' + score, 15, 25);
    
    fill(50);
    rect(15, 35, 80, 8, 3);
    fill(health > 30 ? '#00ff88' : '#ff5f57');
    rect(15, 35, health * 0.8, 8, 3);
    
    textSize(10);
    text('Tıkla / SPACE: Ateş', 290, 290);
}
            `, 'Mini Space Shooter')}
        </div>

        <div class="info-box note">
            <div class="info-title">🎉 Tebrikler!</div>
            <p>p5.play eğitimini tamamladınız! Artık kendi oyunlarınızı geliştirmeye hazırsınız. Daha fazla bilgi için <a href="https://p5play.org/learn" target="_blank" style="color: var(--accent);">resmi dokümantasyona</a> göz atın.</p>
        </div>
    `
};
