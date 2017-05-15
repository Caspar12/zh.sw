/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/text/_TextBoxMixin
 */
define([
    'dojo/dom-attr',
    'dojo/_base/lang',
    "dojo/_base/declare",
], function (domAttr, lang, declare) {
    return declare('zh/widget/text/_TextBoxMixin', null, {
        isSetEmptyPlaceHolderIfReadOnly: true,
        postCreate: function () {
            this.inherited(arguments);
            if (this.maxLength) {
                domAttr.set(this.textbox, 'maxLength', this.maxLength);
            }
            if (this.isSetEmptyPlaceHolderIfReadOnly && this.readOnly) {
                this.placeHolder = '';
            }
        }
    });
});