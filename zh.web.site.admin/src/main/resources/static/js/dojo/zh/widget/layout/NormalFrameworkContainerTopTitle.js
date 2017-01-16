/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/layout/NormalFrameworkContainerTopTitle
 */
define([
        'zh/widget/_base/_WidgetBase',
        "dijit/_TemplatedMixin",
        'dojo/text!./templates/normal-framework-container/NormalFrameworkContainerTopTitle.html',
        'dijit/TooltipDialog',
        'zh/widget/menu/MenuItem',
        "dijit/popup",
        "dojo/on",
        "dojo/_base/declare"
    ], function (_WidgetBase, _TemplatedMixin, template, TooltipDialog, MenuItem, popup, on, declare) {
        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            title: '',
            _setTitleAttr: {node: 'titleNode', type: 'innerHTML'},
            subTitle: '',
            _setSubTitleAttr: {node: 'subTitleNode', type: 'innerHTML'},
            postCreate: function () {
                var me = this;
                this.inherited(arguments);
                var tooltipDialog = this.tooltipDialog = new TooltipDialog({
                    class: 'NormalFrameworkContainerTopPopupMenu',
                    onMouseLeave: function () {
                        popup.close(this);
                    }
                });

                on(me.subTitleNode, 'mouseover', function () {
                    popup.open({
                        parent: me,
                        popup: tooltipDialog,
                        around: me.subTitleNode,
                    });
                });
            },
            /**
             *
             * @param menuItem   zh/widget/menu/MenuItem
             */
            addTooltipDialogMenuItem: function (menuItem) {
                this.tooltipDialog.addChild(menuItem);
            }
        });
    }
);