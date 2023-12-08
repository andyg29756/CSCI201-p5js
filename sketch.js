// Game was forked from GDD140-A.Campise
// https://editor.p5js.org/GDD140-A.Campise/sketches/eqCQ9pBNJ

//Sprite Groups
//What about if I want some objects to do something, and 
//others do something else? var player;var pickup;var pickedUp;var gameOver;var enemies;

function setup() {
  createCanvas(600, 400);
  enemies = new Group();
  pickedUp = false;
  gameOver = false;

  for (var i = 0; i < 5; i++) {
    var enemy = createSprite(100 + 100 * i, 0, 50, 50);
    enemy.shapeColor = color(0);
    enemy.velocity.y = 2;
    enemies.add(enemy);
  }

  player = createSprite(300, 200, 20, 20);
  player.shapeColor = color(255);

  //Add pickup   
  pickup = createSprite(random(0, width), random(0, height), 20, 20);
  pickup.shapeColor = color(255, 0, 0);
}

function draw() {
  background(200);
  textSize(110);
  player.position.x = mouseX;
  player.position.y = mouseY;
  drawSprites();

  // show problem all sprites
  //for (var i = 0; i < allSprites.length; i++) {
  // if (player.overlap(allSprites[i])) {
  // gameOver = true;
    //}
  //}

  if (enemies.overlap(player)) {
    gameOver = true;
  }
  if (player.overlap(pickup)) {
    pickup.remove();
    enemies.removeSprites();
    pickedUp = true;
  }

  //check state of gameOver and display game over or you win
  if (gameOver) {
    pickup.remove();
    //text("game over", 40, height / 2)
    text("game over", 40, 100);
  } else if (pickedUp) {
    text("YOU WIN!", 40, 100);
    drawSprites();
  }
}

