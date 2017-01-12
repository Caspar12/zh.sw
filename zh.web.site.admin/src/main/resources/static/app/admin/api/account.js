/**
 * Created by 陈志杭 on 2016/12/27.
 */
define(['admin/util/request',], function (request) {
    return {
        getByToken: function (params) {
            request('/api/applciation/getByToken', params.options).then(params.success);
        }
    };
});