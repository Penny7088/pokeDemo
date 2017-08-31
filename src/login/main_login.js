/**
 * penny
 */

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

UIMainLogin.prototype._toEnter = function () {
    var self = this;
    cc.log("====coming = in ====");
    cc.loader.loadJs(["src/jsList.js"], function () {
        cc.loader.loadJs(jsList, function () {
            if (!cc.sys.isNative || cc.sys.os === cc.sys.OS_WINDOWS) {
                cc.log("windows===========");
            } else {
                if (self._am) gd_version = self._am.getLocalManifest().getVersion();
            }

            cc.LoaderScene.preload(g_resources, function () {
                if (gb_localData.audioMusic) {
                    cc.audioEngine.playMusic(g_mapAudio.back, true);
                }

                DC.init();

                cc.director.runScene(newLogin.scene());
            }, self);

        });
    });
};

UIMainLogin.scene = function () {
    var scene = new cc.Scene();
    var mainLogin = new UIMainLogin();
    scene.addChild(mainLogin);
    return scene;
};
