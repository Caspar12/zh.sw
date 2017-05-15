/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/PackageTypeSelect2
 */
define([
    'zh/plugins/jquery/widget/form/select2/Select',
    'admin/services/enums/OrderPropertyEnum',
    'admin/api/cache/orderHttpService/getAllPackageType',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',

    'dojo/_base/array',
    "dojo/_base/declare",
    'dojo/_base/array',
    'dojo/_base/lang',
], function (Select2, OrderPropertyEnum, getAllPackageType, orderHttpService, apiConfig, zh, request, array, declare, array, lang) {
    var options = array.map(getAllPackageType, function (item) {
        return {value: item.id, label: item.name};
    });
    //options.splice(0, 0, {value: '', label: '全部'});
    return declare('admin/view-partial/main/order/widget/form/value-widget/PackageTypeSelect2', [Select2], {
        label:OrderPropertyEnum.PackageType.text,
        name: OrderPropertyEnum.PackageType.id,
        placeHolder: '全部',
        isShowSearchBar: false,
        options: options
        // resultTotalCountFieldName: '',
        // resultDataFieldName: '',
        // request: request,
        // url: apiConfig.admin.order.getAllPackageType,
        // allowClear: true,

        // onFormatResults: function (results) {
        //     return array.map(results, function (item) {
        //         return {value: item.id.toString(), label: item.name};
        //     });
        // },
    });
});