/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/widget/dialog/EditWaybillTemplateDialog
 */
define([
        'admin/widget/dialog/ConfirmDialog',
        'admin/view-partial/main/order/widget/form/value-widget/edit/DeliverPrintWaybillTemplateIdSelect2',
        'admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateOffsetLeftText',
        'admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateOffsetTopText',
        'admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateNameText',
        'admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateWidthText',
        'admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateHeightText',
        'zh/widget/text/HiddenTextBox',
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
        'admin/util/lodopUtils',
        'zh/util/stringUtils',
        'admin/util/dialogUtils',
        'admin/api/deliverPrintWaybillTemplateHttpService',
        'admin/util/tipUtils',
        'dojo/on',
    ], function (ConfirmDialog,
                 DeliverPrintWaybillTemplateIdSelect2,
                 TemplateOffsetLeftText,
                 TemplateOffsetTopText,
                 TemplateNameText,
                 TemplateWidthText,
                 TemplateHeightText,
                 HiddenTextBox,
                 TextBox, orderHttpService, logisticsHttpService, apiConfig, zh, request, array, datetimeUtils, declare, lang, bizTipUtils, ValidationException, create,
                 lodopUtils,
                 stringUtils, dialogUtils, deliverPrintWaybillTemplateHttpService, tipUtils, on) {

        return declare('admin/view-partial/main/waybill-template/widget/dialog/EditWaybillTemplateDialog', [ConfirmDialog], {
            data: undefined,
            action: undefined,
            isAjax: false,
            request: request,
            title: '编辑快递单模板',
            isHorizontalLayout: true,
            requestOptions: {method: 'POSTBODY'},
            style: "width: 700px; ",
            /**
             * 是否在隐藏之后,自动销毁窗体
             */
            isAutoDestroyOnHideAfter: false,

            onSuccess: function () {
                var me = this;
                var data = this.get('value');
                var parentWaybillTemplate = me.getWaybillTemplateData();
                lodopUtils.checkIsInstallAndPrintComponentReadyState();
                me._alertDialogCanClose = false;
                var alertDialog = dialogUtils.alert('正在打开模板设计器', function () {
                    return me._alertDialogCanClose
                });
                me.hide();
                lodopUtils.openWaybillTemplateDesigner({
                    parentWaybillTemplate: parentWaybillTemplate,
                    templateContent: data.templateContent,
                    templateWidth: data.width,
                    templateHeight: data.height,
                    templateName: data.name,
                    templateOffsetTop: data.offsetTop,
                    templateOffsetLeft: data.offsetLeft,
                    onCloseAfter: function (taskId, newTemplateValue) {
                        me._alertDialogCanClose = true;
                        dialogUtils.destroy(alertDialog);
                        data.templateContent = newTemplateValue;
                        dialogUtils.confirm('确认保存模板?', function (confirm) {
                            if (!confirm) return;
                            deliverPrintWaybillTemplateHttpService.edit({
                                data: data,
                                method: 'POSTBODY'
                            }).success(function (res) {
                                on.emit(me, 'SaveSuccess', res);
                            });
                        });
                    }
                });
            },
            onSaveSuccess: function () {

            },
            postCreate: function () {
                var me = this;
                this.inherited(arguments);

                this.addItem((this.deliverPrintWaybillTemplateIdSelect2 = new DeliverPrintWaybillTemplateIdSelect2({
                    label: '快递单父模板',
                    name: 'parentTemplateId',
                    colSm: 10,
                    onChange: function () {
                        var optionValue = this.get('value');
                        var readOnly = true;
                        if (zh.isEmptyObject(optionValue) || stringUtils.isEmpty(optionValue)) {
                            readOnly = true;
                        } else {
                            readOnly = false;
                            var optionData = me.getWaybillTemplateData();
                            me.templateNameText.set('value', optionData.templateName + '(复制)');
                            me.templateWidthText.set('value', optionData.width);
                            me.templateHeightText.set('value', optionData.height);
                            me.templateOffsetLeftText.set('value', optionData.offsetLeft);
                            me.templateOffsetTopText.set('value', optionData.offsetTop);
                            me.templateContentHidden.set('value', optionData.templateContent);
                        }
                        me.templateNameText.set('readOnly', readOnly);
                        me.templateWidthText.set('readOnly', readOnly);
                        me.templateHeightText.set('readOnly', readOnly);
                        me.templateOffsetLeftText.set('readOnly', readOnly);
                        me.templateOffsetTopText.set('readOnly', readOnly);
                    }
                })));

                this.addItem((this.templateNameText = new TemplateNameText({
                    colSm: 10,
                    readOnly: true
                })));
                this.addItem((this.templateOffsetLeftText = new TemplateOffsetLeftText({
                    colSm: 10,
                    readOnly: true
                })));
                this.addItem((this.templateOffsetTopText = new TemplateOffsetTopText({
                    colSm: 10,
                    readOnly: true
                })));
                this.addItem((this.templateWidthText = new TemplateWidthText({
                    colSm: 10,
                    readOnly: true
                })));
                this.addItem((this.templateHeightText = new TemplateHeightText({
                    colSm: 10,
                    readOnly: true
                })));
                this.addChild((this.idHidden = new HiddenTextBox({
                    name: 'id',
                })));
                this.addChild((this.templateContentHidden = new HiddenTextBox({
                    name: 'templateContent',
                })));
            },
            startup: function () {
                this.inherited(arguments);
                var me = this;
                if (me.data) {
                    me.set('value', me.data);
                    this.deliverPrintWaybillTemplateIdSelect2.set('disabled', true);
                }
            },
            getWaybillTemplateData: function () {
                if (this.deliverPrintWaybillTemplateIdSelect2) {
                    return this.deliverPrintWaybillTemplateIdSelect2.get('valueData').data;
                } else {
                    return null;
                }
            }
        });
    }
);