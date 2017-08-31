/**
 * 作者:penny
 *
 */

var NetWorkType_None = 0;
var NetWorkType_WiFi = 1;
var NetWorkType_WWAN = 2;


CDevice = function () {
    this.m_os = "";
    this.m_platform = "";
    this.m_deviceID = "";

    this.init = function () {
        this.m_os = cc.sys.os;
        this.m_platform = cc.sys.platform;

        //等于android
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //反射调用
            /**
             * 参数1：类名
             * 参数2：方法名
             * 参数3：方法签名 ()  int    I
             float    F
             boolean    Z
             String    Ljava/lang/String;
             */
            this.m_deviceID = jsb.reflection.callStaticMethod("com/lywx/guandan/UserInfo", "getIMEI", "()Ljava/lang/String;");
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
            this.m_deviceID = jsb.reflection.callStaticMethod("AppController", "getUUID");
        }
        else if (cc.sys.os === cc.sys.OS_WINDOWS || cc.sys.os === cc.sys.OS_OSX) {

            if ("" === gb_localData.equipmentID) {
                this.m_deviceID = this.getRandomString(8);
                gb_localData.equipmentID = this.m_deviceID;
                var saveInfo = JSON.stringify(gb_localData);
                cc.sys.localStorage.setItem("baseData", saveInfo);

            } else {
                this.m_deviceID = gb_localData.equipmentID;
            }

        }
    };

    /**
     * 获取随机数
     * @param number
     * @returns {string}
     */
    this.getRandomString = function (number) {
        number = number || 32;
        var $chars = '0123456789';
        var maxPos = $chars.length;
        var str = '';
        for (var i = 0; i < number; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    };

    /**
     * 网络状态
     * @returns {*}
     */
    this.getNetState = function () {
        if (cc.sys.platform === cc.sys.DESKTOP_BROWSER) {
            return NetWorkType_WiFi;
        }

        if (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) {
            var netState = jsb.reflection.callStaticMethod("AppController", "getNetState");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            var netState = jsb.reflection.callStaticMethod("com/lywx/guandan/UserInfo", "getNetType", "()I");
        }
        else {
            var netState = NetWorkType_WiFi;
        }
        return netState;
    };

    /**
     * wifi是否打开
     * @returns {*|boolean}
     */
    this.isWiFiEnabled = function () {
        if (cc.sys.os === cc.sys.OS_IOS) {
            var isWiFi = jsb.reflection.callStaticMethod("AppController", "isWiFiEnabled");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            var isWiFi = jsb.reflection.callStaticMethod("com/lywx/guandan/UserInfo", "isWifiEnabled", "()Z");
        }
        else if (cc.sys.os === cc.sys.OS_WINDOWS) {
            var isWiFi = true;
        }
        return isWiFi;
    }

};
var DC = new CDevice();