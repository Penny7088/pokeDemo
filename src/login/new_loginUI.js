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

        //账号背景
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
        //下拉框
        this.pullDownButton();

        //.9密码图背景
        var passWDBG = new cc.Scale9Sprite("res/new_hall/login/textbg.png");
        passWDBG.setContentSize(cc.size(width, height));
        passWDBG.setPreferredSize(cc.size(width, height));
        passWDBG.attr({
            x: 0,
            y: -40
        });
        this.addChild(passWDBG);
        this.text_box2 = new cc.EditBox(cc.size(600, 50), new cc.Scale9Sprite("res/setting/whitebg.png"));
        this.text_box2.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);
        this.text_box2.setFontName("Helvetica");
        this.text_box2.setFontSize(40);
        this.text_box2.setColor(cc.color(90, 93, 98));
        this.text_box2.setPlaceHolder("请输入密码");
        this.text_box2.setPlaceholderFontName("Helvetica");
        this.text_box2.setPlaceholderFontSize(40);
        this.text_box2.setPlaceholderFontColor(cc.color(90, 93, 98));
        this.text_box2.setMaxLength(40);
        this.text_box2.setDelegate(this);
        this.addChild(this.text_box2);
        this.text_box2.attr({
            x: -40,
            y: -40
        });
        if (DC.m_platform !== cc.sys.DESKTOP_BROWSER) {
            this.text_box2.setTouchEnabled(false);
        }

        //注册
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

        //登录按钮
        var loginButton = UIVRButton.create();
        var loginBG = cc.Sprite.create("res/new_hall/login/denglu.png");
        loginButton.addChild(loginBG);
        loginButton.setTouchEnabled(true, this._touchPriority - 1);
        loginButton.addTouchEventListener(this.onLogin(), this);
        loginButton.attr({
            x: 190,
            y: -130 + this._pianyi
        });
        this.addChild(loginButton);

        //忘记密码
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
        node.setTouchEnabled(true, this._touchPriority - 1);
        node.addTouchEventListener(this.onButtonUpDownPull, this);
        node.setTouchRect(cc.rect(-50, -50, 100, 100));
        node.attr({
            x: 300,
            y: 80
        });
        this.addChild(node, 0, "pullDownButton");
    },//注册回调
    onButtonregister: function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED === type) {
            cc.log("onButtonregister");
            cc.director.runScene(new cc.TransitionFade(0.5, registerAccount.create()));
            RemoveWindow("accountLoginUI");
        }
    },//忘记密码回调
    onButtonForget: function (serder, type) {
        if (ccui.Widget.TOUCH_ENDED === type) {
            RemoveWindow("accountLoginUI");
            cc.log("onButtonForget");
            //TODO

        }
    },//登录回调
    onLogin: function (sender, type) {

    },//下拉回调
    onButtonUpDownPull: function (sender, type) {
        cc.log("onButtonUpDownPull");
        if (ccui.Widget.TOUCH_ENDED === type) {
            if (this._open) {
                this._open = false;
                if (this.text_box2) this.text_box2.setVisible(true);
                var moreNode = this.getChildByName("MoreAccount");
                if (moreNode) moreNode.removeFromParent(true);
                this.pullDownButton();
            } else {
                this._open = true;
                if (this.text_box2) this.text_box2.setVisible(false);
                this.pullDownButton();
                var node = cc.Node.create();
                var selectAccountBG = new cc.Scale9Sprite("res/new_hall/login/textbg.png");
                selectAccountBG.setContentSize(cc.size(730, 290));
                selectAccountBG.setPreferredSize(cc.size(730, 290));
                node.attr({
                    x: 0,
                    y: -110
                });
                node.addChild(selectAccountBG);
                this.addChild(node, 1, "MoreAccount");
                cc.sys.localStorage.setItem("baseAccountData", "15973077088");
                cc.sys.localStorage.setItem("baseAccountData", "15963077089");
                var baseData = cc.sys.localStorage.getItem("baseAccountData");
                if (baseData) {
                    this._baseAccountData = JSON.parse(baseData);
                }

                //TODO Uncaught TypeError: this._dataSource.numberOfCellsInTableView is not a function 这里报错
                this.tableView = new cc.TableView(this, cc.size(700, 260));
                this.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
                this.tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
                this.tableView.setDelegate(this);
                node.addChild(this.tableView, 1);
                this.tableView.setTouchEnabled(true);
                // this.tableView.setTouchEnabledEx(true, this._touchPriority - 2, true);
                this.tableView.reloadData();
                this.tableView.attr({
                    x: -350,
                    y: -135
                });
            }
        }
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

// accountLogin.prototype.onButtonUpDownPull = function (serder, type) {
//     cc.log("onButtonUpDownPull");
//     if (ccui.Widget.TOUCH_ENDED === type) {
//         if (this._open) {
//             this._open = false;
//             if (this.text_box2) this.text_box2.setVisible(true);
//             var moreNode = this.getChildByName("MoreAccount");
//             if (moreNode) moreNode.removeFromParent(true);
//             this.pullDownButton();
//         } else {
//             this._open = true;
//             if (this.text_box2) this.text_box2.setVisible(false);
//             this.pullDownButton();
//             var node = cc.Node.create();
//             var selectAccountBG = new cc.Scale9Sprite("res/new_hall/login/textbg.png");
//             selectAccountBG.setContentSize(cc.size(730, 290));
//             selectAccountBG.setPreferredSize(cc.size(730, 290));
//             node.attr({
//                 x: 0,
//                 y: -110
//             });
//             node.addChild(selectAccountBG);
//             this.addChild(node, 1, "MoreAccount");
//             var baseData = cc.sys.localStorage.getItem("baseAccountData");
//             if (baseData) {
//                 this._baseAccountData = JSON.parse(baseData);
//             }
//
//             this.tableView = new cc.TableView(this, cc.size(700, 260));
//             this.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
//             this.tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
//             this.tableView.setDelegate(this);
//             node.addChild(this.tableView, 1);
//             this.tableView.setTouchEnabled(true);
//             // this.tableView.setTouchEnabledEx(true, this._touchPriority - 2, true);
//             this.tableView.reloadData();
//             this.tableView.attr({
//                 x: -350,
//                 y: -135
//             });
//
//         }
//     }
// };
//
// accountLogin.prototype.pullDownButton = function () {
//     cc.log("pullDownButton=======");
//     var node = this.getChildByName("pullDownButton");
//     if (node) node.removeFromParent(true);
//     node = UIVRButton.create();
//     if (this._open) {
//         var BG = cc.Sprite.create("res/new_hall/login/shangla.png");
//     } else {
//         var BG = cc.Sprite.create("res/new_hall/login/xiala.png");
//     }
//     node.addChild(BG);
//     node.setTouchEnabled(true, this._touchPriority - 1);
//     node.addTouchEventListener(this.onButtonUpDownPull, this);
//     node.setTouchRect(cc.rect(-50, -50, 100, 100));
//     node.attr({
//         x: 300,
//         y: 80
//     });
//     this.addChild(node, 0, "pullDownButton");
// };

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