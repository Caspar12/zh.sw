/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/DeliverPrintWaybillTemplateIdSelect2
 */
define([
    'admin/view-partial/main/order/widget/form/value-widget/DeliverPrintWaybillTemplateIdSelect2',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    "dojo/_base/declare"
], function (Select2, orderHttpService, apiConfig, zh, request, array, declare) {

    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/DeliverPrintWaybillTemplateIdSelect2', [Select2], {
        allowClear: false,
        placeHolder: '请选择',
        width: 'off',

    });
});