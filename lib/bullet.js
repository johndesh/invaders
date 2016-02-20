(function () {
	window.Invaders = window.Invaders || {};

	var Bullet = Invaders.Bullet = function (x, y, direction, speed) {
		Invaders.BaseSprite.call(this, Invaders.bulletImg, x, y);
		this.direction = direction;
		this.speed = speed;
		this.alive = true;
	};

	Invaders.Util.inherits(Bullet, Invaders.BaseSprite);

	var update = Bullet.prototype.update = function (dt) {
		this.position.y -= (this.speed * this.direction) * dt;

    if (this.position.y < 0) {
      this.alive = false;
    }
	};

})();