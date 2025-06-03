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
  createCanvas(1200, 750); // 將畫布大小調整為 1200x 800
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

  // 顯示文字 "淡江教育科技學系"
  fill(0); // 設定文字顏色為黑色
  textAlign(CENTER, TOP); // 文字置中，並從頂部開始
  textSize(40); // 設定文字大小
  text("淡江教育科技學系", width / 2, 20); // 在螢幕最上方中間繪製文字

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
