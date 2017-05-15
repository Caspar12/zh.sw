/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/RecevierText
 */
define([
    'zh/widget/text/ValidationTextBox',
    'admin/services/enums/OrderPropertyEnum',
    "dojo/_base/declare"
], function (TextBox, OrderPropertyEnum, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/RecevierText', [TextBox], {
        label: OrderPropertyEnum.Recevier.text,
        name: OrderPropertyEnum.Recevier.id,
        placeHolder: OrderPropertyEnum.Recevier.text,
    });
});