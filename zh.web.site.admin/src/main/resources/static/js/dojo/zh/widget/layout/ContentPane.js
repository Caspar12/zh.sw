/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description extend dijit/layout/ContentPane
 * @file zh/widget/layout/ContentPane
 */
define([
    'zh/widget/_base/_WidgetBase',
    'dijit/layout/ContentPane',
    "dojo/_base/declare",
], function (_WidgetBase, ContentPane, declare) {
    return declare([ContentPane, _WidgetBase], {});
});