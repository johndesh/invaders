(function () {
	window.Invaders = window.Invaders || {};

	var BaseSprite = Invaders.BaseSprite = function (img, x, y) {
		this.img = img;
    this.position = new Invaders.Point2D(x, y);
    this.scale = new Invaders.Point2D(1, 1);
    this.bounds = new Invaders.Rect(x, y, img.width, img.height);
    this.doLogic = true;
	};

	BaseSprite.prototype._updateBounds = function () {
		this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
	};

	BaseSprite.prototype._drawImage = function () {
		Invaders.ctx.drawImage(this.img, this.position.x, this.position.y);
	};

	BaseSprite.prototype.draw = function () {
		this._updateBounds();

		this._drawImage();
	};

	var SpriteSheet = Invaders.SpriteSheet = function (sheetImg, clipRect, x, y) {
		Invaders.BaseSprite.call(this, sheetImg, x, y);
		this.clipRect = clipRect;
		this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
	};

	Invaders.Util.inherits(SpriteSheet, BaseSprite);

	SpriteSheet.prototype._updateBounds = function () {
		var w = ~~(0.5 + this.clipRect.w * this.scale.x);
    var h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w / 2, this.position.y - h / 2, w, h);
	};

	SpriteSheet.prototype._drawImage = function () {
		Invaders.ctx.save();
    Invaders.ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
    Invaders.ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w * 0.5), ~~(0.5 + -this.clipRect.h * 0.5), this.clipRect.w, this.clipRect.h);
    Invaders.ctx.restore();
	};


})();