/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/layout/BaseBorderContainerTop
 */
define([
    'zh/widget/layout/ContentPane',
    'zh/widget/layout/BaseBorderContainerTopTitle',
    'dojox/mvc/sync',
    "dojo/ready",
    "dojo/parser",
    "dojo/_base/declare",

], function (ContentPane, BaseBorderContainerTopTitle, sync, ready, parser, declare) {
    return declare([ContentPane], {
        title: '',
        region: "top",
        splitter: false,
        class: 'NormalFrameworkContainerTop',
        gutter: false,
        postCreate: function () {
            this.inherited(arguments);
            var topTitle = new BaseBorderContainerTopTitle();
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