//Create variables here.
var dog , happyDog ;
var  database ;
var food , foodStock ;
var fedTime , lastFed ;
var feedPet , addFood ;
var title , input , button ;
var foodObj ;


function preload()
{
  //load images here.
  doggy=loadImage("dogimg.png");

  happyDoggy=loadImage("dogimg1.png");
}

function setup() {
  
  database = firebase.database();

  createCanvas(500,500);

  foodObj = new Food();

  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  
  dog=createSprite(250,300,150,150);
  dog.addImage(doggy);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
    
}


function draw() {

  background("pink");

  foodObj.display();

  fedTime=database.ref('FeedTime');

  fedTime.on("value",function(data){

    lastFed=data.val();

  });
 
  fill("black");

  textSize(10);
  
  if(lastFed>=12){

    text("Last Feed : "+ lastFed%12 + " PM", 350,30);

   }else if(lastFed==0){

     text("Last Feed : 12 AM",350,30);
   
    }else{

     text("Last Feed : "+ lastFed + " AM", 350,30);

   }
 
  drawSprites();
}

function readStock(data){

  food=data.val();
  foodObj.updateFoodStock(food);

}

function feedDog(){

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({

    Food:foodObj.getFoodStock(),

    FeedTime:hour()

  })

}

function addFoods(){
  food++;
  database.ref('/').update({
    Food:food
  })
}