/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/accountHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig'], function (request, apiConfig) {
    return {
        editPersonalInfo: function (options) {
            return request(apiConfig.admin.account.editPersonalInfo, options);
        },
        getAccount: function (options) {
            return request(apiConfig.admin.account.getAccount, options);
        },
    };
});