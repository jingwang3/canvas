var convertImageToCanvas = function(image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);
  return canvas;
}

var addSmileyFace = function(cvs){
  var canvas = cvs;
  var context = canvas.getContext('2d');
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = 70;
  var eyeRadius = 10;
  var eyeXOffset = 25;
  var eyeYOffset = 20;
  
  // draw the yellow circle
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'yellow';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = 'black';
  context.stroke();
    
  // draw the eyes
  context.beginPath();
  var eyeX = centerX - eyeXOffset;
  var eyeY = centerY - eyeXOffset;
  context.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
  var eyeX = centerX + eyeXOffset;
  context.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
  
  // draw the mouth
  context.beginPath();
  context.arc(centerX, centerY, 50, 0, Math.PI, false);
  context.stroke();
};


var createCanvas = function(cvs){
  var canvas = document.getElementById(cvs);
  addSmileyFace(canvas);
}('myCanvas');