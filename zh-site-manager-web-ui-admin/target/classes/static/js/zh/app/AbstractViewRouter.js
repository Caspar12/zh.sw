/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,自动查找View路由
 * @file zh/app/AbstractViewRouter
 */
define([
    'dojo/_base/lang',
    "dijit/_WidgetBase",
    'zh/util/linq',
    'dojo/topic',
    "dojo/_base/declare",
    'dojo/has',
    'dojo/on',
    'dojo/request',
    "dojo/hash",
    "zh/util/log",
    "zh/core",
    'zh/util/stringUtils',
    'zh/app/util/hashUtils',
    'zh/util/linq',
], function (lang, _WidgetBase, linq, topic, declare, has, on, request, hash, log, zh, stringUtils, hashUtils) {
    return declare('zh/app/AbstractViewRouter', [_WidgetBase], {
        targetNode: false,
        // view 根路径
        viewBaseUrl: false,
        // 默认 view module 路径
        defaultViewModulePath: false,
        // 查找失败时候的view module路径
        notFindViewModulePath: undefined,
        // hash路径目的地址不变，只是参数变更时候的通知消息key
        _DOJO_HASH_CHANGE_PARAMS_MESSAGE_KEY: "/dojo/hashchange/params",
        _previousRoute: null,
        _currentRoute: null,
        /**
         * {string array | Regex array} 只需要进行路由参数消息通知的路由路径字符串或者 正则表达式对象
         * {function} 判断函数
         * @param {object} currentRoute 当前路由
         * @param {object} readyToRoute 目的路由
         */
        onlyPublishRouteParamsChangeMessageRoute: undefined,
        /**
         * 过滤器链 { isContinue: function (route)}
         */
        filterChain: [],
        // 已视图加载路由表
        _routeTable: [],
        startup: function () {
            var me = this;
            me.inherited(arguments);
            this._hashchangeHandler = topic.subscribe("/dojo/hashchange", function (routeString) {
                var hashPollFrequency = lang.getObject('hashPollFrequency', false, dojoConfig) || 100;
                var now = new Date();
                // 防止hash值更改小于hash值改变监控事件的周期,默认100ms
                if (
                    !this._previousHashChangeDate ||
                    (this._previousHashChangeDate && (now - this._previousHashChangeDate) > hashPollFrequency)
                ) {
                    this._previousHashChangeDate = new Date();
                    me.onRouteStringChange(routeString);

                }
            });
        },
        destroy: function () {
            this._hashchangeHandler.remove();
            this.inherited(arguments);
        },
        getCurrentRoute: function () {
            return this._currentRoute;
        },
        /**
         * 路由跳转操作
         * 一个参数使用go1方法
         * 两个参数使用go2方法
         */
        go: function (routePath, paramObj) {
            if (arguments.length == 1) {
                this.go1(routePath);
            }
            else {
                this.go2(routePath, paramObj)
            }
        },
        /**
         * 路由跳转操作
         */
        go1: function (routeString) {
            var routePath = hashUtils.getRoutePath(routeString);
            var routeParamObj = hashUtils.getParams(routeString);
            this.go2(routePath, routeParamObj);
        },
        /**
         * 路由跳转操作
         */
        go2: function (routePath, paramObj) {
            var params = {
                routePath: routePath,
                paramObj: paramObj
            };
            this.onGoBefore(params);
            var newRouteString = this.buildRouteStringWithParams(params.routePath, params.paramObj);
            // 程序控制跳转的hash,有原生问题,反应不及时
            //hash(newRouteString);

            if (stringUtils.startWith(newRouteString, '#')) {
                newRouteString = newRouteString.substring(1);
            }
            location.hash = '#' + newRouteString;
            this.onRouteStringChange(newRouteString);

        },
        /**
         * 创建路由字符串
         * 必须实现方法
         * @param {string }routePath 路由路径
         * @param {object} paramObj 路由参数
         */
        buildRouteStringWithParams: function (routePath, paramObj) {
        },
        /**
         *  路由是否实际改变，不是只改变参数,只进行路由消息通知
         * 必须实现方法
         * @param readyToRoute 准备跳转路由
         */
        isOnlyPublishRouteParamsChangeMessageRoute: function (readyToRoute) {
            var currentRoute = this._currentRoute;
            var isRealChange = zh.isEmptyObject(currentRoute) || stringUtils.isEqualsIgnoreCase(currentRoute.viewModulePath, readyToRoute.viewModulePath) === false;
            var isOnlyPublishRouteParamsChangeMessageRoute = false;
            if (zh.isNotEmptyObject(currentRoute)) {
                if (zh.isFunction(this.onlyPublishRouteParamsChangeMessageRoute)) {
                    isOnlyPublishRouteParamsChangeMessageRoute = this.onlyPublishRouteParamsChangeMessageRoute(currentRoute, readyToRoute);
                }
                else {
                    var onlyPublishRouteParamsChangeMessageRoutes = zh.toArray(this.onlyPublishRouteParamsChangeMessageRoute);
                    for (var i in onlyPublishRouteParamsChangeMessageRoutes) {
                        var onlyPublishRouteParamsChangeMessageRoute = onlyPublishRouteParamsChangeMessageRoutes[i];
                        if (onlyPublishRouteParamsChangeMessageRoute instanceof RegExp) {
                            var regExp = onlyPublishRouteParamsChangeMessageRoute;
                            if (regExp.test(currentRoute.routePath)) {
                                isOnlyPublishRouteParamsChangeMessageRoute = true;
                                break;
                            }
                        } else {
                            if (onlyPublishRouteParamsChangeMessageRoute === currentRoute.routePath) {
                                isOnlyPublishRouteParamsChangeMessageRoute = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (isOnlyPublishRouteParamsChangeMessageRoute && !isRealChange) {
                return true;
            }
            return false;
        },
        /**
         * {function (routeString)} 从路由字符串中解析路由参数
         * 必须实现方法
         * @param routeString 路由字符串
         */
        getRouteParamObj: function (routeString) {
        },
        /**
         * 从路由字符串中解析路由路径
         * 必须实现方法
         * @param routeString 路由字符串
         */
        getRoutePathFromRouteString: function (routeString) {
        },
        /**
         *
         * @param newHash 新地址
         * @param paramObj 参数对象
         */
        onGoBefore: function (params) {

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

        },
        /**
         * 启动view加载动画
         * @param route 目标路由
         */
        startViewLoadingAnimate: function (route) {

        },
        /**
         * view加载完成动画结束回调事件
         * @param route 目标路由
         */
        onViewLoadingEndAnimateEndCallback: function (route) {
            var me = this;
            me.onViewShowBefore(route);
            route.view.show();
            on.emit(route.view, 'Loaded', {route: route});
            this.onViewShowAfter(route);
        },
        /**
         * 启动view加载结束动画
         * @param route 目标路由
         */
        startViewLoadingEndAnimate: function (route) {
            var me = this;
            me.onViewLoadingEndAnimateEndCallback(route);
        },
        // 加载完成时候 view 视图的处理
        onViewLoad: function (route) {
            var me = this;
            me._previousRoute = me._currentRoute;
            me.destroyPreviousView();
            var cloneRoute = lang.clone(route);
            route.view = new route.View({routeParams: cloneRoute});
            me.onAddToTargetNode(route);
            route.view.hide();
            me._currentRoute = route;
            me.startViewLoadingEndAnimate(route);
        },
        /**
         * 加载到目标Node对象
         * @param route
         */
        onAddToTargetNode: function (route) {
            var me = this;
            route.view.placeAt(me.getTargetNode());
            //route.view.startup();
        },
        /**
         *
         * @param paramObj
         * @param routeString: 路由字符串,
         * @param routePath: 路由路径
         * @param paramObj: 路由参数
         */
        publishRouteParamsChangeMessage: function (paramObj) {
            var me = this;
            topic.publish(me._DOJO_HASH_CHANGE_PARAMS_MESSAGE_KEY + '/' + me.id, paramObj);
        },
        /**
         *
         * @param callback 带路由参数
         *  routeString: 路由字符串,
         *  routePath: 路由路径
         *  paramObj: 路由参数
         */
        subscribeRouteParamsChanage: function (callback) {
            var me = this;
            topic.subscribe(me._DOJO_HASH_CHANGE_PARAMS_MESSAGE_KEY + '/' + me.id, callback);
        },
        /**
         * 根据路由字符串,改变内容
         * @param routeString 可空，默认当前hash 路由字符串
         */
        onRouteStringChange: function (routeString) {
            if (stringUtils.isEmpty(routeString)) {
                routeString = hashUtils.getRouteString();
            }
            if (stringUtils.isEmpty(routeString)) {
                if (this.defaultViewModulePath) {
                    routeString = this.defaultViewModulePath;
                }
                else {
                    return;
                }
            }
            var me = this;
            var route = me.convertRouteStringToRoute(routeString);
            if (zh.isEmptyObject(route)) {
                return;
            }
            for (var i in me.filterChain) {
                var filter = me.filterChain[i];
                if (filter.pathMatch(route.viewHashPath, route)) {
                    if (filter.isContinue(route.viewHashPath, route)) {
                        break;
                    } else {
                        return;
                    }
                }
            }

            if (me.isOnlyPublishRouteParamsChangeMessageRoute(route)) {
                var paramObj = {
                    routeString: routeString,
                    routePath: me.getRoutePathFromRouteString(routeString),
                    paramObj: me.getRouteParamObj(routeString),
                };
                me.publishRouteParamsChangeMessage(paramObj);
                return;
            }
            if (this.onViewLoadBefore(route) === false) {
                return;
            }
            me.startViewLoadingAnimate(route);

            var preRoute = linq.From(me._routeTable).FirstOrDefault(null, 'p=>p.viewModulePath=="' + route.viewModulePath + '"');
            if (preRoute != null) {
                route.View = preRoute.View;
                me.onViewLoad(route);
                return;
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
        destroyPreviousView: function () {
            var me = this;
            if (me._previousRoute) {
                me._previousRoute.view && me._previousRoute.view.destroy();
                delete me._previousRoute.view;
                delete me._previousRoute;
            }
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
                route.View = View;
                me._routeTable.push(route);
                me.onViewLoad(route);
            });
        },
        // 加载 view js 文件失败
        onLoadViewJsError: function (route, error) {
            log.error('无法加载view,' + route.viewModulePath);
            if (this.notFindViewModulePath) {
                this.go(this.notFindViewModulePath);
            }
        },

        // 已视图加载路由表
        _routeTable: [],
        // hash参数转换为路由项
        convertRouteStringToRoute: function (routeString) {
            var me = this;
            var urlPath = me.getRoutePathFromRouteString(routeString);
            if (zh.isEmptyObject(urlPath)) {
                return null;
            }
            var urlPaths = urlPath.split('/');
            var viewModuleHashPath = '';
            var viewModulePath = me.viewBaseUrl;
            if (urlPaths[urlPaths.length - 1]) {
                var moduleName = urlPaths[urlPaths.length - 1];
                var firstChar = moduleName[0];
                moduleName = firstChar.toUpperCase() + moduleName.substring(1, moduleName.length);
                urlPaths[urlPaths.length - 1] = moduleName;
            }
            urlPaths.forEach(function (urlPath) {
                viewModuleHashPath = stringUtils.concatByChar(viewModuleHashPath, urlPath, '/');
            });
            viewModulePath = stringUtils.concatByChar(viewModulePath, viewModuleHashPath, '/');
            var params = me.getRouteParamObj(routeString);
            var routePath = me.getRoutePathFromRouteString(routeString);
            var viewAbsModuleUrl = require.toUrl(viewModulePath) + '.js';
            return {
                viewAbsModuleUrl: viewAbsModuleUrl,
                viewHashPath: viewModuleHashPath,
                viewModulePath: viewModulePath,
                routePath: routePath,
                routeString: routeString,
                params: params,
                view: null
            };
        }
    });
});