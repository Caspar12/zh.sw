/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/widget/login-form/LoginForm
 */
define([
    "admin/widget/form/Form",
    "dijit/form/Button",
    'zh/widget/text/ValidationTextBox',
    'zh/widget/text/PasswordTextBox',
    'dojox/layout/TableContainer',
    'zh/widget/button/LoginButton',
    'zh/widget/button/ResetButton',
    'dijit/layout/ContentPane',
    'admin/util/context',
    'dojo/router',
    "admin/api/apiConfig",
    "dojo/_base/declare",
], function (Form, Button, ValidationTextBox, PasswordTextBox, TableContainer, LoginButton, ResetButton, ContentPane, context, router, apiConfig, declare) {

    return declare(Form, {
        txtAccount: null,
        txtPassword: null,
        action: apiConfig.identity.login,
        success: function (res) {
            context.account = res;
        },
        startup: function () {
            this.inherited(arguments);
            var form = this;
            var table = new TableContainer({cols: 1, labelWidth: 100, showLabels: true});
            var btnSubmit = new LoginButton();
            var btnReset = new ResetButton();
            var bottomPane = new ContentPane({label: '', style: 'text-align: right;'});
            var txtAccount = new ValidationTextBox({
                label: '账 号',
                name: 'account',
                required: true,
                style: {width: '200px'}
            });
            this.txtAccount = txtAccount;
            var txtPassword = new PasswordTextBox({
                label: '密 码',
                name: 'password',
                required: true,
                style: {width: '200px'}
            });
            this.txtPassword = txtPassword;
            table.addChild(txtAccount);
            table.addChild(txtPassword);
            btnSubmit.placeAt(bottomPane);
            btnReset.placeAt(bottomPane);
            bottomPane.placeAt(table)
            table.placeAt(form);
            table.startup();
        }
    });
});