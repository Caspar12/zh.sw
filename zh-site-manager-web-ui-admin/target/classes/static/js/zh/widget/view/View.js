/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,基本视图
 */
define([
    "zh/widget/_base/_WidgetBase",
    'dojo/on',
    "dojo/_base/declare",
], function (_WidgetBase, on, declare) {
    return declare([_WidgetBase], {
        isAutoResize:true,
    });
});