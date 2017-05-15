/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/util/datetimeUtils
 */
define([
    'zh/core',
    'dojo/dom-geometry',
    'dojo/window',
    'dojo/_base/lang',
    "dojo/dom-style",
], function (zh, domGeometry, winUtils, lang, domStyle) {
    var datetimeUtils = {
        format : function (d,fmt) {
            var o = {
                "M+": d.getMonth() + 1, //月份
                "d+": d.getDate(), //日
                "h+" : d.getHours()%12 == 0 ? 12 : d.getHours()%12, //小时
                "H+" : d.getHours(), //小时
                "m+": d.getMinutes(), //分
                "s+": d.getSeconds(), //秒
                "q+": Math.floor((d.getMonth() + 3) / 3), //季度
                "S": d.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    };

    return datetimeUtils;
});
