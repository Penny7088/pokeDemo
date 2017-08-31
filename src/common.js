/**
 * 作者:penny
 *
 */
var QT_null = 0;        //无
var QT_diamond = 1;    //方块
var QT_club = 2;       //梅花
var QT_heart = 3;      //红心
var QT_spade = 4;      //黑桃
var QT_king = 5;       //王

//////////////////////////////////////////////////////////////////////////
//牌值
//////////////////////////////////////////////////////////////////////////
var CV_2 = 0;
var CV_3 = 1;
var CV_4 = 2;
var CV_5 = 3;
var CV_6 = 4;
var CV_7 = 5;
var CV_8 = 6;
var CV_9 = 7;
var CV_10 = 8;
var CV_J = 9;
var CV_Q = 10;
var CV_K = 11;
var CV_A = 12;
var CV_Kmin = 13;
var CV_Kmax = 14;

//////////////////////////////////////////////////////////////////////////
//两幅牌
//////////////////////////////////////////////////////////////////////////
//t (?&0xF0)>>4
//v ?&0x0F
//扑克数据
var g_vrCardList = [
    //方块 2 - A
    QT_diamond << 4 | CV_2, QT_diamond << 4 | CV_3, QT_diamond << 4 | CV_4, QT_diamond << 4 | CV_5, QT_diamond << 4 | CV_6,
    QT_diamond << 4 | CV_7, QT_diamond << 4 | CV_8, QT_diamond << 4 | CV_9, QT_diamond << 4 | CV_10, QT_diamond << 4 | CV_J,
    QT_diamond << 4 | CV_Q, QT_diamond << 4 | CV_K, QT_diamond << 4 | CV_A,
    //梅花 2 - A
    QT_club << 4 | CV_2, QT_club << 4 | CV_3, QT_club << 4 | CV_4, QT_club << 4 | CV_5, QT_club << 4 | CV_6,
    QT_club << 4 | CV_7, QT_club << 4 | CV_8, QT_club << 4 | CV_9, QT_club << 4 | CV_10, QT_club << 4 | CV_J,
    QT_club << 4 | CV_Q, QT_club << 4 | CV_K, QT_club << 4 | CV_A,
    //红心 2 - A
    QT_heart << 4 | CV_2, QT_heart << 4 | CV_3, QT_heart << 4 | CV_4, QT_heart << 4 | CV_5, QT_heart << 4 | CV_6,
    QT_heart << 4 | CV_7, QT_heart << 4 | CV_8, QT_heart << 4 | CV_9, QT_heart << 4 | CV_10, QT_heart << 4 | CV_J,
    QT_heart << 4 | CV_Q, QT_heart << 4 | CV_K, QT_heart << 4 | CV_A,
    //黑桃 2 - A
    QT_spade << 4 | CV_2, QT_spade << 4 | CV_3, QT_spade << 4 | CV_4, QT_spade << 4 | CV_5, QT_spade << 4 | CV_6,
    QT_spade << 4 | CV_7, QT_spade << 4 | CV_8, QT_spade << 4 | CV_9, QT_spade << 4 | CV_10, QT_spade << 4 | CV_J,
    QT_spade << 4 | CV_Q, QT_spade << 4 | CV_K, QT_spade << 4 | CV_A,
    //大小王
    QT_king << 4 | CV_Kmin, QT_king << 4 | CV_Kmax,

    //方块 2 - A
    QT_diamond << 4 | CV_2, QT_diamond << 4 | CV_3, QT_diamond << 4 | CV_4, QT_diamond << 4 | CV_5, QT_diamond << 4 | CV_6,
    QT_diamond << 4 | CV_7, QT_diamond << 4 | CV_8, QT_diamond << 4 | CV_9, QT_diamond << 4 | CV_10, QT_diamond << 4 | CV_J,
    QT_diamond << 4 | CV_Q, QT_diamond << 4 | CV_K, QT_diamond << 4 | CV_A,
    //梅花 2 - A
    QT_club << 4 | CV_2, QT_club << 4 | CV_3, QT_club << 4 | CV_4, QT_club << 4 | CV_5, QT_club << 4 | CV_6,
    QT_club << 4 | CV_7, QT_club << 4 | CV_8, QT_club << 4 | CV_9, QT_club << 4 | CV_10, QT_club << 4 | CV_J,
    QT_club << 4 | CV_Q, QT_club << 4 | CV_K, QT_club << 4 | CV_A,
    //红心 2 - A
    QT_heart << 4 | CV_2, QT_heart << 4 | CV_3, QT_heart << 4 | CV_4, QT_heart << 4 | CV_5, QT_heart << 4 | CV_6,
    QT_heart << 4 | CV_7, QT_heart << 4 | CV_8, QT_heart << 4 | CV_9, QT_heart << 4 | CV_10, QT_heart << 4 | CV_J,
    QT_heart << 4 | CV_Q, QT_heart << 4 | CV_K, QT_heart << 4 | CV_A,
    //黑桃 2 - A
    QT_spade << 4 | CV_2, QT_spade << 4 | CV_3, QT_spade << 4 | CV_4, QT_spade << 4 | CV_5, QT_spade << 4 | CV_6,
    QT_spade << 4 | CV_7, QT_spade << 4 | CV_8, QT_spade << 4 | CV_9, QT_spade << 4 | CV_10, QT_spade << 4 | CV_J,
    QT_spade << 4 | CV_Q, QT_spade << 4 | CV_K, QT_spade << 4 | CV_A,
    //大小王
    QT_king << 4 | CV_Kmin, QT_king << 4 | CV_Kmax
];

//////////////////////////////////////////////////////////////////////////
//牌型
//////////////////////////////////////////////////////////////////////////
var CT_Null = 0;      //无
var CT_One = 1;      //单张
var CT_Pair = 2;        //对子
var CT_Three = 3;       //3条
var CT_ThreeTwo = 4;      //3带2
var CT_ThreeSequence = 5;      //3顺
var CT_LinkPair = 6;     //连对
var CT_Sequence = 7;     //顺子
var CT_Bomb4 = 8;        //炸弹
var CT_Bomb5 = 9;        //炸弹
var CT_Bomb6 = 10;        //炸弹
var CT_Bomb7 = 11;        //炸弹
var CT_Bomb8 = 12;        //炸弹
var CT_Bomb9 = 13;        //炸弹
var CT_Bomb10 = 14;        //炸弹
var CT_Quarte = 15;      //同花
var CT_KBomb = 16;      //王炸

//////////////////////////////////////////////////////////////////////////
//任务类型
//////////////////////////////////////////////////////////////////////////
//var INNINGSTYPE_NULL        = 0;    //无
//var INNINGSTYPE_WIN         = 1;    //胜局
//var INNINGSTYPE_LOSE        = 2;    //败局
//var INNINGSTYPE_TIE         = 3;    //平局
//var INNINGSTYPE_FLEE        = 4;    //逃跑

var TT_ROOMGDOP = 0;           //指定(任意)房间,n次(胜利,败局,平局,逃跑)
var TT_WINBEAN = 1;           //赢得n豆子
var TT_ONLINETIME = 2;            //在线时间
var TT_RANKCOUNT = 3;            //游头次数
var TT_CARDTYPE = 4;            //指定牌型

//道具类型
var ITEM_CARD_DEVICE = 1;    //记牌器
var ITEM_SUPER_DOUBLE = 2;    //超级加倍
var ITEM_CARD_CHANGE = 3;    //换牌器
var ITEM_ZHADAN = 4;
var ITEM_BANZHUAN = 5;
var ITEM_XIANHUA = 6;
var ITEM_REDCARD = 7;           // 红卡

//表达式解释
//vrExps = [{key:"",args:[]},{key:"",args:[]},{key:"",args:[]},{key:"",args:[]}]
_expressions = function (exps, vrExps) {
    if (!exps || "" === exps) return 0;

    //拆分
    var vrArg = [];
    var key = "";
    var arg = "";
    var gotoend = false;
    for (var i = 0, expslen = exps.length; i < expslen; ++i) {
        gotoend = false;
        var c = exps[i];
        if ('(' === c) {
            ++i;
            for (; i < expslen; ++i) {
                c = exps[i];
                if (',' === c) {
                    vrArg.push(arg);
                    arg = [];
                }
                else if (')' === c) {
                    if ("" !== arg) {
                        vrArg.push(arg);
                    }
                    if ("" !== key) {
                        vrExps.push({key: key, args: vrArg});
                    }
                    key = "";
                    arg = "";
                    vrArg = [];
                    gotoend = true;
                    break;
                }
                else if ('"' === c || "'" === c) {
                    i++;
                    var quotes = 1;
                    for (; i < expslen; ++i) {
                        c = exps[i];
                        if ('"' === c || "'" === c) {
                            ++quotes;
                            if (0 === quotes % 2) {
                                if (',' === exps[i + 1]) {
                                    ++i;
                                    vrArg.push(arg);
                                    arg = "";
                                    break;
                                }
                                else if (')' === exps[i + 1]) {
                                    ++i;
                                    if ("" !== arg) {
                                        vrArg.push(arg);
                                    }
                                    if ("" !== key) {
                                        vrExps.push({key: key, args: vrArg});
                                    }
                                    key = "";
                                    arg = "";
                                    vrArg = [];
                                    gotoend = true;
                                    break;
                                }
                                else {
                                    arg += c;
                                }
                            }
                            else {
                                arg += c;
                                //",,,,,
                                for (; i < expslen - 1;) {
                                    if (',' === exps[i + 1]) {
                                        ++i;
                                        arg += exps[i];
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            arg += c;
                        }
                    }
                    if (gotoend) break;
                }
                else if (')' === c) {
                    if ("" !== key) {
                        vrExps.push({key: key, args: vrArg});
                    }
                    key = "";
                    arg = "";
                    vrArg = [];
                    gotoend = true;
                    break;
                }
                else {
                    arg += c;
                }
            }
        }
        else if (',' === c) {
        }
        else {
            key += c;
        }
    }
    return vrExps.length;
};

_expressionsOne = function (exps, mapExps) {
    var vrExps = [];
    _expressions(exps, vrExps);
    if (0 < vrExps.length) {
        mapExps.key = vrExps[0].key;
        mapExps.args = vrExps[0].args;
        return true;
    }
    return false;
};

//.....
_splitString = function (str, vrStr, token) {
    token = token == undefined ? ',' : token;
    var temp = "";
    for (var i = 0, len = str.length; i < len; ++i) {
        var c = str[i];
        if (token == c) {
            if ("" != temp) {
                vrStr.push(temp);
                temp = "";
            }
        }
        else {
            temp += c;
        }
    }
    if ("" != temp) {
        vrStr.push(temp);
    }
    return vrStr.length;
};

//1000000 -> 1,000,000 数字加分号
_numberSplitToString = function (number) {
    var szReturn = "";
    var str = number.toString();
    for (var i = str.length - 1, s = 1; i >= 0; --i, s++) {
        szReturn += str[i];
        if (0 != i && 0 == s % 3) {
            szReturn += ",";
        }
    }
    var _szReturn = "";
    for (var i = szReturn.length - 1; i >= 0; --i) {
        _szReturn += szReturn[i];
    }
    return _szReturn;
};

//get texture
_getGoldTexture = function (va) {
    if (299 < va) return "res/icon/icon_gold_2.png";
    else if (99 < va) return "res/icon/icon_gold_1.png";
    return "res/icon/icon_gold_0.png";
};

_getBeanTexture = function (va) {
    if (99999 < va) return "res/icon/icon_bean_2.png";
    else if (9999 < va) return "res/icon/icon_bean_1.png";
    return "res/icon/icon_bean_0.png";
};

_getItemTexture = function (tid) {
    return "res/icon/item" + tid.toString() + ".png";
};

_getSmallItemTexture = function (tid) {
    return "res/small_icon/small_item" + tid.toString() + ".png";
};

_getItemToName = function (tid) {
    if (ITEM_CARD_DEVICE == tid) {
        return "记牌器";
    }
    return "";
};

//其他
//var gd_gateHost = "192.168.1.211";
var gd_gateHost = "mobile.guandanyouxi.com";
//var gd_gateHost = "118.178.84.63";
//var gd_gateHost = "42.159.245.107";

//var gd_gateHost = "10.10.1.182";//
//var gd_gateHost = "42.159.243.240";
//var gd_gateHost = "42.159.240.60";
var gd_gatePort = "3014";
var gd_connectorHost = "";
var gd_connectorPort = "";
var gd_uid = "test0";
//var gd_name = "test0";
//var gd_roomServerId   = "beanRoom(1)";
var gd_sid = "";
var gd_logidID = "";
var gd_version = "0.2.6";    //游戏版本号
var gd_baseBean = 0;
var gd_toBL = 0;

//商品类型
var gd_type_shop_gold = "1";
var gd_type_shop_item = "2";
var gd_type_shop_vip = "3";
var gd_type_shop_role = "4";
var gd_type_shop_firstBuy = "5";

//iap支付临时变量
var gd_iap_product_id = "";
var gd_iap_product_type = "";
var gd_iap_product_productIndex = 0;

//是否提交IOS
var gd_to_ios_app = false;

//是否安装了QQ或微信
var isWXAppInstalled = false;
var isQQAppInstalled = false;

//test
var gd_tableCount = 0;
var gd_userPos = null;

var downloadsite = "http://m.1312.com/Game/Dapai/Download";
var YAOQINGID = "";
//全国省份以及对应城市
var all_P_C = [];
all_P_C[0] = ["北京"];
all_P_C[1] = ["安徽", "安庆", "蚌埠", "亳州", "巢湖", "池州", "滁州", "阜阳", "合肥", "淮北", "淮南", "黄山", "六安", "马鞍山", "宿州", "铜陵", "芜湖", "宣城", "其他"];
all_P_C[2] = ["福建", "福州", "南平", "龙岩", "宁德", "莆田", "泉州", "厦门", "三明", "漳州", "其他"];
all_P_C[3] = ["甘肃", "白银", "定西", "甘南", "嘉峪关", "金昌", "酒泉", "兰州", "临夏", "陇南", "平凉", "庆阳", "天水", "武威", "张掖", "其他"];
all_P_C[4] = ["广东", "潮州", "东莞", "佛山", "广州", "河源", "惠州", "江门", "揭阳", "茂名", "梅州", "清远", "汕头", "汕尾", "深圳", "韶关", "阳江", "云浮", "湛江", "肇庆", "中山", "珠海", "其他"];
all_P_C[5] = ["广西", "百色", "北海", "崇左", "防城港", "贵港", "桂林", "河池", "贺州", "来宾", "南宁", "柳州", "钦州", "梧州", "玉林", "其他"];
all_P_C[6] = ["贵州", "安顺", "毕节", "贵阳", "六盘水", "黔东南", "黔南", "黔西南", "铜仁", "遵义", "其他"];
all_P_C[7] = ["海南", "海口", "三亚", "其它"];
all_P_C[8] = ["河北", "保定", "沧州", "承德", "衡水", "邯郸", "廊坊", "秦皇岛", "石家庄", "唐山", "邢台", "张家口", "其他"];
all_P_C[9] = ["河南", "安阳", "鹤壁", "济源", "焦作", "开封", "洛阳", "漯河", "南阳", "平顶山", "濮阳", "三门峡", "商丘", "新乡", "信阳", "许昌", "郑州", "周口", "驻马店", "其他"];
all_P_C[10] = ["黑龙江", "大庆", "大兴安岭", "哈尔滨", "鹤岗", "黑河", "鸡西", "佳木斯", "牡丹江", "七台河", "齐齐哈尔", "双鸭山", "绥化", "伊春", "其他"];
all_P_C[11] = ["湖北", "鄂州", "恩施", "黄冈", "黄石", "荆门", "荆州", "潜江", "神农架林区", "十堰", "随州", "天门", "武汉", "仙桃", "咸宁", "襄樊", "孝感", "宜昌", "其他"];
all_P_C[12] = ["湖南", "长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西", "其他"];
all_P_C[13] = ["吉林", "白山", "长春", "白城", "吉林", "辽源", "四平", "松源", "通化", "延边", "其他"];
all_P_C[14] = ["江苏", "常州", "淮安", "连云港", "南京", "南通", "苏州", "泰州", "宿迁", "无锡", "徐州", "盐城", "扬州", "镇江", "其他"];
all_P_C[15] = ["江西", "抚州", "赣州", "吉安", "黄石", "景德镇", "九江", "南昌", "萍乡", "上饶", "新余", "宜春", "鹰潭", "其他"];
all_P_C[16] = ["辽宁", "鞍山", "本溪", "朝阳", "大连", "丹东", "抚顺", "阜新", "葫芦岛", "锦州", "辽阳", "盘锦", "沈阳", "铁岭", "营口", "其他"];
all_P_C[17] = ["内蒙古", "阿拉善盟", "巴彦淖尔", "包头", "赤峰", "鄂尔多斯", "呼和浩特", "呼伦贝尔", "通辽", "乌海", "乌兰察布", "锡林郭勒盟", "兴安盟", "其他"];
all_P_C[18] = ["宁夏", "固原", "凉山", "石嘴山", "吴忠", "银川", "中卫", "其他"];
all_P_C[19] = ["青海", "果洛", "海北", "海东", "海南", "海西", "黄南", "西宁", "玉树", "其他"];
all_P_C[20] = ["山东", "淄博", "枣庄", "潍坊", "烟台", "威海", "泰安", "日照", "青岛", "临沂", "聊城", "莱芜", "扬州", "济宁", "济南", "菏泽", "东营", "滨州", "德州", "其他"];
all_P_C[21] = ["山西", "长治", "运城", "阳泉", "朔州", "忻州", "太原", "吕梁", "晋中", "晋城", "临汾", "大同", "其他"];
all_P_C[22] = ["陕西", "安康", "榆林", "延安", "咸阳", "西安", "渭南", "铜川", "商洛", "汉中", "宝鸡", "其他"];
all_P_C[23] = ["上海"];
all_P_C[24] = ["四川", "自贡", "宜宾", "资阳", "雅安", "攀枝花", "遂宁", "南充", "绵阳", "内江", "眉山", "泸州", "乐山", "广安", "广元", "阿坝", "巴中", "成都", "达州", "德阳", "甘孜", "其他"];
all_P_C[25] = ["天津"];
all_P_C[26] = ["西藏", "阿里", "昌都", "拉萨", "林芝", "那曲", "日喀则", "山南", "其他"];
all_P_C[27] = ["新疆", "伊犁州直", "乌鲁木齐", "吐鲁番", "塔城", "克拉玛依", "克州", "哈密", "喀什", "和田", "昌吉州", "博州", "巴州", "阿勒泰", "阿克苏", "其他"];
all_P_C[28] = ["云南", "昭通", "文山", "玉溪", "曲靖", "普洱", "怒江", "临沧", "丽江", "昆明", "迪庆", "红河", "德宏", "大理", "版纳", "保山", "楚雄", "其他"];
all_P_C[29] = ["浙江", "舟山", "温州", "台州", "绍兴", "衢州", "宁波", "丽水", "金华", "嘉兴", "湖州", "杭州", "其他"];
all_P_C[30] = ["重庆"];


//network data
//var expLvIn = {};

var __szWinSize = cc.director.getWinSize();
var _ToScreenX = function (v) {
    return (v / 800) * __szWinSize.width;
};

var _ToScreenY = function (v) {
    return (v / 480) * __szWinSize.height;
};

_vaToStr = function (v) {
    if (CV_2 == v) return "2";
    else if (CV_3 == v) return "3";
    else if (CV_4 == v) return "4";
    else if (CV_5 == v) return "5";
    else if (CV_6 == v) return "6";
    else if (CV_7 == v) return "7";
    else if (CV_8 == v) return "8";
    else if (CV_9 == v) return "9";
    else if (CV_10 == v) return "10";
    else if (CV_J == v) return "J";
    else if (CV_Q == v) return "Q";
    else if (CV_K == v) return "K";
    else if (CV_A == v) return "A";
    return "";
};


