/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description 包裹类型输入Select藉由
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/PackageTypeSelect2
 */
define([
    'admin/view-partial/main/order/widget/form/value-widget/PackageTypeSelect2',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',

    'dojo/_base/array',
    "dojo/_base/declare"
], function (PackageTypeSelect2, orderHttpService, apiConfig, zh, request, array, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/PackageTypeEditSelect2', [PackageTypeSelect2], {
        allowClear: false,
        placeHolder: '请选择',
        width: 'off',
    });
});