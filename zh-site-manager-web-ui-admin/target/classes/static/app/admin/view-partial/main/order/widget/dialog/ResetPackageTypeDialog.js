/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/ResetPackageTypeDialog
 */
define([
    'admin/view-partial/main/order/widget/dialog/SetPackageTypeDialog',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',

    "dojo/_base/declare"
], function (ConfirmDialog, orderHttpService, apiConfig, zh, request, array, declare) {
    return declare('admin/view-partial/main/order/widget/dialog/ResetPackageTypeDialog', [ConfirmDialog], {
        action: apiConfig.admin.order.resetPackageType,
    });
});