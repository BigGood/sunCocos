var mainLayer = cc.Layer.extend({
    ctor:function () {
	this._super();
	var size = cc.winSize;
	this.bgSprite = new cc.Sprite(res.mainbg_png);
	this.bgSprite.attr({
		x: size.width / 2,
		y: size.height / 2,
	});
	this.addChild(this.bgSprite, 0);
	
	
	var registItem = new cc.MenuItemImage(
			res.start_button,
			res.start_button2,	
			function () {
				ws.sendMessage("{\"type\":\"4\",\"data\":{\"message\":\"进入游戏\"}}");
			}, this);
	registItem.attr({
		x: size.width/2,
		y: size.height/3,
	});
	
	this.labell= new cc.LabelTTF("", "Arial", 30);
					this.labell.attr({
					x:cc.winSize.width/2,
					y:cc.winSize.height/3
					});
					this.labell.setFontFillColor(cc.color(255, 0, 0));
					this.addChild(this.labell, 6);
	
	this.menu = new cc.Menu(registItem);
	this.menu.x = 0;
	this.menu.y = 0;
	this.addChild(this.menu, 1);
	
	var registItem1 = new cc.MenuItemImage(
			res.exit_button,
			res.exit_button2,	
			function () {
				ws.send("exit");
				this.menu1.setVisible(false);
				this.menu.setVisible(true);
				this.scoreLabel.setString("");
				this.unschedule(this.timer);
			}, this);
	registItem1.attr({
		x: size.width/2,
		y: size.height/3,
	});
	
	
						this.msSprite = new cc.Sprite(res.messagefor);
						this.msSprite.attr({
							x: cc.winSize.width / 1.15,
							y: cc.winSize.height / 1.15,
						});
						this.addChild(this.msSprite, 7);
						this.msSprite.setVisible(false);
	
	this.menu1 = new cc.Menu(registItem1);
	this.menu1.x = 0;
	this.menu1.y = 0;
	this.menu1.setVisible(false);
	this.addChild(this.menu1, 1);
	var rflag=true;
	var registItem2 = new cc.MenuItemImage(
			res.message_png,
			res.message_png,	
			function () {
			if(rflag){
				var setLayer = cc.Layer.extend({
					ctor:function () {
					this._super();
					this.bgSprite = new cc.Sprite(res.dialog_png);
					this.bgSprite.attr({
						x: size.width / 2,
						y: size.height / 2,
					});
					this.addChild(this.bgSprite, 0);
					this.scoreLabel = new cc.LabelTTF(mainLayer1.message, "Arial", 30);
					this.scoreLabel.attr({
					x:size.width/2,
					y:size.height/2
					});
					this.scoreLabel.setFontFillColor(cc.color(255, 0, 0));
					this.addChild(this.scoreLabel, 1);
					
					}
				});
				this.setLayer2= new setLayer();
				this.addChild(this.setLayer2, 5);
				this.msSprite.setVisible(false);
				rflag=false;
			}else{
				this.removeChild(this.setLayer2);
				rflag=true;
			}
			}, this);
	registItem2.attr({
		x: size.width/1.2,
		y: size.height/1.2,
	});
	
	this.menu2 = new cc.Menu(registItem2);
	this.menu2.x = 0;
	this.menu2.y = 0;
	this.addChild(this.menu2, 1);
	//手动修改
	
	
	var mflag=true;
	var registItem3 = new cc.MenuItemImage(
			res.settings_png,
			res.settings_png,	
			function () {
				if(mflag){
				var setLayer = cc.Layer.extend({
					ctor:function () {
					this._super();
					this.bgSprite = new cc.Sprite(res.dialog_png);
					this.bgSprite.attr({
						x: size.width / 2,
						y: size.height / 2,
					});
					this.addChild(this.bgSprite, 0);
					this.scoreLabel = new cc.LabelTTF("用户名：sun", "Arial", 30);
					this.scoreLabel.attr({
					x:size.width/2,
					y:size.height/2
					});
					this.scoreLabel.setFontFillColor(cc.color(255, 0, 0));
					this.addChild(this.scoreLabel, 1);
					var objj= this;
					var registItem4 = new cc.MenuItemImage(
							res.button_bg1,
							res.button_bg2,	
							function () {
								objj.removeChild(objj.scoreLabel);
								objj.removeChild(objj.menu4);
								this._box1 = new cc.EditBox(cc.size(308, 64), new cc.Scale9Sprite("res/name_input.png"), new cc.Scale9Sprite("res/name_input.png"));
								this._box1.setString("");
								this._box1.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
								this._box1.x = size.width/2;
								this._box1.y = size.height/1.8;
								this._box1.setFontColor(cc.color(0, 0, 0));
								this._box1.setPlaceHolder("原密码")
								this._box1.setDelegate(this);
								this.addChild(this._box1);
								this._box2 = new cc.EditBox(cc.size(308, 64), new cc.Scale9Sprite("res/name_input.png"), new cc.Scale9Sprite("res/name_input.png"));
								this._box2.setString("");
								this._box2.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
								this._box2.x = size.width/2;
								this._box2.y = size.height/2;
								this._box2.setFontColor(cc.color(0, 0, 0));
								this._box2.setPlaceHolder("新密码")
								this._box2.setDelegate(this);
								this.addChild(this._box2);
								this._box3 = new cc.EditBox(cc.size(308, 64), new cc.Scale9Sprite("res/name_input.png"), new cc.Scale9Sprite("res/name_input.png"));
								this._box3.setString("");
								this._box3.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
								this._box3.x = size.width/2;
								this._box3.y = size.height/2.25;
								this._box3.setFontColor(cc.color(0, 0, 0));
								this._box3.setPlaceHolder("确认新密码")
								this._box3.setDelegate(this);
								this.addChild(this._box3);
								var registItem2 = new cc.MenuItemImage(
										res.button_bg3,
										res.button_bg4,	
										function () {
											if(this._box2.string!=this._box3.string){
												mainLayer1.labell.setVisible(true);
												mainLayer1.labell.string="两次密码输入不一致";
											}else{
											ws.sendMessage("{\"type\":\"7\",\"data\":{\"password\":\""+this._box1.string+"\",\"newPassword\":\""+this._box2.string+"\"}}");
											}
										}, this);
								registItem2.attr({
									x: size.width/2,
									y: size.height/2.6,
								});
								
								this.menu6 = new cc.Menu(registItem2);
								this.menu6.x = 0;
								this.menu6.y = 0;
								this.addChild(this.menu6, 1);
							}, this);
					registItem4.attr({
						x: size.width/2,
						y: size.height/2.3,
					});
					
					this.menu4 = new cc.Menu(registItem4);
					this.menu4.x = 0;
					this.menu4.y = 0;
					this.addChild(this.menu4, 1);
					
					}
				});
				this.setLayer1 = new setLayer();
				this.addChild(this.setLayer1, 5);
				mflag=false;
				}else{
					mainLayer1.removeChild(mainLayer1.setLayer1);
					mainLayer1.labell.setVisible(false);
					mflag=true;
				}
			}, this);
	registItem3.attr({
		x: size.width/1.4,
		y: size.height/1.2,
	});
	
	this.menu3 = new cc.Menu(registItem3);
	this.menu3.x = 0;
	this.menu3.y = 0;
	this.addChild(this.menu3, 1);
	
	
	
	
	
	
		this.scoreLabel = new cc.LabelTTF("", "Arial", 30);
		this.scoreLabel.attr({
		x:size.width/2,
		y:size.height/2
		});
		this.scoreLabel.setFontFillColor(cc.color(255, 0, 0));
		this.addChild(this.scoreLabel, 1);		
		
		
		return true;
		
		
    }
	

});

var mainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        mainLayer1 = new mainLayer();
        this.addChild(mainLayer1);
    }
});