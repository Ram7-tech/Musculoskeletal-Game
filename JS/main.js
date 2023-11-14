  var canvas = document.getElementById('ring');
  var ctx = canvas.getContext('2d');
  var myGameArea = new GameArea('rgba(0, 0, 0, 0)');
  var imagesPlayer1 =['./images/FacePlayer1.png', './images/GloveLeftOrangePlayer1.png', './images/GloveRightOrangePlayer1.png'];
  var imagesPlayer2 =['./images/FacePlayer2.png', './images/GloveRightGreenPlayer2.png', './images/GloveLeftGreenPlayer2.png'];
  var player1 = new Player(50, 270, 25, myGameArea.ctx, imagesPlayer1, -20, 75);
  var player2 = new Player(470, 270, 25, myGameArea.ctx, imagesPlayer2, 0, -75);
  var winner = '';
  var bso = new Audio('./sounds/BSOBoxingMate.mp3');
  var fail = new Audio('./sounds/airCut.mp3');
  var fail2 = new Audio('./sounds/airCut2.mp3');
  var bell = new Audio('./sounds/boxingBell.mp3');
  var punch = new Audio('./sounds/punch3.mp3');
  var grunz = new Audio ('./sounds/grunz.mp3');
  var intro = new Audio ('./sounds/')

  myGameArea.draw();

//Clean the canvas and draw canvas and players again
function updateGameArea() {
 requestAnimationFrame(updateGameArea);
    //UP
    if (player1.keys[87]) player1.moveUp();
    if (player2.keys[38]) player2.moveUp();
    //DOWN
    if (player1.keys[83]) player1.moveDown();
    if (player2.keys[40]) player2.moveDown();
    //RIGHT
    if (player1.keys[68]) player1.moveRight();
    if (player2.keys[39]) player2.moveRight();
    //LEFT
    if (player1.keys[65]) player1.moveLeft();
    if (player2.keys[37]) player2.moveLeft();


    //Players Collisions
    if (!(player1.x + player1.faceWidth < player2.x ||
          player1.x > player2.x + player2.faceWidth  ||
          player1.y + player1.faceHeight < player2.y ||
          player1.y > player2.y + player2.faceHeight )) {
      player1.x -= 40;
      player1.Vx = 5;
      player2.x += 40;
      player2.Vx = 5;
    };

    ctx.clearRect(0, 0, 690, 690);
    myGameArea.draw();
    player1.updatePosition();
    player2.updatePosition();
    player1.draw();
    player2.draw();
};

function checkPunchs(){
  //LEFT PUNCH
  if (player1.keys[84]) {
    if(player1.lpunch.hit(1, player1.faceWidth, player2)) player1.score++;
    console.log(player1.score);
  }
  if (player2.keys[79]) {
    if (player2.lpunch.hit(2, player1.faceWidth, player1)) player2.score++;
    console.log(player2.score);
  }
  //RIGHT PUNCH
  if (player1.keys[82]) {
    if(player1.rpunch.hit(1, player1.faceWidth, player2)) player1.score++;
    console.log(player1.score);
  }
  if (player2.keys[80]){
    if (player2.rpunch.hit(2, player1.faceWidth, player1)) player2.score++;
  }
}

document.body.addEventListener("keydown", (e) => {
  player1.keys[e.keyCode] = true;
  player2.keys[e.keyCode] = true;

  checkPunchs();

});
document.body.addEventListener("keyup", function (e) {
  player1.keys[e.keyCode] = false;
  player2.keys[e.keyCode] = false;
});

//Timer
window.onload = function(){
  var second = 1;
  var minute = 1;

  bso.play();
  var interval = setInterval(function(){
    document.getElementById("timer").innerHTML = "Time left: " + minute + ":" + second;
    second--;

    if(minute==1){
    document.getElementById("timer").innerHTML = "Round starts!";
    bell.play();
  }

    if(second == 0){
      minute--;
      second = 60;
    }

    if(second < 10){
     second= '0'+ second;
    }

    if(minute <= -1) {
      document.getElementById("timer").innerHTML = " ";
    }

    if(minute == 0 && second == 1){
      checkWinner();
      document.getElementById("timer").innerHTML = winner + "wins!";
      clearInterval(interval);
     bso.pause();
      bell.play();
    }

  }, 1000);

};

//Winner
function checkWinner() {
  if (player1.score < player2.score) {
    winner = "Player 2 ";
  } else {
    winner = "Player 1 ";
  }
};

// Score to Game Screen
setInterval(function(){
  document.getElementById("Player1Score").innerHTML = player1.score + " punches";
  document.getElementById("Player2Score").innerHTML = player2.score + " punches";

}, 200);

updateGameArea();
