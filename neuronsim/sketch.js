let bactive = false, hactive = false
let bcurr, hcurr, bwcurr, hwcurr

//range, atonal, upbeats, q, w, e, other, interval
let q = [6, 0, 1, 2, 0, 2, 0, 1]
let w = [5, 0, 1, 1, 0, 1, 1, 1]
let e = [1, 0, 2, 1, 0, 3, 0, 0]
let r = [3, 1, 0, 4, 0, 0, 0, 1]
let t = [1, 0, 2, 1, 0, 3, 0, 0]
let y = [12, 0, 0, 3, 0, 0, 0, 10]
let u = [1, 0, 0, 0, 1, 0, 0, 0]
let i = [6, 1, 1, 1, 0, 0, 0, 5]
let bird = [q,w,e,r,t,y,u,i] //0-7
let bavg = [4.375, 0.25, 0.875, 1.625, 0.125, 1.125, 0.125, 2.25]

let a = [11, 0, 2, 1, 0, 4, 1, 8]
let s = [14, 1, 5, 1, 0, 9, 2, 7]
let d = [13, 1, 3, 0, 0, 4, 3, 13]
let f = [11, 1, 4, 0, 0, 6, 0, 10]
let g = [6, 0, 4, 0, 0, 5, 1, 6]
let h = [6, 0, 0, 8, 0, 0, 0, 5]
let j = [10, 0, 3, 2, 0, 7, 0, 5]
let k = [16, 0, 5, 1, 0, 7, 2, 5]
let human = [a,s,d,f,g,h,j,k]
let havg = [10.875, 0.375, 3.25, 1.625, 0, 5.25, 1.125, 7.375]

function preload() {
  bg = loadImage('background.jpg')
  back = loadImage('back.jpg')
}

function setup() {
  x = windowWidth
  y = windowHeight
  createCanvas(x, y)
  
  bg.resize(windowWidth, windowHeight);
  image(bg, 0, 0);
  back.resize(50, 0);
  
  b17 = loadSound('wavs/b17.mp3');
  b18 = loadSound('wavs/b18.mp3');
  b19 = loadSound('wavs/b19.mp3');
  b20 = loadSound('wavs/b20.mp3');
  b21 = loadSound('wavs/b21.mp3');
  b22 = loadSound('wavs/b22.mp3');
  b23 = loadSound('wavs/b23.mp3');
  b24 = loadSound('wavs/b24.mp3');
  bw = [b17, b18, b19, b20, b21, b22, b23, b24]
  
  h17 = loadSound('wavs/h17.mp3');
  h19 = loadSound('wavs/h19.mp3');
  h21 = loadSound('wavs/h21.mp3');
  h23 = loadSound('wavs/h23.mp3');
  h25 = loadSound('wavs/h25.mp3');
  h27 = loadSound('wavs/h27.mp3');
  h29 = loadSound('wavs/h29.mp3');
  h31 = loadSound('wavs/h31.mp3');
  hw = [h17, h19, h21, h23, h25, h27, h29, h31]
  
}

function draw() {
  
  fill(220)
  
  textSize(15);
  fill('white');
  rect(50, 50, 80, 80);
  fill('black');
  text('Back', 90, 120);
  image(back, 65, 60);
  
  fill(220)
  rect(300, 0, x-600, y) 
  
  fill('black')
  textSize(40)
  textAlign(CENTER)
  textFont('Georgia');
  text('Compare Human and Bird Neurons', x/2, y/10)
  textSize(16)
  textLeading(30)
  text('Press play to hear one random neuron from either part.\nAlong with the recording, you will see data related to the parameters the computer used to compose each part.\nHuman neurons were much freer: they had a larger pitch range available and more note variety.\nThe data (for each neuron and on average) will show in practice how the two neurons differed.', x/4.5, y/7, x/1.8, y)
  
  line(x/2, y/3, x/2, y*0.9);
  
  fill('green')
  rect(x/4, y/2.8, x/22, x/22)
  fill('white')
  triangle(x/3.9, y/2.7, x/3.55, y/2.7+x/60, x/3.9, y/2.7+x/30)
  textStyle(BOLD)
  textSize(20)
  fill('black')
  text("Human Neuron", x/2.8, y/2.45)
  textStyle(NORMAL)
  
  add = x/3.5
  fill('green')
  rect(x/4+add, y/2.8, x/22, x/22)
  fill('white')
  triangle(x/3.9+add, y/2.7, x/3.55+add, y/2.7+x/60, x/3.9+add, y/2.7+x/30)
  textStyle(BOLD)
  textSize(20)
  fill('black')
  text("Bird Neuron", x/2.9+add, y/2.45)
  textStyle(NORMAL)
  
  //range, atonal, upbeats, q, w, e, other, interval
  if (hactive){
    fill('green')
    rect(x/2.38, y/2.7, x/20, x/45)
    fill('white')
    text("Repeat", x/2.25, y/2.5)
    fill('black')
    textSize(x/90)
    textAlign(LEFT)
    textLeading(x/40)
    text("Range from lowest to high pitch*: \nNumber of atonal notes: \nNumber of notes on upbeats: \nNumber of quarter notes: \nNumber of whole notes: \nNumber of eight notes: \nOther rhythmic lengths: \nLargest interval jump*: \n*Range and jump are measured in half steps", x/4.5, y/2)
    for (let i = 0; i < 8; i++){
      print('hi')
      textStyle(BOLD)
      text(hcurr[i] + "   (Avg: " + havg[i] + ")", x/2.5, y/2+x/40*i)
      textStyle(NORMAL)
    }
    textAlign(CENTER)
  }
  if (bactive){
    fill('green')
    rect(x/2.38+add, y/2.7, x/20, x/45)
    fill('white')
    text("Repeat", x/2.25+add, y/2.5)
    fill('black')
    textSize(x/90)
    textAlign(LEFT)
    textLeading(x/40)
    text("Range from lowest to high pitch*: \nNumber of atonal notes: \nNumber of notes on upbeats: \nNumber of quarter notes: \nNumber of whole notes: \nNumber of eight notes: \nOther rhythmic lengths: \nLargest interval jump*: \n*Range and jump are measured in half steps", x/4.5+add, y/2)
    for (let i = 0; i < 8; i++){
      textStyle(BOLD)
      text(bcurr[i] + "   (Avg: " + bavg[i] + ")", x/2.5+add, y/2+x/40*i)
      textStyle(NORMAL)
    }
    textAlign(CENTER)
  }
  
}

function bactivate() {
  curr = int(random(8))
  bcurr = bird[curr]
  bwcurr = bw[curr]
  checkPlay()
  bwcurr.play()
  bactive = true
}
function hactivate() {
  curr = int(random(8))
  hcurr = human[curr]
  hwcurr = hw[curr]
  checkPlay()
  hwcurr.play()
  hactive = true
}

function checkPlay() {
  for (let i = 0; i < 8; i++){
    if (bw[i].isPlaying()){
      bw.stop()
    }
    if (hw[i].isPlaying()){
      hw.stop()
    }
  }
}

function mouseClicked() {
  if (mouseX > x/4 && mouseX < x/4+x/22 && mouseY > y/2.8 && mouseY < y/2.8+x/22) {
    hactivate()
  }
  if (mouseX > x/4+x/3.5 && mouseX < x/4+x/3.5+x/22 && mouseY > y/2.8 && mouseY < y/2.8+x/22) {
    bactivate()
  }
  if (mouseX > x/2.38 && mouseY > y/2.7 && mouseX < x/2.38+x/20 && mouseY < y/2.7+x/45){
    checkPlay()
    hwcurr.play()
  }
  if (mouseX > x/2.38+x/3.5 && mouseY > y/2.7 && mouseX < x/2.38+x/20+x/2.5 && mouseY < y/2.7+x/45){
    checkPlay()
    bwcurr.play()
  }
}