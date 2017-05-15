/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/List
 */
define([
    'admin/view-partial/main/common/BaseTitlePaneView',
    'zh/plugins/bootstrap/widget/layout/FormInline',
    'admin/widget/form/uploader/Uploader',
    'dojox/form/uploader/FileList',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'admin/util/dialogUtils',
    'zh/util/uiUtils',
    'zh/util/log',
    'zh/util/enumUtil',
    'zh/core',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/_base/array',
    "dojo/_base/declare",
    'dojo/query',
    'dojo/dom-class',
    'dojo/dom-attr',
    'dojo/dom-construct',
], function (BaseTitlePaneView, FormInline, Uploader, FileList, orderHttpService, apiConfig, dialogUtils, uiUtils, log, enumUtil, zh, lang, on, array, declare, query, domClass, domAttr, domConstruct) {


    return declare([BaseTitlePaneView], {
        title: '导入订单',
        content: '<div role="divDownloadInfo"></div><div role="divImportResultInfo"></div>',
        postMixInProperties: function () {
            this.inherited(arguments);
        },

        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            var myUploader = new Uploader({
                url: apiConfig.admin.order.importByExcel,
                label: '上传导入订单模板',
                name: 'file',
                onUploadBefore: function () {
                    me.hideDivImportResultInfoNode();
                },
                onSuccess: function (data) {
                    var uploadResultId = data;
                    me.setDownloadImportResult(uploadResultId);
                    window.open(me.getDownloadImportResultUrl(uploadResultId));
                }
            });

            this.addChild(myUploader);
        },
        setDownloadImportResult: function (resultId) {
            var me = this;
            var getImportResultUrl = me.getDownloadImportResultUrl(resultId);
            var html = lang.replace('<p class="bg-success" style="padding: 15px;">没有自动下载导入结果,请点击<a target="_blank" href="{url}">下载导入结果</a></p>', {url: getImportResultUrl});
            var divNode = me.getDivImportResultInfoNode();
            domAttr.set(divNode, 'innerHTML', html);
            this.showDivImportResultInfoNode();
        },
        getDownloadImportResultUrl: function (uploadResultId) {
            return apiConfig.admin.order.getImportResult + "?" + 'resultId=' + uploadResultId;
        },
        startup: function () {
            var me = this;
            this.inherited(arguments);
            orderHttpService.getImportOrderTemplateUrl().success(function (res) {
                var importTplMsgHtml = lang.replace('<p class="bg-info" style="padding: 15px;"><a href="{href}" role="downloadTpl" target="_blank" >下载导入订单模板</a></p>', {href: res});
                domAttr.set(me.getDivDownloadInfoNode(), 'innerHTML', importTplMsgHtml);
            });
        },
        getDivDownloadInfoNode: function () {
            return query('div[role="divDownloadInfo"]')[0];
        },
        getDivImportResultInfoNode: function () {
            return query('div[role="divImportResultInfo"]')[0];
        },
        hideDivImportResultInfoNode: function () {
            this.getDivImportResultInfoNode().style.display = 'none';
        },
        showDivImportResultInfoNode: function () {
            this.getDivImportResultInfoNode().style.display = '';
        },
    });
});