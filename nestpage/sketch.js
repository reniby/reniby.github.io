
let page = 20;
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
  back = loadImage('assets/back.jpg');
  home = loadImage('assets/home.PNG');
  eggs = loadImage('assets/eggs.jpg');
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
  
  back.resize(50, 0);
  home.resize(65, 0);
  eggs.resize(230,0);
  
  image(bg, 0, 0);
  
}

function draw() {
  background(255);
  tint(255, 225);
  image(bg, 0, 0);
  chw = 350
  chh = 210
  
  if (page%10 != 0){
    textSize(20);
    fill('white');
    rect(windowWidth-130, 50, 80, 80);
    fill('black');
    text('Back', windowWidth-113, 120);
    image(back, windowWidth-115, 55);
  }
  if (page != 0){
    textSize(20);
    fill('white');
    rect(50, 50, 80, 80);
    fill('black');
    text('Home', 63, 120);
    image(home, 58, 55);
  }
  
  
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
  else if (page == 10 || page == 20 || page == 30){
    if (page == 10)
      currtitle = 'Flocking Patterns:';
    else if (page == 20)
      currtitle = 'Nest Parasitization:';
    else
      currtitle = 'Bird & Human Neurons:';
    
    textSize(50);
    textFont('Georgia');
    fill('white');
    stroke('black');
    textAlign(CENTER);
    text(currtitle, windowWidth/2, windowHeight/8);

    tint(255, 255);
    textSize(30);
    textAlign(LEFT);
    
    imageMode(CENTER);
    rect(windowWidth/2 - 100 - chw, windowHeight/4.5, chw, chh);
    image(read, windowWidth/2 - 100 - chw/2, windowHeight/4.5 + chh/2);
    text("Read More", windowWidth/2 - chw + 10, windowHeight/4.5 + chh + 30);
    
    rect(windowWidth/2 + 100, windowHeight/4.5, chw, chh);
    image(sim, windowWidth/2 + 100 + chw/2, windowHeight/4.5 + chh/2);
    text("Try Simulation", windowWidth/2 + 175, windowHeight/4.5 + chh + 30);
    
    rect(windowWidth/2 - chw/2, windowHeight/4*2.4, chw, chh);
    image(sax, windowWidth/2, windowHeight/4*2.4 + chh/2);
    text("Recorded Performance", windowWidth/2 - chw/2 + 30, windowHeight/4*2.4 + chh + 30);
    
    imageMode(CORNER);
  }
  else{
    fill(220);
    rect(350, 50, windowWidth-700, windowHeight-100);
    fill('black');
    textSize(20);
    textStyle(NORMAL);
    text("Cowbirds are nest parasitizers. This means they lay their eggs in the nests of songbirds, and never raise their young themselves. They stay in the area with their young until they are old enough to join the cowbird flock. Songbird nestlings suffer from this, because the more nestlings, the less food each bird will receive. My program uses three parameters to simulate the evolution of both birds.\n", 400, 100, windowWidth-800, windowHeight-200);
    textStyle(BOLD);
    text("Violence (both):", 400, 250, windowWidth-800, windowHeight-200); 
    textStyle(NORMAL);
    text("Determines whether songbirds will kill cowbird eggs or simply relocate to a new nest. Cowbirds may also retaliate if songbirds are violent. \n", 400, 280, windowWidth-800, windowHeight-200);
    textStyle(BOLD);
    text("Recognition (Songbirds):", 400, 340, windowWidth-800, windowHeight-200);
    textStyle(NORMAL);
    text("Determines if songbirds realize that the cowbird eggs are foreign \n", 400, 370, windowWidth-800, windowHeight-200);
    textStyle(BOLD);
    text("Food Available:", 400, 410, windowWidth-800, windowHeight-200); 
    textStyle(NORMAL);
    text("Since cowbird nestlings are louder and larger, they will get fed first. Less food means more songbirds nestlings will not survive, while more food will cancel out the negative effects of parasitization.  \n", 400, 440, windowWidth-800, windowHeight-200);
    text("Changing these parameters will change how these birds evolve throughout the simulation. Each generation of birds will have offspring with their parents genes. Only those birds that survive will carry on their genes, simulating natural selection.", 400, 540, windowWidth-800, windowHeight-200);
  }
  
  
  
}

function mouseClicked() {
  if (mouseX >= windowWidth/2 - 100 - chw && mouseY >= windowHeight/4.5 && mouseX <= windowWidth/2 - 100 && mouseY <= windowHeight/4.5 + chh) {
    if (page == 0)
      page = 10;
    else if (page == 10 || page == 20 || page == 30)
      page += 1;
  }
  
  if (mouseX > windowWidth-50-80 && mouseX < windowWidth-50 && mouseY > 50 && mouseY < 50+80 && page != 10){
    if (page % 10 != 0)
      page -= page % 10;
    else
      page = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
