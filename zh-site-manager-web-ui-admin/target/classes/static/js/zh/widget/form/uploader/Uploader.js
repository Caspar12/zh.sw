/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/form/uploader/Uploader
 */
define([
    'dojox/form/Uploader',
    'zh/core',
    "dojo/request",
    'dojo/_base/lang',
    "dojo/_base/declare",
    'dojo/on',
    'dojo/aspect',
], function (Uploader, zh, request, lang, declare, on, aspect) {
    Uploader = dojox.form.Uploader;
    return declare([Uploader], {
        url: undefined,
        uploadOnSelect: true,
        multiple: false,
        label: '上传文件',
        extraParams: {},
        postCreate: function () {
            this.inherited(arguments);
            aspect.before(this, 'upload', lang.hitch(this, '_uploadBefore'));
            aspect.before(this, 'upload', lang.hitch(this, 'onUploadBefore'));
        },
        //	force: String
        //		options: form, html5, iframe, flash
        //		Empty string defaults to html5 if available, and iframe if not.
        // 		Use "flash" to always use Flash (and hopefully force the user to download the plugin
        //		if they don't have it).
        //		Use "iframe" to always use an iframe, and never flash nor html5. Sometimes preferred
        //		for consistent results.
        //		Use "form" to not use ajax and post to a page.
        force: "flash",
        /**
         * {function | string} 可选参数,response判断业务是否正确
         *
         */
        ajaxResultSuccessParamNameOrFn: undefined,
        ajaxResultDataParamNameOrFn: undefined,
        onUploadBefore: function () {

        },
        upload: function (formData) {
            formData = formData || {};
            lang.mixin(formData, this.extraParams);
            this.inherited(arguments);
        },
        submit: function () {
            this.inherited(arguments);
        },
        onComplete: function (res) {
            this.inherited(arguments);
            if (this.ajaxResultSuccessParamNameOrFn) {
                var isSuccess = zh.isFunction(this.ajaxResultSuccessParamNameOrFn) ? this.ajaxResultSuccessParamNameOrFn(res) : res[this.ajaxResultSuccessParamNameOrFn];
                if (isSuccess) {
                    var data = res;
                    if (zh.isNotEmptyObject(this.ajaxResultDataParamNameOrFn)) {
                        data = zh.isFunction(this.ajaxResultDataParamNameOrFn) ? this.ajaxResultDataParamNameOrFn(res) : res[this.ajaxResultDataParamNameOrFn];
                    }
                    on.emit(this, 'Success', data);

                } else {

                    on.emit(this, 'Failure', res);
                }
            }
        },
        onSuccess: function (data) {

        },
        onFailure: function () {

        },
        createXhr: function () {
            var xhr = this.inherited(arguments);
            xhr.timeout = this.serverTimeout || 60 * 1000;
            return xhr;
        }
    });
});