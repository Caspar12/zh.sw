/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/order/widget/table/InputWaybillTable
 */
define([
    'zh/plugins/jquery/widget/table/datatables/Table',
    'admin/services/enums/OrderPropertyEnum',
    'admin/services/enums/OrderStatusEnum',
    'admin/view-partial/main/order/widget/enums/OrderListTableColumnEnum',
    'admin/util/request',
    'zh/core',
    'admin/util/tipUtils',
    "dojo/_base/declare",
    'dojo/_base/lang',
    'dojo/parser',
    'dojo/on',
    'dojo/query',
    'dojo/_base/array',
    'dojo/dom-attr',
    'zh/util/stringUtils',
    'admin/util/bizTipUtils',
    'zh/app/exceptions/ValidationException',
], function (Table, OrderPropertyEnum, OrderStatusEnum, OrderListTableColumnEnum, request, zh, tipUtils,
             declare, lang, parser, on, query, array, domAttr, stringUtils, bizTipUtils, ValidationException) {
    var trackingNumberColumn = lang.clone(OrderPropertyEnum.TrackingNumber);
    trackingNumberColumn.render = function (o, style, rowData, row) {
        return lang.replace('<input role="txtTrackingNumber" data-row-id="{id}" style="width: 150px;" type="text" id="{nodeId}" value="{value}" />',
            {
                id: rowData[OrderPropertyEnum.Id.id],
                nodeId: rowData[OrderPropertyEnum.Id.id] + "_" + "trackingNumber",
                value: rowData[trackingNumberColumn.data] ? rowData[trackingNumberColumn.data] : ''
            });
    };
    trackingNumberColumn.orderable = false;
    var deliverNameColumn = lang.clone(OrderPropertyEnum.DeliverName);
    deliverNameColumn.orderable = true;

    var serialNumberColumn = lang.clone(OrderPropertyEnum.SerialNumber);
    serialNumberColumn.orderable = true;
    serialNumberColumn.type = 'string';
    var columns = [
        serialNumberColumn,
        OrderPropertyEnum.TpOrderId,
        deliverNameColumn,
        trackingNumberColumn,
        {
            orderable: false,
            data: undefined,
            title: '操作',
            width: '80px',
            render: function (o, style, rowData, row) {
                return lang.replace('<a role="btnAdd"  data-row-id="{id}" >累加</a>', {id: rowData[OrderPropertyEnum.Id.id]});
            }
        }
    ].concat();
    return declare('admin/view-partial/main/order/widget/table/InputWaybillTable', [Table], {
        data: [],
        //columns: columns,
        serverSide: false,
        isShowTableBordered: false,
        isSortEnabled: true,
        isShowPager: false,
        selectOptions: false,
        isShowProcessing: false,
        checkBoxColumnOptions: undefined,
        pageSizeMenu: undefined,//[10, 25, 50, 100, 200, 250, 500],
        length: 1000000,
        postMixInProperties: function () {
            this.inherited(arguments);
            this.columns = columns.concat();
        },
        onPlugDrawCallback: function () {
            var me = this;
            on(me.getAllBtnAddNode(), 'click', function () {
                var id = this.getAttribute('data-row-id');
                me.sumAfterInputNodesByDataId(id);
            });
        },
        sumAfterInputNodesByDataId: function (dataId) {
            var me = this;
            var afterInputNodes = me.getAfterInputNodesById(dataId);
            var startWaybill = me.getWaybillByDataId(dataId);
            startWaybill = startWaybill ? startWaybill.trim() : undefined;
            if (stringUtils.isBlank(startWaybill)) {
                tipUtils.warning('请输入快递单号');
                return;
            }
            bizTipUtils.execCatchValidationException(function () {
                array.forEach(afterInputNodes, function (inputNode) {
                    me._calcNextDepth = 1000;
                    startWaybill = me.calcNext({
                        startWaybill: startWaybill,
                    });
                    inputNode.value = startWaybill;
                });
            });
        },
        /**
         * 按ascoii编码 计算最后一位字符，并计算进位问题
         * @param {string} startWaybill 上一位运单单号
         */
        calcNext: function (opt) {
            var me = this;
            if (me._calcNextDepth < 0) {
                throw new ValidationException("请减少数量重试");
            }
            me._calcNextDepth--;
            opt = lang.mixin({
                startWaybill: undefined,
                lastIndex: 1,
                isFindOne: false,
            }, opt);
            var charIndex = opt.startWaybill.length - opt.lastIndex
            var char = opt.startWaybill[charIndex];
            if (me.isCanCalcAscoiiChar(char)) {
                var calcNextCharOrMoveLeftCharAndReturnRenewCharResult = me.calcNextCharOrMoveLeftCharAndReturnRenewChar(char);
                var startWaybill_arr = opt.startWaybill.split('');
                startWaybill_arr.splice(charIndex, 1, calcNextCharOrMoveLeftCharAndReturnRenewCharResult.nextChar);
                opt.startWaybill = startWaybill_arr.join('');
                if (!calcNextCharOrMoveLeftCharAndReturnRenewCharResult.isNeedMoveLeftChar) {
                    return opt.startWaybill;
                }
                else {
                    var leftChar = opt.startWaybill[charIndex - 1];
                    if (me.isCanCalcAscoiiChar(leftChar)) {
                        return me.calcNext({
                            startWaybill: opt.startWaybill,
                            lastIndex: opt.lastIndex + 1,
                            isFindOne: true
                        });
                    } else {
                        return opt.startWaybill;
                    }
                }
            }
            if (!opt.isFindOne) {
                return me.calcNext({
                    startWaybill: opt.startWaybill,
                    lastIndex: charIndex - 1,
                    isFindOne: false
                });
            }
            return opt.startWaybill;
        },
        calcNextCharOrMoveLeftCharAndReturnRenewChar: function (char) {
            var nextChar = String.fromCharCode(char.charCodeAt() + 1);
            var isNeedMoveLeftChar = false;
            if (this.isAscoiiCodeNeedMoveLeftChar(char)) {
                isNeedMoveLeftChar = true;
                nextChar = this.getAscoiiMinCharByChar(char);
            }
            return {
                isNeedMoveLeftChar: isNeedMoveLeftChar,
                nextChar: nextChar
            };
        },
        getAscoiiMinCharByChar: function (char) {
            if (this.isAscoiiNumber(char)) {
                return '0';
            } else if (this.isAscoiiAZ(char)) {
                return 'b';
            }
            else if (this.isAscoiiaz(char)) {
                return 'a';
            }
            throw  new ValidationException("char:" + char + ",无法计算char code");
        },
        isAscoiiCodeNeedMoveLeftChar: function (char) {
            var me = this;
            var result = false;
            var nextCharCode = char.charCodeAt() + 1;
            if (me.isAscoiiNumber(char)) {
                return '9'.charCodeAt() < nextCharCode;
            }
            else if (me.isAscoiiAZ(char)) {
                return 'Z'.charCodeAt() < nextCharCode;
            }
            else if (me.isAscoiiaz(char)) {
                return 'z'.charCodeAt() < nextCharCode;
            }
            return false;
        },
        isCanCalcAscoiiChar: function (char) {
            return zh.isNotEmptyObject(char) && ( this.isAscoiiNumber(char) || this.isAscoiiaz(char) || this.isAscoiiAZ(char));
        },
        isAscoiiNumber: function (char) {
            return '0'.charCodeAt() <= char.charCodeAt() && char.charCodeAt() <= '9'.charCodeAt();
        },
        isAscoiiaz: function (char) {
            return ('a'.charCodeAt() <= char.charCodeAt() && char.charCodeAt() <= 'z'.charCodeAt() )
        },
        isAscoiiAZ: function (char) {
            return ('A'.charCodeAt() <= char.charCodeAt() && char.charCodeAt() <= 'Z'.charCodeAt() );
        },
        getWaybillByDataId: function (dataId) {
            var query_str = lang.replace('input[role="txtTrackingNumber"][data-row-id="{id}"]', {id: dataId});
            var node = query(query_str)[0];
            return node ? node.value : undefined;
        },
        getAfterInputNodesById: function (dataId) {
            var me = this;
            var results = [];
            var isFind = false;
            array.forEach(me.getAllInputNodes(), function (inputNode) {
                var inputRowId = inputNode.getAttribute('data-row-id');
                if (isFind) {
                    results.push(inputNode);
                }
                if (inputRowId === dataId && !isFind) {
                    isFind = true;
                }
            });
            return results;
        },
        getAllInputNodes: function () {
            return query('input[role="txtTrackingNumber"]', this.domNode);
        },
        getAllBtnAddNode: function () {
            return query('a[role="btnAdd"]', this.domNode);
        },
        getData: function () {
            var me = this;
            var data = this.inherited(arguments);
            return array.map(data, function (item) {
                item.trackingNumber = me.getWaybillByDataId(item.id);
                return item;
            });
        }
    });
});