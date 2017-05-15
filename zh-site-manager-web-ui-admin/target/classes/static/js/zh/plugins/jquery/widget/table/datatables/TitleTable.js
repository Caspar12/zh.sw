/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/plugins/jquery/widget/table/datatables/TitleTable
 */
define([
    'jquery',
    'zh/widget/layout/TitlePane',
    'zh/plugins/jquery/widget/table/datatables/Table',
    'zh/util/dojoUtils',
    'dojo/string',
    'dojo/dom-geometry',
    'zh/util/uiUtils',
    'zh/plugins/jquery/util/pluginUtils',
    'dojo/_base/array',
    'dojo/on',
    "dojo/_base/declare",
    'dojo/_base/lang',
    'zh/util/stringUtils',
], function ($, TitlePane, Table, dojoUtils, dojoStringUtils, domGeometry, uiUtils, pluginUtils,
             array,
             on,
             declare, lang, stringUtils) {

    return declare('zh/plugins/jquery/widget/table/datatables/TitleTable', [TitlePane], {
        title: 'title',
        tableOptionPrefix: 'table_',
        tableTopBeforeItems: [],
        postMixInProperties: function () {
            this.inherited(arguments);
        },
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            if (this.tableTopBeforeItems) {
                array.forEach(this.tableTopBeforeItems, function (tableTopBeforeItem) {
                    me.addItems(tableTopBeforeItem);
                });
            }
            var tableOption = this._getTableOption();
            this._table = new Table(tableOption);
            this.addChild(this._table);
        },
        _getTableOption: function () {
            var option = {};
            for (var proName in  this) {
                if (stringUtils.startWith(proName, this.tableOptionPrefix)) {
                    var tablePro = this[proName];
                    var tablePreName = proName.replace(this.tableOptionPrefix, '');
                    option[tablePreName] = tablePro;
                }
            }
            return option;
        },
        getTable: function () {
            return this._table;
        },
        _getTableAttr: function () {
            return this._table;
        },
    });
});