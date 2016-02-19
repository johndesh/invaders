(function () {
	window.Invaders = window.Invaders || {};

	var canvas = Invaders.canvas = null;
	var ctx = Invaders.ctx = null;
	var spriteSheetImg = Invaders.spriteSheetImg = null;
	var bulletImg = Invaders.bulletImg = null;
	var keyStates = Invaders.keyStates = null;
	var prevKeyStates = Invaders.prevKeyStates = null;
	var lastTime = Invaders.lastTime = 0;
	var player = Invaders.player = null;
	var aliens = Invaders.aliens = [];
	var particleManager = Invaders.particleManager = null;
	var updateAlienLogic = Invaders.updateAlienLogic = false;
	var alienDirection = Invaders.alienDirection = -1;
	var alienYDown = Invaders.alienYDown = 0;
	var alienCount = Invaders.alienCount = 0;
	var wave = Invaders.wave = 1;
	var hasGameStarted = Invaders.hasGameStarted = false;
})();