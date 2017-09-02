/**
 * 作者:penny
 *
 */



//ui基础
UIBase = cc.Node.extend({
    __POPTag: -1,
    /**
     * 设置触摸
     * @param enable     是否开启
     * @param touchPriority  触摸优先级
     * @param bSwallow      是否消费事件
     */
    setTouchEnabled: function (enable, touchPriority, bSwallow) {
        bSwallow = (undefined === bSwallow) ? true : bSwallow;
        if (this._touchEnabled === enable) {
            return;
        }
        this._touchEnabled = enable;
        //LocalPlayEffect(g_mapAudio.button);
        if (this._touchEnabled) {
            if (!this._touchListener)
                this._touchListener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: bSwallow,
                    onTouchBegan: this.onTouchBegan.bind(this),
                    onTouchMoved: this.onTouchMoved.bind(this),
                    onTouchEnded: this.onTouchEnded.bind(this)
                });
            if (undefined === touchPriority || 0 === touchPriority)
                cc.eventManager.addListener(this._touchListener, this);
            else
                cc.eventManager.addListener(this._touchListener, touchPriority);

        } else {
            cc.eventManager.removeListener(this._touchListener);
        }
    }
});

UIBase.create = function () {
    return new UIBase();
};

/**
 * 设置消费事件
 * @param swallow
 */
UIBase.prototype.setSwallowTouches = function (swallow) {
    if (this._touchListener) { //this._touchListener  只要这个值不是null,undefined和0  就是TRUE
        this._touchListener.setSwallowTouches(swallow);
    }
};


UIBase.prototype.isSwallowTouches = function () {
    if (this._touchListener) {
        return this._touchListener.isSwallowTouches();
    }
    return false;
};

UIBase.prototype.onExit = function () {
    if (this._touchEnabled) {
        this.setTouchEnabled(false);
    }

    // if(-1 !== this.__POPTag){
    //     for (var  i =0;len= g_vrCardList){
    //
    //     }
    // }
    cc.Node.prototype.onExit.call(this);
};

UIBase.prototype.onTouchBegan = function (touch, event) {
    return true;
};

UIBase.prototype.onTouchMoved = function (touch, event) {
};
UIBase.prototype.onTouchEnded = function (touch, event) {
};

UIVRButton = UIBase.extend({
    isToScale: false,
    _touchEventSelector: null,
    _touchEventListener: null,
    _touchEventEndedBC: null,
    _longEventSelector: null,
    _longEventListener: null,
    _touchToChild: 2,
    _lock: false,
    _callCount: 0,
    _curCallCount: 0,
    _touchRect: null,
    _msg: "",
    _toScaleAnim: true
});

UIVRButton.create = function () {
    return new UIVRButton();
};

/**
 * 添加触摸监听器
 * @param selector
 * @param target
 * @param callCount
 */
UIVRButton.prototype.addTouchEventListener = function (selector, target, callCount) {
    _callCount = callCount === undefined ? 0 : _callCount;
    this._callCount = _callCount;
    this._touchEventSelector = selector;
    this._touchEventListener = target;
    cc.log("target:" + target.toString());
    cc.log("selector:" + selector.toString());
};

UIVRButton.prototype.addTouchEndedBC = function (bc) {
    this._touchEventEndedBC = bc;
};

UIVRButton.prototype.setTouchRect = function (touchRect) {
    this._touchRect = touchRect;
};

UIVRButton.prototype.setToScaleAnim = function (scaleAnim) {
    this._toScaleAnim = scaleAnim;
};

UIVRButton.prototype.setTouchToChild = function (toChild) {
    this._touchToChild = toChild;
};

UIVRButton.prototype.toTouchScale = function () {
    this.isToScale = true;
    if (this._toScaleAnim) {
        this.setScale(1.1);
    }
};

UIVRButton.prototype.endTouchScale = function () {
    this.isToScale = false;
    if (this._toScaleAnim) {
        this.stopAllActions();
        var scaleTo = cc.scaleTo(0.05, 1, 1);
        this.runAction(scaleTo);
    }
};

/**
 * 是否选中
 * @param node
 * @param ptTouch
 * @param toChild
 * @returns {boolean}
 */
UIVRButton.prototype.isTouchTo = function (node, ptTouch, toChild) {
    if (0 < toChild && this.isVisible()) {
        if (this._touchRect) {
            var ptNode = node.convertToNodeSpace(ptTouch);
            if (cc.rectContainsPoint(this._touchRect, ptNode)) {
                return true;
            }
        } else {
            var ptNode = node.convertToNodeSpace(ptTouch);
            var size = node.getContentSize();
            var rtNode = cc.rect(0, 0, size.width, size.height);

            if (cc.rectContainsPoint(rtNode, ptNode)) {
                return true;
            } else {
                var children = node.getChildren();
                for (var i in children) {
                    if (this.isTouchTo(children[i], ptTouch, toChild - 1)) {
                        return true;
                    }
                }
            }

        }
    }
    return false;
};

/**
 * 长按
 * @param _selector
 * @param _listener
 */
UIVRButton.prototype.setLongEventListener = function (_selector, _listener) {
    this._longEventSelector = _selector;
    this._longEventListener = _listener;
    this.setToScaleAnim(false);
};

UIVRButton.prototype._longEventCall = function (dt) {
    if (this._longEventListener && this._longEventSelector) {
        this._longEventSelector.call(this._longEventListener, this, ccui.Widget.TOUCH_BEGAN);
    }
};

/**
 * onTouchBegan 触摸开始事件
 * @param touch
 * @param event
 */
UIVRButton.prototype.onTouchBegan = function (touch, event) {
    // 获取当前触摸点相对于按钮所在的坐标
    var locationInNode = touch.getLocation();
    //是否触摸到
    if (this.isTouchTo(this, locationInNode, this._touchToChild)) {
        this.toTouchScale();
        if (!this.isSwallowTouches()) {
            this.setSwallowTouches(true);
        }

        if (this._longEventListener && this._longEventSelector) {
            this.unschedule(this._longEventCall);
            this.scheduleOnce(this._longEventCall, 0.3);
        } else {
            if (this._touchEventSelector && this._touchEventListener) {
                this._touchEventSelector.call(this._touchEventListener, this, ccui.Widget.TOUCH_BEGAN);
            }
        }

    } else {
        if (this.isSwallowTouches()) {
            this.setSwallowTouches(false);
        }
    }
    return true;
};

/**
 * 触摸移动时触发
 * @param touch
 * @param event
 */
UIVRButton.prototype.onTouchMoved = function (touch, event) {
    if (this.isToScale) {
        var locationInNode = touch.getLocation();
        if (this.isTouchTo(this, locationInNode, this._touchToChild)) {
            if (this._touchEventSelector && this._touchEventListener) {
                this._touchEventSelector.call(this._touchEventListener, this, ccui.Widget.TOUCH_MOVED);
            }
        } else {
            this.endTouchScale();
            if (this._touchEventSelector && this._touchEventListener) {
                this._touchEventSelector.call(this._touchEventListener, this, ccui.Widget.TOUCH_CANCELED);
            }
        }
    }
};

/**
 * 触摸结束事件
 * @param touch
 * @param event
 */
UIVRButton.prototype.onTouchEnded = function (touch, event) {

    if (0 < this._callCount && this._callCount <= this._curCallCount) {
        return;
    }

    if (this.isToScale) {
        var locationInNode = touch.getLocation();
        if (!this._lock && this.isTouchTo(this, locationInNode, this._touchToChild)) {
            LocalPlayEffect(g_mapAudio.button);
            this._lock = true;
            this._curCallCount++;
            this.endTouchScale();
            if (this._touchEventEndedBC) {
                this._touchEventEndedBC(this);
            }

            if (this._touchEventSelector && this._touchEventListener) {
                this._touchEventSelector.call(this._touchEventListener, this, ccui.Widget.TOUCH_ENDED);
            }
            this._lock = false;
        }
    }

    if (this._longEventSelector && this._longEventListener) {
        this.endTouchScale();
        this.unschedule(this._longEventCall);
        this._longEventSelector.call(this._longEventListener, this, ccui.Widget.TOUCH_ENDED);
    }
};

/**
 * popWindow
 * @type {Array}
 */
var g_vrPOPWindowInfo = [];
PopWindow = function (nodeObj, scale) {
    //默认1
    scale = undefined === scale ? 1 : scale;
    //返回当前正在运行的场景.导演类同一时间只能运行一个场景.
    var runningScene = cc.director.getRunningScene();
    var backColorLayer = runningScene.getChildByName("backColorLayer");
    var ZOrder = (g_vrPOPWindowInfo.length + 99 ) * 2;
    if (backColorLayer) {
        backColorLayer.setLocalZOrder(ZOrder);
        backColorLayer.setVisible(true);
    } else {
        var winSize = cc.director.getWinSize();
        var layerColor = new cc.LayerColor(cc.color(0, 0, 0, 102), winSize.width, winSize.height);
        runningScene.addChild(layerColor, ZOrder, "backColorLayer");
    }

    runningScene.addChild(nodeObj, ZOrder + 1);
    nodeObj.setScale(0.0);
    nodeObj.runAction(cc.sequence(cc.scaleTo(0.2, scale),
        cc.scaleTo(0.06, 0.97 * scale),
        cc.scaleTo(0.06, scale)));

    var date = new Date();
    var time = date.getTime();
    nodeObj.__POPTag = time;
    g_vrPOPWindowInfo.push({POPTag: time, ZOrder: ZOrder});

};

/**
 * 移除pop
 * @param name
 * @constructor
 */
RemoveWindow = function (name) {
    var runningScene = cc.director.getRunningScene();
    var node = runningScene.getChildByName(name);
    if (node) node.removeFromParent(true);
};
