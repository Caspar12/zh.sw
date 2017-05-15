/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/text/PasswordTextBox
 */
define([
    'zh/widget/text/ValidationTextBox',
    'zh/widget/text/_TextBoxMixin',
    "dojo/_base/declare",
], function (ValidationTextBox, _TextBoxMixin, declare) {
    return declare('zh/widget/text/PasswordTextBox', [ValidationTextBox, _TextBoxMixin], {
        type: 'password',
        class: 'adapteTextAutoWidth'
    });
});