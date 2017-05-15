/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/enums/OrderPropertyEnum
 */
define([], function () {
    var OrderPropertyEnum = {
        Id: {id: 'id', text: 'id',},
        DeliveryPlanId: {id: 'deliveryPlanId', text: '波次号', width: '150px',},
        DeliveryPlanName: {id: 'deliveryPlanName', text: '发货计划', width: '150px',},
        DeliveryPlanSerialNumber: {id: 'deliveryPlanSerialNumber', text: '波次号', width: '150px',},
        SerialNumber: {id: 'serialNumber', text: '内部编号', width: '160px',},
        TpOrderId: {id: 'tpOrderId', text: '订单号', width: '150px',},
        ReceviceProvinceName: {id: 'receviceProvinceName', text: '收货省份', width: '150px',},
        ReceviceCityName: {id: 'receviceCityName', text: '收货城市', width: '150px',},
        ReceviceAreaName: {id: 'receviceAreaName', text: '收货区县', width: '150px',},
        Recevier: {id: 'recevier', text: '收货人', width: '150px',},
        TpOrderCreatedDt: {
            id: 'tpOrderCreatedDt', text: '订单时间', width: '150px',
            startDatetimeId:'tpOrderCreatedDtStart',
            startDatetimeText: '订单时间',
            startDatetimePlaceHolder: '开始时间',
            endDatetimeId:'tpOrderCreatedDtEnd',
            endDatetimeText: '订单时间',
            endDatetimePlaceHolder: '结束时间',
        },
        RecevierContact: {id: 'recevierContact', text: '收货联系电话', width: '150px',},
        RecevierAddress: {id: 'recevierAddress', text: '收货地址', width: '150px',},
        PackageType: {id: 'packageType', text: '包裹类型', width: '150px',},
        PackageTypeText: {id: 'packageTypeText', text: '包裹类型', width: '150px',},
        DeliverId: {id: 'deliverId', text: '快递公司', width: '150px', transporterIdSelect2Id: 'transporterId',},
        DeliverName: {id: 'deliverName', text: '快递公司', width: '150px',},
        DeliverPrintWaybillTemplateId: {id: 'deliverPrintWaybillTemplateId', text: '快递单类型', width: '150px',},
        DeliverPrintWaybillTemplateName: {id: 'deliverPrintWaybillTemplateName', text: '快递单类型', width: '150px',},
        OrderItemName: {id: 'orderItemsNameAndCountText', text: '产品摘要', width: '150px', textBoxName: 'orderItemName'},
        TpOrderRemark: {id: 'tpOrderRemark', text: '备注', width: '150px',},
        TpName: {id: 'tpName', text: '客户', width: '150px',},
        TpArea: {id: 'tpArea', text: '订单区域', width: '150px',},
        TrackingNumber: {id: 'trackingNumber', text: '快递单号', width: '150px',},
        ImportDt: {id: 'importDt', text: '订单导入时间', width: '150px',},
    };
    for (var proName in OrderPropertyEnum) {
        var enumValue = OrderPropertyEnum[proName];
        enumValue.data = enumValue.id;
        enumValue.title = enumValue.text;
    }

    return OrderPropertyEnum;
});