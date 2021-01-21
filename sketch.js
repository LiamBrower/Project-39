var PLAY=1;
var END=0;
var gameState=1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var backgroundImage;
var invisibleGround;
 
function preload(){
  
  
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle.jpg");
 
}



function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  


  var survivalTime=0;
  
   monkey=createSprite(80,340,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  ground = createSprite(570,350,900,10);
  ground.addImage(backgroundImage);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  invisibleGround = createSprite(400,580,900,10);
  invisibleGround.velocityX=-4;
  invisibleGround.x=ground.width/2;
  invisibleGround.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(255);
  
  if(gameState===PLAY){
      
        if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    
    spawnFood();
    spawnObstacles();
    
    
  }
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
   if(invisibleGround.x<0) {
    invisibleGround.x = invisibleGround.width/2;
  }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(invisibleGround);   
  
   if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+1
     monkey.scale = monkey.scale +0.01;
   }
 
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
  if(obstaclesGroup.isTouching(monkey)){
    gameState=END;
      
    ground.velocityX = 0;
    monkey.velocityY = 0;
      
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
      stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230,250);
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  
}

function spawnFood() {
 
  if (frameCount % 80 === 0) {
    banana = createSprite(600,380,40,10);
    banana.y = random(380,400);    
    banana.velocityX = -5;
    
 
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

     banana.addImage(bananaImage);
     banana.scale=0.05;

    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,520,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
  