/**
 * Created by 陈志杭 on 2016/12/27.
 * description 支持字符串与正则表达
 * @file zh/app/filters/AuthenticationFilter
 */
define([
    'zh/app/filters/Filter',
    'zh/util/stringUtils',
    "dojo/_base/declare",
], function (Filter, stringUtils, declare) {
    return declare('zh/app/filters/AuthenticationFilter',[Filter], {
        paths: [],
        execute: function (routePath, route) {
            if (this.isLogin(routePath, route)) {
                return true;
            } else {
                this.onDenyAllow(routePath, route);
                return false;
            }
        },
        isLogin: function (routePath, route) {
            return false;
        },
        onDenyAllow: function (routePath, route) {

        }
    });
});