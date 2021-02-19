var balloon;
var database;
var height;
var backgroundImg;
var balloonImg;
var balloonImg1,balloonImg2;



function preload(){
   backgroundImg = loadImage("pro-C35 images/Hot Air Ballon-01.png");
   balloonImg1 = loadImage("pro-C35 images/Hot Air Ballon-02.png");
   balloonImg2 = loadImage("pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png");

}



function setup() {
  database=firebase.database();
  createCanvas(1200,700);

  balloon=createSprite(250,600,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImg1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  
}

function draw() {
  background(backgroundImg);  
 
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale = balloon.scale - 0.05;
  }

  if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImg1);
    balloon.scale = balloon.scale + 0.05;
  }

  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
        
  }

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg1);
  }

  drawSprites();
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y':height.y+y
  })

}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;

}


function showError(){
  console.log("error in writing to database");

}