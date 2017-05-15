/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/plugins/bootstrap/widget/layout/_FormInlineExtend
 */
define([
    'zh/plugins/bootstrap/widget/layout/FormInlineFormGroup',
    'dojo/_base/lang',
    'zh/util/dojoUtils',
], function (FormInlineFormGroup, lang, dojoUtils) {
    return {
        baseClass: 'form-inline',
        class: ' overflow-hide',
        isHorizontalLayout: false,
        _maxColSm: 12,
        postMixInProperties: function () {
            this.baseClass = this.isHorizontalLayout ? 'form-horizontal' : 'form-inline';
            this.inherited(arguments);
        },
        addChild: function (item) {
            this.inherited(arguments);
            return this;
        },
        addItem: function (item) {
            if (dojoUtils.isInstanceFrom(item, FormInlineFormGroup)) {
                item.isHorizontalLayout = this.isHorizontalLayout;
                this.addChild(item);
                return this;
            }
            else {
                item.colSm = item.colSm || 11;
                var formInlineFormGroup = new FormInlineFormGroup({
                    isHorizontalLayout: this.isHorizontalLayout,
                });
            }
            formInlineFormGroup.addItem(item);
            this.addChild(formInlineFormGroup);
            return this;
        }
    }

});