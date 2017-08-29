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
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debugging.

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

var g_GetGameScreenScaleH = 0.0;
GetGameScreenScaleH = function (b) {
    cc.log("g_GetGameScreenScaleH" + g_GetGameScreenScaleH);
    return b ? g_GetGameScreenScaleH : Math.max(g_GetGameScreenScaleH, 0);
};

var g_GetGameScreenScaleW = 0.0;
GetGameScreenScaleW = function (b) {
    cc.log("g_GetGameScreenScaleW" + g_GetGameScreenScaleW);
    return b ? g_GetGameScreenScaleW : Math.max(g_GetGameScreenScaleW, 0);
};

var g_WidthToHeghtDelScale = 1.0;
GetWidthToHeghtDelScale = function () {
    return g_WidthToHeghtDelScale;
};

var g_HeghtToWidthDelScale = 1.0;
GetHeghtToWidthDelScale = function () {
    return g_HeghtToWidthDelScale;
};


cc.game.onStart = function () {
    var sys = cc.sys;
    if (!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    /**
     enableRetina(enabled)
     视网膜支持，默认情况下，为苹果设备启用，但其他设备停用
     只会在调用setDesignResolutionPolicy时生效
     只在web中有效
     Parameters:
     {Boolean} enabled
     启用或禁用支持Retina显示屏
     */
    cc.view.enableRetina(false);

    /**
     * Method Detail
     adjustViewPort(enabled)
     设置该引擎是否修改你的网页中"viewport"元素.
     默认情况下它是启用的，我们强烈建议您不要禁用它.
     当它的启用时，你还可以设置自己的"viewport"元素，它是不会被覆盖的.
     只在web中有效
     */
    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // The game will be resized when browser size change
    /**
     * resizeWithBrowserSize(enabled)
     设置canvas大小是否随浏览器的大小改变而自动调整.
     只在web中有用
     Parameters:
     {Boolean} enabled
     是否启用随浏览器的resize事件自动调整大小
     */
    cc.view.resizeWithBrowserSize(true);

    /**
     * setProjection(projection)
     设置OpenGL投影
     它的实现可以在CCDirectorCanvas.js/CCDirectorWebGL.js中找到
     */
    cc.director.setProjection(cc.Director.PROJECTION_2D);

    //设置匡高
    var designWidth = 1280;
    var designHeight = 720;
    var winSize = cc.director.getWinSize(); //返回WebGL视图的点大小.它会考虑窗口任何形式的旋转(设备横竖方向)
    var screenWidth = winSize.width;
    var screenHeight = winSize.height;

    //匡高比例
    g_GetGameScreenScaleH = (designHeight / designWidth) - (screenHeight / screenWidth);
    g_GetGameScreenScaleW = (designWidth / designHeight) - (screenWidth / screenHeight);

    //屏幕适配
    if (cc.sys.os === cc.sys.os.OS_WINDOWS || cc.sys.os === cc.sys.os.OS_IOS) {
        cc.view.setDesignResolutionSize(designWidth, screenHeight, cc.ResolutionPolicy.SHOW_ALL);
    } else {
        if (1.4 > screenWidth / screenHeight) {
            cc.view.setDesignResolutionSize(designWidth, screenHeight, cc.ResolutionPolicy.SHOW_ALL); //全显示cc.ResolutionPolicy.SHOW_ALL
        } else if (screenWidth / designWidth > screenHeight / designHeight) {
            cc.view.setDesignResolutionSize(designWidth, designHeight, cc.ResolutionPolicy.FIXED_WIDTH);//固定宽度cc.ResolutionPolicy.FIXED_HEIGHT
        } else {
            g_WidthToHeghtDelScale = (screenWidth / designWidth) / (screenHeight / screenHeight);
            cc.view.setDesignResolutionSize(designWidth, designHeight, cc.ResolutionPolicy.FIXED_HEIGHT);//固定高度cc.ResolutionPolicy.FIXED_HEIGHT
        }
    }

    //加载资源
    var loginRes = [
        "res/login/skeleton.json",
        "res/login/skeleton.atlas",
        "res/login/skeleton.png",
        "res/login/loading.plist",
        "res/login/loading.png",
        "res/login/login/huojianlong/skeleton.json",
        "res/login/login/huojianlong/skeleton.atlas",
        "res/login/login/huojianlong/skeleton.png"
    ];
    cc.LoaderScene.preload(loginRes, function () {
        cc.spriteFrameCache.addSpriteFrames("res/login/loading.plist", "res/login/loading.png");
        cc.director.runScene(UIMainLogin.scene());
    }, this);
};
cc.game.run();