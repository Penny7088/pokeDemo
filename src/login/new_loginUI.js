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
    }
});


var newLoginUIIn = null;
newLogin.scene = function (errorText) {
    var scene = new cc.Scene();
    newLoginUIIn = new newLogin(errorText);
    scene.addChild(newLoginUIIn);
    return scene;
};