/**
* 作者:penny
*
*/

var GDSceneIn = null;
//Android或iOS进入激活(Active)状态时回调函数
var toDidBecomeActive = function() {
    if (GDSceneIn){
        GDSceneIn.toDidBecomeActive();
    }

    //var event = new cc.EventCustom("eventToDidBecomeActive");
    //cc.eventManager.dispatchEvent(event);
}

//Android或iOS进入非激活(Inactive)状态时回调函数
var toDidBecomeInactive = function() {
    if (GDSceneIn){
        GDSceneIn.toDidBecomeInactive();
    }
    //var event = new cc.EventCustom("eventToDidBecomeInactive");
    //cc.eventManager.dispatchEvent(event);
}