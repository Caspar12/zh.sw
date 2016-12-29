/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([
    "dijit/form/Form",
    "dijit/form/Button",
    'widget/text/ValidationTextBox',
    'widget/text/PasswordTextBox',
    'dojox/layout/TableContainer',
    'widget/button/LoginButton',
    'widget/button/ResetButton',
    'dijit/layout/ContentPane',
], function (Form, Button, ValidationTextBox,PasswordTextBox, TableContainer, LoginButton, ResetButton, ContentPane) {

    return function () {
        var form = new Form();
        var table = new TableContainer({cols: 1, labelWidth: 100, showLabels: true});
        var btnSubmit = new LoginButton();
        var btnReset = new ResetButton();
        var bottomPane = new ContentPane({label: '', style: 'text-align: right;'});
        var txtAccount = new ValidationTextBox({
            label: '账 号',
            name: 'account',
            required: true
        });
        var txtPassword = new PasswordTextBox({
            label: '密 码',
            name: 'password',
            required: true
        });
        table.addChild(txtAccount);
        table.addChild(txtPassword);
        btnSubmit.placeAt(bottomPane);
        btnReset.placeAt(bottomPane);
        bottomPane.placeAt(table)
        table.placeAt(form);
        table.startup();
        return form;
    };
});