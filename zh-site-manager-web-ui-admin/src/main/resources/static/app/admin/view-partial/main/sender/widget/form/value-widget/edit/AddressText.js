/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/form/value-widget/edit/AddressText
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/sender/widget/form/value-widget/edit/AddressText', [TextBox], {
        label: '发件地址',
        name: 'address',
        placeHolder: '发件地址',
        required: false,
    });
});