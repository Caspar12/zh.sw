/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanCreatedDt
 */
define([
    'zh/plugins/bootstrap/widget/form/DateTimeTextBox',
    'admin/services/enums/OrderDeliveryPlanEnum',
    "dojo/_base/declare"
], function (DateTimeTextBox, OrderDeliveryPlanEnum, declare) {
    return declare('admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanCreatedDt',
        [DateTimeTextBox],
        {
            label: OrderDeliveryPlanEnum.DeliveryPlanCreatedDt.text,
            name: OrderDeliveryPlanEnum.DeliveryPlanCreatedDt.id,
            placeHolder: OrderDeliveryPlanEnum.DeliveryPlanCreatedDt.text,
        });
});