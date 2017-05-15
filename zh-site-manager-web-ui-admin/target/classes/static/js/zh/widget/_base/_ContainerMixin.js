/**
 * Created by 陈志杭 on 2016/12/27.
 * @description 单页应用程序,基本视图
 * @file zh/widget/_base/_ContainerMixin
 */
define([
    'dijit/_WidgetBase',
    'dojo/require',
    'dojo/_base/array',
    'zh/util/dojoUtils',
    'zh/core',
], function (_WidgetBase, require, array, dojoUtils, zh) {

    return {
        addItems: function (items) {
            var tItems = zh.toArray(items);
            var newItems = [];
            array.forEach(tItems, function (item) {
                if (!dojoUtils.isInstanceFrom(_WidgetBase)) {
                    var opts = item;
                    var tItem = dojoUtils.create(opts);
                }

                this.addChild(tItem);
                newItems.push(tItem)
            });
            return newItems;
        }
    };
});