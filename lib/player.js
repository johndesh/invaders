(function () {
	window.Invaders = window.Invaders || {};

	var Player = Invaders.Player = function () {
		Invaders.SpriteSheet.call(this, Invaders.spriteSheetImg, Player.CLIP_RECT, Invaders.CANVAS_WIDTH / 2, Invaders.CANVAS_HEIGHT - 70);
		this.scale.set(0.85, 0.85);
    this.lives = 3;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
    this.sound = new Audio('./assets/sounds/Laser_Shoot9.wav');
	};

	Player.CLIP_RECT = {
	  x: 0,
	  y: 204,
	  w: 62,
	  h: 32
	};

	Invaders.Util.inherits(Player, Invaders.SpriteSheet);

	var reset = Player.prototype.reset = function () {
		this.lives = 3;
    this.score = 0;
    this.position.set(Invaders.CANVAS_WIDTH / 2, Invaders.CANVAS_HEIGHT - 70);
	};

	var shoot = Player.prototype.shoot = function () {
		var bullet = new Invaders.Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 1000);
    this.bullets.push(bullet);
    this.sound.play();
	};

	var handleInput = Player.prototype.handleInput = function () {
		if (Invaders.Util.isKeyDown(Invaders.LEFT_KEY)) {
      this.xVel = -175;
    } else if (Invaders.Util.isKeyDown(Invaders.RIGHT_KEY)) {
      this.xVel = 175;
    } else this.xVel = 0;

    if (Invaders.Util.wasKeyPressed(Invaders.SHOOT_KEY)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot();
        this.bulletDelayAccumulator = 0;
      }
    }
	};

	var updateBullets = Player.prototype.updateBullets = function (dt) {
		for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = null;
      }
    }
	};

	var update = Player.prototype.update = function (dt) {
		this.bulletDelayAccumulator += dt;

    // apply x vel
    this.position.x += this.xVel * dt;

    // cap player position in screen bounds
    this.position.x = Invaders.Util.clamp(this.position.x, this.bounds.w / 2, Invaders.CANVAS_WIDTH - this.bounds.w / 2);
    this.updateBullets(dt);
	};

	var draw = Player.prototype.draw = function () {
		Invaders.SpriteSheet.prototype.draw.call(this);
		for (var i = 0, len = this.bullets.length; i < len; i++) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw();
      }
    }
	};
})();