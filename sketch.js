var PLAY = 1;
var END = 0;
var gameState = 1;

var score;

var sword,fruits,fruitGroup,fruit1,fruit2,fruit3,fruit4;

var enemyGroup,monster,monsterImage;

var gameOverSound,knifeSwooshSound;

var gameOver,gameOverImage;

function preload(){
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
 
}
function setup(){
  createCanvas(600,600);
  
  
  
  sword = createSprite(100,100,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;

}

function draw(){
   background("lightBlue");
  
  text("Score:"+score,300,50);
  
  if(gameState===PLAY){
    
    fruits();
    enemy();
  
    
    sword.x=World.mouseX;
    sword.y=World.mouseY;
    
    if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score+1;
      
    }
    else {
      if(enemyGroup.isTouching(sword)){
        gameState = END;
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        
        fruitGroup.setVelocityEach(0);
         enemyGroup.setVelocityEach(0);
        
        gameOverSound.play();
        
        sword.addImage(gameOverImage);
        sword.x = 200;
        sword.y = 200;
      }
    }
    
  }
  
  
  
  
  drawSprites();
  
}
function fruits(){
  if(frameCount%80===0){
    var pos = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    if(pos===1){
      fruit.x=400;
      fruit.velocityX = -(7+(score/4));
    }
    else{
      if(pos===2){
        fruit.x=0;
        fruit.velocityX = (7+(score/4));
      }
    }
    
    var rand = Math.round(random(1,4));
    if(rand==1){
      fruit.addImage(fruit1);
    }
    else if(rand==2){
      fruit.addImage(fruit2);
    }
    else if(rand==3){
      fruit.addImage(fruit3);
    }
    else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,600));
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
    
  }
}
function enemy(){
  if(frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster .y = Math.round(random(100,300));
    monster.velocityX = -7;
    monster.setLifetime = 50;
    enemyGroup.add(monster);
  }
}


