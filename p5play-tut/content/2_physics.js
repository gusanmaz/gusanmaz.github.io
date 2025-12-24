const physicsContent = {
    id: "physics",
    title: "Fizik Motoru",
    icon: "⚡",
    content: `
        <div class="lesson-header">
            <h2>Fizik Motoru</h2>
            <p class="subtitle">p5.play, Box2D tabanlı Planck.js fizik motorunu kullanır. Gerçekçi yerçekimi, sürtünme ve çarpışmalar otomatik hesaplanır.</p>
        </div>

        <div class="lesson-section">
            <h3>Fizik Motoru Nedir?</h3>
            <p>Fizik motoru, gerçek dünyadaki fizik kurallarını (Newton yasaları) bilgisayar ortamında simüle eden yazılımdır. p5.play'in kullandığı <strong>Planck.js</strong>, ünlü <strong>Box2D</strong> fizik motorunun JavaScript versiyonudur.</p>
            
            <p>Box2D, şu oyunlarda kullanılmıştır:</p>
            <ul style="margin: 12px 0; padding-left: 24px; line-height: 1.8;">
                <li><strong>Angry Birds</strong> - Kuşların fiziksel hareketleri</li>
                <li><strong>Cut the Rope</strong> - İp fiziği ve sallanma</li>
                <li><strong>Limbo</strong> - Platform fiziği</li>
                <li><strong>Crayon Physics Deluxe</strong> - Çizim tabanlı fizik bulmacaları</li>
            </ul>
            
            <div class="info-box note">
                <div class="info-title">🔬 Fizik Terimleri</div>
                <p><strong>Kütle (mass):</strong> Nesnenin ağırlığı - büyük kütle = hareket ettirmesi zor<br>
                <strong>Hız (velocity):</strong> Nesnenin hareket yönü ve hızı (vektör)<br>
                <strong>İvme (acceleration):</strong> Hızın değişim oranı<br>
                <strong>Kuvvet (force):</strong> Nesneyi hareket ettiren etki<br>
                <strong>Sürtünme (friction):</strong> Hareketi yavaşlatan direnç</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Yerçekimi (Gravity)</h3>
            <p><strong>Yerçekimi</strong>, nesneleri bir yöne çeken kuvvettir. Gerçek dünyada aşağı doğrudur (9.8 m/s²). Oyunlarda bu değeri isteğe göre ayarlayabilirsiniz.</p>
            
            <p>p5.play'de yerçekimini <code>world.gravity</code> ile kontrol edebilirsiniz:</p>
            
            <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 8px; margin: 12px 0; overflow-x: auto;"><code>world.gravity.y = 10;  // Aşağı yerçekimi (normal)
world.gravity.y = -10; // Yukarı yerçekimi (ters)
world.gravity.y = 0;   // Yerçekimi yok (uzay)
world.gravity.x = 5;   // Yatay yerçekimi (rüzgar etkisi)</code></pre>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 350);
    
    // Yerçekimi ayarla (y pozitif = aşağı)
    world.gravity.y = 10;
    
    // Zemin (statik)
    let floor = new Sprite(200, 340, 400, 20, 'static');
    floor.color = '#2d3436';
    
    // Düşen toplar
    for (let i = 0; i < 5; i++) {
        let ball = new Sprite(80 + i * 70, 50 + i * 30, 35);
        ball.color = ['#ff6b9d', '#00d4ff', '#00ff88', '#c44dff', '#febc2e'][i];
    }
}

function draw() {
    background('#1a1a2e');
    
    // Bilgi
    fill(255);
    textSize(12);
    text('world.gravity.y = 10', 15, 25);
}
            `, 'Yerçekimi Örneği')}
            
            <div class="info-box tip">
                <div class="info-title">💡 İpucu</div>
                <p><code>world.gravity.x</code> ile yatay yerçekimi de ekleyebilirsiniz. Uzay oyunları için <code>world.gravity.y = 0</code> yapın!</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Collider Türleri</h3>
            <p><strong>Collider</strong>, sprite'ın fiziksel sınırıdır - diğer nesnelerle çarpışmayı bu sınır belirler. Collider türü, sprite'ın fiziksel davranışını kontrol eder:</p>
            
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Tür</th>
                        <th>Davranış</th>
                        <th>Kullanım Alanı</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>'dynamic'</code></td>
                        <td>Fizikten etkilenir, hareket edebilir, çarpışır</td>
                        <td>Oyuncu, düşman, top, kutu</td>
                    </tr>
                    <tr>
                        <td><code>'static'</code></td>
                        <td>Sabit durur, asla hareket etmez, çarpışır</td>
                        <td>Zemin, duvar, sabit platform</td>
                    </tr>
                    <tr>
                        <td><code>'kinematic'</code></td>
                        <td>Kodla hareket ettirilebilir, fizikten etkilenmez</td>
                        <td>Hareketli platform, asansör</td>
                    </tr>
                    <tr>
                        <td><code>'none'</code></td>
                        <td>Fiziksel çarpışma yok, sadece görsel</td>
                        <td>Arka plan, dekorasyon, sensör</td>
                    </tr>
                </tbody>
            </table>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 350);
    world.gravity.y = 10;
    
    // STATIC: Sabit zemin
    let floor = new Sprite(200, 320, 400, 30, 'static');
    floor.color = '#2d3436';
    floor.text = 'STATIC';
    
    // DYNAMIC: Fizikten etkilenir
    let box = new Sprite(100, 50, 50, 50);
    box.color = '#ff6b9d';
    box.text = 'DYN';
    
    // KINEMATIC: Kodla kontrol
    let platform = new Sprite(250, 200, 100, 20, 'kinematic');
    platform.color = '#00ff88';
    platform.text = 'KIN';
    
    // NONE: Hayalet
    let ghost = new Sprite(300, 100, 60, 60, 'none');
    ghost.color = 'rgba(0, 212, 255, 0.5)';
    ghost.text = 'NONE';
}

function draw() {
    background('#1a1a2e');
    
    // Kinematic platformu hareket ettir
    let platform = allSprites[2];
    platform.y = 200 + sin(frameCount * 0.05) * 50;
}
            `, 'Collider Türleri')}
        </div>

        <div class="lesson-section">
            <h3>Fiziksel Özellikler</h3>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.bounciness</div>
                    <div class="type">number (0-1)</div>
                    <div class="description">Sekme katsayısı. 0 = sekme yok, 1 = enerji kaybetmeden seker.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.friction</div>
                    <div class="type">number (0-1)</div>
                    <div class="description">Sürtünme. 0 = buz gibi kaygan, 1 = zımpara gibi.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.mass</div>
                    <div class="type">number</div>
                    <div class="description">Kütle. Ağır nesneler hafif nesneleri iter. Otomatik hesaplanır.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.drag</div>
                    <div class="type">number</div>
                    <div class="description">Hava direnci. Yüksek değer = daha hızlı yavaşlama.</div>
                </div>
            </div>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 350);
    world.gravity.y = 10;
    
    // Eğimli zemin
    let ramp = new Sprite(200, 280, 350, 20, 'static');
    ramp.rotation = -15;
    ramp.color = '#2d3436';
    
    // Alt zemin
    new Sprite(200, 340, 400, 20, 'static').color = '#2d3436';
    
    // Buzda kayan (düşük sürtünme)
    let icy = new Sprite(50, 150, 40, 40);
    icy.friction = 0;
    icy.color = '#00d4ff';
    icy.text = '🧊';
    
    // Normal sürtünme
    let normal = new Sprite(120, 150, 40, 40);
    normal.friction = 0.5;
    normal.color = '#febc2e';
    normal.text = '📦';
    
    // Yüksek sürtünme
    let sticky = new Sprite(190, 150, 40, 40);
    sticky.friction = 1;
    sticky.color = '#ff6b9d';
    sticky.text = '🩹';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(11);
    text('friction: 0 (buz)', 20, 25);
    text('friction: 0.5', 130, 25);
    text('friction: 1', 240, 25);
}
            `, 'Sürtünme Karşılaştırması')}
        </div>

        <div class="lesson-section">
            <h3>Sekme (Bounciness)</h3>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 350);
    world.gravity.y = 10;
    
    // Zemin
    let floor = new Sprite(200, 330, 400, 20, 'static');
    floor.color = '#2d3436';
    
    // Farklı sekme değerleri
    let balls = [
        { x: 70, bounce: 0, label: '0' },
        { x: 140, bounce: 0.3, label: '0.3' },
        { x: 210, bounce: 0.6, label: '0.6' },
        { x: 280, bounce: 0.9, label: '0.9' },
        { x: 350, bounce: 1, label: '1' }
    ];
    
    balls.forEach((b, i) => {
        let ball = new Sprite(b.x, 50, 35);
        ball.bounciness = b.bounce;
        ball.color = ['#ff5f57', '#febc2e', '#00ff88', '#00d4ff', '#c44dff'][i];
        ball.text = b.label;
        ball.textSize = 12;
    });
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(14);
    textAlign(CENTER);
    text('Bounciness Değerleri', 200, 25);
}
            `, 'Sekme Katsayısı')}
        </div>

        <div class="lesson-section">
            <h3>Hız ve Kuvvet</h3>
            <p>Sprite'lara hız veya kuvvet uygulayabilirsiniz:</p>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">sprite.vel.x, sprite.vel.y</div>
                    <div class="type">number</div>
                    <div class="description">Anlık hız vektörü (velocity). Doğrudan ayarlanabilir.</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.speed</div>
                    <div class="type">number</div>
                    <div class="description">Toplam hız büyüklüğü (magnitude).</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.direction</div>
                    <div class="type">number</div>
                    <div class="description">Hareket yönü (derece).</div>
                </div>
                <div class="property-card">
                    <div class="name">sprite.applyForce(x, y)</div>
                    <div class="type">method</div>
                    <div class="description">Kuvvet uygular. Kütle hesaba katılır.</div>
                </div>
            </div>
            
            ${createPlayground(`
let ball;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    ball = new Sprite(200, 150, 40);
    ball.color = '#00d4ff';
    ball.drag = 0.5;
}

function draw() {
    background('#1a1a2e');
    
    // WASD ile kuvvet uygula
    if (kb.pressing('w')) ball.applyForce(0, -0.5);
    if (kb.pressing('s')) ball.applyForce(0, 0.5);
    if (kb.pressing('a')) ball.applyForce(-0.5, 0);
    if (kb.pressing('d')) ball.applyForce(0.5, 0);
    
    // Space ile durdur
    if (kb.pressing('space')) {
        ball.vel.x = 0;
        ball.vel.y = 0;
    }
    
    // Ekrandan çıkmasın
    ball.x = constrain(ball.x, 20, 380);
    ball.y = constrain(ball.y, 20, 280);
    
    // Hız vektörü çiz
    stroke('#ff6b9d');
    strokeWeight(3);
    line(ball.x, ball.y, 
         ball.x + ball.vel.x * 10, 
         ball.y + ball.vel.y * 10);
    noStroke();
    
    // Bilgi
    fill(255);
    textSize(12);
    text('WASD: Hareket | SPACE: Dur', 15, 25);
    text('Hız: ' + ball.speed.toFixed(2), 15, 45);
}
            `, 'Kuvvet ve Hız Kontrolü')}
        </div>

        <div class="info-box warning">
            <div class="info-title">⚠️ Dikkat</div>
            <p><code>sprite.x</code> ve <code>sprite.y</code> değerlerini doğrudan değiştirmek yerine, fizik motoruyla uyumlu çalışmak için <code>vel</code> veya <code>applyForce</code> kullanın.</p>
        </div>
    `
};
