/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/widget/table/Table
 */
define([
    'zh/plugins/jquery/widget/table/datatables/Table',
    'admin/util/request',
    'zh/core',
    'admin/util/tipUtils',
    'admin/api/apiConfig',
    'admin/services/enums/DeliverPrintWaybillTemplatePropertyEnum',
    "dojo/_base/declare",
    'dojo/_base/lang',
], function (Table, request, zh, tipUtils,
             apiConfig, DeliverPrintWaybillTemplatePropertyEnum, declare, lang) {
    return declare('admin/view-partial/main/waybill-template/widget/table/Table', [Table], {
        columns: [
            DeliverPrintWaybillTemplatePropertyEnum.DeliverName,
            DeliverPrintWaybillTemplatePropertyEnum.TemplateName,
            DeliverPrintWaybillTemplatePropertyEnum.Width,
            DeliverPrintWaybillTemplatePropertyEnum.Height,
            DeliverPrintWaybillTemplatePropertyEnum.OffsetLeft,
            DeliverPrintWaybillTemplatePropertyEnum.OffsetTop,
        ],
        request: request,
        ajax: {
            url: apiConfig.admin.deliverPrintWaybillTemplate.list,
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