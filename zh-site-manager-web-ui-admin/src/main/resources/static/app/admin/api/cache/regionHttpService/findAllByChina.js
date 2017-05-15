/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/cache/regionHttpService/findAllByChina
 */
define([
    'admin/api/regionHttpService',
], function (service) {
    var results = [];
    service.findAllByChina({
        sync: true
    }).success(function (res) {
        results = res;
    });
    return results;
});