(function () {
	window.Invaders = window.Invaders || {};

	var Util = Invaders.Util = {};

	var getRandomArbitrary = Util.getRandomArbitrary = function (min, max) {
	  return Math.random() * (max - min) + min;
	};

	var getRandomInt = Util.getRandomInt = function (min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var clamp = Util.clamp = function (num, min, max) {
	  return Math.min(Math.max(num, min), max);
	};

	var valueInRange = Util.valueInRange = function (value, min, max) {
	  return (value <= max) && (value >= min);
	};

	var checkRectCollision = Util.checkRectCollision = function (A, B) {
	  var xOverlap = valueInRange(A.x, B.x, B.x + B.w) ||
	    this.valueInRange(B.x, A.x, A.x + A.w);

	  var yOverlap = valueInRange(A.y, B.y, B.y + B.h) ||
	    this.valueInRange(B.y, A.y, A.y + A.h);
	  return xOverlap && yOverlap;
	};

	var isKeyDown = Util.isKeyDown = function (key) {
	  return Invaders.keyStates[key];
	};

	var wasKeyPressed = Util.wasKeyPressed = function (key) {
	  return !Invaders.prevKeyStates[key] && Invaders.keyStates[key];
	};

	var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };

    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();