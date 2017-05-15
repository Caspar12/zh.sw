/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/table/PlaningForCheckDialogOrderTable
 */
define([
    'admin/view-partial/main/order/widget/table/BaseDiallogOrderTable',
    'admin/services/enums/OrderPropertyEnum',
    'admin/services/enums/OrderStatusEnum',
    'admin/view-partial/main/order/widget/enums/OrderListTableColumnEnum',
    'admin/util/request',
    'zh/core',
    'admin/util/tipUtils',
    "dojo/_base/declare"
], function (Table, OrderPropertyEnum, OrderStatusEnum, OrderListTableColumnEnum, request, zh, tipUtils,
             declare) {
    return declare('admin/view-partial/main/order/widget/table/DeliveryPlanPreviewOrderTable', [Table], {

        table_columns: OrderListTableColumnEnum.PlaningForCheck.columns,

    });
});