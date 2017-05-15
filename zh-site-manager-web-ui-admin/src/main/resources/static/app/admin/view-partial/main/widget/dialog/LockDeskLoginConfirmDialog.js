/**
 * Created by 陈志杭 on 2016/12/27.
 * @description
 * @file  admin/view-partial/main/widget/dialog/LockDeskLoginConfirmDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'zh/widget/text/ValidationTextBox',
    'admin/widget/text/PasswordTextBox',
    "admin/api/apiConfig",
    'dojo/_base/lang',
    'dojo/on',
    'dojo/date',
    'admin/appConfig',
    'dojo/topic',
    'zh/util/stringUtils',
    "dojo/_base/declare",
], function (ConfirmDialog, ValidationTextBox, PasswordTextBox, apiConfig, lang, on, dojoDateUtils, appConfig, topic, stringUtils, declare) {

    return declare(ConfirmDialog, {
        title: '已锁定,请重新登录',
        closable: false,
        draggable: false,
        action: apiConfig.identity.login,
        isAutoDestroyOnHideAfter: false,
        _lastActivedDt: undefined,
        _isLock: false,
        account: '',
        postCreate: function () {
            var me = this;
            me._lastActivedDt = new Date();
            this.inherited(arguments);

            var txtAccount = new ValidationTextBox({
                label: '账 号',
                name: 'account',
                required: true,
                style: {width: '200px'},
                readOnly: true,
                value: this.account,
            });
            this.txtAccount = txtAccount;
            var txtPassword = new PasswordTextBox({
                label: '密 码',
                name: 'password',
                required: true,
                style: {width: '200px'}
            });
            this.txtPassword = txtPassword;
            this.addItem(txtAccount);
            this.addItem(txtPassword);
            this.hideCancelButton();
            this._intervalid = setInterval(function () {
                me.checkLocking();
            }, appConfig.checkWithoutOperationLockDeskPeriodMilliseconds);
            this._apiTokenRefreshSubscribeHandler = topic.subscribe('/admin/api/token/refresh', function () {
                me.refreshLastActivedDt();
            });
            this._apiTokenExceptionSubscribeHandler = topic.subscribe('/admin/api/token/exception', function () {
                me.lock();
            });
        },
        refreshLastActivedDt: function () {
            this._lastActivedDt = new Date();
        },
        destroy: function () {
            this._intervalid && clearInterval(this._intervalid);
            this._apiTokenExceptionSubscribeHandler && this._apiTokenExceptionSubscribeHandler.remove();
            this._apiTokenRefreshSubscribeHandler && this._apiTokenRefreshSubscribeHandler.remove();
            this.inherited(arguments);
        },
        onSuccess: function (res) {
            this.txtPassword.set('value', '');
            this.unlock();
            this.setCurrentAccount(res);
        },
        onUnlock: function () {

        },
        onLock: function () {

        },
        isLock: function () {
            return this._isLock;
        },
        unlock: function () {
            var me = this;
            me._isLock = false;
            on.emit(me, 'Unlock');
            this._lastActivedDt = new Date();
            me.hide();
        },
        /**
         * 设置当前账号 必须实现实现的抽象方法
         */
        setCurrentAccount: function (account) {
            throw new Error('必须实现实现的抽象方法');
        },
        /**
         * 获取肖前路由routePath,必须实现实现的抽象方法
         */
        getCurrentRoute: function () {
            throw new Error('必须实现实现的抽象方法');
        },
        lock: function () {
            var me = this;
            if (me._isLock) return true;
            me._isLock = true;
            on.emit(me, 'Lock');
            this.show();
        },

        checkLocking: function () {
            var me = this;
            var routePath = me.getCurrentRoute();
            if (!(routePath && stringUtils.isEqualsIgnoreCase(routePath, '/main'))) {
                return false;
            }
            var expireDt = dojoDateUtils.add(this._lastActivedDt, 'millisecond', appConfig.withoutOperationLockDeskMilliseconds);
            if (dojoDateUtils.compare(new Date(), expireDt) > 0) {
                me.lock();
                return true;
            }
            return false;
        }
    });
});