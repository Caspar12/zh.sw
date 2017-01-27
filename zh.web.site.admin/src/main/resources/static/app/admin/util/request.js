/**
 * Created by 陈志杭 on 2016/12/27.
 * @description api request util
 * @file admin/util/request
 */
define([
    'dojo/request',
    'dojo/request/registry',
    'admin/module/config',
    'dojo/_base/lang',
    'admin/util/tipUtils',
    'admin/util/uiUtils',
    'admin/util/context',
], function (request, requestRegistry, config, lang, tipUtils, uiUtils, context) {
    function urlMatcher() {
        return true;
    }

    function provider(url, option) {
        if (lang.exists('isClientTestApi', config) && config.isClientTestApi) {
            url = require.toUrl(config.isClientTestUrl + url + '.json');
        }
        var defaultError = function () {
            tipUtils.danger('服务器异常,请稍候重试');
        };
        var defaultProcess = function () {
            uiUtils.showLoading();

        };
        var defaultComplete = function () {
            uiUtils.hideLoading();
        };
        var defaultSuccess = function (res,bizSuccess) {
            if (res.success) {
                bizSuccess && bizSuccess(res.data);
            } else {
                tipUtils.warning(res.message);
            }
        };
        option = option || {};
        return {
            /**
             * 发送实际请求
             * @param success 业务成为回调函数
             * @param error 可空
             * @param process 可空
             */
            then: function (success, error, process) {
                error = error || defaultError;
                process = process || defaultProcess;

                if (option.method) {
                    option.method = option.method.toUpperCase();
                }
                var newOpt = lang.mixin({
                    data: undefined,
                    sync: false,
                    handleAs: 'json',
                    query: undefined,
                    method: 'GET',
                    preventCache: true,
                    headers: {
                        "_token": lang.getObject('account.token', false, context)
                    }
                }, option);
                if (newOpt.data && newOpt.method == 'GET') {
                    newOpt.query = newOpt.data;
                }
                var promise = request(url, newOpt);
                promise.always(defaultComplete);
                promise.then(function (res) {
                    defaultSuccess(res,success);
                }, error, process);
            },
            success: function (callback) {
                this.then(callback);
            }
        };
    }

    requestRegistry.register(urlMatcher, provider, true);

    return requestRegistry;
});