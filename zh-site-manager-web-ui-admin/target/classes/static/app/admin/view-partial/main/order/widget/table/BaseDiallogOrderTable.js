/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description 订单表格公共类
 * @file admin/view-partial/main/order/widget/table/BaseDiallogOrderTable
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
    return declare('admin/view-partial/main/order/widget/table/BaseDiallogOrderTable', [Table], {
        title: '订单信息',
        table_data: [],
        /**
         * 子类必须定义
         */
        table_columns: undefined,
        table_serverSide: false,
        table_isShowTableBordered: false,
        table_isSortEnabled: false,
        table_isShowPager: false,
        table_isShowProcessing:false,
        table_checkBoxColumnOptions: undefined,
        table_pageSizeMenu: undefined,//[10, 25, 50, 100, 200, 250, 500],
        table_length: 1000000
    });
});