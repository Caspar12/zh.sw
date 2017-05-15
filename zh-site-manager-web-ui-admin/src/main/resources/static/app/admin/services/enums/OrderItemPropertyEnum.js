/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/enums/OrderItemPropertyEnum
 */
define([], function () {
    var OrderItemPropertyEnum = {
        Id: {id: 'id', text: 'id', width: '150px',},
        OrderId: {id: 'orderId', text: '订单Id', width: '150px',},
        Code: {id: 'code', text: '产品编码', width: '150px',},
        Name: {id: 'name', text: '产品名称', width: '150px',},
        UnitName: {id: 'unitName', text: '单位名称', width: '150px',},
        BarCode: {id: 'barCode', text: '产品条码', width: '150px',},
        Count: {id: 'count', text: '数量', width: '150px',},
    };

    for (var proName in OrderItemPropertyEnum) {
        var enumValue = OrderItemPropertyEnum[proName];
        enumValue.data = enumValue.id;
        enumValue.title = enumValue.text;
    }

    return OrderItemPropertyEnum;
});