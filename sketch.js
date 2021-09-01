var Boy,Boy_Running,Boy_collided;
var backgd,backgroundImg,ground,groundImg;
var cloud,cloudG;
var gameOver,restart;
var Play = 1;
var End = 0;
var score = 0;
var gameState = Play;
var invisibleGround;
var obstacle1,obstacle2,obstacleG;
var obstacle;
function preload(){
  Boy_Running = loadAnimation("BOY_1.png","BOY_2.png","BOY_3.png");
  Boy_collided = loadAnimation("BOY_1.png");
  groundImage = loadImage("ground.png");
  cloudImage = loadImage("cloud.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  backgroundImg = loadImage("backgroundImg.png")
  obstacle1 = loadImage("obstacle1.PNG");
  obstacle2 = loadImage("obstacle2.PNG");
}

function setup() {
 createCanvas(windowWidth,windowHeight);  

 Boy = createSprite(200,height-140);
 Boy.addAnimation("running",Boy_Running);
 Boy.scale = 0.05;

 ground = createSprite(200,height);
 ground.addImage("ground",groundImage);
 ground.velocityX = -10;
 
 invisibleGround = createSprite(width/2,height-20,width,125);
 invisibleGround.visible = false;

 score = 0;

 backgd = createSprite(width/2,height/2);
 backgd.addImage(backgroundImg)
 backgd.scale = 100;
 backgd.visible = true;
  
 cloudG = new Group();  
 obstacleG = new Group();
 
 gameOver = createSprite(width/2,height/2);
 gameOver.addImage(gameOverImg);
 

 restart = createSprite(width/2,height/2+50);
 restart.addImage(restartImg);
 restart.scale=0.1;
 
 
}

function draw() {
   
  background(255);
  
  
  if(gameState == Play){
    Boy.velocityY = Boy.velocityY +0.8;  
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
    Boy.collide(invisibleGround)
    if( keyDown("space") && (Boy.y == 485.8 || Boy.y == 485.79999999999995)) {
        Boy.velocityY = -18;
    }
    
    spawnClouds();
    spawnObstacles();

    gameOver.visible = false;
    restart.visible = false;
  }

  if(obstacleG.collide(Boy)){
      gameState = End;
      Boy.collide(invisibleGround)
  }
  else if(gameState == End){
     gameOver.visible = true;
     restart.visible = true;
     score = score - Math.round(getFrameRate()/30);
     ground.velocityX = 0;
     ground.visible = false;
     Boy.velocityY = 0;
     Boy.visible = false;

     obstacleG.setVelocityXEach(0);
     cloudG.setVelocityXEach(0);
     obstacleG.destroyEach();
     cloudG.destroyEach();


    
     if(mousePressedOver(restart)){
        reset();
     }
     
    }
  Boy.depth = backgd.depth;
  Boy.depth = Boy.depth + 1;
  ground.depth = backgd.depth;
  ground.depth = ground.depth + 1;
  
  
  score = score + Math.round(getFrameRate()/30);
  ground.velocityX = -(6 + score/100);
  

  drawSprites();   
  text("Score: "+score, 1200,100); 
}

function spawnClouds() {
    if (frameCount % 60 === 0) {
     var cloud = createSprite(1000,120,40,10);
     cloud.y = Math.round(random(80,120));
     cloud.addImage(cloudImage);
     cloud.scale = 0.5;
     cloud.velocityX = -3;

     cloud.lifetime = -1;

     cloud.depth = Boy.depth;
     Boy.depth = Boy.depth + 1;

     cloudG.add(cloud);
    }
}
  
function spawnObstacles() {
    if(frameCount % 100 === 0) {
      var obstacle = createSprite(1000,invisibleGround.y-90,10,40);
      obstacle.velocityX = -(6 + score/100);
      
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        default: break;
      }
         
      obstacle.scale = 0.25;
      obstacle.lifetime = -1;
      
      obstacleG.add(obstacle);
    }
  }
function reset(){
    gameState = Play;

    gameOver.visible = false;
    restart.visible = false; 

    obstacleG.destroyEach();
    cloudG.destroyEach();

    score = 0;
    
    Boy.visible = true; 
    ground.visible = true;
    
}  
