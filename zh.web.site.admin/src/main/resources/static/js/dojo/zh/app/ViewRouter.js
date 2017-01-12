/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,自动查找View路由
 */
define([
    "dijit/_WidgetBase",
    'zh/util/linq',
    'dojo/topic',
    "dojo/_base/declare",
    'dojo/has',
    'dojo/request',
    "dojo/hash",
    "zh/util/log",
], function (_WidgetBase, linq, topic, declare, has, request, hash, log) {
    return declare('zh/app/view/ViewRouter', [_WidgetBase], {
        targetNode: false,
        // view 根路径
        viewBaseUrl: false,
        // 默认 view module 路径
        defaultViewModulePath: false,
        startup: function () {
            var me = this;
            me.inherited(arguments);
            topic.subscribe("/dojo/hashchange", function (newHash) {
                me.onHashChange(newHash);
            });
            var routeUrl = hash();
            if (!routeUrl) routeUrl = me.defaultViewModulePath;
            me.onHashChange(routeUrl);
        },
        // view加载显示之前事件,可以返回false阻止继续执行
        onViewLoadBefore: function (route) {
            return true;
        },
        // view加载显示之后事件
        onViewLoadAfter: function (route) {

        },
        // view显示之前事件
        onViewShowBefore: function (route) {

        },
        // view显示之后事件
        onViewShowAfter: function (route) {

        },
        /**
         * view加载动画结束回调事件
         * @param route 目标路由
         */
        onViewLoadingAnimateEndCallback: function (route) {
            var me = this;
            me.onViewShowBefore(route);
            me.hideViews();
            route.view.show();
            me.startViewLoadingEndAnimate(route)
        },
        /**
         * 启动view加载动画
         * @param route 目标路由
         */
        startViewLoadingAnimate: function (route) {
            this.onViewLoadingAnimateEndCallback(route);
        },
        /**
         * view加载完成动画结束回调事件
         * @param route 目标路由
         */
        onViewLoadingEndAnimateEndCallback: function (route) {
            this.onViewShowAfter(route);
        },
        /**
         * 启动view加载结束动画
         * @param route 目标路由
         */
        startViewLoadingEndAnimate: function (route) {
            this.onViewLoadingEndAnimateEndCallback(route);
        },
        // 加载完成时候 view 视图的处理
        onViewLoad: function (route) {
            var me = this;
            if (!route.view.domNode.parentElement) {
                route.view.placeAt(me.getTargetNode());
                route.view.startup();
                route.view.hide();
            }
            me.startViewLoadingAnimate(route);

        },
        go: function (newHash) {
            hash(newHash);
        },
        onHashChange: function (newHash) {
            var me = this;

            var route = me._convertToRoute(newHash);
            if (this.onViewLoadBefore(route) === false) {
                return;
            }
            var preRoute = linq.From(me._routeTable).FirstOrDefault(null, 'p=>p.viewModulePath=="' + route.viewModulePath + '"');
            if (preRoute != null) {
                me.onViewLoad(preRoute);
            }
            request(route.viewAbsModuleUrl)
                .then(
                    function (js) {
                        me.onLoadViewJsSuccess(route, js);
                    },
                    function (error) {
                        me.onLoadViewJsError.apply(me, [route, error]);
                    }
                );
        },
        hideViews: function () {
            var me = this;
            me._routeTable.forEach(function (route) {
                route.view.hide();
            });
        },
        // 挂视图的node ，默认document.body,设置属性targetNode
        getTargetNode: function () {
            var me = this;
            if (me.targetNode)
                return me.targetNode;
            else
                return document.body;
        },
        // 加载 view js 文件成功
        onLoadViewJsSuccess: function (route, js) {
            var me = this;
            require([route.viewModulePath], function (View) {
                route.view = new View();
                me._routeTable.push(route);
                me.onViewLoad(route);
            });
        },
        // 加载 view js 文件失败
        onLoadViewJsError: function (route, error) {
            log.error('无法加载view,' + route.viewModulePath);
        },

        // 已视图加载路由表
        _routeTable: [],
        // hash参数转换为路由项
        _convertToRoute: function (hash) {
            var me = this;
            var url1 = hash.split('?');
            var urlPath = url1[0];
            var urlPaths = urlPath.split('/');
            var viewHashPath = '';
            var viewModulePath = me.viewBaseUrl;
            if (urlPaths[urlPaths.length - 1]) {
                var moduleName = urlPaths[urlPaths.length - 1];
                var firstChar = moduleName[0];
                moduleName = firstChar.toUpperCase() + moduleName.substring(1, moduleName.length);
                urlPaths[urlPaths.length - 1] = moduleName;
            }
            urlPaths.forEach(function (urlPath) {
                viewHashPath = '/' + urlPath;
            });
            viewModulePath = viewModulePath + viewHashPath;
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
            var viewAbsModuleUrl = require.toUrl(viewModulePath) + '.js';
            return {
                viewAbsModuleUrl: viewAbsModuleUrl,
                viewHashPath: viewHashPath,
                viewModulePath: viewModulePath,
                params: params,
                view: null
            };
        }
    });
});