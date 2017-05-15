/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/dialog/EditSenderDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'admin/view-partial/main/sender/widget/form/value-widget/edit/AddressText',
    'admin/view-partial/main/sender/widget/form/value-widget/edit/CompanyNameText',
    'admin/view-partial/main/sender/widget/form/value-widget/edit/ContactText',
    'admin/view-partial/main/sender/widget/form/value-widget/edit/IdHidden',
    'admin/view-partial/main/sender/widget/form/value-widget/edit/NameText',
    'admin/view-partial/main/sender/widget/form/value-widget/edit/DefaultFlagSelect2',

    'zh/widget/text/TextBox',
    'admin/api/orderHttpService',
    'admin/api/logisticsHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/datetimeUtils',
    "dojo/_base/declare",
    'dojo/_base/lang',
    'admin/util/bizTipUtils',
    'zh/app/exceptions/ValidationException',
    'dojo/errors/create',
], function (ConfirmDialog,
             AddressText,
             CompanyNameText,
             ContactText,
             IdHidden,
             NameText,
             DefaultFlagSelect2,
             TextBox, orderHttpService, logisticsHttpService, apiConfig, zh, request, array, datetimeUtils, declare, lang, bizTipUtils, ValidationException, create) {

    return declare('admin/view-partial/main/sender/widget/dialog/EditSenderDialog', [ConfirmDialog], {
        data: undefined,
        action: apiConfig.admin.sender.edit,
        request: request,
        title: '编辑寄件信息',
        isHorizontalLayout: true,
        requestOptions: {method: 'POSTBODY'},
        style: "width: 700px; ",
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
        containerTable_labelWidth: 120,
        postCreate: function () {
            var me = this;
            this.inherited(arguments);

            this.addItem((this.nameText = new NameText({
                colSm: 10

            })));
            this.addItem((this.companyNameText = new CompanyNameText({
                colSm: 10

            })));
            this.addItem((this.contactText = new ContactText({
                colSm: 10

            })));
            this.addItem((this.addressText = new AddressText({

                colSm: 10
            })));
            this.addItem((this.defaultFlagSelect2 = new DefaultFlagSelect2({
                colSm: 10,
                width: 'off',
            })));

            this.addChild((this.idHidden = new IdHidden({})));
        },
        processRequestAjaxSetParams: function (params) {
            return params;
        },
        startup: function () {
            this.inherited(arguments);
            var me = this;
            if (me.data) {
                me.set('value', me.data);
            }
        },
    });
});