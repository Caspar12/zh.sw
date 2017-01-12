/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([], function () {
    return {
        application: {
            getBaseInfo: '/api/application/getBaseInfo',
            getMenu: 'api/application/getMenu',
        },
        identity: {
            login: '/api/identity/login'
        }
    };
});