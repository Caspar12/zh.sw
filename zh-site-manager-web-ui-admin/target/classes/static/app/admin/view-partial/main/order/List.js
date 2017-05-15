/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/List
 */
define([
    'admin/view-partial/main/common/BaseTitlePaneView',
    'zh/widget/layout/TitlePane',
    'zh/util/uiUtils',
    'admin/services/enums/OrderStatusEnum',
    'zh/util/log',
    'zh/util/enumUtil',
    'zh/core',
    'admin/view-partial/main/order/widget/Search',
    'admin/view-partial/main/order/widget/toolbar/Toolbar',
    'admin/view-partial/main/order/widget/table/Table',
    'admin/view-partial/main/order/widget/enums/OrderListShowSearchTextEnum',
    'admin/view-partial/main/order/widget/enums/OrderListTableColumnEnum',
    'admin/services/enums/OrderListPageViewEnum',
    'dojo/_base/lang',
    'dojo/on',
    'zh/widget/layout/TabContainer',
    'zh/widget/layout/ContentPane',
    'dojo/_base/array',
    'dijit/Viewport',
    "dojo/_base/declare"
], function (BaseTitlePaneView, TitlePane, uiUtils, OrderStatusEnum, log, enumUtil, zh, Search, Toolbar, Table, OrderListShowSearchTextEnum,
             OrderListTableColumnEnum, OrderListPageViewEnum, lang, on, TabContainer, ContentPane, array, Viewport, declare) {
    return declare([BaseTitlePaneView], {
        title: '',
        type: null,
        orderListPageViewEnum: OrderListPageViewEnum.WaitPlan,
        postMixInProperties: function () {
            this.inherited(arguments);
            this.resoleType();
            this.title = this.getTitleByType();
        },
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            if (this.orderListPageViewEnum === null) {
                return;
            }

            if (this.orderListPageViewEnum.container) {
                var tabContainerWidget = new TabContainer({
                    isLayoutContainer: true,
                    tabStrip: true,
                });
                tabContainerWidget.tablist.on('SelectChild', function (pane) {
                    if (!pane.isChildWidgetBuilded) {
                        var tabConfig = pane.tabConfig;
                        me.createWidgetBy(tabConfig);
                        pane.isChildWidgetBuilded = true;
                    } else {
                        pane.tableWidget.reload();
                    }
                });
                me.addChild(tabContainerWidget);

                array.forEach(this.orderListPageViewEnum.container.tab, function (tabConfig) {
                    var pane = new ContentPane({
                        title: tabConfig.title,
                        style: {"padding": "10px"},
                        isAutoFillToParentNode: true,
                        isContentAutoScroll: true,
                        autoFillToParentNodeObj: tabContainerWidget.containerNode,
                    });
                    tabContainerWidget.addChild(pane);
                    tabConfig.containerWidget = pane;
                    pane.tabConfig = tabConfig;
                    pane.isChildWidgetBuilded = false;

                });
            }
            else {
                me.orderListPageViewEnum.containerWidget = me;
                me.createWidgetBy(me.orderListPageViewEnum);
            }
        },
        startup: function () {
            var me = this;
            this.inherited(arguments);
        },
        createWidgetBy: function (options) {
            var me = this;
            options = lang.mixin({
                containerWidget: {},
                orderStatusEnum: {},
                orderListShowSearchTextEnum: {},
                orderListToolbarButtonsEnum: {},
                orderListTableColumnEnum: {},
            }, options);
            var diffDoms = [];

            var searchWidget = new Search({
                filters: options.orderListShowSearchTextEnum.filters,
                extraParam:options.orderListShowSearchTextEnum.extraParam,
            });
            options.containerWidget.addChild(searchWidget);
            options.containerWidget.searchWidget = searchWidget;
            var titlePane = new TitlePane({
                title: '订单列表',
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
                diffDom: [searchWidget.domNode],
            });
            options.containerWidget.addChild(titlePane);
            titlePane.resize();
            var toolbarWidget = undefined;
            if (options.orderListToolbarButtonsEnum) {
                toolbarWidget = new Toolbar({
                    buttonEnums: options.orderListToolbarButtonsEnum.buttons
                });
                diffDoms.push(toolbarWidget.domNode);
                titlePane.addChild(toolbarWidget);
            }

            options.containerWidget.toolbarWidget = toolbarWidget;
            var tableWidget = new Table({
                columnEnums: options.orderListTableColumnEnum.columns,
                heightAutoFillOpt: {
                    diffHeight: 10,
                    parentDom: titlePane.containerNode,
                    diffDoms: diffDoms
                },
            });

            titlePane.table = tableWidget;
            titlePane.addChild(tableWidget)

            options.containerWidget.tableWidget = tableWidget;

            searchWidget.on('Submit', function () {
                 tableWidget.reload();
            });
            searchWidget.on('ShowAfter', function () {
                titlePane.resize();
                tableWidget.resize();
            });
            searchWidget.on('HideAfter', function () {
                titlePane.resize();
                tableWidget.resize();
            });
            tableWidget.on('AjaxParamsProcessing', function (tableParams) {
                tableParams = lang.mixin(tableParams, searchWidget.getData());
                tableParams.status = array.map(zh.toArray(options.orderStatusEnum), function (item) {
                    return item.id;
                });
                return tableParams;
            });

            if (toolbarWidget) {
                toolbarWidget.getDatas = function () {
                    return tableWidget.getRowSelectedData();
                };
                toolbarWidget.on('ClickComplete', function () {
                    tableWidget.reload();
                });
            }
        },
        resoleType: function () {
            this.type = parseInt(this.routeParams.params.type);
            this.orderListPageViewEnum = enumUtil.getEnumByProperty(OrderListPageViewEnum, 'id', this.type);
            if (this.orderListPageViewEnum === null) {
                log.error('无法解析type:' + this.type);
            }
        },
        getTitleByType: function () {
            if (zh.isEmptyObject(this.orderListPageViewEnum)) {
                log.error('获取标题失败,根据type:' + this.type);
                return null;
            } else {
                return this.orderListPageViewEnum.title;
            }
        }
    });
});