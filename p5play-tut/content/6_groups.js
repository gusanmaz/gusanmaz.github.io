const groupsContent = {
    id: "groups",
    title: "Gruplar",
    icon: "👥",
    content: `
        <div class="lesson-header">
            <h2>Sprite Grupları</h2>
            <p class="subtitle">Group'lar, benzer sprite'ları organize etmenizi ve toplu işlemler yapmanızı sağlar. Düşmanlar, coinler, mermiler için idealdir.</p>
        </div>

        <div class="lesson-section">
            <h3>Group Oluşturma</h3>
            <p>Group, sprite şablonu gibi çalışır. Gruba eklenen her sprite, grubun özelliklerini miras alır:</p>
            
            ${createPlayground(`
let enemies;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Grup oluştur ve varsayılan özellikler tanımla
    enemies = new Group();
    enemies.color = '#ff6b9d';
    enemies.d = 40; // Çap
    enemies.bounciness = 1;
    enemies.text = '👾';
    enemies.textSize = 24;
    
    // Gruba sprite ekle
    for (let i = 0; i < 6; i++) {
        let e = new enemies.Sprite(
            random(50, 350),
            random(50, 250)
        );
        // Her biri rastgele yönde hareket
        e.vel.x = random(-2, 2);
        e.vel.y = random(-2, 2);
    }
}

function draw() {
    background('#1a1a2e');
    
    // Tüm düşmanları sınırla
    for (let e of enemies) {
        if (e.x < 20 || e.x > 380) e.vel.x *= -1;
        if (e.y < 20 || e.y > 280) e.vel.y *= -1;
    }
    
    fill(255);
    textSize(12);
    text('Düşman sayısı: ' + enemies.length, 15, 25);
}
            `, 'Group Temelleri')}
        </div>

        <div class="lesson-section">
            <h3>Group Özellikleri</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">group.length</div>
                    <div class="type">number</div>
                    <div class="description">Gruptaki sprite sayısı.</div>
                </div>
                <div class="property-card">
                    <div class="name">group[index]</div>
                    <div class="type">Sprite</div>
                    <div class="description">İndex ile sprite'a erişim.</div>
                </div>
                <div class="property-card">
                    <div class="name">group.Sprite(x, y, ...)</div>
                    <div class="type">constructor</div>
                    <div class="description">Gruba yeni sprite ekler ve döndürür.</div>
                </div>
                <div class="property-card">
                    <div class="name">group.removeAll()</div>
                    <div class="type">method</div>
                    <div class="description">Gruptaki tüm sprite'ları kaldırır.</div>
                </div>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Grup Çarpışmaları</h3>
            <p>Tüm grup elemanları için tek seferde çarpışma tanımlayın:</p>
            
            ${createPlayground(`
let player;
let bullets, enemies;
let score = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Oyuncu
    player = new Sprite(50, 150, 40, 30);
    player.color = '#00d4ff';
    player.collider = 'kinematic';
    player.text = '🚀';
    player.textSize = 24;
    
    // Mermi grubu
    bullets = new Group();
    bullets.d = 10;
    bullets.color = '#febc2e';
    bullets.life = 60; // 60 frame sonra yok ol
    
    // Düşman grubu
    enemies = new Group();
    enemies.d = 35;
    enemies.color = '#ff6b9d';
    enemies.text = '👾';
    enemies.textSize = 20;
    
    // Düşman spawner
    spawnEnemy();
}

function draw() {
    background('#1a1a2e');
    
    // Oyuncu hareketi
    if (kb.pressing('up')) player.y -= 4;
    if (kb.pressing('down')) player.y += 4;
    player.y = constrain(player.y, 20, 280);
    
    // Ateş
    if (kb.presses('space')) {
        let b = new bullets.Sprite(player.x + 25, player.y);
        b.vel.x = 8;
    }
    
    // GRUP ÇARPIŞMASI
    bullets.overlaps(enemies, hitEnemy);
    
    // Düşman hareketi
    for (let e of enemies) {
        e.x -= 1.5;
        if (e.x < -20) {
            e.remove();
            spawnEnemy();
        }
    }
    
    // Skor
    fill(255);
    textSize(14);
    text('Skor: ' + score, 15, 25);
    text('↑↓: Hareket | SPACE: Ateş', 15, 280);
}

function hitEnemy(bullet, enemy) {
    bullet.remove();
    enemy.remove();
    score += 10;
    spawnEnemy();
}

function spawnEnemy() {
    let e = new enemies.Sprite(420, random(40, 260));
}
            `, 'Shoot\'em Up Örneği')}
        </div>

        <div class="lesson-section">
            <h3>allSprites Grubu</h3>
            <p><code>allSprites</code> özel bir gruptur - tüm sprite'ları içerir:</p>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    
    // Farklı sprite'lar oluştur
    for (let i = 0; i < 20; i++) {
        let s = new Sprite(
            random(50, 350),
            random(50, 250),
            random(20, 50)
        );
        s.color = color(random(255), random(255), random(255));
    }
}

function draw() {
    background('#1a1a2e');
    
    // allSprites ile TÜM sprite'lara eriş
    for (let s of allSprites) {
        // Mouse'a yakınlık
        let d = dist(mouseX, mouseY, s.x, s.y);
        
        if (d < 80) {
            s.scale = map(d, 0, 80, 1.5, 1);
        } else {
            s.scale = 1;
        }
    }
    
    fill(255);
    textSize(12);
    text('Toplam sprite: ' + allSprites.length, 15, 25);
    text('Mouse yakınında büyürler', 15, 45);
}
            `, 'allSprites Örneği')}
        </div>

        <div class="lesson-section">
            <h3>Grup İterasyonu</h3>
            <p>Gruplar üzerinde döngü kurmanın farklı yolları:</p>
            
            ${createPlayground(`
let particles;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 2;
    
    particles = new Group();
    particles.bounciness = 0.7;
    particles.friction = 0.1;
    
    // Zemin
    new Sprite(200, 295, 400, 10, 'static').color = '#2d3436';
}

function draw() {
    background('#1a1a2e');
    
    // Tıklayınca parçacık ekle
    if (mouse.pressing()) {
        let p = new particles.Sprite(mouseX, mouseY, random(10, 25));
        p.color = color(random(255), random(255), random(255));
        p.vel.x = random(-5, 5);
        p.vel.y = random(-8, -2);
        p.life = 180; // 3 saniye
    }
    
    // For...of ile döngü
    for (let p of particles) {
        // Yaşlandıkça soluklaş
        p.opacity = p.life / 180;
        
        // Ekrandan çıkanları sil
        if (p.x < -50 || p.x > 450 || p.y > 350) {
            p.remove();
        }
    }
    
    fill(255);
    textSize(12);
    text('Tıkla: Parçacık ekle', 15, 25);
    text('Parçacık sayısı: ' + particles.length, 15, 45);
}
            `, 'Parçacık Sistemi')}
        </div>

        <div class="lesson-section">
            <h3>Subgroup (Alt Grup)</h3>
            <p>Gruplar hiyerarşik olabilir:</p>
            
            ${createPlayground(`
let characters;
let heroes, villains;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Ana grup
    characters = new Group();
    characters.d = 40;
    characters.textSize = 24;
    
    // Alt gruplar (characters'dan miras alır)
    heroes = new characters.Group();
    heroes.color = '#00d4ff';
    
    villains = new characters.Group();
    villains.color = '#ff6b9d';
    
    // Kahramanlar
    new heroes.Sprite(100, 100).text = '🦸';
    new heroes.Sprite(100, 200).text = '🦸‍♀️';
    
    // Kötüler
    new villains.Sprite(300, 100).text = '🦹';
    new villains.Sprite(300, 200).text = '🦹‍♀️';
    
    // Kötüler kahramanlara çarpsın
    villains.collides(heroes);
}

function draw() {
    background('#1a1a2e');
    
    // Kahramanlar mouse'a
    for (let h of heroes) {
        h.moveTowards(mouse, 0.02);
    }
    
    // Kötüler kahraman[0]'a
    for (let v of villains) {
        v.moveTowards(heroes[0], 0.015);
    }
    
    fill(255);
    textSize(12);
    text('characters: ' + characters.length, 15, 25);
    text('heroes: ' + heroes.length, 15, 45);
    text('villains: ' + villains.length, 15, 65);
}
            `, 'Subgroup Örneği')}
        </div>

        <div class="info-box tip">
            <div class="info-title">💡 İpucu</div>
            <p>Group'lara varsayılan özellikler atamak performansı artırır çünkü her sprite için tekrar tanımlamanız gerekmez. Özellikle çok sayıda sprite oluşturduğunuzda fark edilir.</p>
        </div>
    `
};

