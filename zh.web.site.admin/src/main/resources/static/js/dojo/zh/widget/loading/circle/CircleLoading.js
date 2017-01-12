/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/loading/circle/CircleLoading
 */
define([
        'zh/widget/_base/_WidgetBase',
        "dijit/_TemplatedMixin",
        "dojo/text!./CircleLoading.html",
        'require',
        "dojo/_base/declare",
        'zh/util/dynamicLoader'
    ],
    function (_WidgetBase, _TemplatedMixin, template, require, declare, dynamicLoader) {
        var cssUrl = require.toUrl('zh/widget/loading/circle/') + 'CircleLoading.css';
        dynamicLoader.css(cssUrl);
        var module = declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            postCreate: function () {
                this.inherited(arguments);
                this.hide();
                this.placeAt(document.body);
            },
            baseClass: 'sk-circle',
            show: function (callback) {
                this.inherited(arguments);
                callback && callback();
            },
            hide: function (callback) {
                this.inherited(arguments);
                callback && callback();
            }
        });
        return module;
    });
