(function () {
	window.Invaders = window.Invaders || {};

	var Alien = Invaders.Alien = function (clipRects, x, y) {
		Invaders.SpriteSheet.call(this, Invaders.spriteSheetImg, clipRects[0], x, y);
		this.clipRects = clipRects;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 1; // try 2 secs to start with...
    this.stepAccumulator = 0;
    this.doShoot - false;
    this.bullet = null;
    this.sound = new Audio('./assets/sounds/Laser_Shoot11.wav');
	};
  Alien.BOTTOM_ROW = [{
    x: 0,
    y: 0,
    w: 51,
    h: 34
  }, {
    x: 0,
    y: 102,
    w: 51,
    h: 34
  }];
  Alien.MIDDLE_ROW = [{
    x: 0,
    y: 137,
    w: 50,
    h: 33
  }, {
    x: 0,
    y: 170,
    w: 50,
    h: 34
  }];
  Alien.TOP_ROW = [{
    x: 0,
    y: 68,
    w: 50,
    h: 32
  }, {
    x: 0,
    y: 34,
    w: 50,
    h: 32
  }];
  Alien.X_MARGIN = 40;
  Alien.SQUAD_WIDTH = 11 * Alien.X_MARGIN;
	Invaders.Util.inherits(Alien, Invaders.SpriteSheet);

	Alien.prototype.toggleFrame = function () {
		this.onFirstState = !this.onFirstState;
    this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
	};

	Alien.prototype.shoot = function () {
		this.bullet = new Invaders.Bullet(this.position.x, this.position.y + this.bounds.w / 2, -1, 500);
		this.sound.play();
	};

	Alien.prototype.update = function (dt) {
		this.stepAccumulator += dt;

    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w / 2 + 20 && Invaders.alienDirection < 0) {
        Invaders.aliensShouldUpdate = true;
      }
      if (Invaders.alienDirection === 1 && this.position.x > Invaders.CANVAS_WIDTH - this.bounds.w / 2 - 20) {
        Invaders.aliensShouldUpdate = true;
      }
      if (this.position.y > Invaders.CANVAS_WIDTH - 50) {
        Invaders.Game.reset();
      }

      var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
      if (Invaders.Util.getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * Invaders.alienDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += Invaders.alienYDown;

    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.update(dt);
    } else {
      this.bullet = null;
    }
	};

	Alien.prototype.draw = function () {
		Invaders.SpriteSheet.prototype.draw.call(this);
		if (this.bullet !== null && this.bullet.alive) {
			this.bullet.draw();
		}
	};


})();