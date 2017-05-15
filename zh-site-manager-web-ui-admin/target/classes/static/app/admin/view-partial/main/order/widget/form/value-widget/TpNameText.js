/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/TpNameText
 */
define([
    'zh/widget/text/ValidationTextBox',
    'admin/services/enums/OrderPropertyEnum',
    "dojo/_base/declare"
], function (TextBox, OrderPropertyEnum, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/TpNameText', [TextBox], {
        label: OrderPropertyEnum.TpName.text,
        name: OrderPropertyEnum.TpName.id,
        placeHolder: OrderPropertyEnum.TpName.text,
    });
});