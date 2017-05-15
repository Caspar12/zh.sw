/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/view-partial/main/order/widget/enums/ToolbarButtonsEnum
 */
define([
    'dojo/string',
    'dojo/_base/array',
], function (dojoStringUtils, array) {

    var ToolbarButtonsEnum = {
        DeleteButton: {id: 'btnDelete', text: '删除订单'},
        CreateDeliveryPlanButton: {id: 'btnCreateDeliveryPlan', text: '创建发货计划'},
        SetDeliverButton: {id: 'btnSetDeliver', text: '选择快递'},
        SetPackageTypeButton: {id: 'btnSetPackageType', text: '选择包裹类型'},
        SetDeliveryPlanCheckPassButton: {id: 'btnSetDeliveryPlanCheckPass', text: '生成批次'},
        EditDeliveryPlanCheckingOrderButton: {id: 'btnEditDeliveryPlanCheckingOrder', text: '编辑订单'},
        EditOrderButton: {id: 'btnEditOrder', text: '编辑订单'},
        PrintWaybillButton: {id: 'btnPrintWaybill', text: '打印快递单'},
        PrintPreviewWaybillButton: {id: 'btnPrintPreviewWaybill', text: '打印快递单预览'},
        ConfirmPrintedButton: {id: 'btnConfirmPrinted', text: '确认已打印快递单'},
        InputTrackingNumberButton: {id: 'btnInputTrackingNumber', text: '输入快递单号'},
        ResetDeliverButton: {id: 'btnResetDeliver', text: '重新选择快递单类型'},
        ResetPackageTypeButton: {id: 'btnResetPackageType', text: '重新选择包裹类型'},
        ConfirmInputTrackingNumberButton: {id: 'btnConfirmInputTrackingNumber', text: '提交到【扫描复核】'},
        EditWaitPrintOrderButton: {id: 'btnEditWaitPrintOrder', text: '编辑订单'},
        ConfirmPackCheckedButton: {id: 'btnConfirmPackChecked', text: '确认已打包复核'},
        ReprintWaybillButton: {id: 'btnReprintWaybill', text: '重新打印快递单'},
        ConfirmDeliveredButton: {id: 'btnConfirmDelivered', text: '确认已发货'},


    };
    for (var proName in ToolbarButtonsEnum) {
        var enumValue = ToolbarButtonsEnum[proName];
        var eventName = enumValue.id.substring(0, 1).toUpperCase() + enumValue.id.substring(1);
        enumValue.onClickName = dojoStringUtils.substitute('${eventName}Click', {eventName: eventName});

    }
    return ToolbarButtonsEnum;
});