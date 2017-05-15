/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/senderHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig'], function (request, apiConfig) {
    return {
        findDefaultOrEmpty: function (options) {
            return request(apiConfig.admin.sender.findDefaultOrEmpty, options);
        },
        listPrintingWaybillSenderPage: function (options) {
            return request(apiConfig.admin.sender.listPrintingWaybillSenderPage, options);
        },
        list: function (options) {
            return request(apiConfig.admin.sender.list, options);
        },
        delete: function (options) {
            return request(apiConfig.admin.sender.delete, options);
        },
        edit: function (options) {
            return request(apiConfig.admin.sender.edit, options);
        },

    };
});