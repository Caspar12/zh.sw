/**
 * Created by 陈志杭 on 2016/12/27.
 * description 支持字符串与正则表达
 * @file zh/app/filters/AnonymousFilter
 */
define([
    'zh/app/filters/Filter',
    'zh/util/stringUtils',
    "dojo/_base/declare",
], function (Filter, stringUtils, declare) {
    return declare('zh/app/filters/AnonymousFilter',[Filter], {
        paths: [],
        execute: function (routePath, route) {
            return true;
        }
    });
});