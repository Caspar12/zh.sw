/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/List
 */
define([
    'admin/view-partial/main/common/BaseTitlePaneView',
    'zh/widget/layout/TitlePane',
    'zh/util/uiUtils',
    'zh/util/log',
    'zh/util/enumUtil',
    'zh/core',
    'dojo/_base/lang',
    'dojo/on',
    'zh/widget/layout/TabContainer',
    'zh/widget/layout/ContentPane',
    'dojo/_base/array',
    "dojo/_base/declare",
    'admin/widget/SearchContainer',
    'admin/view-partial/main/waybill-template/widget/table/Table',
    'admin/view-partial/main/waybill-template/widget/toolbar/Toolbar',
    'admin/view-partial/main/waybill-template/widget/form/value-widget/TemplateNameText',
], function (BaseTitlePaneView, TitlePane, uiUtils, log, enumUtil, zh, lang, on, TabContainer, ContentPane, array, declare, SearchContainer, Table, Toolbar,
             TemplateNameText) {
    return declare([BaseTitlePaneView], {
        title: '快递单打印模板管理',
        postMixInProperties: function () {
            this.inherited(arguments);

        },
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            var searchContainer = new SearchContainer({
                filters: [
                    {
                        ztype: 'admin/view-partial/main/waybill-template/widget/form/value-widget/TemplateNameText',
                    }
                ]
            });
            var titlePane = new TitlePane({
                title: '快递单打印模板列表',
                style: 'margin-top:5px;',
                isAutoResize: true,
                /**
                 * 内容是否自动显示滚动
                 */
                isContentAutoScroll: true,
                isParentCalcByContentBox: true,
                /**
                 * 填充父容器
                 */
                isAutoFillToParentNode: true,
                isAutoWidth: false,
                contentDiffHeight: 5,
                diffDom: [searchContainer.domNode],
            });
            var diffDoms = [];
            var toolbar = this.toolbar = new Toolbar({});
            diffDoms.push(toolbar.domNode);
            var table = this.table = new Table({
                heightAutoFillOpt: {
                    diffHeight: 10,
                    parentDom: titlePane.containerNode,
                    diffDoms: diffDoms
                },
            });


            toolbar.getDatas = function () {
                var data = table.getRowSelectedData();
                return data;
            };
            toolbar.on('ClickComplete', function () {
                table.reload();
            });
            searchContainer.on('Submit', function () {
                table.reload();
            });
            searchContainer.on('ShowAfter', function () {
                table.resize();
            });
            searchContainer.on('HideAfter', function () {
                table.resize();
            });
            table.on('AjaxParamsProcessing', function (tableParams) {
                tableParams = lang.mixin(tableParams, searchContainer.getData());

                return tableParams;
            });

            this.addChild(searchContainer);
            titlePane.addChild(toolbar);
            titlePane.addChild(table);
            this.addChild(titlePane);
        },
        startup: function () {
            var me = this;
            this.inherited(arguments);
        },

    });
});