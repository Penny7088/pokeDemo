
//////////////////////////////////////////////////////////////////////////
//账号login
//////////////////////////////////////////////////////////////////////////
var UIMainLogin = cc.Node.extend({
    _am: null,
    ctor: function () {
        this._super();
        var szWinSize = cc.director.getWinSize();
        var delayTime = 0.5;
        if (cc.sys.os !== cc.sys.OS_IOS) {
            delayTime = 1.0;
        }

        var bgLogin = cc.Sprite.create("res/login/login.jpg");
        this.addChild(bgLogin, -1);
        bgLogin.attr({
            x: szWinSize.width / 2,
            y: szWinSize.height / 2
        });

        var self = this;
        this.scheduleOnce(function (dt) {
            if (!cc.sys.isNative || cc.sys.OS_WINDOWS === cc.sys.os) { // web
                // self._toEnter();
            }
            else { // mobile
                // self._toLoad();
            }
        }, delayTime);
    }
});

UIMainLogin.scene = function () {
    var ss = new cc.Scene();
    var mainLogin = new UIMainLogin();
    ss.addChild(mainLogin);
    return ss;
};








