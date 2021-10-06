let gameOver = false;
let side = false;
let count = 0;
let randomL = 0;
let randomR = 0;
let runL = 0; 
let runR = 0; 
let randRunL = 0;
let randRunR = 0; 
let first = true; 

const spike = {
  lx: 100, 
  ly: -500, 
  rx: 600,
  ry: -500,
  speed: 3,
};

const char = {
  x: 125,
  y: 32,
  vx: 1,
  vy: 0,
  size: 25,
};

function setup() {
  createCanvas(700, 700);
  frameRate(60);
}

function draw() {
  background(225, 246, 255);
  drawLevel();
  drawCharacter(char);
  moveCharacter(char);
  applyGravity(char);
  updateCharacter(char);
  drawSpikeLeft(spike.lx, spike.ly);
  drawSpikeRight(spike.rx, spike.ry);
  spikeLeft();
  spikeRight();
  collision();
  gameEnd();
}

// creates the background
function drawLevel() { 
  fill(154, 57, 41);
  rect(0, 0, 100, height);
  line(25, 0, 25, height);
  line(50, 0, 50, height);
  line(75, 0, 75, height);
  rect(width - 100, 0, 100, height);
  line(height - 25, 0, height - 25, height);
  line(height - 50, 0, height - 50, height);
  line(height - 75, 0, height - 75, height);
  noFill();
}

// makes the character fall
function applyGravity(character) {
  const g = 1;
  if (character.y + character.size < height) {
    character.vy += g;
  }
}

// collision on the walls and velocity 
function updateCharacter(character) {
  character.x += character.vx;
  character.y += character.vy;
  
  if (character.y + character.size >= height) {
    character.vy = 0;
    character.y = height - character.size;
    gameOver = true; 
  } else if (character.y - character.size <= 0) {
    character.vy = 0;
    character.y = 0 + character.size;
  }
  if (character.x + character.size >= width - 100) {
    character.vy = 0;
    character.x = width - 100 - character.size;
  } else if (character.x - character.size <= 100) {
    character.vy = 0;
    character.x = 100 + character.size;
  }
}

// creates the character
function drawCharacter(character) {
  fill(99, 141, 187); 
  circle(character.x, character.y, character.size * 2);
  fill(255, 255, 255);
  circle(character.x - 10, character.y - 7, character.size / 3);
  fill(255, 255, 255);
  circle(character.x + 10, character.y - 4, character.size / 3);
  noFill();
  circle(character.x - 10, character.y - 7, character.size / 10)
  circle(character.x + 10, character.y - 4, character.size / 10);
  arc(character.x, character.y + 5, 30, 15, 0.5, 110);
  fill(207, 255, 229);
}

// draws the left spike
function drawSpikeLeft(spikeX, spikeY) { 
  triangle(spikeX, spikeY - 30, spikeX + 100, spikeY - 15, spikeX, spikeY);
}

// draws the right spike
function drawSpikeRight(spikeX, spikeY) {
  triangle(spikeX, spikeY - 30, spikeX - 100, spikeY - 15, spikeX, spikeY)
}

// makes movement in the left spike
function spikeLeft() { 
  if (first != true) {
    runL++;
    randomL = random(30, 670);
    if (runL >= 150) {
      spike.ly = randomL;
      runL = 0;
      randomL = 0; 
    }
  }
}

// makes movement in the right spike
function spikeRight() {
  runR++;
  randomR = random(30, 670);
  if (runR >= 150) {
    spike.ry = randomR;
    runR = 0;
    randomR = 0; 
    first = false;
  }
}

// checks for when gameOver == true and loads the end screen and sets the coordinates back to original. Also controls the button
function gameEnd() {
  if (gameOver == true) {
    print("Game Over!")
    drawEnd();
    char.x = 125;
    char.y = 32;
    char.vx = 0;
    char.vy = 0;
    if (mouseIsPressed && (mouseX >= 225 && mouseX <= 500) && (mouseY >= 400 && mouseY <= 500)) {
      gameOver = false;
      first = true;
      spike.ly = -30;
      spike.lx = 100;
      spike.ry = -30;
      spike.rx = 600
    }
  }
}

// draws the end screen
function drawEnd() { 
  fill(0, 0, 0);
  rect(0, 0, 700, 700); 
  fill(255, 255, 255);
  textSize(50)
  text("Game Over!", 225, 350);
  rect(225, 400, 275, 100)
  fill(0, 0, 0)
  text("Restart?", 275, 425, 225, 350)
}

// controls collision in the spikes and sets gameover to true if they collide with the character
function collision() { 
  if (dist(spike.lx + 40, spike.ly - 25, char.x, char.y) <= 35) {
    print("you touched the spike");
    gameOver = true; 
  } else if (dist(spike.rx - 40, spike.ry - 25, char.x, char.y) <= 35) {
    print("you touched the spike");
    gameOver = true;
  }
}

// makes movement with the arrowkeys
function moveCharacter(character) {
  const v = 17;
  
  if (keyIsDown(65)) {
    character.vx = -v;
  } else if (keyIsDown(68)) {
    character.vx = v;
  } else {
    character.vx = 0;
  }
  if (keyIsDown(87)) {
    if (character.y + character.size >= height || character.x + character.size >= width - 100 || character.x - character.size <= 100) {
      character.vy = -v * 1;
    }
  }
}