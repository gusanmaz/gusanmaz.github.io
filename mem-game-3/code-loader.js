const codeSnippets = {
  "step1": `/* ADIM 1: OYUN DONGUSU VE SKOR
   -------------------------------
   Bu adimda skor degiskenini ekliyor ve kazanma/kaybetme
   durumlarini kontrol ediyoruz.
*/

let words = ["red", "green", "blue", "yellow", "red", "green", "blue", "yellow", 
             "orange", "purple", "orange", "purple", "black", "white", "black", "white"];

let mixedWords = [];
let i = 0;
let gameBoard = [];

let satir1 = -1;
let sutun1 = -1;
let satir2 = -1;
let sutun2 = -1;

let counter = -1;
let gameStart = true;
let matchedPair = 0;
let score = 0;

function setup(){
  createCanvas(400, 400); 
  textAlign(CENTER, CENTER);
  textSize(20);
  mixedWords = shuffle(words);
}

function gameWin(){
  background("green");
  text("TEBRIKLER!", 200, 200);
}

function draw(){
  if (isGameBoardEmpty() == true){
    return;
  }

  if (counter != -1){
    counter++;
  }

  if (counter == 30){
    satir1 = -1;
    sutun1 = -1;
    satir2 = -1;
    sutun2 = -1;
    counter = -1;
  }

  drawGameBoard();
}

function isAllTrue(a){
  for (let i = 0; i < a.length; i++){
    if (a[i] == false){
      return false;
    }
  }
  return true;
}

function selectText(){
    let word = mixedWords[i];
    i++;
    i = i%16;
    return word;
}

function mousePressed(){
  let loc = getCellLocation(mouseX, mouseY);

  if ((satir1 == -1) && (sutun1 == -1) && gameBoard[loc[0]][loc[1]] != ""){
    satir1 = loc[0];
    sutun1 = loc[1];
  }else if ((satir2 == -1) && (sutun2 == -1) && !((satir1 == loc[0]) && (sutun1 == loc[1])) && gameBoard[loc[0]][loc[1]] != ""){
    satir2 = loc[0];
    sutun2 = loc[1];
    let color1 = gameBoard[satir1][sutun1];
    let color2 = gameBoard[satir2][sutun2];
    
    // Kelimenin dizideki yerini bul
    let ind1 = getWordIndex(words, color1);
    let ind2 = getWordIndex(words, color2);
    
    // Kardes indeks kontrolu (0-1, 2-3 vb.)
    let a1 = floor(ind1 / 2);
    let a2 = floor(ind2 / 2);

    if (a1 == a2){
      score += 10;
      // print(score);
      
      gameBoard[satir1][sutun1] = "";
      gameBoard[satir2][sutun2] = "";
      
      matchedPair++;
      if (isGameBoardEmpty() == true){
        gameWin();
      }
    }else{
      score -= 2;
      // print(score);
    }
    
    counter = 0;
  }
}

function getCellLocation(x, y){
  let sutun = floor(x / 100);
  let satir = floor(y / 100);
  let loc = [satir, sutun];
  return loc;
}

function getWordIndex(arr, str){
  for (let i=0; i < arr.length; i++){
    if (arr[i] == str){
      return i;
    }
  }
  return -1;
}

function drawGameBoard(){
  background("white");

  for (let satir = 0; satir < 4; satir++){
      if (gameStart == true){
        gameBoard[satir] = [];
      }
      for (let sutun = 0; sutun < 4; sutun++){
        fill("white");
        if (gameBoard[satir][sutun] == ""){
          fill("black");
        }
        
        if ((satir1 == satir) && (sutun1 == sutun)){
          fill("yellow");
        }
        
        if ((satir2 == satir) && (sutun2 == sutun)){
           fill("orange")
        }
        
        rect(sutun * 100, satir * 100, 100, 100);
        
        if (gameStart == true){
             let word = selectText();
             gameBoard[satir][sutun] = word;
        }

        let word = gameBoard[satir][sutun];
        fill("black");
        text(word, sutun * 100 + 50, satir * 100 + 50);
      }
  }
  
  if (gameStart == true){
    gameStart = false; 
  }
}

function isGameBoardEmpty(){
  for (let satir=0; satir<4; satir++){
    for (let sutun=0; sutun<4; sutun++){
      if (gameBoard[satir][sutun] != ""){
        return false;
      }
    }
  }
  return true;
}`,

  "step2": `/* ADIM 2: ARAYUZ VE PUAN GOSTERIMI
   ---------------------------------
   Canvas boyutunu artirarak puani ekrana yazdiriyoruz.
*/

let words = ["red", "green", "blue", "yellow", "red", "green", "blue", "yellow", 
             "orange", "purple", "orange", "purple", "black", "white", "black", "white"];

let mixedWords = [];
let i = 0;
let gameBoard = [];
let satir1 = -1, sutun1 = -1, satir2 = -1, sutun2 = -1;
let counter = -1;
let gameStart = true;
let matchedPair = 0;
let score = 0;

function setup() {
  // YENI: Canvas boyutu artirildi (height 500 oldu)
  createCanvas(400, 500);
  textAlign(CENTER, CENTER);
  textSize(20);
  mixedWords = shuffle(words);

  drawGameBoard();
}

function drawGameBoard() {
  background("white");

  for (let satir = 0; satir < 4; satir++) {
    if (gameStart == true) {
      gameBoard[satir] = [];
    }

    for (let sutun = 0; sutun < 4; sutun++) {
      fill("white");

      if (gameBoard[satir][sutun] == "") {
        fill("black");
      }

      if (satir1 == satir && sutun1 == sutun) {
        fill("yellow");
      }

      if (satir2 == satir && sutun2 == sutun) {
        fill("orange");
      }

      rect(sutun * 100, satir * 100, 100, 100);

      if (gameStart == true) {
        let word = selectText();
        gameBoard[satir][sutun] = word;
      }

      let word = gameBoard[satir][sutun];
      fill("black");
      text(word, sutun * 100 + 50, satir * 100 + 50);
    }
  }

  // YENI: Puani ekrana yaz
  textSize(30);
  text("Puan: " + score, 200, 450);

  if (gameStart == true) {
    gameStart = false;
  }
}

// ... Diger fonksiyonlar Adim 1 ile aynidir ...
`,

  "step3": `/* ADIM 3: TIKLAMA GUVENLIGI
   -------------------------
   Board disina tiklamayi engelleyen kontrol.
*/
// YENI: Guvenlik Fonksiyonu
function isMouseInGameBoard(x, y) {
  // Sadece y < 400 ise tahtanin icindeyiz demektir
  return y < 400;
}

function mousePressed() {
  // YENI: Once kontrol et
  let b = isMouseInGameBoard(mouseX, mouseY);
  if (b == false) {
    return; // Tahta disindaysa islem yapma
  }

  let loc = getCellLocation(mouseX, mouseY);
  
  // ... Geri kalan logic ayni ...
}`,

  "step4": `/* ADIM 4: EMOJILER
   ---------------
   Kelimeler yerine emoji ciftleri kullaniyoruz.
*/
// YENI: Words dizisi degisti (Emojiler eklendi)
let words = [
    "red","🔴","black","⚫",
    "blue","🔵","green","🟢",
    "white","⚪","yellow","🟡",
    "orange","🟠","gray","🔘"
];

// ... Diger kodlar ayni ...
`,

  "step5": `/* ADIM 5: EMOJI BOYUTLANDIRMA
   --------------------------
   Emojiler kucuk kaldigi icin onlari tespit edip buyutuyoruz.
*/

function isEmoji(s) {
    // Basit bir kontrol (ilerde regex ile degisecek)
    return ["red", "black", "blue", "green", "white", "yellow", "orange", "gray"].includes(s) == false;
}

function drawGameBoard() {
  // ...
      // YENI: Emoji kontrolu ve TextSize ayari
      let p = isEmoji(word);
      if (p == true){
        textSize(60); // Emoji boyutu
      } else {
        textSize(20); // Yazi boyutu
      }
      text(word, sutun * 100 + 50, satir * 100 + 50);
  // ...
}`,

  "step6": `/* ADIM 6: REGEX ILE EMOJI KONTROLU
   -------------------------------
   isEmoji fonksiyonunu daha profesyonel hale getiriyoruz.
*/

// YENI: Regex Fonksiyonu
function isEmoji(s) {
  // Unicode property escape ile emoji kontrolu
  // Extended_Pictographic, ZWJ ile birlestirilmis emojileri (Meslekler vb) de kapsar
  return /\\p{Extended_Pictographic}/u.test(s);
}
`,

  "step7": `/* ADIM 7: TEMALAR
   --------------
   Tek bir kelime listesi yerine farkli kategoriler ekliyoruz.
*/

// YENI: Tema Dizileri
let colors = ["red","🔴","black","⚫","blue","🔵","green","🟢","white","⚪","yellow","🟡","orange","🟠", "gray","🔘"];
let animals = ["cat","🐱","dog","🐶","lion","🦁","elephant","🐘","bird","🐦","fish","🐟","horse","🐴","turtle","🐢"];
let professions = ["doctor","🩺","teacher","📚","engineer","🛠️","artist","🎨","chef","👨‍🍳","pilot","✈️","scientist","🔬","farmer","🌾"];
let fruits = ["apple","🍎","banana","🍌","orange","🍊","grape","🍇","strawberry","🍓","cherry","🍒","pineapple","🍍","watermelon","🍉"];

// YENI: Tema Listesi
let themes = [colors, animals, professions, fruits];

let words;
let mixedWords = [];
let i = 0;
let gameBoard = [];
let satir1 = -1, sutun1 = -1, satir2 = -1, sutun2 = -1;
let counter = -1;
let gameStart = true;
let matchedPair = 0;
let score = 0;

function setup() {
  createCanvas(400, 500);
  // YENI: Rastgele tema secimi
  words = random(themes);
  
  textAlign(CENTER, CENTER);
  textSize(20);
  mixedWords = shuffle(words);
  drawGameBoard();
}

function gameWin() {
  background("green");
  textAlign(CENTER, CENTER);
  text("TEBRIKLER!", width/2, height/2);
}

function draw() {
  if (isGameBoardEmpty() == true) return;
  if (counter != -1) counter++;
  if (counter == 30) {
    satir1 = -1; sutun1 = -1; satir2 = -1; sutun2 = -1; counter = -1;
  }
  drawGameBoard();
}

function isEmoji(s) {
  // ZWJ (Zero Width Joiner) destegi icin Extended_Pictographic kullaniyoruz
  return /\\p{Extended_Pictographic}/u.test(s);
}

function drawGameBoard() {
  background("white");
  for (let satir = 0; satir < 4; satir++) {
    if (gameStart == true) gameBoard[satir] = [];
    for (let sutun = 0; sutun < 4; sutun++) {
      fill("white");
      if (gameBoard[satir][sutun] == "") fill("black");
      if (satir1 == satir && sutun1 == sutun) fill("yellow");
      if (satir2 == satir && sutun2 == sutun) fill("orange");
      
      rect(sutun * 100, satir * 100, 100, 100);
      
      if (gameStart == true) {
        let word = selectText();
        gameBoard[satir][sutun] = word;
      }

      let word = gameBoard[satir][sutun];
      fill("black");
      
      if (isEmoji(word)) textSize(60);
      else textSize(20);
      
      text(word, sutun * 100 + 50, satir * 100 + 50);
    }
  }
  textSize(30);
  text("Puan: " + score, 200, 450);
  if (gameStart == true) gameStart = false;
}

// ... Diger standart fonksiyonlar (mousePressed, helperlar) ayni ...
function isAllTrue(a) { for(let k=0;k<a.length;k++) if(!a[k]) return false; return true; }
function selectText() { let w=mixedWords[i]; i=(i+1)%16; return w; }
function isMouseInGameBoard(x,y){ return y<400; }
function getCellLocation(x,y){ return [floor(y/100), floor(x/100)]; }
function getWordIndex(arr,s){ for(let k=0;k<arr.length;k++) if(arr[k]==s) return k; return -1; }
function isGameBoardEmpty(){ for(let r=0;r<4;r++) for(let c=0;c<4;c++) if(gameBoard[r][c]!="") return false; return true; }
function mousePressed() {
    let b = isMouseInGameBoard(mouseX, mouseY);
    if (!b) return;
    let loc = getCellLocation(mouseX, mouseY);
    if ((satir1 == -1) && (sutun1 == -1) && gameBoard[loc[0]][loc[1]] != ""){
        satir1 = loc[0]; sutun1 = loc[1];
    }else if ((satir2 == -1) && (sutun2 == -1) && !((satir1 == loc[0]) && (sutun1 == loc[1])) && gameBoard[loc[0]][loc[1]] != ""){
        satir2 = loc[0]; sutun2 = loc[1];
        let c1 = gameBoard[satir1][sutun1];
        let c2 = gameBoard[satir2][sutun2];
        let i1 = getWordIndex(words, c1);
        let i2 = getWordIndex(words, c2);
        if (floor(i1/2) == floor(i2/2)){
            score+=10; matchedPair++; gameBoard[satir1][sutun1]=""; gameBoard[satir2][sutun2]="";
            if (isGameBoardEmpty()) gameWin();
        } else { score-=2; }
        counter = 0;
    }
}
`,

  "step8": `/* ADIM 8: SEVIYE SISTEMI (FINAL)
   ----------------------
   Oyun bitince yeni bir temaya gecis.
*/
let colors = ["red","🔴","black","⚫","blue","🔵","green","🟢","white","⚪","yellow","🟡","orange","🟠", "gray","🔘"];
let animals = ["cat","🐱","dog","🐶","lion","🦁","elephant","🐘","bird","🐦","fish","🐟","horse","🐴","turtle","🐢"];
let professions = ["doctor","🩺","teacher","📚","engineer","🛠️","artist","🎨","chef","👨‍🍳","pilot","✈️","scientist","🔬","farmer","🌾"];
let fruits = ["apple","🍎","banana","🍌","orange","🍊","grape","🍇","strawberry","🍓","cherry","🍒","pineapple","🍍","watermelon","🍉"];
let themes = [colors, animals, professions, fruits];

// Global degiskenler (sadece skoru burada tutuyoruz ki sifirlanmasin)
let score = 0;
let level = 0;

// Digerleri artik levelStart icinde sifirlanacak
let words, mixedWords, i, gameBoard;
let satir1, sutun1, satir2, sutun2, counter, gameStart, matchedPair;

function setup() {
  createCanvas(400, 500);
  textAlign(CENTER, CENTER);
  textSize(20);
  
  // Oyunu baslat
  levelStart(level);
}

// YENI: Level baslatma fonksiyonu
function levelStart(l){
    print("Level " + l + " basliyor...");
    
    // Eger tum leveller bittiyse
    if (l >= themes.length){
        gameWin(true); // Oyun Bitti modu
        return;
    }

    let themeIndex = l;
    words = themes[themeIndex];
    
    mixedWords = shuffle(words);
    
    // Degiskenleri Sifirla
    i = 0;
    gameBoard = [];
    satir1 = -1; sutun1 = -1;
    satir2 = -1; sutun2 = -1;
    counter = -1;
    gameStart = true;
    matchedPair = 0;
    
    drawGameBoard();
}

function gameWin(final = false) {
  if (final){
      // Oyun GERCEKTEN bitti
      background("green");
      fill("white");
      textSize(40);
      text("OYUN BİTTİ!", width/2, height/2 - 30);
      textSize(20);
      text("Tüm konular tamamlandı.", width/2, height/2 + 20);
      noLoop(); // Donguyu durdur
  } else {
     // Siradaki levele gec
     level++;
     levelStart(level); 
  }
}

function draw() {
  if (isGameBoardEmpty() == true) return; // Level bitince bekleme
  
  if (counter != -1) {
    counter++;
  }
  if (counter == 30) {
    satir1 = -1; sutun1 = -1; satir2 = -1; sutun2 = -1; counter = -1;
  }
  drawGameBoard();
}

function isEmoji(s){
    // Regex guncellemesi (daha genis emoji destegi)
    return /\\p{Extended_Pictographic}/u.test(s);
}

function mousePressed() {
    let b = isMouseInGameBoard(mouseX, mouseY);
    if (!b) return;

    let loc = getCellLocation(mouseX, mouseY);

    if ((satir1 == -1) && (sutun1 == -1) && gameBoard[loc[0]][loc[1]] != ""){
        satir1 = loc[0]; sutun1 = loc[1];
    }else if ((satir2 == -1) && (sutun2 == -1) && !((satir1 == loc[0]) && (sutun1 == loc[1])) && gameBoard[loc[0]][loc[1]] != ""){
        satir2 = loc[0]; sutun2 = loc[1];
        let c1 = gameBoard[satir1][sutun1];
        let c2 = gameBoard[satir2][sutun2];
        let i1 = getWordIndex(words, c1);
        let i2 = getWordIndex(words, c2);
        
        if (floor(i1/2) == floor(i2/2)){
            score+=10; 
            gameBoard[satir1][sutun1]=""; 
            gameBoard[satir2][sutun2]="";
            matchedPair++;
            
            if (isGameBoardEmpty()) {
                gameWin(); // Level bitti
            }
        } else { 
            score-=2; 
        }
        counter = 0;
    }
}

function isMouseInGameBoard(x,y){return y<400;}
function getCellLocation(x,y){return [floor(y/100), floor(x/100)];}
function getWordIndex(arr,s){for(let k=0;k<arr.length;k++) if(arr[k]==s) return k; return -1;}
function isGameBoardEmpty(){
    for(let r=0;r<4;r++) for(let c=0;c<4;c++) if(gameBoard[r][c]!="") return false;
    return true;
}
function selectText() { let w=mixedWords[i]; i++; i=i%16; return w; }

function drawGameBoard(){
    background("white");
    for(let r=0;r<4;r++){
        if(gameStart) gameBoard[r]=[];
        for(let c=0;c<4;c++){
            fill("white"); if(gameBoard[r][c]=="") fill("black");
            if(satir1==r && sutun1==c) fill("yellow");
            if(satir2==r && sutun2==c) fill("orange");
            rect(c*100,r*100,100,100);
            if(gameStart) gameBoard[r][c] = selectText();
            fill("black");
            let w=gameBoard[r][c];
            if(isEmoji(w)) textSize(60); else textSize(20);
            text(w, c*100+50, r*100+50);
        }
    }
    textSize(30); text("Puan: "+score, 200, 450);
    if(gameStart) gameStart=false;
}
`
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("CodeLoader: Initializing...");

  // Her adim icin kodlari yerlestir
  for (let i = 1; i <= 8; i++) {
    const stepId = "step" + i;
    const codeId = "code-step" + i;
    const container = document.getElementById(codeId);

    if (container) {
      let code = codeSnippets[stepId];
      if (!code) {
        code = "// Bu adim icin kod henuz eklenmedi.";
      }

      container.innerHTML = "";

      const textArea = document.createElement("textarea");
      textArea.value = code;
      container.appendChild(textArea);

      const editor = CodeMirror.fromTextArea(textArea, {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        readOnly: true, // Kullanici duzenleyemesin
        viewportMargin: Infinity
      });

      // Kopyala Butonu Ekle
      const copyBtn = document.createElement("button");
      copyBtn.innerText = "📋 Kopyala";
      copyBtn.className = "copy-btn";
      copyBtn.style.cssText = "position: absolute; top: 10px; right: 10px; z-index: 10; padding: 5px 10px; background: #444; color: white; border: none; cursor: pointer; border-radius: 4px; font-size: 0.8rem; opacity: 0.7;";

      copyBtn.addEventListener("mouseover", () => copyBtn.style.opacity = "1");
      copyBtn.addEventListener("mouseout", () => copyBtn.style.opacity = "0.7");

      container.style.position = "relative";
      container.appendChild(copyBtn);

      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(code).then(() => {
          const originalText = copyBtn.innerText;
          copyBtn.innerText = "✅ Kopyalandı!";
          setTimeout(() => copyBtn.innerText = originalText, 2000);
        });
      });

      // Details acildiginda editoru refresh et
      const details = container.closest("details");
      if (details) {
        details.addEventListener("toggle", function () {
          // Sadece acilirken refresh yap
          if (details.open) {
            setTimeout(() => {
              editor.refresh();
            }, 10);
          }
        });
      }
    }
  }
});
