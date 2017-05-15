/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanRemarkTextArea
 */
define([
    'zh/widget/form/Textarea',
    'admin/services/enums/OrderDeliveryPlanEnum',
    "dojo/_base/declare"
], function (Textarea, OrderDeliveryPlanEnum, declare) {
    return declare('admin/view-partial/main/order-delivery-plan/widget/form/value-widget/OrderDeliveryPlanRemarkTextArea',
        [Textarea],
        {
            label: OrderDeliveryPlanEnum.Remark.text,
            placeHolder: OrderDeliveryPlanEnum.Remark.text,
            name: OrderDeliveryPlanEnum.Remark.id,
            isAutoHeight: false,
            style: 'height:100px;',

        });
});