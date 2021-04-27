let inSim, mode, gen
let one = 0, two = 0, three = 0

function preload() {
  cow = loadImage('cow.png');
  song = loadImage('song.png');
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
  
  inSim = false
  mode = -1
  gen = 0
  
  cow.resize(x/15, 0)
  song.resize(x/17, 0)
  
  
  LLL = [1, 2, 3, 54, 100, //song violence, recog, cow violence, cow, song
1, 3, 3, 22, 82,
2, 3, 3, 8, 32,
3, 3, 3, 4, 8,
3, 2, 2, 2, 4,
5, 1, 0, 2, 1,
5, 1, 8, 4, 1,
4, 1, 5, 5, 2,
4, 1, 5, 7, 2,
4, 2, 4, 7, 2]
  LLH = [1, 7, 2, 58, 100,
1, 7, 2, 19, 100,
1, 6, 2, 4, 38,
1, 7, 2, 0, 8,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0]
  LHL = [3, 3, 8, 98, 46,
3, 3, 6, 98, 38,
3, 3, 5, 100, 40,
3, 2, 4, 98, 35,
3, 2, 4, 82, 29,
3, 2, 5, 78, 31,
3, 3, 5, 72, 25,
3, 3, 4, 71, 24,
3, 3, 4, 70, 23,
3, 3, 4, 70, 25]
  LHH = [3, 8, 8, 57, 100,
3, 8, 8, 23, 100,
3, 8, 8, 3, 46,
3, 8, 8, 1, 6,
5, 8, 7, 0, 2,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0,
0, 0, 0, 0, 0]
  HLL = [1, 3, 3, 109, 103,
1, 2, 3, 121, 100,
1, 2, 3, 144, 99,
1, 2, 3, 173, 100,
1, 2, 4, 216, 107,
1, 2, 4, 289, 125,
2, 2, 5, 397, 158,
2, 2, 4, 573, 220,
2, 2, 5, 851, 314,
2, 2, 5, 1218, 451]
  HLH = [1, 7, 2, 100, 100,
1, 8, 3, 102, 101,
1, 7, 3, 117, 106,
1, 7, 3, 132, 115,
1, 7, 3, 142, 124,
1, 7, 3, 146, 131,
1, 6, 3, 158, 137,
1, 6, 3, 165, 142,
2, 6, 3, 174, 143,
2, 6, 3, 217, 161]
  HHL = [1, 8, 3, 110, 103,
1, 7, 3, 119, 108,
1, 8, 2, 123, 113,
1, 7, 3, 138, 121,
1, 7, 3, 144, 129,
1, 7, 3, 154, 137,
1, 7, 3, 167, 138,
1, 7, 3, 191, 148,
1, 7, 3, 240, 168,
1, 7, 4, 294, 199]
  HHH = [3, 7, 8, 98, 100,
3, 7, 8, 102, 101,
3, 7, 8, 121, 104,
3, 7, 7, 142, 113,
3, 7, 7, 155, 119,
3, 7, 6, 183, 134,
3, 7, 6, 208, 155,
2, 7, 5, 233, 169,
2, 7, 5, 282, 192,
2, 7, 5, 347, 222]
  
  all = [LLL, LLH, LHL, LHH, HLL, HLH, HHL, HHH] //food, violence, recognition
  
  
  sel = createSelect();
  sel.position(x*9.15/10-50, y/3.8);
  sel.option('Low');
  sel.option('High');
  sel.changed(mySelectEvent);
  sel.size(100, 40);
  
  sell = createSelect();
  sell.position(x*9.15/10-50, y/2.6);
  sell.option('Low');
  sell.option('High');
  sell.changed(mySelectEvent);
  sell.size(100, 40);
  
  selll = createSelect();
  selll.position(x*9.15/10-50, y/1.92);
  selll.option('Low');
  selll.option('High');
  selll.changed(mySelectEvent);
  selll.size(100, 40);
  
}

function draw() {
  
  fill(220)
  
  textSize(15);
  fill('white');
  rect(50, 50, 80, 80);
  fill('black');
  text('Back', 85, 120);
  image(back, 60, 60);
  
  fill(220)
  rect(300, 0, x-600, y)
  
  
  dims = [x/3.5, y*8/10, x/2.9, y*8/10, x/2.45, y*8/10, x/3.1, y*6.7/10, x/2.6, y*6.7/10, x/3.5, y*5.4/10, x/2.9, y*5.4/10, x/2.45, y*5.4/10, x/3.1, y*4.1/10, x/2.6, y*4.1/10]
  
  fill('black')
  textSize(40)
  textAlign(CENTER)
  textFont('Georgia');
  text('Nest Parasitization Simulation', x/2, y/10)
  textSize(16)
  text('Set each of the three parameters to either low or high, and see how the bird populations react\nthrough 10 generations', x/4.5, y/7, x/1.8, y)
  textLeading(40)
  text('One bird image = 10 birds in the population\nRed tint on a bird group indicates the groups\' violence, more red birds = higher % of violence\nBlue bar indicates recognition, more blue = more able to recognize cowbird eggs\nView the recorded performance to hear this data turned to music', x/4.5, y/4.5, x/1.8, y)
  
  fill(220)
  rect(x*5.9/7, y/8, x/7, y/1.5)
  textStyle(BOLD)
  fill('black')
  text('Parameters', x*9.15/10, y/6)
  text('Food', x*9.15/10, y/4)
  fill('red')
  text('Violence', x*9.15/10, y/2.7)
  fill('blue')
  text('Recognition', x*9.15/10, y/2)
  fill('black')
  textStyle(NORMAL)
  fill('green')
  rect(x*8.7/10, y/1.52, 150, 50)
  fill('white')
  textLeading(20)
  text('Start\nSimulation', x*9.17/10, y/1.45)
  
  if (inSim){
    
      if (gen == 10){
        gen = 0;
        inSim = false;
        mode = -1;
      }
      else {
        fill('green')
        rect(x*0.73, y/1.6, 60, 80)
        fill('white')
        text('Next\n-->', x*0.75, y/1.5)
        
        if (gen != 0) {
          fill('green')
          rect(x*0.23, y/1.6, 60, 80)
          fill('white')
          text('Back\n<--', x*0.25, y/1.5)
        }
        
        temp = all[mode]


        songv = temp[5*gen]*2
        recog = temp[5*gen+1]
        cowv = temp[5*gen+2]
        songp = temp[5*gen+3]
        cowp = temp[5*gen+4]
        
        fill('black')
        index = 0
        
        textStyle(BOLD)
        text('Generation: ' + (gen+1), x/4, y/2)
        text('Songbirds', x/4.1, y/1.1)
        text('Cowbirds', x*3.1/4.1, y/1.1)
        textStyle(NORMAL)
        
        songratio = songp * (songv/10)
        for (let i = 0; i < songp; i+=10){
          if (songratio > 0){
            tint('red')
            image(song, dims[index], dims[index+1])
            tint('white')
            songratio-=10
          }
          else
            image(song, dims[index], dims[index+1])
          index+=2
        }
        
        
        index = 0
        add = x/4
        sub = y/20
        cowratio = cowp * (cowv/10)
        for (let i = 0; i < cowp; i+=10){
          if (cowratio > 0){
            tint('red')
            image(cow, dims[index]+x/4, dims[index+1]+sub)
            tint('white')
            cowratio -=10
          }
          else
            image(cow, dims[index]+x/4, dims[index+1]+sub)
          index+=2
        }
        
        fill(220)
        rect(x/2-x/100, y/2, x/50, y/2.5)
        percent = recog / 10
        blu = y/2.5 * percent
        fill('blue')
        rect(x/2-x/100, y/2+((y/2.5)-blu), x/50, blu)
        fill(220)
        
      }
     if (gen == 9){
        fill('red')
        rect(x*0.73, y/1.6, 80, 100)
        fill('white')
        text('End', x*0.75, y/1.45)
      }
      
      
  }
  
}

function mySelectEvent() {
  let val = -1, vall = -1, valll = -1
  if (sel.value() == 'Low')
    one = 0
  else
    one = 1
  if (sell.value() == 'Low')
    two = 0
  else
    two = 1
  if (selll.value() == 'Low')
    three = 0
  else
    three = 1
}

function checkMode() {
  let sum = 0
  let check = [three, two, one]
  for (let i = 0; i < 3; i++) {
    let bit = check[i]
    sum += parseInt(bit) * pow(2, i)
  }
  return sum;
}

function mouseClicked() {
    //if on start new: gen=0, mode= choices
  if (mouseX > x*8.7/10 && mouseY > y/1.6 && mouseX < x*8.7/10+180 && mouseY < y/1.6+100){
    gen = 0
    mode = checkMode()
    inSim = true
  }
    //if on next, gen++
  else if (mouseX > x*0.73 && mouseY > y/1.6 && mouseX < x*0.73+80 && mouseY < y/1.6+100 && inSim){
    gen++
  }
  else if (mouseX > x*0.23 && mouseY > y/1.6 && mouseX < x*0.23+60 && mouseY< y/1.6+80){
    gen--
  }
    //back/home will be thru html
}