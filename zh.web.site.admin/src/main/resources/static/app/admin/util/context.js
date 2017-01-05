/**
 * Created by 陈志杭 on 2016/12/27.
 */
define(['zh/core', 'admin/api/application'], function (zh, application) {
    var app = {};
    application.getBaseInfo({sync: true}).then(function (res) {
        app = res;
    });
    return {
        app: app,
        account: false,
        isLogin: function () {
            return this.account !== false;
        }
    }
});