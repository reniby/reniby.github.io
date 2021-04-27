
let page = 0;
//0 = home
//10 = flock home, 11 = read, 12 = sim, 13 = live
//20 = nest home, 30 = neuron home

function preload() {
  chw = 350
  chh = 210
  nest = loadImage('assets/nest.jpg');
  flockim = loadImage('assets/flock.jpeg');
  neuron = loadImage('assets/neuron.jpg');
  bg = loadImage('assets/background.jpg');
  read = loadImage('assets/read.PNG');
  sax = loadImage('assets/sax.jpg');
  sim = loadImage('assets/sim.jpg');
}
function setup() {
  createCanvas(300, 800);
  
  chw = 350
  chh = 210
  createCanvas(windowWidth, windowHeight);
  
  bg.resize(windowWidth, windowHeight);
  
  nest.resize(chw, chh);
  flockim.resize(chw, chh);
  neuron.resize(chw, chh);
  read.resize(0, chh-10);
  sax.resize(0, chh-10);
  sim.resize(0, chh);
  
  image(bg, 0, 0);
  
}

function draw() {
  background(255);
  tint(255, 225);
  image(bg, 0, 0);
  chw = 350
  chh = 210
  
  
  
  //home pages
  if (page == 0) {
    textSize(50);
    textFont('Georgia');
    fill('white');
    stroke('black');
    textAlign(CENTER);
    text('Topics to Explore:', windowWidth/2, windowHeight/8);

    tint(255, 255);
    textSize(30);
    textAlign(LEFT);
    image(flockim, windowWidth/2 - 100 - chw, windowHeight/4.5);
    text("Flocking", windowWidth/2 - chw + 10, windowHeight/4.5 + chh + 30);
    image(nest, windowWidth/2 + 100, windowHeight/4.5);
    text("Nesting", windowWidth/2 + 210, windowHeight/4.5 + chh + 30);
    image(neuron, windowWidth/2 - chw/2, windowHeight/4*2.4);
    text("Neurons", windowWidth/2 - chw/2 + 110, windowHeight/4*2.4 + chh + 30);
  }

  
  
  
}