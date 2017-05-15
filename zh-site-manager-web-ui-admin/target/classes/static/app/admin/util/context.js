/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/context
 */
define([
    'zh/core',
    'admin/appConfig',
    'admin/api/applicationHttpService',
], function (zh, appConfig, applicationHttpService) {

    var context = {
        app: null,
        config: appConfig,

    };
    var app = {};
    applicationHttpService.getBaseInfo({sync: true}).success(function (res) {
        app = res;
    });
    context.app = app;
    return context;
});