/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemUnitNameText
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemUnitNameText', [TextBox], {
        label: '单位名称',
        name: 'unitName',
        placeHolder: '单位名称',

    });
});