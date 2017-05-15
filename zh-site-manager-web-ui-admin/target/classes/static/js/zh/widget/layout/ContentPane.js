/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description extend dijit/layout/ContentPane
 * @file zh/widget/layout/ContentPane
 */
define([
    'zh/widget/_base/_WidgetBase',
    'dojo-ext/dijit/layout/_ContentPaneResizeMixin',
    'dijit/layout/ContentPane',
    "dojo/_base/declare",
    'dojo/dom-class',
], function (_WidgetBase, _ContentPaneResizeMixin, ContentPane, declare, domClass) {
    return declare('zh/widget/layout/ContentPane', [_WidgetBase, _ContentPaneResizeMixin, ContentPane], {
        isAutoResize:true,
        /**
         * 是否自动填充父容器长宽
         */
        isAutoFillToParentNode: false,
        isParentCalcByContentBox: false,
        isChildCalcByContentBox: false,
        isDiffDomCalcByContentBox: false,
        isSetChildCalcByContentBox: true,
        isAutoHeight: true,
        isAutoWidth: false,
        isAutoDifDomHeight: true,
        isAutoDifDomWidth: false,
        /**
         * 内容是否自动显示滚动
         */
        isContentAutoScroll: false,
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
            if (me.isContentAutoScroll) {
                domClass.add(me.containerNode, 'contentAutoScroll');
            }
        },
        resize: function () {
            var me = this;
            this.inherited(arguments);
            // me.recursiveChildren({
            //     fn: function (widget) {
            //         widget.resize && widget.resize();
            //     }
            // });
        }
    });
});