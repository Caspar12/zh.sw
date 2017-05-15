/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/form/value-widget/TpOrderRemark
 */
define([
    'zh/widget/form/Textarea',
    'admin/services/enums/OrderPropertyEnum',
    "dojo/_base/declare"
], function (Textarea, OrderPropertyEnum, declare) {
    return declare('admin/view-partial/main/order/widget/form/value-widget/tpOrderRemark', [Textarea], {
        label: OrderPropertyEnum.TpOrderRemark.text,
        name: OrderPropertyEnum.TpOrderRemark.id,
        isAutoHeight: false,
        style: 'height:100px;',
        placeHolder: OrderPropertyEnum.TpOrderRemark.text,
    });
});