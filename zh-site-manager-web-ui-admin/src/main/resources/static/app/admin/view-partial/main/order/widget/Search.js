/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/Search
 */
define([
    'admin/widget/SearchContainer',
    'zh/plugins/bootstrap/widget/form/FormInline',
    'zh/plugins/bootstrap/widget/layout/FormInlineFormGroup',
    'admin/services/enums/OrderStatusEnum',
    'zh/util/log',
    'zh/util/enumUtil',
    'zh/core',
    'dojox/layout/TableContainer',
    'zh/widget/button/ResetButton',
    'zh/widget/button/SubmitButton',
    'zh/widget/text/TextBox',
    "admin/api/apiConfig",
    'zh/widget/_base/_Container',
    'admin/api/logisticsHttpService',
    'admin/api/orderHttpService',
    'zh/widget/form/Select',
    'dojo/_base/lang',
    'dojo/on',
    'zh/widget/layout/TitlePane',
    'admin/view-partial/main/order/widget/enums/OrderListShowSearchTextEnum',
    'zh/plugins/jquery/widget/form/select2/Select',
    'admin/view-partial/main/order/widget/form/value-widget/TpOrderIdText',
    'admin/view-partial/main/order/widget/form/value-widget/RecevierText',
    'admin/view-partial/main/order/widget/form/value-widget/RecevierContactText',
    'admin/view-partial/main/order/widget/form/value-widget/RecevierAddressText',
    'admin/view-partial/main/order/widget/form/value-widget/OrderItemNameText',
    'admin/view-partial/main/order/widget/form/value-widget/TpNameText',
    'admin/view-partial/main/order/widget/form/value-widget/TpAreaText',
    'admin/view-partial/main/order/widget/form/value-widget/DeliveryPlanIdSelect2',
    'admin/view-partial/main/order/widget/form/value-widget/TransporterIdSelect2',
    'admin/view-partial/main/order/widget/form/value-widget/PackageTypeSelect2',
    'admin/view-partial/main/order/widget/form/value-widget/DeliverPrintWaybillTemplateIdSelect2',

    "dojo/_base/declare"
], function (SearchContainer, Form, FormInlineFormGroup, OrderStatusEnum, log, enumUtil, zh, TableContainer, ResetButton, SubmitButton, TextBox, apiConfig, _Container,
             logisticsHttpService, orderHttpService, Select, lang, on, TitlePane, OrderListShowSearchTextEnum, Select2,
             TpOrderIdText,
             RecevierText,
             RecevierContactText,
             RecevierAddressText,
             OrderItemNameText,
             TpNameText,
             TpAreaText,
             DeliveryPlanIdSelect2,
             TransporterIdSelect2,
             PackageTypeSelect2,
             DeliverPrintWaybillTemplateIdSelect2,
             declare) {
    return declare('admin/view-partial/main/order/widget/Search', [SearchContainer], {
        isMoreFeatureEnabled: true,
        filters: [],
        postMixInProperties: function () {
            var me = this;
            var allValueWidget = this.filters;
            var newFilters = [];

            for (var i in allValueWidget) {
                var valueWidgetConstructor = allValueWidget[i];
                newFilters.push(valueWidgetConstructor);
            }
            this.filters = newFilters;
            this.inherited(arguments);
        },
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
        },
    });
});