/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/widget/util/treeUtils
 */
define([
    'zh/core',
    'dojo/_base/lang',
    'zh/util/linq',
    'zh/widget/layout/AccordionContainer',
    'dijit/layout/ContentPane',
    'zh/widget/Tree',
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
], function (zh, lang, linq, AccordionContainer, ContentPane, Tree, Memory, ObjectStoreModel) {
    var treeUtils = {
        /**
         * @param data 必填 tree数据的
         * @param rootId 必填 根数据Id
         * @param parentIdFieldName 必填 默认【parentId】 数据父Id字段名称
         * @param idFieldName 必填 默认【id】 数据Id字段名称
         * @param orderByFieldName: null,数据排序字段
         * @param textFieldName: 'text',数据显示字段         *
         * @param treeOnClick:
         * tree点击node事件
         * item    Object  Object from the dojo/store corresponding to this TreeNode
         * node    Object The TreeNode itself
         * evt    Event The event
         * @param treeOpt 树对象Option
         * @returns {zh/widget/layout/AccordionContainer}
         */
        convertTreeDataToAccordionContainer: function (opt) {
            opt = lang.mixin({
                data: [],
                rootId: -1,
                parentIdFieldName: 'parentId',
                idFieldName: 'id',
                orderByFieldName: null,
                textFieldName: 'text',
                treeOnClick: null,
                treeOpt: {}
            }, opt);
            var rootDatasStream = linq.From(opt.data);
            if (opt.orderByFieldName) {
                rootDatasStream = rootDatasStream.OrderBy('p=>p.' + opt.orderByFieldName);
            }
            var parentIdParam = zh.isString(opt.rootId) ? ('"' + opt.rootId + '"') : opt.rootId;

            var rootDatas = rootDatasStream.Where('p=>p.' + opt.parentIdFieldName + '==' + parentIdParam).ToArray();
            var accordionContainer = new AccordionContainer({
                height: '100%',
                splitter:true
            });
            linq.From(rootDatas).ForEach(function (rootData) {

                var idParam = zh.isString(rootData[opt.idFieldName]) ? ('"' + rootData[opt.idFieldName] + '"') : rootData[opt.idFieldName];
                var noRooteDataList = linq.From(opt.data).Where('p=>p.' + opt.idFieldName + '!=' + idParam).ToArray();
                var convertDataToTreeOpt = lang.mixin(opt, {
                    rootData: rootData,
                    data: noRooteDataList,
                    parentIdFieldName: 'parentId',
                    idFieldName: 'id',
                    showRoot: false,
                    treeOpt: opt.treeOpt
                });
                var tree = treeUtils.convertDataToTree(convertDataToTreeOpt);
                var pane = new ContentPane({
                    title: rootData[opt.textFieldName],
                });
                pane.addChild(tree);
                accordionContainer.addChild(pane);
            });
            return accordionContainer
        },
        /**
         *
         * @param rootData 必填 根数据
         * @param data 必填 根数据的关联数据
         * @param parentIdFieldName 必填 默认【parentId】 数据父Id字段名称
         * @param idFieldName 必填 默认【id】 数据Id字段名称
         * @param showRoot 必填 默认true, 是否显示root
         * @param treeOnClick:
         * tree点击node事件
         * item    Object  Object from the dojo/store corresponding to this TreeNode
         * node    Object The TreeNode itself
         * evt    Event The event
         * @returns zh/widget/Tree,
         */
        convertDataToTree: function (opt) {
            opt = lang.mixin({
                rootData: {},
                data: [],
                parentIdFieldName: 'parentId',
                idFieldName: 'id',
                showRoot: true,
                treeOnClick: null,
                treeOpt: {}
            }, opt);

            opt.data.push(opt.rootData);
            var getChildrenQueryParams = {};
            getChildrenQueryParams[opt.parentIdFieldName];
            var myStoreData = [opt.rootData];
            myStoreData = myStoreData.concat(linq.From(opt.data)
                .Where(function (item) {
                    return item[opt.parentIdFieldName] === opt.rootData[opt.idFieldName];
                }).ToArray());

            var myStore = new Memory({
                data: myStoreData,
                getChildren: function (object) {
                    getChildrenQueryParams[opt.parentIdFieldName] = object[opt.idFieldName];
                    return this.query(getChildrenQueryParams);
                }
            });
            var myModelQueryParam = {};
            myModelQueryParam[opt.idFieldName] = opt.rootData[opt.idFieldName];
            var myModel = new ObjectStoreModel({
                store: myStore,
                query: myModelQueryParam,
                mayHaveChildren: function (item) {
                    return this.store.getChildren(item).length > 0;
                }
            });
            var treeOpt = lang.mixin({
                model: myModel,
                showRoot: opt.showRoot,
                rowClass: opt.treeRowClass,
                onClick: opt.treeOnClick
            }, opt.treeOpt);
            var tree = new Tree(treeOpt);
            return tree;
        }
    };

    return treeUtils;
});