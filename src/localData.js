/**
* 作者:penny
*
*/

CLocalData = function()
{
    this.loginMode = "";
    this.equipmentID = "";
    this.equipmentPWD = "";
    this.longgameID = "";
    this.longgamePWD = "";
    this.audioMusic = true;
    this.audioEffect = true;

    //login模式
    this.mode = "";   //guest longyou qq weixin
    this.uid = "";
    this.pwd = "";
    this.msg = {};
};

var gb_localData = new CLocalData();

//save
SaveLocalLogin = function(mode,uid,pwd,msg)
{
    gb_localData.mode = mode;
    gb_localData.uid = uid;
    gb_localData.pwd = pwd;
    gb_localData.msg = msg;
    var saveInfo = JSON.stringify(gb_localData);
    cc.sys.localStorage.setItem("baseData", saveInfo);
};

var g_MusicIsOnFrontground = true;

LocalPlayEffect = function(url, loop) {
    if (gb_localData.audioEffect && g_MusicIsOnFrontground) {
        cc.audioEngine.playEffect(url,loop);
    }
};