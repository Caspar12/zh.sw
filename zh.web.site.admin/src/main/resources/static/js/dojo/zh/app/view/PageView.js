/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,页面视图
 */
define([
    'zh/app/view/View',
    "dijit/_WidgetBase",
    "dojo/_base/declare",
    //"dojo/text!./login.html"
], function (View, _WidgetBase, declare) {
    return declare('zh/app/view/PageView',[_WidgetBase, View], {});

});