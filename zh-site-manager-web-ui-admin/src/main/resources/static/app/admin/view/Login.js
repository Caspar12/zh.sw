/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/view/Login
 */
define([
    'zh/app/view/PageView',
    'admin/api/identityHttpService',
    'admin/util/context',
    'admin/util/viewRouter',
    'dojo/on',
    "dojo/_base/declare",
    "dojo/text!./templates/login.html",
    'admin/util/loginStateUtils',
    'dojo/_base/lang',
], function (PageView, identityHttpService, context, viewRouter, on, declare, template, loginStateUtils, lang) {
    return declare(PageView, {
        frmLoginPoint: null,
        errorMsgPoint: null,
        txtAccountPoint: null,
        txtPasswordPoint: null,
        _setErrorMsgAttr: {node: 'errorMsgPoint', type: 'innerHTML'},
        _setAccountAttr: {node: 'txtAccountPoint', type: 'value'},
        _getAccountAttr: function () {
            return this.txtAccountPoint.value;
        },
        _setPasswordAttr: {node: 'txtPasswordPoint', type: 'value'},
        _getPasswordAttr: function () {
            return this.txtPasswordPoint.value;
        },
        templateString: template,
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
            on(me.frmLoginPoint, 'submit', function () {
                event.preventDefault();
                event.stopPropagation();
                lang.hitch(me, 'submit')(arguments);
                return false;
            });
        },
        submit: function () {
            event.preventDefault();
            event.stopPropagation();
            var account = this.get('account');
            var password = this.get('password');
            identityHttpService.login({
                data: {
                    account: account, password: password
                }
            }).success(function (res) {
                loginStateUtils.setAccount(res);
                viewRouter.go('/main');
            });
            return false;
        }
    });
});