/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/TransporterIdSelect2
 */
define([
    'zh/plugins/jquery/widget/form/select2/Select',
    'admin/services/enums/OrderPropertyEnum',
    'admin/api/cache/logisticsHttpService/getAllDeliver',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',

    'dojo/_base/array',
    "dojo/_base/declare"
], function (Select2, OrderPropertyEnum, getAllDeliver, orderHttpService, apiConfig, zh, request, array, declare) {
    var options = array.map(getAllDeliver, function (item) {
        return {value: item.id, label: item.name};
    });
    // options.splice(0, 0, {value: '', label: '全部'});
    return declare('admin/view-partial/main/order/widget/form/value-widget/TransporterIdSelect2', [Select2], {
        label: OrderPropertyEnum.DeliverId.text,
        name: OrderPropertyEnum.DeliverId.transporterIdSelect2Id,
        placeHolder: '全部',
        options: options,
        // resultTotalCountFieldName: '',
        // resultDataFieldName: '',
        // request: request,
        // url: apiConfig.admin.logistics.getAllDeliver,
        // allowClear: true,

        // isShowSearchBar: false,
        // onFormatResults: function (results) {
        //     return array.map(results, function (item) {
        //         return {value: item.id.toString(), label: item.name};
        //     });
        // },
    });
});