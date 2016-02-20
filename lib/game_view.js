(function () {
	window.Invaders = window.Invaders || {};

	var GameView = Invaders.GameView = function () {
		this.initCanvas();
		Invaders.keyStates = [];
		Invaders.prevKeyStates = [];
		this.resize();
		this.game = null;
		
	};

	GameView.start = function () {
		new GameView().animate();
	};

	GameView.prototype.initCanvas = function () {
		Invaders.canvas = document.getElementById('space-invaders');
	  Invaders.ctx = Invaders.canvas.getContext('2d');

	  Invaders.spriteSheetImg = new Image();
	  Invaders.spriteSheetImg.src = Invaders.SPRITE_SHEET_SRC;
	  this.preDrawImages();

	  window.addEventListener('resize', this.resize);
	  document.addEventListener('keydown', this.onKeyDown);
	  document.addEventListener('keyup', this.onKeyUp);
	};

	GameView.prototype.preDrawImages = function () {
		var canvas = this.drawIntoCanvas(2, 8, function(ctx) {
    	ctx.fillStyle = 'white';
    	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  	});
  	Invaders.bulletImg = new Image();
  	Invaders.bulletImg.src = canvas.toDataURL();
	};

	GameView.prototype.drawIntoCanvas = function (width, height, drawFunc) {
	  var canvas = document.createElement('canvas');
	  canvas.width = width;
	  canvas.height = height;
	  var ctx = canvas.getContext('2d');
	  drawFunc(ctx);
	  return canvas;
	};

	GameView.prototype.drawAliens = function () {
		for (var i = 0; i < this.game.aliens.length; i++) {
    	var alien = this.game.aliens[i];
    	alien.draw();
  	}
	};
	
	GameView.prototype.drawGame = function () {
		this.game.player.draw();
  	GameView.prototype.drawAliens.call(this);
  	this.game.explosionController.draw();
  	GameView.prototype.drawBottomHud.call(this);
	};
	
	GameView.prototype.drawBottomHud = function () {
		Invaders.ctx.fillStyle = '#02ff12';
	  Invaders.ctx.fillRect(0, Invaders.CANVAS_HEIGHT - 30, Invaders.CANVAS_WIDTH, 2);
	  GameView.prototype.fillText.call(this, this.game.player.lives + ' x ', 10, Invaders.CANVAS_HEIGHT - 7.5, 'white', 20);
	  Invaders.ctx.drawImage(Invaders.spriteSheetImg, this.game.player.clipRect.x, this.game.player.clipRect.y, this.game.player.clipRect.w,
	    this.game.player.clipRect.h, 45, Invaders.CANVAS_HEIGHT - 23, this.game.player.clipRect.w * 0.5,
	    this.game.player.clipRect.h * 0.5);
	  GameView.prototype.fillText.call(this, 'CREDIT: ', Invaders.CANVAS_WIDTH - 115, Invaders.CANVAS_HEIGHT - 7.5);
	  GameView.prototype.fillCenteredText.call(this, 'SCORE: ' + this.game.player.score, Invaders.CANVAS_WIDTH / 2, 20, 'white');
	  GameView.prototype.fillBlinkingText.call(this, '00', Invaders.CANVAS_WIDTH - 25, Invaders.CANVAS_HEIGHT - 7.5, Invaders.TEXT_BLINK_FREQ);
	};
	
	GameView.prototype.fillText = function (text, x, y, color, fontSize) {
		if (typeof color !== 'undefined') Invaders.ctx.fillStyle = color;
	  if (typeof fontSize !== 'undefined') Invaders.ctx.font = fontSize + 'px Atari Small';
	  Invaders.ctx.fillText(text, x, y);
	};
	
	GameView.prototype.fillCenteredText = function (text, x, y, color, fontSize) {
	  var metrics = Invaders.ctx.measureText(text);
	  GameView.prototype.fillText.call(this, text, x - metrics.width / 2, y, color, fontSize);
	};

	GameView.prototype.fillBlinkingText = function (text, x, y, blinkFreq, color, fontSize) {
  	if (~~(0.5 + Date.now() / blinkFreq) % 2) {
    	GameView.prototype.fillCenteredText.call(this, text, x, y, color, fontSize);
    }
  };

	GameView.prototype.drawStartScreen = function () {
		GameView.prototype.fillCenteredText.call(this, "Space Invaders", Invaders.CANVAS_WIDTH / 2, Invaders.CANVAS_HEIGHT / 2.75, '#FFFFFF', 36);
  	GameView.prototype.fillBlinkingText.call(this, "Press enter to play!", Invaders.CANVAS_WIDTH / 2, Invaders.CANVAS_HEIGHT / 2, 500, '#FFFFFF', 36);
	};

	GameView.prototype.animate = function () {
		var now = window.performance.now();
	  var dt = now - Invaders.lastTime;
	  if (dt > 100) dt = 100;
	  if (Invaders.Util.wasKeyPressed(13) && !Invaders.hasGameStarted) {
	    this.game = new Invaders.Game();
	    GameView.prototype.drawBottomHud.call(this);
	    Invaders.hasGameStarted = true;
	  }

	  if (Invaders.hasGameStarted) {
	    this.game.updateGame(dt / 1000);
	  }

	  Invaders.ctx.fillStyle = 'black';
	  Invaders.ctx.fillRect(0, 0, Invaders.CANVAS_WIDTH, Invaders.CANVAS_HEIGHT);
	  if (Invaders.hasGameStarted) {
	    GameView.prototype.drawGame.call(this);
	  } else {
	    GameView.prototype.drawStartScreen.call(this);
	  }
	  Invaders.lastTime = now;
	  window.requestAnimationFrame(GameView.prototype.animate);
	};

	GameView.prototype.resize = function () {
		var w = window.innerWidth;
	  var h = window.innerHeight;

	  // calculate the scale factor to keep a correct aspect ratio
	  var scaleFactor = Math.min(w / Invaders.CANVAS_WIDTH, h / Invaders.CANVAS_HEIGHT);

    Invaders.canvas.width = Invaders.CANVAS_WIDTH * scaleFactor;
    Invaders.canvas.height = Invaders.CANVAS_HEIGHT * scaleFactor;
    
    Invaders.ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
	};

	GameView.prototype.onKeyDown = function (e) {
	  e.preventDefault();
	  Invaders.keyStates[e.keyCode] = true;
	};

	GameView.prototype.onKeyUp = function (e) {
	  e.preventDefault();
	  Invaders.keyStates[e.keyCode] = false;
	};

})();