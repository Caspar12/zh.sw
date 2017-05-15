/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/toolbar/Toolbar
 */
define([
    // 'zh/widget/_base/_WidgetBase',
    'admin/widget/Toolbar',
    //  'zh/widget/Toolbar',
    'zh/widget/_base/_Container',
    'admin/view-partial/main/order/widget/dialog/SetDeliverDialog',
    'admin/view-partial/main/order/widget/dialog/SetDeliverPrintWaybillTemplateDialog',
    'admin/view-partial/main/order/widget/dialog/SetPackageTypeDialog',
    'admin/view-partial/main/order/widget/dialog/DeliveryPlanPreviewDialog',
    'admin/view-partial/main/order/widget/dialog/PlaningForCheckOrderDialog',
    'admin/view-partial/main/order/widget/dialog/InputWaybillDialog',
    'admin/view-partial/main/order/widget/dialog/ResetDeliverPrintWaybillTemplateDialog',
    'admin/view-partial/main/order/widget/dialog/ResetPackageTypeDialog',
    'admin/view-partial/main/order/widget/dialog/EditOrderDialog',
    'admin/view-partial/main/order/widget/dialog/PrintingSelectSenderDialog',
    'admin/services/biz/orders/ordersService',

    'admin/api/deliverPrintWaybillTemplateHttpService',
    "dijit/form/Button",
    'admin/services/enums/OrderStatusEnum',
    'admin/view-partial/main/order/widget/enums/OrderListToolbarButtonsEnum',
    'zh/app/exceptions/ValidationException',
    'zh/util/dojoUtils',
    'zh/util/log',
    'zh/util/enumUtil',
    'admin/util/bizTipUtils',
    'zh/core',
    'dojo/_base/array',
    'dojo/on',
    'dojo/_base/lang',
    'admin/api/orderHttpService',
    'admin/util/tipUtils',
    'admin/util/dialogUtils',
    'dojo/string',
    "dojo/_base/declare",
    'admin/api/apiConfig',
    'admin/util/lodopUtils',
    'zh/util/linq',
], function (Toolbar, _Container, SetDeliverDialog, SetDeliverPrintWaybillTemplateDialog, SetPackageTypeDialog, DeliveryPlanPreviewDialog, PlaningForCheckOrderDialog, InputWaybillDialog,
             ResetDeliverDialog, ResetPackageTypeDialog, EditOrderDialog, PrintingSelectSenderDialog,
             ordersService, deliverPrintWaybillTemplateHttpService,
             Button, OrderStatusEnum, OrderListToolbarButtonsEnum, ValidationException, dojoUtils, log, enumUtil, bizTipUtils, zh, array, on, lang,
             orderHttpService, tipUtils, dialogUtils, dojoStringUtils, declare, apiConfig, lodopUtils, linq) {
    return declare('admin/view-partial/main/order/widget/toolbar/Toolbar', [Toolbar, _Container], {
        class: 'single',
        buttonEnums: [],
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
            var getOnClick = function (enumValue) {
                return function () {
                    bizTipUtils.execCatchValidationException(function () {
                        on.emit(me, enumValue.onClickName, {eventSrc: enumValue});
                    });
                }
            };
            for (var proName in this.buttonEnums) {
                var enumValue = this.buttonEnums[proName];
                var button = this[enumValue.id] = new Button({
                    label: enumValue.text,
                    showLabel: true,
                    onClick: getOnClick(enumValue)
                });
                this.addChild(button);
            }
        },
        destroy: function () {
            this.inherited(arguments);
        },
        startup: function () {
            var me = this;
            me.inherited(arguments);
        },
        /**
         * 抽象方法，需要调用方实现
         * @return {Array}
         */
        getDatas: function () {
            log.warn('请实现getDatas');
        },
        checkEmptyData: function (pData) {
            var datas = pData || this.getDatas();
            if (zh.isEmptyArray(datas)) {
                var ex = new ValidationException({
                    message: '请选择至少一条记录'
                });
                throw ex;
            }
            return datas;
        },
        checkOnlyOneData: function () {
            var datas = this.checkEmptyData();
            if (datas.length != 1) {
                throw new ValidationException({
                    message: '只能选择一条记录'
                });
            }
            return datas[0];
        },
        getOnlyOneData: function () {
            var datas = this.checkOnlyOneData();
            return datas[0];
        },
        checkNotEmptyMutliData: function (pData) {
            var datas = this.checkEmptyData(pData);
            return datas;
        },
        checkNotEmptyMutliDataReturnIds: function (pData) {
            var datas = this.checkEmptyData(pData);
            var ids = array.map(datas, function (data) {
                return data.id;
            });
            return ids;
        },
        onBtnDeleteClick: function (opt) {
            var me = this;
            var ids = this.checkNotEmptyMutliDataReturnIds();
            dialogUtils.confirm(
                dojoStringUtils.substitute('删除当前选择的【${count}】项数据?', {count: ids.length}),
                function (isConfirm) {
                    if (!isConfirm) return;
                    orderHttpService.delete({data: {ids: ids}}).success(function () {
                        tipUtils.success('删除成功');
                        opt.data = arguments;
                        on.emit(me, 'ClickComplete', opt)
                    });
                }
            );
        },
        onClickComplete: function (opt) {
            var me = this;
            on.emit(me, opt.eventSrc.onClickName + 'Callback', arguments);
        },
        /**
         * 创建发货计划
         */
        onBtnCreateDeliveryPlanClick: function (opt) {
            var me = this;
            var orders = this.checkNotEmptyMutliData();
            var ids = this.checkNotEmptyMutliDataReturnIds();
            var statisOrdersForOrderItemInfo = ordersService.statisOrdersForOrderItemInfoByOrders(orders);
            this.deliveryPlanPreviewDialog = new DeliveryPlanPreviewDialog({
                extraParams: {orderIds: ids},
                deliveryPlanPreviewProductTableData: statisOrdersForOrderItemInfo,
                deliveryPlanPreviewOrderTableData: orders,
                onSuccess: function () {
                    tipUtils.success('保存成功');
                    me.deliveryPlanPreviewDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
            this.deliveryPlanPreviewDialog.show();
        },
        /**
         * 选择快递
         */
        onBtnSetDeliverClick: function (opt) {
            var me = this;
            var ids = this.checkNotEmptyMutliDataReturnIds();
            this.setDeliverDialog = new SetDeliverDialog({
                onSuccess: function () {
                    tipUtils.success('保存成功');
                    me.setDeliverDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
            this.addExtraWidget(this.setDeliverDialog);
            this.setDeliverDialog.set('extraParams', {orderIds: ids});
            this.setDeliverDialog.show();
        },

        /**
         * 选择包裹类型
         * @param opt
         */
        onBtnSetPackageTypeClick: function (opt) {
            var me = this;
            var ids = this.checkNotEmptyMutliDataReturnIds();
            this.setPackageTypeDialog = new SetPackageTypeDialog({
                onSuccess: function () {
                    tipUtils.success('保存成功');
                    me.setPackageTypeDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
            this.addExtraWidget(this.setPackageTypeDialog);
            this.setPackageTypeDialog.set('extraParams', {orderIds: ids});
            this.setPackageTypeDialog.show();

        },
        /**
         * 生成波次
         */
        onBtnSetDeliveryPlanCheckPassClick: function (opt) {
            var me = this;
            var orders = this.checkNotEmptyMutliData();
            var ids = this.checkNotEmptyMutliDataReturnIds();
            var statisOrdersForOrderItemInfo = ordersService.statisOrdersForOrderItemInfoByOrders(orders);
            this.planingForCheckOrderDialog = new PlaningForCheckOrderDialog({
                extraParams: {orderIds: ids},
                deliveryPlanPreviewProductTableData: statisOrdersForOrderItemInfo,
                planingForCheckDialogOrderTableData: orders,
                onSuccess: function () {
                    tipUtils.success('保存成功');
                    me.planingForCheckOrderDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
            this.planingForCheckOrderDialog.show();
        },
        /**
         * 打印快递单->修改订单->编辑订单
         */
        onBtnEditWaitPrintOrderClick: function (opt) {
            var me = this;
            var order = this.checkOnlyOneData();
            me.editWaitPrintOrderDialog = new EditOrderDialog({
                orderData: order,
                action: apiConfig.admin.order.editWaitPrintOrder,
                onSuccess: function () {
                    tipUtils.success('保存成功，并移到【打印快递单】选项卡中');
                    me.editWaitPrintOrderDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                },
                onInitUIFinished: function () {
                    this.tpOrderIdText.set('readOnly', true);
                }
            });
            me.editWaitPrintOrderDialog.show();

        },
        /**
         * 修改订单
         */
        onBtnEditOrderClick: function (opt) {
            var me = this;
            var order = this.checkOnlyOneData();
            me.editWaitPrintOrderDialog = new EditOrderDialog({
                orderData: order,
                action: apiConfig.admin.order.editOrder,
                onSuccess: function () {
                    tipUtils.success('保存成功');
                    me.editWaitPrintOrderDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                },
                onInitUIFinished: function () {
                    this.tpOrderIdText.set('readOnly', true);
                }
            });
            me.editWaitPrintOrderDialog.show();
        },
        /**
         * 复核->编辑订单
         */
        onBtnEditDeliveryPlanCheckingOrderClick: function (opt) {
            var me = this;
            var order = this.checkOnlyOneData();
            this.editDeliveryPlanCheckingOrderDialog = new EditOrderDialog({

                orderData: order,
                action: apiConfig.admin.order.editDeliveryPlanCheckingOrder,
                onSuccess: function () {
                    tipUtils.success('保存成功');
                    me.editDeliveryPlanCheckingOrderDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                },
                onInitUIFinished: function () {
                    this.tpOrderIdText.set('readOnly', true);
                }
            });
            this.editDeliveryPlanCheckingOrderDialog.show();
        },
        /**
         * 打开【待输入快递单号】窗口
         * @param opt
         */
        showInputWaybillDialog: function (opt) {
            var me = this;
            opt = lang.mixin({
                orders: undefined,
                successAfter: undefined,
                isSendPrintCmd: false
            }, opt);
            if (opt.orders) {
                opt.orders = this.checkNotEmptyMutliData(opt.orders);
            } else {
                opt.orders = this.checkNotEmptyMutliData();
            }


            this.InputWaybillDialog = new InputWaybillDialog({
                inputWaybillTableData: opt.orders,
                onSuccess: function () {
                    tipUtils.success('保存成功');
                    me.InputWaybillDialog.destroy();
                    me.showConfirmInputWaybillDialog({
                        orders: opt.orders,
                        successAfter: opt.successAfter
                    });
                },
                onHide: function () {
                    if (opt.isSendPrintCmd) {
                        opt.successAfter && opt.successAfter();
                    }
                }
            });
            this.InputWaybillDialog.show();
        },
        /**
         * 提交到【扫描复核】
         */
        onBtnConfirmInputTrackingNumberClick: function (opt) {
            var me = this;
            this.showConfirmInputWaybillDialog({
                successAfter: function () {
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
        },
        /**
         * 打开确认已输入快递单号窗口
         */
        showConfirmInputWaybillDialog: function (opt) {
            var me = this;
            opt = lang.mixin({
                orders: undefined,
                successAfter: undefined
            }, opt);
            if (opt.orders) {
                opt.orders = this.checkNotEmptyMutliData(opt.orders);
            } else {
                opt.orders = this.checkNotEmptyMutliData();
            }
            var msg = dojoStringUtils
                .substitute('是否将已输入快递单号的${count}条订单提交到下一步【待打包复核】进行处理?', {count: opt.orders.length});
            dialogUtils.confirm(msg,
                function (isConfirm) {
                    if (!isConfirm) {
                        opt.successAfter && opt.successAfter();
                    }
                    else {
                        orderHttpService.confirmInputWaybill({data: {orderIds: me.checkNotEmptyMutliDataReturnIds(opt.orders)}}).success(function () {
                            tipUtils.success('保存成功');
                            opt.successAfter && opt.successAfter();
                        });
                    }
                }
            );
        },
        showConfirmPrintedWaybillDialog: function (opt) {
            opt = lang.mixin({
                isSendPrintCmd: true,
                orders: undefined,
                successAfter: undefined,
            }, opt);
            if (opt.orders) {
                opt.orders = this.checkNotEmptyMutliData(opt.orders);
            } else {
                opt.orders = this.checkNotEmptyMutliData();
            }
            var me = this;
            var msg = '';
            if (opt.isSendPrintCmd) {
                msg = dojoStringUtils.substitute('已发送打印命令,是否将当前正在打印的${count}条订单提交到下一步【输入快递单号】进行处理?', {count: opt.orders.length});
            }
            else {
                msg = dojoStringUtils.substitute('是否将当前选择的${count}条订单提交到下一步【输入快递单号】进行处理?', {count: opt.orders.length});
            }
            dialogUtils.confirm(msg,
                function (isConfirm) {
                    if (!isConfirm) {
                        //  opt.isSendPrintCmd && opt.successAfter && opt.successAfter();
                    } else {
                        orderHttpService.confirmPrintWaybill({
                            method: 'post',
                            data: {orderIds: me.checkNotEmptyMutliDataReturnIds(opt.orders)}
                        }).success(function () {
                            me.showInputWaybillDialog({
                                orders: opt.orders,
                                successAfter: opt.successAfter,
                                isSendPrintCmd: opt.isSendPrintCmd
                            });
                        });
                    }
                }
            );
        },
        checkNotEmptyAndOnlyOneDeliverTemplateTypeMutliData: function (data) {
            var orders = this.checkNotEmptyMutliData(data);

        },
        checkNotEmptyDeliveryId: function (orders) {
            linq.From(orders).ForEach(function (item) {
                if (zh.isEmptyObject(item.deliverId)) {
                    var mes = lang.replace('【{tpOrderId}】订单请选择准备打印的快递公司', item);
                    throw new ValidationException({
                        message: mes
                    });
                }
            });
        },
        _checkOneBatchPrintNotHasMutliDeliverId: function (orders) {
            var groups = linq.From(orders).GroupBy('$.deliverId').ToArray();
            if (groups.length > 1) {
                var groupNames = array.map(groups, function (group) {
                    var firstItem = group.source[0];
                    return firstItem ? firstItem.deliverName : '';
                });
                var msg = lang.replace('同一批次打印的快递单类型,不能有不同的快递单类型【{deliverName}】',
                    {deliverName: groupNames.join(',')}
                );
                throw new ValidationException({
                    message: msg
                });
            }
        },
        /**
         * 打印快递单预览
         */
        onBtnPrintPreviewWaybillClick: function (opt) {
            this._printOrPreviewWaybill(opt, false);
        },
        /**
         * 打印快递单
         */
        onBtnPrintWaybillClick: function (opt) {
            this._printOrPreviewWaybill(opt, true);
        },

        _printOrPreviewWaybill: function (opt, isPrint) {
            var me = this;
            lodopUtils.checkIsInstallAndPrintComponentReadyState();
            var orders = this.checkNotEmptyMutliData();
            if (orders.length > 50) {
                throw  new ValidationException({
                    message: lang.replace('打印快递{preview}单数量不能大于50', {preview: isPrint ? '' : '预览'})
                });
            }

            this.checkNotEmptyDeliveryId(orders);
            this._checkOneBatchPrintNotHasMutliDeliverId(orders);
            this.printingSelectSenderDialog = new PrintingSelectSenderDialog({
                deliverId: orders[0].deliverId,
                onExecute: function () {
                    var optionData = me.printingSelectSenderDialog.getSenderDataSelected();

                    if (!optionData || !optionData.data) {
                        throw  new ValidationException({
                            message: '请选择发件人信息'
                        });
                    }
                    var sender = optionData.data;
                    var deliverPrintWaybillTemplateSelectedOptionData = me.printingSelectSenderDialog.getDeliverPrintWaybillTemplateSelected();

                    if (!deliverPrintWaybillTemplateSelectedOptionData || !deliverPrintWaybillTemplateSelectedOptionData.data) {
                        throw  new ValidationException({
                            message: '请选择打印模板'
                        });
                    }
                    var deliverPrintWaybillTemplate = deliverPrintWaybillTemplateSelectedOptionData.data;
                    var waybillTemplate = deliverPrintWaybillTemplate;
                    me.printingSelectSenderDialog.destroy();
                    me.previewUnderlayDialog = dialogUtils.alert(
                        '请在处理打印' + (isPrint ? '' : '预览') + '中...',
                        function () {
                            return false;
                        });
                    var widthStringMM = lodopUtils.convertIntMMToStringMM(waybillTemplate.width);
                    var heightStringMM = lodopUtils.convertIntMMToStringMM(waybillTemplate.height);
                    var templateName = lang.replace('{name} ({width}*{height})', {
                        name: waybillTemplate.templateName,
                        width: widthStringMM,
                        height: heightStringMM,
                    });
                    var printPageOrOpenPreviewPageForOrdersOpt = {
                        sender: sender,
                        templateContent: waybillTemplate.templateContent,
                        templateData: orders,
                        templateWidth: waybillTemplate.width,
                        templateHeight: waybillTemplate.height,
                        templateName: templateName,
                        waybillTemplate: waybillTemplate,
                        onCloseAfter: function (taskId, value) {
                            if ((isPrint && value ) ||
                                (!isPrint && !isNaN(value) && Number(value) > 0)
                            ) {
                                me.showConfirmPrintedWaybillDialog({
                                    orders: orders,
                                    isSendPrintCmd: true,
                                    successAfter: function () {
                                        opt.data = orders;
                                        on.emit(me, 'ClickComplete', opt)
                                    }
                                });
                            }
                            me.previewUnderlayDialog && dialogUtils.destroy(me.previewUnderlayDialog);
                        }
                    };
                    lodopUtils.printPageOrOpenPreviewPageForOrders(printPageOrOpenPreviewPageForOrdersOpt, isPrint);
                }
            });
            this.printingSelectSenderDialog.show();
        },
        /**
         * 确认已打印快递单
         * @param opt
         */
        onBtnConfirmPrintedClick: function (opt) {
            var me = this;
            this.showConfirmPrintedWaybillDialog({
                isSendPrintCmd: false,
                successAfter: function () {
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
        },
        /**
         * 输入快递单号
         */
        onBtnInputTrackingNumberClick: function (opt) {
            var me = this;
            this.showInputWaybillDialog({
                successAfter: function () {
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
        },
        /**
         * 重新选择快递单类型
         */
        onBtnResetDeliverClick: function (opt) {
            var me = this;
            var ids = this.checkNotEmptyMutliDataReturnIds();
            this.resetDeliverDialog = new ResetDeliverDialog({
                onSuccess: function () {
                    tipUtils.success('保存成功，并移到【打印快递单】选项卡中');
                    me.resetDeliverDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
            this.addExtraWidget(this.resetDeliverDialog);
            this.resetDeliverDialog.set('extraParams', {orderIds: ids});
            this.resetDeliverDialog.show();
        },
        /**
         * 重新选择包裹类型
         */
        onBtnResetPackageTypeClick: function (opt) {
            var me = this;
            var ids = this.checkNotEmptyMutliDataReturnIds();
            this.resetPackageTypeDialog = new ResetPackageTypeDialog({
                onSuccess: function () {
                    tipUtils.success('保存成功，并移到【打印快递单】选项卡中');
                    me.resetPackageTypeDialog.destroy();
                    opt.data = arguments;
                    on.emit(me, 'ClickComplete', opt)
                }
            });
            this.resetPackageTypeDialog.set('extraParams', {orderIds: ids});
            this.resetPackageTypeDialog.show();
        },
        /**
         * 重新打印快递单
         */
        onBtnReprintWaybillClick: function (opt) {
            var me = this;
            var ids = this.checkNotEmptyMutliDataReturnIds();
            dialogUtils.confirm(
                dojoStringUtils.substitute('当前选择的【${count}】条订单退回【打印快递单】,重新打印快递单?', {count: ids.length}),
                function (isConfirm) {
                    if (!isConfirm) return;
                    orderHttpService.reprintWaybill({data: {orderIds: ids}}).success(function () {
                        tipUtils.success('保存成功');
                        opt.data = arguments;
                        on.emit(me, 'ClickComplete', opt)
                    });
                }
            );
        },
        /**
         * 确认已打包复核
         */
        onBtnConfirmPackCheckedClick: function (opt) {
            var me = this;
            var ids = this.checkNotEmptyMutliDataReturnIds();
            dialogUtils.confirm(
                dojoStringUtils.substitute('提交当前选择的【${count}】条订单到【待揽收】?', {count: ids.length}),
                function (isConfirm) {
                    if (!isConfirm) return;
                    orderHttpService.confirmPackChecked({data: {orderIds: ids}}).success(function () {
                        tipUtils.success('保存成功');
                        opt.data = arguments;
                        on.emit(me, 'ClickComplete', opt)
                    });
                }
            );
        },
        /**
         * 确认已发货
         */
        onBtnConfirmDeliveredClick: function (opt) {
            var me = this;
            var ids = this.checkNotEmptyMutliDataReturnIds();
            dialogUtils.confirm(
                dojoStringUtils.substitute('当前选择的【${count}】条订单都已经发货?', {count: ids.length}),
                function (isConfirm) {
                    if (!isConfirm) return;
                    orderHttpService.confirmDelivered({data: {orderIds: ids}}).success(function () {
                        tipUtils.success('保存成功');
                        opt.data = arguments;
                        on.emit(me, 'ClickComplete', opt)
                    });
                }
            );
        },
    });
});