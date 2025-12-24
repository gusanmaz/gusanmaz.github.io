let words = ['red', 'kirmizi', 'black', 'siyah', 'blue', 'mavi', 'green', 'yesil', 'white', 'beyaz', 'yellow', 'sari', 'orange', 'turuncu', 'gray', 'gri'];
let mixedWords = [];
let i = 0;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  for(let y = 0; y < 400; y+= 100){
    for(let x = 0; x < 400; x += 100){
      rect(x,y,100,100);
    }
  }
  mixedWords = shuffle(words);
  for (let satir = 0; satir < 4; satir++){
    for (let sutun = 0; sutun < 4; sutun++){
      let word = selectText();
      print(word);
      text(word, sutun * 100 + 50, satir * 100 + 50);
    }
  }
}

function draw() {
  noLoop();
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
  i = i % 16;
  return word;
}

function mousePressed(){
  print("MouseX:", mouseX);
  print("MouseY:", mouseY);
}

