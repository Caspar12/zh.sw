/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/plugins/jquery/widget/table/datatables/Table
 */
define([
    'jquery',
    'zh/widget/_base/_WidgetTemplateBase',
    'datatables.net',
    'jquery/plugins/datatables/js/dataTables.bootstrap.min',

    'jquery/plugins/datatables/extensions/select/js/dataTables.select.min',
    'zh/core',
    'dojo/_base/lang',
    'dojo/text!./templates/Table.html',
    'zh/plugins/PluginMixin',
    'zh/util/dojoUtils',
    'dojo/string',
    'dojo/dom-geometry',
    'zh/util/uiUtils',
    'zh/plugins/jquery/util/pluginUtils',
    'dojo/_base/array',
    'dojo/on',
    "dojo/_base/declare",
    'zh/util/languageUtils',

], function ($, _WidgetTemplateBase, Table, TableBootstrapExtend, TableSelectExtend, zh, lang, template, PluginMixin, dojoUtils, dojoStringUtils, domGeometry, uiUtils, pluginUtils,
             array,
             on,
             declare, languageUtils) {
    /**
     * Error reporting.
     *
     * How should DataTables report an error. Can take the value 'alert',
     * 'throw', 'none' or a function.
     *
     *  @type string|function
     *  @default alert
     */
    $.fn.dataTable.ext.errMode = function (a, b, message) {
        console.error(message, arguments);
    };
    var isLoadRemoteDataSource = function () {
        return this.isLoadRemoteDataSource();
    };
    var processingValueAjax = function () {
        return function (data, callback, settings) {
            var me = this;
            var emptyData = me._getDataTablesEmptyDataResult(data);
            callback.apply(me._plugin, [emptyData]);
            data = me._onAjaxParamsProcessing(data);
            me.request(me.ajax.url, {
                method: me.ajax.method,
                data: data
            }).then({
                success: function () {
                    callback.apply(me._plugin, arguments);
                },
                failure: function () {
                    me.onFailure.apply(me, arguments);
                },
                error: function () {
                    me.onAjaxFailure.apply(me._plugin, arguments);
                }
            });
        };
    };
    var datatablesConst = {
        properties: {
            recordsFiltered: 'recordsFiltered',
            recordsTotal: 'recordsTotal',
        },
        ajaxParams: {
            start: 'start',
            length: 'length',
        }
    };
    return declare('zh/plugins/jquery/widget/table/datatables/Table', [_WidgetTemplateBase, PluginMixin], {
        templateString: template,
        data: undefined,
        columns: undefined,
        request: undefined,
        isShowPager: true,
        contentScrollY: undefined,
        contentScrollX: true,
        autoWidth: false,
        isColumnsAutoWidth: false,
        isSortEnabled: true,
        isShowProcessing: true,
        isShowSearchBar: false,
        ajaxResultDataPropertyName: 'data',
        ajaxResultRecordsTotalPropertyName: 'totalItemCount',
        ajaxResultRecordsFilteredCountPropertyName: 'totalItemCount',
        height: undefined,
        /**
         * 高度自动适应配置
         *
         * @param  {object} parentDom: 父容器 dom node,
         * @param  {array | object} diffDoms: 与父容器相差的子容器,
         * @param  {number} diffHeight: 高度偏差值
         */
        heightAutoFillOpt: undefined,
        /**
         * {string}  ajax 分页参数页码属性名称
         */
        ajaxParamsPagePropertyName: 'page',
        /**
         * {string}  ajax 分页参数开始位置属性名称
         */
        ajaxParamsStartPropertyName: 'start',
        /**
         * {string} ajax 分页参数每页大小属性名称
         */
        ajaxParamsPageSizePropertyName: 'size',
        /**
         * {object} ajax 外加参数
         */
        ajaxParamsPlugData: undefined,
        pageSizeMenu: [10, 25, 50, 100],
        isShowTableStriped: true,
        isShowTableHover: true,
        isShowTableBordered: true,


        /**
         * datatable 状态（分页、排序等）是否本地保存
         */
        isStateSaveEnabled: false,
        /**
         * 是否分页、过滤、排序等操作由服务端处理
         */
        serverSide: true,
        selectOptions: true,
        /**
         * check box 行头
         * @param {number} width 宽度
         * @param {string} className
         */
        checkBoxColumnOptions: {},
        /**
         * @param {object} ajax
         * {
         *      url: {string}
         *      data:{object | string| 发送数据
         *      method:{string}  POST GET
         * }
         */
        ajax: undefined,
        language: 'zh-CN',
        mapToPlugConfigPaths: [
            {from: 'data', to: 'data', isContinue: undefined},
            {
                from: 'checkBoxColumnOptions', to: '',
                processingValue: function () {
                    var me = this;
                    if (zh.isUndefined(me.checkBoxColumnOptions)) return;
                    me.columns = me.columns || [];

                    me.checkBoxColumnOptions = lang.mixin({
                        orderable: false,
                        className: 'select-checkbox',
                        render: function () {
                            return '';

                        },
                        width: '30px',
                        checkBoxHeadText: '反选',
                        checkBoxHeadClassName: 'select-checkbox-none',
                    }, me.checkBoxColumnOptions);
                    me.columns.splice(0, 0, me.checkBoxColumnOptions);
                }
            },
            {from: 'columns', to: 'columns', isContinue: undefined},
            {from: 'isShowPager', to: 'paging', isContinue: undefined},
            {from: 'contentScrollY', to: 'scrollY', isContinue: undefined},
            {from: 'contentScrollX', to: 'scrollX', isContinue: undefined},
            {from: 'serverSide', to: 'serverSide', isContinue: undefined},
            {
                from: 'autoWidth', to: 'autoWidth', isContinue: undefined
            },
            {from: 'isSortEnabled', to: 'ordering', isContinue: undefined},
            {from: 'isShowProcessing', to: 'bProcessing', isContinue: undefined},
            {from: 'isShowSearchBar', to: 'searching', isContinue: undefined},
            {from: 'isStateSaveEnabled', to: 'stateSave', isContinue: undefined},
            {from: 'onPlugPostCreate', to: 'initComplete', isContinue: undefined},
            {from: 'onPlugDrawCallback', to: 'drawCallback', isContinue: undefined},
            {from: 'onPlugPreDrawCallback', to: 'preDrawCallback', isContinue: undefined},
            {from: 'onPlugFooterCallback', to: 'footerCallback', isContinue: undefined},
            {from: 'onPlugHeaderCallback', to: 'headerCallback', isContinue: undefined},

            {from: 'pageSizeMenu', to: 'lengthMenu', isContinue: undefined},


            {from: 'selectOptions', to: 'select', isContinue: undefined},
            {
                from: 'isShowTableHover', to: '',
                processingValue: function () {
                    $(this.tableNode).addClass('table-hover');
                }
            },
            {
                from: 'isShowTableStriped', to: '',
                processingValue: function () {
                    $(this.tableNode).addClass('table-striped');
                }
            },
            {
                from: 'isShowTableBordered', to: '',
                processingValue: function () {
                    $(this.tableNode).addClass('table-bordered');
                }
            },
            {
                from: 'language', to: 'language',
                processingValue: function () {
                    var me = this;
                    var r = languageUtils.loadJsonLanguageByModulePath('jquery/plugins/datatables/i18n/' + me.language + '.json');
                   // return r;
                    return {url: require.toUrl('jquery/plugins/datatables/i18n/' + me.language + '.json')};
                }
            },
            {from: '_onMapAjaxResultToDataTablesStyle', to: 'sAjaxDataProp', isContinue: undefined},
            {
                from: 'ajaxResultRecordsFilteredPropertyName',
                to: datatablesConst.properties.recordsFiltered,
                isContinue: undefined
            },
            {
                from: 'ajaxResultRecordsTotalPropertyName',
                to: datatablesConst.properties.recordsTotal,
                isContinue: undefined
            },
            {from: 'ajax', to: 'ajax', isContinue: isLoadRemoteDataSource, processingValue: processingValueAjax},
        ],
        mapToPlugEventPaths: [
            {from: 'onSelect', to: 'select'},
            {from: 'onDeselect', to: 'deselect'},

        ],

        /**
         *
         * @param {object} e jQuery event object
         * @param {DataTables.Api} dt DataTables API instance
         * @param {string} type Items being selected. This can be row, column or cell
         * @param {array} items
         * The DataTables' indexes of the selected items. This can be used with the table selector methods (rows() for example).
         * For further information about the item indexes used by DataTables, please refer to row().index(), column().index() and cell().index() as appropriate.
         */
        onSelect: function (e, dt, type, items) {
            if (!this._isShiftSelectingItem && items) {
                this._previouseSelectItem = items[0];
            }
        },
        /**
         *
         * @param {object} e jQuery event object
         * @param {DataTables.Api} dt DataTables API instance
         * @param {string} type Items being selected. This can be row, column or cell
         * @param {array} items
         * The DataTables' indexes of the selected items. This can be used with the table selector methods (rows() for example).
         * For further information about the item indexes used by DataTables, please refer to row().index(), column().index() and cell().index() as appropriate.
         */
        onDeselect: function (e, dt, type, items) {
            if (!this._isShiftSelectingItem && items) {
                this._previouseSelectItem = items[0];
            }
        },
        onFailure: function () {

        },
        destroyPlug: function () {
            var me = this;
            me.inherited(arguments);
        },
        initPlug: function (plugConfig) {
            var me = this;
            if (plugConfig.isColumnsAutoWidth === false) {
                plugConfig.autoWidth = true;
            }

            this._plugin = $(me.tableNode).DataTable(plugConfig);
        },
        isLoadRemoteDataSource: function () {
            return !zh.isEmptyObject(lang.getObject('ajax.url', false, this));
        },
        resize: function () {

            var me = this;
            this.inherited(arguments);
            this._resizeDataTablesHeight();
            if (this._isInitPlug) {
                me.adjustColumns();

            }
        },
        getData: function () {
            var result = [];
            var data = this._plugin ? this._plugin.data() : [];
            array.forEach(data, function (item) {
                result.push(item);
            });
            return result;
        },
        _onAjaxParamsProcessing: function (params) {
            var me = this;
            var mapToDataTablesAjaxPropertyNamePaths = [
                {from: datatablesConst.ajaxParams.start, to: me.ajaxParamsStartPropertyName},
                {from: datatablesConst.ajaxParams.length, to: me.ajaxParamsPageSizePropertyName},
            ];
            dojoUtils.mapFromObjectTo({
                from: params,
                to: params,
                paths: mapToDataTablesAjaxPropertyNamePaths
            });
            var start = params[me.ajaxParamsStartPropertyName];
            var pageSize = params[me.ajaxParamsPageSizePropertyName];
            params[me.ajaxParamsPagePropertyName] = Math.floor(start / pageSize);
            if (me.isSortEnabled === false) {
                delete params.columns;
                delete  params.order;
            }
            if (me.isShowSearchBar === false) {
                delete  params.search;
            }
            if (this.ajaxParamsPlugData) {
                params = lang.mixin(params, this.ajaxParamsPlugData);
            }
            params = me.onAjaxParamsProcessing(params);
            return params;
        },
        onAjaxParamsProcessing: function (params) {
            return params;
        },
        _onMapAjaxResultToDataTablesStyle: function (ajaxResult) {
            var me = this;
            var mapToDataTablesAjaxPropertyNamePaths = [
                {from: me.ajaxResultRecordsTotalPropertyName, to: datatablesConst.properties.recordsTotal},
                {from: me.ajaxResultRecordsFilteredCountPropertyName, to: datatablesConst.properties.recordsFiltered},
            ];
            var result = dojoUtils.mapFromObjectTo({
                from: ajaxResult,
                to: ajaxResult,
                paths: mapToDataTablesAjaxPropertyNamePaths
            });
            result.draw = ajaxResult.draw;
            var dataResult = lang.getObject(me.ajaxResultDataPropertyName, false, result);
            return dataResult;
        },
        _getDataTablesEmptyDataResult: function (ajaxSettings) {
            var me = this;
            var result = {
                draw: ajaxSettings.draw,
            };
            lang.setObject(datatablesConst.properties.recordsTotal, 0, result);
            lang.setObject(datatablesConst.properties.recordsFiltered, 0, result);
            lang.setObject(me.ajaxResultDataPropertyName, [], result);
            return result;
        },
        onAjaxFailure: function () {

        },
        postMixInProperties: function () {
            var me = this;
            me.columns = lang.clone(me.columns);
            me.inherited(arguments);
        },
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
        },
        onPlugDrawCallback: function () {
            var me = this;
            this._isInitPlug = true;
            this._initCheckBoxColumn();
            this._moveDataTablesPageSizeSelectCompomentToBottom();
            this._resizeDataTablesHeight();
            me.adjustColumns()

        },
        onPlugPreDrawCallback: function () {
            this._moveDataTablesPageSizeSelectCompomentToBottom(true);
        },
        onPlugPostCreate: function () {
        },
        onPlugFooterCallback: function () {
            var i = 0;
        },
        onPlugHeaderCallback: function () {
            var i = 0;
        },
        _initCheckBoxColumn: function () {
            var me = this;
            if (zh.isUndefined(me.checkBoxColumnOptions)) return;
            me._initCheckBoxColumnHead();
            me._initCheckBoxColumnBody();
        },
        _initCheckBoxColumnHead: function () {
            var me = this;
            var jqTableHeadCheckBoxCell = $(me._getDataTablesWrapperBodyScrollHeadNode()).find('table th:first-child');
            jqTableHeadCheckBoxCell.addClass(me.checkBoxColumnOptions.checkBoxHeadClassName)
            jqTableHeadCheckBoxCell.html(me.checkBoxColumnOptions.checkBoxHeadText);
            jqTableHeadCheckBoxCell.off('click');
            jqTableHeadCheckBoxCell.on('click', function () {
                me.selectReverse();
            });
        },
        _initCheckBoxColumnBody: function () {
            var me = this;
            var jqTableBodyCheckBoxCells = $(this._getDataTablesWrapperBodyScrollBodyNode()).find('td:first-child');
            jqTableBodyCheckBoxCells.off('click');
            jqTableBodyCheckBoxCells.on('click', function () {
                event.preventDefault();
                event.stopPropagation();
                var index = jqTableBodyCheckBoxCells.index(this);
                var isHasClass = $(this).parent().hasClass('selected');
                var dtRow = me._getDataTablesRowByIndex(index);
                var currentSelectItem = index;
                var et = event || window.event;
                if (zh.isNotEmptyObject(me._previouseSelectItem) && et.shiftKey) {

                    var previouseSelectItem = me._previouseSelectItem;
                    var min = Math.min(currentSelectItem, previouseSelectItem);
                    var max = Math.max(currentSelectItem, previouseSelectItem);
                    var previouseSelectItemIsSelected = me._isDataTablesRowSelectedByIndex(previouseSelectItem);
                    me._isShiftSelectingItem = true;
                    for (var i = min; i < max; i++) {
                        if (previouseSelectItemIsSelected) {
                            dtRow.select();
                            me._getDataTablesRowByIndex(i).select();
                        }
                        else {
                            dtRow.deselect();
                            me._getDataTablesRowByIndex(i).deselect();
                        }

                    }
                    me._isShiftSelectingItem = false;

                } else {
                    if (isHasClass) {
                        dtRow.deselect();
                    }
                    else {
                        dtRow.select();
                    }
                }
                me._previouseSelectItem = currentSelectItem;

            });
        },
        _getDataTablesRowByIndex: function (index) {
            return this._plugin.row(dojoStringUtils.substitute(':eq(${index})', {index: index}));
        },
        _isDataTablesRowSelectedByIndex: function (index) {
            var me = this;
            var arr = me._plugin.table().rows('.selected')[0];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === index) return true;
            }
            return false;
        },
        selectReverse: function () {
            var rowSeelcteds = this._plugin.rows({selected: true});
            var rowUnseelcteds = this._plugin.rows({selected: false});
            rowSeelcteds.deselect();
            rowUnseelcteds.select();
        },
        getRowSelectedCount: function () {
            return this._plugin.rows({selected: true}).length;
        },
        getRowCount: function () {
            return this._plugin.rows()[0].length;
        },
        getRowSelectedData: function () {
            return array.map(this._plugin.rows({selected: true}).data(), function (item) {
                return item;
            });
        },
        selectAllRows: function () {
            this._plugin.rows().select();
        },
        unselectAllRows: function () {
            this._plugin.rows().deselect();
        },
        /**
         * this#isLoadRemoteDataSource ，如果为真,重新加载并重画表格,第一个参数为重新加载数据,
         * 如果为假，第一个参数为ajax配置的外加参数,
         *
         */
        reload: function () {
            if (!this.isInitPluginFinished()) return;
            if (this.isLoadRemoteDataSource()) {
                this.ajaxParamsPlugData = arguments[0];
                this._plugin.ajax.reload(null, false);
            }
            else {
                var data = arguments[0];
                this._plugin.clear();
                this._plugin.rows.add(data).draw();
            }
        },
        clear: function () {
            this._plugin.clear();
        },
        addRowData: function (data) {
            data = zh.toArray(data);
            this._plugin.rows.add(data).draw();
        },
        editRowDataSelected: function (data) {
            var me = this;
            var datas = zh.toArray(data);
            var rowsSelecteds = this._plugin.rows('.selected');

            array.forEach(rowsSelecteds[0], function (rowsObj, index) {
                var rowIndex = rowsObj;
                var row = me._plugin.row(rowIndex);
                var rowData = datas.length === 1 ? data : datas[index];
                row.data(rowData);
            });
        },
        removeRowSelected: function () {
            this._plugin.rows('.selected').remove().draw();
        },
        _moveDataTablesPageSizeSelectCompomentToBottom: function (isPreDraw) {
            var me = this;
            var tableId = this._getDataTablesId();
            var selectName = tableId + '_length';
            var jqShowLengthSelect = $(dojoStringUtils.substitute('select[name="${name}"]', {name: selectName})).parent();
            //   var jqShowLengthSelect = $(this.domNode).find(selectName).find('label');
            if (jqShowLengthSelect.length == 0) return;

            if (isPreDraw) {
                if (jqShowLengthSelect) {
                    $(me._getDataTablesWrapperNode()).append(jqShowLengthSelect);
                    jqShowLengthSelect.css('marginLeft', '5px');
                }
            } else {
                var showInfoDivName = tableId + '_info';
                var jqShowInfoDiv = $(dojoStringUtils.substitute('div[id="${name}"]', {name: showInfoDivName})).parent();
                $(me._getDataTablesWrapperFooterInfoNode()).append(jqShowLengthSelect);
            }

        },
        _getDataTablesWrapperTopNode: function () {
            return $(this._getDataTablesWrapperNode()).children('div.row')[0];
        },
        _getDataTablesWrapperBodyNode: function () {
            return $(this._getDataTablesWrapperNode()).children('div.row')[1];
        },
        _getDataTablesWrapperBottomNode: function () {
            return $(this._getDataTablesWrapperNode()).children('div.row')[2];
        },
        _getDataTablesWrapperBodyScrollHeadNode: function () {
            return $(this.domNode).find('.dataTables_scrollHead')[0];
        },
        _getDataTablesWrapperBodyScrollHeadInnerNode: function () {
            return $(this.domNode).find('.dataTables_scrollHeadInner')[0];
        },
        _getDataTablesWrapperBodyScrollBodyNode: function () {
            return $(this.domNode).find('.dataTables_scrollBody')[0];
        },
        _getDataTablesWrapperFooterInfoNode: function () {
            return $(this.domNode).find('.dataTables_info')[0];
        },

        getDataTablesWrapperBodyScrollBodyNode: function () {
            return this._getDataTablesWrapperBodyScrollBodyNode();
        },
        _getDataTablesId: function () {
            return 'widget_' + $(this.domNode).attr('id')
        },
        _getDataTablesWrapperId: function () {
            return this._getDataTablesId() + "_wrapper";
        },
        _getDataTablesWrapperNode: function () {
            return $(this.domNode).children()[0];
        },
        isInitPluginFinished: function () {
            return this._plugin && this._isInitPlug;
        },
        _resizeDataTablesHeight: function () {

            var me = this;
            // $(me._getDataTablesWrapperBodyScrollHeadInnerNode()).css('width','100%');
            // $(me._getDataTablesWrapperBodyScrollHeadInnerNode()).find('table').css('width','100%');
            if (this.isInitPluginFinished()) {
                me.adjustColumns()
            }
            if (zh.isEmptyObject(me.height) === false) {
                var height = parseInt(me.height) || 400;
                me.set('height', height);
            } else if (me.heightAutoFillOpt) {
                var diffHeight = parseInt(me.heightAutoFillOpt.diffHeight) || 0
                var height = domGeometry.getContentBox(me.heightAutoFillOpt.parentDom).h - diffHeight;
                me.set('height', height, me.heightAutoFillOpt.diffDoms);
            }
        },
        adjustColumns: function () {
            if (this._plugin) {
                this._plugin.columns.adjust();
            }
        },
        _setHeightAttr: function (value, pluginsDiffDoms) {
            if (!this.isInitPluginFinished()) return;
            var me = this;

            var dataTablesWrapperBodyScrollBodyNode = me._getDataTablesWrapperBodyScrollBodyNode();
            if (zh.isEmptyObject(dataTablesWrapperBodyScrollBodyNode)) return;
            var height = parseInt(value);
            if (isNaN(height)) return;
            var diffDoms = [
                me._getDataTablesWrapperTopNode(),
                me._getDataTablesWrapperBottomNode(),
                me._getDataTablesWrapperBodyScrollHeadNode()
            ];
            if (pluginsDiffDoms) {
                diffDoms = diffDoms.concat(pluginsDiffDoms);
            }
            var isCancel = false;
            if (!diffDoms || diffDoms.length === 0) {
                isCancel = true;
            }
            array.forEach(diffDoms, function (item) {
                if (isCancel) return;
                isCancel = zh.isEmptyObject(item);
            });
            if (isCancel) return;
            uiUtils.autoHeightDiffs({
                target: dataTablesWrapperBodyScrollBodyNode,
                totalHeight: height,
                diffDoms: diffDoms
            });
        }
    });
});