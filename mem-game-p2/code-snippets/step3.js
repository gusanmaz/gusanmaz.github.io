let words = ['red', 'kirmizi', 'black', 'siyah', 'blue', 'mavi', 'green', 'yesil', 'white', 'beyaz', 'yellow', 'sari', 'orange', 'turuncu', 'gray', 'gri'];
let mixedWords = [];
let i = 0;
let gameBoard = [];
let satir1 = -1;
let sutun1 = -1;
let satir2 = -1;
let sutun2 = -1;
let counter = -1;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  mixedWords = shuffle(words);
  drawGameBoard();
}

function draw() {
  if (counter != -1){
    counter++;
  }
  if (counter == 120){
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
  i = i % 16;
  return word;
}

function mousePressed(){
  let loc = getCellLocation(mouseX, mouseY);
  if ((satir1 == -1) && (sutun1 == -1)){
    satir1 = loc[0];
    sutun1 = loc[1];
  }else if ((satir2 == -1) && (sutun2 == -1) && !((satir1 == loc[0]) && (sutun1 == loc[1]))){
    satir2 = loc[0];
    sutun2 = loc[1];
    let color1 = gameBoard[satir1][sutun1];
    let color2 = gameBoard[satir2][sutun2];
    let ind1 = getWordIndex(words, color1);
    let ind2 = getWordIndex(words, color2);
    let a1 = floor(ind1 / 2);
    let a2 = floor(ind2 / 2);
    if (a1 == a2){
      print("Pair buldum");
    }else{
      print("Pair bulamadim");
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
  for(let i = 0; i < arr.length; i++){
    if (arr[i] == str){
      return i;
    }
  }
  return -1;
}

function drawGameBoard(){
  for (let satir = 0; satir < 4; satir++){
    gameBoard[satir] = [];
    for (let sutun = 0; sutun < 4; sutun++){
      fill('white');
      if ((satir1 == satir) && (sutun1 == sutun)){
        fill("yellow");
      }
      if ((satir2 == satir) && (sutun2 == sutun)){
        fill("orange");
      }
      rect(sutun * 100, satir * 100, 100,100);
      let word = selectText();
      gameBoard[satir][sutun] = word;
      fill('black');
      text(word, sutun * 100 + 50, satir * 100 + 50);
    }
  }
}

