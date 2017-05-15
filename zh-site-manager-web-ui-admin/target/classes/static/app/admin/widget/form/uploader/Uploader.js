/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file admin/widget/form/uploader/Uploader
 */
define([
    'zh/widget/form/uploader/Uploader',
    'zh/core',
    "dojo/request",
    'dojo/_base/lang',
    "dojo/_base/declare",
    'dojo/on',
    'admin/util/pageTransitionsUtils',
    'admin/util/tipUtils',
    'admin/util/loginStateUtils',
], function (Uploader, zh, request, lang, declare, on, pageTransitionsUtils, tipUtils, loginStateUtils) {
    return declare([Uploader], {
        url: undefined,
        uploadOnSelect: true,
        multiple: false,
        label: '上传文件',
        extraParams: {},
        serverTimeout: 2 * 60 * 1000,
        force: "",
        /**
         * {function | string} 可选参数,response判断业务是否正确
         *
         */
        ajaxResultSuccessParamNameOrFn: 'success',
        ajaxResultDataParamNameOrFn: 'data',

        _uploadBefore: function () {
            pageTransitionsUtils.show();
            lang.mixin(this.extraParams, loginStateUtils.getCurrentTokenHeaderObject());
        },
        onUploadBefore: function () {

        },
        onSuccess: function (data) {

        },
        onFailure: function (res) {
            if (res && res.message) {
                tipUtils.warning(res.message);
            }
        },
        onComplete: function () {
            this.inherited(arguments);
            pageTransitionsUtils.hide();
        },
        onError: function () {
            tipUtils.danger('业务异常,请稍候重试');
            this.inherited(arguments);
        },
    });
});