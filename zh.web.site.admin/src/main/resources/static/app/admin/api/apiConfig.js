/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([], function () {
    return {
        application: {
            getBaseInfo: '/api/application/getBaseInfo',
            getMenus: '/api/application/getMenus',
        },
        identity: {
            login: '/api/identity/login'
        },
        account: {
            updatePassword: '/api/account/updatePassword'
        }
    };
});