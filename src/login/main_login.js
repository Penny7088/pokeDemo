/**
 * 作者:penny
 *
 */

// UIMainLogin.scene = function () {
//     var scene = new cc.scene();
//     var mainLogin = new UIMainLogin();
//     scene.addChild(mainLogin);
//     return scene;
// };
var UIMain =  cc.Scene.extend({
    onEnter:function () {
        var mainLogin = new UIMainLogin();
        this.addChild(mainLogin);
    }
});

UIMainLogin.prototype._toEnter = function () {
    var self = this;


};
var UIMainLogin = cc.Node.extend({
    _am: null,
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        var delayTime = 0.5;
        if (cc.sys.os !== cc.sys.OS_IOS) {
            delayTime = 1.0;
        }

        var login_bg = new cc.Sprite("res/login/login.jpg");
        this.addChild(login_bg, -1);
        login_bg.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });

        var self = this;
        this.scheduleOnce(function (dt) {
            if (!cc.sys.isNative || cc.sys.OS_WINDOWS === cc.sys.os) {
                self._toEnter();
            } else {
                // self._toLoad();
                self._toEnter();
            }
        }, delayTime);

    }
});