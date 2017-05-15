/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description extend dijit/TitlePane
 * @file zh/widget/layout/TitlePane
 */
define([
    'dojo-ext/dijit/TitlePane',
    'zh/widget/_base/_WidgetBase',
    'zh/widget/_base/_Container',
    'zh/util/uiUtils',
    "dojo/_base/declare",
    'dojo/on',
    'dojo/_base/lang',
    'dojo/dom-class',
], function (TitlePane, _WidgetBase, _Container, uiUtils, declare, on, lang, domClass) {
    return declare([_WidgetBase, _Container, TitlePane], {
        isAutoResize: true,
        /**
         * 内容是否自动显示滚动
         */
        isContentAutoScroll: false,
        /**
         * 内容容器高度偏差量
         */
        contentDiffHeight: 1,
        /**
         * 填充父容器
         */
        isAutoFillToParentNode: false,
        /**
         * 父容器偏差量
         */
        diffHeight: 0,
        /**
         * 是否可以收缩
         */
        toggleable: true,
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
            if (me.isContentAutoScroll) {
                domClass.add(me.containerNode, 'contentAutoScroll');
            }
            if (this.toggleable === false) {
                domClass.add(me.titleBarNode, 'noToggleable');
            }
        },
        startup: function () {
            var me = this;
            me.inherited(arguments);
        },
        resize: function () {
            var me = this;
            if (this.domNode) {
                me.inherited(arguments);
            }
        },
        destroy: function () {
            this.inherited(arguments);
        },
        autoFillToParentDomNode: function () {
            var me = this;
            me.inherited(arguments);
            if (me.isContentAutoScroll) {
                var containerDomNode = me.containerNode;
                var titleBarDomNode = me.titleBarNode;
                var thisDomNode = me.domNode;

                uiUtils.fill({
                    childDom: containerDomNode,
                    parentDom: thisDomNode,
                    isAutoWidth: false,
                    diffHeight: me.contentDiffHeight,
                    diffDom: titleBarDomNode,
                    isParentCalcByContentBox: true,
                    isChildCalcByContentBox: true,
                    isDiffDomCalcByContentBox: false,
                    isSetChildCalcByContentBox: true,
                    isAutoHeight: true,
                    isAutoWidth: false,
                    isAutoDifDomHeight: true,
                    isAutoDifDomWidth: false
                });
            }
        },
    });
});