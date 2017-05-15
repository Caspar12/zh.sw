/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/orderHttpService
 */
define(['admin/util/request', 'admin/api/apiConfig'], function (request, apiConfig) {
    return {
        list: function (options) {
            return request(apiConfig.admin.order.list, options);
        },
        getAllPackageType: function (options) {
            return request(apiConfig.admin.order.getAllPackageType, options);
        },
        listOrderDeliveryPlanPage: function (options) {
            return request(apiConfig.admin.order.listOrderDeliveryPlanPage, options);
        },
        confirmPrintWaybill: function (options) {
            return request(apiConfig.admin.order.confirmPrintWaybill, options);
        },
        setTrackingNumber: function (options) {
            return request(apiConfig.admin.order.setTrackingNumber, options);
        },
        confirmInputWaybill: function (options) {
            return request(apiConfig.admin.order.confirmInputWaybill, options);
        },
        reprintWaybill: function (options) {
            return request(apiConfig.admin.order.reprintWaybill, options);
        },
        confirmPackChecked: function (options) {
            return request(apiConfig.admin.order.confirmPackChecked, options);
        },
        confirmDelivered: function (options) {
            return request(apiConfig.admin.order.confirmDelivered, options);
        },
        getImportOrderTemplateUrl: function (options) {
            return request(apiConfig.admin.order.getImportOrderTemplateUrl, options);
        },
        importByExcel: function (options) {
            return request(apiConfig.admin.order.importByExcel, options);
        },
        getImportResult: function (options) {
            return request(apiConfig.admin.order.getImportResult, options);
        },
        delete: function (options) {
            return request(apiConfig.admin.order.delete, options);
        },
        buildOrderDeliveryPlan: function (options) {
            return request(apiConfig.admin.order.buildOrderDeliveryPlan, options);
        }
    };
});