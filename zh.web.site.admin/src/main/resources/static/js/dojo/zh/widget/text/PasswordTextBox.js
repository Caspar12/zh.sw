/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/text/PasswordTextBox
 */
define([
    'zh/widget/text/AdapteTextBox',
    'dijit/form/ValidationTextBox',
    "dojo/_base/declare",
], function (AdapteTextBox, ValidationTextBox, declare) {
    return declare([AdapteTextBox, ValidationTextBox], {
        type: 'password',

    });
});