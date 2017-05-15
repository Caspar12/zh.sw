/**
 * Created by 陈志杭 on 2016/12/27.
 * @file zh/app/util/hashUtils
 */
define([
    'zh/widget/view/View',
    'dojox/app/utils/hash',
    "dojo/_base/lang",
    "dojo/hash",
    'zh/core',
    'zh/util/stringUtils',
], function (View, dojoHashUtils, lang, hash, zh, stringUtils) {
    var hashUtils = lang.mixin({
        getRoutePath: function (routeString) {
            if (zh.isUndefined(routeString)) {
                routeString = this.getRouteString();
            }
            var paramString = hashUtils.getParamString(hashUtils.getParams(routeString));
            return routeString.replace(paramString, '');
        },
        getRouteString: function () {
            return hash();
        },
        /**
         * 获取参数从zh/app/util/hashUtils#getRouteString
         * 继承于 dojox/app/utils/hash#getParams
         */
        getParams: undefined
    }, dojoHashUtils);
    hashUtils.getParams = function (hash) {
        if (stringUtils.isEmpty(hash)) {
            hash = hashUtils.getRouteString();
        }
        var paramObj = dojoHashUtils.getParams(hash);
        paramObj = paramObj || {};
        for (var proName in paramObj) {
            var value = decodeURIComponent(paramObj[proName]);
            paramObj[proName] = value;
        }
        return paramObj;
    };
    return hashUtils
});