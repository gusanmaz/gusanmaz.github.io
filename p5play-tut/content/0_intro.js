const introContent = {
    id: "intro",
    title: "Giriş",
    icon: "🚀",
    content: `
        <div class="lesson-header">
            <h2>p5.play'e Hoş Geldiniz!</h2>
            <p class="subtitle">p5.play, p5.js üzerine kurulu güçlü bir 2D oyun motorudur. Bu eğitimde interaktif örneklerle p5.play'i öğreneceksiniz.</p>
        </div>

        <div class="lesson-section">
            <h3>p5.js vs p5.play Farkları</h3>
            <p>p5.play, p5.js'in üzerine oyun geliştirme için gerekli özellikleri ekler. İşte temel farklar:</p>
            
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Özellik</th>
                        <th>p5.js</th>
                        <th>p5.play</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Canvas Oluşturma</td>
                        <td><code>createCanvas(w, h)</code></td>
                        <td><code>new Canvas(w, h)</code></td>
                    </tr>
                    <tr>
                        <td>Şekil Çizimi</td>
                        <td>Her karede manuel çizim</td>
                        <td>Sprite'lar otomatik çizilir</td>
                    </tr>
                    <tr>
                        <td>Fizik</td>
                        <td>Manuel hesaplama</td>
                        <td>Box2D entegre (Planck.js)</td>
                    </tr>
                    <tr>
                        <td>Çarpışma</td>
                        <td>dist() ile manuel</td>
                        <td>collides(), overlaps()</td>
                    </tr>
                    <tr>
                        <td>Girdi</td>
                        <td>keyPressed(), mousePressed()</td>
                        <td>kb.pressing(), mouse.pressing()</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="lesson-section">
            <h3>İlk Sprite'ınız</h3>
            <p>Aşağıdaki kodda basit bir sprite oluşturuyoruz. <strong>Kodu değiştirin</strong> ve <strong>"Çalıştır"</strong> butonuna basarak sonucu görün!</p>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    
    // İlk sprite'ımız!
    let player = new Sprite(200, 150, 60, 60);
    player.color = 'coral';
    
    // Metin ekleyelim
    player.text = '👋';
    player.textSize = 30;
}

function draw() {
    background('#1a1a2e');
}
            `, 'İlk Sprite Örneği')}
        </div>

        <div class="info-box tip">
            <div class="info-title">💡 İpucu</div>
            <p>Yukarıdaki editörde <code>player.color</code> değerini değiştirip tekrar çalıştırmayı deneyin! Örneğin: <code>'purple'</code>, <code>'#ff6b9d'</code> veya <code>'rgb(100, 200, 50)'</code></p>
        </div>

        <div class="lesson-section">
            <h3>Draw Döngüsü Farkı</h3>
            <p>Normal p5.js'de her şeyi <code>draw()</code> içinde çizmeniz gerekir. p5.play'de ise sprite'lar <strong>otomatik</strong> olarak güncellenir ve çizilir.</p>
            
            ${createPlayground(`
let ball;

function setup() {
    new Canvas(400, 300);
    
    // Sprite bir kere oluşturulur
    ball = new Sprite(200, 150, 50);
    ball.color = '#00d4ff';
}

function draw() {
    background('#1a1a2e');
    
    // ball.display() YAZMAYA GEREK YOK!
    // Sprite otomatik çizilir
    
    // Ama isterseniz p5 fonksiyonları
    // da kullanabilirsiniz:
    fill(255, 50);
    noStroke();
    ellipse(ball.x, ball.y + 40, 60, 15);
}
            `, 'Otomatik Çizim')}
        </div>

        <div class="lesson-section">
            <h3>Otomatik Çizimi Kontrol Etme</h3>
            <p>Eğer sprite'ların otomatik çizimini kapatmak isterseniz:</p>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">allSprites.autoDraw</div>
                    <div class="type">boolean</div>
                    <div class="description">false yaparsanız sprite'ları manuel çizmeniz gerekir.</div>
                </div>
                <div class="property-card">
                    <div class="name">allSprites.autoUpdate</div>
                    <div class="type">boolean</div>
                    <div class="description">false yaparsanız fizik güncellemelerini manuel yapmanız gerekir.</div>
                </div>
            </div>
        </div>

        <div class="info-box note">
            <div class="info-title">📝 Not</div>
            <p>Bu eğitimdeki tüm örnekler interaktiftir. Kodları değiştirerek deneyebilir, sonuçları anında görebilirsiniz!</p>
        </div>
    `
};
