/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/widget/layout/TabContainer
 */
define([
    'dijit/layout/TabContainer',
    'zh/widget/_base/_WidgetBase',
    'dojo-ext/dijit/layout/_LayoutWidget',
    'zh/util/uiUtils',
    "dojo/_base/declare",
    'dojo/on',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-class',
], function (TabContainer, _WidgetBase, _LayoutWidget, uiUtils, declare, on, lang, query, domClass) {

    return declare([TabContainer], {
        isAutoResize:true,
        doLayout: false,
        /**
         * 填充父容器
         */
        isAutoFillToParentNode: true,
        resize: function () {
            var me = this;
            me.inherited(arguments);
            me.recursiveChildren({
                fn: function (widget) {
                    widget.resize && widget.resize();
                }
            });
        },
        autoFillToParentDomNode: function () {
            //     return;
            if (!this.isAutoFillToParentNode) return;
            var tablistNode = query('.dijitTabListContainer-top', this.domNode)[0];
            return uiUtils.fill({
                childDom: this.containerNode,
                parentDom: this.domNode.parentNode,
                diffDom: [tablistNode],
                isParentCalcByContentBox: true,
                isChildCalcByContentBox: false,
                isDiffDomCalcByContentBox: false,
                isSetChildCalcByContentBox: false,
                isAutoHeight: true,
                isAutoWidth: false,
                isAutoDifDomHeight: true,
                isAutoDifDomWidth: false
            });
        },
    });
});