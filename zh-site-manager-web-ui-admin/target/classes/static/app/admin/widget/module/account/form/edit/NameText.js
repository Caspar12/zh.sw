/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/widget/module/account/form/edit/NameText
 *
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/widget/module/account/form/edit/NameText', [TextBox], {
        label: '名称',
        name: 'name',
        placeHolder: '名称',

        required: true
    });
});