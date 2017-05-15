/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/loginStateUtils
 * @description 登录状态记录
 */
define([
    'dojo/cookie',
    'dojo/hash',
    'dojo/io-query',
    'dojo/json',
    'admin/appConfig',
    'zh/core',
    'dojo/_base/lang',
    'dojo/request',
    'admin/api/apiConfig',
    'admin/util/pageTransitionsUtils',
    'dojo/date',
], function (cookie, hash, ioQuery, json, appConfig, zh, lang, request, apiConfig, pageTransitionsUtils, dateUtils) {
    var loginStateUtils = {
        getCurrentTokenHeaderObject: function () {
            var tokenHeaders = {};
            tokenHeaders[appConfig.requestHeaderTokenKey] = lang.getObject('token', false, loginStateUtils.getAccount()) || '';
            return tokenHeaders;
        },
        isLogin: function () {
            //  return zh.isNotEmptyObject(this.getAccount());
            var isLogin = false;
            var cacheAccount = this.getAccount();
            if (cacheAccount) {
                var headers = this.getCurrentTokenHeaderObject();
                pageTransitionsUtils.show();
                var promise = request(apiConfig.identity.validToken, {
                    sync: true,
                    headers: headers,
                    timeout: appConfig.request.timeout,
                    handleAs: 'json'
                });
                promise.always(function () {
                    pageTransitionsUtils.hide();
                });
                promise.then(function (res) {
                    isLogin = res.success;
                }, function () {

                }, function () {

                });
                return isLogin;
            }
        },
        logout: function () {
            if (cookie.isSupported()) {
                cookie(appConfig.loginStateStorageKey, null, {expires: -1});
            } else {
                var curHash = ioQuery(hash());
                if (curHash[appConfig.loginStateStorageKey]) {
                    delete curHash[appConfig.loginStateStorageKey];
                }
                hash(curHash, true);
            }
        },
        setAccount: function (account) {
            this._account = account;
            var encodeAcount = this._encodeAccount(account);
            if (cookie.isSupported()) {
                var now = new Date();
                var cookieOpt = undefined;
                if (appConfig.tokenCookieExpireSeconds && !isNaN(appConfig.tokenCookieExpireSeconds) && appConfig.tokenCookieExpireSeconds > 0) {
                    var expires = dateUtils.add(now, 'second', appConfig.tokenCookieExpireSeconds);
                    cookieOpt = {expires: expires};
                }

                cookie(appConfig.loginStateStorageKey, encodeAcount, cookieOpt);
            } else {
                var curHash = ioQuery(hash());
                curHash[appConfig.loginStateStorageKey] = encodeAcount;
                hash(curHash, true);
            }
        },
        getAccount: function () {
            var storageAccountString = this.getAccountStorageString();
            if (zh.isEmptyObject(storageAccountString)) return null;
            var account = this._decodeAccount(storageAccountString);
            return account;
        },
        getAccountStorageString: function () {
            var storageAccountString = null;
            if (cookie.isSupported()) {
                storageAccountString = cookie(appConfig.loginStateStorageKey);
            } else {
                var curHash = ioQuery(hash());
                storageAccountString = curHash[appConfig.loginStateStorageKey]
            }
            return storageAccountString;
        }
        ,
        _encodeAccount: function (account) {
            var newAccount = account;
            var jsonStrAccount = json.stringify(newAccount);
            var encodeAcount = encodeURIComponent(jsonStrAccount);
            return encodeAcount;
        }
        ,
        _decodeAccount: function (encodeStr) {
            var decodeStr = decodeURIComponent(encodeStr);
            var account = json.parse(decodeStr);
            return account;
        }
    };
    return loginStateUtils;

});