/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/OrderItemNameText
 */
define([
    'zh/widget/text/TextBox',
    'admin/services/enums/OrderPropertyEnum',
    "dojo/_base/declare"
], function (TextBox, OrderPropertyEnum, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/OrderItemNameText', [TextBox], {
        label: OrderPropertyEnum.OrderItemName.text,
        name: OrderPropertyEnum.OrderItemName.textBoxName,
        placeHolder: OrderPropertyEnum.OrderItemName.text,
    });
});