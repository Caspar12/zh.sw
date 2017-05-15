/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/table/Table
 */
define([
    'zh/plugins/jquery/widget/table/datatables/Table',
    'admin/services/enums/OrderPropertyEnum',
    'admin/services/enums/OrderStatusEnum',
    'admin/view-partial/main/order/widget/enums/OrderListTableColumnEnum',
    'admin/util/request',
    'zh/core',
    'admin/util/tipUtils',
    "dojo/_base/lang",
    "dojo/_base/declare"
], function (Table, OrderPropertyEnum, OrderStatusEnum, OrderListTableColumnEnum, request, zh, tipUtils, lang,
             declare) {
    return declare('admin/view-partial/main/order/widget/table/Table', [Table], {
        columnEnums: [],
        request: request,
        ajax: {
            url: '/api/admin/order/list',
            method: 'GET',
        },
        isAutoWidth: false,
        onFailure: function (res) {
            if (res && res.message) {
                tipUtils.warning(res.message);
            } else {
                tipUtils.warning('服务器异常,请稍候重试');
            }
        },
        isShowTableBordered: false,
        isSortEnabled: false,
        isShowPager: true,
        isShowProcessing: false,
        pageSizeMenu: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
        postMixInProperties: function () {
            var results = lang.clone(this.columnEnums);
            this.columns = results;
            this.inherited(arguments);

        }
    });
});