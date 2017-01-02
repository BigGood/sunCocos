var testLayer = cc.Layer.extend({
    ctor:function () {
	this._super();
	var size = cc.winSize;
	this.bgSprite = new cc.Sprite(res.BackGround_png);
	this.bgSprite.attr({
		x: size.width / 2,
		y: size.height / 2,
	});
	this.addChild(this.bgSprite, 0);
	
	var MenuLayer1 = cc.Layer.extend({
    ctor:function () {
        this._super();
        
            var item1 = new cc.MenuItemImage(res.start_button, res.start_button2, this.onMenuCallback, this);


            item1.scaleX = 1.5;


            var menu = new cc.Menu(item1);
            menu.x = size.width / 2;
            menu.y = size.height / 2;

            this.addChild(menu, 0);

            this._centeredMenu = cc.p(menu.x, menu.y);
        

    },
    init:function () {
        this._super();

    },
    // callbacks
    onMenuCallback:function () {
         ws.sendMessage("{\"type\":\"4\",\"data\":{\"message\":\"Ω¯»Î”Œœ∑\"}}");
    }
});

	this.addChild(new MenuLayer1(),1);
	
	}
});
var testScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var mainLayer1 = new testLayer();
        this.addChild(mainLayer1);
    }
});