/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/plugins/jquery/widget/table/datatables/util/tableUtils
 */
define([
    'jquery',
    'dojo/_base/array',
    'dojo/on',
    "dojo/_base/declare",
    'dojo/_base/lang',
    'zh/util/stringUtils',
], function ($, array, on, declare, lang, stringUtils) {
    return {
        convertToNewTableNode: function (table) {
            var jqDataTableBodyTable = $(table.getDataTablesWrapperBodyScrollBodyNode()).find('table');
            var jqTable = $('<table></table>');
            var copyAttrs = ['class', 'style'];
            array.forEach(copyAttrs, function (copyAttr) {
                jqTable.attr(copyAttr, jqDataTableBodyTable.attr(copyAttr));
            });
            jqTable.html(jqDataTableBodyTable.html());
            jqTable.find('thead > tr').attr('style', '');
            jqTable.find('thead > tr > th').attr('style', '');
            jqTable.find('thead > tr > th').attr('class', '');
            jqTable.find('thead > tr > th').each(function (th) {
                $(this).html($(this).find('div').html());
            });
            return jqTable[0];
        },
    };
});