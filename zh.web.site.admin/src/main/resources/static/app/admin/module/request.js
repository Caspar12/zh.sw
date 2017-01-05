/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([
    'dojo/request',
    'dojo/request/registry',
    'admin/module/config',
    'dojo/_base/lang',
    'admin/util/context',
], function (request, requestRegistry, config, lang, context) {
    if (dojo.exists('isClientTestApi', config) && config.isClientTestApi) {
        function urlMatcher() {
            return true;
        }

        function provider(url, option) {
            url = require.toUrl(config.isClientTestUrl + url + '.json');


            return {
                then: function (success, error, process) {
                    error = error || function (e) {
                            console.error(e);
                        };
                    option = lang.mixin({
                        handleAs: 'json',
                        headers: {
                            "_token": 'aaa'//lang.getObject('account.token', false, context)
                        }
                    }, option);
                    request(url, option)
                        .then(
                            function (res) {
                                success(res.data);
                            },
                            error,
                            process
                        );
                }
            };
        }

        requestRegistry.register(urlMatcher, provider, true);
    }
    return requestRegistry;
});