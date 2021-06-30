var meds, energy_drinks, points;
var player;
var zombie, bullet, missile;
var bulletGrp, missileGrp, zombieGrp; 
var energy_drinksGrp, medsGrp, pointsGrp;
var PLAY = 1;
var END = 0;
var START = 2;
var gameState = START;
var life = 500;
var totalPoints = 0;
var zombieImg, shieldImg, missileImg, medImg, energy_drinksImg, playing_characterImg,pointImg,bulletsImg,backgroundImg,logoImg; 
var reset,resetImage;
var easy, medium, hard;
var easyImg, mediumImg, hardImg;
var level;
function preload() {
    
    pointImg = loadImage("images/Coin.png");
    zombieImg = loadImage("images/Zombie.png");
    missileImg = loadImage("images/Missile1 .png"); 
    medImg = loadImage("images/Med Kit .png"); 
    energy_drinksImg = loadImage("images/Energy Drinks.png");
    playing_characterImg = loadImage("images/darknight.png");
    bulletsImg = loadImage("images/bullet.png");
    resetImage = loadImage("images/Play again.png");
    backgroundImg = loadImage("images/Backround.jpg");
    logoImg = loadImage("images/Logo.png");
    easyImg = loadImage("images/Easy.png");
    hardImg = loadImage("images/Hard.png");
    mediumImg = loadImage("images/Medium.png");
}


function setup() {
    
    createCanvas(displayWidth-20,displayHeight-110);

    player = createSprite(displayWidth/2,displayHeight/2+250,50,50);
    player.setVelocity(0,0);
    player.shapeColor = "yellow";
    player.addImage(playing_characterImg)
    player.scale = 0.2;
    player.debug = true;
    player.setCollider("rectangle",0,0,150,150);

    easy = createSprite(displayWidth/2-550,displayHeight/2-100,100,50);
    easy.visible = false;
    //easy.shapeColor = "green";
    easy.addImage(easyImg);
    easy.scale = 0.4;

    medium = createSprite(displayWidth/2-550,displayHeight/2-25,100,50);
    medium.visible = false;
    medium.shapeColor = "yellow";
    medium.addImage(mediumImg);
    medium.scale = 0.4;

    hard = createSprite(displayWidth/2-550,displayHeight/2+50,100,50);
    hard.visible = false;
    hard.shapeColor = "Red"
    hard.addImage(hardImg);
    hard.scale = 0.4;

    reset = createSprite(displayWidth/2,displayHeight/2-175,70,70);
    reset.visible = false;
    reset.shapeColor = "white";
    reset.addImage(resetImage);
    reset.scale = 0.3;
    

    bulletGrp = new Group(); 
    zombieGrp = new Group(); 
    missileGrp = new Group();
    energy_drinksGrp = new Group();
    medsGrp = new Group();
    pointsGrp = new Group(); 

}

function draw() {

    background (backgroundImg);

    textSize(30);
    fill("white");
    text("Shield Life = " + life , displayWidth/2+375,50);
    text("Total Points = " + totalPoints, displayWidth/2-375,50);

    if(gameState === START){

        
        background(logoImg);
        textSize(30);
        text("Choose the Level of difficulty",displayWidth/2-700,displayHeight/2-250);
        text("you want to play",displayWidth/2-700,displayHeight/2-220);
        easy.visible = true;
        medium.visible = true;
        hard.visible = true;

        if(mousePressedOver(easy)){

            level = "easy";
            gameState = PLAY;

        }
        if(mousePressedOver(medium)){

            level = "medium";
            gameState = PLAY;

        }
        if(mousePressedOver(hard)){

            level = "hard";
            gameState = PLAY;

        }
    }

    if(gameState === PLAY){


        easy.visible = false;
        medium.visible = false;
        hard.visible = false;

        checkIsTouching();
        playerControls();
        
        spawnBullets();
        spawnZombies();
        spawnMissiles();
        spawnMeds();
        spawnDrinks();
        spawnPoints();


        if (life === 0 || life < 0){
            
            gameState = END;
            
        }
    }else if(gameState === END){

        background("Black");
        textSize(50);
        text("Game Over",displayWidth/2-150,displayHeight/2-70);
        bulletGrp.destroyEach();
        zombieGrp.destroyEach();
        missileGrp.destroyEach();
        pointsGrp.destroyEach();
        energy_drinksGrp.destroyEach();
        medsGrp.destroyEach();
        //player.destroyEach();
        reset.visible = true;
        player.setVelocity(0,0);
        textSize(30);
        fill("white");
        text("Total Points = " + totalPoints, displayWidth/2-375,50);

        easy.visible = false;
        medium.visible = false;
        hard.visible = false;

        //if(touches.length > 0){

          //  if(touches[0].x === reset.x && touches[0].y === reset.y && gameState === END){

            //    console.log(reset.x);
              //  console.log(reset.y);
                //console.log(touches[0].x);
                //console.log(touches[0].y);
                //restart();

            //}

        //}
        
        if (mousePressedOver(reset) ) {

            restart();
        }
        
    }


    drawSprites();
}

function restart(){

    gameState = START;
    life = 500;
    reset.visible = false;
    totalPoints = 0;
    player.setVelocity(0,0);
    player.x = displayWidth/2;
    player.y = displayHeight/2+250;
    easy.visible = true;
    medium.visible = true;
    hard.visible = true;
}
    
function spawnBullets(){

    if(frameCount % 20 === 0){

        bullet = createSprite(Math.round(random(50,displayWidth-30)),Math.round(random(50,displayHeight-110)),10,40);
        
        bullet.addImage(bulletsImg);
        bullet.scale = 0.3;
        

        switch(level){

            case "easy" : bullet.velocityX = Math.round(random(-3,5)); 
                          bullet.velocityY = Math.round(random(-3,5));
                          break;

            case "medium" : bullet.velocityX = Math.round(random(-5,7)); 
                            bullet.velocityY = Math.round(random(-5,7));
                            break;

            case "hard"   : bullet.velocityX = Math.round(random(-8,10)); 
                            bullet.velocityY = Math.round(random(-11,15));
                            break;

        }
    
        bullet.shapeColor = "red";
        bullet.lifetime = 200;
        bulletGrp.add(bullet);
        
    }
       
} 

function spawnZombies() {

    if(frameCount % 40 === 0) {

        zombie = createSprite(Math.round(random(50,displayWidth-30)),30,30,80);
        zombie.addImage(zombieImg);
        zombie.scale = 0.2;
        switch(level){

            case "easy" : zombie.velocityY = Math.round(random(-7,7));
                          break;

            case "medium" : zombie.velocityY = Math.round(random(-10,10));
                            break;

            case "hard"   : zombie.velocityY = Math.round(random(-15,15));
                            break;

        }
        
        zombie.shapeColor = "green";
        zombie.lifetime = 200;
        zombieGrp.add(zombie);
        
    }
    
}

function spawnMissiles() {
    if(frameCount % 200 === 0) {

        missile = createSprite(Math.round(random(50,displayWidth-30)),400,200,80);
        missile.addImage(missileImg);
        missile.scale = 0.9;
        switch(level){

            case "easy" : missile.velocityX = Math.round(random(-5,5));
                          break;

            case "medium" : missile.velocityX = Math.round(random(-8,8));
                            break;

            case "hard"   : missile.velocityX = Math.round(random(-12,12));
                            break;

        }
        
        missile.shapeColor = "orange";
        missile.lifetime = 200;
        missileGrp.add(missile);
    }
}


function spawnMeds()  {
    if (frameCount % 200 === 0) {
        
        meds = createSprite(Math.round(random(50,displayWidth-30)),Math.round(random(50,displayHeight-110)),50,50);
        meds.addImage(medImg);
        meds.scale = 0.2    ;
        meds.shapeColor = "white";
        meds.lifetime = 350;
        medsGrp.add(meds);
    } 
        
}

function spawnDrinks() {

    if (frameCount % 270 === 0) {
        
        energy_drinks = createSprite(Math.round(random(50,displayWidth-30)),Math.round(random(50,displayHeight-110)),20,80);
        energy_drinks.addImage(energy_drinksImg);
        energy_drinks.scale = 0.3
        energy_drinks.shapeColor = "black";
        energy_drinks.lifetime = 350;
        energy_drinksGrp.add(energy_drinks);
    } 

}

function spawnPoints() {
    if (frameCount % 80 === 0) {
        points = createSprite(Math.round(random(50,displayWidth-30)),Math.round(random(50,displayHeight-110)),20,80);
        points.addImage(pointImg);
        points.scale = 0.09;
        points.shapeColor = "gold";
        points.lifetime = 250; 
        pointsGrp.add(points); 
    }
}

function checkIsTouching(){
    if(player.isTouching(pointsGrp)) {
        totalPoints = totalPoints + 1;
        pointsGrp.destroyEach();
    }

    if (player.isTouching(medsGrp)){

        life = life + 100;
        medsGrp.destroyEach();
    }

    if (player.isTouching(energy_drinksGrp)){

        life = life + 150;
        energy_drinksGrp.destroyEach();
    }

    if (player.isTouching(bulletGrp)){

        life = life - 200;
        bulletGrp.destroyEach();
    }

    if (player.isTouching(zombieGrp)){

        life = life - 300;
        zombieGrp.destroyEach();
    }

    if (player.isTouching(missileGrp)){

        life = life - 500;
        missileGrp.destroyEach();
    }


}

//function playerControls(){

    //if(touches.length > 0){

       // player.x = touches[0].x;
       // player.y = touches[0].y;

        // console.log(touches[0].x);
        // console.log(touches[0].y);

   // }

   // if (keyDown(UP_ARROW) || keyDown("w")) {

       // player.setVelocity(0,-5);

       // if(player.y < 40){

            //player.setVelocity(0,0);
        //}           
        
   // }
    //if (keyDown(DOWN_ARROW) || keyDown("s")){
        
        //player.setVelocity(0,5);

        //if(player.y > displayHeight-150){

           // player.setVelocity(0,0);
        //}       
    //}
    //if (keyDown(RIGHT_ARROW) || keyDown("d")) {
        
        //player.setVelocity(5,0);

       // if(player.x > displayWidth-60){

           // player.setVelocity(0,0);
       // }       
   // }
    //if (keyDown(LEFT_ARROW) || keyDown("a")) {
        
        //player.setVelocity(-5,0);

        //if(player.x < 40 ){

           // player.setVelocity(0,0);
        //}       
   // }
//}

function playerControls(){

    if (keyDown(UP_ARROW) || keyDown("w")) {

        player.setVelocity(0,-5);
        if(player.y < 40){

            player.setVelocity(0,0);
        }           

    }
    if (keyDown(DOWN_ARROW) || keyDown("s")){
        
        player.setVelocity(0,5);
        if(player.y > displayHeight-150){

             player.setVelocity(0,0);
        }

    }
    if (keyDown(RIGHT_ARROW) || keyDown("d")) {
        
        player.setVelocity(5,0);
        if(player.x > displayWidth-60){

             player.setVelocity(0,0);
        }

    }
    if (keyDown(LEFT_ARROW) || keyDown("a")) {
        
        player.setVelocity(-5,0);
        if(player.x < 40 ){

             player.setVelocity(0,0);
        }
        }       
    }




