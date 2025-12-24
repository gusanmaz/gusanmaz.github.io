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
            <h3>Kütüphane (Library) ve API Nedir?</h3>
            <p>Programlamada <strong>kütüphane (library)</strong>, başkaları tarafından yazılmış ve belirli işlevleri kolayca yapmanızı sağlayan hazır kod koleksiyonudur. Tekerleği yeniden icat etmek yerine, başkalarının yazdığı ve test ettiği kodları kullanırsınız.</p>
            
            <p><strong>API (Application Programming Interface)</strong> ise bir kütüphanenin veya sistemin size sunduğu fonksiyonlar, sınıflar ve özelliklerin bütünüdür. API, "bu kütüphaneyi nasıl kullanacaksınız" sorusunun cevabıdır.</p>
            
            <div class="info-box note">
                <div class="info-title">📝 Örnek</div>
                <p><strong>p5.play</strong> bir kütüphanedir. <code>new Sprite()</code>, <code>sprite.collides()</code>, <code>kb.pressing()</code> gibi fonksiyonlar ise p5.play'in API'sini oluşturur. Bu eğitimde p5.play API'sini öğreneceksiniz.</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>p5.play Nedir?</h3>
            <p>p5.play, <strong>p5.js</strong> grafik kütüphanesi üzerine inşa edilmiş bir <strong>2D oyun fizik motorudur</strong>. Arcade tarzı oyunlar yapmak için ihtiyacınız olan her şeyi sağlar:</p>
            
            <ul style="margin: 16px 0; padding-left: 24px; line-height: 1.8;">
                <li><strong>Sprite Sistemi:</strong> Oyun nesnelerinizi (karakterler, düşmanlar, mermi vb.) kolayca oluşturun ve yönetin</li>
                <li><strong>Fizik Motoru:</strong> Yerçekimi, çarpışma, sürtünme, sıçrama gibi gerçekçi fizik simülasyonu (Box2D/Planck.js tabanlı)</li>
                <li><strong>Çarpışma Algılama:</strong> Nesneler birbirine çarptığında otomatik algılama ve tepki</li>
                <li><strong>Animasyon Desteği:</strong> Sprite sheet'ler ile karakter animasyonları</li>
                <li><strong>Kolay Girdi Yönetimi:</strong> Klavye, fare ve gamepad kontrolü</li>
                <li><strong>Kamera Sistemi:</strong> Oyun dünyasında kamera hareketi ve zoom</li>
            </ul>
        </div>

        <div class="lesson-section">
            <h3>Oyun Fiziği Nedir?</h3>
            <p>Oyun fiziği, gerçek dünyadaki fizik kurallarını (yerçekimi, momentum, çarpışma) oyun ortamında simüle etmektir. Örneğin:</p>
            
            <ul style="margin: 16px 0; padding-left: 24px; line-height: 1.8;">
                <li><strong>Yerçekimi:</strong> Nesnelerin aşağı düşmesi (Mario zıpladığında geri inmesi)</li>
                <li><strong>Çarpışma:</strong> İki nesne birbirine çarptığında durması veya sekemesi</li>
                <li><strong>Hız ve İvme:</strong> Bir arabanın yavaş başlayıp hızlanması</li>
                <li><strong>Sürtünme:</strong> Buzda kayma vs çimde yürüme farkı</li>
            </ul>
            
            <p>p5.play, arka planda <strong>Planck.js</strong> (Box2D'nin JavaScript versiyonu) kullanır. Box2D, Angry Birds, Limbo, Crayon Physics gibi birçok ünlü oyunda kullanılan endüstri standardı bir fizik motorudur.</p>
        </div>

        <div class="lesson-section">
            <h3>Alternatif Oyun Motorları ve Kütüphaneleri</h3>
            <p>p5.play dışında JavaScript ile 2D oyun geliştirmek için kullanabileceğiniz başka seçenekler de var:</p>
            
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Kütüphane</th>
                        <th>Özellikler</th>
                        <th>Avantajları</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>p5.play</strong></td>
                        <td>p5.js tabanlı, Box2D fiziği</td>
                        <td>p5.js biliyorsanız kolay geçiş, eğitim odaklı</td>
                        <td><a href="https://p5play.org" target="_blank">p5play.org</a></td>
                    </tr>
                    <tr>
                        <td><strong>Phaser</strong></td>
                        <td>Tam teşekküllü oyun motoru</td>
                        <td>Çok güçlü, büyük topluluk, profesyonel projeler için</td>
                        <td><a href="https://phaser.io" target="_blank">phaser.io</a></td>
                    </tr>
                    <tr>
                        <td><strong>Matter.js</strong></td>
                        <td>Sadece fizik motoru</td>
                        <td>Hafif, esnek, herhangi bir render ile kullanılabilir</td>
                        <td><a href="https://brm.io/matter-js" target="_blank">brm.io/matter-js</a></td>
                    </tr>
                    <tr>
                        <td><strong>PixiJS</strong></td>
                        <td>2D WebGL renderer</td>
                        <td>Çok hızlı grafik performansı, fizik yok</td>
                        <td><a href="https://pixijs.com" target="_blank">pixijs.com</a></td>
                    </tr>
                    <tr>
                        <td><strong>Kaboom.js</strong></td>
                        <td>Basit oyun kütüphanesi</td>
                        <td>Çok basit API, hızlı prototipleme</td>
                        <td><a href="https://kaboomjs.com" target="_blank">kaboomjs.com</a></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="info-box tip">
                <div class="info-title">💡 Hangisini Seçmeliyim?</div>
                <p><strong>Yeni başlayanlar için:</strong> p5.play veya Kaboom.js önerilir - basit API, hızlı sonuç.<br>
                <strong>Ciddi projeler için:</strong> Phaser tercih edilebilir - daha kapsamlı ve profesyonel.<br>
                <strong>Sadece fizik gerekiyorsa:</strong> Matter.js kendi render sisteminizle kullanılabilir.</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>p5.play Nasıl Kurulur?</h3>
            <p>p5.play'i projelerinizde kullanmanın birkaç yolu var:</p>
            
            <h4 style="margin-top: 20px; color: var(--primary);">1. CDN ile Kullanım (En Kolay)</h4>
            <p>HTML dosyanıza şu script etiketlerini ekleyin:</p>
            
            <pre style="background: var(--bg-elevated); padding: 16px; border-radius: 8px; margin: 12px 0; overflow-x: auto;"><code>&lt;!-- p5.js (temel grafik kütüphanesi) --&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"&gt;&lt;/script&gt;

&lt;!-- Planck.js (fizik motoru) --&gt;
&lt;script src="https://p5play.org/v3/planck.min.js"&gt;&lt;/script&gt;

&lt;!-- p5.play --&gt;
&lt;script src="https://p5play.org/v3/p5play.js"&gt;&lt;/script&gt;</code></pre>

            <div class="info-box warning">
                <div class="info-title">⚠️ Önemli</div>
                <p>Script etiketlerinin sırası önemlidir! Önce p5.js, sonra planck.min.js, en son p5play.js yüklenmelidir.</p>
            </div>
            
            <h4 style="margin-top: 24px; color: var(--primary);">2. Dosyaları İndirerek Kullanım</h4>
            <p>İnternet bağlantısı olmadan çalışmak için dosyaları indirebilirsiniz:</p>
            <ol style="margin: 12px 0; padding-left: 24px; line-height: 2;">
                <li><a href="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js" target="_blank">p5.js'i indirin</a></li>
                <li><a href="https://p5play.org/v3/planck.min.js" target="_blank">planck.min.js'i indirin</a></li>
                <li><a href="https://p5play.org/v3/p5play.js" target="_blank">p5play.js'i indirin</a></li>
                <li>Dosyaları projenizin bir klasörüne (örn: "lib") koyun</li>
                <li>HTML'de yerel dosyalara referans verin</li>
            </ol>
        </div>

        <div class="lesson-section">
            <h3>p5.js Web Editöründe p5.play Kullanımı</h3>
            <p><a href="https://editor.p5js.org" target="_blank">p5.js Web Editörü</a>, tarayıcınızda kod yazıp çalıştırabileceğiniz ücretsiz bir online editördür.</p>
            
            <h4 style="margin-top: 16px; color: var(--primary);">Adım Adım Kurulum:</h4>
            <ol style="margin: 12px 0; padding-left: 24px; line-height: 2.2;">
                <li><a href="https://editor.p5js.org" target="_blank">editor.p5js.org</a> adresine gidin</li>
                <li>Hesap oluşturun veya giriş yapın (projeleri kaydetmek için)</li>
                <li>Sol panelde <strong>index.html</strong> dosyasına tıklayın</li>
                <li><code>&lt;head&gt;</code> bölümüne şu satırları ekleyin:
                    <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 8px; margin: 8px 0; overflow-x: auto;"><code>&lt;script src="https://p5play.org/v3/planck.min.js"&gt;&lt;/script&gt;
&lt;script src="https://p5play.org/v3/p5play.js"&gt;&lt;/script&gt;</code></pre>
                </li>
                <li><strong>sketch.js</strong> dosyasına dönün ve p5.play kodunuzu yazın</li>
                <li>▶️ (Play) butonuna basarak çalıştırın</li>
            </ol>
            
            <div class="info-box tip">
                <div class="info-title">💡 Şablon</div>
                <p>Her seferinde kurulum yapmamak için bir şablon proje oluşturup "Duplicate" ile kopyalayabilirsiniz.</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>VS Code ile p5.play Geliştirme</h3>
            <p><strong>Visual Studio Code (VS Code)</strong>, Microsoft'un ücretsiz ve güçlü kod editörüdür. Profesyonel geliştirme için önerilir.</p>
            
            <h4 style="margin-top: 16px; color: var(--primary);">Adım 1: VS Code Kurulumu</h4>
            <ol style="margin: 12px 0; padding-left: 24px; line-height: 2;">
                <li><a href="https://code.visualstudio.com" target="_blank">code.visualstudio.com</a> adresinden VS Code'u indirin</li>
                <li>İşletim sisteminize uygun versiyonu kurun</li>
                <li>VS Code'u açın</li>
            </ol>
            
            <h4 style="margin-top: 20px; color: var(--primary);">Adım 2: Gerekli Eklentileri Yükleyin</h4>
            <ol style="margin: 12px 0; padding-left: 24px; line-height: 2;">
                <li>Sol taraftaki <strong>Extensions</strong> ikonuna tıklayın (veya Ctrl+Shift+X)</li>
                <li>Arama kutusuna <strong>"Live Server"</strong> yazın</li>
                <li><strong>Live Server</strong> by Ritwick Dey eklentisini kurun (yeşil "Install" butonu)</li>
                <li>Aynı şekilde <strong>"p5.vscode"</strong> eklentisini de kurun (p5.js için kod tamamlama sağlar)</li>
            </ol>
            
            <h4 style="margin-top: 20px; color: var(--primary);">Adım 3: Proje Oluşturun</h4>
            <ol style="margin: 12px 0; padding-left: 24px; line-height: 2;">
                <li>Bilgisayarınızda yeni bir klasör oluşturun (örn: "oyunum")</li>
                <li>VS Code'da <strong>File → Open Folder</strong> ile bu klasörü açın</li>
                <li><strong>index.html</strong> dosyası oluşturun ve şu içeriği yapıştırın:</li>
            </ol>
            
            <pre style="background: var(--bg-elevated); padding: 16px; border-radius: 8px; margin: 12px 0; overflow-x: auto;"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;p5.play Oyunum&lt;/title&gt;
    &lt;script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"&gt;&lt;/script&gt;
    &lt;script src="https://p5play.org/v3/planck.min.js"&gt;&lt;/script&gt;
    &lt;script src="https://p5play.org/v3/p5play.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;script src="sketch.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

            <ol start="4" style="margin: 12px 0; padding-left: 24px; line-height: 2;">
                <li><strong>sketch.js</strong> dosyası oluşturun ve kodunuzu yazın</li>
                <li>index.html dosyasına sağ tıklayın → <strong>"Open with Live Server"</strong></li>
                <li>Tarayıcınızda oyununuz otomatik açılacak ve değişiklikler anında görünecek!</li>
            </ol>
        </div>

        <div class="lesson-section">
            <h3>p5play VS Code Eklentisi (Önerilen)</h3>
            <p>p5play'in resmi VS Code eklentisi, en kolay ve en hızlı geliştirme deneyimini sunar. Bu eklenti ile:</p>
            
            <ul style="margin: 16px 0; padding-left: 24px; line-height: 1.8;">
                <li><strong>Tek tıkla proje oluşturma</strong> - Manuel dosya oluşturmaya gerek yok</li>
                <li><strong>Otomatik kod tamamlama (IntelliSense)</strong> - p5play fonksiyonları ve özellikleri için öneriler</li>
                <li><strong>Dahili canlı önizleme</strong> - Ayrı tarayıcı açmadan VS Code içinde test</li>
                <li><strong>Hata ayıklama desteği</strong> - Console logları ve hata mesajları</li>
                <li><strong>Dokümantasyon ipuçları</strong> - Fonksiyonların üzerine gelince açıklama görme</li>
            </ul>
            
            <h4 style="margin-top: 20px; color: var(--primary);">Kurulum Adımları:</h4>
            <ol style="margin: 12px 0; padding-left: 24px; line-height: 2.2;">
                <li>VS Code'u açın</li>
                <li>Sol taraftaki <strong>Extensions</strong> ikonuna tıklayın (veya <code>Ctrl+Shift+X</code>)</li>
                <li>Arama kutusuna <strong>"p5play"</strong> yazın</li>
                <li><strong>"p5play"</strong> by Quinton Ashley eklentisini bulun ve <strong>Install</strong>'a tıklayın</li>
                <li>Kurulum tamamlandıktan sonra VS Code'u yeniden başlatın</li>
            </ol>
            
            <h4 style="margin-top: 20px; color: var(--primary);">Yeni Proje Oluşturma:</h4>
            <ol style="margin: 12px 0; padding-left: 24px; line-height: 2.2;">
                <li><code>Ctrl+Shift+P</code> ile komut paletini açın</li>
                <li><strong>"p5play: Create New Project"</strong> yazın ve seçin</li>
                <li>Projenizin kaydedileceği klasörü seçin</li>
                <li>Proje adını girin</li>
                <li>Eklenti otomatik olarak tüm gerekli dosyaları oluşturur!</li>
            </ol>
            
            <h4 style="margin-top: 20px; color: var(--primary);">Projeyi Çalıştırma:</h4>
            <ol style="margin: 12px 0; padding-left: 24px; line-height: 2.2;">
                <li><code>Ctrl+Shift+P</code> ile komut paletini açın</li>
                <li><strong>"p5play: Run Project"</strong> veya <strong>"p5play: Open Live Preview"</strong> seçin</li>
                <li>VS Code içinde veya tarayıcıda oyununuz çalışacak</li>
            </ol>
            
            <div class="info-box tip">
                <div class="info-title">🔗 Eklenti Sayfası</div>
                <p>Detaylı bilgi ve güncellemeler için: <a href="https://marketplace.visualstudio.com/items?itemName=quinton-ashley.p5play-vscode" target="_blank">VS Code Marketplace - p5play</a></p>
            </div>
            
            <div class="info-box note">
                <div class="info-title">📚 Ek Kaynaklar</div>
                <p>
                    <strong>Resmi p5play Dokümantasyonu:</strong> <a href="https://p5play.org/docs/" target="_blank">p5play.org/docs</a><br>
                    <strong>p5play Öğrenme Sayfası:</strong> <a href="https://p5play.org/learn/" target="_blank">p5play.org/learn</a><br>
                    <strong>p5play GitHub:</strong> <a href="https://github.com/quinton-ashley/p5play" target="_blank">github.com/quinton-ashley/p5play</a><br>
                    <strong>p5.js Referans:</strong> <a href="https://p5js.org/reference/" target="_blank">p5js.org/reference</a>
                </p>
            </div>
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
                        <td>Her karede manuel çizim gerekir</td>
                        <td>Sprite'lar otomatik çizilir</td>
                    </tr>
                    <tr>
                        <td>Fizik Simülasyonu</td>
                        <td>Kendiniz hesaplamalısınız</td>
                        <td>Box2D entegre (yerçekimi, çarpışma vb.)</td>
                    </tr>
                    <tr>
                        <td>Çarpışma Algılama</td>
                        <td><code>dist()</code> ile manuel kontrol</td>
                        <td><code>collides()</code>, <code>overlaps()</code></td>
                    </tr>
                    <tr>
                        <td>Girdi Kontrolü</td>
                        <td><code>keyIsDown()</code>, <code>mouseIsPressed</code></td>
                        <td><code>kb.pressing()</code>, <code>mouse.pressing()</code></td>
                    </tr>
                    <tr>
                        <td>Animasyon</td>
                        <td>Manuel frame yönetimi</td>
                        <td><code>sprite.addAni()</code> ile kolay animasyon</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="lesson-section">
            <h3>İlk Sprite'ınız</h3>
            <p>Sprite, oyununuzdaki her bir nesneyi temsil eder: oyuncu karakteri, düşmanlar, platformlar, mermiler... Aşağıdaki kodda basit bir sprite oluşturuyoruz.</p>
            
            <p><strong>Kodu değiştirin</strong> ve <strong>"Çalıştır"</strong> butonuna basarak sonucu görün!</p>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    
    // İlk sprite'ımız!
    // Sprite(x, y, genişlik, yükseklik)
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
            <div class="info-title">💡 Deneyin!</div>
            <p>Yukarıdaki editörde şunları değiştirmeyi deneyin:</p>
            <ul style="margin-top: 8px; padding-left: 20px;">
                <li><code>player.color</code> → <code>'purple'</code>, <code>'#ff6b9d'</code> veya <code>'rgb(100, 200, 50)'</code></li>
                <li><code>200, 150</code> → sprite'ın konumunu değiştirin</li>
                <li><code>60, 60</code> → sprite'ın boyutunu değiştirin</li>
            </ul>
        </div>

        <div class="lesson-section">
            <h3>Koordinat Sistemi</h3>
            <p>Oyun programlamada <strong>koordinat sistemi</strong> anlamak çok önemlidir. p5.js ve p5.play'de:</p>
            
            <ul style="margin: 16px 0; padding-left: 24px; line-height: 1.8;">
                <li><strong>(0, 0)</strong> noktası canvas'ın <strong>sol üst köşesidir</strong></li>
                <li><strong>X ekseni</strong> sağa doğru artar</li>
                <li><strong>Y ekseni</strong> aşağı doğru artar (matematiğin tersi!)</li>
            </ul>
            
            ${createPlayground(`
function setup() {
    new Canvas(400, 300);
    
    // Sol üst köşe (0,0 yakını)
    let solUst = new Sprite(50, 50, 30);
    solUst.color = '#ff6b9d';
    solUst.text = '1';
    
    // Sağ üst köşe
    let sagUst = new Sprite(350, 50, 30);
    sagUst.color = '#00d4ff';
    sagUst.text = '2';
    
    // Sol alt köşe
    let solAlt = new Sprite(50, 250, 30);
    solAlt.color = '#00ff88';
    solAlt.text = '3';
    
    // Sağ alt köşe
    let sagAlt = new Sprite(350, 250, 30);
    sagAlt.color = '#febc2e';
    sagAlt.text = '4';
    
    // Merkez
    let merkez = new Sprite(200, 150, 40);
    merkez.color = '#c44dff';
    merkez.text = 'M';
}

function draw() {
    background('#1a1a2e');
    
    // Koordinat bilgileri
    fill(255);
    textSize(10);
    text('(50,50)', 35, 85);
    text('(350,50)', 320, 85);
    text('(50,250)', 35, 235);
    text('(350,250)', 320, 235);
    text('(200,150)', 180, 180);
}
            `, 'Koordinat Sistemi')}
            
            <div class="info-box note">
                <div class="info-title">📐 Matematik Notu</div>
                <p>Matematikte Y ekseni yukarı doğru pozitiftir, ama bilgisayar grafiklerinde tam tersidir - Y aşağı doğru artar. Bu, ekranların sol üstten başlayarak satır satır çizilmesinden kaynaklanan tarihsel bir standarttır.</p>
            </div>
        </div>

        <div class="lesson-section">
            <h3>Draw Döngüsü</h3>
            <p>p5.js'de <code>draw()</code> fonksiyonu saniyede varsayılan olarak <strong>60 kez</strong> çalışır (60 FPS). Bu, animasyonları ve oyun mantığını oluşturur.</p>
            
            <p>Normal p5.js'de her şeyi <code>draw()</code> içinde çizmeniz gerekir. Ama p5.play'de sprite'lar <strong>otomatik</strong> olarak çizilir!</p>
            
            ${createPlayground(`
let ball;
let frameCounter = 0;

function setup() {
    new Canvas(400, 300);
    
    // Sprite bir kere oluşturulur
    ball = new Sprite(200, 150, 50);
    ball.color = '#00d4ff';
}

function draw() {
    background('#1a1a2e');
    
    frameCounter++;
    
    // ball otomatik çizilir, 
    // ball.display() yazmaya GEREK YOK!
    
    // Bilgi göster
    fill(255);
    textSize(12);
    text('Frame: ' + frameCounter, 10, 25);
    text('FPS: ' + round(frameRate()), 10, 45);
    text('Sprite otomatik ciziliyor!', 10, 65);
}
            `, 'Draw Döngüsü')}
        </div>

        <div class="lesson-section">
            <h3>Temel Programlama Kavramları</h3>
            <p>p5.play kullanırken karşılaşacağınız bazı temel programlama kavramları:</p>
            
            <div class="property-grid">
                <div class="property-card">
                    <div class="name">Değişken (Variable)</div>
                    <div class="type">let, const, var</div>
                    <div class="description">Veri saklamak için kullanılır. <code>let x = 10;</code> - x değişkeni 10 değerini tutar.</div>
                </div>
                <div class="property-card">
                    <div class="name">Fonksiyon (Function)</div>
                    <div class="type">function isim() { }</div>
                    <div class="description">Tekrar kullanılabilir kod bloğu. <code>setup()</code> ve <code>draw()</code> fonksiyonlardır.</div>
                </div>
                <div class="property-card">
                    <div class="name">Nesne (Object)</div>
                    <div class="type">new Sprite()</div>
                    <div class="description">Özellikleri ve metodları olan veri yapısı. Sprite bir nesnedir.</div>
                </div>
                <div class="property-card">
                    <div class="name">Özellik (Property)</div>
                    <div class="type">sprite.x, sprite.color</div>
                    <div class="description">Bir nesnenin değerleri. Nokta (.) ile erişilir.</div>
                </div>
                <div class="property-card">
                    <div class="name">Metod (Method)</div>
                    <div class="type">sprite.move(), sprite.collides()</div>
                    <div class="description">Bir nesnenin fonksiyonları. Parantez () ile çağrılır.</div>
                </div>
                <div class="property-card">
                    <div class="name">Koşul (Condition)</div>
                    <div class="type">if, else</div>
                    <div class="description">Duruma göre farklı kod çalıştırma. <code>if (x > 10) { ... }</code></div>
                </div>
            </div>
        </div>

        <div class="info-box note">
            <div class="info-title">📝 Bu Eğitim Hakkında</div>
            <p>Bu eğitimdeki tüm örnekler interaktiftir. Kodları değiştirip "Çalıştır" butonuna basarak sonuçları anında görebilirsiniz. Denemekten çekinmeyin - hata yapmak öğrenmenin en iyi yoludur!</p>
        </div>
    `
};

