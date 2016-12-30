/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,基本视图
 */
define([
    'dojo/router',
    "dojo/_base/declare"
], function (router, declare) {
    return declare([router], {
        routeConfig: {
            viewPath: false
        },
        isAutoRoute: false,
        go: function (value) {
            var me = this;
            if (me.isAutoRoute === true)
                me.inherited(value);
            else {

            }
        }
    });
});