/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/text/NumberTextBox
 */
define([
    'dijit/form/NumberTextBox',
    "dojo/_base/declare",
], function (TextBox, declare) {
    return declare('zh/widget/text/NumberTextBox', [TextBox], {
        class: 'adapteTextAutoWidth',
        postCreate: function () {
            this.inherited(arguments);
       //     this.textbox.type = 'number';
        }
    });
});