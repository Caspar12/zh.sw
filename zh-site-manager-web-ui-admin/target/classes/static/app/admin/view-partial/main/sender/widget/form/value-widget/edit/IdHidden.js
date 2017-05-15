/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/form/value-widget/edit/IdHidden
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/sender/widget/form/value-widget/edit/IdHidden', [TextBox], {
        label: 'id',
        name: 'id',
        placeHolder: 'id',
        style: 'display:none'
    });
});