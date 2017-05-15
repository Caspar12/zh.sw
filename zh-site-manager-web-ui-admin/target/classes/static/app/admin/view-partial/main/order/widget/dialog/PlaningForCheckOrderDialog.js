/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/PlaningForCheckOrderDialog
 */
define([
    'jquery',
    'admin/widget/dialog/ConfirmDialog',
    'zh/widget/layout/TitlePane',
    'zh/widget/form/Form',
    'admin/view-partial/main/order/widget/table/DeliveryPlanPreviewProductTable',
    'admin/view-partial/main/order/widget/table/PlaningForCheckDialogOrderTable',
    'admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanCreatedDt',
    'admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanCreatorNameTextBox',
    'admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanSerialNumberTextBox',
    'admin/view-partial/main/order-delivery-plan/widget/form/value-widget/edit/OrderDeliveryPlanRemarkTextArea',
    'zh/widget/text/TextBox',
    'dojox/layout/TableContainer',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/datetimeUtils',
    "dojo/_base/declare"
], function ($, ConfirmDialog, TitlePane, Form, DeliveryPlanPreviewProductTable, PlaningForCheckDialogOrderTable,
             OrderDeliveryPlanCreatedDt,
             OrderDeliveryPlanCreatorNameTextBox,
             OrderDeliveryPlanSerialNumberTextBox,
             OrderDeliveryPlanRemarkTextArea,
             TextBox, TableContainer, orderHttpService, apiConfig, zh, request, array, datetimeUtils, declare) {

    return declare('admin/view-partial/main/order/widget/dialog/PlaningForCheckOrderDialog', [ConfirmDialog], {
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
        deliveryPlanPreviewProductTableData: [],
        planingForCheckDialogOrderTableData: [],
        action: apiConfig.admin.order.confirmCheckDeliveryPlanOrders,
        request: request,
        requestOptions: {method: 'POSTBODY'},
        title: '拣货数据复核汇总',
        isHorizontalLayout: true,
        style: "width: 50000px;height:50000px",
        content: '<h5 class="text-danger" style="text-align: center;"><strong>*请注意拣货的产品库存是否足够</strong></h5>',

        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            this.batchTitlePane = new TitlePane({
                title: '波次信息',

            });
            this.addChild(this.batchTitlePane);
            this.batchForm = new Form({name: 'orderDeliveryPlan'});
            this.batchTitlePane.addChild(this.batchForm);


            this.tableContainer = new TableContainer({labelWidth: 100, showLabel: true, cols: 1});
            this.batchForm.addChild(this.tableContainer);
            this.orderDeliveryPlanSerialNumberTextBox = new OrderDeliveryPlanSerialNumberTextBox({
                readOnly: true
            });
            this.orderDeliveryPlanCreatedDt = new OrderDeliveryPlanCreatedDt({
                readOnly: true
            });
            this.orderDeliveryPlanCreatorNameTextBox = new OrderDeliveryPlanCreatorNameTextBox({
                readOnly: true
            });
            this.orderDeliveryPlanRemarkTextArea = new OrderDeliveryPlanRemarkTextArea({});

            this.tableContainer.addChild(this.orderDeliveryPlanSerialNumberTextBox);
            this.tableContainer.addChild(this.orderDeliveryPlanCreatedDt);
            this.tableContainer.addChild(this.orderDeliveryPlanCreatorNameTextBox);
            this.tableContainer.addChild(this.orderDeliveryPlanRemarkTextArea);

            orderHttpService.buildOrderDeliveryPlan().success(function (orderDeliveryPlan) {
                me.batchForm.set('value', orderDeliveryPlan);
            });

            var deliveryPlanPreviewProductTable = new DeliveryPlanPreviewProductTable({
                style: 'margin-top:5px;',
                table_data: this.deliveryPlanPreviewProductTableData
            })
            this.deliveryPlanPreviewProductTable = deliveryPlanPreviewProductTable;
            this.addChild(deliveryPlanPreviewProductTable);

            var diffDoms = array.map($(this.domNode).children(), function (item) {
                return item;
            });
            var planingForCheckDialogOrderTable = new PlaningForCheckDialogOrderTable({
                style: 'margin-top:5px;',
                table_data: this.planingForCheckDialogOrderTableData,
                table_heightAutoFillOpt: {
                    diffHeight: 60,
                    parentDom: me.containerNode,
                    diffDoms: diffDoms
                },
            });
            this.planingForCheckDialogOrderTable = planingForCheckDialogOrderTable;
            this.addChild(planingForCheckDialogOrderTable);

        },

        show: function () {
            var me = this;
            var promise = this.inherited(arguments);
            promise.then(function () {
                me.deliveryPlanPreviewProductTable._table._plugin.columns.adjust();
                me.planingForCheckDialogOrderTable._table._plugin.columns.adjust();
                me.planingForCheckDialogOrderTable._table.resize();
            });
            return promise;

        }
    });
});