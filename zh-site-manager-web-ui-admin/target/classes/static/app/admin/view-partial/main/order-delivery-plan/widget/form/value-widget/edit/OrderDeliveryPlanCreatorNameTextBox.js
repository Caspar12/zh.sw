/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanCreatorNameTextBox
 */
define([
    'zh/widget/text/TextBox',
    'admin/services/enums/OrderDeliveryPlanEnum',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    "dojo/_base/declare"
], function (TextBox, OrderDeliveryPlanEnum, orderHttpService, apiConfig, zh, request, array, declare) {
    return declare('admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanCreatorNameTextBox', [TextBox], {

        label: OrderDeliveryPlanEnum.DeliveryPlanCreatorName.text,
        name: OrderDeliveryPlanEnum.DeliveryPlanCreatorName.id,
        placeHolder: OrderDeliveryPlanEnum.DeliveryPlanCreatorName.text,
    });
});