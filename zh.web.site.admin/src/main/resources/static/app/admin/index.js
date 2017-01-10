/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/index.js
 */
require(
    [
        'zh/app/ViewRouter',
        'dojo/router',
        //'admin/module/request',
        'dojo/request',
        'admin/util/context',
        'zh/core',
        'admin/util/pageTransitionsUtil',
        "dojo/domReady!"
    ],
    function (ViewRouter, router, request, context, zh, pageTransitionsUtil) {

        var viewRouter = new ViewRouter({
            // view 根路径 m,e
            viewBaseUrl: 'admin/view',
            defaultViewModulePath: 'login',
            onViewLoadBefore: function (route) {
                if (context.isLogin() || zh.stringUtils.isEqualsIgnoreCase(route.viewHashPath, '/login')) {
                    return true;
                } else {
                    router.go('/login');
                    return false;
                }
            },
            onBeginPageTransition: function () {
                pageTransitionsUtil.show();
            },
            onEndPageTransition: function () {
                pageTransitionsUtil.hide()
            }
        });
        viewRouter.startup();
        router.startup();
    }
);
