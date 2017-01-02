var ModalDialogueBox = cc.LayerColor.extend({  
    _listener: null,  
    ctor: function() {  
        this._super(cc.color.BLACK);  
        this.ignoreAnchorPointForPosition(false);   //����ê������Ϊfalse��Ĭ��Ϊtrue��ê��(0, 0)  
        this.setOpacity(128);       //͸����  
   
        //��ʼ���Ի���  
        this._initDialog();  
   
        return true;  
    },  
   
    onEnter: function()  
    {  
        this._super();  
        //������  
        this._listener = new cc.EventListener.create({  
            event: cc.EventListener.TOUCH_ONE_BY_ONE,  
            swallowTouches: false,  
            onTouchBegan: function(touch, event)  
            {  
                return true;  
            }  
        });  
   
        //��Ӵ�������  
        cc.eventManager.addListener(this._listener, this);  
    },  
   
    //��ʼ���Ի���  
    _initDialog: function()  
    {  
        var winSize = cc.winSize;  
   
        //����  
        var bg = new cc.Sprite(res.dialog_png);  
        bg.setPosition(cc.p(winSize.width / 2, winSize.height / 2));  
        this.addChild(bg, 0, 101);  
   
        //OK��ť  
        var OKLabel = new cc.LabelTTF("ȷ��", "Arial", 36);  
        var OKMenuItem = new cc.MenuItemLabel(OKLabel, this._onCallback, this);  
        OKMenuItem.setPosition(cc.p(150, 50));  
   
 
   
        //�˵�  
        var menu = new cc.Menu(OKMenuItem);  
        menu.setPosition(cc.p(0, 0));  
        bg.addChild(menu);      //ע������ӵ���������  
   
        this.setVisible(false);     //Ĭ������Ϊ���ɼ�  
    },  
   
    _onCallback: function()  
    {  
        this.hidden();  
    },  
   
    //����  
    popup: function()  
    {  
        this.setVisible(true);  
        this._listener.setSwallowTouches(true);  
   
        var bg = this.getChildByTag(101);  
        bg.setScale(0);  
        var scaleTo = new cc.ScaleTo(0.1, 2);  
        var rotateBy = new cc.RotateBy(0.1, 0, 0);  
        var spawn = new cc.Spawn(scaleTo, rotateBy);  
        bg.runAction(spawn);  
    },  
   
    //����  
    hidden: function()  
    {  
        this.setVisible(false);  
        this._listener.setSwallowTouches(false);  
    },  
   
    onExit: function()  
    {  
        this._super();  
        //�Ƴ���������  
        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE, true);  
    }  
});