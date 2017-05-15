/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/SetDeliverPrintWaybillTemplateDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'admin/view-partial/main/order/widget/form/value-widget/edit/DeliverPrintWaybillTemplateIdSelect2',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',

    "dojo/_base/declare"
], function (ConfirmDialog, DeliverPrintWaybillTemplateIdSelect2, orderHttpService, apiConfig, zh, request, array, declare) {
    return declare('admin/view-partial/main/order/widget/dialog/SetDeliverPrintWaybillTemplateDialog', [ConfirmDialog], {
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
        action: apiConfig.admin.order.setDeliverPrintWaybillTemplate,
        request: request,
        title: '选择快递单类型',
        postCreate: function () {
            this.inherited(arguments);
            this.addItem(new DeliverPrintWaybillTemplateIdSelect2({
                width: 'style',
                style: {width: '200px'},
                labelStyle: {width: '100px'},
            }));
        },
    });
});