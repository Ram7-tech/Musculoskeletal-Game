// //******************************************************************
// // Game board
// //******************************************************************

function GameArea (color) {
  this.ctx = document.getElementById('ring').getContext("2d");
  this.color = color;
};

//To create our canvas (ring)
GameArea.prototype.draw = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(0, 0, 690, 690);

};
