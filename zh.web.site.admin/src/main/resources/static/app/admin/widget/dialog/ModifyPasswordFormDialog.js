/**
 * Created by 陈志杭 on 2016/12/27.
 * @description
 * @file admin/widget/dialog/ModifyPasswordFormDialog
 */
define([
    "admin/widget/form/Form",
    "dijit/form/Button",
    'zh/widget/text/ValidationTextBox',
    'admin/widget/text/PasswordTextBox',
    'dojox/layout/TableContainer',
    'zh/widget/button/LoginButton',
    'zh/widget/button/ResetButton',
    'zh/widget/button/SaveButton',
    'dijit/layout/ContentPane',
    'dijit/Dialog',
    'admin/util/context',
    'dojo/router',
    "admin/api/apiConfig",
    "dojo/_base/declare",
], function (Form, Button, ValidationTextBox, PasswordTextBox, TableContainer, LoginButton, ResetButton, SaveButton, ContentPane, Dialog, context, router, apiConfig, declare) {

    return declare(Dialog, {
        title: '修改密码',
        closable: true,
        draggable: false,
        postCreate: function () {
            this.inherited(arguments);

        },
        startup: function () {
            this.inherited(arguments);
            var dialog = this;

            var form = new Form({
                action: apiConfig.account.updatePassword
            });
            var table = new TableContainer({cols: 1, labelWidth: 100, showLabels: true});
            var btnSubmit = new SaveButton();
            var btnReset = new ResetButton();
            var bottomPane = new ContentPane({label: '', style: 'text-align: right;'});
            var txtOldPwd = new PasswordTextBox({
                label: '旧密码',
                name: 'oldPassword',
                style: {width: '200px'}
            });
            var txtNewPwd = new PasswordTextBox({
                label: '新密码',
                name: 'newPassword',
                style: {width: '200px'}
            });
            var txtConfirmPwd = new PasswordTextBox({
                label: '确认密码',
                name: 'confirmPassword',
                style: {width: '200px'}
            });
            table.addChild(txtOldPwd);
            table.addChild(txtNewPwd);
            table.addChild(txtConfirmPwd);
            btnSubmit.placeAt(bottomPane);
            btnReset.placeAt(bottomPane);
            bottomPane.placeAt(table)
            table.placeAt(form);
            table.startup();
            form.placeAt(dialog);

        }
    });
});