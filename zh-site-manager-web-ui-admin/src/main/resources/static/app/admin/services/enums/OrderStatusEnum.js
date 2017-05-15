/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/enums/OrderStatusEnum
 */
define([], function () {
    var OrderStatusEnum = {
        Cancel: {id: -1, text: "废除订单"},
        WaitPlan: {id: 0, text: "待计划"},
        DeliveryPlanning: {id: 10, text: "发货计划中"},
        WaitPrint: {id: 20, text: "待打印快递单"},
        WaitInputWaybillNumber: {id: 25, text: "待输入货运单号"},
        WaitPackCheck: {id: 30, text: "待打包复核"},
        WaitDelivery: {id: 40, text: "待发货"},
        Delivered: {id: 100, text: "已发货"},
    };
    OrderStatusEnum.Cancel.title = '废除订单';
    OrderStatusEnum.WaitPlan.title = '待计划订单';
    OrderStatusEnum.DeliveryPlanning.title = '发货计划';
    OrderStatusEnum.WaitPrint.title = '打印快递单';
    OrderStatusEnum.WaitInputWaybillNumber.title = '输入快递单号';
    OrderStatusEnum.WaitPackCheck.title = '扫描复核';
    OrderStatusEnum.WaitDelivery.title = '待揽收';
    OrderStatusEnum.Delivered.title = '已发货订单';
    return OrderStatusEnum;
});