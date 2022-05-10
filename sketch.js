const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var ground;
var rope;
var rope2;
var rope3;
var fruit;
var linkfruit;
var linkfruit2;
var linkfruit3;
var fundo;
var fruitimg;
var bunny;
var bunnyimg;
var botao;
var botao2;
var botao3;
var eat;
var sad;
var airsound;
var cutsound;
var eatsound;
var sadsound;
var bgsound;
var balao;
var mute;
function preload(){
fruitimg = loadImage("images/melon.png");
fundo = loadImage("images/background.png");
bunnyimg = loadAnimation("images/rabbit1.png","images/rabbit2.png","images/rabbit3.png");
eat = loadAnimation("images/eat.png","images/eat2.png","images/eat3.png","images/eat4.png");
sad = loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png");
eat.looping = false;
sad.looping = false;
airsound = loadSound("sounds/air.wav");
cutsound = loadSound("sounds/rope_cut.mp3");
eatsound = loadSound("sounds/eating_sound.mp3");
sadsound = loadSound("sounds/sad.wav");
bgsound = loadSound("sounds/sound1.mp3");
}




function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ground  = new Ground(200,690,600,20);

  rope = new Rope(10,{x:50,y:30});
  rope2 = new Rope(8,{x:380,y:40});
  rope3 = new Rope(4,{x:200,y:400});
  var fruit_options = {
    density: 0.001
  }
  fruit = Bodies.circle(250,300,15,fruit_options);
  Composite.add(rope.body,fruit);

  linkfruit = new Link(rope,fruit);
  linkfruit2 = new Link(rope2,fruit);
  linkfruit3 = new Link(rope3,fruit);
  imageMode(CENTER)

  bunny = createSprite(400,600);
  bunnyimg.frameDelay = 30;
  eat.frameDelay = 30;
  sad.frameDelay = 30;
  bunny.addAnimation("idle",bunnyimg);
  bunny.addAnimation("eat",eat);
  bunny.addAnimation("sad",sad);
  bunny.scale = 0.3;

  botao = createImg("images/cut_btn.png");
  botao.position(25,30);
  botao.size(50,50);
   botao.mouseClicked(drop);

  botao2 = createImg("images/cut_btn.png");
  botao2.position(375,30);
  botao2.size(50,50);
  botao2.mouseClicked(drop2);

  botao3 = createImg("images/cut_btn.png");
  botao3.position(180,390);
  botao3.size(50,50);
  botao3.mouseClicked(drop3);

  balao = createImg("images/balloon.png");
  balao.position(10,250);
  balao.size(150,100);
  balao.mouseClicked(air);
  bgsound.play();
  bgsound.setVolume(0.3);
  mute = createImg("images/mute.png");
  mute.position(450,20);
  mute.size(50,50);
  mute.mouseClicked(mutar);
}

function draw() 
{
  background(51);
  Engine.update(engine);
  ground.show();
  image(fundo,250,350,500,700);
  rope.show();
  rope2.show();
  rope3.show();
  if(fruit!=null){
  image(fruitimg,fruit.position.x,fruit.position.y,60,60);
  }
  if(fruit!=null&&fruit.position.y>=650){
    bunny.changeAnimation("sad");
    fruit = null;
    sadsound.play();
  }
  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eat");
    eatsound.play();
  }
 
   drawSprites();
}

function drop(){
  rope.break()
  linkfruit.Detach()
  linkfruit = null;
  cutsound.play();
}

function drop2(){
  rope2.break()
  linkfruit2.Detach()
  linkfruit2 = null;
  cutsound.play();
}

function drop3(){
  rope3.break()
  linkfruit3.Detach()
  linkfruit3 = null;
  cutsound.play();
}

function collide(body,sprite){
  if(body!= null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=80){
    World.remove(engine.world,fruit)
    fruit = null;
    return true;
    }
    else {
      return false;
    }
  }
}

function air(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airsound.play();
}


function mutar(){
  if(bgsound.isPlaying()){
    bgsound.pause();
    
  }
  else{
    bgsound.play();
  }
}




