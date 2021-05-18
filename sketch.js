var PLAY = 1;
var END = 0;
var gameState = 1;
var ground;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, monsterGroup
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("Images/sprite_0.png","Images/sprite_1.png","Images/sprite_2.png","Images/sprite_3.png","Images/sprite_4.png","Images/sprite_5.png","Images/sprite_6.png","Images/sprite_7.png","Images/sprite_8.png");
  monkey_collided = loadAnimation("Images/sprite_1.png")
  
  bananaImage = loadImage("Images/banana.png");
  obstacleImage = loadImage("Images/obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(200,370,900,10);
  ground.visible = false;
  
  monkey = createSprite(200,200,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  monkey.velocityX = 3;
  monkey.y = 350;
  monkey.x = 35;
  
  foodGroup = createGroup();
  monsterGroup = createGroup();
}


function draw() {
  background("white");
  
  
  switch(score)
    {
      case 10: monkey.scale = 0.12;
        break
      case 20: monkey.scale = 0.14;
        break
      case 30: monkey.scale = 0.16;
        break
      case 40: monkey.scale = 0.18;
        break
      default: break;
    }
    

  
  
  if(foodGroup.isTouching(monkey))
    {
      foodGroup.destroyEach();
      score = score+2;
    }
  
  if(monsterGroup.isTouching(monkey))
    {
      gameState = END;
    }
  
  if(gameState === PLAY)
    {
      backGround.velocityX = 0;
  //add code here
  console.log(backGround.x);
  if(backGround.x < 0)
  {
    backGround.x = 200;
  }
      
      if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -15;
      }
     
    }
  else if(gameState === END  )
    {
    
      monsterGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      
      monsterGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      
      backGround.velocityX = 0;
    }
  
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
monster();   
food();  
  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score - "+score, 130, 25);
  
}

function food()
{
  
  if (frameCount % 80 === 0) {
     banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = 0;
    
     //assign lifetime to the variable
   banana.lifetime = 200;
    foodGroup.add(banana);
  }
    
}

function monster()
{
  if(frameCount % 300 === 0)
    {
      obstacle = createSprite(600,350,40,10);
      obstacle.velocityX = 0;
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.15;
      obstacle.lifetime = 200;
      monsterGroup.add(obstacle);
    }
}



