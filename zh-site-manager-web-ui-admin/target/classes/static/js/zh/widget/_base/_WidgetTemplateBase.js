/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,页面视图
 * @file zh/widget/_base/_WidgetTemplateBase
 */
define([
    'zh/widget/_base/_WidgetBase',
    "dijit/_TemplatedMixin",
    "dojo/_base/declare",
], function (_WidgetBase, _TemplatedMixin, declare) {
    return declare('zh/widget/_base/_WidgetTemplateBase', [_WidgetBase, _TemplatedMixin], {});
});