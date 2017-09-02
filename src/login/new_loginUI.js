/**
 * 作者:penny
 *
 */

var newLogin = UIBase.extend({
    _touchPriority: 0,
    ctor: function () {
        this._super();

        g_bIsShowShinInUI = true;

        var winSize = cc.director.getWinSize();
        var bg0 = cc.Sprite.create("res/new_hall/bg.jpg");
        if (1.4 > winSize.width / winSize.height) bg0.setScale(1.3333);
        bg0.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(bg0);

        var bgNode = cc.Sprite.create("res/new_hall/login/beijing.png");
        bgNode.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(bgNode);

        var titleNode = cc.Node.create();
        var loginTitleBg = cc.Sprite.create("res/new_hall/login/light.png");
        titleNode.addChild(loginTitleBg);
        var loginTile = cc.Sprite.create("res/new_hall/login/userlogin.png");
        titleNode.addChild(loginTile);
        titleNode.attr({
            x: winSize.width / 2,
            y: winSize.height / 2 + 165
        });
        this.addChild(titleNode);

        //TODO 目前这块可省略 调用了IOS的方法
        var isWXAppInstalled = true;
        // if (cc.sys.os == cc.sys.OS_IOS) {
        //     isWXAppInstalled = jsb.reflection.callStaticMethod("AppController", "isWXAppInstalled");
        // }

        if (isWXAppInstalled) {
            //账号登录
            var accontNode = UIVRButton.create();
            var account_sprite = cc.Sprite.create("res/new_hall/login/accountloginbt.png");
            accontNode.addChild(account_sprite);
            accontNode.setTouchEnabled(true, this._touchPriority - 1);
            accontNode.addTouchEventListener(this.onButtonAccountLogin, this);
            accontNode.attr({
                x: winSize.width / 2,
                y: winSize.height / 2
            });
            this.addChild(accontNode);
        }
    }
});

var newLoginUIIn = null;
newLogin.scene = function (errorText) {
    var scene = new cc.Scene();
    newLoginUIIn = new newLogin(errorText);
    scene.addChild(newLoginUIIn);
    return scene;
};

newLogin.prototype.onExit = function () {
    UIBase.prototype.onExit().call(this);
    newLoginUIIn = null;
};

/**
 * 账号登录的回调
 * @param sender
 * @param type
 */
newLogin.prototype.onButtonAccountLogin = function (sender, type) {
    if (ccui.Widget.TOUCH_ENDED === type) {
        cc.log("onButtonAccountLogin");
        //这里要删除弹框的操作
        RemoveWindow("accountLoginUI");
        var node = accountLogin.create();
        PopWindow(node);
    }
};

/**
 * 账号登录ui
 */
var accountLogin = UIBase.extend({
    _touchPriority: -128,
    text_box1: null,
    text_box2: null,
    _open: false,
    _acountXiaLabg: null,
    _baseAccountData: [],
    tableView: null,
    _bgvrnode: [],
    _pianyi: -40,

    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        this.attr({
            x: winSize.width / 2,
            y: winSize.height / 2 + 20
        });

        for (var i = 0; i < 100; i++) {
            this._bgvrnode[i] = 0;
        }

        var baseData = cc.sys.localStorage.getItem("baseAccountData");
        if (baseData) {
            this._baseAccountData = JSON.parse(baseData);
        }

        var bg = cc.Sprite.create("res/new_hall/login/loginbg.png");
        bg.attr({
            x: 0,
            y: this._pianyi
        });
        this.addChild(bg);
        var closeButton = UIVRButton.create();
        var closeButtonBG = cc.Sprite.create("res/new_hall/closebutton.png");
        closeButton.addChild(closeButtonBG);
        closeButton.setTouchEnabled(true, this._touchPriority - 10);
        closeButton.addTouchEventListener(this.onButtonclose, this);
        closeButton.attr({
            x: 390,
            y: 240 + this._pianyi
        });
        this.addChild(closeButton);

        var titleNode = cc.Node.create();
        var loginTitleBG = cc.Sprite.create("res/new_hall/login/light.png");
        titleNode.addChild(loginTitleBG);
        var logintitle = cc.Sprite.create("res/new_hall/login/userlogin.png");
        titleNode.addChild(logintitle);
        titleNode.attr({
            x: 0,
            y: 305 + this._pianyi
        });
        this.addChild(titleNode);

        var textBG = new cc.Scale9Sprite("res/new_hall/login/textbg.png");
        var width = 730;
        var height = 88;
        textBG.setContentSize(cc.size(width, height));
        textBG.setPreferredSize(cc.size(width, height));
        textBG.attr({
            x: 0,
            y: 80
        });
        this.addChild(textBG);

        this.text_box1 = new cc.EditBox(cc.size(600, 50), new cc.Scale9Sprite("res/setting/whitebg.png"));
        //修改为不使用密文
        this.text_box1.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);
        this.text_box1.setFontName("Helvetica");
        this.text_box1.setFontSize(40);
        this.text_box1.setColor(cc.color(90, 93, 98));
        this.text_box1.setPlaceHolder("请输入账号");
        this.text_box1.setPlaceholderFontName("Helvetica");
        this.text_box1.setPlaceholderFontSize(40);
        this.text_box1.setPlaceholderFontColor(cc.color(90, 93, 98));
        this.text_box1.setMaxLength(30);
        this.text_box1.setDelegate(this);
        this.addChild(this.text_box1);
        this.text_box1.attr({
            x: -40,
            y: 80
        });

        if (DC.m_platform !== cc.sys.DESKTOP_BROWSER) {
            this.text_box1.setTouchEnabled(false);
        }
        this.pullDownButton();


        var registerbuttonNode = UIVRButton.create();
        var registerbg = cc.Sprite.create("res/new_hall/login/zhuce.png");
        registerbuttonNode.addChild(registerbg);
        registerbuttonNode.setTouchEnabled(true, this._touchPriority - 1);
        registerbuttonNode.addTouchEventListener(this.onButtonregister, this);
        //registerbuttonNode.setTouchRect(cc.rect(-60,-25,120,50));
        registerbuttonNode.attr({
            x: -190,
            y: -130 + this._pianyi
        });
        this.addChild(registerbuttonNode);

        var forgetButton = UIVRButton.create();
        var forgetBG = cc.Sprite.create("res/new_hall/login/forget.png");
        forgetButton.addChild(forgetBG);
        forgetButton.setTouchEnabled(true, this._touchPriority - 1);
        forgetButton.addTouchEventListener(this.onButtonForget, this);
        forgetButton.attr({
            x: 0,
            y: -300
        });
        this.addChild(forgetButton);

        this.setTouchEnabled(true, this._touchPriority, true);
    },
    /**
     * 登录历史记录
     */
    pullDownButton: function () {
        cc.log("pullDownButton=======");
        var BG;
        var node = this.getChildByName("pullDownButton");
        if (node) node.removeFromParent(true);
        node = UIVRButton.create();
        if (this._open) {
            BG = cc.Sprite.create("res/new_hall/login/shangla.png");
        } else {
            BG = cc.Sprite.create("res/new_hall/login/xiala.png");
        }
        node.addChild(BG);
        node.setTouchEnabled(true);
        node.addTouchEventListener(this.onButtonUpDownPull, this);
        node.setTouchRect(cc.rect(-50, -50, 100, 100));
        node.attr({
            x: 300,
            y: 80
        });
        this.addChild(node, 0, "pullDownButton");
    },
    onButtonregister: function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED === type) {
            cc.log("onButtonregister");
            cc.director.runScene(new cc.TransitionFade(0.5, registerAccount.create()));
            RemoveWindow("accountLoginUI");
        }
    },
    onButtonForget: function (serder, type) {
        if (ccui.Widget.TOUCH_ENDED === type) {
            RemoveWindow("accountLoginUI");
            cc.log("onButtonForget");


        }
    },
    onButtonUpDownPull: function (sender, type) {
        cc.log("onButtonUpDownPull");
    }
});

accountLogin.create = function () {
    // DelWindow("accountLoginUI");
    var ly = new accountLogin();
    ly.setName("accountLoginUI");
    return ly;
};

/**
 * 移除精灵
 */
accountLogin.prototype.onButtonclose = function () {
    this.removeFromParent(true);
};

var registerAccount = UIBase.extend({});


/**
 * 注册
 */
var registerAccountUIIn = null;
registerAccount.create = function (uid, pwd, name, type) {
    var ss = new cc.Scene();
    registerAccountUIIn = new registerAccount(uid, pwd, name);
    registerAccountUIIn._type = type;
    ss.addChild(registerAccountUIIn);
    return ss;
};