/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/plugins/lodop/LodopUtils
 */
(function () {
    //====页面动态加载C-Lodop云打印必须的文件CLodopfuncs.js====
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var oscript;
// //让其它电脑的浏览器通过本机打印（仅适用C-Lodop自带的例子）：
// var oscript = document.createElement("script");
// oscript.src = "/CLodopfuncs.js";
// head.insertBefore(oscript, head.firstChild);
    function init() {
        if (!LODOP.isInit) {
            LODOP.isInit = true;
            LODOP.wsSend = function (strData) {
                if (!this.SocketEnable) return;
                if (this.webskt && this.webskt.readyState == 1) {
                    this.Result = null;
                    this.iTrySendTimes = 0;
                    this.webskt.send(strData);
                    return true;
                } else {
                    this.onComponentNotReady && this.onComponentNotReady();
                    //alert("WebSocket没准备好，点确定继续...");
                    // this.iTrySendTimes++;
                    // if (this.iTrySendTimes <= 1) {
                    //     setTimeout(CLODOP.wsSend(strData), 500);
                    // } else {
                    //     this.OpenWebSocket();
                    // }
                }
            };
        }
    }

//让本机的浏览器打印(更优先一点)：
    oscript = document.createElement("script");
    oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=2";
    oscript.async = false;
    oscript.type = 'text/javascript';
    oscript.onload = init;
    head.insertBefore(oscript, head.firstChild);

//加载双端口(8000和18000）避免其中某个端口被占用：
    oscript = document.createElement("script");
    oscript.src = "http://localhost:18000/CLodopfuncs.js?priority=1";
    oscript.async = false;
    oscript.type = 'text/javascript';
    oscript.onload = init;
    head.insertBefore(oscript, head.firstChild);

})(window);

define([
    'jquery',
    'dojo/Stateful',
    'zh/plugins/lodop/Table',
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    'zh/util/datetimeUtils',
    'zh/util/linq',
    'zh/util/stringUtils',
    'zh/util/domUtils',
    'zh/core',
    'dojo/on',
    'dojo/_base/lang',
], function ($, Stateful, Table, declare, lang, array, datetimeUtils, linq, stringUtils, domUtils, zh, on, lang) {


    var LodopUtils = declare('zh/plugins/lodop/LodopUtils', [Stateful], {
        getCLodop: function () {
            var lodop = window['getCLodop']();

            return lodop;
        },
        needCLodop: function () {
            return true;
        },
        openTemplateDesigner: function (opt) {
            var me = this;
            opt = lang.mixin({
                templateContent: '',
                templateWidth: 0,
                templateHeight: 0,
                templateName: '',
                templateOffsetTop: 0,
                templateOffsetLeft: 0,
                onCloseAfter: function (taskId, newTemplateContent) {

                },
                onCompileError: function (error) {

                }
            }, opt);

            var templateContent = opt.templateContent;
            var templateContentOffset = {
                top: opt.templateOffsetTop,
                left: opt.templateOffsetLeft,
            };
            templateContent = me._removeCommands(templateContent, ['LODOP.PRINT_INITA', 'LODOP.SET_PRINT_PAGESIZE']);
            var LODOP = this.getLodop();
            var printInitaCmdWidthParam = this.convertIntMMToStringMM(opt.templateWidth);
            var printInitaCmdHeightParam = this.convertIntMMToStringMM(opt.templateHeight);
            LODOP.PRINT_INITA(templateContentOffset.top, templateContentOffset.left,
                printInitaCmdWidthParam, printInitaCmdHeightParam, opt.templateName);
            LODOP.SET_PRINT_PAGESIZE(0, opt.templateWidth, opt.templateHeight, 'CreateCustomPage');
            LODOP.SET_PRINT_MODE('CREATE_CUSTOM_PAGE_NAME', opt.templateName);
            try {
                eval(templateContent);
            } catch (e) {
                e.templateContent = templateContent;
                if (opt.onCompileError) {
                    opt.onCompileError(e);
                } else {
                    throw new e;
                }
            }

            LODOP.On_Return = opt.onCloseAfter;
            LODOP.PRINT_DESIGN(opt.previewType);
        },
        /**
         * ====获取LODOP对象的主过程：====
         * @param oOBJECT
         * @param oEMBED
         * @param getLodopNotReadyFn
         * @param getLodopErrorFn
         * @return {object} LODOP对象的主过程
         */
        getLodop: function (opt) {
            opt = lang.mixin({
                oOBJECT: undefined,
                oEMBED: undefined,
                getLodopNotReadyFn: undefined,
                getLodopErrorFn: undefined
            }, opt)
            var LODOP;
            var me = this;
            try {
                LODOP = me.getCLodop();

                if (!LODOP && document.readyState !== "complete") {
                    opt.getLodopNotReadyFn && opt.getLodopNotReadyFn();
                    return null;
                }


                //清理原例子内的object或embed元素，避免乱提示：
                if (opt.oEMBED && opt.oEMBED.parentNode) opt.oEMBED.parentNode.removeChild(opt.oEMBED);
                if (opt.oOBJECT && opt.oOBJECT.parentNode) opt.oOBJECT.parentNode.removeChild(opt.oOBJECT);


                return LODOP;
            } catch (err) {
                opt.getLodopErrorFn && opt.getLodopErrorFn(err);
            }
        },
        /**
         * ====获取LODOP对象的主过程：====
         * @param oOBJECT
         * @param oEMBED
         * @param getLodopNotReadyFn
         * @param getLodopErrorFn
         * @return {boolean} true or false
         */
        checkIsInstall: function (opt) {
            var LODOP = this.getLodop(opt);
            if (LODOP && LODOP.VERSION) {
                return true;
            }
            return false;
        },
        checkPrintComponentIsReady: function () {
            var LODOP = this.getLodop();
            return this.checkIsInstall() && LODOP.webskt && LODOP.readyState == 1;
        },

        openPreviewForTableHtml: function (opt) {
            var me = this;
            opt = $.extend(true, {
                tablePagers: [],
                pagerTemplate: "<span tdata='pageNO'>第##页</span>/<span tdata='pageCount'>共##页</span>",
                pagerHeight: '100'
            }, opt);
            var LODOP = this.getLodop();
            LODOP.PRINT_INIT('打印预览');

            var LODOPIndex = 0;
            var LODOPTableId = 0;
            array.forEach(opt.tablePagers, function (tablePager, index) {
                if (index > 0) {
                    LODOP.NewPageA();

                }
                tablePager = $.extend({
                    title: undefined,
                    titleTemplate: '<h2>{title}</h2>',
                    subTitle: undefined,
                    subTitleTemplate: '<h3>{subTitle}</h3>',
                    tableTopHtml: undefined,
                    tableColumns: [],
                    tableData: [],
                    tableHeight: "BottomMargin:10%",
                    tableBottomHtml: undefined,
                    tableBottomHtmlTop: '80%',
                    printWidth: '90%',
                    printLeftPadding: '5%',
                    marginTop: 15,
                }, tablePager);
                var table = new Table({
                    data: tablePager.tableData,
                    columns: tablePager.tableColumns
                });
                var tableHtml = table.getTableHtml();
                var jqTitleDiv;
                if (stringUtils.isNotBlank(tablePager.title)) {
                    jqTitleDiv = jqTitleDiv || $('<div style="text-align: center;"></div>');
                    var titleHtml = lang.replace(tablePager.titleTemplate, tablePager);
                    var jqTitle = $(titleHtml);
                    jqTitleDiv.append(jqTitle);
                }
                if (stringUtils.isNotBlank(tablePager.subTitle)) {
                    jqTitleDiv = jqTitleDiv || $('<div style="display: none;></div>');
                    var subTileHtml = lang.replace(tablePager.subTitleTemplate, tablePager);
                    var jqSubTitle = $(subTileHtml);
                    jqTitleDiv.append(jqSubTitle);
                }
                var jqTableTopDiv;
                if (stringUtils.isNotBlank(tablePager.tableTopHtml)) {
                    jqTableTopDiv = jqTableTopDiv || $('<div></div>');
                    var jqTableTopHtml = $(tablePager.tableTopHtml);
                    jqTableTopDiv.append(jqTableTopHtml);
                }
                var jqTitleDivHeight = jqTitleDiv ? 100 : 0;
                var jqTableTopDivHeight = jqTableTopDiv ? 100 : 0;

                var tableTop = tablePager.marginTop + jqTitleDivHeight + jqTableTopDivHeight;

                var jqTableBottomDiv;
                if (stringUtils.isNotBlank(tablePager.tableBottomHtml)) {
                    jqTableBottomDiv = jqTableBottomDiv || $('<div></div>');
                    var jqTableBottomDivHtml = $(tablePager.tableBottomHtml);
                    jqTableTopDiv.append(jqTableBottomDivHtml);
                }


                // 表格
                LODOP.ADD_PRINT_TABLE(tableTop, tablePager.printLeftPadding, tablePager.printWidth, tablePager.tableHeight, tableHtml);
                LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
                LODOPTableId = ++LODOPIndex;

                // 表格标题
                if (jqTitleDiv) {
                    LODOP.ADD_PRINT_HTM(0 + tablePager.marginTop, tablePager.printLeftPadding, tablePager.printWidth, jqTitleDivHeight, domUtils.outerHTML(jqTitleDiv));
                    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);

                    LODOP.SET_PRINT_STYLEA(0, "LinkedItem", LODOPTableId);
                    ++LODOPIndex;
                }

                // 表格顶部内容
                if (jqTableTopDiv) {

                    LODOP.ADD_PRINT_HTM(jqTitleDivHeight + 10, tablePager.printLeftPadding, tablePager.printWidth, jqTableTopDivHeight, domUtils.outerHTML(jqTableTopDivHeight));
                    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
                    LODOP.SET_PRINT_STYLEA(0, "LinkedItem", LODOPTableId);
                    ++LODOPIndex;
                }

                // 表格底部内容
                if (jqTableBottomDiv) {
                    LODOP.ADD_PRINT_HTM(tablePager.tableBottomHtmlTop, tablePager.printLeftPadding, tablePager.printWidth, jqTableBottomDiv.height(), domUtils.outerHTML(jqTableBottomDiv));
                    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
                    LODOP.SET_PRINT_STYLEA(0, "LinkedItem", LODOPTableId);
                    ++LODOPIndex;
                }

            });
            // 页码
            LODOP.ADD_PRINT_HTM(1, 600, 300, opt.pagerHeight, opt.pagerTemplate);
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
            LODOP.SET_PRINT_STYLEA(0, "HOrient", 1);
            LODOP.PREVIEW();
        },

        /**
         * 删除某些命令
         * @param {string | array} cmd
         * @private
         */
        _removeCommands: function (command, removeCmds) {
            removeCmds = zh.toArray(removeCmds);
            var arrCommand = command.split(';');
            var results = [];
            array.forEach(arrCommand, function (commandLine) {
                var isRemove = linq.From(removeCmds).Where(function (removeCmd) {
                    return commandLine.indexOf(removeCmd) !== -1;
                }).Any();
                if (!isRemove) results.push(commandLine);
            });

            return results.join(';');
        },
        /**
         * 立刻打印有分页的模板
         * @param opt
         */
        printPage: function (opt) {
            var me = this;
            me._printOrOpenPreviewPageTemplateHandler(opt);
            var LODOP = this.getLodop();
            LODOP.PRINT();

        },
        /**
         * 当前页面打开打印预览
         * @param {object} opt
         * @param {string} printHtml 打印预览内容html格式
         * @param {string} previewWindowTitle 打印预览窗口标题
         */
        openPreviewHtmlForCurrentPageStyle: function (opt) {
            opt = lang.mixin({
                printHtml: '',
                previewWindowTitle: '打印预览'
            }, opt);
            var me = this;
            var LODOP = me.getLodop();
            var strStyleCSS = array.map($('link'), function (link) {
                return domUtils.outerHTML(link);
            }).join('');
            var strFormHtml = "<head>" + strStyleCSS + "</head><body>" + opt.printHtml + "</body>";
            LODOP.PRINT_INIT(opt.previewWindowTitle);
            LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 1000, 800, opt.previewWindowTitle);
            LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', strFormHtml);
            LODOP.PREVIEW();
        },
        _addCurrentPageStyleCommand: function () {
            var me = this;
            var LODOP = me.getLodop();
            var strStyleCSS = array.map($('link'), function (link) {
                return domUtils.outerHTML(link);
            }).join('');
            LODOP.ADD_PRINT_HTM(0, 0, '0', '0', strStyleCSS);
        },
        /**
         * 有分页的打印预览
         * @param opt
         */
        openPreviewPage: function (opt) {
            var me = this;
            me._printOrOpenPreviewPageTemplateHandler(opt);
            var LODOP = this.getLodop();
            LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 1000, 800, opt.previewWindowTitle);
            LODOP.PREVIEW(opt.previewType);
        },
        _printOrOpenPreviewPageTemplateHandler: function (opt) {
            var me = this;
            opt = lang.mixin({
                templateContent: '',
                templateData: [],
                templateWidth: 0,
                templateHeight: 0,
                templateName: '',
                /**
                 * undefined:打开window窗口
                 * _dialog:web弹出对话框
                 * _blank :web新窗口
                 * _self:web在本窗口
                 * _top :web新窗口
                 * _parent:web本窗口
                 */
                previewType: undefined,
                previewWindowTitle: '打印预览',
                mergeTemplate: function (templateContent, data) {
                    return lang.replace(templateContent, data);
                },
                onCompileError: function (mergeTemplateCmd) {

                },
                onCloseAfter: function () {

                }
            }, opt);
            var templateData = zh.toArray(opt.templateData);
            var templateContent = opt.templateContent;
            var templateContentOffset = me.getOffsetFromTemplateContent(templateContent);
            templateContent = me._removeCommands(templateContent, ['LODOP.PRINT_INITA', 'LODOP.SET_PRINT_PAGESIZE']);
            var LODOP = this.getLodop();
            var printInitaCmdWidthParam = this.convertIntMMToStringMM(opt.templateWidth);
            var printInitaCmdHeightParam = this.convertIntMMToStringMM(opt.templateHeight);
            LODOP.PRINT_INITA(templateContentOffset.top, templateContentOffset.left,
                printInitaCmdWidthParam, printInitaCmdHeightParam, opt.templateName);
            LODOP.SET_PRINT_PAGESIZE(0, opt.templateWidth, opt.templateHeight, 'CreateCustomPage');
            LODOP.SET_PRINT_MODE('CREATE_CUSTOM_PAGE_NAME', opt.templateName);

            var mergeTemplateCmds = array.map(templateData, function (data) {
                return {
                    mergeTemplate: opt.mergeTemplate({
                        templateData: data,
                        templateContent: templateContent,
                        options: opt
                    }),
                    templateData: data,
                    templateContent: templateContent
                };
            });
            array.forEach(mergeTemplateCmds, function (mergeTemplateCmd) {
                LODOP.NewPage();
                try {
                    eval(mergeTemplateCmd.mergeTemplate);
                } catch (e) {
                    e.mergeTemplateCmd = mergeTemplateCmd;
                    if (opt.onCompileError) {
                        opt.onCompileError(e);
                    } else {
                        throw new e;
                    }
                }
            });
            LODOP.On_Return = opt.onCloseAfter;
        },
        getOffsetFromTemplateContent: function (templateContent) {
            var matchs = templateContent.match('LODOP.PRINT_INITA.*;');
            if (zh.isEmptyObject(matchs)) {
                return {
                    top: 0,
                    left: 0
                };
            }
            var matchValue = matchs[0];
            matchValue = matchValue.replace('LODOP.PRINT_INITA(', '');
            matchValue = matchValue.replace(');', '');
            var params = matchValue.split(',');
            return {
                top: params[0],
                left: params[1]
            };
        },
        convertIntMMToStringMM: function (intMM) {
            return intMM ? intMM / 10 + 'mm' : '0MM';
        }
    });
    return LodopUtils;
});