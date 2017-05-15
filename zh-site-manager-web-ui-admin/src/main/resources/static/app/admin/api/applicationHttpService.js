/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/applicationHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig', 'admin/services/data/application/menusConfig',
    'admin/services/data/application/baseInfoConfig',], function (request, apiConfig, menusConfig, baseInfoConfig) {
    return {
        getBaseInfo: function (options) {
            return {
                success: function (callback) {
                    callback(baseInfoConfig);
                }
            };
        },
        getMenus: function (options) {
            //  return request(apiConfig.application.getMenus, options);
            return {
                success: function (callback) {
                    callback(menusConfig);
                }
            };
        }
    };
});