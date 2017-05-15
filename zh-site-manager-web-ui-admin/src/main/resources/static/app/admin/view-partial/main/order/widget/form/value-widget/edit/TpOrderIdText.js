/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/edit/TpOrderIdText
 */
define([
    'admin/view-partial/main/order/widget/form/value-widget/TpOrderIdText',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/edit/TpOrderIdText', [TextBox], {
        required: true,

    });
});