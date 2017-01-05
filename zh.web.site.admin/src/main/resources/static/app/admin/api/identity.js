/**
 * Created by 陈志杭 on 2016/12/27.
 */
define(['admin/module/request',], function (request) {
    return {
        login: function (options) {
            return request('/api/identity/getBaseInfo', options);
        }
    };
});