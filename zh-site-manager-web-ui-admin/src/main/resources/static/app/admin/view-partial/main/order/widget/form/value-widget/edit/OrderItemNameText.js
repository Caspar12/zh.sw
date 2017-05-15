/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemNameText
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (OrderItemNameText, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemNameText', [OrderItemNameText], {
        label: '产品名称',
        name: 'name',
        placeHolder: '产品名称',
        required: true,
    });
});