var PlayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
		this.mapJson=mapJson;
this.rollFlag=1;
        var size = cc.winSize;
		this.scoreLabel = new cc.LabelTTF("", "华文琥珀", 30);
					this.scoreLabel.attr({
					x:cc.winSize.width/2.1,
					y:cc.winSize.height/1.7
					});
					this.scoreLabel.setFontFillColor(cc.color(255, 0, 0));
					this.addChild(this.scoreLabel, 5);
					
		var setLayer1 = cc.Layer.extend({
					ctor:function () {
					this._super();
					this.bgSprite = new cc.Sprite(res.dialog_png);
					this.bgSprite.attr({
						x: size.width / 2,
						y: size.height / 2,
					});
					this.addChild(this.bgSprite, 0);
					this.scoreLabel1 = new cc.LabelTTF("", "Arial", 30);
					this.scoreLabel1.attr({
					x:size.width/2,
					y:size.height/2
					});
					this.scoreLabel1.setFontFillColor(cc.color(255, 0, 0));
					this.addChild(this.scoreLabel1, 1);
								var registItem1 = new cc.MenuItemImage(
										res.button_true,
										res.button_true,	
										function () {
											if(playLayer1.user1.money<500){this.scoreLabel1.string="金钱不足";return;};
											ws.sendMessage("{\"type\":\"10\",\"data\":{\"lv\":\""+this.lv+"\",\"cost\":\""+this.cost+"\",\"index\":\""+this.index+"\"}}");
											conflag=true;
										}, this);
								registItem1.attr({
									x: size.width/1.7,
									y: size.height/2.6,
								});
								
								this.menu1 = new cc.Menu(registItem1);
								this.menu1.x = 0;
								this.menu1.y = 0;
								this.addChild(this.menu1, 1);
								var registItem2 = new cc.MenuItemImage(
										res.button_false,
										res.button_false,	
										function () {
											playLayer1.setLayer1.setVisible(false);
											conflag=true;
										}, this);
								registItem2.attr({
									x: size.width/2.3,
									y: size.height/2.6,
								});
								
								this.menu2 = new cc.Menu(registItem2);
								this.menu2.x = 0;
								this.menu2.y = 0;
								this.addChild(this.menu2, 1);
					}
					});	
				
				this.setLayer1= new setLayer1();
				this.addChild(this.setLayer1,7);
				this.setLayer1.setVisible(false);
				//this.addChild(this.setLayer2, 5);
		var setLayer2 = cc.Layer.extend({
					ctor:function () {
					this._super();
					this.bgSprite = new cc.Sprite(res.dialog_png);
					this.bgSprite.attr({
						x: size.width / 2,
						y: size.height / 2,
					});
					this.addChild(this.bgSprite, 0);
					this.scoreLabel2 = new cc.LabelTTF("", "Arial", 30);
					this.scoreLabel2.attr({
					x:size.width/2,
					y:size.height/2
					});
					this.scoreLabel2.setFontFillColor(cc.color(255, 0, 0));
					this.addChild(this.scoreLabel2, 1);
					var registItem1 = new cc.MenuItemImage(
										res.button_bg3,
										res.button_bg4,	
										function () {
											if(playLayer1.user1.money<500){this.scoreLabel2.string="金钱不足";return;};
											ws.sendMessage("{\"type\":\"9\",\"data\":{\"cost\":\""+this.cost+"\"}}");
											conflag=true;
										}, this);
								registItem1.attr({
									x: size.width/2,
									y: size.height/2.6,
								});
								
								this.menu1 = new cc.Menu(registItem1);
								this.menu1.x = 0;
								this.menu1.y = 0;
								this.addChild(this.menu1, 1);
					}
				});
				this.setLayer2= new setLayer2();
				this.addChild(this.setLayer2,7);
				this.setLayer2.setVisible(false);
		var setLayer3 = cc.Layer.extend({
					ctor:function () {
					this._super();
					this.bgSprite = new cc.Sprite(res.dialog_png);
					this.bgSprite.attr({
						x: size.width / 2,
						y: size.height / 2,
					});
					this.addChild(this.bgSprite, 0);
					this.scoreLabel3 = new cc.LabelTTF("购买需要花费500，是否购买？", "Arial", 30);
					this.scoreLabel3.attr({
					x:size.width/2,
					y:size.height/2
					});
					this.scoreLabel3.setFontFillColor(cc.color(255, 0, 0));
					this.addChild(this.scoreLabel3, 1);
								var registItem1 = new cc.MenuItemImage(
										res.button_true,
										res.button_true,	
										function () {
											if(playLayer1.user1.money<500){this.scoreLabel3.string="金钱不足";return;};
											ws.sendMessage("{\"type\":\"8\",\"data\":{\"cost\":\"500\",\"index\":\""+this.index+"\"}}");
											conflag=true;
										}, this);
								registItem1.attr({
									x: size.width/1.7,
									y: size.height/2.6,
								});
								
								this.menu1 = new cc.Menu(registItem1);
								this.menu1.x = 0;
								this.menu1.y = 0;
								this.addChild(this.menu1, 1);
								var registItem2 = new cc.MenuItemImage(
										res.button_false,
										res.button_false,	
										function () {
											playLayer1.setLayer3.setVisible(false);
											conflag=true;
										}, this);
								registItem2.attr({
									x: size.width/2.3,
									y: size.height/2.6,
								});
								
								this.menu2 = new cc.Menu(registItem2);
								this.menu2.x = 0;
								this.menu2.y = 0;
								this.addChild(this.menu2, 1);
					}
					});	
				
				this.setLayer3= new setLayer3();
				this.addChild(this.setLayer3,7);
				this.setLayer3.setVisible(false);
		
        // add bg
        this.bgSprite = new cc.Sprite(res.sea_png);
		this.bgSprite.attr({
			x: size.width / 2,
			y: size.height / 2,
		});
		this.addChild(this.bgSprite, 0);
		for(var i = 0;i<this.mapJson.map.length;i++){
			
			if(this.mapJson.map[i].dire=="0"){
				var sprite = new cc.Sprite(res.startpoint);
			}else{
				var sprite = new cc.Sprite(res.point_png);
			}
			
			if(this.mapJson.map[i].dire=="0"){
				this.mapJson.map[i].x=400;
				this.mapJson.map[i].y=200;
			
			}else if(this.mapJson.map[i].dire=="1"){
				this.mapJson.map[i].x=this.mapJson.map[i-1].x;
				this.mapJson.map[i].y=this.mapJson.map[i-1].y+100;
			}
			else if(this.mapJson.map[i].dire=="2"){
				this.mapJson.map[i].x=this.mapJson.map[i-1].x;
				this.mapJson.map[i].y=this.mapJson.map[i-1].y-100;
			}
			else if(this.mapJson.map[i].dire=="3"){
				this.mapJson.map[i].x=this.mapJson.map[i-1].x-100;
				this.mapJson.map[i].y=this.mapJson.map[i-1].y;
			}
			else if(this.mapJson.map[i].dire=="4"){
				this.mapJson.map[i].x=this.mapJson.map[i-1].x+100;
				this.mapJson.map[i].y=this.mapJson.map[i-1].y;
			}
			sprite.attr({
				x: this.mapJson.map[i].x,
				y: this.mapJson.map[i].y,
			});
			this.addChild(sprite, 1);
		}
		this.diSprite=[];
		for(var i = 0;i<this.mapJson.map.length;i++){
			var sprite = new cc.Sprite(res.di_png);	
			
				if(this.mapJson.map[i].type=="1"){

				if(this.mapJson.map[i].dire=="1"){
					this.mapJson.map[i].lx=this.mapJson.map[i].x+100;
				this.mapJson.map[i].ly=this.mapJson.map[i].y;
			}
			else if(this.mapJson.map[i].dire=="2"){

			this.mapJson.map[i].lx=this.mapJson.map[i].x-100;
				this.mapJson.map[i].ly=this.mapJson.map[i].y;
			}
			else if(this.mapJson.map[i].dire=="3"){
				this.mapJson.map[i].lx=this.mapJson.map[i].x;
				this.mapJson.map[i].ly=this.mapJson.map[i].y+100;
			}
			else if(this.mapJson.map[i].dire=="4"){
				this.mapJson.map[i].lx=this.mapJson.map[i].x;
				this.mapJson.map[i].ly=this.mapJson.map[i].y-100;
			}
				sprite.attr({
				x: this.mapJson.map[i].lx,
				y: this.mapJson.map[i].ly,
				});
				this.addChild(sprite, 1);
				this.diSprite.push(sprite);
				}else{
				this.diSprite.push(sprite);	
				}
			
			

		}

		
		this.player1 = cc.Sprite.create("res/player1_anim_05.png");
		this.player1.attr({
				x: this.mapJson.map[0].x,
				y: this.mapJson.map[0].y,
				});
		this.addChild(this.player1, 4);

		
		this.player2 = cc.Sprite.create("res/player2_anim_05.png");
		this.player2.attr({
				x: this.mapJson.map[0].x,
				y: this.mapJson.map[0].y,
				});
		this.addChild(this.player2, 4);

		//
		ws.sendMessage("{\"type\":\"11\",\"data\":{\"message\":\"玩家信息\"}}");

		
		var mainobj= this;
		var szSprite = cc.Sprite.extend({
			
		 onEnter:function () {
			this._super();
			this.addTouchEventListenser();

        },

        onExit:function () {

        this._super();
        },
	addTouchEventListenser:function(){
    this.touchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
        swallowTouches: true,
        //onTouchBegan event callback function                      
        onTouchBegan: function (touch, event) { 
		if(playLayer1.rollFlag==1&&playLayer1.user1.id==1){
		mainobj.timer=function(){
			mainobj.szSprite.setTexture("res/dice_0"+(Math.round(Math.random()*5)+1)+".png");
		}
		mainobj.schedule(mainobj.timer, 0.2);
		ws.sendMessage("{\"type\":\"6\",\"data\":{\"message\":\"掷骰子\"}}");
		playLayer1.rollFlag=2;
        }else if(playLayer1.rollFlag==2&&playLayer1.user1.id==2){
			mainobj.timer=function(){
			mainobj.szSprite.setTexture("res/dice_0"+(Math.round(Math.random()*5)+1)+".png");
		}
		mainobj.schedule(mainobj.timer, 0.2);
		ws.sendMessage("{\"type\":\"6\",\"data\":{\"message\":\"掷骰子\"}}");
		playLayer1.rollFlag=1;
		}    
		return true;   
        }
    
    });
	cc.eventManager.addListener(this.touchListener,this);
	}
    });
		this.szSprite = new szSprite("res/dice_01.png");
		this.szSprite.attr({
		x:size.width/2,
		y:size.height/2
		});
		this.addChild(this.szSprite, 1);
		
        return true;
    }
	
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        playLayer1 = new PlayLayer();
        this.addChild(playLayer1);
    }
});
