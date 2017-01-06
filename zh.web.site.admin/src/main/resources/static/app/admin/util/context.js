/**
 * Created by 陈志杭 on 2016/12/27.
 */
define(['zh/core', 'admin/api/application', 'admin/module/config'], function (zh, application, config) {

    return {
        app: null,
        config: config,
        account: null,
        isLogin: function () {
            return this.account !== false;
        }
    }
});