/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/logisticsHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig'], function (request, apiConfig) {
    return {
        getAllDeliver: function (options) {
            return request(apiConfig.admin.logistics.getAllDeliver, options);
        },
    };
});