/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/plugins/bootstrap/widget/layout/FormInlineFormGroup
 */
define([
    'zh/widget/_base/_WidgetTemplateBase',
    "dojo/text!./templates/FormInlineFormGroup.html",
    'zh/widget/_base/_Container',
    'dojo/dom-style',
    "dojo/_base/declare",
    'zh/core',
    'zh/util/dojoUtils',
    'zh/plugins/bootstrap/widget/layout/FormInlineFormGroupLabel',

    'dijit/form/_FormValueWidget',
    'zh/util/stringUtils',
    'dojo/dom-class',
    'dojo/dom-construct',
], function (_WidgetTemplateBase, templateString, _Container, domStyle, declare, zh, dojoUtils, FormInlineFormGroupLabel, _FormValueWidget,
             stringUtils, domClass, domConstruct) {
    return declare('zh/plugins/bootstrap/widget/layout/FormInlineFormGroup', [_WidgetTemplateBase, _Container], {
        templateString: templateString,
        style: {},
        contentPoint: null,
        isHorizontalLayout: false,
        _maxColSm: 12,
        postCreate: function () {
            this.inherited(arguments);
            domStyle.set(this.domNode, this.style);
        },
        addChild: function (item) {
            this.inherited(arguments);
        },
        addItem: function (item) {
            if (dojoUtils.isInstanceFromValueWidget(item)) {
                var label = new FormInlineFormGroupLabel({
                    style: item.labelStyle ? item.labelStyle : null,
                    label: item.label,
                    forId: item.id,
                    isHorizontalLayout: this.isHorizontalLayout,
                    colSm: this._maxColSm - (item.colSm || 11)
                });
                if (!item.label) {
                    label.hide();
                }
                this.addChild(label);
                if (this.isHorizontalLayout) {
                    var divNode = domConstruct.create('div', {class: 'col-sm-' + item.colSm}, this.containerNode)
                    item.placeAt(divNode);

                } else {
                    this.addChild(item);
                }

            }
            else {
                this.addChild(item);
            }
        }
    });
});