/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,基本视图
 */
define([
    "dijit/_WidgetBase",
    'dojo/dom-style',
    "dojo/_base/declare",
    //"dojo/text!./login.html"
], function (_WidgetBase, domStyle, declare) {
    return declare([_WidgetBase], {
        show: function () {
            var me = this;
            if (me.isShow()) return;
            domStyle.set(me.domNode, 'display', 'block');
        },
        hide: function () {
            var me = this;
            if (me.isShow() === false)
                return;
            domStyle.set(me.domNode, 'display', 'none');

        },
        isShow: function () {
            var me = this;
            var display = domStyle.get(me.domNode, 'display');
            return display === 'block' || display === '';
        }
    });
});