/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/List
 */
define([
    'admin/view-partial/main/common/BaseTitlePaneView',
    'zh/util/uiUtils',
    'admin/view-partial/main/order/widget/dialog/DeliveryPlanPreviewDialog',
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
    'admin/view-partial/main/order/widget/table/DeliveryPlanPreviewProductTable',
    "dojo/_base/declare",
    'dijit/form/Button',
    'admin/view-partial/main/order/widget/dialog/EditOrderDialog',
    'zh/app/exceptions/ValidationException',
], function (BaseTitlePaneView, uiUtils, DeliveryPlanPreviewDialog, OrderStatusEnum, log, enumUtil, zh, Search, Toolbar, Table, OrderListShowSearchTextEnum,
             OrderListTableColumnEnum, OrderListPageViewEnum, lang, on, TabContainer, ContentPane, array, Viewport
    , DeliveryPlanPreviewProductTable, declare, Button, EditOrderDialog, ValidationException) {


    return declare([BaseTitlePaneView], {
        title: 'test',
        tableParams: undefined,

        postMixInProperties: function () {

            this.inherited(arguments);
        },
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            ( new EditOrderDialog()).show();


        },
        startup: function () {
            var me = this;
            this.inherited(arguments);
        },

    });
});