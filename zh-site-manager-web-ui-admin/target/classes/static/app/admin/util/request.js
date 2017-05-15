/**
 * Created by 陈志杭 on 2016/12/27.
 * @description api request util
 * @file admin/util/request
 */
define([
    'admin/util/loginStateUtils',
    'dojo/request',
    'dojo/request/registry',
    'admin/appConfig',
    'dojo/_base/lang',
    'admin/util/tipUtils',
    'admin/util/pageTransitionsUtils',
    'zh/core',
    'dojo/topic',
    'admin/services/data/identity/getAllTokenExceptionCode',
    'dojo/json',
], function (loginStateUtils, request, requestRegistry, appConfig, lang, tipUtils, pageTransitionsUtils, zh,
             topic, allTokenExceptionCode,
             json) {


    function urlMatcher() {
        return true;
    }

    function provider(url, option) {
        if (lang.exists('isClientTestApi', appConfig) && appConfig.isClientTestApi) {
            url = require.toUrl(appConfig.isClientTestUrl + url + '.json');
        }
        var defaultError = function () {
            tipUtils.danger('服务器异常,请稍候重试');
        };
        var defaultProcess = function () {

        };
        var defaultComplete = function () {
            pageTransitionsUtils.hide();
        };
        var defaultSuccess = function (res, bizSuccess, bizFailure) {
            if (res && !res.success && res.code) {
                for (var i in allTokenExceptionCode) {
                    var tokenExceptionCode = allTokenExceptionCode[i];
                    if (tokenExceptionCode.id === res.code) {
                        if (res && res.message) {
                            tipUtils.warning(res.message);
                        } else {
                            tipUtils.danger('服务器异常,请稍候重试');
                        }
                        topic.publish('/admin/api/token/exception');
                        return;
                    }
                }
            }
            if (res) {
                topic.publish('/admin/api/token/refresh');
            }
            if (res && res.success) {
                bizSuccess && bizSuccess(res.data);
            } else {
                if (bizFailure) {
                    bizFailure(res);
                }
                else {
                    if (res && res.message) {
                        tipUtils.warning(res.message);
                    } else {
                        tipUtils.danger('服务器异常,请稍候重试');
                    }
                }
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
            then: function (opt) {
                if (zh.isObject(opt)) {
                    opt = lang.mixin({
                        // {funcation}
                        success: undefined,
                        // {funcation}
                        failure: undefined,
                        // {funcation}
                        error: undefined,
                        // {funcation}
                        process: undefined,
                        // {funcation}
                        complete: undefined

                    }, opt);
                } else {
                    opt = {
                        success: arguments[0],
                        error: arguments[1],
                        process: arguments[2],
                    };
                }
                var error = opt.error;
                var success = opt.success;
                var failure = opt.failure;
                var process = opt.process;
                error = zh.closure([defaultError, error]);
                process = zh.closure([defaultProcess, process]);

                if (option.method) {
                    option.method = option.method.toUpperCase();
                }
                var tokenHeaders = loginStateUtils.getCurrentTokenHeaderObject();
                option.headers = lang.mixin(option.headers, tokenHeaders);
                option.headers = lang.mixin({requestTokenType: 'computerbrowser'}, option.headers);
                var newOpt = lang.mixin(appConfig.request, {
                    data: undefined,
                    sync: false,
                    handleAs: 'json',
                    query: undefined,
                    method: 'GET',
                    preventCache: true,
                    headers: undefined,
                }, option);
                if (newOpt.data && newOpt.method === 'POSTBODY') {
                    newOpt.data = json.stringify(newOpt.data);
                    newOpt.method = 'POST';
                    newOpt.headers = newOpt.headers || {};
                    newOpt.headers["Content-Type"] = 'application/json';
                }
                if (newOpt.data && newOpt.method == 'GET') {
                    newOpt.query = newOpt.data;
                }

                var promise = request(url, newOpt);
                promise.always((function (complete) {
                    return function () {
                        defaultComplete.apply(this, arguments);
                        complete && complete.apply(this, arguments);
                    }
                })(opt.complete));
                pageTransitionsUtils.show();
                promise.then(function (res) {
                    defaultSuccess(res, success, failure);
                }, error, process);
            },
            success: function (optOrCallback) {
                if (zh.isObject(optOrCallback)) {
                    this.then(optOrCallback);
                } else {
                    this.then({
                        success: optOrCallback
                    })
                }

            }
        };
    }

    requestRegistry.register(urlMatcher, provider, true);


    return requestRegistry;
});