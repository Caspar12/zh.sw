/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/TpOrderCreatedDt
 */
define([
    'zh/plugins/bootstrap/widget/form/DateTimeTextBox',
    'admin/services/enums/OrderPropertyEnum',
    "dojo/_base/declare"
], function (DateTimeTextBox, OrderPropertyEnum, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/TpOrderCreatedDt',
        [DateTimeTextBox],
        {
            label: OrderPropertyEnum.TpOrderCreatedDt.text,
            name: OrderPropertyEnum.TpOrderCreatedDt.id,
            placeHolder: OrderPropertyEnum.TpOrderCreatedDt.text,
        });
});