/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/InputWaybillDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'admin/view-partial/main/order/widget/table/InputWaybillTable',
    'zh/widget/text/TextBox',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/datetimeUtils',
    "dojo/_base/declare",
    'dojo/json',
], function (ConfirmDialog, InputWaybillTable, TextBox, orderHttpService, apiConfig, zh, request, array, datetimeUtils, declare, json) {

    return declare('admin/view-partial/main/order/widget/dialog/InputWaybillDialog', [ConfirmDialog], {
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter:true,
        inputWaybillTableData: [],
        action: apiConfig.admin.order.setTrackingNumber,
        request: request,
        title: '输入快递单号',
        isHorizontalLayout: true,
        style: "width: 50000px;height:50000px",
        extraParams: {},
        requestOptions: {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
            }
        },
        processRequestAjaxSetParams: function (params) {
            var data = this.inputWaybillTable.getData();
            data = array.map(data, function (item) {
                return {
                    orderId: item.id,
                    trackingNumber: item.trackingNumber
                };
            });
            data = {trackingNumbers: data};
            return json.stringify(data);
        },
        postCreate: function () {
            this.inherited(arguments);
            var inputWaybillTable = new InputWaybillTable({
                data: this.inputWaybillTableData
            });
            this.inputWaybillTable = inputWaybillTable;
            this.addChild(inputWaybillTable);
        },
        show: function () {
            var me = this;
            var promise = this.inherited(arguments);
            promise.then(function () {
                me.inputWaybillTable._plugin.columns.adjust();
            });
            return promise;

        }
    });
});