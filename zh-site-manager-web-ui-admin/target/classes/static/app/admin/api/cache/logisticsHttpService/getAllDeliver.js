/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/cache/logisticsHttpService/getAllDeliver
 */
define([
    'admin/api/logisticsHttpService',
], function (logisticsHttpService) {
    var getAllDeliver = [];
    logisticsHttpService.getAllDeliver({
        sync: true
    }).success(function (res) {
        getAllDeliver = res;
    });
    return getAllDeliver;
});