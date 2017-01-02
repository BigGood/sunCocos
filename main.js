/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // Set "noCache" to true can make the loader ignoring the html page cache while loading your resources, 
    // especially useful in Android web browsers.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
var ws;
	var websocketCon ;
	var name;
	var scene ;
	var mapJson;
	var mainLayer1;
	var playLayer1;
	var conflag=false;
cc.game.onStart = function(){
		cc.loader.loadJson("res/map1.json", function(err, text) {
		mapJson = text;           
		});
	websocketCon = function(obj){
	ws = new WebSocket("ws://139.129.29.58/sun/websocket1");
			ws.onmessage = function(evt){ 
			var result = JSON.parse(evt.data);
			switch(result.type)
				{
				case "1":
				
				  break;
				case "2":
					if(result.resultCode!="0"){
					obj.scoreLabel3.string=result.message;
					}else{
						name=obj._box1.string;
						cc.director.runScene(new mainScene());
					}
				  break;
				case "3":
					if(result.resultCode!="0"){
					//obj.scoreLabel3.string=result.message;
					}else{
						cc.director.runScene(new mainScene());
					}
				  break;
				case "4":
					var scene4 = mainLayer1;
					scene4.timer=function(){
								if(scene4.scoreLabel.string.length-result.message.length>4){
									scene4.scoreLabel.setString(result.message);
								}else{
									scene4.scoreLabel.setString(scene4.scoreLabel.string+".");
								}
						};
					if(result.resultCode=="0"){
						scene4.unschedule(scene4.timer);
						cc.director.runScene(new PlayScene());
					}else if (result.resultCode=="2"){
						scene4.schedule(scene4.timer, 1);
						scene4.menu.setVisible(false);
						scene4.menu1.setVisible(true);
						scene4.scoreLabel.setString(result.message);
					}else{
						scene4.scoreLabel.setString(result.message);
					}
				  break; 
				case "5": 
					cc.director.runScene(new mainScene());
					break; 				
				case "6":
				var scene6 = playLayer1;
					if(result.resultCode=="0"){
						if(result.obj=="0"){
							scene6.szSprite.setTexture("res/dice_0"+result.num+".png");
							scene6.unschedule(scene6.timer);
							if(scene6.user1.id=="2"){
								var p=0;
								var s=parseInt(scene6.user1.place)+parseInt(result.num);
								if(s>=scene6.mapJson.map.length){
									p=s-scene6.mapJson.map.length;
									ws.sendMessage("{\"type\":\"13\",\"data\":{}}");
								}
								else{
									p=s;
								}
															
								var dorpAction = cc.MoveTo.create(0, cc.p(scene6.mapJson.map[p].x,scene6.mapJson.map[p].y));
								scene6.player2.runAction(dorpAction);
								scene6.user1.place=p;
								if(scene6.mapJson.map[p].type=="1"&&scene6.mapJson.map[p].lv=="0"){
									scene6.setLayer3.setVisible(true);
									scene6.setLayer3.index=p;
								}
								if(scene6.mapJson.map[p].user!="0"&&scene6.mapJson.map[p].user!=scene6.user1.id){
									scene6.setLayer2.setVisible(true);
									scene6.setLayer2.scoreLabel2.string="支付给玩家"+scene6.user2.name+"   "+scene6.mapJson.map[p].cost+"金钱";
									scene6.setLayer2.cost=scene6.mapJson.map[p].cost;
								}
								if(scene6.mapJson.map[p].lv!="3"&&scene6.mapJson.map[p].user==scene6.user1.id){
									scene6.setLayer1.setVisible(true);
									scene6.setLayer1.index=p;
									scene6.setLayer1.cost=scene6.mapJson.map[p].lvcost;
									scene6.setLayer1.lv=scene6.mapJson.map[p].lv;
									scene6.setLayer1.scoreLabel1.string="升级需要花费"+scene6.mapJson.map[p].lvcost+"，是否升级？";
								}
								if(conflag){
								playLayer1.rollFlag=1;
								conflag=false;
								}
							}else if(scene6.user1.id=="1"){
								var p=0;
								var s=parseInt(scene6.user1.place)+parseInt(result.num);
								if(s>=scene6.mapJson.map.length){
									p=s-scene6.mapJson.map.length;
									ws.sendMessage("{\"type\":\"13\",\"data\":{}}");
								}
								else{
									p=s;
								}
									
								var dorpAction = cc.MoveTo.create(0, cc.p(scene6.mapJson.map[p].x,scene6.mapJson.map[p].y));
								scene6.player1.runAction(dorpAction);
								scene6.user1.place=p;
								if(scene6.mapJson.map[p].type=="1"&&scene6.mapJson.map[p].lv=="0"){
									scene6.setLayer3.setVisible(true);
									scene6.setLayer3.index=p;
								}
								if(scene6.mapJson.map[p].user!="0"&&scene6.mapJson.map[p].user!=scene6.user1.id){
									scene6.setLayer2.setVisible(true);
									scene6.setLayer2.scoreLabel2.string="支付给玩家"+scene6.user2.name+"   "+scene6.mapJson.map[p].cost+"金钱";
									scene6.setLayer2.cost=scene6.mapJson.map[p].cost;
								}
								if(scene6.mapJson.map[p].lv!="3"&&scene6.mapJson.map[p].user==scene6.user1.id){
									scene6.setLayer1.setVisible(true);
									scene6.setLayer1.index=p;
									scene6.setLayer1.cost=scene6.mapJson.map[p].lvcost;
									scene6.setLayer1.lv=scene6.mapJson.map[p].lv;
									scene6.setLayer1.scoreLabel1.string="升级需要花费"+scene6.mapJson.map[p].lvcost+"，是否升级？";
								}
								if(conflag){
								playLayer1.rollFlag=2;
								conflag=false;
								}
							}
							
						}else if(result.obj=="1"){
							if(scene6.user1.id=="2"){
								var p=0;
								var s=parseInt(scene6.user2.place)+parseInt(result.num);
								if(s>=scene6.mapJson.map.length){
									p=s-scene6.mapJson.map.length;
								}
								else{
									p=s;
								}
									
								var dorpAction = cc.MoveTo.create(0, cc.p(scene6.mapJson.map[p].x,scene6.mapJson.map[p].y));
								scene6.player1.runAction(dorpAction);
								scene6.user2.place=p;
								playLayer1.rollFlag=2;
							}else if(scene6.user1.id=="1"){
								var p=0;
								var s=parseInt(scene6.user2.place)+parseInt(result.num);
								if(s>=scene6.mapJson.map.length){
									p=s-scene6.mapJson.map.length;
								}
								else{
									p=s;
								}
									
								var dorpAction = cc.MoveTo.create(0, cc.p(scene6.mapJson.map[p].x,scene6.mapJson.map[p].y));
								scene6.player2.runAction(dorpAction);
								scene6.user2.place=p;
								playLayer1.rollFlag=1;
								
							}
						}
					}
					break;
				case "7":
					var scene7 = mainLayer1;
					scene7.labell.string=result.message;
					break;
				case "8":
				var scene8 = playLayer1;
					if(result.resultCode=="0"){
						if(result.obj=="0"){
							if(scene8.user1.id=="2"){
								scene8.diSprite[result.index].setTexture("res/di_21.png");
								scene8.mapJson.map[result.index].user="2";
								scene8.mapJson.map[result.index].lv="1";
								scene8.mapJson.map[result.index].cost="250";
								scene8.mapJson.map[result.index].lvcost="1000";
							}else if(scene8.user1.id=="1"){
								scene8.diSprite[result.index].setTexture("res/di_11.png");
								scene8.mapJson.map[result.index].user="1";
								scene8.mapJson.map[result.index].lv="1";
								scene8.mapJson.map[result.index].cost="250";
								scene8.mapJson.map[result.index].lvcost="1000";							
							}
						}
						else if(result.obj=="1"){
							if(scene8.user1.id=="2"){
								scene8.diSprite[result.index].setTexture("res/di_11.png");
								scene8.mapJson.map[result.index].user="1";
								scene8.mapJson.map[result.index].lv="1";
								scene8.mapJson.map[result.index].cost="250";
								scene8.mapJson.map[result.index].lvcost="1000";
							}else if(scene8.user1.id=="1"){
								scene8.diSprite[result.index].setTexture("res/di_21.png");
								scene8.mapJson.map[result.index].user="2";
								scene8.mapJson.map[result.index].lv="1";
								scene8.mapJson.map[result.index].cost="250";
								scene8.mapJson.map[result.index].lvcost="1000";
							}
						}
						scene8.user1.money=parseInt(scene8.user1.money)+parseInt(result.cost1);
						scene8.user2.money=parseInt(scene8.user2.money)+parseInt(result.cost2);
						if(scene8.user1.money<0||scene8.user2.money<0){cc.director.runScene(new mainScene());}
						scene8.scoreLabel.setString("金钱数："+scene8.user1.name+":"+scene8.user1.money+"  "+scene8.user2.name+":"+scene8.user2.money);
					}
					playLayer1.setLayer3.setVisible(false);
					break;
				case "9":
					var scene9 = playLayer1;
					if(result.resultCode=="0"){
						scene9.user1.money=parseInt(scene9.user1.money)+parseInt(result.cost1);
						scene9.user2.money=parseInt(scene9.user2.money)+parseInt(result.cost2);
						if(scene9.user1.money<0||scene9.user2.money<0){cc.director.runScene(new mainScene());}
						scene9.scoreLabel.setString("金钱数："+scene9.user1.name+":"+scene9.user1.money+"  "+scene9.user2.name+":"+scene9.user2.money);
					}
					playLayer1.setLayer2.setVisible(false);
				break;
				case "10":
				var scene10 = playLayer1;
					if(result.resultCode=="0"){
						if(result.obj=="0"){
							if(scene10.user1.id=="2"){
								if(result.lv=="2"){
									scene10.diSprite[result.index].setTexture("res/di_22.png");
								}else if(result.lv=="3"){
									scene10.diSprite[result.index].setTexture("res/di_23.png");
								}
								
								scene10.mapJson.map[result.index].lv=result.lv;
								scene10.mapJson.map[result.index].cost=result.cost;
								scene10.mapJson.map[result.index].lvcost=parseInt(result.cost)*2;
							}else if(scene10.user1.id=="1"){
								if(result.lv=="2"){
									scene10.diSprite[result.index].setTexture("res/di_12.png");
								}else if(result.lv=="3"){
									scene10.diSprite[result.index].setTexture("res/di_13.png");
								}
								scene10.mapJson.map[result.index].lv=result.lv;
								scene10.mapJson.map[result.index].cost=result.cost;
								scene10.mapJson.map[result.index].lvcost=parseInt(result.cost)*2;							
							}
						}
						else if(result.obj=="1"){
							if(scene10.user1.id=="2"){
								if(result.lv=="2"){
									scene10.diSprite[result.index].setTexture("res/di_12.png");
								}else if(result.lv=="3"){
									scene10.diSprite[result.index].setTexture("res/di_13.png");
								}
								scene10.mapJson.map[result.index].lv=result.lv;
								scene10.mapJson.map[result.index].cost=result.cost;
								scene10.mapJson.map[result.index].lvcost=parseInt(result.cost)*2;
							}else if(scene10.user1.id=="1"){
								if(result.lv=="2"){
									scene10.diSprite[result.index].setTexture("res/di_22.png");
								}else if(result.lv=="3"){
									scene10.diSprite[result.index].setTexture("res/di_23.png");
								}
								scene10.mapJson.map[result.index].lv=result.lv;
								scene10.mapJson.map[result.index].cost=result.cost;
								scene10.mapJson.map[result.index].lvcost=parseInt(result.cost)*2;
							}
						}
						scene10.user1.money=parseInt(scene10.user1.money)+parseInt(result.cost1);
						scene10.user2.money=parseInt(scene10.user2.money)+parseInt(result.cost2);
						if(scene10.user1.money<0||scene10.user2.money<0){cc.director.runScene(new mainScene());}
						scene10.scoreLabel.setString("金钱数："+scene10.user1.name+":"+scene10.user1.money+"  "+scene10.user2.name+":"+scene10.user2.money);
					}
					playLayer1.setLayer1.setVisible(false);
					break;
				case "11":
					var scene11 = playLayer1;
					scene11.user1={"id":result.id1,"name":result.user1Name,"place":"0","money":"10000"};
					scene11.user2={"id":result.id2,"name":result.user2Name,"place":"0","money":"10000"};
					scene11.scoreLabel.string="金钱数："+scene11.user1.name+":"+scene11.user1.money+"  "+scene11.user2.name+":"+scene11.user2.money
					break;
				case "12":
				var scene12 = mainLayer1;
					if(scene12==null){
					break;
					}else{
						scene12.message=result.message;
						scene12.msSprite.setVisible(true);
						break;
					}
				case "13": 
				var scene13 = playLayer1;
					scene13.user1.money=parseInt(scene13.user1.money)+parseInt(result.cost1);
					scene13.user2.money=parseInt(scene13.user2.money)+parseInt(result.cost2);
					scene13.scoreLabel.setString("金钱数："+scene13.user1.name+":"+scene13.user1.money+"  "+scene13.user2.name+":"+scene13.user2.money);
					break; 		
				default:
				  alert("程序错误");
				}
			};
			ws.sendMessage = (function(num) {
				var message = num;
				if (message != '') {
					ws.send(message);
				}
			});
			ws.onopen = function(event){
				ws.send("{\"type\":\"2\",\"data\":{\"username\":\""+obj._box1.string+"\",\"password\":\""+obj._box2.string+"\"}}");
	};
	}
	cc.LoaderScene.preload(g_resources, function () {
    cc.director.runScene(new StartScene());
	}, this);
};
cc.game.run();