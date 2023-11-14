// //******************************************************************
// // Punch > Constractor Function
// //******************************************************************

function Punch(image,x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.pressed = false;
  this.punchImg = new Image();
  this.punchImg.src = image;
};

Punch.prototype.draw = function(x, height){
  this.x = x;
  this.y = height;
//AQUII HAREMOS EL CAMBIO SECUENCIAL DE PX (INCREMENTAL)
  if (this.pressed){
    this.x += this.direction;
    this.pressed = false;

  };
  ctx.drawImage(this.punchImg, this.x, this.y, 50, 38);
};

Punch.prototype.hit = function(numPlayerPunch, faceWidth, oponentPlayer) {
  this.pressed = true;
  fail.play();
  return this.checkHit(numPlayerPunch, faceWidth, oponentPlayer);
};

  //Punch in the face collisions
Punch.prototype.checkHit = function(numPlayerPunch, faceWidth, oponentPlayer){
  if(numPlayerPunch === 1){
    if(this.x + 125  >= oponentPlayer.x &&
      this.y >= oponentPlayer.y &&
      this.y + 38 <= oponentPlayer.y + faceWidth){
        oponentPlayer.faceImg.src = './images/punchFaceRight.png';
        punch.play();
        grunz.play();
        setTimeout(function() {
          oponentPlayer.faceImg.src = './images/FacePlayer2.png';
        }, 300);
      return true;
    }
  }
  if(numPlayerPunch === 2){
    if(this.x <= oponentPlayer.x + 125 &&
      this.y >= oponentPlayer.y &&
      this.y + 38 <= oponentPlayer.y + faceWidth){
        oponentPlayer.faceImg.src = './images/punchFaceLeft.png';
        punch.play();
        grunz.play();
        setTimeout(function() {
          oponentPlayer.faceImg.src = './images/FacePlayer1.png';
        }, 300);
      return true;
    }
  }
  return false;

};
