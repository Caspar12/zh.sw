/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemCountText
 */
define([
    'zh/widget/text/NumberTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemCountText', [TextBox], {
        label: '数量',
        name: 'count',
        placeHolder: '数量',
        required: true,
    });
});