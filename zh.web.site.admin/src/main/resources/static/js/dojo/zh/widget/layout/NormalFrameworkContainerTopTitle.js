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
        'dijit/form/DropDownButton',
        'dijit/TooltipDialog',
        "dojo/ready",
        "dojo/parser",
        "dojo/_base/declare",

    ], function (_WidgetBase, _TemplatedMixin, template, DropDownButton,TooltipDialog, ready, parser, declare) {

        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            title: '',
            _setTitleAttr: {node: 'titleNode', type: 'innerHTML'},
            postCreate: function () {
                this.inherited(arguments);
                var dropDownButton = new DropDownButton();
                var tooltipDialog = new TooltipDialog();
                dropDownButton
            }
        });
    }
);