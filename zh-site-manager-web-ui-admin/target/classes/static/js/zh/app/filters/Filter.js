/**
 * Created by 陈志杭 on 2016/12/27.
 * description 过滤器
 * @file zh/app/filters/Filter
 */
define([
    'dojo/Stateful',
    'zh/util/stringUtils',
    "dojo/_base/declare",
    'zh/util/log',
], function (Stateful, stringUtils, declare, log) {
    return declare('zh/app/filters/Filter', Stateful, {
        paths: [],
        /**
         * 过滤器
         * @param routePath 路由路径
         * @param route 路由参数
         * @return {boolean} true 继续执行之后操作 , false 不执行之后的操作
         */
        isContinue: function (routePath, route) {
            if (this.pathMatch(routePath, route)) {
                return this.execute(routePath, route);
            }
            return true;
        },
        execute: function (routePath, route) {
            return true;
        },
        pathMatch: function (routePath, route) {
            for (var i in this.paths) {
                var path = this.paths[i];
                if (path instanceof RegExp) {
                    var regExp = path;
                    if (regExp.test(routePath)) {
                        return true;
                    }
                }
                else {
                    if (stringUtils.isEqualsIgnoreCase(path, routePath)) {
                        return true;
                    }
                }
            }
            return false;
        },
        /**
         * 获取filter的容器
         */
        getContainer: function () {
            log.trace('请实现获取getContainer')
        }
    });
});