let en = ['red', 'black', 'blue', 'green', 'white', 'yellow', 'orange', 'gray'];
let tr = ['kırmızı', 'siyah', 'mavi', 'yeşil', 'beyaz', 'sarı', 'turuncu', 'gri'];
let en_used = [false, false, false, false, false, false, false, false];
let tr_used = [false, false, false, false, false, false, false, false];

function setup() {
  createCanvas(400, 400);
  let r = allTrue(en_used);
  for(let i = 0; i < 16; i++){
    let a = selectText();
    print(a);
  }
}

function draw() {
  for(let y = 0; y < 400; y+= 100){
    for(let x = 0; x < 400; x += 100){
      rect(x,y,100,100);
    }
  }
}

function allTrue(a){
  for (let i = 0; i < a.length; i++){
    if (a[i] == false){
      return false;
    }
  }
  return true;
}

function selectText(){
  let r = random();
  let p = allTrue(en_used);
  if ((r < 0.5) && !p){
    while(true){
      a = Math.floor(random(8));
      if (en_used[a] == false){
        en_used[a] = true;
        return en[a];
      }
    }
    return en[a];
  }else{
    while(true){
      a = Math.floor(random(8));
      if (tr_used[a] == false){
        tr_used[a] = true;
        return tr[a];
      }
    }
    return tr[a];
  }
}

