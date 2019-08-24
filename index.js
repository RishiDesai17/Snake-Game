var canvas = document.getElementById("snake");
var context = canvas.getContext("2d");
const grid = 32;
var score = 0;
var img = document.getElementById("img");
const foodimg = new Image();
foodimg.src = "food.jpg";
var snake=[];
snake[0] = {
  x: 9*grid,
  y: 10*grid
};
var food = {
  x: Math.floor(Math.random()*19+1)*grid,
  y: Math.floor(Math.random()*17+1)*grid
};
var x;
document.addEventListener("keydown",function(event) {
  var k = event.key;
  if(k==='w'&&x!=="down"){
    x="up";
  }
  else if(k==='a'&&x!=="right"){
    x="left";
  }
  else if(k==='s'&&x!=="up"){
    x="down";
  }
  else if(k==='d'&&x!=="left"){
    x="right";
  }
})
function collision(head,array){
  for(var i=0;i<array.length;i++){
    if(head.x===array[i].x && head.y===array[i].y){
      return true;
    }
  }return false;
}
function draw(){
  context.drawImage(img,0,0);
  for(var i=0;i<snake.length;i++){
    context.fillStyle = "#4AC948";
    context.fillRect(snake[i].x,snake[i].y,grid,grid);

    context.strokeStyle = "white";
    context.strokeRect(snake[i].x,snake[i].y,grid,grid);
  }
  context.drawImage(foodimg,food.x,food.y);
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;
  if(x==="left") {snakeX-=grid;}
  if(x==="right") {snakeX+=grid;}
  if(x==="up") {snakeY-=grid;}
  if(x==="down") {snakeY+=grid;}

  if(snakeX===food.x && snakeY===food.y){
    food = {
      x: Math.floor(Math.random()*18+1)*grid,
      y: Math.floor(Math.random()*16+1)*grid
    }
    score+=1;
    var xyz = document.getElementById("score");
    xyz.innerHTML = "SCORE: "+score;
  }
  else{
    snake.pop();
  }
  var newpos = {
    x : snakeX,
    y : snakeY
  }
  if(snakeX<0||snakeX>18*grid||snakeY<0||snakeY>16*grid||collision(newpos,snake)){
    clearInterval(game);
      setTimeout(function(){document.getElementById("game_over").innerHTML = "Game Over"; }, 100);
    setTimeout(function() {
      var name = prompt("enter name");
      if(name===""){
        name="Player";
      }
      document.getElementById("thanks").innerHTML = "Thanks for playing "+name+", your score is "+score;
    },200);

  }
  snake.unshift(newpos);
}
var game = setInterval(draw,100);
