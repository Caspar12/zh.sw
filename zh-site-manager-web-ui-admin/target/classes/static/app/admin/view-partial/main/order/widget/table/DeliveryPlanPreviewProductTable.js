/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/table/DeliveryPlanPreviewProductTable
 */
define([
    'zh/plugins/jquery/widget/table/datatables/TitleTable',
    'admin/services/enums/OrderPropertyEnum',
    'admin/services/enums/OrderStatusEnum',
    'admin/view-partial/main/order/widget/enums/OrderListTableColumnEnum',
    'admin/util/request',
    'zh/core',
    'admin/util/tipUtils',
    "dojo/_base/declare"
], function (Table, OrderPropertyEnum, OrderStatusEnum, OrderListTableColumnEnum, request, zh, tipUtils,
             declare) {
    return declare('admin/view-partial/main/order/widget/table/DeliveryPlanPreviewProductTable', [Table], {
        title: '订单产品汇总信息',

        table_height: 250,
        table_data: [],
        table_columns: [
            {data: 'code', title: '产品编码', orderable: true,width:'150px'},
            {data: 'name', title: '产品名称', orderable: true,width:'150px'},
            {data: 'barCode', title: '产品条码', orderable: true,width:'150px'},
            {data: 'unitName', title: '产品单位', orderable: true,width:'150px'},
            {data: 'totalCount', title: '汇总数量', orderable: true,width:'150px'}
        ],
        table_serverSide: false,
        table_isShowTableBordered: false,
        table_isSortEnabled: true,
        table_isShowPager: false,
        table_isShowProcessing: false,
        table_checkBoxColumnOptions: undefined,
        table_pageSizeMenu: undefined,//[10, 25, 50, 100, 200, 250, 500],
        table_length: 1000000
    });
});