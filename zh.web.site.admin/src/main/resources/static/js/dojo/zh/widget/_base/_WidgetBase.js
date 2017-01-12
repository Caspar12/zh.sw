/**
 * Created by 陈志杭 on 2016/12/27.
 * @description 单页应用程序,基本视图
 * @file zh/widget/_base/_WidgetBase
 */
define([
    "dijit/_WidgetBase",
    'dojo/dom-style',
    "dojo/_base/declare",
    //"dojo/text!./login.html"
], function (_WidgetBase, domStyle, declare) {
    return declare([_WidgetBase], {
        show: function (callback) {
            var me = this;
            if (me.isShow()) return;
            domStyle.set(me.domNode, 'display', 'block');
            callback && callback();
        },
        hide: function (callback) {
            var me = this;
            if (me.isShow() === false)
                return;
            domStyle.set(me.domNode, 'display', 'none');
            callback && callback();
        },
        isShow: function () {
            var me = this;
            var display = domStyle.get(me.domNode, 'display');
            return display === 'block' || display === '';
        }
    });
});