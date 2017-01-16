/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/view/Main
 */
define([
    'zh/app/view/PageView',
    'dijit/Dialog',
    'zh/widget/layout/NormalFrameworkContainer',
    'zh/widget/Tree',
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
    'zh/widget/menu/MenuItem',
    'admin/widget/dialog/ModifyPasswordFormDialog',
    "admin/api/application",
    'dojo/_base/lang',
    'admin/util/context',
    "dojo/_base/declare",
], function (PageView, Dialog, NormalFrameworkContainer, Tree, Memory, ObjectStoreModel, MenuItem, ModifyPasswordFormDialog, application, lang, context, declare) {
    return declare(PageView, {
        isAutoFillToParentNode: true,
        startup: function () {
            this.inherited(arguments);
            var container = this.container = new NormalFrameworkContainer();
            container.placeAt(this);
            container.startup();
            container.set('subTitle', lang.getObject('account.name', false, context) || '');
            this._createLeftMenuTree();
            container.set('title', context.app.name);
            container.addTooltipDialogMenuItem(new MenuItem({
                label: '修改密码',
                onClick: function () {
                    var modifyPasswordFormDialog = new ModifyPasswordFormDialog();
                    modifyPasswordFormDialog.show();
                }
            }));
            container.addTooltipDialogMenuItem(new MenuItem({
                label: '退出',
                onClick: function () {
                    console.info('退出');
                }
            }));

            window.container = container;
        },
        _createLeftMenuTree: function () {
            var me = this;
            application.getMenus().success(function (res) {
                var root = {id: null, name: 'root', parentId: -1};
                res.push(root);
                var myStore = new Memory({
                    data: res,
                    getChildren: function (object) {
                        return this.query({parentId: object.id});
                    }
                });
                var myModel = new ObjectStoreModel({
                    store: myStore,
                    query: {id: null},
                    mayHaveChildren: function (item) {
                        return this.store.getChildren(item).length > 0;
                    }
                });
                var tree = new Tree({
                    model: myModel,
                    showRoot: false,
                });
                me.container.left.addChild(tree);
                tree.startup();
            });

        }
    });
});