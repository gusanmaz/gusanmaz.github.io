# Hafıza Oyunu - Bölüm 2: İnteraktif Oyun Geliştirme

Bu klasör, hafıza oyununun ikinci bölümünü içerir. 23 Aralık 2025 tarihinde yapılan derste geliştirilen kod adımlarını interaktif olarak anlatır.

## İçerik

Bu web sayfası 9 adımda oyunun gelişimini anlatır:

### Adım 1: Temel Kurulum
- Değişkenlerin tanıtımı
- Grid yapısının oluşturulması
- Array görselleştirmeleri

### Adım 2: Tıklama Mantığı
- mousePressed() fonksiyonu
- İf-else akış diyagramı
- floor(index/2) eşleştirme mantığı
- İnteraktif demo ile kart seçimi

### Adım 3: Zamanlayıcı (Counter)
- Counter değişkeninin çalışma prensibi
- 60 FPS bazlı zamanlama
- Animasyonlu counter simülasyonu

### Adım 4: Kendini Seçme Hatası
- Aynı karta iki kez tıklama problemi
- Koordinat kontrolü çözümü
- Mantık testleri

### Adım 5: "Disko Modu" Hatası
- gameStart flag'inin önemi
- Her frame'de yeniden oluşturma problemi
- Disko modu animasyonu (hatayı gösterir)
- Loop yapısının yeniden düzenlenmesi

### Adım 6 & 7: Eşleşenleri Temizleme
- Boş string yöntemi
- gameBoard dizisinin değişimi
- Görsel değişiklikler
- Boş hücre kontrolü

### Adım 8: Oyun Bitişi (matchedPair)
- Sayaç yöntemi
- gameWin() fonksiyonu

### Adım 9: Daha İyi Kontrol
- isGameBoardEmpty() fonksiyonu
- 2D dizi tarama teknikleri
- İç içe loop mantığı

### Final Demo
- Tam fonksiyonel oyun
- Console çıktıları
- Oyun kuralları

### Özet
- Teknik beceriler tablosu
- Hata evrim zaman çizelgesi
- Öğrenilen dersler

## Özellikler

- 🌓 **Light/Dark Mode**: Sağ üst köşede tema değiştirme butonu
- 🎮 **İnteraktif Demolar**: Her adımda çalışan kod örnekleri
- 📊 **Görselleştirmeler**: Diziler, grid durumları, değişken değişimleri
- 🐛 **Hata Simülasyonları**: "Disko modu" gibi hataların canlı gösterimi
- ⏱️ **Animasyonlar**: Counter, progress bar gibi dinamik elemanlar
- 🎯 **Detaylı Açıklamalar**: Her kod parçasının neden ve nasılı

## Kullanılan Teknolojiler

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (JetBrains Mono, Nunito)

## Dosyalar

- `index.html` - Ana web sayfası (~77KB)
- `styles.css` - Stil dosyası (~36KB, light mode desteği ile)
- `app.js` - JavaScript kodları (~15KB)

## Açma

Dosyaları bir web sunucusunda veya doğrudan tarayıcıda açabilirsiniz:

```bash
# Basit HTTP sunucusu ile
python3 -m http.server 8000
# Sonra http://localhost:8000/part2_revised/ adresine gidin
```

veya doğrudan `index.html` dosyasını tarayıcınızda açın.

## Eğitim Hedefi

Bu sayfa, p5.js ile oyun geliştirmeyi öğrenen öğrenciler için tasarlanmıştır. Özellikle:

- İki boyutlu dizilerle çalışma
- Karmaşık koşullu mantık
- Durum yönetimi (state management)
- Hata ayıklama (debugging)
- Kod refactoring

konularında pratik deneyim kazandırmayı amaçlar.

## Geliştirici Notları

- Her adım bağımsız olarak anlaşılabilir
- Kod örnekleri syntax highlighting ile gösterilir
- Değişiklikler vurgulanır (yeşil arka plan)
- Hatalar açıkça işaretlenir (kırmızı vurgular)
- İnteraktif elementler hemen test edilebilir

## Lisans

Eğitim amaçlı kullanım için.

---

**Güncelleme:** 23 Aralık 2025  
**Dil:** Türkçe  
**Zorluk:** Orta-İleri Seviye

