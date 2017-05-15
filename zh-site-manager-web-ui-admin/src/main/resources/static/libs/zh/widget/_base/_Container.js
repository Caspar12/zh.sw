/**
 * Created by 陈志杭 on 2016/12/27.
 * @description 单页应用程序,基本视图
 * @file zh/widget/_base/_Container
 */
define([
    "dijit/_Container",
    'zh/widget/_base/_ContainerMixin',
    'zh/core',
    "dojo/_base/declare",
], function (_Container, _ContainerMixin, zh, declare) {
    var contructor = declare('zh/widget/_base/_Container', [_Container], {
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
            if (me.items) {
                me.items = me.addItems(me.items);
            }
        },
    });
    contructor.extend(_ContainerMixin);
    return contructor;
});