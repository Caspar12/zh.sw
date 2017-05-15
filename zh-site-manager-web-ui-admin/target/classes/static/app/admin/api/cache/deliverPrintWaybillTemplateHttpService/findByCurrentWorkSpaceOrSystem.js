/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/cache/deliverPrintWaybillTemplateHttpService/findByCurrentWorkSpaceOrSystem
 */
define([
    'admin/api/deliverPrintWaybillTemplateHttpService',
], function (deliverPrintWaybillTemplateHttpService) {
    var findByCurrentWorkSpaceOrSystem = [];
    deliverPrintWaybillTemplateHttpService.findByCurrentWorkSpaceOrSystem({
        sync: true
    }).success(function (res) {
        findByCurrentWorkSpaceOrSystem = res;
    });
    return findByCurrentWorkSpaceOrSystem;
});