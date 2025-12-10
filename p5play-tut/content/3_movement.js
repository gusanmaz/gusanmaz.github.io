const movementContent = {
    id: "movement",
    title: "Hareket",
    icon: "🎮",
    content: `
        <div class="lesson-header">
            <h2>Hareket Sistemi</h2>
            <p class="subtitle">p5.play, sprite hareketleri için güçlü metodlar sunar. Takip, hedefe gitme ve sıralı hareketler kolayca yapılabilir.</p>
        </div>

        <div class="lesson-section">
            <h3>Temel Hareket Metodları</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.moveTo(x, y, speed)</div>
                    <div class="type">async method</div>
                    <div class="description">Hedefe git ve dur. await ile beklenebilir.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.moveTowards(target, tracking)</div>
                    <div class="type">method</div>
                    <div class="description">Hedefe doğru sürekli hareket. Her frame çağrılmalı.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.moveAway(target, tracking)</div>
                    <div class="type">method</div>
                    <div class="description">Hedeften uzaklaş. Kaçma davranışı için.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.move(distance, direction, speed)</div>
                    <div class="type">async method</div>
                    <div class="description">Belirli yönde, belirli mesafe hareket et.</div>
                </div>
            </div>
        </div>

        <div class="lesson-section">
            <h3>moveTowards - Takip Hareketi</h3>
            <p>Mouse veya başka bir hedefi takip etmek için idealdir:</p>
            
            ${createPlayground(`
let follower;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    follower = new Sprite(200, 150, 50);
    follower.color = '#ff6b9d';
    follower.text = '🎯';
    follower.textSize = 24;
}

function draw() {
    background('#1a1a2e');
    
    // Mouse'a doğru hareket
    // tracking: 0.1 = yavaş, 1 = anında
    follower.moveTowards(mouse, 0.08);
    
    // Mouse pozisyonunu göster
    fill(100);
    noStroke();
    ellipse(mouseX, mouseY, 20);
    
    fill(255);
    textSize(12);
    text("Mouse'u takip et!", 15, 25);
    text('tracking: 0.08', 15, 45);
}
            `, 'moveTowards Örneği')}
        </div>

        <div class="lesson-section">
            <h3>moveTo - Hedefe Git ve Dur</h3>
            <p>Tıklanan noktaya gidip duran bir sprite:</p>
            
            ${createPlayground(`
let player;
let targetX = 200, targetY = 150;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 40, 40);
    player.color = '#00d4ff';
    player.text = '🚀';
    player.textSize = 20;
}

function draw() {
    background('#1a1a2e');
    
    // Hedef noktasını göster
    fill(100);
    noStroke();
    ellipse(targetX, targetY, 15);
    
    fill(255);
    textSize(12);
    text('Tıkla: Hedefe git', 15, 25);
}

function mousePressed() {
    targetX = mouseX;
    targetY = mouseY;
    player.moveTo(targetX, targetY, 4);
}
            `, 'moveTo Örneği')}
        </div>

        <div class="lesson-section">
            <h3>Async/Await ile Sıralı Hareket</h3>
            <p>Hareketleri sırayla yapmak için <code>async/await</code> kullanın:</p>
            
            ${createPlayground(`
let patrol;

async function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    patrol = new Sprite(50, 100, 40, 40);
    patrol.color = '#00ff88';
    patrol.text = '🤖';
    patrol.textSize = 20;
    
    // Devriye başlat
    doPatrol();
}

async function doPatrol() {
    while (true) {
        patrol.color = '#00ff88';
        await patrol.moveTo(350, 100, 3);
        
        patrol.color = '#00d4ff';
        await patrol.moveTo(350, 220, 3);
        
        patrol.color = '#c44dff';
        await patrol.moveTo(50, 220, 3);
        
        patrol.color = '#ff6b9d';
        await patrol.moveTo(50, 100, 3);
    }
}

function draw() {
    background('#1a1a2e');
    
    // Rota çerçevesi
    stroke(50);
    strokeWeight(2);
    noFill();
    rect(50, 100, 300, 120);
    noStroke();
    
    fill(255);
    textSize(12);
    text('Otomatik Devriye (async/await)', 15, 25);
}
            `, 'Sıralı Hareket (Patrol)')}
        </div>

        <div class="lesson-section">
            <h3>Hedefe Dönme</h3>
            <p>Sprite'ı mouse veya başka bir hedefe döndürün:</p>
            
            ${createPlayground(`
let arrow;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    arrow = new Sprite(200, 150, 70, 20);
    arrow.color = '#febc2e';
    arrow.text = '➡️';
    arrow.textSize = 30;
}

function draw() {
    background('#1a1a2e');
    
    // Mouse'a doğru dön (yumuşak)
    let angle = atan2(mouseY - arrow.y, mouseX - arrow.x);
    let targetRotation = degrees(angle);
    arrow.rotation = lerp(arrow.rotation, targetRotation, 0.1);
    
    // Mouse çizgisi
    stroke(50);
    line(arrow.x, arrow.y, mouseX, mouseY);
    noStroke();
    
    // Mouse noktası
    fill(100);
    ellipse(mouseX, mouseY, 10);
    
    fill(255);
    textSize(12);
    text("Mouse'a doğru dönüyor", 15, 25);
    text('Açı: ' + Math.round(arrow.rotation) + '°', 15, 45);
}
            `, 'Hedefe Dönme')}
        </div>

        <div class="lesson-section">
            <h3>Pratik: Kaçış Oyunu</h3>
            <p>Bir sprite mouse'u takip ederken, diğeri kaçıyor:</p>
            
            ${createPlayground(`
let hunter, prey;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    hunter = new Sprite(100, 150, 40);
    hunter.color = '#ff5f57';
    hunter.text = '😈';
    hunter.textSize = 24;
    
    prey = new Sprite(300, 150, 35);
    prey.color = '#00ff88';
    prey.text = '😰';
    prey.textSize = 24;
}

function draw() {
    background('#1a1a2e');
    
    // Avcı mouse'u takip
    hunter.moveTowards(mouse, 0.05);
    
    // Av avcıdan kaç
    prey.moveAway(hunter, 0.03);
    
    // Ekran sınırları
    prey.x = constrain(prey.x, 20, 380);
    prey.y = constrain(prey.y, 20, 280);
    
    // Mesafe
    let d = dist(hunter.x, hunter.y, prey.x, prey.y);
    
    fill(255);
    textSize(12);
    text('Mouse ile avcıyı kontrol et!', 15, 25);
    text('Mesafe: ' + d.toFixed(0), 15, 45);
    
    if (d < 40) {
        textSize(24);
        textAlign(CENTER);
        text('YAKALANDI! 💀', 200, 150);
        textAlign(LEFT);
    }
}
            `, 'Kaçış Oyunu')}
        </div>

        <div class="lesson-section">
            <h3>Hız ve Yön Kontrolü</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.vel.x, sprite.vel.y</div>
                    <div class="type">number</div>
                    <div class="description">Anlık hız vektörü.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.speed</div>
                    <div class="type">number</div>
                    <div class="description">Toplam hız büyüklüğü.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.direction</div>
                    <div class="type">number</div>
                    <div class="description">Hareket yönü (derece).</div>
                </div>
            </div>
            
            ${createPlayground(`
let ball;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    ball = new Sprite(200, 150, 40);
    ball.color = '#00d4ff';
    ball.drag = 0.98;
}

function draw() {
    background('#1a1a2e');
    
    // WASD ile hız ver
    if (kb.pressing('w')) ball.vel.y -= 0.5;
    if (kb.pressing('s')) ball.vel.y += 0.5;
    if (kb.pressing('a')) ball.vel.x -= 0.5;
    if (kb.pressing('d')) ball.vel.x += 0.5;
    
    // Sınırlar
    if (ball.x < 20 || ball.x > 380) ball.vel.x *= -0.8;
    if (ball.y < 20 || ball.y > 280) ball.vel.y *= -0.8;
    ball.x = constrain(ball.x, 20, 380);
    ball.y = constrain(ball.y, 20, 280);
    
    // Hız vektörü çiz
    stroke('#ff6b9d');
    strokeWeight(3);
    line(ball.x, ball.y, ball.x + ball.vel.x * 10, ball.y + ball.vel.y * 10);
    noStroke();
    
    fill(255);
    textSize(12);
    text('WASD: Hız ver', 15, 25);
    text('Hız: ' + ball.speed.toFixed(2), 15, 45);
}
            `, 'Hız Kontrolü')}
        </div>

        <div class="info-box tip">
            <div class="info-title">💡 İpucu</div>
            <p><code>moveTowards</code> ve <code>moveAway</code>'deki tracking değeri 0-1 arasındadır. Düşük değer = yavaş/yumuşak, yüksek değer = hızlı/sert hareket.</p>
        </div>
    `
};
