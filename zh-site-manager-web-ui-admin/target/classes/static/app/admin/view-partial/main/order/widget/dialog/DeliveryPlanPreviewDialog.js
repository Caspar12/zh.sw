/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/DeliveryPlanPreviewDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'jquery',
    'zh/widget/button/Button',
    'admin/view-partial/main/order/widget/table/DeliveryPlanPreviewProductTable',
    'admin/view-partial/main/order/widget/table/DeliveryPlanPreviewOrderTable',
    'zh/widget/text/TextBox',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/datetimeUtils',
    'dijit/registry',
    'admin/util/lodopUtils',
    'zh/util/domUtils',
    'dojo/_base/lang',
    'zh/plugins/jquery/widget/table/datatables/util/tableUtils',
    'jquery/plugins/jqprint/jqprint',
    "dojo/_base/declare"
], function (ConfirmDialog, $, Button, DeliveryPlanPreviewProductTable, DeliveryPlanPreviewOrderTable, TextBox, orderHttpService,
             apiConfig, zh, request, array, datetimeUtils, registry, lodopUtils, domUtils, lang, tableUtils, jqprint, declare) {

    return declare('admin/view-partial/main/order/widget/dialog/DeliveryPlanPreviewDialog', [ConfirmDialog], {
        deliveryPlanPreviewProductTableData: [],
        deliveryPlanPreviewOrderTableData: [],
        action: apiConfig.admin.order.createDeliveryPlan,
        request: request,
        title: '发货计划预览',
        isHorizontalLayout: true,

        style: "width: 50000px;height:50000px",
        content: '<h5 class="text-danger" style="text-align: center;"><strong>*请注意拣货的产品库存是否足够</strong></h5>',
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            var deliveryPlanTextBox = this.deliveryPlanTextBox = new TextBox({
                label: '发货计划',
                value: datetimeUtils.format(new Date(), 'yyyyMMddHHmmss'),
                name: 'deliveryPlanName',
                readOnly: false,
            });
            this.addItem(deliveryPlanTextBox);
            var deliveryPlanPreviewProductTable = new DeliveryPlanPreviewProductTable({
                table_data: this.deliveryPlanPreviewProductTableData
            })
            this.deliveryPlanPreviewProductTable = deliveryPlanPreviewProductTable;
            this.addChild(deliveryPlanPreviewProductTable);

            var deliveryPlanPreviewOrderTable = new DeliveryPlanPreviewOrderTable({
                style: 'margin-top:10px;',
                table_data: this.deliveryPlanPreviewOrderTableData
            });
            this.deliveryPlanPreviewOrderTable = deliveryPlanPreviewOrderTable;
            this.addChild(deliveryPlanPreviewOrderTable);

            var btnPrint = new Button({
                label: '打印',
                onClick: function () {
                    var deliveryPlanName = me.deliveryPlanTextBox.get('value');
                    lodopUtils.openPreviewForTableHtml({
                        tablePagers: [
                            {
                                title: '发货计划-' + deliveryPlanName,
                                subTitle: '拣货订单产品汇总',
                                tableColumns: me.deliveryPlanPreviewProductTable.getTable().columns,
                                tableData: me.deliveryPlanPreviewProductTableData,
                            },
                            {
                                title: '发货计划-' + deliveryPlanName,
                                subTitle: '拣货订单',
                                tableColumns: me.deliveryPlanPreviewOrderTable.getTable().columns,
                                tableData: me.deliveryPlanPreviewOrderTableData,
                            }
                        ],
                    });

                    return;
                    var jqPrintContainer = $('<div style="padding: 30px;"></div>');
                    var deliveryPlanPreviewProductBaseTable = tableUtils.convertToNewTableNode(me.deliveryPlanPreviewProductTable.getTable());
                    var deliveryPlanPreviewOrderBaseTable = tableUtils.convertToNewTableNode(me.deliveryPlanPreviewOrderTable.getTable());
                    jqPrintContainer.html('发货计划:' + me.deliveryPlanTextBox.get('value'));
                    jqPrintContainer.append(deliveryPlanPreviewProductBaseTable);
                    jqPrintContainer.append(deliveryPlanPreviewOrderBaseTable);
                    var printHtml = domUtils.outerHTML(jqPrintContainer);
                    console.trace(printHtml);
                    lodopUtils.openPreviewHtmlForCurrentPageStyle({
                        printHtml: printHtml
                    });
                    return;

                }
            });
            var btns = registry.findWidgets(this.actionBarNode);
            btnPrint.placeAt(btns[1], 'before');
        },
        onHideAfter: function () {

        },
        show: function () {
            var me = this;
            var promise = this.inherited(arguments);
            promise.then(function () {
                me.deliveryPlanPreviewProductTable._table._plugin.columns.adjust();
                me.deliveryPlanPreviewOrderTable._table._plugin.columns.adjust();
            });
            return promise;

        }
    });
});