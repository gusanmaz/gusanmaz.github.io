let words = ['red', 'kirmizi', 'black', 'siyah', 'blue', 'mavi', 'green', 'yesil', 'white', 'beyaz', 'yellow', 'sari', 'orange', 'turuncu', 'gray', 'gri'];
let words_used = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  for(let y = 0; y < 400; y+= 100){
    for(let x = 0; x < 400; x += 100){
      rect(x,y,100,100);
    }
  }
  for (let satir = 0; satir < 4; satir++){
    for (let sutun = 0; sutun < 4; sutun++){
      let word = selectText();
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
  let r = isAllTrue(words_used)
  if (r == true){
    return "ERROR";
  }
  for(;;){
    let i = floor(random(16));
    if (words_used[i] == false){
      let word = words[i];
      words_used[i] = true;
      return word;
    }
  }
}

