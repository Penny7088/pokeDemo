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
    setTouchEnable: function (enable, touchPriority, bSwallow) {
        //默认消费
        bSwallow = (undefined === bSwallow) ? true : bSwallow;
        //基类的this._touchEnable = false
        if (this._touchEnabled === enable) {
            return;
        }
        this._touchEnabled = enable;
        if (this._touchEnabled) {
            if (!this._touchListener) {
                this._touchListener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: bSwallow,
                    onTouchBegan: this.onTouchBegan.bind(this),
                    onTouchMoved: this.onTouchMoved.bind(this),
                    onTouchEnded: this.onTouchEnded.bind(this)
                });
            }

            if (undefined === touchPriority || 0 === touchPriority)
                cc.EventListener.addListener(this._touchListener, this);
            else
                cc.EventListener.addListener(this._touchListener, touchPriority);

        } else {
            cc.EventListener.removeListener(this._touchListener);
        }
    }
});

UIBase.create = function(){
    return new UIBase();
};

UIBase.prototype.setSwallowTouches = function (swallow) {
  if(this._touchListener){ //this._touchListener  只要这个值不是null,undefined和0  就是TRUE
      this._touchListener.setSwallowTouches(swallow);
  }
};

UIBase.prototype.isSwallowTouches = function () {
  if(this._touchListener){
        return this._touchListener.isSwallowTouches();
  }
  return false;
};

UIBase.prototype.onExit = function () {
    if(this._touchEnabled){
        this.setTouchEnable(false);
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

UIBase.prototype.onTouchMoved = function (touch, event) {};
UIBase.prototype.onTouchEnded = function (touch, event) {};