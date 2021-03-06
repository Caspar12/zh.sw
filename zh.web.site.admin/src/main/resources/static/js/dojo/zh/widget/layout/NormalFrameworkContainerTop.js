/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/layout/NormalFrameworkContainerTop
 */
define([
    'zh/widget/layout/ContentPane',
    'zh/widget/layout/NormalFrameworkContainerTopTitle',
    'dojox/mvc/sync',
    "dojo/ready",
    "dojo/parser",
    "dojo/_base/declare",

], function (ContentPane, NormalFrameworkContainerTopTitle, sync, ready, parser, declare) {
    return declare([ContentPane], {
        title: '',
        region: "top",
        splitter: false,
        class: 'NormalFrameworkContainerTop',
        gutter: false,
        postCreate: function () {
            this.inherited(arguments);
            var topTitle = new NormalFrameworkContainerTopTitle();
            topTitle.placeAt(this);
            topTitle.startup();
            this.topTitle = topTitle;
            sync(this, 'title', topTitle, 'title');
            sync(this, 'subTitle', topTitle, 'subTitle');
        },
        /**
         *
         * @param menuItem   zh/widget/menu/MenuItem
         */
        addTooltipDialogMenuItem: function (menuItem){
            this.topTitle.addTooltipDialogMenuItem(menuItem);
        }
    });
});