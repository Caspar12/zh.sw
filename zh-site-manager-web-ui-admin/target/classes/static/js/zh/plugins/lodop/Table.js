/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/plugins/lodop/Table
 */
define([

    'zh/widget/_base/_WidgetTemplateBase',
    'dojo/text!./templates/Table.html',
    'dojo/dom-attr',
    'dojo/dom-construct',
    "dojo/_base/array",
    "dojo/_base/declare",
], function (_WidgetTemplateBase, TableTemlateString, domAttr, domConstruct, array, declare) {
    return declare('zh/plugins/lodop/Table', [_WidgetTemplateBase], {
        templateString: TableTemlateString,
        /**
         * @param {string} data 关联属性名称
         * @param {string} title 列名
         */
        columns: [],
        data: [],
        tableThTdStyle: 'border-width: 1px;border-style: solid;border-collapse: collapse',
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            var thead = domConstruct.create('thead');
            var tr = domConstruct.create('tr', {style: me.tableThTdStyle});
            array.forEach(me.columns, function (column) {
                if (!column.style) {
                    column.style = me.tableThTdStyle;
                }
                var th = domConstruct.create('th', column);
                th.innerHTML = column.title;
                domConstruct.place(th, tr);
            });
            domConstruct.place(tr, thead);
            domConstruct.place(thead, me.tableNode);
            var tbody = domConstruct.create('tbody');
            array.forEach(me.data, function (rowData) {
                var tr = domConstruct.create('tr');
                array.forEach(me.columns, function (column) {
                    if (!column.style) {
                        column.style = me.tableThTdStyle;
                    }
                    var td = domConstruct.create('td', column);
                    td.innerHTML = rowData[column.data] || '';
                    domConstruct.place(td, tr);
                });
                domConstruct.place(tr, tbody);
            });
            domConstruct.place(tbody, me.tableNode);
        },
        getTableHtml: function () {
            return this.domNode.innerHTML;
        }
    });
});
