/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/PrintingSelectSenderDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'zh/widget/form/Form',
    'admin/view-partial/main/order/widget/form/value-widget/SenderSelect2',
    'admin/view-partial/main/order/widget/form/value-widget/edit/DeliverPrintWaybillTemplateIdSelect2',
    'zh/widget/text/TextBox',
    'admin/api/senderHttpService',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/datetimeUtils',
    'zh/util/stringUtils',
    "dojo/_base/declare",
    'dojo/_base/lang',
    'admin/util/bizTipUtils',
    'dojo/dom-form',

], function (ConfirmDialog, Form, SenderSelect2, DeliverPrintWaybillTemplateIdSelect2, TextBox,
             senderHttpService, orderHttpService, apiConfig, zh, request, array, datetimeUtils, stringUtils, declare, lang, bizTipUtils, domForm) {

    return declare('admin/view-partial/main/order/widget/dialog/PrintingSelectSenderDialog', [ConfirmDialog], {
        action: undefined,
        isAjax: false,
        request: request,
        title: '请设置打印信息',
        isHorizontalLayout: false,
        isShowDefaultOrEmptyAtFirst: true,
        deliverId: undefined,
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
        _isFirstSet: false,
        postCreate: function () {
            this.inherited(arguments);
            this.addItem((this.senderSelect2 = new SenderSelect2({
                width: 'style',
                style: {width: '200px'},
                labelStyle: {width: '100px'},
            })));
            var extraParam = undefined;
            if (this.deliverId) {
                extraParam = {
                    deliverId: this.deliverId
                }
            }
            this.deliverPrintWaybillTemplateIdSelect2 = new DeliverPrintWaybillTemplateIdSelect2({
                extraParam: extraParam
            });

            this.addItem(this.deliverPrintWaybillTemplateIdSelect2)
        },
        startup: function () {
            var me = this;
            this.inherited(arguments);
            if (this.isShowDefaultOrEmptyAtFirst && !this._isFirstSet) {
                this._isFirstSet = true;
                senderHttpService.findDefaultOrEmpty().success(function (res) {


                    me.senderSelect2.set('senderOption', res);
                });
            }
        },
        getSenderSelected: function () {
            return this.senderSelect2.get('value');
        },
        getSenderDataSelected: function () {
            return this.senderSelect2.get('valueData');
        },
        getDeliverPrintWaybillTemplateSelected: function () {
            return this.deliverPrintWaybillTemplateIdSelect2.get('valueData');
        }
    });
});