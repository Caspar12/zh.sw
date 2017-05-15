/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/form/value-widget/edit/ContactText
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/sender/widget/form/value-widget/edit/ContactText.js', [TextBox], {
        label: '联系方式',
        name: 'contact',
        placeHolder: '联系方式',
        required: false,

    });
});