/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/enums/OrderListPageViewEnum
 */
define([
    'admin/services/enums/OrderStatusEnum',
    'admin/services/enums/OrderListPageViewIdEnum',
    'admin/view-partial/main/order/widget/enums/OrderListShowSearchTextEnum',
    'admin/view-partial/main/order/widget/enums/OrderListToolbarButtonsEnum',
    'admin/view-partial/main/order/widget/enums/OrderListTableColumnEnum',
], function (OrderStatusEnum, OrderListPageViewIdEnum, OrderListShowSearchTextEnum, OrderListToolbarButtonsEnum, OrderListTableColumnEnum) {
    var OrderListPageViewEnum = {
        WaitPlan: {
            id: OrderListPageViewIdEnum.WaitPlan.id,
            title: "待计划订单",
            container: undefined,
            orderStatusEnum: OrderStatusEnum.WaitPlan,
            orderListShowSearchTextEnum: OrderListShowSearchTextEnum.Default,
            orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.WaitPlan,
            orderListTableColumnEnum: OrderListTableColumnEnum.WaitPlan
        },
        DeliveryPlanning: {
            id: OrderListPageViewIdEnum.DeliveryPlanning.id,
            title: "发货计划",
            orderStatusEnum: OrderStatusEnum.DeliveryPlanning,
            container: {
                tab: [
                    {
                        title: '选择快递',
                        orderStatusEnum: OrderStatusEnum.DeliveryPlanning,
                        orderListShowSearchTextEnum: OrderListShowSearchTextEnum.DeliveryPlanningSelectDeliver,
                        orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.SelectDeliver,
                        orderListTableColumnEnum: OrderListTableColumnEnum.PlaningForDeliver
                    },
                    // {
                    //     title: '选择包裹类型',
                    //     orderStatusEnum: OrderStatusEnum.DeliveryPlanning,
                    //     orderListShowSearchTextEnum: OrderListShowSearchTextEnum.DefaultAndDeliveryPlanIdAndTransporterIdAndPackageType,
                    //     orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.SelectPackageType,
                    //     orderListTableColumnEnum: OrderListTableColumnEnum.All
                    // },
                    {
                        title: '生成批次',
                        orderStatusEnum: OrderStatusEnum.DeliveryPlanning,
                        orderListShowSearchTextEnum: OrderListShowSearchTextEnum.DeliveryPlanningBuildBatch,
                        orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.DeliveryPlanCheck,
                        orderListTableColumnEnum: OrderListTableColumnEnum.PlaningForDeliverBuildBatch
                    },
                ]
            },

        },
        WaitPrint: {
            id: OrderListPageViewIdEnum.WaitPrint.id,
            title: "打印快递单",
            orderStatusEnum: OrderStatusEnum.WaitPrint,
            container: {
                tab: [
                    {
                        title: '打印快递单',
                        orderStatusEnum: OrderStatusEnum.WaitPrint,
                        orderListShowSearchTextEnum: OrderListShowSearchTextEnum.WaitForPrint,
                        orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.PrintWaybill,
                        orderListTableColumnEnum: OrderListTableColumnEnum.WaitPrint
                    },
                    {
                        title: '输入快递单号',
                        orderStatusEnum: OrderStatusEnum.WaitInputWaybillNumber,
                        orderListShowSearchTextEnum: OrderListShowSearchTextEnum.WaitForPrintInputWaybill,
                        orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.InputTrackingNumber,
                        orderListTableColumnEnum: OrderListTableColumnEnum.WaitPrintInputWaybill
                    },
                    // {
                    //     title: '重新选择快递单类型',
                    //     orderStatusEnum: [OrderStatusEnum.WaitPrint, OrderStatusEnum.WaitInputWaybillNumber],
                    //     orderListShowSearchTextEnum: OrderListShowSearchTextEnum.DefaultAndDeliveryPlanIdAndTransporterIdAndPackageType,
                    //     orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.ResetDeliver,
                    //     orderListTableColumnEnum: OrderListTableColumnEnum.All
                    // },
                    // {
                    //     title: '重新选择包裹类型',
                    //     orderStatusEnum: [OrderStatusEnum.WaitPrint, OrderStatusEnum.WaitInputWaybillNumber],
                    //     orderListShowSearchTextEnum: OrderListShowSearchTextEnum.DefaultAndDeliveryPlanIdAndTransporterIdAndPackageType,
                    //     orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.ResetPackageType,
                    //     orderListTableColumnEnum: OrderListTableColumnEnum.All
                    // },
                    // {
                    //     title: '修改订单',
                    //     orderStatusEnum: [OrderStatusEnum.WaitPrint, OrderStatusEnum.WaitInputWaybillNumber],
                    //     orderListShowSearchTextEnum: OrderListShowSearchTextEnum.DefaultAndDeliveryPlanIdAndTransporterIdAndPackageType,
                    //     orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.EditDeliveryPlanCheckingOrderButton,
                    //     orderListTableColumnEnum: OrderListTableColumnEnum.All
                    // },
                ]
            },
        },
        WaitPackCheck: {
            id: OrderListPageViewIdEnum.WaitPackCheck.id,
            title: "扫描复核",
            container: undefined,
            orderStatusEnum: OrderStatusEnum.WaitPackCheck,
            orderListShowSearchTextEnum: OrderListShowSearchTextEnum.WaitForPrint,
            orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.ConfirmPackChecked,
            orderListTableColumnEnum: OrderListTableColumnEnum.All
        },
        WaitDelivery: {
            id: OrderListPageViewIdEnum.WaitDelivery.id,
            title: "待揽收",
            container: undefined,
            orderStatusEnum: OrderStatusEnum.WaitDelivery,
            orderListShowSearchTextEnum: OrderListShowSearchTextEnum.WaitForPrint,
            orderListToolbarButtonsEnum: OrderListToolbarButtonsEnum.ConfirmDelivered,
            orderListTableColumnEnum: OrderListTableColumnEnum.All
        },
        Delivered: {
            id: OrderListPageViewIdEnum.Delivered.id,
            title: "已发货订单",
            container: undefined,
            orderStatusEnum: OrderStatusEnum.Delivered,
            orderListShowSearchTextEnum: OrderListShowSearchTextEnum.WaitForPrint,
            orderListToolbarButtonsEnum: undefined,
            orderListTableColumnEnum: OrderListTableColumnEnum.All
        },
        EditOrder: {
            id: OrderListPageViewIdEnum.EditOrder.id,
            title: "修改订单",
            container: undefined,
            orderStatusEnum: [
                OrderStatusEnum.WaitPlan,
                OrderStatusEnum.DeliveryPlanning,
                OrderStatusEnum.WaitPrint,
                OrderStatusEnum.WaitInputWaybillNumber,
                OrderStatusEnum.WaitPackCheck,
                OrderStatusEnum.WaitDelivery,
                OrderStatusEnum.Delivered,
            ],
            orderListShowSearchTextEnum: OrderListShowSearchTextEnum.WaitForPrint,
            orderListToolbarButtonsEnum:  OrderListToolbarButtonsEnum.EditOrder,
            orderListTableColumnEnum: OrderListTableColumnEnum.All
        },
    };
    return OrderListPageViewEnum;
});