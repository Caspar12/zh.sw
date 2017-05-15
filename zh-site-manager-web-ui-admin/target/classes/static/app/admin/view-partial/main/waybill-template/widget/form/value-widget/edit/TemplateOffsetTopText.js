/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateOffsetTopText
 */
define([
    'zh/widget/text/NumberTextBox',
    "dojo/_base/declare",
    'admin/services/enums/DeliverPrintWaybillTemplatePropertyEnum',
], function (TextBox, declare, DeliverPrintWaybillTemplatePropertyEnum) {
    return declare('admin/view-partial/main/waybill-template/widget/form/value-widget/edit/TemplateOffsetTopText', [TextBox], {
        label: DeliverPrintWaybillTemplatePropertyEnum.OffsetTop.text,
        name: 'offsetTop',
        placeHolder: DeliverPrintWaybillTemplatePropertyEnum.OffsetTop.text,
        required: true,
    });
});