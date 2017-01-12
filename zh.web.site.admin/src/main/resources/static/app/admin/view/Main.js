/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([
    'zh/app/view/PageView',
    'dijit/Dialog',
    'zh/widget/layout/NormalFrameworkContainer',
    'dijit/Tree',
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
    'admin/util/context',
    "dojo/_base/declare",
], function (PageView, Dialog, NormalFrameworkContainer, Tree, Memory, ObjectStoreModel, context, declare) {
    return declare(PageView, {
        isAutoFillToParentNode: true,
        startup: function () {
            this.inherited(arguments);
            var container = new NormalFrameworkContainer();
            container.left.addChild(this._createLeftMenuTree());
            container.placeAt(this);
            container.startup();
            window.container  = container;
        },
        _createLeftMenuTree: function () {
            var myStore = new Memory({

                data: [
                    {id: 'world', name: 'The earth', type: 'planet', population: '6 billion'},
                    {
                        id: 'AF',
                        name: 'Africa',
                        type: 'continent',
                        population: '900 million',
                        area: '30,221,532 sq km',
                        timezone: '-1 UTC to +4 UTC',
                        parent: 'world'
                    },
                    {id: 'EG', name: 'Egypt', type: 'country', parent: 'AF'},
                    {id: 'KE', name: 'Kenya', type: 'country', parent: 'AF'},
                    {id: 'Nairobi', name: 'Nairobi', type: 'city', parent: 'KE'},
                    {id: 'Mombasa', name: 'Mombasa', type: 'city', parent: 'KE'},
                    {id: 'SD', name: 'Sudan', type: 'country', parent: 'AF'},
                    {id: 'Khartoum', name: 'Khartoum', type: 'city', parent: 'SD'},
                    {id: 'AS', name: 'Asia', type: 'continent', parent: 'world'},
                    {id: 'CN', name: 'China', type: 'country', parent: 'AS'},
                    {id: 'IN', name: 'India', type: 'country', parent: 'AS'},
                    {id: 'RU', name: 'Russia', type: 'country', parent: 'AS'},
                    {id: 'MN', name: 'Mongolia', type: 'country', parent: 'AS'},
                    {id: 'OC', name: 'Oceania', type: 'continent', population: '21 million', parent: 'world'},
                    {id: 'EU', name: 'Europe', type: 'continent', parent: 'world'},
                    {id: 'DE', name: 'Germany', type: 'country', parent: 'EU'},
                    {id: 'FR', name: 'France', type: 'country', parent: 'EU'},
                    {id: 'ES', name: 'Spain', type: 'country', parent: 'EU'},
                    {id: 'IT', name: 'Italy', type: 'country', parent: 'EU'},
                    {id: 'NA', name: 'North America', type: 'continent', parent: 'world'},
                    {id: 'SA', name: 'South America', type: 'continent', parent: 'world'},

                ],
                getChildren: function (object) {
                    return this.query({parent: object.id});
                }
            });

            // Create the model
            var myModel = new ObjectStoreModel({
                store: myStore,
                query: {id: 'world'}
            });

            // Create the Tree.
            var tree = new Tree({
                model: myModel,
                showRoot: false,
            });
            return tree;
        }
    });
});