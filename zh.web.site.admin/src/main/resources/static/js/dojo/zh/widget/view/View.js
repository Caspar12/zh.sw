/**
 * Created by 陈志杭 on 2016/12/27.
 * description 单页应用程序,基本视图
 */
define([
    'dijit/layout/ContentPane',
    "zh/widget/_base/_WidgetBase",
    'zh/util/uiUtils',
    "dojo/_base/declare",
    //"dojo/text!./login.html"
], function (ContentPane, _WidgetBase, uiUtils, declare) {
    return declare([ContentPane, _WidgetBase,], {
        baseClass: '',
        title: '',
        isAutoFillToParentNode: false,
        postCreate: function () {
            this.inherited(arguments);
        },
        placeAt: function () {
            this.inherited(arguments);

        },
        startup:function () {
          this.inherited(arguments);
            this.autoFillToParentDomNode();
        },
        autoFillToParentDomNode: function () {
            if (!this.isAutoFillToParentNode) return;
            uiUtils.fill(this.domNode, this.domNode.parentNode);
        },
        resize: function () {
            this.inherited(arguments);
            this.autoFillToParentDomNode();
        }
    });
});