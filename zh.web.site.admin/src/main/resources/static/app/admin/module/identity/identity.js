/**
 * Created by 陈志杭 on 2016/12/27.
 */
define(['zh/core', 'dojo/cookie', 'dojo/request', 'admin/api/account'], function (zh, cookie, request, account) {
    var identity = {
        _account: false,
        _token: false,
        isLogin: function () {
            return zh.isUndefined(this._account);
        },
        setAccount: function (account) {
            this._account = account;
        },
        getAccount: function () {
            return this._account;
        },
        init: function () {
            var token = cookie('__token');
            this._token = token;
            if (!this._token)return;
            this._account = account.getSyncByToken(this._token);
        }
    };
    identity.init();
    return identity;
});