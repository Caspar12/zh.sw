/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    "dijit/form/Form",
    "dojo/request",
    'dojo/_base/lang',
    "dojo/_base/declare",
], function (Form, request, lang, declare) {
    return declare([Form], {
        encType: 'application/x-www-form-urlencoded',
        isAjax: true,
        method: 'post',
        request: request,
        requestOptions: null,
        success: function () {
        },
        error: function () {
        },
        process: function () {
        },
        createPromise: function (params) {
            var me = this;
            lang.setObject('me.requestOptions.data', params);
            return me.request(me.action, me.requestOptions);
        },
        submit: function () {
            var me = this;
            event.preventDefault();
            event.stopPropagation();
            if (me.validate() === false) return;
            var params = me.get('value');
            if (me.isAjax) {
                me.promise = me.createPromise(params);
                me.promise.then(
                    function () {
                        me.success.apply(me, arguments);
                    },
                    function () {
                        me.error.apply(me, arguments);
                    },
                    function () {
                        me.process.apply(me, arguments);
                    }
                );
            } else {
                me.inherited(arguments);
            }
        }
    });
});