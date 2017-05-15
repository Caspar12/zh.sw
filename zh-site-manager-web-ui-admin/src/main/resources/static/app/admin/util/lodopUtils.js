/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file admin/util/lodopUtils
 */
define([
    'jquery',
    'admin/util/pageTransitionsUtils',
    'admin/util/tipUtils',
    'zh/plugins/lodop/LodopUtils',
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    'zh/util/datetimeUtils',
    'zh/core',
    'admin/util/tipUtils',
    'zh/util/log',
    'admin/util/dialogUtils',
    'zh/app/exceptions/ValidationException',
    'dojo/on',
    'zh/util/stringUtils',
], function ($, pageTransitionsUtils, tipUtils, LodopUtils, declare, lang, array, datetimeUtils, zh, tipUtils, log, dialogUtils, ValidationException,
             on, stringUtils) {

    var AdminLodopUtils = declare('admin/util/LodopUtils', [LodopUtils], {
        downloadPrintComponentUrl: '/download/Print_Setup_for_Win32NT_2.102.exe',
        checkIsInstallAndPrintComponentReadyState: function () {
            var me = this;
            var lodop = me.getLodop();

            function throwLodopNotReady() {
                var msg = '如果已经下载打印组件,请启动打印组件,或者<a href="' + me.downloadPrintComponentUrl + '" target="_blank">下载</a>打印组件,之后刷新页面';
                throw new ValidationException({
                    message: msg
                });
            }

            if (!lodop) {
                throwLodopNotReady();
            }
            lodop.onComponentNotReady = function () {
                tipUtils.warning('请启动打印组件,之后刷新页面');
            };
            var checkIsInstall = this.checkIsInstall({
                getLodopNotReadyFn: function () {
                    throw new ValidationException({message: '请启动打印组件,之后刷新页面'});
                },
                getLodopErrorFn: function () {
                    throwLodopNotReady();
                }
            });
            // if (checkIsInstall) {
            //     if (!this.checkPrintComponentIsReady()) {
            //         throw new ValidationException({message: '请启动打印组件,之后刷新页面'});
            //     }
            // }
            return checkIsInstall;
        },
        openWaybillTemplateDesigner: function (opt) {
            var me = this;
            me.checkIsInstallAndPrintComponentReadyState();
            opt = lang.mixin({
                parentWaybillTemplate: {},
                templateContent: '',
                templateWidth: 0,
                templateHeight: 0,
                templateName: '',
                templateOffsetTop: 0,
                templateOffsetLeft: 0,
                onCloseAfter: function (taskId, newTemplateContent) {

                },
                onCompileError: function (error) {
                    tipUtils.warning('打印模板解析错误');
                    throw new e;
                }
            }, opt);
            var bgImg = '';
            if (opt.parentWaybillTemplate.systemFlag) {
                bgImg = require.toUrl(opt.parentWaybillTemplate.previewBgImgUrl);
            }
            opt.templateContent = opt.templateContent.replace(/\{bgImg\}/ig, bgImg);
            this.inherited('openTemplateDesigner', arguments);
        },
        openPreviewForTableHtml: function () {
            var me = this;
            me.checkIsInstallAndPrintComponentReadyState();
            this.inherited(arguments);
        },
        /**
         * 有分页的打印预览
         * @param opt
         */
        openPreviewPageForOrders: function (opt) {
            this._printPageOrOpenPreviewPageForOrders(opt, false);
        },
        /**
         * 打印有分页
         * @param opt
         */
        printPageForOrders: function (opt) {
            this._printPageOrOpenPreviewPageForOrders(opt, true);
        },
        printPageOrOpenPreviewPageForOrders: function (opt, isPrint) {
            var me = this;
            me.checkIsInstallAndPrintComponentReadyState();
            opt = lang.mixin({
                sender: {
                    name: '',
                    companyName: '',
                    address: '',
                    contact: '',
                },
                waybillTemplate: {},
                templateContent: '',
                templateData: [],
                templateWidth: 0,
                templateHeight: 0,
                templateName: '',
                previewType: undefined,

                mergeTemplate: function (params) {
                    var templateContent = params.templateContent;
                    var data = params.templateData;
                    var opt = params.options;
                    var waybillTemplate = opt.waybillTemplate;
                    var now = new Date();
                    var bgImg = '';
                    if (waybillTemplate.systemFlag) {
                        bgImg = require.toUrl(waybillTemplate.previewBgImgUrl);
                    }
                    var mergeTemplateContent = stringUtils.replace(templateContent, {
                        "bgImg": bgImg,
                        "发件公司": lang.getObject('sender.companyName', false, opt) || '',
                        "发件人": lang.getObject('sender.name', false, opt) || '',
                        "发件地址": lang.getObject('sender.address', false, opt) || '',
                        "发件人电话": lang.getObject('sender.contact', false, opt) || '',
                        "收件人": lang.getObject('recevier', false, data) || '',
                        "收件人地址": lang.getObject('recevierAddress', false, data) || '',
                        "收件人联系方式": lang.getObject('recevierContact', false, data) || '',
                        "内装货品": lang.getObject('orderItemsNameAndCountText', false, data) || '',
                        "包裹类型": lang.getObject('packageTypeText', false, data) || '',
                        "快递公司": lang.getObject('deliverName', false, data) || '',
                        "订单号": lang.getObject('tpOrderId', false, data) || '',
                        "波次号": lang.getObject('deliveryPlanSerialNumber', false, data) || '',
                        "订单客户": lang.getObject('tpName', false, data) || '',
                        "订单区域": lang.getObject('tpArea', false, data) || '',
                        "发货计划": lang.getObject('deliveryPlanName', false, data) || '',
                        "订单备注": lang.getObject('tpOrderRemark', false, data) || '',
                        "发件日期": datetimeUtils.format(now, 'yyyy-MM-dd HH:mm:ss')
                    });

                    return mergeTemplateContent;
                },
                onCompileError: function (e) {
                    tipUtils.warning('打印模板解析错误');
                    throw new e;
                },
                onCloseAfter: function (taskId, value) {
                }
            }, opt);

            isPrint ? me.printPage(opt) : me.openPreviewPage(opt);
        },
    });
    var lodopUtils = new AdminLodopUtils();
    return lodopUtils;
});