/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/widget/form/Form
 */
define([
    "dijit/form/Form",
    'zh/widget/_base/_Container',
    'dojo-ext/dijit/form/_FormMixin',
    'dojo-ext/dijit/form/_FormMixinExtend',
    'zh/core',
    "dojo/request",
    'dojo/_base/lang',
    "dojo/_base/declare",
], function (Form, _Container, _FormMixin, _FormMixinExtend, zh, request, lang, declare) {
    Form.extend(_FormMixinExtend);
    var newForm = declare('zh/widget/form/Form', [Form, _Container], {
        encType: 'application/x-www-form-urlencoded',
        method: 'post',
        isAjax: false,
        createPromise: function (params) {
            var me = this;
            me.requestOptions = me.requestOptions || {method: me.method};
            params = params || {};
            lang.setObject('requestOptions.data', params, this);
            return me.request(me.action, me.requestOptions);
        },
        submit: function () {
            var me = this;
            if (me.validate() === false) return;
            if (me.isAjax) {
                me.submitAjax();
                return false;
            } else {
                me.inherited(arguments);
            }
        }
    });
    return newForm;
});