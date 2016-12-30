/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,基本视图
 */
define([
    'dijit/layout/ContentPane',
    "dijit/_WidgetBase",
    "dojo/_base/declare",
    //"dojo/text!./login.html"
], function (ContentPane, _WidgetBase, declare) {
    return declare('zh/app/view/View', [ContentPane, _WidgetBase,], {});
});