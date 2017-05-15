/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/util/languageUtils
 */
define([
    'zh/core',
    'dojo/request/xhr',
], function (zh, requestXhr) {
    var languageUtils = {
        _AMDJsLanguages: {},
        loadJsAMDLanguageByUrl: function (url) {
            var me = this;
            if (!this._AMDJsLanguages[url]) {
                requestXhr.get(url, {
                    timeout: 30 * 1000,
                    sync: true,
                    handleAs: 'text'
                }).then(function (res) {
                    me._AMDJsLanguages[url] = res;
                });
                eval(this._AMDJsLanguages[url]);
            }
        },
        loadJsAMDLanguageByModulePath: function (modulePath) {
            var url = require.toUrl(modulePath);
            this.loadJsAMDLanguageByUrl(url);
        },

        _JsonLanguages: {},
        loadJsonLanguageByUrl: function (url) {
            var me = this;
            if (!this._JsonLanguages[url]) {
                requestXhr.get(url, {
                    timeout: 30 * 1000,
                    sync: true,
                    handleAs: 'json'
                }).then(function (res) {
                    me._JsonLanguages[url] = res;
                });
            }
            return this._JsonLanguages[url];
        },
        loadJsonLanguageByModulePath: function (modulePath) {
            var url = require.toUrl(modulePath);
            return this.loadJsonLanguageByUrl(url);
        },
    };

    return languageUtils;
});