/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemCodeText
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemCodeText', [TextBox], {
        label: '产品编码',
        name: 'code',
        placeHolder: '产品编码',
        required: true,

    });
});