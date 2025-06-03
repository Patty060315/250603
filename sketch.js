/*
----- Coding Tutorial by Patt Vira ----- 
Name: Interactive Fridge Magnets
Video Tutorial: https://youtu.be/72pAzuD8tqE

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/

let video; let handPose; let hands = [];
let font; let size = 35;
let magnets = []; let num = 5;

function preload() {
  font = loadFont("Outfit-Regular.ttf");
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  createCanvas(640, 480);
  // Detect video & load ML model
  video = createCapture(VIDEO, {flipped: true});
  video.hide();
  handPose.detectStart(video, gotHands);
  
  // Create magnet objects
  rectMode(CENTER);
  for (let i=0; i<num; i++) {
    magnets[i] = new Magnet();
  }
}

function draw() {
  background(220);
  
  // Display video and detect index and thumb position
  image(video, 0, 0, width, height);
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    
    noFill();
    stroke(0, 255, 0);
    text("index", index.x, index.y);
    text("thumb", thumb.x, thumb.y);
  
    for (let i=0; i<num; i++) {
      magnets[i].touch(thumb.x, thumb.y, index.x, index.y);
    }
  }
  
  for (let i=0; i<num; i++) {
    magnets[i].display();
  }
}

function gotHands(results) {
  hands = results;
}

class Magnet {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = size;
    this.text = "Hello!";
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 200, 0);
    stroke(0);
    strokeWeight(2);

    // 繪製星型
    beginShape();
    for (let i = 0; i < 10; i++) {
      let angle = TWO_PI / 10 * i;
      let radius = i % 2 === 0 ? this.size : this.size / 2;
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);

    // 顯示文字
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(20);
    text(this.text, 0, 0);
    pop();
  }

  touch(thumbX, thumbY, indexX, indexY) {
    // 讓星星跟隨手指中點
    let d = dist(this.x, this.y, (thumbX + indexX) / 2, (thumbY + indexY) / 2);
    if (d < this.size) {
      this.x = (thumbX + indexX) / 2;
      this.y = (thumbY + indexY) / 2;
    }
  }
}
