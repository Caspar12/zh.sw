/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/DeliveryPlanIdSelect2
 */
define([
    'zh/plugins/jquery/widget/form/select2/Select',
    'admin/services/enums/OrderPropertyEnum',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',

    'dojo/_base/array',
    "dojo/_base/declare"
], function (Select2, OrderPropertyEnum, orderHttpService, apiConfig, zh, request, array, declare) {

    return declare('admin/view-partial/main/order/widget/form/value-widget/DeliveryPlanIdSelect2', [Select2], {
        label: OrderPropertyEnum.DeliveryPlanId.text,
        name: OrderPropertyEnum.DeliveryPlanId.id,
        resultTotalCountFieldName: 'totalItemCount',
        resultDataFieldName: 'data',
        request: request,
        url: apiConfig.admin.order.listOrderDeliveryPlanPage,
        allowClear: true,
        preventCache: true,
        placeHolder: '全部',
        onFormatResults: function (results) {
            return array.map(results, function (item) {
                return {value: item.id, label: item.deliveryPlanName};
            });
        },
    });
});