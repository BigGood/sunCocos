var StartLayer = cc.Layer.extend({
	
    ctor:function () {
		this._super();
        var size = cc.winSize;
		 // add bg
    this.bgSprite = new cc.Sprite(res.BackGround_png);
    this.bgSprite.attr({
        x: size.width / 2,
        y: size.height / 2,
    });
    this.addChild(this.bgSprite, 0);
	
	var startSprite = new cc.Sprite(res.Start_N_png);
    startSprite.attr({
        x: size.width / 2,
        y: size.height / 1.5,
    });
    this.addChild(startSprite, 1);
	
	
	this._box1 = new cc.EditBox(cc.size(308, 64), new cc.Scale9Sprite("res/name_input.png"), new cc.Scale9Sprite("res/name_input.png"));
        this._box1.setString("");
        this._box1.x = size.width/1.85;
        this._box1.y = size.height/2;
        this._box1.setFontColor(cc.color(0, 0, 0));
        this._box1.setDelegate(this);
        this.addChild(this._box1);
	
        this._box2 = new cc.EditBox(cc.size(308, 64), new cc.Scale9Sprite("res/name_input.png"));
        this._box2.setString("");
        this._box2.x = size.width/1.85;
        this._box2.y = size.height/2.3;
        this._box2.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this._box2.setFontColor(cc.color(0, 0, 0));
        this._box2.setPlaceholderFontColor(cc.color(255, 255, 255));
        this._box2.setDelegate(this);
        this.addChild(this._box2);
		
		this.scoreLabel3 = new cc.LabelTTF("", "Arial", 30);
		this.scoreLabel3.attr({
		x:size.width/1.92,
		y:size.height/2.6
		});
		this.scoreLabel3.setFontFillColor(cc.color(255, 0, 0));
		this.addChild(this.scoreLabel3, 1);			
	 //add login menu
     var loginItem = new cc.MenuItemImage(
            res.login_menu_1,
            res.login_menu_2,
            function () {
			var name = this._box1.string;
			var pwd = this._box2.string;
			var mainObj = this;
			if(name==""||pwd==""||name==null||pwd==null){
					mainObj.scoreLabel3.string="请输入用户名密码";
					return;
					}
			
            websocketCon(this);
            }, this);
    loginItem.attr({
        x: size.width/1.75,
        y: size.height/3,
        anchorX: 0.5,
        anchorY: 0.5
    });

    var menu = new cc.Menu(loginItem);
    menu.x = 0;
    menu.y = 0;
    this.addChild(menu, 1);
	//add regist menu
	var registItem = new cc.MenuItemImage(
            res.regist_menu_1,
            res.regist_menu_2,	
            function () {
				var xhr = cc.loader.getXMLHttpRequest();
				var mainObject = this;
				if(this._box1.string==""||this._box1.string==""||this._box1.string==null||this._box1.string==null){
					mainObject.scoreLabel3.string="请输入用户名密码";
					return;
		}
				xhr.open("POST", "http://139.129.29.58/sun/Register");
				
                xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");  
				xhr.onreadystatechange = function () {  
				if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {  
                var httpStatus = xhr.statusText;  
                var response = xhr.responseText.substring(0, 100); 
				var result = JSON.parse(response);
				if(result.resultCode!="0"){
					mainObject.scoreLabel3.string=result.message;
					}else{
						
					websocketCon(mainObject);
				  }
            }  
        }; 
				
        xhr.send("{\"type\":\"1\",\"data\":{\"username\":\""+this._box1.string+"\",\"password\":\""+this._box2.string+"\"}}");
            }, this);
    registItem.attr({
        x: size.width/2.45,
        y: size.height/3,
        anchorX: 0.5,
        anchorY: 0.5
    });

    var menu = new cc.Menu(registItem);
    menu.x = 0;
    menu.y = 0;
    this.addChild(menu, 1);
	
	   this.scoreLabel1 = new cc.LabelTTF("用户名：", "Arial", 36);
		this.scoreLabel1.attr({
        x:size.width/2.45,
        y:size.height/2
		});
		this.scoreLabel1.setFontFillColor(cc.color(0, 0, 0));
		this.addChild(this.scoreLabel1, 1);
		
		this.scoreLabel2 = new cc.LabelTTF("密    码：", "Arial", 36);
		this.scoreLabel2.attr({
        x:size.width/2.45,
        y:size.height/2.3
		});
		this.scoreLabel2.setFontFillColor(cc.color(0, 0, 0));
		this.addChild(this.scoreLabel2, 1);

		




	
        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var startLayer1 = new StartLayer();
        this.addChild(startLayer1);
    }
});

