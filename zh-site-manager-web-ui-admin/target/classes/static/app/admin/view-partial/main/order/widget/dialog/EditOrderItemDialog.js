/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/EditOrderItemDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'zh/widget/form/Form',
    'admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemNameText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemCodeText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemCountText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemBarCodeText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/OrderItemUnitNameText',
    'zh/widget/text/TextBox',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/datetimeUtils',
    "dojo/_base/declare",
    'dojo/_base/lang',
    'admin/util/bizTipUtils',
    'dojo/dom-form',
], function (ConfirmDialog, Form,  OrderItemNameText, OrderItemCodeText, OrderItemCountText, OrderItemBarCodeText, OrderItemUnitNameText,
             TextBox, orderHttpService, apiConfig, zh, request, array, datetimeUtils, declare, lang, domForm) {

    return declare('admin/view-partial/main/order/widget/dialog/EditOrderDialog', [ConfirmDialog], {
        action: undefined,
        isAjax: false,
        request: request,
        title: '编辑订单物品',
        isHorizontalLayout: true,
        style: "width: 50000px;height:50000px",
        maxRatio: 0.6,
        data: undefined,
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
        postCreate: function () {
            this.inherited(arguments);
            this.addItem((this.orderItemNameText = new OrderItemNameText({})));
            this.addItem((this.orderItemCountText = new OrderItemCountText({})));
            this.addItem((this.orderItemUnitNameText = new OrderItemUnitNameText({})));
            this.addItem((this.orderItemCodeText = new OrderItemCodeText({})));
            this.addItem((this.orderItemBarCodeText = new OrderItemBarCodeText({})));
        },
        startup:function () {
            this.inherited(arguments);
            if(this.data){
                this.set('value', this.data);
            }
        },
    });
});