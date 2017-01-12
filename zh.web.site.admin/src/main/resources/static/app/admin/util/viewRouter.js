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
    ],
    function (ViewRouter, router, request, context, zh, pageTransitionsUtils, stringUtils) {
        var viewRouter = new ViewRouter({
            // view 根路径 m,e
            viewBaseUrl: 'admin/view',
            defaultViewModulePath: 'login',
            onViewLoadBefore: function (route) {
                return true;
                if (context.isLogin() || stringUtils.isEqualsIgnoreCase(route.viewHashPath, '/login')) {
                    return true;
                } else {
                    this.go('/login');
                    return false;
                }
            },
            startViewLoadingAnimate: function (route) {
                var me = this;
                pageTransitionsUtils.show(function () {
                    me.onViewLoadingAnimateEndCallback(route);
                });
            },
            startViewLoadingEndAnimate: function (route) {
                var me = this;
                pageTransitionsUtils.hide(function () {
                    me.onViewLoadingEndAnimateEndCallback(route);
                });
            }
        });
        viewRouter.startup();
        viewRouter.pageTransitionsUtils = pageTransitionsUtils;
        context.viewRouter = viewRouter;
        return viewRouter;
    }
);