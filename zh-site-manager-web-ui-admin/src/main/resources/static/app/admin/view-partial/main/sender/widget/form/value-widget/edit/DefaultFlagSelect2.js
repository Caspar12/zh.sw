/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/form/value-widget/edit/DefaultFlagSelect2
 */
define([
    'zh/plugins/jquery/widget/form/select2/Select',
    "dojo/_base/declare"
], function (Select2, declare) {
    var options = [
        {value: 'true', label: '是'},
        {value: 'false', label: '否', selected: true},
    ];
    // options.splice(0, 0, {value: '', label: '全部'});
    return declare('admin/view-partial/main/sender/widget/form/value-widget/edit/DefaultFlagSelect2', [Select2], {
        label: '默认打印寄件信息',
        name: 'defaultFlag',
        placeHolder: undefined,
        options: options,
        isShowSearchBar: false,
        // resultTotalCountFieldName: '',
        // resultDataFieldName: '',
        // request: request,
        // url: apiConfig.admin.deliverPrintWaybillTemplate.findByCurrentWorkSpaceOrSystem,
        // allowClear: true,
        // isShowSearchBar: true,
        // onFormatResults: function (results) {
        //     return array.map(results, function (item) {
        //         return {value: item.id.toString(), label: item.name};
        //     });
        // },
    });
});