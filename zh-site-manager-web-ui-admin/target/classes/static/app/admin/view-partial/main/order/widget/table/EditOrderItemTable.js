/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/table/EditOrderItemTable
 * @description 编辑订单物品时候显示的表格
 */
define([
    'admin/view-partial/main/order/widget/table/BaseDiallogOrderTable',
    'admin/services/enums/OrderItemPropertyEnum',
    'admin/util/request',
    'zh/core',
    'admin/util/tipUtils',
    "dojo/_base/declare"
], function (Table, OrderItemPropertyEnum, request, zh, tipUtils,
             declare) {
    return declare('admin/view-partial/main/order/widget/table/EditOrderItemTable', [Table], {
        title:'物品信息',
        tableTopBeforeItems:[

        ],
        table_columns: [
            OrderItemPropertyEnum.Name,
            OrderItemPropertyEnum.UnitName,
            OrderItemPropertyEnum.Count,
            OrderItemPropertyEnum.Code,
            OrderItemPropertyEnum.BarCode,

        ],
        table_checkBoxColumnOptions:true

    });
});