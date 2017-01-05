/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([
    'zh/app/view/PageView',
    'admin/widget/loginform/LoginForm',
    'dijit/Dialog',
    'admin/util/context',
    'dojo/router',
    "dojo/_base/declare",
], function (PageView, LoginForm, Dialog, context, router, declare) {
    return declare(PageView, {
        startup: function () {
            this.inherited(arguments);
            this.set('content', context.account.name);
            this.show();
        }
    });
});