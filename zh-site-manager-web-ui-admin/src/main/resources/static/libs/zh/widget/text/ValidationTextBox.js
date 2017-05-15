/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description\
 * @file zh/widget/text/ValidationTextBox
 */
define([
    'dijit/form/ValidationTextBox',
    'zh/widget/text/_TextBoxMixin',
    "dojo/_base/declare",
], function (ValidationTextBox, _TextBoxMixin, declare) {
    return declare('zh/widget/text/ValidationTextBox', [ValidationTextBox, _TextBoxMixin], {
        class: 'adapteTextAutoWidth'
    });
});