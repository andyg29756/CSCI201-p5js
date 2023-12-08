// Game was forked from GDD140-A.Campise
// https://editor.p5js.org/GDD140-A.Campise/sketches/eqCQ9pBNJ

//Sprite Groups
//What about if I want some objects to do something, and 
//others do something else? var player;var pickup;var pickedUp;var gameOver;var enemies;

var player;
var pickup;
var pickedUp;
var gameOver;
var enemies;
var score;

function setup() {
  createCanvas(600, 400);
  enemies = new Group();
  pickedUp = false;
  gameOver = false;
  score = 0;

  for (var i = 0; i < 5; i++) {
    var enemy = createSprite(100 + 100 * i, 0, 50, 50);
    enemy.shapeColor = color(0);
    enemy.velocity.y = 2;
    enemies.add(enemy);
  }

  pickUpGen();

  player = createSprite(300, 200, 20, 20);
  player.shapeColor = color(255);
}

function pickUpGen() {
  pickup = createSprite(random(0, width), random(0, height), 20, 20);
  pickup.shapeColor = color(255, 0, 0);
}


function draw() {
  background(200);
  textSize(20);

  fill('ffffff');
  textSize(24);
  text("Score: " + score, 10, 25);

  player.position.x = mouseX;
  player.position.y = mouseY;

  // Check if enemies are touching the edge of the canvas
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    if (enemy.position.y >= height || enemy.position.x <= 0 || enemy.position.x >= width) {
      // Enemy is touching the edge, you can perform some action here
      // For example, you can reset its position
      enemy.position.x = random(100, width - 100);
      enemy.position.y = 0;
    }
  }

  drawSprites();

  if (enemies.overlap(player)) {
    gameOver = true;
  }
  if (player.overlap(pickup)) {
    pickup.remove();
    pickedUp = true;
  }

  // Check state of gameOver and display game over or you win
  if (gameOver) {
    pickup.remove();
    text("Game Over", 40, 100);
  } else if (pickedUp) {
    score++;
    pickedUp = false; 
    pickUpGen()
  }else if (score == 100){
    text("You win", 40, 100);
    drawSprites();
   // Set pickedUp to false after incrementing the score
  }
}
