(function () {
	window.Invaders = window.Invaders || {};

	var Explosion = Invaders.Explosion = function() {
    this.particlePool = [];
    this.particles = [];
    this.sound = new Audio('./assets/sounds/Explosion4.wav');
  };

  Explosion.prototype.draw = function() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var particle = this.particles[i];
      particle.moves++;
      particle.x += particle.xunits;
      particle.y += particle.yunits + (particle.gravity * particle.moves);
      particle.life--;

      if (particle.life <= 0) {
        if (this.particlePool.length < 100) {
          this.particlePool.push(this.particles.splice(i, 1));
        } else {
          this.particles.splice(i, 1);
        }
      } else {
        Invaders.ctx.globalAlpha = (particle.life) / (particle.maxLife);
        Invaders.ctx.fillStyle = particle.color;
        Invaders.ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
        Invaders.ctx.globalAlpha = 1;
      }
    }
  };

  Explosion.prototype.createExplosion = function(x, y, color, number, width, height, spd, grav, lif) {
    for (var i = 0; i < number; i++) {
      var angle = Math.floor(Math.random() * 360);
      var speed = Math.floor(Math.random() * spd / 2) + spd;
      var life = Math.floor(Math.random() * lif) + lif / 2;
      var radians = angle * Math.PI / 180;
      var xunits = Math.cos(radians) * speed;
      var yunits = Math.sin(radians) * speed;

      if (this.particlePool.length > 0) {
        var tempParticle = this.particlePool.pop();
        tempParticle.x = x;
        tempParticle.y = y;
        tempParticle.xunits = xunits;
        tempParticle.yunits = yunits;
        tempParticle.life = life;
        tempParticle.color = color;
        tempParticle.width = width;
        tempParticle.height = height;
        tempParticle.gravity = grav;
        tempParticle.moves = 0;
        tempParticle.alpha = 1;
        tempParticle.maxLife = life;
        this.particles.push(tempParticle);
      } else {
        this.particles.push({
          x: x,
          y: y,
          xunits: xunits,
          yunits: yunits,
          life: life,
          color: color,
          width: width,
          height: height,
          gravity: grav,
          moves: 0,
          alpha: 1,
          maxLife: life
        });
      }

    }
    this.sound.play();
  };
})();