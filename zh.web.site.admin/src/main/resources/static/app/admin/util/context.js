/**
 * Created by 陈志杭 on 2016/12/27.
 */
define(['zh/core', 'admin/api/application', 'admin/module/config'], function (zh, application, config) {

    var app = {};
    application.getBaseInfo({sync: true}).then(function (res) {
        app = res;
    });
    return {
        app: app,
        config: config,
        account: null,
        isLogin: function () {
            return this.account !== null;
        }
    }
});