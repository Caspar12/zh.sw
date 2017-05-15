/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/data/identity/getAllTokenExceptionCode
 */
define([
    'dojo/request',
    'admin/api/apiConfig',
    'admin/util/tipUtils',
], function (request, apiConfig, tipUtils) {
    var result = [];
    request(apiConfig.identity.getAllTokenExceptionCode, {
        sync: true,
        handleAs: 'json',
    }).then(function (res) {
        if (res && res.success) {
            result = res.data;
        } else {
            if (res && res.message) {
                tipUtils.error(res.message);
            }
        }
    }, function () {
        throw new Error('获取Token错误代码失败');
    });
    return result;
});