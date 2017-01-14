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
    "dijit/tree/ForestStoreModel",
    "dojo/store/Observable",
    "admin/api/application",
    'admin/util/context',
    "dojo/_base/declare",
], function (PageView, Dialog, NormalFrameworkContainer, Tree, Memory, ObjectStoreModel, ForestStoreModel, Observable, application, context, declare) {
    return declare(PageView, {
        isAutoFillToParentNode: true,
        startup: function () {
            this.inherited(arguments);
            var container = new NormalFrameworkContainer();
            this._createLeftMenuTree();
            container.set('title', context.app.name);
            container.placeAt(this);
            container.startup();
            window.container = container;
        },
        _createLeftMenuTree: function () {
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
                container.left.addChild(tree);
                tree.startup();
            });

        }
    });
});