const flock = [];
let bb;
let temp = 0;
let synth;
let env;
let feedbackDelay;
let ns = 0.1;

let bool = 0;


var notes = [];

var pianoKeys = ["whiteC3", "blackCs", "whiteD", "blackEb", "whiteE", "whiteF", "bFs", "whiteG", "blackAb", "whiteA", "blackBb", "whiteB", "whiteC4"]

var  playing = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let startX;
let startY;


class blu {
    constructor() {
      this.position = createVector(0, 0);
      this.leader = 0;
    }
}

function preload() {
  bg = loadImage('background.jpg');
  back = loadImage('back.jpg');
  
  notes[0] = loadSound("notes/c.mp3");
  notes[1] = loadSound("notes/cs.mp3");
  notes[2] = loadSound("notes/d.mp3");
  notes[3] = loadSound("notes/ds.mp3");
  notes[4] = loadSound("notes/e.mp3");
  notes[5] = loadSound("notes/f.mp3");
  notes[6] = loadSound("notes/fs.mp3");
  notes[7] = loadSound("notes/g.mp3");
  notes[8] = loadSound("notes/gs.mp3");
  notes[9] = loadSound("notes/a.mp3");
  notes[10] = loadSound("notes/as.mp3");
  notes[11] = loadSound("notes/b.mp3");
}


let alignSlider, cohesionSlider, separationSlider;
let tom;

function setup() {
  createCanvas(windowWidth-0.5, windowHeight-0.4);
  startX = 0;
  startY = windowHeight-0.4 - 270;
  
  
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
  
  alignSlider.position(windowWidth-350+windowWidth/20, windowHeight/10); 
  cohesionSlider.position(windowWidth-350+windowWidth/20, windowHeight/10*2.2);
  separationSlider.position(windowWidth-350+windowWidth/20, windowHeight/10*3.4);
  
  feedbackDelay = new Tone.FeedbackDelay("4n", 0.5).toMaster();
  tom = new Tone.DuoSynth().connect(feedbackDelay); //duo, poly
  
  for (let i = 0; i < 200; i++) {
    if (i % 20 == 0)
      flock.push(new Boid(1));
    else
      flock.push(new Boid(0));
  }

  bb = new blu();
  
  synth = new Tone.DuoSynth().toMaster();
  
  
  //feed = createSlider(25, 100, 40);
  //feed.position(0, height+20);
  feed = 80;
  //////////

  source = new p5.Amplitude()
  //source = new p5.AudioIn();
  //source.start();

  lowPass = new p5.LowPass();
  lowPass.disconnect();
  //source.connect(lowPass);

  fft = new p5.FFT();
  fft.setInput(lowPass);
  
  back.resize(50, 0);
  bg.resize(windowWidth, windowHeight);
  
  //////////////////////////
  
  pianoKeys[0] = 250;
  pianoKeys[2] = 250;
  pianoKeys[4] = 250;
  pianoKeys[5] = 250;
  pianoKeys[7] = 250;
  pianoKeys[9] = 250;
  pianoKeys[11] = 250;
  
  pianoKeys[1] = 25;
  pianoKeys[3] = 25;
  pianoKeys[6] = 25;
  pianoKeys[8] = 25;
  pianoKeys[10] = 25;

}


function draw() {
  fill(220);
  image(bg, 0, 0)
  rect(350, 0, windowWidth-700, windowHeight);
  
  
  rect(windowWidth-350+windowWidth/25, windowHeight/11, windowWidth/10, windowHeight/2.8);
  
  rect(35, windowHeight/1.55, 350-70, windowHeight/10);
  fill('black');
  text('Play notes to "lead" the flock!', 50, windowHeight/1.46);
  text('Your note will be a blue boid', 50, windowHeight/1.39);
  
  textSize(20);
  textFont('Georgia');
  fill('black');
  stroke('black');
  textAlign(LEFT);
  text('Alignment', windowWidth-320+windowWidth/25, windowHeight/11+50);
  text('Cohesion', windowWidth-320+windowWidth/25, windowHeight/11*2.2+60);
  text('Seperation', windowWidth-320+windowWidth/25, windowHeight/11*3.4+70);
  
  textSize(20);
  fill('white');
  rect(50, 50, 80, 80);
  fill('black');
  text('Back', 68, 120);
  image(back, 60, 60);
  
  //feedbackDelay.set({
	//feedback: ns
  //});
  
  let leader = 0;
  
  var timeDomain = fft.waveform(1024, 'float32');
  var corrBuff = autoCorrelate(timeDomain);
  
  let vol = source.getLevel();
  let xaxis = map(vol, 0, 1, 0, width*2 + 50);
  

  var ffreq = findFrequency(corrBuff);
  let pitch = ffreq.toFixed(2);
  //text (pitch, 20, 50); 
  
  if (abs(pitch - temp) < 5)
    count++;
  else
    count = 0;
  
  temp = pitch;

  
  ///////////////////////////
  
  
  for (let i = 0; i < flock.length; i++) {    
    let boid = flock[i];
    let freq = boid.position.y;

    if (boid.type == 1 && bool == 0) {
      //let freq = height - boid.position.y + 100;   
      scale = [168.814, 184.997, 207.652, 220, 246.942, 277.183, 311.127, 329.628].map(function(x) { return x + 0 });
      if (freq < 100)
        freq = scale[7];
      else if (freq < 200)
        freq = scale[6];
      else if (freq < 300)
        freq = scale[5];
      else if (freq < 400)
        freq = scale[4];
      else if (freq < 500)
        freq = scale[3];
      else if (freq < 600)
        freq = scale[2];
      else if (freq < 700)
        freq = scale[1];
      else
        freq = scale[0];

      //synth.triggerAttackRelease(freq, "8n");
      tom.triggerAttackRelease(freq, "16n");
    }  
    
    bool++;
    
    if (bool > feed)//.value())
      bool = 0;
    
    boid.edges();
    boid.flock(flock, bb);
    boid.update();
    boid.show(); 
  }  
  
  
  stroke('black');
  fill('blue');

  if (bb.leader > 0)
    ellipse(bb.position.x, bb.position.y, 10);
  
  
  //////////////
  
  
  //shadow
  fill(0);
  rect(0+startX,80+startY,480,190);
  
  //white keys
  
  
  //c
  fill (pianoKeys[0]);
  rect (startX+30,startY+80,60,180);
  if (((startX+30<mouseX)&&(startX+70>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY))|| ((startX+30<mouseX)&&(startX+90>mouseX)&&(startY+180<mouseY)&&(startY+260>mouseY))){
    if (mouseIsPressed) {
      pianoKeys[0] = 200;
      notes[0].play();
      playing[0] = 1;
      }
    else {
      pianoKeys[0] = 250;
    }
  }
  
  //d
  fill (pianoKeys[2]);
  rect (startX+90,startY+80,60,180);
  if ((startX+110<mouseX)&&(startX+130>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)||(startX+90<mouseX)&&(startX+150>mouseX)&&(startY+180<mouseY)&&(startY+260>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[2] = 200;
        notes[2].play();
        playing[2] = 1;
        }
      else {
        pianoKeys[2] = 250;
      }
  }
  
  //e
  fill (pianoKeys[4]);
  rect (startX+150,startY+80,60,180);
  if ((startX+170<mouseX)&&(startX+210>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)||(startX+150<mouseX)&&(startX+210>mouseX)&&(startY+180<mouseY)&&(startY+260>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[4] = 200;
        notes[4].play();
        playing[4] = 1;
        }
      else {
        pianoKeys[4] = 250;
      }
  }
  
  //f
  fill (pianoKeys[5]);
  rect (startX+210,startY+80,60,180);
  if ((startX+210<mouseX)&&(startX+250>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)||(startX+210<mouseX)&&(startX+270>mouseX)&&(startY+180<mouseY)&&(startY+260>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[5] = 200;
        notes[5].play();
        playing[5] = 1;
        }
      else {
        pianoKeys[5] = 250;
      }
  }
  
  //g
  fill (pianoKeys[7]);
  rect (startX+270,startY+80,60,180);
  if ((startX+290<mouseX)&&(startX+310>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)||(startX+270<mouseX)&&(startX+330>mouseX)&&(startY+180<mouseY)&&(startY+260>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[7] = 200;
        notes[7].play();
        playing[7] = 1;
        }
      else {
        pianoKeys[7] = 250;
      }
  }
  
  //a
  fill (pianoKeys[9]);
  rect (startX+330,startY+80,60,180);
  if ((startX+350<mouseX)&&(startX+370>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)||(startX+330<mouseX)&&(startX+390>mouseX)&&(startY+180<mouseY)&&(startY+260>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[9] = 200;
        notes[9].play();
        playing[9] = 1;
        }
      else {
        pianoKeys[9] = 250;
      }
  }
  
  //b
  fill (pianoKeys[11]);
  rect (startX+390,startY+80,60,180);
  if ((startX+410<mouseX)&&(startX+450>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)||(startX+390<mouseX)&&(startX+450>mouseX)&&(startY+180<mouseY)&&(startY+260>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[11] = 200;
        notes[11].play();
        playing[11] = 1;
        }
      else {
        pianoKeys[11] = 250;
      }
  }
  
  
  
//black keys
  
  //c sharp
  fill (pianoKeys[1]);
  rect (startX+70,startY+80,40,100);
  if ((startX+70<mouseX)&&(startX+110>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[1] = 0;
        notes[1].play();
        playing[1] = 1;
        }
      else {
        pianoKeys[1] = 25;
      }
  }
  
  //e flat
  fill (pianoKeys[3]);
  rect (startX+130,startY+80,40,100);
  if ((startX+130<mouseX)&&(startX+170>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[3] = 0;
        notes[3].play();
        playing[3] = 1;
        }
      else {
        pianoKeys[3] = 25;
      }
  }
  
   //f sharp
  fill (pianoKeys[6]);
  rect (startX+250,startY+80,40,100);
  if ((startX+250<mouseX)&&(startX+290>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[6] = 0;
        notes[6].play();
        playing[6] = 1;
        }
      else {
        pianoKeys[6] = 25;
      }
  }
  
  //a flat
  fill (pianoKeys[8]);
  rect (startX+310,startY+80,40,100);
  if ((startX+310<mouseX)&&(startX+350>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[8] = 0;
        notes[8].play();
        playing[8] = 1;
        }
      else {
        pianoKeys[8] = 25;
      }
  }
  
  //b flat
  fill (pianoKeys[10]);
  rect (startX+370,startY+80,40,100);
  if ((startX+370<mouseX)&&(startX+410>mouseX)&&(startY+80<mouseY)&&(startY+180>mouseY)){
      if (mouseIsPressed) {
        pianoKeys[10] = 0;
        notes[10].play();
        playing[10] = 1;
      }
      else {
        pianoKeys[10] = 25;
      }
  }
  
  //red line
  fill (200,0,0);
  rect(0+startX,75+startY,480,5);
  
  
  
  temptest = false;
  for (let i = 0; i < 12; i++){
     if (notes[i].isPlaying()){
       playing[i]++;
       bb.position.x =  (windowWidth/2 - (windowWidth-700)/4 + xaxis)/2.2 + windowWidth/16;
       bb.position.y = windowHeight - (windowHeight/12 * i + windowHeight/24);
       bb.leader = 1;
       temptest = true;
     }
  }
    //print(bb.leader)
  if (temptest)
    bb.leader = 1
  else
    bb.leader = 0
  
}

function mouseClicked() {
  Tone.context._context.resume();
   for (let i = 0; i < 12; i++){
     if (playing[i] > 5){
       notes[i].stop();
       playing[i] = 0;
     }
  }
}

