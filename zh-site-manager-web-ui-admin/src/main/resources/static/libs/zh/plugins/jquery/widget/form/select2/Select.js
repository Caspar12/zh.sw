/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/plugins/jquery/widget/form/select2/Select
 */
define([
    'jquery',
    'zh/widget/_base/_WidgetTemplateBase',
    "jquery/plugins/select2/js/select2.full.min",
    'zh/core',
    "dojo/request",
    'dojo/_base/lang',
    'dojo/text!./templates/Select.html',
    "dojo/_base/declare",
    'dijit/form/_FormValueWidget',
    'dojo/dom-construct',
    'zh/plugins/PluginMixin',
    'dojo/_base/array',
    'dojo/string',
    'dojo/on',
    'zh/util/linq',
    'dojo/request/xhr',
    'zh/util/languageUtils',
], function ($, _WidgetTemplateBase, select2, zh, request, lang, template, declare, _FormValueWidget, domConstruct, PluginMixin, array, dojoStringUtils, on, linq,
             requestXhr, languageUtils) {
    var isMapLoadRemoteDataSource = function () {
        return this.isLoadRemoteDataSource();
    };
    var isMapRequest = function () {
        return zh.isEmptyObject(this.request) === false;
    };
    var languageMap = {};
    return declare('zh/plugins/jquery/widget/form/select2/Select', [_WidgetTemplateBase, _FormValueWidget, PluginMixin], {
        templateString: template,
        headers: null,
        url: null,
        dataType: 'json',
        delay: 250,
        method: 'get',
        preventCache: false,
        theme: 'default',//'bootstrap',
        minimumInputLength: 0,
        name: null,
        searchFieldName: 'search',
        pageFieldName: 'page',
        pageSizeFieldName: 'size',
        pageSize: 10,
        language: 'zh-CN',
        /**
         * 从获取结果中获取总数属性名称,例子 a.b,a.b.c
         */
        resultTotalCountFieldName: 'data.totalItemCount',
        resultDataFieldName: 'data.data',
        value: undefined,
        isShowSearchBar: null,
        maximumSelectionLength: 1,
        request: null,
        _isPostCreateUINode: false,
        _isInitPlugFinish: false,
        allowClear: false,
        cache: true,
        placeHolder: '请选择一项',
        placeHolderValue: '',
        /**
         * resolve ,off ,element,style
         */
        width: 'off',
        mapToPlugConfigPaths: [
            {from: 'theme', to: 'theme', isContinue: undefined},
            {from: 'minimumInputLength', to: 'minimumInputLength', isContinue: undefined},
            {from: 'language', to: 'language', isContinue: undefined},
            {from: 'url', to: 'ajax.url', isContinue: isMapLoadRemoteDataSource},
            {from: 'dataType', to: 'ajax.dataType', isContinue: isMapLoadRemoteDataSource},
            {from: 'delay', to: 'ajax.delay', isContinue: isMapLoadRemoteDataSource},
            {from: 'method', to: 'ajax.type', isContinue: isMapLoadRemoteDataSource},
            {from: 'cache', to: 'ajax.cache', isContinue: isMapLoadRemoteDataSource},
            {from: 'headers', to: 'ajax.headers', isContinue: isMapLoadRemoteDataSource},
            {from: 'onSubmit', to: 'ajax.data', isContinue: isMapLoadRemoteDataSource},
            {from: 'onProcessResults', to: 'ajax.processResults', isContinue: isMapLoadRemoteDataSource},
            {from: 'allowClear', to: 'allowClear', isContinue: isMapLoadRemoteDataSource},
            {from: 'placeHolder', to: 'placeholder', isContinue: isMapLoadRemoteDataSource},
            {from: '_request', to: 'ajax.transport', isContinue: isMapRequest},
            {from: 'width', to: 'width',},

        ],
        _select2MapToWidgetEvents: [
            {select2: 'select2:open', widget: '_onOpen'},
            {select2: 'select2:opening', widget: 'onOpening'},
            {select2: 'select2:open', widget: 'onOpen'},
            {select2: 'select2:close', widget: 'onClose'},
            {select2: 'select2:select', widget: 'onSelect'},
            {select2: 'select2:selecting', widget: 'onSelecting'},
            {select2: 'select2:unselecting', widget: 'onUnselecting'},
            {select2: 'change', widget: 'onChange'},
        ],
        options: [],
        onOpening: function () {

        },
        onOpen: function () {

        },
        onClose: function () {

        }
        ,
        onSelect: function () {

        }
        ,
        onSelecting: function () {

        }
        ,
        onUnselecting: function () {

        }
        ,
        onChange: function () {
        },
        // 查询前参数处理
        onSubmitBefore: function (params) {
        },
        showSearchBar: function () {
            if (this.isShowSearchBar === null) {
                if (this.isLoadRemoteDataSource()) {
                    $('.select2-search--dropdown').show();
                }
                else {
                    $('.select2-search--dropdown').hide();
                }
            } else {
                if (this.isShowSearchBar) {
                    $('.select2-search--dropdown').show();
                }
                else {
                    $('.select2-search--dropdown').hide();
                }
            }
        },
        onSubmit: function (params) {
            var me = this;
            var q = {};
            q[me.searchFieldName] = params.term;
            q[me.pageFieldName] = (params.page || 1) - 1;
            q[me.pageSizeFieldName] = me.pageSize;
            q = lang.mixin(q, me.extraParam);
            me.onSubmitBefore(q);
            return q;
        },
        onProcessResults: function (data, params) {//结果处理
            var me = this;
            params = params || {};
            var page = ( params[me.pageFieldName] || 1) - 1;
            var results = lang.getObject(me.resultDataFieldName, false, data);
            results = me.onFormatResults(results);
            this.options = results;
            results = me._convertOptionsToSelect2Data(results);
            var more = (page * me.pageSize) < lang.getObject(me.resultTotalCountFieldName, false, data);
            return {
                results: results,
                pagination: {
                    more: more //每页N条数据
                }
            }
        },
        postMixInProperties: function () {
            this.options = lang.clone(this.options);
            this.inherited(arguments);
        },
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
        },
        startup: function () {
            this.inherited(arguments);
            this._isPostCreateUINode = true;
            this.initPlug(this.getPlugConfig());
            if (this._resetValue === undefined) {
                this._lastValueReported = this._resetValue = this.value;
            }
        },
        isLoadRemoteDataSource: function () {
            return !zh.isEmptyObject(this.url);
        },
        _onOpen: function () {
            var me = this;
            me.select2.addClass('select2-container-rc');
            $(document.body).children('.select2-container').addClass('dijitPopup');
            me.showSearchBar();
        },
        _request: function (params, success, failure) {
            var me = this;
            var request = {};
            me.request(params.url, {
                method: me.method,
                data: params.data,
                preventCache: me.preventCache,
            }).then(function () {
                success.apply(this.select2, arguments);
            }, function (error) {
                request = error.response;
                failure.apply(this.select2, arguments);
            });
            return request;
        },
        _convertOptionsToSelect2Data: function (options) {
            var select2Data = [];
            options = options || this.options;
            options.forEach(function (item) {
                select2Data.push({
                    id: item.value,
                    text: item.label,
                    selected: item.selected
                });
            });
            return select2Data;
        },
        onFormatResults: function (results) {
            return results;
        },
        destroyPlug: function () {
            this.inherited(arguments);
            if (!this.select2) return;
            this._mapSelect2ToWidgetEvents(false);
            this.select2.select2("destroy");
            this.select2[0].innerHTML = '';
            this._isInitPlugFinish = false;
        },
        initPlug: function (plugConfig) {
            if (!this._isPostCreateUINode)return;
            if (this._isInitPlugFinish)  return;
            this.inherited(arguments);
            var me = this;
            var select2Config = plugConfig;
            if (this.options && zh.isArray(this.options)) {
                if (this.placeHolder) {
                    this.options.splice(0, 0, {data: undefined, value: this.placeHolderValue, label: this.placeHolder});
                }
                this._addOpton(this.options);
            }
            var langModulePath = 'jquery/plugins/select2/js/i18n/' + me.language + '.js';
           languageUtils.loadJsAMDLanguageByModulePath(langModulePath);
            me.select2 = $(me.selectNode).select2(select2Config);
            me._mapSelect2ToWidgetEvents();
            me.set('value', me.select2.val());
            me._isInitPlugFinish = true;
            on.emit(me, 'InitFinished');
        },
        onInitFinished: function () {

        },
        isInitPluginFinished: function () {
            return this.select2 && this._isInitPlugFinish;
        },
        resize: function () {

        },
        _mapSelect2ToWidgetEvents: function (isOnOrOff) {

            var me = this;
            if (zh.isEmptyObject(isOnOrOff)) {
                isOnOrOff = true;
            }
            var getEvent = function (eventName) {
                return function () {
                    me[eventName].apply(me);
                }
            };
            if (!me.select2) return;

            for (var i in this._select2MapToWidgetEvents) {
                var select2MapToWidgetEvent = lang.clone(this._select2MapToWidgetEvents[i]);
                if (isOnOrOff) {
                    me.select2.on(select2MapToWidgetEvent.select2, getEvent(select2MapToWidgetEvent.widget));
                } else {
                    me.select2.off(select2MapToWidgetEvent.select2);
                }
            }

        },
        getSelectNode: function () {
            return this.selectNode;
        },
        _setValueAttr: function (value) {
            if (zh.isNotEmptyObject(value) && zh.isEmptyObject(value.value)) value = value.toString();
            this._set("value", value);
            if (!this.select2)  return;
            var jqSelect = $(this.getSelectNode());
            var optionValue = value;
            if (this.isLoadRemoteDataSource()) {
                if (value && value.value) {
                    optionValue = value.value;
                    var optionLabel = value.label || '';
                    var selectorStr = lang.replace('option[value="{value}"]', {value: optionValue});
                    var option = jqSelect.find(selectorStr);
                    if (option.length <= 0) {
                        this.options = this.options || [];
                        this.options.push({data: value.data, value: optionValue, label: optionLabel, selected: true});
                        jqSelect.append(lang.replace('<option value="{value}" selected="selected">{label}</option>', {
                            value: optionValue,
                            label: optionLabel,
                        }));
                    }
                }
            }
            jqSelect.val(optionValue);
            this.select2.val(optionValue).trigger("change");
        },
        _getValueAttr: function () {
            if (this.select2) {
                return this.select2.val();
            }
            return this._get('value');
        },
        _getValueDataAttr: function () {
            var value = this.get('value');
            return linq.From(this.options).Where(function (item) {
                return item.value === value;
            }).FirstOrDefault();
        },
        open: function () {
            this.select2.select2('open');
        }
        ,
        close: function () {
            this.select2.select2('close');
        },
        _addOpton: function (optionData) {
            options = zh.toArray(optionData);
            for (var i in options) {
                var option = options[i];
                var optionNode = domConstruct.create('option');
                optionNode.value = option.value;
                optionNode.innerHTML = option.label;
                optionNode.selected = option.selected ? true : false;
                domConstruct.place(optionNode, this.selectNode);
            }
        },
        addOption: function (options) {
            this._addOpton(options);
            options = zh.toArray(options);
            this.options = this.options.concat(options);
        },
        reset: function () {
            if (!this.select2) return;
            if (zh.isEmptyObject(this._resetValue)) {
                this.select2.val(null).trigger("change");
            }
            else {
                this.select2.val(this._resetValue).trigger("change");
            }
        }
    });
});