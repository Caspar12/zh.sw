/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/enums/OrderDeliveryPlanEnum
 */
define([], function () {
    var OrderDeliveryPlanEnum = {
        Id: {id: 'id', text: 'id', width: '150px'},
        DeliveryPlanName: {id: 'deliveryPlanName', text: '波次名称', width: '150px'},
        DeliveryPlanSerialNumber: {id: 'deliveryPlanSerialNumber', text: '波次号', width: '150px'},
        DeliveryPlanCreatedDt: {id: 'deliveryPlanCreatedDt', text: '波次创建时间', width: '150px'},
        DeliveryPlanCreatedId: {id: 'deliveryPlanCreatedId', text: '波次创建者Id', width: '150px'},
        DeliveryPlanCreatorName: {id: 'deliveryPlanCreatorName', text: '波次创建者', width: '150px'},
        Remark: {id: 'remark', text: '波次备注', width: '150px'},

    };
    for (var proName in OrderDeliveryPlanEnum) {
        var enumValue = OrderDeliveryPlanEnum[proName];
        enumValue.data = enumValue.id;
        enumValue.title = enumValue.text;
    }


    return OrderDeliveryPlanEnum;
});