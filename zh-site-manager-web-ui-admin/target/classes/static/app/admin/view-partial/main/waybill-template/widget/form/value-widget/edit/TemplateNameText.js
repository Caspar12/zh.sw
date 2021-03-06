/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateNameText
 */
define([
    'admin/view-partial/main/waybill-template/widget/form/value-widget/TemplateNameText',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateNameText', [TextBox], {
        label: '模板名称',
        name: 'templateName',
        placeHolder: '模板名称',

        required:true,
    });
});