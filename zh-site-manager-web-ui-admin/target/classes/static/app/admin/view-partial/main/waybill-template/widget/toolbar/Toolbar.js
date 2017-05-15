/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/waybill-template/widget/toolbar/Toolbar
 */
define([
    'admin/widget/Toolbar',
    'admin/view-partial/main/waybill-template/widget/dialog/EditWaybillTemplateDialog',
    'admin/api/deliverPrintWaybillTemplateHttpService',
    "dijit/form/Button",
    'admin/util/dialogUtils',
    'admin/util/tipUtils',
    'dojo/on',
    'dojo/_base/lang',
    "dojo/_base/declare",
], function (Toolbar, EditWaybillTemplateDialog, deliverPrintWaybillTemplateHttpService, Button, dialogUtils, tipUtils, on, lang, declare) {
    return declare('admin/view-partial/main/waybill-template/widget/toolbar/Toolbar', [Toolbar], {
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
            function showEditWaybillTemplateDialog(data) {
                if (data) {
                    data.parentTemplateId = {value: data.id, label: data.templateName, data: data};
                }
                me.editWaybillTemplateDialog = new EditWaybillTemplateDialog({
                    data: data,
                    onSaveSuccess:function () {
                        tipUtils.success('保存成功');
                        on.emit(me, 'ClickComplete', this);
                    }
                });
                me.editWaybillTemplateDialog.show();
            }

            this.addChild(new Button({
                label: '添加',
                showLabel: true,
                onClick: function () {
                    showEditWaybillTemplateDialog();
                },
            }));
            this.addChild(new Button({
                label: '修改',
                showLabel: true,
                onClick: function () {
                    var data = me.checkOnlyOneData();
                    showEditWaybillTemplateDialog(data);
                },
            }));
            this.addChild(new Button({
                label: '删除',
                showLabel: true,
                onClick: function () {
                    var ids = me.checkNotEmptyMutliDataReturnIds();
                    dialogUtils.confirm(
                        lang.replace('删除当前选择的【{count}】项数据?', {count: ids.length}),
                        function (isConfirm) {
                            if (!isConfirm) return;
                            deliverPrintWaybillTemplateHttpService.delete({data: {ids: ids}}).success(function () {
                                tipUtils.success('删除成功');
                                on.emit(me, 'ClickComplete', this);
                            });
                        }
                    );
                },
            }));
        },
        onClickComplete: function () {

        }
    });
});