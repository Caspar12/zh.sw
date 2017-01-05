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
        dialog: false,
        startup: function () {
            this.inherited(arguments);
            var loginForm = new LoginForm({
                success: function (res) {
                    context.account = res;
                    router.go('/main');
                }
            });

            var dialog = new Dialog({
                title: context.app.name,
                closable: false,
                draggable: false
            });
            this.dialog = dialog
            loginForm.placeAt(dialog);
            dialog.placeAt(this);
            this.show();
        },
        show: function () {
            this.inherited(arguments);
            this.dialog && this.dialog.show();
        },
        hide: function () {
            this.inherited(arguments);
            this.dialog && this.dialog.hide();
        }
    });
});