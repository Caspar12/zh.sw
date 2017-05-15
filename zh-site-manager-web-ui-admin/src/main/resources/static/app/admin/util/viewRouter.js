/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/viewRouter
 */
define(
    [
        'zh/app/ViewRouter',
        'dojo/router',
        'dojo/request',
        'admin/util/context',
        'zh/core',
        'admin/util/pageTransitionsUtils',
        'zh/util/stringUtils',
        'dojo/cookie',
        'admin/appConfig',
        'admin/util/loginStateUtils',
        'zh/app/filters/AnonymousFilter',
        'zh/app/filters/AuthenticationFilter',
        'zh/util/log',
        'dojo/_base/array'
    ],
    function (ViewRouter, router, request, context, zh, pageTransitionsUtils, stringUtils, cookie, appConfig, loginStateUtils, AnonymousFilter, AuthenticationFilter,
              log, array) {

        var viewRouter = new ViewRouter({
            // view 根路径 m,e
            viewBaseUrl: 'admin/view',
            defaultViewModulePath: appConfig.defaultPath,
            onlyPublishRouteParamsChangeMessageRoute: ['/main'],
            filterChain: [],
            onGoBefore: function (params) {
                if (cookie.isSupported() === false) {
                    params = params || {};
                    params.paramObj = params.paramObj || {};
                    params.paramObj[appConfig.loginStateStorageKey] = loginStateUtils.getAccountStorageString();
                }
                return params;
            },
            startViewLoadingAnimate: function (route) {
                var me = this;
                pageTransitionsUtils.show(function () {

                });
            },
            startViewLoadingEndAnimate: function (route) {
                var me = this;
                pageTransitionsUtils.hide(function () {

                    me.onViewLoadingEndAnimateEndCallback(route);
                });
            }
        });
        var filters = array.map(appConfig.viewPathFilters, function (filter) {
            filter.getContainer = function () {
                return viewRouter;
            };
            return filter;
        });
        viewRouter.set('filterChain', filters);
        context.viewRouter = viewRouter;
        viewRouter.startup();
        return viewRouter;
    }
);