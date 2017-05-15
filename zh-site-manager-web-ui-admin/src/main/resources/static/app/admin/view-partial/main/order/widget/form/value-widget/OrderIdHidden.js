/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/OrderIdHidden
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/OrderIdHidden', [TextBox], {
        label: '订单Id',
        name: 'id',
        placeHolder: '订单Id',
        style: 'display:none'
    });
});