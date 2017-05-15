/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemBarCodeText
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemBarCodeText', [TextBox], {
        label: '产品条码',
        name: 'barCode',
        placeHolder: '产品条码',
        required: true,

    });
});