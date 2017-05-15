/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/ReceviceProvinceNameTextBox
 */
define([
    'zh/widget/text/TextBox',
    'admin/services/enums/OrderPropertyEnum',
    "dojo/_base/declare"
], function (TextBox, OrderPropertyEnum, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/ReceviceProvinceNameTextBox',
        [TextBox],
        {
            label: OrderPropertyEnum.ReceviceProvinceName.text,
            name: OrderPropertyEnum.ReceviceProvinceName.id,
            placeHolder: OrderPropertyEnum.ReceviceProvinceName.text,
        });
});