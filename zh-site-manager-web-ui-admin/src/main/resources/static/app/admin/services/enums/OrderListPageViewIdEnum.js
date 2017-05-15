/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/enums/OrderListPageViewIdEnum
 */
define([
], function () {
    var OrderListPageViewIdEnum = {
        WaitPlan: {
            id: 0,

        },
        DeliveryPlanning: {
            id: 1,


        },
        WaitPrint: {
            id: 2,

        },
        WaitPackCheck: {
            id: 3,

        },
        WaitDelivery: {
            id: 4,

        },
        Delivered: {
            id: 5,
        },
        EditOrder: {
            id: 6,
        },
    };
    return OrderListPageViewIdEnum;
});