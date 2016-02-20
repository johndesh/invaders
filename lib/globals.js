(function () {
	window.Invaders = window.Invaders || {};

	Invaders.canvas = null;
	Invaders.ctx = null;
	Invaders.spriteSheetImg = null;
	Invaders.bulletImg = null;
	Invaders.keyStates = null;
	Invaders.prevKeyStates = null;
	Invaders.lastTime = 0;
	Invaders.aliensShouldUpdate = false;
	Invaders.alienDirection = -1;
	Invaders.alienYDown = 0;
	Invaders.alienCount = 0;
	Invaders.wave = 1;
	Invaders.hasGameStarted = false;
})();