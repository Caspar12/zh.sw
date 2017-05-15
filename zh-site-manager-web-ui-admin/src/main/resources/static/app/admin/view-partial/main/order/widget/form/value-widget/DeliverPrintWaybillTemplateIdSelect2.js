/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/DeliverPrintWaybillTemplateIdSelect2
 */
define([
    'zh/plugins/jquery/widget/form/select2/Select',
    'admin/services/enums/OrderPropertyEnum',
    'admin/api/cache/deliverPrintWaybillTemplateHttpService/findByCurrentWorkSpaceOrSystem',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    "dojo/_base/declare"
], function (Select2, OrderPropertyEnum, findByCurrentWorkSpaceOrSystem, orderHttpService, apiConfig, zh, request, array, declare) {
    // var options = array.map(findByCurrentWorkSpaceOrSystem, function (item) {
    //     return {value: item.id, label: item.templateName};
    // });
    // options.splice(0, 0, {value: '', label: '全部'});
    return declare('admin/view-partial/main/order/widget/form/value-widget/DeliverPrintWaybillTemplateIdSelect2', [Select2], {
        label: OrderPropertyEnum.DeliverPrintWaybillTemplateId.text,
        name: OrderPropertyEnum.DeliverPrintWaybillTemplateId.id,
        placeHolder: '全部',
        //  options: options,
        isShowSearchBar: true,
        resultTotalCountFieldName: 'totalItemCount',
        resultDataFieldName: 'data',
        request: request,
        url: apiConfig.admin.deliverPrintWaybillTemplate.findByCurrentWorkSpaceOrSystem,
        allowClear: true,
        isShowSearchBar: true,
        onFormatResults: function (results) {
            return array.map(results, function (item) {
                return {value: item.id.toString(), label: item.templateName, data: item};
            });
        },
    });
});