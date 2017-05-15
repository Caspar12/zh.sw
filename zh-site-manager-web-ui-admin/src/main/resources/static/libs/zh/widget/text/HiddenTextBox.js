/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/widget/text/HiddenTextBox
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('zh/widget/text/HiddenTextBox', [TextBox], {
        label: '',
        name: '',
        placeHolder: '',
        style: 'display:none'
    });
});