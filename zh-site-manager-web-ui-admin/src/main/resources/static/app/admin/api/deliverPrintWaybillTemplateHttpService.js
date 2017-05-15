/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/deliverPrintWaybillTemplateHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig'], function (request, apiConfig) {
    return {
        findByCurrentWorkSpaceOrSystem: function (options) {
            return request(apiConfig.admin.deliverPrintWaybillTemplate.findByCurrentWorkSpaceOrSystem, options);
        },
        findOne: function (options) {
            return request(apiConfig.admin.deliverPrintWaybillTemplate.findOne, options);
        },
        edit: function (options) {
            return request(apiConfig.admin.deliverPrintWaybillTemplate.edit, options);
        },
        delete: function (options) {
            return request(apiConfig.admin.deliverPrintWaybillTemplate.delete, options);
        },
    };
});