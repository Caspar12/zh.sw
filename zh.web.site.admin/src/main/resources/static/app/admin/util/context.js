/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/context
 */
define([
    'zh/core',
    'admin/api/application',
    'admin/module/config',
    'admin/util/uiUtils',
], function (zh, application, config, uiUtils) {

    var context = {
        app: null,
        config: config,
        account: null,
        uiUtils: uiUtils,
        isLogin: function () {
            return this.account !== null;
        }
    };
    var app = {};
    application.getBaseInfo({sync: true}).success(function (res) {
        app = res;
    });
    context.app = app;
    window.context = context;
    return context;
});