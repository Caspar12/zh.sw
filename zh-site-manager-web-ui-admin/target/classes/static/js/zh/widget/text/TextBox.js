/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/text/TextBox
 */
define([
    'dijit/form/TextBox',
    'zh/widget/text/_TextBoxMixin',
    "dojo/_base/declare",
], function (TextBox, _TextBoxMixin, declare) {
    return declare('zh/widget/text/TextBox', [TextBox, _TextBoxMixin], {
        class: 'adapteTextAutoWidth',

    });
});