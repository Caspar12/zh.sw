/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/table/Table
 */
define([
    'zh/plugins/jquery/widget/table/datatables/Table',
    'admin/util/request',
    'zh/core',
    'admin/util/tipUtils',
    'admin/api/apiConfig',
    'admin/services/enums/SenderPropertyEnum',
    "dojo/_base/declare",
    'dojo/_base/lang',
], function (Table, request, zh, tipUtils,
             apiConfig, SenderPropertyEnum, declare, lang) {
    return declare('admin/view-partial/main/sender/widget/table/Table', [Table], {
        columns: [
            SenderPropertyEnum.Name,
            SenderPropertyEnum.CompanyName,
            SenderPropertyEnum.Address,
            SenderPropertyEnum.Contact,
            SenderPropertyEnum.DefaultFlagText,
        ],
        request: request,
        ajax: {
            url: apiConfig.admin.sender.list,
            method: 'GET',
        },
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
        pageSizeMenu: [10, 25, 50, 100, 200, 250, 500],
        postMixInProperties: function () {
            this.columns = lang.clone(this.columns);
            this.inherited(arguments);
        }
    });
});