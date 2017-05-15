/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,自动查找View路由
 * @file zh/app/ViewRouter
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
    return declare('zh/app/ViewRouter', [AbstractViewRouter], {
        targetNode: false,
        // view 根路径
        viewBaseUrl: false,
        // 默认 view module 路径
        defaultViewModulePath: false,
        _previousRoute: null,
        _currentRoute: null,
        startup: function () {
            var me = this;
            me.inherited(arguments);
            var routeUrl = hash();
            if (!routeUrl) routeUrl = me.defaultViewModulePath;
            me.onRouteStringChange(routeUrl);
        },
        buildRouteStringWithParams: function (routePath, paramObj) {
            return hashUtils.buildWithParams(routePath, paramObj);
        },
        getRouteParamObj: function (routeString) {
            return hashUtils.getParams(routeString);
        },
        getRoutePathFromRouteString: function (routeString) {
            return hashUtils.getRoutePath(routeString);
        },
        /**
         * 加载到目标Node对象
         * @param route
         */
        onAddToTargetNode: function (route) {
            var me = this;
            route.view.placeAt(me.getTargetNode());
            route.view.startup();
        },
    });
});