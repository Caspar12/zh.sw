/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/orderDeliveryPlanHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig'], function (request, apiConfig) {
    return {
        build: function (options) {
            return request(apiConfig.admin.orderDeliveryPlan.build, options);
        }
    };
});