(function () {
	window.Invaders = window.Invaders || {};

	var Point2D = Invaders.Point2D = function (x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

	var set = Point2D.prototype.set = function (x, y) {
		this.x = x;
		this.y = y;
	};


	var Rect = Invaders.Rect = function (x, y, w, h) {
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 0;
		this.h = h || 0;
	};

	var set = Rect.prototype.set = function (x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	};
})();