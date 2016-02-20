(function () {
	window.Invaders = window.Invaders || {};

	var Game = Invaders.Game = function () {
		this.dirtyRects = [];
		this.aliens = [];
		this.player = new Invaders.Player();
		this.explosionController = new Invaders.Explosion();
		this.setupAlienFormation();
	};

	Game.prototype.setupAlienFormation = function () {
		Invaders.alienCount = 0;
	  for (var i = 0, len = 5 * 11; i < len; i++) {
	    var gridX = (i % 11);
	    var gridY = Math.floor(i / 11);
	    var clipRects;
	    switch (gridY) {
	      case 0:
	      case 1:
	        clipRects = Invaders.Alien.BOTTOM_ROW;
	        break;
	      case 2:
	      case 3:
	        clipRects = Invaders.Alien.MIDDLE_ROW;
	        break;
	      case 4:
	        clipRects = Invaders.Alien.TOP_ROW;
	        break;
	    }
	    this.aliens.push(new Invaders.Alien(clipRects, (Invaders.CANVAS_WIDTH / 2 - Invaders.Alien.SQUAD_WIDTH / 2) + Invaders.Alien.X_MARGIN / 2 + gridX * Invaders.Alien.X_MARGIN, Invaders.CANVAS_HEIGHT / 3.25 - gridY * 40));
	    Invaders.alienCount++;
	  }
	};

	Game.prototype.reset = function () {
		this.aliens = []
		this.setupAlienFormation();
		this.player.reset();
	};

	Game.prototype.updateAliens = function (dt) {
		if (Invaders.aliensShouldUpdate) {
	    Invaders.aliensShouldUpdate = false;
	    Invaders.alienDirection = -Invaders.alienDirection;
	    Invaders.alienYDown = 25;
	  }

	  for (var i = this.aliens.length - 1; i >= 0; i--) {
	    var alien = this.aliens[i];
	    if (!alien.alive) {
	      this.aliens.splice(i, 1);
	      alien = null;
	      Invaders.alienCount--;
	      if (Invaders.alienCount < 1) {
	        Invaders.wave++;
	        this.setupAlienFormation();
	      }
	      return;
	    }

	    alien.stepDelay = ((Invaders.alienCount * 20) - (Invaders.wave * 10)) / 1000;
	    if (alien.stepDelay <= 0.05) {
	      alien.stepDelay = 0.05;
	    }
	    alien.update(dt);

	    if (alien.doShoot) {
	      alien.doShoot = false;
	      alien.shoot();
	    }
	  }
	  Invaders.alienYDown = 0;
	};

	Game.prototype.resolveBulletEnemyCollisions = function () {
		var bullets = this.player.bullets;

	  for (var i = 0, len = bullets.length; i < len; i++) {
	    var bullet = bullets[i];
	    for (var j = 0, alen = this.aliens.length; j < alen; j++) {
	      var alien = this.aliens[j];
	      if (Invaders.Util.checkRectCollision(bullet.bounds, alien.bounds)) {
	        alien.alive = bullet.alive = false;
	        this.explosionController.createExplosion(alien.position.x, alien.position.y, 'white', 70, 5, 5, 3, .15, 50);
	        this.player.score += 25;
	      }
	    }
  	}
	};

	Game.prototype.resolveBulletPlayerCollisions = function () {
		for (var i = 0, len = this.aliens.length; i < len; i++) {
	    var alien = this.aliens[i];
	    if (alien.bullet !== null && Invaders.Util.checkRectCollision(alien.bullet.bounds, this.player.bounds)) {
	      if (this.player.lives === 0) {
	        Invaders.hasGameStarted = false;
	      } else {
	        alien.bullet.alive = false;
	        this.explosionController.createExplosion(this.player.position.x, this.player.position.y, 'green', 100, 8, 8, 6, 0.001, 40);
	        this.player.position.set(Invaders.CANVAS_WIDTH / 2, Invaders.CANVAS_HEIGHT - 70);
	        this.player.lives--;
	        break;
	      }

	    }
	  }
	};

	Game.prototype.resolveCollisions = function () {
  	this.resolveBulletEnemyCollisions();
  	this.resolveBulletPlayerCollisions();
	};

	Game.prototype.updateGame = function (dt) {
		this.player.handleInput();
	  Invaders.prevKeyStates = Invaders.keyStates.slice();
	  this.player.update(dt);
	  this.updateAliens(dt);
	  this.resolveCollisions();
	};

})();