/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/SenderSelect2
 */
define([
    'zh/plugins/jquery/widget/form/select2/Select',
    'admin/services/enums/SenderPropertyEnum',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/stringUtils',
    "dojo/_base/lang",
    "dojo/_base/declare"
], function (Select2, SenderPropertyEnum, apiConfig, zh, request, array, stringUtils, lang, declare) {

    return declare('admin/view-partial/main/order/widget/form/value-widget/SenderSelect2', [Select2], {
        label: SenderPropertyEnum.Name.text,
        name: 'senderId',
        resultTotalCountFieldName: '',
        resultDataFieldName: '',
        request: request,
        url: apiConfig.admin.sender.listPrintingWaybillSenderPage,
        allowClear: true,
        preventCache: true,
        placeHolder: '请选择',
        isShowSearchBar: true,
        onFormatResults: function (results) {
            this.optionDatas = results.data;
            var me = this;
            return array.map(this.optionDatas, function (item) {
                var sender = me.formatSender(item);
                return {value: item.id.toString(), label: item.name, data: item};
            });
        },
        _setSenderOptionAttr: function (sender) {
            var me = this;
            var cloneSender = lang.clone(sender);
            cloneSender = me.formatSender(cloneSender);
            me.set('value', {
                data: sender,
                value: sender.id,
                label: cloneSender.name
            });
        },
        formatSender: function (sender) {

            var name = sender.name;
            if (!name) {
                if (stringUtils.isEqualsIgnoreCase(sender.id, zh.emptyUUID())) {
                    name = '留空';
                } else {
                    if (sender.companyName)
                        name = '【发件公司】:' + sender.companyName;
                    else if (sender.address)
                        name = '【发件地址】:' + sender.address;
                    else if (sender.contact)
                        name = '【联系方式】:' + sender.contact
                    else
                        name = '留空';
                }
            }
            sender.name = name;
            return sender;
        }
    });
});