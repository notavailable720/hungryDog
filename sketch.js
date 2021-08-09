//Create variables here
var dog, dogImg1, dogImg2;
var hungerRef, hunger;
var database;
var food;
var fedTime, lastFed;


function preload()
{
	//load images here
  dogImg1 = loadImage('images/dogImg.png');
  dogImg2 = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(800, 600);
  database = firebase.database();
  
  dog = createSprite(400, 400, 20, 20);
  dog.addImage(dogImg1);
  dog.scale = 0.2;

  hungerRef = database.ref('food')
  hungerRef.on('value', readStock)

  feed = createButton("Feed the dog");
  feed.position(600, 100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(700, 100);
  addFood.mousePressed(addFoods);

  food = new Food();
}

function draw() {  
  background('white');
  food.updateFoodStock(hunger);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val()
  })

  textSize(15);
  if(lastFed >= 12) {
    text("Last fed: " + lastFed%12 + "PM", 350, 30)
  } else if( lastFed == 0) {
    text("Last fed: 12 AM", 350, 30)
  } else {
    text("Last fed: " + lastFed + "AM", 350, 30)
  }

  drawSprites();
  //add styles here
  if(hunger > -1) {
    text("Food remaining " + hunger, 350, 250);
  }

  food.display();
}

function readStock(data) {
  hunger = data.val();
}

function writeStock(x) {
  if(x < 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    food: x
  })
}

function feedDog() {
  if(hunger < 0 ) {
    database.ref('/').update({
      food: 1
    })
  }
  database.ref('/').update({
    food: hunger - 1
  })
  dog.addImage(dogImg2)
  food.updateFoodStock(hunger);
}

function addFoods() {
  hunger++;
  console.log(hunger);
  database.ref('/').update({
    food: hunger
  })
  food.updateFoodStock(hunger);
}