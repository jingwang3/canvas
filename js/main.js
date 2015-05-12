
// add functions to allow drag and drap;
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("src", ev.target.src);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("src");
    if(data.indexOf('ballon.png') > -1){
      addBallon();
    }else{
      addCandy(data);
    }
    
}


var canvas, stage;

var mouseTarget;  // the display object currently under the mouse, or being dragged
var dragStarted;  // indicates whether we are currently in a drag operation
var offset;
var ballons = [];

var init = function() {
  // create stage and point it to the canvas:
  $('#myCanvas').attr('width', 855).attr('height', 705); //set canvas size
  canvas = document.getElementById("myCanvas");
  stage = new createjs.Stage(canvas);

  // enable touch interactions if supported on the current device:
  createjs.Touch.enable(stage);

  // enabled mouse over / out events
  stage.enableMouseOver(10);
  stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

  // load the source images:
  // add cake
  var bdCake = new Image();
  bdCake.src = "img/cake.png";
  var cakeBmp;
  cakeBmp = new createjs.Bitmap(bdCake);
  stage.addChild(cakeBmp);
  cakeBmp.x = canvas.width/2 - 480/2;
  cakeBmp.y = canvas.height - 338;
  cakeBmp.name = 'BD_Cake';

  // add music note btn
  var musicNote = new Image();
  musicNote.src = "img/music_note.png";
  var mnBmp;
  mnBmp = new createjs.Bitmap(musicNote);
  stage.addChild(mnBmp);
  mnBmp.x = 20;
  mnBmp.y = 20;
  mnBmp.name = 'Music_Note';
  mnBmp.cursor = "pointer";
  mnBmp.scaleX = mnBmp.scaleY = mnBmp.scale = 1;
  var snd = new Audio("sound/easy_loop.mp3"); // buffers automatically when created
  mnBmp.on("mousedown", function (evt) {
    if(snd.currentTime > 0){
      snd.pause();
      snd.currentTime = 0;
      this.alpha = 1;
    }else{
      snd.play();
      snd.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
      this.alpha = 0.5;
    }
  });

  // add reset btn
  var resetBtn = new Image();
  resetBtn.src = "img/reset.png";
  var resetBmp;
  resetBmp = new createjs.Bitmap(resetBtn);
  stage.addChild(resetBmp);
  resetBmp.x = canvas.width - 20 - 48;
  resetBmp.y = 20;
  resetBmp.name = 'Reset_Btn';
  resetBmp.cursor = "pointer";
  resetBmp.scaleX = resetBmp.scaleY = resetBmp.scale = 1;
  resetBmp.on("mousedown", function (evt) {
    for (var i = stage.children.length - 1; i >= 3; i--) {
      stage.children[i].removeAllEventListeners();
      stage.children[i].visible = false;
    };
  });

  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick", tick);
}();

function stop() {
  createjs.Ticker.removeEventListener("tick", tick);
}


var addCandy = function(imgSrc) {
  var img = new Image();
  img.src = imgSrc;
  var bitmap;

  // create and populate the screen with random daisies:
  //for (var i = 0; i < 3; i++) {
    bitmap = new createjs.Bitmap(img);
    stage.addChild(bitmap);
    bitmap.x = stage.canvas.width/2;
    bitmap.y = stage.canvas.height/2;
    // bitmap.rotation = 360 * Math.random() | 0;
    // bitmap.regX = bitmap.image.width / 2 | 0;
    // bitmap.regY = bitmap.image.height / 2 | 0;
    bitmap.scaleX = bitmap.scaleY = bitmap.scale = 1;
    bitmap.name = 'candy_'+stage.children.length;
    bitmap.cursor = "pointer";

    // using "on" binds the listener to the scope of the currentTarget by default
    // in this case that means it executes in the scope of the button.
    bitmap.on("mousedown", function (evt) {
      this.parent.addChild(this);
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });

    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    bitmap.on("pressmove", function (evt) {
      this.x = evt.stageX + this.offset.x;
      this.y = evt.stageY + this.offset.y;
      // indicate that the stage should be updated on the next tick:
      
    });

    bitmap.on("rollover", function (evt) {
      this.scaleX = this.scaleY = this.scale * 1.2;
      
    });

    bitmap.on("rollout", function (evt) {
      this.scaleX = this.scaleY = this.scale;
      
    });
  //}
  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick", tick);
  
}

var addBallon = function() {
  var img = new Image();
  var r = Math.random() * 3;
  if(r > 2){
    img.src = 'img/ballon.png';
  }else if(r > 1){
    img.src = 'img/brown_ballon.png';
  }else{
    img.src = 'img/pink_ballon.png';
  }

  var bitmap;

  // create and populate the screen
    bitmap = new createjs.Bitmap(img);
    ballons.push(bitmap);
    stage.addChild(bitmap);
    console.log(stage);
    bitmap.x = Math.random() * stage.canvas.width;
    bitmap.y = Math.random() * 30 + stage.canvas.height;
    bitmap.ind = stage.children.length;

    bitmap.name = 'ballon_'+stage.children.length;

  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
  // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
  stage.update(event);
  for (var i = ballons.length - 1; i >= 0; i--) {
    if(ballons[i].y >= -20){
      ballons[i].y--;
    }else{
      ballons[i].removeAllEventListeners();
      ballons[i].visible = false;
    }
  };
}

$('.add-candy-btn').on('click', function(e){
  addCandy(this.src);
});

$('.add-ballon-btn').on('click', function(e){
  addBallon();
});




//geolocation function scope.
(function(){

  //attach event listener to findME
  $('#findMe').on('click', function(){
    getLocation();
  });

  //if geolocation is available call showPosition
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      }
  }

  //call google api to get a static map imge of current location.
  function showPosition(position) {
      var latlon = position.coords.latitude + "," + position.coords.longitude;

      var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
      +latlon+"&zoom=14&size=200x150&sensor=false";
      $("#mapholder").html("<img src='"+img_url+"'>");
  }

})();




