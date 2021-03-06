/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn 程序逻辑配置
 * @file admin/module/config
 */
define([], function () {
    var appConfig = {
        // api层是否使用客户端本地测试数据
        isClientTestApi: true,
        // api层测试数据相对获取url, isClientTestUrl + 请求地址 + .json
        isClientTestUrl: 'admin/api/test',
        // api层使用客户端本地测试数据时候,自动注入登录
        isClientTestAutoLogin: true,
        /**
         * 默认loading动画显示时间,单位毫秒
         */
        defaultShowLoadingAnimateTimeout: 30 * 1000
    };
    return appConfig;
});