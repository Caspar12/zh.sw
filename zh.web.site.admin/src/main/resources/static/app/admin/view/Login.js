/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([
    'zh/app/view/PageView',
    'admin/widget/loginform/LoginForm',
    'dijit/Dialog',
    'admin/util/context',
    'admin/util/viewRouter',
    "dojo/_base/declare",

], function (PageView, LoginForm, Dialog, context, viewRouter, declare) {
    return declare(PageView, {
        dialog: false,
        startup: function () {
            this.inherited(arguments);
            var dialog = new Dialog({
                title: context.app.name,
                closable: false,
                draggable: false
            });
            var frmLogin = dialog.form = new LoginForm({
                success: function (res) {
                    context.account = res;
                    viewRouter.go('/main');
                    context.viewRouter;
                }
            });

            this.dialog = dialog
            frmLogin.placeAt(dialog);
            dialog.placeAt(this);
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