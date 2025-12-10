const collisionsContent = {
    id: "collisions",
    title: "Çarpışmalar",
    icon: "💥",
    content: `
        <div class="lesson-header">
            <h2>Çarpışma Sistemi</h2>
            <p class="subtitle">p5.play'de çarpışmalar otomatik hesaplanır. Fiziksel çarpışmalar ve sensör tabanlı tetikleyiciler kullanabilirsiniz.</p>
        </div>

        <div class="lesson-section">
            <h3>Çarpışma Türleri</h3>
            
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Metod</th>
                        <th>Fiziksel Çarpışma</th>
                        <th>Kullanım</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>collides()</code></td>
                        <td>✅ Evet - birbirini iter</td>
                        <td>Duvar, zemin, engeller</td>
                    </tr>
                    <tr>
                        <td><code>colliding()</code></td>
                        <td>✅ Evet</td>
                        <td>Sürekli temas kontrolü</td>
                    </tr>
                    <tr>
                        <td><code>collided()</code></td>
                        <td>✅ Evet</td>
                        <td>Temas bittiğinde tetiklenir</td>
                    </tr>
                    <tr>
                        <td><code>overlaps()</code></td>
                        <td>❌ Hayır - geçer</td>
                        <td>Coin toplama, trigger zone</td>
                    </tr>
                    <tr>
                        <td><code>overlapping()</code></td>
                        <td>❌ Hayır</td>
                        <td>Zone içindeyken sürekli</td>
                    </tr>
                    <tr>
                        <td><code>overlapped()</code></td>
                        <td>❌ Hayır</td>
                        <td>Zone'dan çıkınca</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="lesson-section">
            <h3>Collides vs Overlaps</h3>
            
            ${createPlayground(`
let ball;
let wall, sensor;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    ball = new Sprite(50, 150, 35);
    ball.color = '#00d4ff';
    ball.text = '⚽';
    ball.textSize = 20;
    
    // Fiziksel duvar (collides)
    wall = new Sprite(200, 150, 30, 120, 'static');
    wall.color = '#ff5f57';
    wall.text = '🧱';
    
    // Sensör zone (overlaps)
    sensor = new Sprite(320, 150, 80, 80, 'static');
    sensor.color = 'rgba(0, 255, 136, 0.3)';
    sensor.text = '✨';
    sensor.textSize = 24;
}

function draw() {
    background('#1a1a2e');
    
    // Mouse takibi
    ball.moveTowards(mouse, 0.1);
    
    // Collides: Fiziksel çarpışma
    if (ball.collides(wall)) {
        wall.color = '#febc2e';
    }
    
    // Overlaps: Sensör (içinden geçer)
    if (ball.overlapping(sensor)) {
        sensor.color = 'rgba(0, 255, 136, 0.6)';
        sensor.scale = 1.1;
    } else {
        sensor.color = 'rgba(0, 255, 136, 0.3)';
        sensor.scale = 1;
    }
    
    fill(255);
    textSize(11);
    text('🧱 COLLIDES: Fiziksel engel', 15, 25);
    text('✨ OVERLAPS: Sensör (geçilebilir)', 15, 45);
    text('Topu mouse ile hareket ettir', 15, 280);
}
            `, 'Collides vs Overlaps')}
        </div>

        <div class="lesson-section">
            <h3>Callback Fonksiyonları</h3>
            <p>Çarpışma anında özel kod çalıştırmak için callback kullanın:</p>
            
            ${createPlayground(`
let player;
let coins;
let score = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 40, 40);
    player.color = '#00d4ff';
    player.text = '🤖';
    player.textSize = 24;
    
    // Coin'ler
    coins = new Group();
    for (let i = 0; i < 8; i++) {
        let c = new coins.Sprite(
            random(50, 350),
            random(50, 250),
            25
        );
        c.color = '#febc2e';
        c.text = '🪙';
        c.textSize = 16;
        c.collider = 'static';
    }
}

function draw() {
    background('#1a1a2e');
    
    // Hareket
    player.moveTowards(mouse, 0.1);
    
    // Callback ile coin toplama
    player.overlaps(coins, collectCoin);
    
    // Skor
    fill(255);
    textSize(16);
    text('Skor: ' + score, 15, 30);
    text('Coinleri topla!', 15, 280);
}

// Callback fonksiyonu
function collectCoin(player, coin) {
    coin.remove();
    score += 10;
    
    // Yeni coin ekle
    setTimeout(() => {
        let c = new coins.Sprite(
            random(50, 350),
            random(50, 250),
            25
        );
        c.color = '#febc2e';
        c.text = '🪙';
        c.textSize = 16;
        c.collider = 'static';
    }, 1000);
}
            `, 'Coin Toplama Oyunu')}
        </div>

        <div class="lesson-section">
            <h3>Çarpışma Yönünü Algılama</h3>
            <p>Platform oyunları için çarpışmanın hangi yönden geldiğini anlamak önemlidir:</p>
            
            ${createPlayground(`
let player;
let platforms;
let onGround = false;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 10;
    
    player = new Sprite(100, 100, 35, 50);
    player.color = '#00d4ff';
    player.rotationLock = true;
    
    // Platformlar
    platforms = new Group();
    platforms.collider = 'static';
    platforms.color = '#2d3436';
    
    new platforms.Sprite(200, 280, 400, 20);
    new platforms.Sprite(100, 200, 100, 15);
    new platforms.Sprite(300, 150, 100, 15);
}

function draw() {
    background('#1a1a2e');
    
    // Zemin kontrolü
    onGround = player.colliding(platforms);
    
    // Yatay hareket
    if (kb.pressing('left')) player.vel.x = -3;
    else if (kb.pressing('right')) player.vel.x = 3;
    else player.vel.x = 0;
    
    // Zıplama (sadece zemindeyken)
    if (kb.presses('up') && onGround) {
        player.vel.y = -8;
    }
    
    // Durum göster
    player.text = onGround ? '🧍' : '🦘';
    player.textSize = 24;
    
    fill(255);
    textSize(12);
    text('← → : Hareket | ↑ : Zıpla', 15, 25);
    text('Zeminde: ' + (onGround ? '✅' : '❌'), 15, 45);
}
            `, 'Platform Zıplama')}
        </div>

        <div class="lesson-section">
            <h3>Çarpışma Filtreleme</h3>
            <p>Bazı sprite'ların birbirleriyle çarpışmamasını sağlayabilirsiniz:</p>
            
            ${createPlayground(`
let redBalls, blueBalls;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 5;
    
    // Zemin
    new Sprite(200, 290, 400, 20, 'static').color = '#2d3436';
    
    // Kırmızı toplar
    redBalls = new Group();
    redBalls.color = '#ff6b9d';
    redBalls.bounciness = 0.8;
    
    // Mavi toplar
    blueBalls = new Group();
    blueBalls.color = '#00d4ff';
    blueBalls.bounciness = 0.8;
    
    // Topları oluştur
    for (let i = 0; i < 4; i++) {
        new redBalls.Sprite(100 + i * 30, 50 + i * 20, 30);
        new blueBalls.Sprite(250 + i * 30, 50 + i * 20, 30);
    }
    
    // Kırmızılar birbirinden geçsin
    redBalls.overlaps(redBalls);
    
    // Maviler birbirinden geçsin
    blueBalls.overlaps(blueBalls);
    
    // Ama kırmızı-mavi çarpışsın!
    redBalls.collides(blueBalls);
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(11);
    text('🔴 Kırmızılar kendi aralarında geçer', 15, 25);
    text('🔵 Maviler kendi aralarında geçer', 15, 45);
    text('🔴🔵 Kırmızı-Mavi çarpışır!', 15, 65);
}
            `, 'Çarpışma Filtreleme')}
        </div>

        <div class="info-box note">
            <div class="info-title">📝 Not</div>
            <p>Çarpışma metodları hem tek sprite hem de Group üzerinde kullanılabilir. <code>player.overlaps(coins)</code> veya <code>enemies.collides(walls)</code> gibi.</p>
        </div>
    `
};
