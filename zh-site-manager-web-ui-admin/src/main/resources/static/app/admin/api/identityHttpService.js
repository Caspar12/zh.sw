/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/identityHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig', 'admin/services/data/application/menusConfig'], function (request, apiConfig, menusConfig) {
    return {
        login: function (options) {
            return request(apiConfig.identity.login, options);
        },
        getAccountNameOrAccount: function (options) {
            return request(apiConfig.identity.getAccountNameOrAccount, options);
        },
        register: function (options) {
            return request(apiConfig.identity.register, options);
        },
        registerByInvitation: function (options) {
            return request(apiConfig.identity.registerByInvitation, options);
        },
        validToken:function (options) {
            return request(apiConfig.identity.validToken, options);
        },
        logout:function (options) {
            return request(apiConfig.identity.logout, options);
        }
    };
});