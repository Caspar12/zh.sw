/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/view-partial/main/order/widget/enums/OrderListShowSearchTextEnum
 */
define([
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
    'admin/view-partial/main/order/widget/form/value-widget/TpOrderCreatedDtEndDateTimeTextBox',
    'admin/view-partial/main/order/widget/form/value-widget/TpOrderCreatedDtStartDateTimeTextBox',
    'admin/view-partial/main/order/widget/form/value-widget/ReceviceProvinceNameTextBox',
    'admin/view-partial/main/region/widget/form/text/ProvinceComboBox',
    'zh/core',
], function (TpOrderIdText,
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
             TpOrderCreatedDtEndDateTimeTextBox,
             TpOrderCreatedDtStartDateTimeTextBox,
             ReceviceProvinceNameTextBox,
             ProvinceComboBox,
             zh) {
    var addFilters = function (baseFilters, addFilters) {
        var filters = baseFilters.concat();
        addFilters = zh.toArray(addFilters);
        return filters.concat(addFilters);
    };
    var OrderListShowSearchTextEnum = {
        All: {
            id: 100000,
            filters: [
                TpOrderIdText,
                RecevierText,
                RecevierContactText,
                RecevierAddressText,
                OrderItemNameText,
                TpNameText,
                TpAreaText,
                DeliveryPlanIdSelect2,
                TransporterIdSelect2,
                //    PackageTypeSelect2,
                //  DeliverPrintWaybillTemplateIdSelect2
            ]
        },
        Default: {
            id: 0,
            filters: [
                TpOrderIdText,
                RecevierText,
                RecevierContactText,
                RecevierAddressText,
                OrderItemNameText,
                TpNameText,
                TpAreaText,
            ]
        },
        DeliveryPlanningSelectDeliver: {
            id: 10,
            filters: [
                {
                    ztype: TpOrderCreatedDtStartDateTimeTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                {
                    ztype: TpOrderCreatedDtEndDateTimeTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                {
                    ztype: ReceviceProvinceNameTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                TpAreaText,

                RecevierText,
                RecevierContactText,
                {
                    ztype: TpOrderIdText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: RecevierAddressText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: OrderItemNameText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: TpNameText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
            ]
        },
        DeliveryPlanningBuildBatch: {
            id: 10,
            extraParam: {hasDeliverId: true},
            filters: [

                {
                    ztype: TpOrderCreatedDtStartDateTimeTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                {
                    ztype: TpOrderCreatedDtEndDateTimeTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                TransporterIdSelect2,
                {
                    ztype: ReceviceProvinceNameTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                TpAreaText,
                RecevierText,
                RecevierContactText,
                {
                    ztype: TpOrderIdText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: RecevierAddressText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: OrderItemNameText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: TpNameText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
            ]
        },
        WaitForPrint: {
            id: 11,
            filters: [
                // {
                //     ztype: ProvinceComboBox.prototype.declaredClass,
                //     style: {width: '200px'},
                //     labelStyle: {
                //         width: '100px'
                //     }
                // },
                {
                    ztype: TpOrderCreatedDtStartDateTimeTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                {
                    ztype: TpOrderCreatedDtEndDateTimeTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                DeliveryPlanIdSelect2,
                TransporterIdSelect2,
                RecevierText,
                RecevierContactText,
                {
                    ztype: TpOrderIdText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: ReceviceProvinceNameTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    isMoreFilter: true,
                    labelStyle: {
                        width: '100px'
                    }
                },
                {
                    ztype: TpAreaText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: RecevierAddressText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: OrderItemNameText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: TpNameText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
            ]
        },
        WaitForPrintInputWaybill: {
            id: 11,
            filters: [
                {
                    ztype: TpOrderCreatedDtStartDateTimeTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                {
                    ztype: TpOrderCreatedDtEndDateTimeTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    labelStyle: {
                        width: '100px'
                    }
                },
                DeliveryPlanIdSelect2,
                TransporterIdSelect2,
                RecevierText,
                RecevierContactText,
                {
                    ztype: TpOrderIdText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: ReceviceProvinceNameTextBox.prototype.declaredClass,
                    style: {width: '200px'},
                    isMoreFilter: true,
                    labelStyle: {
                        width: '100px'
                    }
                },
                {
                    ztype: TpAreaText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: RecevierAddressText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: OrderItemNameText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
                {
                    ztype: TpNameText.prototype.declaredClass,
                    isMoreFilter: true,
                    style: {width: '200px'},
                    labelStyle: {width: '100px'}
                },
            ]
        },
    };

    return OrderListShowSearchTextEnum;
});