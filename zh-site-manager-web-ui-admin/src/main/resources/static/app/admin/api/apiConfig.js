/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/api/apiConfig
 */
define([], function () {
    return {
        application: {
            getBaseInfo: '/api/admin/application/getBaseInfo',
            getMenus: '/api/admin/application/getMenus',
        },
        identity: {
            login: '/api/identity/login',
            register: '/api/identity/register',
            registerByInvitation: '/api/identity/registerByInvitation',
            getAccountNameOrAccount: '/api/identity/getAccountNameOrAccount',
            updatePassword: '/api/identity/updatePassword',
            validToken: '/api/identity/validToken',
            logout: '/api/identity/logout',
            getAllTokenExceptionCode: '/api/identity/getAllTokenExceptionCode',

        },
        admin: {
            order: {
                list: '/api/admin/order/list',
                getAllPackageType: '/api/admin/order/getAllPackageType',
                listOrderDeliveryPlanPage: '/api/admin/order/listOrderDeliveryPlanPage',
                delete: '/api/admin/order/delete',
                buildOrderDeliveryPlan: '/api/admin/order/buildOrderDeliveryPlan',
                setDeliver: '/api/admin/order/setDeliver',
                setDeliverPrintWaybillTemplate: '/api/admin/order/setDeliverPrintWaybillTemplate',
                resetDeliverPrintWaybillTemplate: '/api/admin/order/resetDeliverPrintWaybillTemplate',
                setPackageType: '/api/admin/order/setPackageType',
                resetDeliver: '/api/admin/order/resetDeliver',
                resetPackageType: '/api/admin/order/resetPackageType',
                createDeliveryPlan: '/api/admin/order/createDeliveryPlan',
                confirmCheckDeliveryPlanOrders: '/api/admin/order/confirmCheckDeliveryPlanOrders',
                confirmPrintWaybill: '/api/admin/order/confirmPrintWaybill',
                setTrackingNumber: '/api/admin/order/setTrackingNumber',
                confirmInputWaybill: '/api/admin/order/confirmInputWaybill',
                reprintWaybill: '/api/admin/order/reprintWaybill',
                confirmPackChecked: '/api/admin/order/confirmPackChecked',
                confirmDelivered: '/api/admin/order/confirmDelivered',
                getImportOrderTemplateUrl: '/api/admin/order/getImportOrderTemplateUrl',
                importByExcel: '/api/admin/order/importByExcel',
                getImportResult: '/api/admin/order/getImportResult',
                editDeliveryPlanCheckingOrder: '/api/admin/order/editDeliveryPlanCheckingOrder',
                editWaitPrintOrder: '/api/admin/order/editWaitPrintOrder',
                editOrder: '/api/admin/order/editOrder',
            },
            orderDeliveryPlan: {
                build: '/api/admin/orderDeliveryPlan/build',
            },
            deliverPrintWaybillTemplate: {
                findByCurrentWorkSpaceOrSystem: '/api/admin/deliverPrintWaybillTemplate/findByCurrentWorkSpaceOrSystem',
                findOne: '/api/admin/deliverPrintWaybillTemplate/findOne',
                list: '/api/admin/deliverPrintWaybillTemplate/list',
                delete: '/api/admin/deliverPrintWaybillTemplate/delete',
                edit: '/api/admin/deliverPrintWaybillTemplate/edit',
            },
            sender: {
                listPrintingWaybillSenderPage: '/api/admin/sender/listPrintingWaybillSenderPage',
                findDefaultOrEmpty: '/api/admin/sender/findDefaultOrEmpty',
                list: '/api/admin/sender/list',
                delete: '/api/admin/sender/delete',
                edit: '/api/admin/sender/edit',
            },
            logistics: {
                getAllDeliver: '/api/admin/logistics/getAllDeliver',
            },
            region: {
                findAllByChina: '/api/admin/region/findAllByChina',
            },
            account: {
                editPersonalInfo: '/api/admin/account/editPersonalInfo',
                getAccount: '/api/admin/account/getAccount',

            }
        }
    };
});