/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/ResetDeliverPrintWaybillTemplateDialog
 */
define([
    'admin/view-partial/main/order/widget/dialog/SetDeliverPrintWaybillTemplateDialog',
    'admin/view-partial/main/order/widget/form/value-widget/edit/DeliverPrintWaybillTemplateIdSelect2',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',

    "dojo/_base/declare"
], function (ConfirmDialog, DeliverPrintWaybillTemplateIdSelect2, orderHttpService, apiConfig, zh, request, array, declare) {
    return declare('admin/view-partial/main/order/widget/dialog/ResetDeliverPrintWaybillTemplateDialog', [ConfirmDialog], {
        action: apiConfig.admin.order.resetDeliverPrintWaybillTemplate,
    });
});