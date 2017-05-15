/**
 * Created by 陈志杭 on 2016/12/27.
 * @description
 * @file admin/widget/dialog/ModifyPasswordFormDialog
 */
define([
    "admin/widget/form/Form",
    // 'zh/widget/form/Form',
    "dijit/form/Button",
    'zh/widget/text/ValidationTextBox',
    'admin/widget/text/PasswordTextBox',
    'dojox/layout/TableContainer',
    'zh/widget/button/LoginButton',
    'zh/widget/button/ResetButton',
    'zh/widget/button/SaveButton',
    'dijit/layout/ContentPane',
    'admin/widget/dialog/ConfirmDialog',
    'admin/util/context',
    'dojo/router',
    "admin/api/apiConfig",
    'admin/util/tipUtils',
    'admin/util/loginStateUtils',
    "dojo/_base/declare",
], function (Form, Button, ValidationTextBox, PasswordTextBox, TableContainer, LoginButton, ResetButton, SaveButton, ContentPane, Dialog, context, router, apiConfig,
             tipUtils, loginStateUtils, declare) {

    return declare(Dialog, {
        title: '修改密码',
        closable: true,
        draggable: false,
        isAjax: true,
        action: apiConfig.identity.updatePassword,
        onSuccess: function (account) {
            loginStateUtils.setAccount(account);
            tipUtils.success('修改成功');
            this.reset();
            this.hide();
        },
        postCreate: function () {
            this.inherited(arguments);

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
                equalValueWidget: txtNewPwd,
                style: {width: '200px'}
            });
            this.addItem(txtOldPwd);
            this.addItem(txtNewPwd);
            this.addItem(txtConfirmPwd);
        }
    });
});