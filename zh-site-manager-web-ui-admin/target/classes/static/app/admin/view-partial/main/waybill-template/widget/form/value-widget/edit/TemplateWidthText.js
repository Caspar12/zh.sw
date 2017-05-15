/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateWidthText
 */
define([
    'zh/widget/text/NumberTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateWidthText', [TextBox], {
        label: '模板宽度(mm)',
        name: 'width',
        placeHolder: '模板宽度(mm)',
        required: true,
    });
});