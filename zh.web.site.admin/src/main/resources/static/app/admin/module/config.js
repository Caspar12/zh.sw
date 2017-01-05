/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([], function () {
    var appConfig = {
        // api层是否使用客户端本地测试数据
        isClientTestApi: true,
        // api层测试数据相对获取url, isClientTestUrl + 请求地址 + .json
        isClientTestUrl: 'admin/api/test'
    };
    return appConfig;
});