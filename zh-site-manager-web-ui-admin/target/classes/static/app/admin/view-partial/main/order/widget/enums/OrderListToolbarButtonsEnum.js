/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/view-partial/main/order/widget/enums/OrderListToolbarButtonsEnum
 */
define([
    'dojo/string',
    'dojo/_base/array',
    'admin/view-partial/main/order/widget/enums/ToolbarButtonsEnum',
], function (dojoStringUtils, array, ToolbarButtonsEnum) {
    var id = 0;
    var OrderListToolbarButtonsEnum = {
        WaitPlan: {
            id: 0,
            buttons: [
                ToolbarButtonsEnum.DeleteButton,
                ToolbarButtonsEnum.CreateDeliveryPlanButton,
            ]
        },
        SelectDeliver: {
            id: 1,
            buttons: [
                ToolbarButtonsEnum.SetDeliverButton,
            ]
        },
        SelectPackageType: {
            id: 2,
            buttons: [
                ToolbarButtonsEnum.SetPackageTypeButton,
            ]
        },
        DeliveryPlanCheck: {
            id: 3,
            buttons: [
                ToolbarButtonsEnum.SetDeliveryPlanCheckPassButton,
               // ToolbarButtonsEnum.EditDeliveryPlanCheckingOrderButton,
            ]
        },
        PrintWaybill: {
            id: 4,
            buttons: [
                ToolbarButtonsEnum.PrintPreviewWaybillButton,
                ToolbarButtonsEnum.PrintWaybillButton,
                ToolbarButtonsEnum.ConfirmPrintedButton,
            ]
        },
        InputTrackingNumber: {
            id: 5,
            buttons: [
                ToolbarButtonsEnum.InputTrackingNumberButton,
                ToolbarButtonsEnum.ConfirmInputTrackingNumberButton
            ]
        },
        ConfirmPackChecked: {
            id: 5,
            buttons: [
                ToolbarButtonsEnum.ConfirmPackCheckedButton,
                ToolbarButtonsEnum.ReprintWaybillButton,
            ]
        },
        ConfirmDelivered: {
            id: 5,
            buttons: [
                ToolbarButtonsEnum.ConfirmDeliveredButton,
            ]
        },
        EditDeliveryPlanCheckingOrderButton: {
            id: 6,
            buttons: [
             //   ToolbarButtonsEnum.EditWaitPrintOrderButton
            ]
        },
        ResetDeliver: {
            id: 7,
            buttons: [
                ToolbarButtonsEnum.ResetDeliverButton
            ]
        },
        ResetPackageType: {
            id: 8,
            buttons: [
                ToolbarButtonsEnum.ResetPackageTypeButton
            ]
        },
        EditOrder:{
            id:9,
            buttons: [
                ToolbarButtonsEnum.EditOrderButton
            ]
        }
    };
    return OrderListToolbarButtonsEnum;
});