/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,自动查找View路由
 */
define([
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    'dojo/topic',
    "dojo/_base/declare",

], function (_WidgetBase, _TemplatedMixin, topic, declare) {
    return declare('zh/app/view/ViewRouter', [_WidgetBase], {
        // view 根路径 m,e
        viewBaseUrl: false,

        startup: function () {
            var me = this;
            me.inherited(arguments);
            topic.subscribe("/dojo/hashchange", function (newHash) {
                me.onHashChange(newHash);
            });
        },
        // 加载完成时候 view 视图的处理
        onViewLoad: function (route) {
            var me = this;
            me.hideViews();
            route.view.show();
        },
        onHashChange: function (newHash) {
            var me = this;
            var route = me._convertToRoute(newHash);
            require([route.viewModulePath], function (pageView) {
                route.view = pageView;
                me._routeTable.push(route);
                me.onViewLoad(route);
            });
        },
        hideViews: function () {

        },
        // 已视图加载路由表
        _routeTable: [],
        _convertToRoute: function (hash) {
            var me = this;
            var url1 = hash.split('?');
            var urlPath = url1[0];
            var urlPaths = urlPath.split('/');
            var viewModulePath = me.viewBaseUrl;
            urlPaths.forEach(function (urlPath) {
                viewModulePath += '/' + urlPath;
            });
            var params = {};
            if (url1[1] && url1.length > 0) {
                var params_arr = url1[1].split('&');
                if (params_arr && params_arr.length > 0) {
                    params_arr.forEach(function (param) {
                        var paramSplit = param.split('=');
                        var name = paramSplit[0];
                        var value = paramSplit[1];
                        params[name] = value;
                    })
                }
            }

            return {
                viewModulePath: viewModulePath,
                params: params,
                view: null
            };
        }
    });
});