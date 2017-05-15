/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/plugins/bootstrap/widget/layout/FormInlineFormGroupLabel
 */
define([
    'zh/widget/_base/_WidgetTemplateBase',
    "dojo/text!./templates/FormInlineFormGroupLabel.html",
    'dojo/dom-style',
    "dojo/_base/declare",
    'zh/core',
    'zh/util/stringUtils',
    'zh/plugins/bootstrap/widget/layout/_FormInlineExtend',
    'dojo/dom-class',
], function (_WidgetTemplateBase, templateString, domStyle, declare, zh, stringUtils, _FormInlineExtend, domClass) {
    return declare('zh/plugins/bootstrap/widget/layout/FormInlineFormGroupLabel', [_WidgetTemplateBase], {
        templateString: templateString,
        labelPoint: null,
        style: null,
        forId: '',
        label: '',
        _setLabelAttr: {node: 'labelPoint', type: 'innerText'},
        isHorizontalLayout: false,
        colSm: 1,
        _maxColSm: _FormInlineExtend._maxColSm,
        postMixInProperties: function () {
            this.inherited(arguments);
        },
        postCreate: function () {
            this.inherited(arguments);
            if (this.style) {
                domStyle.set(this.labelPoint, this.style);
            }
            if (this.isHorizontalLayout) {
                domClass.add(this.labelPoint, 'col-sm-' + this.colSm + ' control-label');
            }
        }
    });
});