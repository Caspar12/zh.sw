/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/plugins/bootstrap/widget/layout/FormInline
 */
define([
    'zh/widget/layout/ContentPane',
    'zh/plugins/bootstrap/widget/layout/_FormInlineExtend',
    'zh/plugins/bootstrap/widget/layout/FormInlineFormGroup',
    'zh/widget/_base/_Container',
    'dojo/_base/lang',
    'zh/util/dojoUtils',
    'dijit/form/_FormWidget',
    "dojo/_base/declare",
], function (ContentPane, _FormInlineExtend, FormInlineFormGroup, _Container, lang, dojoUtils, _FormWidget, declare) {
    var FormInline = declare('zh/plugins/bootstrap/widget/layout/FormInline', [ContentPane]);
    FormInline.extend(_FormInlineExtend);
    return FormInline;
});