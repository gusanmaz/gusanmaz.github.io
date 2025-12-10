const inputContent = {
    id: "input",
    title: "Girdi Sistemi",
    icon: "🎹",
    content: `
        <div class="lesson-header">
            <h2>Girdi Sistemi</h2>
            <p class="subtitle">p5.play, klavye ve mouse girdileri için kullanımı kolay bir API sunar. Tuş kombinasyonları ve sürekli basılı tutma durumları kolayca kontrol edilir.</p>
        </div>

        <div class="lesson-section">
            <h3>Klavye Girdisi (kb)</h3>
            <p><code>kb</code> (keyboard) objesi ile klavye kontrolü yapılır:</p>
            
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Metod</th>
                        <th>Açıklama</th>
                        <th>Kullanım</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>kb.pressing(key)</code></td>
                        <td>Tuş basılı tutuluyorsa true</td>
                        <td>Sürekli hareket</td>
                    </tr>
                    <tr>
                        <td><code>kb.presses(key)</code></td>
                        <td>Tuşa ilk basıldığında true (1 kez)</td>
                        <td>Zıplama, ateş etme</td>
                    </tr>
                    <tr>
                        <td><code>kb.released(key)</code></td>
                        <td>Tuş bırakıldığında true (1 kez)</td>
                        <td>Tuş bırakma olayı</td>
                    </tr>
                    <tr>
                        <td><code>kb.holding(key)</code></td>
                        <td>Tuş belirli süre basılıysa true</td>
                        <td>Şarjlı ateş</td>
                    </tr>
                </tbody>
            </table>
            
            ${createPlayground(`
let player;
let jumpCount = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 50, 50);
    player.color = '#00d4ff';
    player.text = '🎮';
    player.textSize = 30;
}

function draw() {
    background('#1a1a2e');
    
    // pressing: Sürekli hareket
    if (kb.pressing('left') || kb.pressing('a')) {
        player.x -= 4;
    }
    if (kb.pressing('right') || kb.pressing('d')) {
        player.x += 4;
    }
    if (kb.pressing('up') || kb.pressing('w')) {
        player.y -= 4;
    }
    if (kb.pressing('down') || kb.pressing('s')) {
        player.y += 4;
    }
    
    // presses: Tek seferlik (zıplama gibi)
    if (kb.presses('space')) {
        jumpCount++;
    }
    
    // Sınırlar
    player.x = constrain(player.x, 25, 375);
    player.y = constrain(player.y, 25, 275);
    
    // Bilgi
    fill(255);
    textSize(12);
    text('WASD veya Ok tuşları: Hareket', 15, 25);
    text('SPACE: Zıpla (presses)', 15, 45);
    text('Zıplama sayısı: ' + jumpCount, 15, 65);
}
            `, 'Klavye Kontrolleri')}
        </div>

        <div class="lesson-section">
            <h3>Özel Tuş İsimleri</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">Ok Tuşları</div>
                    <div class="type">string</div>
                    <div class="description">'left', 'right', 'up', 'down'</div>
                </div>
                <div class="property-card">
                    <div class="name">Özel Tuşlar</div>
                    <div class="type">string</div>
                    <div class="description">'space', 'enter', 'shift', 'control', 'alt', 'escape'</div>
                </div>
                <div class="property-card">
                    <div class="name">Harfler</div>
                    <div class="type">string</div>
                    <div class="description">'a', 'b', 'c'... (küçük harf)</div>
                </div>
                <div class="property-card">
                    <div class="name">Sayılar</div>
                    <div class="type">string</div>
                    <div class="description">'0', '1', '2'...</div>
                </div>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Mouse Girdisi</h3>
            <p><code>mouse</code> objesi pozisyon ve tıklama bilgisi verir:</p>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">mouse.x, mouse.y</div>
                    <div class="type">number</div>
                    <div class="description">Mouse pozisyonu (canvas koordinatları).</div>
                </div>
                <div class="property-card">
                    <div class="name">mouse.pressing()</div>
                    <div class="type">method</div>
                    <div class="description">Mouse tuşu basılı mı?</div>
                </div>
                <div class="property-card">
                    <div class="name">mouse.presses()</div>
                    <div class="type">method</div>
                    <div class="description">Mouse tuşuna yeni mi basıldı?</div>
                </div>
            </div>
            
            ${createPlayground(`
let particles;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 3;
    
    particles = new Group();
    particles.d = 15;
    particles.bounciness = 0.6;
    particles.life = 120;
    
    // Zemin
    let floor = new Sprite(200, 295, 400, 10, 'static');
    floor.color = '#2d3436';
}

function draw() {
    background('#1a1a2e');
    
    // Tıklayınca parçacık
    if (mouse.pressing()) {
        let p = new particles.Sprite(mouse.x, mouse.y);
        // Rastgele renk - hex formatında
        let r = floor(random(100, 255)).toString(16).padStart(2, '0');
        let g = floor(random(100, 255)).toString(16).padStart(2, '0');
        let b = floor(random(100, 255)).toString(16).padStart(2, '0');
        p.color = '#' + r + g + b;
        p.vel.y = random(-5, -2);
        p.vel.x = random(-2, 2);
    }
    
    // Mouse işareti
    noFill();
    stroke(100);
    ellipse(mouse.x, mouse.y, 20);
    noStroke();
    
    fill(255);
    textSize(12);
    text('Tıkla: Parçacık oluştur', 15, 25);
    text('Parçacık: ' + particles.length, 15, 45);
}
            `, 'Mouse Kontrolleri')}
        </div>

        <div class="lesson-section">
            <h3>Sprite Üzerinde Mouse</h3>
            <p>Mouse'un sprite üzerinde olup olmadığını kontrol edin:</p>
            
            ${createPlayground(`
let buttons = [];
let buttonColors = ['#00ff88', '#00d4ff', '#ff6b9d'];
let buttonLabels = ['Başla', 'Ayarlar', 'Çıkış'];

function setup() {
    new Canvas(400, 300);
    
    for (let i = 0; i < 3; i++) {
        let btn = new Sprite(200, 80 + i * 80, 150, 50);
        btn.color = buttonColors[i];
        btn.text = buttonLabels[i];
        btn.textSize = 18;
        btn.idx = i;
        buttons.push(btn);
    }
}

function draw() {
    background('#1a1a2e');
    
    for (let btn of buttons) {
        // Mouse sprite üzerinde mi?
        if (btn.mouse.hovering()) {
            btn.color = '#febc2e';
            
            // Tıklandı mı?
            if (btn.mouse.presses()) {
                btn.text = '✓ Tıklandı!';
            }
        } else {
            btn.color = buttonColors[btn.idx];
        }
    }
    
    fill(255);
    textSize(12);
    text('Butonların üzerine gel ve tıkla!', 15, 25);
}
            `, 'Sprite Mouse Olayları')}
        </div>

        <div class="lesson-section">
            <h3>Sürükle-Bırak (Drag & Drop)</h3>
            
            ${createPlayground(`
let draggables;
let dropZone;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Bırakma alanı
    dropZone = new Sprite(320, 150, 120, 200, 'static');
    dropZone.color = '#1a4d3a';
    dropZone.stroke = '#00ff88';
    dropZone.strokeWeight = 2;
    dropZone.text = 'Bırak';
    dropZone.textSize = 14;
    
    // Sürüklenebilir objeler
    draggables = new Group();
    draggables.w = 50;
    draggables.h = 50;
    draggables.textSize = 24;
    
    let items = ['🎁', '📦', '🎈', '⭐'];
    for (let i = 0; i < 4; i++) {
        let d = new draggables.Sprite(80, 50 + i * 60);
        d.color = '#2d3436';
        d.text = items[i];
    }
}

function draw() {
    background('#1a1a2e');
    
    for (let d of draggables) {
        // Sürükleme
        if (d.mouse.dragging()) {
            d.moveTowards(mouse, 1);
            d.color = '#c44dff';
        } else {
            d.color = '#2d3436';
        }
        
        // Bırakma alanı kontrolü
        if (d.overlapping(dropZone)) {
            d.stroke = '#00ff88';
            d.strokeWeight = 3;
        } else {
            d.stroke = '#444';
            d.strokeWeight = 1;
        }
    }
    
    fill(255);
    textSize(12);
    text('Objeleri sürükle ve bırak!', 15, 25);
}
            `, 'Sürükle-Bırak')}
        </div>

        <div class="lesson-section">
            <h3>Kontrol Şeması Örneği</h3>
            
            ${createPlayground(`
let player;
let speed = 4;
let dashCooldown = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 40, 40);
    player.color = '#00d4ff';
    player.text = '⚔️';
    player.textSize = 24;
    player.drag = 0.9;
}

function draw() {
    background('#1a1a2e');
    
    // WASD Hareket
    let vx = 0, vy = 0;
    if (kb.pressing('a')) vx -= 1;
    if (kb.pressing('d')) vx += 1;
    if (kb.pressing('w')) vy -= 1;
    if (kb.pressing('s')) vy += 1;
    
    // Normalize et
    if (vx !== 0 || vy !== 0) {
        let mag = Math.sqrt(vx*vx + vy*vy);
        player.vel.x = (vx / mag) * speed;
        player.vel.y = (vy / mag) * speed;
    }
    
    // SHIFT: Dash
    dashCooldown = max(0, dashCooldown - 1);
    if (kb.presses('shift') && dashCooldown === 0) {
        player.vel.x *= 4;
        player.vel.y *= 4;
        dashCooldown = 60;
        player.color = '#ff6b9d';
    }
    
    // Renk normale dön
    if (dashCooldown < 50) player.color = '#00d4ff';
    
    // Sınırlar
    player.x = constrain(player.x, 20, 380);
    player.y = constrain(player.y, 20, 280);
    
    // UI
    fill(255);
    textSize(12);
    text('WASD: Hareket | SHIFT: Dash', 15, 25);
    
    // Dash cooldown bar
    fill(100);
    rect(15, 260, 100, 10, 5);
    let barColor = dashCooldown > 0 ? '#ff6b9d' : '#00ff88';
    fill(barColor);
    rect(15, 260, map(60 - dashCooldown, 0, 60, 0, 100), 10, 5);
}
            `, 'Gelişmiş Kontrol Şeması')}
        </div>

        <div class="info-box tip">
            <div class="info-title">💡 İpucu</div>
            <p><code>kb.pressing()</code> her frame true döner (sürekli hareket için), <code>kb.presses()</code> sadece ilk frame'de true döner (tek seferlik eylem için).</p>
        </div>
    `
};
