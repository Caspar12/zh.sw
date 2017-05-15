/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/biz/orders/ordersService
 */
define([
    'dojo/_base/array',
    'dojo/_base/lang',
    'zh/util/linq',
], function (array, lang, linq) {
    var ordersService = {
        /**
         * 汇总订单物品信息
         * @param orders 订单带订单物品信息模型
         * @return {array}
         * [
         *      {name:'',totalCount:''}
         *      ...
         * ]
         */
        statisOrdersForOrderItemInfoByOrders: function (orders) {
            var allOrderItems = [];
            array.forEach(orders, function (order) {
                allOrderItems = allOrderItems.concat(order.orderItems);
            });
            var grouping = linq.From(allOrderItems).GroupBy('$.code');

            var results = grouping.Select(function (item) {
                var firstItem = item.source[0];
                var newItem = lang.mixin({}, firstItem);
                newItem.totalCount = linq.From(item.source).Sum('$.count')
                return newItem;

            }).ToArray();

            return results;
        }
    };
    return ordersService;
});