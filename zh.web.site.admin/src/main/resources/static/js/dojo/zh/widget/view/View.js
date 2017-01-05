/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,基本视图
 */
define([
    'dijit/layout/ContentPane',
    "zh/widget/_base/_WidgetBase",
    "dojo/_base/declare",
    //"dojo/text!./login.html"
], function (ContentPane, _WidgetBase, declare) {
    return declare([ContentPane, _WidgetBase,], {
        baseClass: '',
        title: '',
        startup: function () {
            this.inherited(arguments);
        }
    });
});