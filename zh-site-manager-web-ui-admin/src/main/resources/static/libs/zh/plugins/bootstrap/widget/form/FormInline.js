/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/plugins/bootstrap/widget/form/FormInline
 */
define([
    'zh/plugins/bootstrap/widget/form/Form',
    'zh/plugins/bootstrap/widget/layout/_FormInlineExtend',
    'zh/plugins/bootstrap/widget/layout/FormInlineFormGroup',
    'zh/widget/_base/_Container',
    'dojo/_base/lang',
    'zh/util/dojoUtils',
    "dojo/_base/declare",
], function (Form, _FormInlineExtend, FormInlineFormGroup, _Container, lang, dojoUtils, declare) {
    var FormInline = declare('zh/plugins/bootstrap/widget/form/FormInline', [Form, _Container], {});
    FormInline.extend(_FormInlineExtend);
    return FormInline;
});