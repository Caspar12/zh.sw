/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/toolbar/Toolbar
 */
define([
    'admin/widget/Toolbar',
    "dijit/form/Button",
    'admin/view-partial/main/sender/widget/dialog/EditSenderDialog',
    'admin/util/dialogUtils',
    'admin/api/senderHttpService',
    'admin/util/tipUtils',
    'dojo/on',
    'dojo/_base/lang',
    "dojo/_base/declare",
], function (Toolbar, Button, EditSenderDialog, dialogUtils, senderHttpService, tipUtils, on,lang,declare) {
    return declare('admin/view-partial/main/sender/widget/toolbar/Toolbar', [Toolbar], {
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
            this.addChild(new Button({
                label: '添加',
                showLabel: true,
                onClick: function () {
                    me.editSenderDialog = new EditSenderDialog({
                        data: undefined,
                        onSuccess: function () {
                            tipUtils.success('保存成功');
                            me.editSenderDialog.destroy();
                            on.emit(me, 'ClickComplete', arguments)
                        }
                    });
                    me.editSenderDialog.show();
                },
            }));
            this.addChild(new Button({
                label: '修改',
                showLabel: true,
                onClick: function () {
                    var sender = me.checkOnlyOneData();
                    me.editSenderDialog = new EditSenderDialog({
                        data: sender,
                        onSuccess: function () {
                            tipUtils.success('保存成功');
                            me.editSenderDialog.destroy();
                            on.emit(me, 'ClickComplete', arguments)
                        }
                    });
                    me.editSenderDialog.show();
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
                            senderHttpService.delete({data: {ids: ids}}).success(function () {
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