/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/DeliverIdSelect2
 */
define([
    'admin/view-partial/main/order/widget/form/value-widget/edit/TransporterIdSelect2',
    'admin/services/enums/OrderPropertyEnum',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    "dojo/_base/declare"
], function (TransporterIdSelect2, OrderPropertyEnum, orderHttpService, apiConfig, zh, request, array, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/DeliverIdSelect2', [TransporterIdSelect2], {
        allowClear: false,
        placeHolder: '请选择',
        width: 'off',
        name: OrderPropertyEnum.DeliverId.id,
    });
});