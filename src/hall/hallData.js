/**
* 作者:penny
* 业务
*/
var hallDataIn = null;
var hallSceneIn = null;
var hallSignIn = null;
//var hallGoldShopIn = null;
//var hallItemShopIn = null;
var hallVipShopIn = null;
var hallRoleShopIn = null;
var hallNoticeDataIn = null;
var hallOnlineUserIn = null;

var expLv = null;
var taskIn = null;
var firstBuyIn = null;
/////////////////
//得到指定首充礼包中指定id的数

//低保
var lowSecurityIn=null;

//活动
var activityIn = null;

//空的GD信息
var matchNullGDInfo = null;

//比赛提示
var matchHintInfo = [];

//段位信息
var gameLvInfo = [];

////记录豆子、金币变化情况发生的原因
//
var g_reasonForLowSecurity = "ChangeBecauseOfLowSecurity";  //领取低保导致豆子发生变化
var g_reasonForSign = "ChangeBecauseOfSign" ;  //每日签到导致发生变化
var g_reasonForfirstBuy = "ChangeBecauseOffirstBuy" ; //首充导致发生变化
var g_reasonFortask = "ChangeBecauseOftask";  //完成任务发生变化
var g_reasonForBuyBean = "ChangeBecauseOfBuybean";  //商城金币兑换豆子导致发生变化
var g_reasonForBuyItemByCoin = "ChangeBecauseOfBuyItemByCoin";  //商城金币兑换道具致发生变化
var g_reasonForButItemByBean = "ChangeBecauseOfBuyItemByBean";   //商城豆子兑换道具致发生变化
var g_reasonForButItemByCny= "ChangeBecauseOfBuyItemByCny";   //商城人民币购买道具致发生变化
var g_reasonForBuyVIP = "ChangeBecauseOfBuyVIP";  //商城金币兑换VIP致发生变化
var g_reasonForBuyRole = "ChangeBecauseOfBuyRole";  //商城金币兑换形象致发生变化
var g_reasonForEmailreword = "ChangeBecauseOfEmailreword";  //邮件中获得的奖励
var g_reasonForbindingPhone = "ChangeBecauseOfbindingPhone";  //邮件中获得的奖励

//绑定手机号奖励
var bindingphonereward = 10;

// 是否初次创建hallMain，用于使签到界面只有首次登录到大厅时才弹出
var g_bIsShowShinInUI = true;