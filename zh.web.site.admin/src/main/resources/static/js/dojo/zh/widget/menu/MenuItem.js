/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/menu/MenuItem
 */
define([
    'dijit/MenuItem',
    'dojo/on',
    "dojo/_base/declare",
], function (MenuItem, on, declare) {
    return declare([MenuItem], {
        postCreate: function () {
            this.inherited(arguments);
            on(this.focusNode, 'click', this.onClick)
        }
    });
});