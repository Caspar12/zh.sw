/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/view/Register
 */
define([
    'zh/app/view/PageView',
    'admin/api/identityHttpService',
    'admin/util/context',
    'admin/util/viewRouter',
    'dojo/on',
    "dojo/_base/declare",
    "dojo/text!./templates/register.html",

    'admin/util/loginStateUtils',
    'dojo/_base/lang',
    "dojo/parser",
    'dijit/registry',
    "dojo/ready",
    'dojo/dom-class',
    'zh/app/util/hashUtils',
    'zh/core',

    'zh/util/stringUtils',
    'admin/util/tipUtils',
    "dijit/_WidgetsInTemplateMixin",
    'dijit/form/Form',
    'dijit/form/_FormValueWidget',
    'dojox/form/Manager',
], function (PageView, identityHttpService, context, viewRouter, on, declare, template, loginStateUtils, lang, parser, registry, ready, domClass, hashUtils
    , zh, stringUtils, tipUtils, _WidgetsInTemplateMixin, Form, _FormValueWidget, FormManager) {

    return declare([PageView, _WidgetsInTemplateMixin], {
        frmLoginPoint: null,
        txtAccountPoint: null,
        txtPasswordPoint: null,
        divInviterIdPoint: null,
        txtInviterIdPoint: null,
        txtInviterTextPoint: null,
        templateString: template,
        showDivInviterIdPoint: function () {
            domClass.remove(this.divInviterIdPoint, 'hide');
        },
        isHasInviterId: function () {
            return zh.isNotEmptyObject(this.getInviterIdParam());
        },
        getInviterIdParam: function () {
            return hashUtils.getParams().inviterId;
        },
        postCreate: function () {
            var me = this;
            me.inherited(arguments);

        },
        // 视图加载完成时候回调
        onLoaded: function (route) {
            var me = this;
            if (this.isHasInviterId()) {
                this.hide();
                identityHttpService.getAccountNameOrAccount({
                    data: {
                        accountId: this.getInviterIdParam()
                    }
                }).then({
                    success: function (res) {
                        if (zh.isNotEmptyObject(res)) {
                            me.txtInviterIdPoint.value = me.getInviterIdParam();
                            me.txtInviterTextPoint.value = '邀请人:' + res.accountOrName;
                        } else {
                            me.txtInviterIdPoint.value = me.getInviterIdParam();
                            me.txtInviterTextPoint.value = '该邀请链接失效';
                            tipUtils.warning('该邀请链接失效');
                        }
                    },
                    complete: function () {
                        me.show();
                        me.showDivInviterIdPoint();
                    }
                });
            } else {
                this.show();
            }
            on(me.frmLoginPoint, 'submit', function () {
                event.preventDefault();
                event.stopPropagation();
                lang.hitch(me, 'submit')(arguments);
                return false;
            });
        },
        submit: function () {
            var me = this;
            var data = me.frmLoginPoint.gatherFormValues({
                inviterId: '',
                password: '',
                confirmPassword: '',
                account: '',
                name: '',
            });
            var svcMethod = identityHttpService.register;
            var data = data;
            if (me.isHasInviterId()) {
                svcMethod = identityHttpService.registerByInvitation
            }
            svcMethod({
                data: data
            }).success(function (res) {
                loginStateUtils.setAccount(res);
                viewRouter.go('/main');
            });
            return false;
        }
    });
});