var dog,dog1,dog2,dogimg,dogHappy,foodStock,foods;
var database;
var food1;
var position
var feed,add;
var Feedtime;
var Lastfeed;
var sadDog,washroom,garden;
var currentTime;
var gameState,readState;


function preload(){
sadDog=loadImage("Dog.png");
dogimg = loadImage("dogImg.png");
dogHappy = loadImage("dogImg1.png");
dogimg1 = loadImage("dogImg.png")
dogimg2 = loadImage("dogImg1.png")
bedroomImg = loadImage("Bed Room.png")
gardenImg = loadImage("Garden.png")
washroomImg = loadImage("Wash Room.png")
garden=loadImage("Garden.png");
washroom=loadImage("WashRoom.png");
bedroom=loadImage("BedRoom.png");

}

function setup() {
  createCanvas(800, 700);

  dog = createSprite(400,500,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;''

  dog=createSprite(550,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.15;

  database = firebase.database();
  console.log(database)

  foodobject=new Food()
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  
   
  var dog = database.ref('Food');
  dog.on("value", readPosition, showError);
  feed = createButton("FEED DRAGO MILK")
  feed.position(600,100)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(400,100)
  add.mousePressed(AddFood)

 
 
 
}


function draw() {
  background(46,139,87); 
  
  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);

     
     fill(255,255,254);
      
  }
  foodobject.display()
  drawSprites();

  textSize(30);
  text("food remaining: "+foods,300,250);
  text("press the up arrow key to feed the dog",250,150);

  fedtime=database.ref('FeedTime')
  fedtime.on("value",function(data){ Lastfeed=data.val(); });
  if(Lastfeed>=12)
  {
    text("Last Feed :" + Lastfeed%12 + "PM", 150,100);
  }else if(Lastfeed ===0 )
  {
    text("Last Feed : 12 AM" , 150,100)
  }else
  {
    text("Last Feed :" + Lastfeed + "AM", 150,100);
  }

  currentTime=hour();
if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
 }else if(currentTime==(lastFed+2)){
  update("Sleeping");
    foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
    foodObj.washroom();
 }else{
  update("Hungry")
  foodObj.display();
 }
 
 if(gameState!="Hungry"){
   feed.hide();
   addFood.hide();
   dog.remove();
 }else{
  feed.show();
  addFood.show();
 
 drawSprites();

}


function readStock(data){
  foods = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:position
   
  });
}
  

function FeedDog(){

  dog.addImage(dogimg2)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour ()
   })

{

}
}
}

function addFoods(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

