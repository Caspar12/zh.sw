/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/dialog/EditOrderDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'dojox/layout/TableContainer',
    'zh/plugins/bootstrap/widget/layout/FormInline',
    'admin/view-partial/main/order/widget/dialog/EditOrderItemDialog',
    'zh/widget/layout/TitlePane',
    'admin/widget/Toolbar',
    "dijit/form/Button",
    'admin/view-partial/main/order/widget/form/value-widget/OrderIdHidden',
    'admin/view-partial/main/order/widget/form/value-widget/edit/TpOrderIdText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/TpNameText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/TpAreaText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/TpOrderCreatedDt',
    'admin/view-partial/main/order/widget/form/value-widget/edit/DeliverIdSelect2',
    'admin/view-partial/main/order/widget/form/value-widget/edit/TransporterIdSelect2',
    'admin/view-partial/main/order/widget/form/value-widget/edit/DeliverPrintWaybillTemplateIdSelect2',
    'admin/view-partial/main/order/widget/form/value-widget/edit/PackageTypeSelect2',
    'admin/view-partial/main/order/widget/form/value-widget/edit/RecevierText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/RecevierContactText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/RecevierAddressText',
    'admin/view-partial/main/order/widget/form/value-widget/edit/TpOrderRemark',
    'admin/view-partial/main/order/widget/form/value-widget/edit/TrackingNumberTextBox',
    'admin/view-partial/main/region/widget/form/text/ProvinceComboBox',
    'admin/view-partial/main/region/widget/form/text/CityComboBox',
    'admin/view-partial/main/region/widget/form/text/AreaComboBox',
    'zh/widget/text/HiddenTextBox',
    'admin/view-partial/main/order/widget/table/EditOrderItemTable',

    'zh/widget/text/TextBox',
    'admin/api/orderHttpService',
    'admin/api/logisticsHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/datetimeUtils',
    "dojo/_base/declare",
    'dojo/_base/lang',
    'admin/util/bizTipUtils',
    'zh/app/exceptions/ValidationException',
    'dojo/errors/create',
    'admin/services/enums/OrderStatusEnum',
], function (ConfirmDialog, TableContainer, FormInline, EditOrderItemDialog, TitlePane, Toolbar, Button, OrderIdHidden, TpOrderIdText, TpNameText, TpAreaText, TpOrderCreatedDt,
             DeliverIdSelect2,
             TransporterIdEditSelect2, DeliverPrintWaybillTemplateIdSelect2, PackageTypeEditSelect2, RecevierText,
             RecevierContactText,
             RecevierAddressText,
             TpOrderRemark,
             TrackingNumberTextBox,
             ProvinceComboBox,
             CityComboBox,
             AreaComboBox,
             HiddenTextBox,
             EditOrderItemTable,
             TextBox, orderHttpService, logisticsHttpService, apiConfig, zh, request, array, datetimeUtils, declare, lang, bizTipUtils, ValidationException, create,
             OrderStatusEnum) {

    return declare('admin/view-partial/main/order/widget/dialog/EditOrderDialog', [ConfirmDialog], {
        orderData: undefined,
        isAdd: true,
        action: undefined,
        request: request,
        title: '编辑订单',
        isHorizontalLayout: true,
        requestOptions: {method: 'POSTBODY'},
        style: "width: 50000px;height:50000px",
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            var orderTitlePane = this.orderTitlePane = new TitlePane({title: '订单详情'});
            this.addChild(orderTitlePane);
            var formInline = new TableContainer({labelWidth: 100, showLabel: true, cols: 1});
            orderTitlePane.addChild(formInline);
            var isPrintStatusAfter = me._isPrintStatusAfter()
            me.addChild((this.orderIdHidden = new OrderIdHidden()));
            me.addChild((this.provinceCodeHiddenTextBox = new HiddenTextBox({
                name: 'receviceProvinceCode'
            })));
            me.addChild((this.cityCodeHiddenTextBox = new HiddenTextBox({
                name: 'receviceCityCode'
            })));
            me.addChild((this.areaCodeHiddenTextBox = new HiddenTextBox({
                name: 'receviceAreaCode'
            })));
            formInline.addChild((this.tpOrderIdText = new TpOrderIdText({})));
            formInline.addChild((this.tpNameText = new TpNameText({
                readOnly: isPrintStatusAfter
            })));
            formInline.addChild((this.tpAreaText = new TpAreaText({
                readOnly: isPrintStatusAfter
            })));
            formInline.addChild((this.tpOrderCreatedDt = new TpOrderCreatedDt({
                readOnly: isPrintStatusAfter
            })));
            formInline.addChild((this.deliverIdSelect2 = new DeliverIdSelect2({})));
            formInline.addChild((this.trackingNumberTextBox = new TrackingNumberTextBox({})));

            formInline.addChild((this.recevierText = new RecevierText({
                readOnly: isPrintStatusAfter
            })));
            formInline.addChild((this.recevierContactText = new RecevierContactText({
                readOnly: isPrintStatusAfter
            })));
            formInline.addChild((this.provinceComboBox = new ProvinceComboBox({
                readOnly: isPrintStatusAfter,
                nameId: this.provinceCodeHiddenTextBox
            })));
            formInline.addChild((this.cityComboBox = new CityComboBox({
                readOnly: isPrintStatusAfter,
                parentComboBox: this.provinceComboBox,
                nameId: this.cityCodeHiddenTextBox,
            })));
            formInline.addChild((this.areaComboBox = new AreaComboBox({
                readOnly: isPrintStatusAfter,
                parentComboBox: this.cityComboBox,
                nameId: this.areaCodeHiddenTextBox

            })));
            formInline.addChild((this.recevierAddressText = new RecevierAddressText({
                readOnly: isPrintStatusAfter
            })));
            formInline.addChild((this.tpOrderRemark = new TpOrderRemark({
                readOnly: isPrintStatusAfter
            })));


            this.toolbar = new Toolbar({
                class: 'single',
            });
            this.toolbar.addChild(new Button({
                label: '添加',
                showLabel: true,
                onClick: lang.hitch(this, 'onAddOrderItemClick')
            }));
            this.toolbar.addChild(new Button({
                label: '修改',
                showLabel: true,
                onClick: lang.hitch(this, 'onEditOrderItemClick')
            }));
            this.toolbar.addChild(new Button({
                label: '删除',
                showLabel: true,
                onClick: lang.hitch(this, 'onDeleteOrderItemClick')
            }));
            if (isPrintStatusAfter) {
                this.toolbar.hide();
            }
            this.addChild((this.editOrderItemTable = new EditOrderItemTable({
                style: {"margin-top": '10px'},
                table_onPlugPostCreate: function () {
                    me._onInitUIFinished();
                }
            })));
            this.toolbar.placeAt(this.editOrderItemTable, 'first');

        },
        _isPrintStatusAfter: function () {
            var me = this;
            if (lang.exists('orderData.status', me)) {
                if ((me.orderData.status >= OrderStatusEnum.WaitPlan.id &&
                    me.orderData.status <= OrderStatusEnum.WaitInputWaybillNumber.id )) {
                    // 打印快递单之前状态的订单可以修改任何信息
                    return false;
                }
                else {
                    // 已打印快递单之后状态的订单只可以修改快递公司和快递单号
                    return true;
                }
            } else {
                return false;
            }
        },
        startup: function () {
            this.inherited(arguments);
        },
        _onInitUIFinished: function () {
            var me = this;
            if (me.orderData) {
                me.set('value', me.orderData);
            }
            me.editOrderItemTable.get('table').adjustColumns();
            me.onInitUIFinished();
        },
        onInitUIFinished: function () {

        }
        ,
        onAddOrderItemClick: function () {
            this.showEditOrderItemDialog();
        }
        ,
        onEditOrderItemClick: function () {
            var data = this.checkSingleEditOrderItemTableAndReturn();
            this.showEditOrderItemDialog(data);
        }
        ,
        showEditOrderItemDialog: function (data) {
            var me = this;
            this.editOrderItemDialog && this.editOrderItemDialog.destroy();
            this.editOrderItemDialog = new EditOrderItemDialog({
                data: data,
                isAdd: zh.isEmptyObject(data),
                onExecute: function () {
                    var data = this.get('value');
                    if (this.isAdd) {
                        me.editOrderItemTable.get('table').addRowData(data);
                    }
                    else {
                        me.editOrderItemTable.get('table').editRowDataSelected(data);
                    }
                    this.destroy();
                }
            });
            this.editOrderItemDialog.show();
        }
        ,
        execute: function () {

            //console.trace(this.get('value'));

            return this.inherited(arguments);
        }
        ,
        onDeleteOrderItemClick: function () {
            this.editOrderItemTable.get('table').removeRowSelected();
        }
        ,
        checkSingleEditOrderItemTableAndReturn: function () {
            var result = this.editOrderItemTable.get('table').getRowSelectedData();
            if (result.length === 0) throw new ValidationException({message: '请选择至少一项数据'});
            if (result.length !== 1) throw new ValidationException({message: '只能选择一项数据'});
            return result[0];
        }
        ,
        destroy: function () {
            this.editOrderItemDialog && this.editOrderItemDialog.destroy();
            this.inherited(arguments);
        }
        ,
        show: function () {
            var me = this;
            var promise = this.inherited(arguments);
            promise.then(function () {

            });
            return promise;
        }
        ,
        _getValueAttr: function () {
            var data = this.inherited(arguments);
            data.orderItems = (this.editOrderItemTable && this.editOrderItemTable.get('table')) ? this.editOrderItemTable.get('table').getData() : [];
            return data;
        }
        ,
        _setValueAttr: function (value) {
            this.inherited(arguments);
            var orderItems = lang.getObject('orderData.orderItems', false, this) || [];
            this.getOrderItemTable() && this.getOrderItemTable().reload(orderItems);
        }
        ,
        getOrderItemTable: function () {
            var result = undefined;
            if (this.editOrderItemTable) {
                result = this.editOrderItemTable.get('table');
            }
            return result;
        }
    });
})
;