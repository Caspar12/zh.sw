/**
 * Created by 陈志杭 on 2017/3/1
 * description 按hash某个参数进行路由
 * @file zh/app/ViewParamsRouter
 */
define([
    'dojo/_base/lang',

    'zh/util/linq',
    'dojo/topic',
    "dojo/_base/declare",
    'dojo/has',
    'dojo/request',
    "dojo/hash",
    "zh/util/log",
    "zh/core",
    'zh/util/stringUtils',
    'zh/app/util/hashUtils',
    'zh/app/AbstractViewRouter',
], function (lang, linq, topic, declare, has, request, hash, log, zh, stringUtils, hashUtils, AbstractViewRouter) {
    return declare('zh/app/ViewParamsRouter',[AbstractViewRouter], {
        targetNode: false,
        // view 根路径
        viewBaseUrl: false,
        // 默认 view module 路径
        defaultViewModulePath: false,
        /**
         * 进行路由的参数名称,必填
         */
        routeParamFieldName: null,
        /**
         * 根路由路径,必填
         */
        baseRoutePath: '',
        /**
         *
         * @param newHash 新地址
         * @param paramObj 参数对象
         */
        buildRouteStringWithParams: function (routePath, paramObj) {
            paramObj = paramObj || {};
            var baseRoutePath = this.getBaseRoutePath();
            paramObj[this.routeParamFieldName] = routePath;
            return hashUtils.buildWithParams(baseRoutePath, paramObj);
        },
        /**
         *  路由是否实际改变，不是只改变参数
         * 必须实现方法
         * @param readyToRoute 准备跳转路由
         */
        // isOnlyPublishRouteParamsChangeMessageRoute: function (readyToRoute) {
        //     var currentRoute = this._currentRoute;
        //     if (zh.isEmptyObject(currentRoute)) return true;
        //
        //     if (stringUtils.isEqualsIgnoreCase(currentRoute.viewModulePath, readyToRoute.viewModulePath) === false ||
        //         stringUtils.isEqualsIgnoreCase(currentRoute.routeString, readyToRoute.routeString) === false
        //     ) {
        //         return true;
        //     }
        //     return false;
        // },
        getBaseRoutePath: function () {
            return stringUtils.isEmpty(this.baseRoutePath) ? hashUtils.getRoutePath() : this.baseRoutePath;
        },
        getRouteParamObj: function (routeString) {
            return hashUtils.getParams(routeString);
        },
        getRoutePathFromRouteString: function (routeString) {
            var paramObj = hashUtils.getParams(routeString) || {};
            return paramObj[this.routeParamFieldName];
        },
    });
});