var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,rbar,lbar;
var engine,world;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	ground=new bars(400,690,200,20);
	rbar = new bars(500,650,20,100);
    lbar = new bars(300,650,20,100);

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.2, isStatic:true});
	World.add(world, packageBody);
  
}


function draw() {
  background(0);

  Engine.update(engine);
  ground.display();
  lbar.display();
  rbar.display();
  
  if(packageSprite.y<220){
  packageSprite.x= helicopterSprite.x 
  }

  if(packageSprite.y>500&&packageSprite.x<500&&packageSprite.x>300){
	 textSize=18; 
     text("MISSION PASSED",300,400);
  }else if(packageSprite.y>500&&(packageSprite.x>500||packageSprite.x<300)){
	textSize=18; 
	text("MISSION FAILED",300,400); 
  }
  
  packageSprite.y= packageBody.position.y 
  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	Matter.Body.setStatic(packageBody,false);
  }

 if(keyCode===LEFT_ARROW){
   helicopterSprite.velocityX=-4;
 }

 if(keyCode===RIGHT_ARROW){
	helicopterSprite.velocityX=4;
  }

}
