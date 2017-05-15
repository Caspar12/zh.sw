/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateHeightText
 */
define([
    'zh/widget/text/NumberTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateHeightText', [TextBox], {
        label: '模板高度(mm)',
        name: 'height',
        placeHolder: '模板高度(mm)',
        required: true,
    });
});