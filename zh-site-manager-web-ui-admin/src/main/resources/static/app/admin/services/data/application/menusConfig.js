/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/data/application/menusConfig
 */
define([
    'zh/core',
    'admin/services/enums/OrderStatusEnum',
    'admin/services/enums/OrderListPageViewIdEnum',
], function (zh, OrderStatusEnum, OrderListPageViewIdEnum) {

    return [
        ///---------------------- 订单管理
        {
            "id": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
            "name": "<i class='fa fa-reorder'></i>&nbsp;&nbsp;订单管理",
            "parentId": null,
            "sort": 0
        },
        {
            "id": "df03c737-4f00-4002-a86c-d4ff70ccde0f",
            "name": "导入订单",
            "parentId": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
            "url": "/order/import",
            "sort": 0
        },
        // {
        //     "id": "01a6be7e-5dc0-45a9-bd9f-726d42d15798",
        //     "name": OrderStatusEnum.WaitPlan.title,
        //     "parentId": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
        //     "url": "/order/list&type=" + OrderListPageViewIdEnum.WaitPlan.id,
        //     "sort": 1
        // },
        {
            "id": "dc8cce56-7718-49f8-8054-fef0662f6871",
            "name": OrderStatusEnum.DeliveryPlanning.title,
            "parentId": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
            "url": "/order/list&type=" + OrderListPageViewIdEnum.DeliveryPlanning.id,
            "sort": 2
        },
        {
            "id": "e7cf57bb-5133-46e4-8341-30e6e0bb4c3f",
            "name": OrderStatusEnum.WaitPrint.title,
            "parentId": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
            "url": "/order/list&type=" + OrderListPageViewIdEnum.WaitPrint.id,
            "sort": 3
        },
        {
            "id": "bc9df98c-fb9a-4de8-8905-872796ccfd7b",
            "name": OrderStatusEnum.WaitPackCheck.title,
            "parentId": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
            "url": "/order/list&type=" + OrderListPageViewIdEnum.WaitPackCheck.id,
            "sort": 4
        },
        {
            "id": "303e7f57-b212-48c6-8fca-61180c8bc363",
            "name": OrderStatusEnum.WaitDelivery.title,
            "parentId": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
            "url": "/order/list&type=" + OrderListPageViewIdEnum.WaitDelivery.id,
            "sort": 5
        },
        {
            "id": "a41ec88e-9f2f-4c05-ac5a-9c16046354dd",
            "name": OrderStatusEnum.Delivered.title,
            "parentId": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
            "url": "/order/list&type=" + OrderListPageViewIdEnum.Delivered.id,
            "sort": 6
        },
        {
            "id": "572e6bc2-9053-42b8-8e8f-7d3c27c66d49",
            "name": '修改订单',
            "parentId": "d5bb41ad-f7cd-4b58-acc8-ea9dfb19f429",
            "url": "/order/list&type=" + OrderListPageViewIdEnum.EditOrder.id,
            "sort": 6
        },
        ///---------------------- 寄件信息管理
        {
            "id": "566d1809-aeec-4db7-929a-9321b10cb6a3",
            "name": "<i class='fa fa-address-card-o'></i>&nbsp;&nbsp;寄件信息管理",
            "parentId": null,
            "sort": 1
        },
        {
            "id": "6b0623fe-de01-44ca-bf2e-ddb37dc418c2",
            "name": "寄件信息管理",
            "parentId": "566d1809-aeec-4db7-929a-9321b10cb6a3",
            "url": "/sender/list",
            "sort": 0
        },
        ///---------------------- 快递单打印模板管理
        {
            "id": "5510e7c2-226f-4dfb-92d4-9e950b864353",
            "name": "<i class='fa fa-book'></i>&nbsp;&nbsp;快递单打印模板管理",
            "parentId": null,
            "sort": 1
        },
        {
            "id": "7b3f276a-fd13-4cae-9feb-428bbef286ff",
            "name": "快递单打印模板管理",
            "parentId": "5510e7c2-226f-4dfb-92d4-9e950b864353",
            "url": "/waybill-template/list",
            "sort": 0
        },
    ];
});