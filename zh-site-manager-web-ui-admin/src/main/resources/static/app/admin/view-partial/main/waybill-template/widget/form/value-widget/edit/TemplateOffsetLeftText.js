/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateOffsetLeftText
 */
define([
    'zh/widget/text/NumberTextBox',
    "dojo/_base/declare",
    'admin/services/enums/DeliverPrintWaybillTemplatePropertyEnum',
], function (TextBox, declare, DeliverPrintWaybillTemplatePropertyEnum) {
    return declare('admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateOffsetLeftText', [TextBox], {
        label: DeliverPrintWaybillTemplatePropertyEnum.OffsetLeft.text,
        name: 'offsetLeft',
        placeHolder: DeliverPrintWaybillTemplatePropertyEnum.OffsetLeft.text,
        required: true,
    });
});