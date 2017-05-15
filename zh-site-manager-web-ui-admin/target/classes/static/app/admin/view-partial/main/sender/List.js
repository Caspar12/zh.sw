/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/List
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
    'admin/view-partial/main/sender/widget/table/Table',
    'admin/view-partial/main/sender/widget/toolbar/Toolbar',
], function (BaseTitlePaneView, TitlePane, uiUtils, log, enumUtil, zh, lang, on, TabContainer, ContentPane, array, declare, Table, Toolbar) {
    return declare([BaseTitlePaneView], {
        title: '寄件信息管理',

        postMixInProperties: function () {
            this.inherited(arguments);

        },
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            var table = this.table = new Table({});
            var toolbar = this.toolbar = new Toolbar({});
            var titlePane = this.titlePane = new TitlePane({
                title: '发件人列表',

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

            });
            toolbar.getDatas = function () {
                var data = table.getRowSelectedData();
                return data;
            };
            toolbar.on('ClickComplete', function () {
                table.reload();
            });
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