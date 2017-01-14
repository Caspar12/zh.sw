/**
 * Created by 陈志杭 on 2016/12/27.
 */
define(['admin/util/request', 'admin/api/apiConfig'], function (request, apiConfig) {
    return {
        getBaseInfo: function (options) {
            return request(apiConfig.application.getBaseInfo, options);
        },
        getMenus: function (options) {
            return request(apiConfig.application.getMenus, options);
        }
    };
});