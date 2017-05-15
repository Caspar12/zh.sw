/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/form/value-widget/edit/NameText
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/sender/widget/form/value-widget/edit/NameText', [TextBox], {
        label: '发件人',
        name: 'name',
        placeHolder: '发件人',
        required: false,

    });
});