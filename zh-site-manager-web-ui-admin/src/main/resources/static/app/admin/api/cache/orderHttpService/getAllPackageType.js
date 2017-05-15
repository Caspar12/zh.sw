/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/cache/orderHttpService/getAllPackageType
 */
define([
    'admin/api/orderHttpService',
], function (orderHttpService) {
    var getAllPackageType = [];
    orderHttpService.getAllPackageType({
        sync: true
    }).success(function (res) {
        getAllPackageType = res;
    });
    return getAllPackageType;
});