/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/regionHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig'], function (request, apiConfig) {
    return {
        findAllByChina: function (options) {
            return request(apiConfig.admin.region.findAllByChina, options);
        },
    };
});