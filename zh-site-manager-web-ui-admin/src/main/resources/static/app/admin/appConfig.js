/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn 程序逻辑配置
 * @file admin/appConfig
 */
define([
    'zh/app/filters/AnonymousFilter',
    'zh/app/filters/AuthenticationFilter',
    'require',
], function (AnonymousFilter, AuthenticationFilter, require) {
    var appConfig = {
        /**
         * 多少毫秒没有操作自动锁定桌面
         */
        withoutOperationLockDeskMilliseconds: 20 * 60 * 1000,
        /**
         * 检查没有操作的时间周期
         */
        checkWithoutOperationLockDeskPeriodMilliseconds: 30 * 1000,
        request: {
            // 请求过期时间,单位Milliseconds
            timeout: 30 * 1000,
        },
        // api层是否使用客户端本地测试数据
        isClientTestApi: false,
        // api层测试数据相对获取url, isClientTestUrl + 请求地址 + .json
        isClientTestUrl: 'admin/api/test',
        loginStateStorageKey: '__WMS_ACCOUNT',
        // token 过期时间，单位秒
        tokenCookieExpireSeconds: -1,
        logConfig: {
            isInfoEnabled: true,
            isDebugEnabled: true,
            isErrorEnabled: true,
            isWarnEnabled: true,
        },
        requestHeaderTokenKey: '__WMS_TOKEN',
        // 登陆地址
        loginPath: '/login',
        // 默认地址
        defaultPath: '/login',
        // 主界面路由
        viewPathFilters: [
            new AnonymousFilter({
                paths: [
                    '/login',
                    '/register'
                ]
            }),
            new AuthenticationFilter({
                paths: [
                    new RegExp('.*')
                ],
                isLogin: function (routePath, route) {
                    var loginStateUtils = require('admin/util/loginStateUtils');
                    return loginStateUtils.isLogin();
                },
                onDenyAllow: function (routePath, route) {
                    var container = this.getContainer();
                    container.go(appConfig.loginPath);
                }
            }),
        ],
    };
    window.appConfig = appConfig;
    return appConfig;
});