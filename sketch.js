//Variables
var allMyZubats = [];
var amountOfZubats = 400;
let zubat0;
//i actually didnt use this zubat1 because i couldn't make the zubats sprite to change according to their direction :(
//let zubat1;
let abra;


function preload() {
  zubat0 = loadImage('zubat0.png');
  //zubat1 = loadImage('zubat1.png');
  abra = loadImage('abra.gif');

}

function setup() {
  createCanvas(windowWidth, windowHeight);


  for (var i = 0; i < amountOfZubats; i++) {
    //Create instances that will be displayed in the draw function using the Zubat object
    var tempx = random() * width;
    var tempy = random() * height;

    var tempZubat = new Zubat(tempx, tempy);

    allMyZubats.push(tempZubat);
  }

}

function draw() {

  //reset the pulse of the flash
  background(random(30, 65));
  if (frameCount == 150) {
    frameCount = -frameCount;
  }

  if (keyIsDown(70)) {
    //instructions to catch the zubats
    push();
    fill(255);
    text('Click on the Zubats while you have FLASH active to catch them!', width / 2, height / 2);
    pop();

    // Light from MN05 - FLASH
    ellipseMode(CENTER);
    noStroke();
    fill(255, 100);
    ellipse(mouseX, mouseY, frameCount * 2 + random(10, 20));
    fill(255, 100);
    ellipse(mouseX, mouseY, frameCount * 1.5 + random(10, 20));

    //lil boy Abra doing his work
    push();
    imageMode(CENTER);
    image(abra, mouseX, mouseY, 100, 100);
    pop();

    //display the istances of Zubats
    for (var i = 0; i < allMyZubats.length; i++) {

      var tempZubat = allMyZubats[i];
      tempZubat.move();
      tempZubat.show();
    }

  } else {
    background(random(0, 15));
    imageMode(CENTER);
    image(zubat0, windowWidth / 2 * random(1, 1.01), windowHeight / 2 * random(1, 1.01) + 70, 60 + random(1, 2), 60 + random(1, 2));

    //Instructions text in the first page
    textAlign(CENTER);
    textSize(35);
    textFont('helvetica');
    noFill();
    strokeWeight(0.8);
    stroke(255);

    text('Press F', width / 2, height / 2 - 100);
    text('to use', width / 2, height / 2 - 50);

    push();
    fill(255);
    text('MN05 - FLASH!', width / 2, height / 2);
    pop();

  }

}

//catch the Zubats by clicking on them
function mouseClicked() {
  for (var i = 0; i < allMyZubats.length; i++) {
    allMyZubats[i].catch();
  }
}

//Zubat object :)
function Zubat(_x, _y, _size, _img) {
  //Inner properties
  this.size = 60;
  this.x = _x;
  this.y = _y;
  this.speed = 6;

  //Randomized zubats movement inputs
  var yIncrease = random(1.1, -1.1) * this.speed;
  var xIncrease = random(1.1, -1.1) * this.speed;

  this.move = function() {
    this.x += xIncrease * random(2.5);
    this.y += yIncrease * random(1);


    //Vertical bouncing
    if (this.y > windowHeight || this.y < 0) {
      yIncrease = -yIncrease;
    }

    //Horizontal bouncing
    if (this.x < 0 || this.x > windowWidth) {
      xIncrease = -xIncrease;
    }

  }

  //Display method
  this.show = function() {
    push();
    image(zubat0, this.x, this.y, this.size, this.size);
    pop();


  }

  //Catch the Zubats
  this.catch = function() {
    var dis = dist(mouseX, mouseY, this.x, this.y)
    if (dis < this.size) {
      //if i actually say this.size = 0 the zubats will return to original .png size so ¯\_(ツ)_/¯
      this.size = 0.00000000001;
    }
  }

}
